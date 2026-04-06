import fs from 'fs';
import path from 'path';

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach(function (file) {
    const fullPath = dirPath + "/" + file;
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

const srcDir = path.resolve(process.cwd(), 'src');
const allFiles = getAllFiles(srcDir);
const links: Set<string> = new Set();
const linkOccurrences: Record<string, string[]> = {};

const regex = /href=(["'])(.*?)\1|href=\{`([^`]+)`\}|href=\{\s*["'](.*?)["']\s*\}/g;

allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  let match;
  while ((match = regex.exec(content)) !== null) {
      // The matched link will be in group 2, 3, or 4
      let link = match[2] || match[3] || match[4];
      if (!link) continue;
      
      // Clean up dynamic segments like `/news/${article.slug}` -> `/news`
      // We will just do basic checking.
      const normalizedLink = link.split('?')[0].split('#')[0];
      if (normalizedLink.startsWith('/')) {
        links.add(normalizedLink);
        if (!linkOccurrences[normalizedLink]) linkOccurrences[normalizedLink] = [];
        linkOccurrences[normalizedLink].push(path.relative(srcDir, file));
      }
  }
});

console.log(`Found ${links.size} unique internal routes referenced.`);

const appDir = path.resolve(srcDir, 'app');
const brokenLinks: string[] = [];

links.forEach(link => {
    if (link === '/') return;
    
    // strip dynamic parts e.g. /news/${slug} -> /news/[slug]
    let parts = link.split('/').filter(Boolean);
    
    // Simplistic check, if we have dynamic variables ${...} we treat it dynamically
    let testPath = appDir;
    let found = true;
    for (const part of parts) {
        if (part.includes('${')) {
             // likely dynamic, check if current testPath has a folder with [ something ]
             if (!fs.existsSync(testPath)) { found=false; break; }
             const children = fs.readdirSync(testPath);
             const dynamicFolder = children.find(c => c.startsWith('[') && c.endsWith(']'));
             if (dynamicFolder) {
                 testPath = path.join(testPath, dynamicFolder);
             } else {
                 found = false;
                 break;
             }
        } else {
             testPath = path.join(testPath, part);
        }
    }
    
    if (found) {
        // testPath must be a directory that has page.tsx
        if (!fs.existsSync(path.join(testPath, 'page.tsx')) && !fs.existsSync(testPath) ) {
            found = false;
        }
    }

    if (!found) {
        brokenLinks.push(link);
    }
});

if (brokenLinks.length > 0) {
    console.log("BROKEN LINKS DETECTED:");
    brokenLinks.forEach(l => {
        console.log(`- ${l}`);
        console.log(`  Used in: ${[...new Set(linkOccurrences[l])].join(', ')}`);
    });
} else {
    console.log("ALL INTERNAL LINKS APPEAR VALID.");
}
