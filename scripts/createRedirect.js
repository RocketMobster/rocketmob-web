const fs = require('fs');
const path = require('path');

// Create a simple HTML redirect file
const redirectHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RocketMobster Software</title>
  <meta http-equiv="refresh" content="0;url=/rocketmob-web/">
  <link rel="icon" href="/rocketmob-web/favicon.ico" />
  <script>
    window.location.href = "/rocketmob-web/";
  </script>
</head>
<body>
  <p>Redirecting to <a href="/rocketmob-web/">RocketMobster Software</a>...</p>
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
