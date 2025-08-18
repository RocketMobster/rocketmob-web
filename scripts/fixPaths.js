const fs = require('fs');
const path = require('path');

// This script fixes paths in the built files to work correctly with GitHub Pages
function fixPaths() {
  try {
    const outDir = path.join(process.cwd(), 'out');
    const basePath = '/rocketmob-web';  // The GitHub Pages repository path
    
    // Function to recursively process HTML and CSS files
    function processDirectory(directory) {
      const files = fs.readdirSync(directory);
      
      files.forEach(file => {
        const filePath = path.join(directory, file);
        const stats = fs.statSync(filePath);
        
        if (stats.isDirectory()) {
          processDirectory(filePath);
        } else if (file.endsWith('.html') || file.endsWith('.css') || file.endsWith('.js')) {
          let content = fs.readFileSync(filePath, 'utf8');
          let modified = false;

          // Manually fix the home page link first (special case)
          if (content.includes('href="/"')) {
            content = content.replace(/href="\/"/, `href="${basePath}/"`);
            modified = true;
          }
          
          // Fix the RocketMobster home link to include trailing slash
          const homeLinkPattern = new RegExp(`href="${basePath}"[^/]`);
          if (homeLinkPattern.test(content)) {
            content = content.replace(homeLinkPattern, (match) => match.replace(`href="${basePath}"`, `href="${basePath}/"`));
            modified = true;
          }
          
          // Fix navigation links: update href="/page" to href="/rocketmob-web/page"
          const linkPattern = /href="\/([a-zA-Z0-9_-]+)"/g;
          if (content.match(linkPattern)) {
            content = content.replace(linkPattern, `href="${basePath}/$1"`);
            modified = true;
          }
          
          // Fix image sources: update src="/" to src="/rocketmob-web/"
          if (content.includes('src="/') && !content.includes('src="/rocketmob-web')) {
            content = content.replace(/src="\//g, `src="${basePath}/`);
            modified = true;
          }
          
          // Fix asset references in preload links
          if (content.includes('href="/') && !content.includes('href="/rocketmob-web')) {
            content = content.replace(/href="\/([^"]+)"/g, `href="${basePath}/$1"`);
            modified = true;
          }
          
          // Fix any duplicate paths that might have been created
          if (content.includes(`${basePath}/${basePath.substring(1)}`)) {
            content = content.replace(new RegExp(`${basePath}/${basePath.substring(1)}`, 'g'), `${basePath}`);
            modified = true;
          }

          // GitHub Pages can have issues with paths starting with /_next
          // This ensures that asset paths are correctly formatted for GitHub Pages
          if (content.includes('"/_next/')) {
            content = content.replace(/"\/_next\//g, `"${basePath}/_next/`);
            modified = true;
          }

          // Fix other static asset paths with absolute references
          if (content.includes('"./_next/')) {
            content = content.replace(/"\.\/_next\//g, `"${basePath}/_next/`);
            modified = true;
          }
          
          if (modified) {
            fs.writeFileSync(filePath, content);
            console.log(`✅ Fixed paths in ${filePath}`);
          }
        }
      });
    }
    
    // Process the entire output directory
    processDirectory(outDir);
    console.log('✅ Fixed all paths in the output directory');
    
    // Create a .nojekyll file to prevent GitHub Pages from ignoring files starting with _
    const nojekyllPath = path.join(outDir, '.nojekyll');
    if (!fs.existsSync(nojekyllPath)) {
      fs.writeFileSync(nojekyllPath, '');
      console.log('✅ Created .nojekyll file');
    }
  } catch (error) {
    console.error('❌ Error fixing paths:', error);
    console.error(error);
    process.exit(1);
  }
}

// Run the function
fixPaths();
