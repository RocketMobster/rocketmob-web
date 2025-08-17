const fs = require('fs');
const path = require('path');

// The repository name (used for basePath and folder structure)
const repoName = 'rocketmob-web';

// Function to create a properly structured GitHub Pages deployment
function organizeForGitHubPages() {
  try {
    const outDir = path.join(process.cwd(), 'out');
    const repoDir = path.join(outDir, repoName);

    // 1. Create the repo directory if it doesn't exist
    if (!fs.existsSync(repoDir)) {
      fs.mkdirSync(repoDir, { recursive: true });
      console.log(`✅ Created ${repoName} directory`);
    }

    // 2. Get all files in the out directory (excluding the repo directory itself)
    const outFiles = fs.readdirSync(outDir).filter(item => {
      const fullPath = path.join(outDir, item);
      return item !== repoName && !fullPath.includes('node_modules');
    });

    // 3. Move all files except index.html and 404.html to the repo directory
    outFiles.forEach(file => {
      const sourcePath = path.join(outDir, file);
      const destPath = path.join(repoDir, file);

      // Skip index.html and 404.html
      if (file !== 'index.html' && file !== '404.html') {
        if (fs.lstatSync(sourcePath).isDirectory()) {
          // For directories, copy recursively
          copyFolderRecursiveSync(sourcePath, repoDir);
        } else {
          // For files, just copy
          fs.copyFileSync(sourcePath, destPath);
        }
        console.log(`✅ Copied ${file} to ${repoName}/`);
      }
    });

    // 4. Create a root index.html that redirects to the repo path
    const rootIndexHtml = `<!DOCTYPE html>
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
      if (!currentPath.startsWith('/${repoName}/')) {
        setTimeout(function() {
          window.location.href = "/${repoName}/";
        }, 1000);
      }
    });
  </script>
</head>
<body>
  <h1>RocketMobster Software</h1>
  <p>Please click the link below to continue to our website:</p>
  <p><a href="/${repoName}/">Continue to RocketMobster Software</a></p>
</body>
</html>`;

    fs.writeFileSync(path.join(outDir, 'index.html'), rootIndexHtml);
    console.log('✅ Created root redirect index.html');

    // 5. Create a 404.html with the same content
    fs.writeFileSync(path.join(outDir, '404.html'), rootIndexHtml);
    console.log('✅ Created 404.html redirect');

    // 6. Create a proper index.html file in the repo directory
    // This should be the real homepage, not a redirect
    const websiteHomepage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="RocketMobster Software - Creating fun and nerdy apps">
  <title>RocketMobster Software - Home</title>
  <link rel="stylesheet" href="/_next/static/css/f55ca927241b19f0.css">
  <style>
    /* Basic styles for the homepage */
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    h1 {
      margin-bottom: 1rem;
      color: #0070f3;
    }
    .hero {
      text-align: center;
      margin-bottom: 2rem;
    }
    .nav {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .nav a {
      color: #0070f3;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      background-color: #f0f0f0;
    }
    .nav a:hover {
      background-color: #e0e0e0;
    }
  </style>
</head>
<body>
  <div class="hero">
    <h1>RocketMobster Software</h1>
    <p>Creating fun and nerdy apps for the modern world</p>
  </div>
  
  <div class="nav">
    <a href="/rocketmob-web/about">About</a>
    <a href="/rocketmob-web/apps">Apps</a>
    <a href="/rocketmob-web/captains-log">Captain's Log</a>
    <a href="/rocketmob-web/gallery">Gallery</a>
    <a href="/rocketmob-web/contact">Contact</a>
  </div>
  
  <div>
    <h2>Welcome to RocketMobster Software</h2>
    <p>
      This is the home of RocketMobster Software, where we create apps and experiences 
      that are both functional and fun. Explore our site to learn more about our projects
      and the nerdy things we love.
    </p>
    
    <h2>Latest Updates</h2>
    <ul>
      <li>
        <a href="/rocketmob-web/captains-log/welcome-to-the-captains-log">Welcome to the Captain's Log</a>
        - Our new blog is now live!
      </li>
      <li>
        <a href="/rocketmob-web/captains-log/ai-art-gallery-behind-the-scenes">AI Art Gallery Behind the Scenes</a>
        - Learn how we created our AI art gallery
      </li>
    </ul>
  </div>
  
  <footer style="margin-top: 3rem; text-align: center; font-size: 0.8rem; color: #666;">
    &copy; 2025 RocketMobster Software. All rights reserved.
  </footer>
</body>
</html>`;
    
    // Create the index.html file in the repo directory
    fs.writeFileSync(path.join(repoDir, 'index.html'), websiteHomepage);
    console.log(`✅ Created custom ${repoName}/index.html homepage`);

    console.log('✅ Successfully organized files for GitHub Pages deployment');
  } catch (error) {
    console.error('❌ Error organizing files:', error);
  }
}

// Helper function to copy directories recursively
function copyFolderRecursiveSync(source, target) {
  // Get the name of the folder
  const targetFolder = path.join(target, path.basename(source));
  
  // Create target folder if it doesn't exist
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder, { recursive: true });
  }

  // Copy contents
  if (fs.lstatSync(source).isDirectory()) {
    const files = fs.readdirSync(source);
    files.forEach(file => {
      const currentSource = path.join(source, file);
      if (fs.lstatSync(currentSource).isDirectory()) {
        copyFolderRecursiveSync(currentSource, targetFolder);
      } else {
        fs.copyFileSync(currentSource, path.join(targetFolder, file));
      }
    });
  }
}

// Run the function
organizeForGitHubPages();
