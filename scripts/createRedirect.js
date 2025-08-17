const fs = require('fs');
const path = require('path');

// Create a simple HTML redirect file that uses a more defensive approach
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
</head>
<body>
  <h1>RocketMobster Software</h1>
  <p>Please click the link below to continue to our website:</p>
  <p><a href="/rocketmob-web/index.html" id="redirect-link">Continue to RocketMobster Software</a></p>
  
  <script>
    // Prevent infinite redirects by checking the URL
    document.addEventListener('DOMContentLoaded', function() {
      // Only redirect automatically if we're at the root, not in /rocketmob-web/
      if (!window.location.pathname.includes('/rocketmob-web/')) {
        // Delay redirect slightly to avoid rapid reload issues
        setTimeout(function() {
          window.location.href = document.getElementById('redirect-link').getAttribute('href');
        }, 100);
      }
    });
  </script>
</body>
</html>`;

// This script runs after the build is complete
// It creates a root index.html that redirects to /rocketmob-web/
function copyRedirectToRoot() {
  try {
    // Ensure the out directory exists
    if (fs.existsSync('out')) {
      // Write the redirect HTML to the root of the out directory
      fs.writeFileSync(path.join('out', 'index.html'), redirectHtml);
      console.log('✅ Successfully created root redirect to /rocketmob-web/');
    } else {
      console.error('❌ Output directory "out" not found!');
    }
  } catch (error) {
    console.error('❌ Error creating redirect:', error);
  }
}

// Run the function
copyRedirectToRoot();
