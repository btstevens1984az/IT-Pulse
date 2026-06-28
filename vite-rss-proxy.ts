import type { Plugin } from 'vite';

/**
 * Local RSS proxy — avoids brittle public CORS proxies in the browser.
 * Dev/preview: fetch via /api/rss?url=...
 */
export function rssProxyPlugin(): Plugin {
  return {
    name: 'rss-proxy',
    configureServer(server) {
      server.middlewares.use('/api/rss', async (req, res) => {
        const reqUrl = new URL(req.url ?? '', 'http://localhost');
        const feedUrl = reqUrl.searchParams.get('url');

        if (!feedUrl) {
          res.statusCode = 400;
          res.end('Missing url parameter');
          return;
        }

        try {
          const parsed = new URL(feedUrl);
          if (!['http:', 'https:'].includes(parsed.protocol)) {
            res.statusCode = 400;
            res.end('Invalid protocol');
            return;
          }

          const response = await fetch(feedUrl, {
            headers: {
              Accept: 'application/rss+xml, application/xml, text/xml, */*',
              'User-Agent': 'IT-Pulse/1.0 RSS Reader',
            },
            signal: AbortSignal.timeout(12000),
          });

          if (!response.ok) {
            res.statusCode = response.status;
            res.end(`Upstream HTTP ${response.status}`);
            return;
          }

          const body = await response.text();
          res.setHeader('Content-Type', 'application/xml; charset=utf-8');
          res.setHeader('Cache-Control', 'public, max-age=300');
          res.statusCode = 200;
          res.end(body);
        } catch (err) {
          res.statusCode = 502;
          res.end(err instanceof Error ? err.message : 'Proxy fetch failed');
        }
      });
    },
  };
}
