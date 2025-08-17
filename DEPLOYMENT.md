# GitHub Pages Deployment Guide for RocketMobster Website

This guide explains how the website is deployed to GitHub Pages and what to do if you need to update or troubleshoot the deployment.

## Automatic Deployment

The website is automatically deployed to GitHub Pages whenever you push changes to the `main` branch. This is handled by a GitHub Actions workflow defined in `.github/workflows/deploy.yml`.

### How it works:

1. You push changes to the `main` branch
2. GitHub Actions automatically runs the workflow
3. The workflow:
   - Checks out your code
   - Sets up Node.js
   - Installs dependencies
   - Creates a temporary Next.js config that skips TypeScript and ESLint checks
   - Builds the website using `next build`
   - Creates redirects for the root path
   - Uploads the built files to GitHub Pages
   - Deploys the website

### Where to find the deployed site:

Your site will be available at: `https://rocketmobster.github.io/rocketmob-web/`

## Manual Deployment

If you need to manually trigger a deployment:

1. Go to your GitHub repository
2. Click on the "Actions" tab
3. Select the "Deploy to GitHub Pages" workflow
4. Click "Run workflow" button
5. Select the branch to deploy (usually `main`)
6. Click "Run workflow" again

## Checking Deployment Status

You can check the status of your deployments:

1. Go to your GitHub repository
2. Click on the "Actions" tab
3. Look for the most recent "Deploy to GitHub Pages" workflow run
4. Click on it to see details of the deployment process

## Troubleshooting

If deployment fails, check:

1. The Actions log for specific error messages
2. Common issues include:
   - Build errors in your code
   - Missing dependencies
   - Configuration issues in `next.config.ts`
   - Case-sensitivity issues: GitHub Actions runs on Linux which is case-sensitive, ensure file names are consistent (e.g., `CHANGELOG.md` vs `changelog.md`)

## GitHub Pages Settings

If you need to change GitHub Pages settings:

1. Go to your GitHub repository
2. Click on "Settings"
3. Scroll down to "Pages" in the left sidebar
4. Here you can:
   - Set a custom domain
   - Enforce HTTPS
   - View your deployment source

## Local Testing Before Deployment

To test your build locally before pushing:

```bash
npm run build
npx serve out
```

This will create the same build that GitHub Actions will deploy and serve it locally for testing.

## Understanding the Deployment Architecture

The site is built with Next.js static export and deployed to GitHub Pages with the following configuration:

- **Base Path**: `/rocketmob-web/` - This is where the site is deployed on GitHub Pages
- **Repository**: https://github.com/rocketmobster/rocketmob-web

### Important Technical Details:

1. **Next.js Configuration**: 
   - The site uses `next.config.ts` with:
     - `basePath: "/rocketmob-web"`
     - `assetPrefix: "/rocketmob-web/"`
     - `output: "export"`

2. **Physical vs. Virtual Paths**:
   - Next.js `basePath` doesn't create a physical `/rocketmob-web/` folder in the build output
   - The paths are handled by GitHub Pages when deployed
   - All content is physically in the root of the output folder but served at `/rocketmob-web/` path

3. **Redirection Handling**:
   - The `scripts/createRedirect.js` creates:
     - A root `index.html` that redirects to `/rocketmob-web/`
     - A `404.html` with the same redirect (GitHub Pages convention)
   - This script only creates redirects at the ROOT level, not inside the `/rocketmob-web/` path
   - This prevents infinite redirect loops

4. **TypeScript and ESLint Handling**:
   - The build process skips TypeScript and ESLint checks during CI
   - This is necessary to handle dynamic route type errors without failing the build

## Common Issues and Solutions

### Infinite Redirects

If you experience an infinite redirect loop when accessing the site:

1. Check that the redirect script (`scripts/createRedirect.js`) is only creating redirects at the root level
2. Ensure the redirect URL is correct (`/rocketmob-web/` not `/rocketmob-web/index.html`)
3. Make sure there's no redirect file inside the `/rocketmob-web/` path

### 404 Errors

If you get 404 errors on some pages:

1. Check that all pages are being correctly generated in the build output
2. Verify that links in your code use the correct paths (relative to the basePath)
3. Ensure the GitHub Pages deployment completed successfully

### Asset Loading Issues

If images or other assets aren't loading:

1. Verify all asset URLs use the correct path with the `assetPrefix`
2. For images, ensure you're using Next.js `Image` component or include the basePath in URLs
3. Check network requests in browser dev tools to identify specific path issues
