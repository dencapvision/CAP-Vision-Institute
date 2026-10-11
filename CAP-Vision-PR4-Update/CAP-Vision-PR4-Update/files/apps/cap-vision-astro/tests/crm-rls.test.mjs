import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {PGlite} from '@electric-sql/pglite';
test('CRM migration restricts reads/updates to allowlisted staff and preserves legacy rows', async () => {
  const db = new PGlite();
  await db.exec(`CREATE ROLE anon; CREATE ROLE authenticated; CREATE SCHEMA auth;
    CREATE TABLE auth.users(id uuid PRIMARY KEY);
    CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql AS $$ SELECT nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
    GRANT USAGE ON SCHEMA auth TO authenticated; GRANT EXECUTE ON FUNCTION auth.uid() TO authenticated;`);
  await db.exec(await readFile(new URL('../../../supabase/migrations/20240323090000_create_leads_table.sql',import.meta.url),'utf8'));
  await db.exec('ALTER TABLE public.leads ADD COLUMN line_id text');
  await db.exec(`INSERT INTO public.leads(name,status) VALUES ('Legacy','closed');
    INSERT INTO auth.users VALUES ('00000000-0000-0000-0000-000000000001'), ('00000000-0000-0000-0000-000000000002');`);
  await db.exec(await readFile(new URL('../../../supabase/migrations/20261011150000_lead_crm_mvp.sql',import.meta.url),'utf8'));
  assert.equal((await db.query("SELECT pipeline_stage FROM leads WHERE name='Legacy'")).rows[0].pipeline_stage,null);
  await db.exec("INSERT INTO crm_admins VALUES ('00000000-0000-0000-0000-000000000001'); SET ROLE anon;");
  await db.exec("INSERT INTO leads(name,status) VALUES ('Public','new');");
  await assert.rejects(db.query('SELECT * FROM leads'));
  await assert.rejects(db.exec("INSERT INTO leads(name,status,source) VALUES ('Invalid','new','contact_form')"));
  await assert.rejects(db.exec("INSERT INTO leads(name,status,pipeline_stage) VALUES ('Spoof','new','won')"));
  await db.exec("RESET ROLE; SET ROLE authenticated; SET request.jwt.claim.sub='00000000-0000-0000-0000-000000000002';");
  assert.equal((await db.query('SELECT * FROM leads')).rows.length,0);
  await assert.rejects(db.exec("INSERT INTO crm_admins VALUES ('00000000-0000-0000-0000-000000000002')"));
  assert.equal((await db.query("UPDATE leads SET pipeline_stage='won' RETURNING id")).rows.length,0);
  await db.exec("SET request.jwt.claim.sub='00000000-0000-0000-0000-000000000001';");
  assert.equal((await db.query('SELECT * FROM leads')).rows.length,2);
  for (const stage of ['new','contacted','tna','proposal','won','lost','delivery','follow_up','repeat']) {
    assert.equal((await db.query("UPDATE leads SET pipeline_stage=$1, crm_notes='Follow up', follow_up_at=now() WHERE name='Public' RETURNING pipeline_stage",[stage])).rows[0].pipeline_stage,stage);
  }
  await assert.rejects(db.exec("UPDATE leads SET pipeline_stage='invalid'"));
  await assert.rejects(db.exec('DELETE FROM leads'));
  await db.close();
});
