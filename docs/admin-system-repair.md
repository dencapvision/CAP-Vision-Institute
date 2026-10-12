# Admin repair — 12 October 2026

Production schema-only probes confirmed: `crm_admins` is missing (PGRST205), `leads.pipeline_stage/follow_up_at/crm_notes` are missing (42703), and `articles` is missing while `blog_articles` exists. No customer rows were retrieved.

The Astro admin now defers module imports and requests until authenticated access is resolved. CMS uses the existing `is_admin()` RPC; CRM and Assessments use the CRM allowlist and schema check. `/admin/system` lets any signed-in account inspect its own role and empty schema probes, without granting access. RLS remains authoritative. The dashboard no longer queries private records through the anonymous SSR client.

Corrected category schema, assessment error behavior, course/event editors and SEO-to-article editor links. Article drafts now call an authenticated server-only DeepSeek endpoint; the browser no longer requests or stores provider API keys. The endpoint verifies the Supabase user and existing CMS role before using a provider key. Errors are visible instead of fabricated zero metrics. New courses/events begin unpublished. Editors require a returned row before reporting success and preserve fields outside the edited contract. Mobile navigation has accessible labels and bounded heading typography. Quote documents remain browser-local and are explicitly labeled; empty stores no longer invent sample customers.

## Database repair

Run `supabase/repairs/20261012_admin_crm_repair.sql` using the Supabase SQL Editor, or add the complete session-pooler connection URI to the GitHub production/repository secret `SUPABASE_DB_URL` and run **Repair Admin CRM database** on main. The URI includes the database password; do not paste it in chat.

The transaction is idempotent. It preserves leads and historical statuses, adds the missing schema, retains public lead capture, restricts reading/updating to the CRM allowlist, and maps only profiles that already have `is_admin = true`. It does not assign new CMS roles or grant all logged-in users CRM access. An account without an existing CMS admin role remains unprivileged and needs a separate, identified authorization decision.

The repair was attempted on 12 October 2026 after the user added `SUPABASE_DB_URL`. Runs 38260111374 and 38260225960 stopped before connecting: the secret contains an HTTPS URL, not a PostgreSQL URI, and contains no database password. After the user changed the secret, run 38264843049 confirmed a PostgreSQL prefix but failed URI parsing (`malformed_uri`) before any database connection. No production database changes were applied. Replace the secret using Supabase Connect → Session pooler, supplying the actual database password. The workflow verifies the production project before connecting, and checks retained lead counts, existing admin mappings, CRM columns and restricted access afterward. Code deployment does not install the database migration.

## Verification

Admin-specific TypeScript checks now cover all admin components and run in CI/release. Tests cover signed-out/ordinary/CMS/CRM accounts, missing migrations versus missing permissions, schema-only diagnostics, repeatable database repair, preservation of historical rows and assigned pipeline stages on rerun, and denial of self-enrollment/anonymous reads. Browser tests use isolated fixture records and intercept all database/API calls; no production CRUD or notifications are part of QA.

Browser fixture QA passed all 13 modules, mobile and desktop layouts, a mock course save, separate migration/role denials, no content query for ordinary accounts, missing-session redirection, and password visibility controls. Actual signed-in CRUD and authenticated article generation still need the user's existing administrator session and database authorization; no real production records were edited during testing.
