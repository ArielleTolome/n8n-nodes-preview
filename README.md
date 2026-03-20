# n8n-nodes-preview

> Weavy AI / ComfyUI-style inline canvas previews for N8N — add a **Preview** node anywhere in your workflow to see image, video, or JSON output directly on the canvas.

![Preview Node](https://img.shields.io/badge/n8n-community--node-ff9800?style=flat-square)
![Version](https://img.shields.io/github/v/release/ArielleTolome/n8n-nodes-preview?style=flat-square)

---

## What it does

Connect a **Preview** node after any node that produces binary output (images, video, PDFs) or JSON. Instead of clicking through to the side panel, the output renders **inline on the canvas** — just like ComfyUI's Preview Image node or Weavy AI's visual workflow builder.

- ✅ Images — full-width preview cards, click to open lightbox
- ✅ Video — hover to play inline
- ✅ JSON / text — formatted output
- ✅ PDFs, audio — rendered inline
- ✅ Passthrough — data flows through unchanged
- ✅ Per-node size control (small/medium/large/full)
- ✅ Optional label per preview

---

## Installation

### Via N8N Community Nodes (recommended)

1. Open your N8N instance
2. **Settings → Community Nodes → Install**
3. Enter: `n8n-nodes-preview`
4. Click Install

### Manual install for self-hosted N8N (Docker)

```bash
# 1. Build the package locally (or download from GitHub releases)
git clone https://github.com/ArielleTolome/n8n-nodes-preview
cd n8n-nodes-preview
npm install
npm run build
npm pack    # produces n8n-nodes-preview-X.Y.Z.tgz

# 2. Copy the tarball to your server
scp n8n-nodes-preview-*.tgz root@YOUR_SERVER:/tmp/

# 3. Install inside the n8n Docker container
ssh root@YOUR_SERVER
docker exec n8n sh -c 'mkdir -p /home/node/.n8n/nodes && cd /home/node/.n8n/nodes && npm install /tmp/n8n-nodes-preview-*.tgz'

# 4. Restart n8n to load the new node
docker restart n8n

# 5. Verify the node is loaded (check container logs)
docker logs n8n 2>&1 | tail -20
# You should see "Editor is now accessible" — the node is available in the palette
```

> **Tip:** After each upgrade, repeat steps 2–5 with the new tarball.

---

## Setup — injector.js (required)

The canvas rendering is handled by **injector.js**, a companion script served via nginx.

> The community node marks nodes on the canvas with `data-node-type="n8n-nodes-preview.previewNode"`. The injector reads execution results and renders preview cards on those nodes.

See the [n8n-node-preview](https://github.com/ArielleTolome/n8n-node-preview) repo for nginx setup instructions.

---

## Usage

1. Add a **Preview** node from the N8N palette (search "Preview")
2. Connect it after any node that outputs binary data or JSON
3. Run the workflow — previews appear inline on the canvas
4. Click any preview to open a full lightbox

### Node properties

| Property | Description |
|---|---|
| **Label** | Optional caption shown on the preview card |
| **Preview Size** | small (160px) / medium (220px) / large (300px) / full |
| **Show for Item Index** | Which item to preview (0 = first, -1 = all) |
| **Pass Through Data** | Pass data to next node (default: on) |

---

## Architecture

```
[HTTP Request] → [Preview] → [next node]
                     ↑
              injector.js detects
              data-node-type="n8n-nodes-preview.previewNode"
              and renders binary output as cards
```

The Preview node itself is a pure passthrough — zero transformation, zero latency. All rendering happens in the browser via injector.js.

---

## Changelog

### v0.1.1
- Added comprehensive Docker install instructions to README
- Confirmed install in Docker container on pigeonfi.com N8N instance

### v0.1.0
- Initial release — Preview node with label, size, item index, passthrough options
- Targeted by injector.js v2.1.0+

---

## License

MIT © Ariel Tolome
