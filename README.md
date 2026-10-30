# Vets 4 Life (Vets4L) Website

Website for **Vets 4 Life**: solutions for transitioning service members, spouses, and veterans beyond service to their career and life.

A static site with no build step and no dependencies. Open `index.html` in a browser, or publish the folder as-is with GitHub Pages.

## What's inside

```
index.html          The full website (all tabs live in this one file)
logo.png            Vets4L logo (source image; the site embeds its own copy)
cmmc/
  index.html        CMMC Readiness dashboard (110 NIST SP 800-171 Rev 2 requirements)
  app.js            Dashboard logic: scoring, views, save/export/import
  data.js           Control library + clearly labeled SAMPLE data
.gitignore          Keeps internal files out of the repository
.nojekyll           Tells GitHub Pages to serve files as-is
```

## Site map

The top menu is organized by division. Each tab is a section of `index.html`, switched by the URL hash (for example `index.html#academy`).

| Tab | Hash | Contents |
|---|---|---|
| Home (logo) | `#home` | Hero, division boxes, FISTA collaboration space |
| Div 01 · Vets4L Academy | `#academy` | Courses, exam prep, payment options, 40 Tools courses |
| Div 02 · Workforce | `#workforce-dev` | Pipeline, job seekers and employers, career pathways |
| Div 03 · DFGD | `#dfgd-page` | Defense Federal Growth Division: capability statement, services, pipeline |
| Div 04 · R&D Lab | `#rd-lab` | Nine research chambers |
| Div 05 · Digital Ops | `#digital-ops` | Systems, CMMC Readiness Tool, CMMC quick demo, SOC (coming soon) |
| Div 07 · Programs | `#initiatives` | Programs & initiatives |

Footer-only pages: About (`#about`), Partners (`#partners`), Contact (`#contact`).
Course pages: `#course-40-hours` (Leadership) and `#course-40-days` (Technician).

## Publish with GitHub Pages

1. Create a new repository on GitHub and upload the contents of this folder (keep `index.html` at the top level).
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
4. After a minute the site is live at `https://<your-account>.github.io/<repository-name>/`.

To use a custom domain such as `vets4l.com`, add it under **Settings → Pages → Custom domain** and point your DNS at GitHub Pages.

## CMMC Readiness dashboard

`cmmc/index.html` opens directly from a folder (no server needed) and saves changes in the viewer's browser. Export / Import JSON moves an assessment between machines.

- **Real:** the 110 requirements, families, Basic/Derived types and identifiers (NIST SP 800-171 Rev 2).
- **Sample:** statuses, owners, ACAS findings, roadmap phases and the data-source / automation map. These are labeled SAMPLE on screen until the Atomic workbooks are converted into `data.js`.

### Internal ownership panel

The V4L Ownership panel reads from `cmmc/internal.js`, which is **not** in this package and is listed in `.gitignore`. Keep that file on team machines only and open the dashboard with `cmmc/index.html?internal` to see the panel. Without the file, the panel stays hidden.

## Before going live

- **Images:** most photos load from Unsplash (free license) and some from vets4l.com. Replace them with your own photos and store them in the repository so the site does not depend on other servers.
- **Forms:** contact and request buttons open email to `info@vets4l.com`; enrollment uses the existing Monday.com form.
- **Placeholders:** capability statement details, 40 Tools pricing and capstone outline, and event dates are still to be added.

## Editing

- Page text and layout: `index.html` (styles are in the `<style>` block at the top).
- R&D Lab chambers: the `RD_CHAMBERS` list near the bottom of `index.html`.
- CMMC quick demo numbers: the `cmmcDemo` script near the bottom of `index.html`.
- CMMC dashboard data: `cmmc/data.js`.
