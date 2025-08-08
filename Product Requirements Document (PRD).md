Product Requirements Document (PRD)
Project Title: RocketMobster Software Public Website
Owner: RocketMobster Software (Craig Bickford)
Purpose: Build a modern, stylish, mobile-first public website that functions as a digital front door and app showcase for RocketMobster Software. The site must reflect the quirky, fun, and nerdy spirit of the brand and support both users and future community growth.

1. Goals & Objectives
Introduce RocketMobster as a brand and its founder

Highlight and link to apps with SEO-optimized descriptions and call-to-actions

Host an integrated blog/news section

Feature an AI art gallery with fullscreen preview and filter

Promote community engagement (via Discord, newsletter, early access)

Provide an admin backend for content management

Serve as a platform for launching future plugins or dev tools

2. Target Audience
Nerdy mobile users (collectors, creators, fans of Star Wars/Trek, RC hobbyists)

Indie creators and vendors

Hobbyists interested in custom mobile-first tools

Small businesses interested in repair or vendor management tools

3. Key Pages & Components
3.1 Homepage (Hero Banner Rotator)
Rotating hero banner (3-5 slots)

Brand statement & app highlights

CTA: "Explore Our Apps", "Join the Discord", "View Gallery"

3.2 Apps Showcase Page
Grid layout with app cards

Each card includes: app name, short blurb, SEO description, CTA

Dynamic content fed from backend

3.3 Individual App Pages (Optional per app)
Extended blurbs, screenshots, feature list, plugin support info

CTA links to open app or install PWA

3.4 AI Art Gallery
Filterable by category/tag

Grid/tile layout with hover states

Fullscreen preview with swipe support (mobile)

Optional download/share button

3.5 Blog/Newsletter Section
Markdown or WYSIWYG managed posts

Auto-post to Discord (#announcements)

Tags/categories (e.g., devlog, update, tip)

3.6 About Page
Brief bio

RocketMobster Software mission

Founder story & links to social or GitHub

3.7 Contact Page
Simple contact form (name/email/message)

Optional embed for newsletter signup

3.8 Admin Backend
Secure login

Manage hero banners, app blurbs, blog posts, gallery images & tags, theme/branding

4. Design & Style Requirements
Responsive (mobile-first)

Tailwind CSS + React (preferred)

Animated UI (Framer Motion or similar)

Fun, retro-tech, comic/SciFi vibe

Use RocketMobster brand colors (to be finalized)

Clean integration of app logos and icons

5. Technology Stack
Frontend: React + TailwindCSS

Backend: Node/Express or Firebase/Firestore (flexible)

Image Hosting: Cloudinary or similar

Deployment: Vercel or Netlify

CMS: Custom-built with admin panel

6. Integrations
Discord (join link, webhook for announcements)

SubnP API (for ForceFoundry images if applicable)

Google Analytics

Optional Stripe (for future app upgrades/premium tiers)

7. SEO & Metadata
Meta titles/descriptions per page

OpenGraph/Twitter Card support

Sitemap + robots.txt

Blog schema markup

8. Deliverables
Fully functional website (frontend + backend)

Admin panel with access control

Source code repo (GitHub)

Deployment ready on chosen platform

Docs: Setup, usage, content management

9. Timeline
Phase 1: Static Frontend MVP (2 weeks)

Homepage, Apps Grid, About Page, Basic Gallery

Phase 2: Backend + Admin Panel (2 weeks)

Dynamic content, CMS, authentication

Phase 3: Final Polish (1 week)

Animations, SEO, mobile optimization, QA

10. Success Metrics
Time-on-site > 2 minutes

Bounce rate < 50%

Newsletter signups

Discord joins from site

Page performance score > 90 (Lighthouse)

11. Open Questions
Will blog be imported from Markdown repo or hosted natively?

Which gallery categories should be default?

Should plugins or ForceFoundry characters be user-shareable via site?

Will domain be rocketmobster.com or subdomain for site?

12. Notion-Style Project Tracker & GitHub Projects Board
Markdown import file with task statuses: Backlog, To Do, In Progress, Blocked, Done

GitHub Projects Kanban board with matching columns and labels

Labels: frontend, backend, design, cms, seo, auth, gallery

13. React Scaffolding & GitHub Repo Integration
Initial React component scaffolding for homepage, apps grid, gallery

GitHub API integration for latest commit info on apps page

Tie your existing RocketMobster GitHub repo into the website to display project info dynamically

14. GitHub Issue Templates
14.1 Bug Report Template (YAML - Automatic Issue Form)
yaml
Copy
Edit
name: "🐞 Bug Report"
description: Report an issue or unexpected behavior in a RocketMobster app
title: "[BUG] <brief description>"
labels: [bug]
assignees: []

body:
  - type: markdown
    attributes:
      value: |
        Thanks for helping improve RocketMobster Software! Please complete the form below.

  - type: input
    id: app_name
    attributes:
      label: App Name
      placeholder: e.g., Vaultly, ForceFoundry, StarPath
    validations:
      required: true

  - type: textarea
    id: bug_description
    attributes:
      label: Describe the bug
      description: A clear and concise description of what the bug is.
      placeholder: e.g., When I tap "Save", the app crashes with no error message.
    validations:
      required: true

  - type: textarea
    id: steps_to_reproduce
    attributes:
      label: Steps to Reproduce
      description: Include specific steps to reproduce the issue.
      placeholder: |
        1. Go to '...'
        2. Click on '...'
        3. Scroll down to '...'
        4. See error
    validations:
      required: true

  - type: input
    id: device_info
    attributes:
      label: Device Info
      placeholder: e.g., Android 13 on Pixel 6, Safari on iOS 17
    validations:
      required: false

  - type: textarea
    id: screenshots
    attributes:
      label: Screenshots or Logs
      description: If applicable, add screenshots or paste logs.
      placeholder: Drag & drop or paste images/logs here
    validations:
      required: false

  - type: dropdown
    id: severity
    attributes:
      label: Severity
      options:
        - 🟢 Low (UI glitch or rare)
        - 🟡 Medium (some features don't work)
        - 🔴 High (app crashes, data loss)
    validations:
      required: true
14.2 Bug Report Template (Markdown - Fallback Version)
md
Copy
Edit
---
name: "🐞 Bug Report"
about: Report a bug in a RocketMobster app
title: "[BUG] "
labels: bug
assignees: ''
---

**App Name**  
Which RocketMobster app is this related to? (e.g., Vaultly, ForceFoundry, StarPath, etc.)

**Describe the bug**  
A clear and concise description of what the bug is.

**To Reproduce**  
Steps to reproduce the behavior:  
1. Go to '...'  
2. Click on '...'  
3. Scroll down to '...'  
4. See error

**Expected behavior**  
What you expected to happen instead.

**Screenshots or Logs**  
If applicable, add screenshots to help explain your problem.

**Device Info (if applicable):**  
 - OS: [e.g. iOS 17, Android 13, Windows 11]  
 - Browser/App Version: [e.g. Chrome 114, Safari, PWA version]

**Severity**  
How severe is this issue?  
- 🟢 Low (cosmetic, minor)  
- 🟡 Medium (feature doesn't work right)  
- 🔴 High (crashes, blocks use)

**Additional context**  
Add any other context about the problem here.