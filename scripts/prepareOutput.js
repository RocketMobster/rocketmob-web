const fs = require('fs');
const path = require('path');

// This script prepares the output directory for GitHub Pages
function prepareOutput() {
  try {
    const outDir = path.join(process.cwd(), 'out');
    
    // Make sure the output directory exists
    if (!fs.existsSync(outDir)) {
      console.error('❌ Output directory does not exist.');
      process.exit(1);
    }
    
    // Create a .nojekyll file to bypass Jekyll processing on GitHub Pages
    fs.writeFileSync(path.join(outDir, '.nojekyll'), '');
    console.log('✅ Created .nojekyll file');
    
    // Create a 404 page that maintains styling similar to the site
    const notFoundPage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found - RocketMobster Software</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 650px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
      background-color: #f9fafb;
    }
    h1 {
      margin-bottom: 1rem;
      color: #2563eb;
    }
    a {
      color: #2563eb;
      text-decoration: none;
      font-weight: bold;
    }
    a:hover {
      text-decoration: underline;
    }
    .container {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      padding: 2rem;
      margin-top: 2rem;
    }
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 2rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">🚀 RocketMobster Software</div>
    <h1>Page Not Found</h1>
    <p>Sorry, the page you're looking for doesn't exist.</p>
    <p><a href="/">Return to Homepage</a></p>
  </div>
</body>
</html>`;
    
    fs.writeFileSync(path.join(outDir, '404.html'), notFoundPage);
    console.log('✅ Created 404.html page');
    
    // Create a CNAME file if you're using a custom domain
    // Uncomment and modify the following lines if needed
    // fs.writeFileSync(path.join(outDir, 'CNAME'), 'www.rocketmobster.com');
    // console.log('✅ Created CNAME file');
    
    // Ensure there are no problematic redirects left over from previous approaches
    const indexPath = path.join(outDir, 'index.html');
    if (fs.existsSync(indexPath)) {
      const indexContent = fs.readFileSync(indexPath, 'utf8');
      if (indexContent.includes('http-equiv="refresh"')) {
        console.log('⚠️ Removing redirect from index.html');
        // Read the actual index.html content from the out/_next/static directory
        const correctedContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <meta name="description" content="RocketMobster Software - Mobile and Web Development">
  <title>RocketMobster Software</title>
  <link rel="stylesheet" href="/_next/static/css/app.css">
</head>
<body>
  <div id="__next">
    <!-- Content will be hydrated by Next.js -->
  </div>
  <script src="/_next/static/chunks/main.js" defer></script>
  <script src="/_next/static/chunks/pages/_app.js" defer></script>
  <script src="/_next/static/chunks/pages/index.js" defer></script>
</body>
</html>`;
        fs.writeFileSync(indexPath, correctedContent);
      }
    }
    
    // List all directories in the output folder to verify structure
    console.log('📁 Output directory structure:');
    const dirs = fs.readdirSync(outDir);
    dirs.forEach(dir => {
      const stat = fs.statSync(path.join(outDir, dir));
      console.log(`  ${stat.isDirectory() ? '📂' : '📄'} ${dir}`);
    });
    
    console.log('✅ Output directory prepared for GitHub Pages');
  } catch (error) {
    console.error('❌ Error preparing output:', error);
    console.error(error);
    process.exit(1);
  }
}

// Run the function
prepareOutput();
