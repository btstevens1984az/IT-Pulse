import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { rssProxyPlugin } from './vite-rss-proxy';

export default defineConfig({
  plugins: [react(), rssProxyPlugin()],
  server: { port: 5180 },
  preview: { port: 5180 },
});
