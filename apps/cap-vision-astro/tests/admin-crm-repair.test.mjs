import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import {PGlite} from '@electric-sql/pglite';
test('repair is repeatable, preserves legacy leads and maps only existing CMS admins',async()=>{
 const db=new PGlite();await db.exec(`CREATE ROLE anon;CREATE ROLE authenticated;CREATE SCHEMA auth;CREATE TABLE auth.users(id uuid PRIMARY KEY);
 CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql AS $$ SELECT nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
 GRANT USAGE ON SCHEMA auth TO authenticated;GRANT EXECUTE ON FUNCTION auth.uid() TO authenticated;
 CREATE TABLE public.profiles(id uuid PRIMARY KEY,is_admin boolean DEFAULT false);
 INSERT INTO auth.users VALUES ('00000000-0000-0000-0000-000000000001'),('00000000-0000-0000-0000-000000000002');
 INSERT INTO profiles VALUES ('00000000-0000-0000-0000-000000000001',true),('00000000-0000-0000-0000-000000000002',false);`);
 await db.exec(await readFile(new URL('../../../supabase/migrations/20240323090000_create_leads_table.sql',import.meta.url),'utf8'));await db.exec("ALTER TABLE leads ADD COLUMN line_id text;INSERT INTO leads(name,status) VALUES ('Legacy','closed');");
 const sql=await readFile(new URL('../../../supabase/repairs/20261012_admin_crm_repair.sql',import.meta.url),'utf8');await db.exec(sql);await db.exec(sql);
 assert.equal((await db.query('SELECT * FROM crm_admins')).rows.length,1);assert.equal((await db.query('SELECT pipeline_stage FROM leads')).rows[0].pipeline_stage,null);
 await db.exec("SET ROLE authenticated;SET request.jwt.claim.sub='00000000-0000-0000-0000-000000000002';");assert.equal((await db.query('SELECT * FROM leads')).rows.length,0);await assert.rejects(db.exec("INSERT INTO crm_admins VALUES ('00000000-0000-0000-0000-000000000002')"));
 await db.exec("SET request.jwt.claim.sub='00000000-0000-0000-0000-000000000001';");assert.equal((await db.query('SELECT * FROM leads')).rows.length,1);assert.equal((await db.query("UPDATE leads SET pipeline_stage='contacted' RETURNING id")).rows.length,1);
 await db.exec("RESET ROLE;UPDATE leads SET status='new',pipeline_stage='won';");await db.exec(sql);assert.equal((await db.query('SELECT pipeline_stage FROM leads')).rows[0].pipeline_stage,'won');
 await db.exec('SET ROLE anon;');await assert.rejects(db.query('SELECT * FROM leads'));await db.close();
});
