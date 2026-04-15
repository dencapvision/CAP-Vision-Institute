/**
 * Phase 3: Replace Supabase Storage URLs → Cloudflare R2 URLs in all source files
 *
 * Usage:
 *   node scripts/replace-storage-urls.mjs --dry-run   (preview changes only)
 *   node scripts/replace-storage-urls.mjs             (apply changes)
 *
 * Set R2_BASE_URL before running:
 *   With custom domain:  https://assets.capvisionpartner.com
 *   With R2.dev URL:     https://pub-xxxxxxxxxxxxxxxx.r2.dev
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { resolve, join, extname } from 'path';
import { fileURLToPath } from 'url';

// ─── CONFIGURE THIS ──────────────────────────────────────────────────────────
const R2_BASE_URL = 'https://assets.capvisionpartner.com';
// ─────────────────────────────────────────────────────────────────────────────

const OLD_BASE = 'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/';
const DRY_RUN = process.argv.includes('--dry-run');

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');

// File extensions to process
const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.sql']);

// Directories to skip
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', '.next', 'build', 'scripts']);

let totalFiles = 0;
let changedFiles = 0;
let totalReplacements = 0;

function walkDir(dir) {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry)) continue;
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (EXTENSIONS.has(extname(entry))) {
      processFile(fullPath);
    }
  }
}

function processFile(filePath) {
  totalFiles++;
  const original = readFileSync(filePath, 'utf-8');

  if (!original.includes(OLD_BASE)) return;

  const updated = original.replaceAll(OLD_BASE, `${R2_BASE_URL}/`);
  const count = (original.match(new RegExp(OLD_BASE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;

  const relPath = filePath.replace(ROOT + '\\', '').replace(ROOT + '/', '');
  console.log(`  ${DRY_RUN ? '[DRY]' : '✅'} ${relPath} — ${count} replacement${count > 1 ? 's' : ''}`);

  if (!DRY_RUN) {
    writeFileSync(filePath, updated, 'utf-8');
  }

  changedFiles++;
  totalReplacements += count;
}

console.log(`\n🔄 ${DRY_RUN ? 'DRY RUN — ' : ''}Replacing Supabase Storage URLs → R2`);
console.log(`   OLD: ${OLD_BASE}`);
console.log(`   NEW: ${R2_BASE_URL}/\n`);

walkDir(ROOT);

console.log(`\n${DRY_RUN ? '[DRY RUN] Would update' : 'Updated'}: ${changedFiles} files, ${totalReplacements} URLs (scanned ${totalFiles} files)\n`);

if (DRY_RUN) {
  console.log('Run without --dry-run to apply changes.\n');
}
