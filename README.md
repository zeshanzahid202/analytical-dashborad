# Vanguard Analytics Dashboard

Responsive React + TypeScript dashboard with eight pages, light/dark themes, search navigation, editable demo users/products/customers, transaction status updates, notifications, and downloadable reports.

## Run locally

Use Node.js 22.12 or newer (Node 22 LTS recommended).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Check and build with `npm run lint` and `npm run build`; use `npm run preview` to inspect the production build.

## Deploy to GitHub Pages

1. Create an empty GitHub repository and upload this project's source, including `.github/workflows/deploy.yml`. Do not upload `node_modules`, `dist`, or environment secrets. Use `main` as the default branch.
2. In the repository, open **Settings > Pages > Build and deployment > Source**, and select **GitHub Actions**.
3. Push to `main` (or run **Check and deploy dashboard** from the Actions tab).
4. Wait for the build and deploy jobs to pass. The deployment shows your live site address.

The workflow installs from `package-lock.json`, type checks, builds, and deploys `dist`. Pull requests run the checks without publishing. Relative assets and hash navigation support project repositories and page refreshes without server rewrite rules.

Official setup reference: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## What this version supports

This is a static, deployable demo workspace using sample business data. Edits, notification read state, report entries, and preferences persist in this browser's local storage. Clear site data to reset the demo. CSV and JSON downloads contain current workspace data; PDF reports contain a one-page transaction summary (up to 44 records). Revenue charts offer sample datasets by date range; other KPI cards remain illustrative snapshots.

## Live business use

There is no backend, sign-in, shared database, real payment processing, email sending, or server API. Demo identifiers are not authentication credentials. Real customer data requires a backend with access control and a database; GitHub Pages only hosts the frontend. Never enter private customer information into a public demo.
