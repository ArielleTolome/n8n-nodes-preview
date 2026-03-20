# Verification Checklist

Run these checks to verify the full stack is working on production.

## 1. Injector Version

```bash
sshpass -p 'PASSWORD' ssh root@135.181.57.124 \
  "grep -o \"VERSION = '[0-9.]*'\" /opt/n8n-preview/injector.js | head -1"
```

**Expected output:**
```
VERSION = '2.4.0'
```

---

## 2. Nginx Config Test

```bash
sshpass -p 'PASSWORD' ssh root@135.181.57.124 "nginx-rc -t 2>&1 | tail -2"
```

**Expected output:**
```
nginx: the configuration file /etc/nginx-rc/nginx.conf syntax is ok
nginx: configuration file /etc/nginx-rc/nginx.conf test is successful
```

> Note: SSL stapling warning is expected and non-fatal.

---

## 3. Nginx Cache Buster

```bash
sshpass -p 'PASSWORD' ssh root@135.181.57.124 \
  "grep -o 'v=[0-9.]*-[0-9]*' /etc/nginx-rc/extra.d/n8n-ai.location.root.n8n-preview.conf"
```

**Expected output:**
```
v=2.4.0-<timestamp>
```

---

## 4. N8N Community Node Registration

```bash
sshpass -p 'PASSWORD' ssh root@135.181.57.124 \
  "docker exec n8n sh -c 'cat /home/node/.n8n/nodes/node_modules/n8n-nodes-preview/package.json' | python3 -c \"import sys,json; p=json.load(sys.stdin); print('name:', p['name'], '| version:', p['version'])\""
```

**Expected output:**
```
name: n8n-nodes-preview | version: 0.4.0
```

---

## 5. N8N Running

```bash
sshpass -p 'PASSWORD' ssh root@135.181.57.124 \
  "docker ps --filter name=n8n --format 'Status: {{.Status}}'"
```

**Expected output:**
```
Status: Up X minutes
```

---

## 6. Binary URL Test

```bash
# Find a binary file path
sshpass -p 'PASSWORD' ssh root@135.181.57.124 \
  "find /var/lib/docker/volumes/n8n/_data/binaryData/ -type f -not -name '*.metadata' | head -1"

# Test the URL (replace WF_ID, EXEC_ID, UUID with values from above)
curl -s -o /dev/null -w "%{http_code}" \
  "https://n8n.pigeonfi.com/n8n-preview/binary/workflows/WF_ID/executions/EXEC_ID/binary_data/UUID"
```

**Expected HTTP status:** `200`

---

## 7. Injector Loads in Browser

1. Open https://n8n.pigeonfi.com in a browser
2. Open DevTools → Console
3. Look for: `[N8N Preview] Injector v2.4.0 loaded`

**Expected console output:**
```
%c[N8N Preview] Injector v2.4.0 loaded (orange, bold)
```

---

## 8. Preview Node Available in Palette

1. Open any workflow in https://n8n.pigeonfi.com
2. Click **+** to add a node
3. Search "Preview"
4. You should see **Preview** node with orange color

---

## Summary (as of 2026-03-20)

| Check | Status |
|---|---|
| Injector version | ✅ v2.4.0 |
| Nginx config | ✅ OK |
| Community node installed | ✅ v0.4.0 |
| N8N container running | ✅ Up |
| Binary URL serving | ✅ HTTP 200 |
