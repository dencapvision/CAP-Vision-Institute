/**
 * One-time script: Update cacheControl for existing files in Supabase Storage
 * Run: node scripts/update-storage-cache.mjs
 *
 * Reads VITE_SUPABASE_URL and VITE_SUPABASE_service_role from .env
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Parse .env manually (no dotenv dependency needed)
function loadEnv() {
  const envPath = resolve(__dirname, '../.env');
  const lines = readFileSync(envPath, 'utf-8').split('\n');
  const env = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
    env[key] = val;
  }
  return env;
}

const env = loadEnv();
const supabase = createClient(
  env.VITE_SUPABASE_URL,
  env.VITE_SUPABASE_service_role
);

const BUCKETS = ['media'];
const CACHE_SECONDS = '604800'; // 7 days

let totalUpdated = 0;
let totalErrors = 0;

async function processFolder(bucket, folder) {
  const { data: items, error } = await supabase.storage
    .from(bucket)
    .list(folder || undefined, { limit: 1000 });

  if (error) {
    console.error(`  ❌ list error [${folder || 'root'}]:`, error.message);
    return;
  }
  if (!items || items.length === 0) return;

  for (const item of items) {
    const itemPath = folder ? `${folder}/${item.name}` : item.name;

    if (!item.metadata) {
      // It's a subfolder — recurse into it
      console.log(`\n📁 ${itemPath}/`);
      await processFolder(bucket, itemPath);
      continue;
    }

    const mimeType = item.metadata.mimetype || 'application/octet-stream';
    process.stdout.write(`  ↻  ${item.name} ... `);

    const { data: blob, error: dlErr } = await supabase.storage
      .from(bucket)
      .download(itemPath);

    if (dlErr) {
      console.log(`❌ download: ${dlErr.message}`);
      totalErrors++;
      continue;
    }

    const { error: upErr } = await supabase.storage
      .from(bucket)
      .upload(itemPath, blob, {
        cacheControl: CACHE_SECONDS,
        upsert: true,
        contentType: mimeType,
      });

    if (upErr) {
      console.log(`❌ upload: ${upErr.message}`);
      totalErrors++;
    } else {
      console.log(`✅`);
      totalUpdated++;
    }
  }
}

async function main() {
  console.log(`\n🔧 Updating ALL files in Storage → cacheControl: ${CACHE_SECONDS}s (7 days)\n`);

  for (const bucket of BUCKETS) {
    console.log(`📦 Bucket: ${bucket}`);
    await processFolder(bucket, '');
  }

  console.log(`\n✅ Done — ${totalUpdated} files updated, ${totalErrors} errors.\n`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
