# Proxy to bypass CORS

Proxy that modifies headers to bypass CORS.
Deployed as Cloudflare worker.

Inspired by: https://github.com/Zibri/cloudflare-cors-anywhere.

Example:
```javascript
fetch('https://your-worker.workers.dev/?url=https://site-with-cors.com', {method: 'get'})
  .then(res => res.json())
  .then(console.log)
```

## Setup & Deploy

Cloudflare free limits: https://developers.cloudflare.com/workers/platform/limits/#worker-limits
Deploy Cloudflare Workers: https://workers.cloudflare.com/

### Setup
```sh
npm create cloudflare -- proxy-name

# example
npm create cloudflare -- rates-checker-proxy
```

### Deploy
```sh
npx wrangler deploy index.js 
```
