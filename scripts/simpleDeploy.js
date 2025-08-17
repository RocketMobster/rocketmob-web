const fs = require('fs');
const path = require('path');

// Simple script to create a physical rocketmob-web folder
// and place the Next.js output inside it
function organizeOutput() {
  try {
    const outDir = path.join(process.cwd(), 'out');
    const repoName = 'rocketmob-web';
    const repoDir = path.join(outDir, repoName);

    // 1. Create the repo directory if it doesn't exist
    if (!fs.existsSync(repoDir)) {
      fs.mkdirSync(repoDir, { recursive: true });
      console.log(`✅ Created ${repoName} directory`);
    }

    // 2. Get all files in the out directory (excluding the repo directory itself)
    const outFiles = fs.readdirSync(outDir).filter(item => {
      const fullPath = path.join(outDir, item);
      return item !== repoName && fs.existsSync(fullPath);
    });

    // 3. For all normal files in the output directory, move them to repo directory
    outFiles.forEach(file => {
      const sourcePath = path.join(outDir, file);
      const destPath = path.join(repoDir, file);

      if (fs.lstatSync(sourcePath).isDirectory()) {
        // For directories, copy recursively
        copyFolderRecursiveSync(sourcePath, repoDir);
      } else {
        // For files, just copy
        fs.copyFileSync(sourcePath, destPath);
      }
      console.log(`✅ Copied ${file} to ${repoName}/`);
    });

    // 4. Create a very simple root index.html with a basic redirect
    const rootRedirect = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0;url=/rocketmob-web/">
  <title>Redirecting to RocketMobster Software</title>
</head>
<body>
  <p>Redirecting to <a href="/rocketmob-web/">RocketMobster Software</a>...</p>
</body>
</html>`;

    fs.writeFileSync(path.join(outDir, 'index.html'), rootRedirect);
    console.log('✅ Created simple root redirect');
  } catch (error) {
    console.error('❌ Error organizing output:', error);
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
organizeOutput();
