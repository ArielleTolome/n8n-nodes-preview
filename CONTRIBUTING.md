# Contributing to n8n-nodes-preview

Thanks for your interest in contributing! Here's how to get started.

## Local Development

### Prerequisites

- Node.js 18+ (20 recommended)
- npm 8+
- An N8N instance for testing (self-hosted recommended)

### Build locally

```bash
git clone https://github.com/ArielleTolome/n8n-nodes-preview
cd n8n-nodes-preview
npm install
npm run build
```

The compiled output goes to `dist/`.

### Lint

```bash
npm run lint
```

Uses ESLint v10 flat config with TypeScript rules.

### Test in N8N (Docker)

```bash
# Build and pack
npm run build
npm pack  # produces n8n-nodes-preview-X.Y.Z.tgz

# Copy to server and install in container
scp n8n-nodes-preview-*.tgz root@YOUR_SERVER:/tmp/
ssh root@YOUR_SERVER "docker cp /tmp/n8n-nodes-preview-*.tgz n8n:/tmp/ && docker exec --user root n8n sh -c 'cd /home/node/.n8n/nodes && npm install /tmp/n8n-nodes-preview-*.tgz'"

# Restart n8n
ssh root@YOUR_SERVER "docker restart n8n"
```

## Pull Request Process

1. Fork the repo and create a feature branch: `git checkout -b feat/my-feature`
2. Make your changes in `src/`
3. Run `npm run lint` — fix any issues
4. Run `npm run build` — ensure it compiles without errors
5. Update `CHANGELOG.md` with your changes under an `[Unreleased]` heading
6. Open a PR against `main` with a clear description

### Commit message format

```
feat: short description of new feature
fix: short description of bug fix
docs: documentation changes
chore: build, deps, CI changes
```

## Architecture

The Preview node is intentionally minimal — a pure passthrough. All canvas rendering is handled by the companion [injector.js](https://github.com/ArielleTolome/n8n-node-preview).

```
PreviewNode.node.ts
  ├── Declares node type: "n8n-nodes-preview.previewNode"
  ├── Properties stored in workflow JSON (read by injector)
  └── execute(): returns items unchanged (or [] if passThrough=false)
```

The injector reads `node.parameters` from `/api/v1/workflows/<id>` to apply per-node settings like `previewSize`, `label`, `itemIndex`, and `maxItems`.

## Questions?

Open a GitHub issue or ping [@ArielleTolome](https://github.com/ArielleTolome).
