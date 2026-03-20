# Changelog

All notable changes to `n8n-nodes-preview` are documented here.

## [0.3.0] — 2026-03-20

### Added
- GitHub Actions CI workflow (`.github/workflows/ci.yml`)
  - Runs on push/PR to `main`
  - Tests on Node.js 18.x and 20.x
  - Steps: `npm ci` → `npm run lint` → `npm run build` → verify dist output → `npm pack --dry-run`
- ESLint v10 flat config (`eslint.config.js`) with `@typescript-eslint` plugin
- `CHANGELOG.md` (this file)
- `CONTRIBUTING.md` — how to build locally and PR process

### Changed
- `package.json` scripts: `lint` now uses ESLint flat config (v10 compatible)

---

## [0.2.0] — 2026-03-20

### Added
- `maxItems` property — cap number of previews shown (1–50, default 5)
- `showFilename` property — toggle binary filename display below each preview (default true)
- `autoExpand` property — auto-expand node on canvas when preview is ready (default true)

### Notes
- Requires injector.js v2.2.0+ to read these params from workflow JSON
- Reinstalled in production Docker container

---

## [0.1.1] — 2026-03-20

### Added
- Comprehensive Docker install instructions in README
- Documented manual tarball install steps for self-hosted N8N

### Fixed
- Confirmed community node installs and loads cleanly in Docker container

---

## [0.1.0] — 2026-03-19

### Added
- Initial release
- `Preview` node (passthrough type `n8n-nodes-preview.previewNode`)
- Properties: `label`, `previewSize` (small/medium/large/full), `itemIndex`, `passThrough`
- Orange `#ff9800` node color — targeted by injector.js
- Pairs with [n8n-node-preview](https://github.com/ArielleTolome/n8n-node-preview) injector
