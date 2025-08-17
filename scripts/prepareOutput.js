const fs = require('fs');
const path = require('path');

// This script creates a clean output without redirects
// It directly places all content in the output folder
function cleanOutput() {
  try {
    const outDir = path.join(process.cwd(), 'out');
    
    // Create a .nojekyll file to bypass Jekyll processing on GitHub Pages
    fs.writeFileSync(path.join(outDir, '.nojekyll'), '');
    console.log('✅ Created .nojekyll file');
    
    // Create a basic 404 page
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
    }
    h1 {
      margin-bottom: 1rem;
    }
    a {
      color: #0070f3;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <h1>Page Not Found</h1>
  <p>Sorry, the page you're looking for doesn't exist.</p>
  <p><a href="/">Return to Homepage</a></p>
</body>
</html>`;
    
    fs.writeFileSync(path.join(outDir, '404.html'), notFoundPage);
    console.log('✅ Created 404.html page');
    
    console.log('✅ Output directory prepared for GitHub Pages');
  } catch (error) {
    console.error('❌ Error preparing output:', error);
  }
}

// Run the function
cleanOutput();
