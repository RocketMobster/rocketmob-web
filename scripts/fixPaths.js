const fs = require('fs');
const path = require('path');

// This script fixes any remaining /rocketmob-web/ references in the built files
// and ensures that all asset paths are correctly formatted for GitHub Pages
function fixPaths() {
  try {
    const outDir = path.join(process.cwd(), 'out');
    
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
          
          // Replace any references to /rocketmob-web/ with / (but not in URLs to external sites)
          if (content.includes('/rocketmob-web/')) {
            content = content.replace(/\/rocketmob-web\//g, '/');
            modified = true;
          }

          // GitHub Pages can have issues with paths starting with /_next
          // This ensures that asset paths are correctly formatted for GitHub Pages
          if (content.includes('"/_next/')) {
            content = content.replace(/"\/_next\//g, '"./_next/');
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
