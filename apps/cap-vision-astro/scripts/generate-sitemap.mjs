import {readFile, readdir, writeFile} from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const basePaths = ['/', '/assessment', '/courses', '/services', '/portfolio', '/speakers', '/resources', '/about', '/contact'];
const posts = await readdir(new URL('src/data/blog/posts/', root));
const resources = [];
for (const file of posts.filter(p => p.endsWith('.json')).sort()) {
  const article = JSON.parse(await readFile(new URL(`src/data/blog/posts/${file}`, root), 'utf8'));
  const publicCopy = await readFile(new URL(`public/content/blog/posts/${file}`, root), 'utf8');
  if (JSON.stringify(JSON.parse(publicCopy)) !== JSON.stringify(article)) throw new Error(`Article copies differ: ${file}`);
  if (!article.title) throw new Error(`Article has no title: ${file}`);
  resources.push(`/resources/${encodeURIComponent(file.replace(/\.json$/, ''))}`);
}
const paths = [...new Set([...basePaths, ...resources])];
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(path => `  <url><loc>https://capvisionpartner.com${path}</loc></url>`).join('\n')}\n</urlset>\n`;
if (process.argv.includes('--check')) {
  if (await readFile(new URL('public/sitemap.xml', root), 'utf8') !== xml) throw new Error('Sitemap is out of date');
} else await writeFile(new URL('public/sitemap.xml', root), xml);
console.log(`Sitemap checked: ${paths.length} URLs, ${resources.length} bundled articles`);
