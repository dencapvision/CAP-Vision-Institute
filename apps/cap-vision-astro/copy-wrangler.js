import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wranglerConfig = {
  name: "cap-vision-institute",
  main: "./server/entry.mjs",
  compatibility_date: "2026-04-15",
  compatibility_flags: [
    "nodejs_compat"
  ],
  assets: {
    directory: "./client"
  },
  images: {
    binding: "IMAGES"
  }
};

const distPath = path.join(__dirname, 'dist');
const outputPath = path.join(distPath, 'wrangler.json');

try {
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, JSON.stringify(wranglerConfig, null, 2));
  console.log('[Post-Build] Successfully generated dist/wrangler.json for Cloudflare Pages SSR');
} catch (err) {
  console.error('[Post-Build] Failed to generate dist/wrangler.json:', err);
  process.exit(1);
}
