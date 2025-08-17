const fs = require('fs');
const path = require('path');

// This script fixes any remaining /rocketmob-web/ references in the built files
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
          
          // Replace any references to /rocketmob-web/ with / (but not in URLs to external sites)
          if (content.includes('/rocketmob-web/')) {
            const newContent = content.replace(/\/rocketmob-web\//g, '/');
            fs.writeFileSync(filePath, newContent);
            console.log(`✅ Fixed paths in ${filePath}`);
          }
        }
      });
    }
    
    // Process the entire output directory
    processDirectory(outDir);
    console.log('✅ Fixed all paths in the output directory');
  } catch (error) {
    console.error('❌ Error fixing paths:', error);
    console.error(error);
    process.exit(1);
  }
}

// Run the function
fixPaths();
