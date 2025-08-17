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
   - Builds the website using `npm run build`
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

## Redirection Handling

The site implements a user-friendly redirection system:

1. Root URL redirection:
   - The root URL (https://rocketmobster.github.io/) presents a simple landing page
   - Users can click to continue to the site or will be auto-redirected if at the root
   - A conditional check prevents infinite redirect loops
   
2. Page not found handling:
   - A custom 404.html page in the public directory provides friendly error messages
   - Users can easily navigate back to the homepage from any not-found page

## Important Notes

- The site uses basePath `/rocketmob-web` for all routes
- Static files are served from `/rocketmob-web/` path
- Root path (`/`) redirects to `/rocketmob-web/`
- The build process automatically handles proper path configuration
- The project uses Next.js static export (`output: "export"` in next.config.ts) 
- There is no need to run `next export` separately - it's included in the build process
