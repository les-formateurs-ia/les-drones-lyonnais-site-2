// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Fully static site, deployed on Cloudflare. Shop and rental payments (Stripe) will run
// in a separate Worker later, so no server code ships with the pages themselves.
export default defineConfig({
  site: 'https://www.lesdroneslyonnais.com',
  // The WordPress site serves every URL with a trailing slash; keep them identical.
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
  },
});
