# Changelog

## v0.1.1 (2025-08-17)

### Added
- Custom development server with redirect handling from root to `/rocketmob-web/`
- Post-build script to create root index.html redirect for static exports
- Favicon handling for both development and production environments

### Changed
- Updated image paths to work correctly with basePath configuration
- Improved metadata configuration for favicon in layout.tsx
- Modified development workflow to support proper redirection

### Fixed
- Fixed 404 errors for favicon.ico at root path
- Fixed image loading in HeroBanner component with proper path prefixing
- Fixed navigation links to work consistently with basePath
- Fixed static export compatibility issues with middleware and redirects

## v0.1.0 (2025-07-26)

### Added
- Initial Next.js + TypeScript + Tailwind CSS project scaffolded for RocketMobster Software.
- Homepage with animated hero image rotator (HeroBanner) and slide indicators.
- Apps page with app cards, GitHub and live preview links.
- AI Art Gallery with modal previews, swipe, download/share, filtering, sorting, infinite scroll, and accessibility features.
- Blog (The Captain’s Log) with markdown, code, images, links, filtering, sorting, and admin CRUD scaffolding.
- About page with hero section, company info, and bio card (with image support).

### Changed
- Replaced placeholder PixelBot app with NicheVendor, including correct links and preview.
- Updated About and homepage hero images to use RocketMobster_Avatar.jpeg and My Head.jpg as appropriate.
- Improved About bio card styling for color theme and readability.
- Incorporated RocketMobster_Avatar.jpeg as the first slide in the hero rotator, with overlay text and styling.
- Added slide indicators (dots) to hero rotator.
- Adjusted hero rotator image slide for vertical alignment and overlay.
- Updated hero rotator first slide text to: "Nerdy, Creative, and Professional Tools for Every Niche".
- Added code comments and TODOs for future admin backend integration and homepage editor.

### Removed
- Large round avatar image above hero rotator on homepage.

### Fixed
- Lint and syntax errors in homepage and hero rotator.
- Type errors in image slide handling.

---

All major features and UI/UX improvements up to this point are now versioned. See ROADMAP.md for next steps.
