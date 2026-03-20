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

### Manual (self-hosted)

```bash
# SSH into your N8N server
docker exec -it n8n sh
npm install -g n8n-nodes-preview
# Restart N8N
```

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

### v0.1.0
- Initial release — Preview node with label, size, item index, passthrough options
- Targeted by injector.js v2.1.0+

---

## License

MIT © Ariel Tolome
