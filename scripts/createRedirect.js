const fs = require('fs');
const path = require('path');

// Create a simple HTML redirect file with path checking to prevent infinite loops
const redirectHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RocketMobster Software</title>
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
  <script>
    // Path check to prevent infinite loops
    document.addEventListener('DOMContentLoaded', function() {
      // Only redirect if we're not already in the rocketmob-web path
      var currentPath = window.location.pathname;
      if (!currentPath.startsWith('/rocketmob-web/')) {
        setTimeout(function() {
          window.location.href = "/rocketmob-web/";
        }, 1000);
      }
    });
  </script>
</head>
<body>
  <h1>RocketMobster Software</h1>
  <p>Please click the link below to continue to our website:</p>
  <p><a href="/rocketmob-web/">Continue to RocketMobster Software</a></p>
</body>
</html>`;

// This script runs after the build is complete
// It ONLY creates a redirect at the ROOT level to /rocketmob-web/
function createRootRedirect() {
  try {
    // Ensure the out directory exists
    if (fs.existsSync('out')) {
      // Write the redirect HTML to the root index.html ONLY
      fs.writeFileSync(path.join('out', 'index.html'), redirectHtml);
      console.log('✅ Successfully created root redirect to /rocketmob-web/');
      
      // Also create a 404.html with the same redirect (GitHub Pages convention)
      fs.writeFileSync(path.join('out', '404.html'), redirectHtml);
      console.log('✅ Created 404.html redirect');
    } else {
      console.error('❌ Output directory "out" not found!');
    }
  } catch (error) {
    console.error('❌ Error creating redirect:', error);
  }
}

// Run the function
createRootRedirect();
