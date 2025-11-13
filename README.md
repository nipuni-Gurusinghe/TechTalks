# Simple SEO-Friendly Blog (Next.js + Tailwind)

This small project demonstrates how to build a minimal SEO-friendly blog using Next.js (SSG) and Tailwind CSS.

## Features
- Static Site Generation for article pages (`getStaticProps` + `getStaticPaths`)
- Unique `<title>` and `<meta name="description">` per page
- robots.txt and sitemap.xml ready in `/public`
- Tailwind CSS for responsive UI
- 3 sample articles stored in `data/articles.json`

## Quick setup (on your machine)

1. Ensure you have Node.js (v18+) and npm/yarn installed.
2. Unzip the project and `cd` into the project folder.
3. Run `npm install` (or `yarn`) to install dependencies.
4. Run `npm run dev` to start the dev server.
5. Open http://localhost:3000 in your browser.

## Notes on SEO demonstration
- Article pages are pre-rendered at build time (SSG). Each page has unique meta tags (title + description).
- Add analytics and structured data as next steps for enhanced SEO.
