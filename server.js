// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
const repoName = 'rocketmob-web'; // Must match the repoName in next.config.ts

// Create the Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Create a redirect HTML to serve at the root
const redirectHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RocketMobster Software</title>
  <meta http-equiv="refresh" content="0;url=/${repoName}/">
  <link rel="icon" href="/${repoName}/favicon.ico" />
  <script>
    window.location.href = "/${repoName}/";
  </script>
</head>
<body>
  <p>Redirecting to <a href="/${repoName}/">RocketMobster Software</a>...</p>
</body>
</html>
`;

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Parse the URL
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      // Handle the root path
      if (pathname === '/') {
        // Serve the redirect HTML
        res.setHeader('Content-Type', 'text/html');
        res.write(redirectHtml);
        res.end();
        return;
      }

      // Handle direct favicon requests at the root
      if (pathname === '/favicon.ico') {
        try {
          // Redirect to the correct favicon location
          res.writeHead(302, {
            'Location': `/${repoName}/favicon.ico`
          });
          res.end();
          return;
        } catch (e) {
          console.error('Error handling favicon redirect:', e);
        }
      }

      // Let Next.js handle all other requests
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
