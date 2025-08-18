# GitHub Pages Deployment Guide for RocketMobster Website

This guide explains how the website is deployed to GitHub Pages.

## Deployment Architecture

The site is deployed to GitHub Pages using the following approach:

1. **Next.js Static Export with BasePath**: 
   - The site is built using Next.js static export with basePath and assetPrefix set to `/rocketmob-web`
   - All generated content includes the correct paths for GitHub Pages
   - The fixPaths.js script ensures all navigation links and asset references are correct

2. **GitHub Pages Configuration**:
   - The site is deployed to the repository subdirectory on GitHub Pages
   - Example: `https://rocketmobster.github.io/rocketmob-web/`

## Automatic Deployment

The website is automatically deployed to GitHub Pages whenever you push changes to the `main` branch. This is handled by a GitHub Actions workflow defined in `.github/workflows/deploy.yml`.

### How it works:

1. You push changes to the `main` branch
2. GitHub Actions automatically runs the workflow
3. The workflow:
   - Checks out your code
   - Sets up Node.js
   - Installs dependencies
   - Creates a simple Next.js config
   - Builds the website using `next build`
   - Prepares the output directory for GitHub Pages
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
   - Case-sensitivity issues: GitHub Actions runs on Linux which is case-sensitive, ensure file names are consistent

## GitHub Pages Settings

If you need to check or change GitHub Pages settings:

1. Go to your GitHub repository
2. Click on "Settings"
3. Scroll down to "Pages" in the left sidebar
4. Ensure the source is set to "GitHub Actions"
5. If you want a custom domain, set it here

## Local Testing Before Deployment

To test your build locally before pushing:

```bash
npm run build
npx serve out
```

This will create the same build that GitHub Actions will deploy and serve it locally for testing.
