import { defineConfig } from 'vite';
import { CONNECT } from './src/daos';

// The page loads nothing from anywhere else: its own scripts, styles and fonts only.
// The live pulse may also reach the DAOs' sites, relays and chain sources listed in src/daos.ts.
const csp = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "font-src 'self'",
  "img-src 'self' data:",
  `connect-src 'self' ${CONNECT.join(' ')}`,
  "base-uri 'none'",
  "form-action 'none'",
  "object-src 'none'",
].join('; ');

export default defineConfig({
  base: '/',
  plugins: [{
    name: 'csp',
    transformIndexHtml(html, ctx) {
      if (ctx.server) return html;
      return html.replace('<!-- CSP -->', `<meta http-equiv="Content-Security-Policy" content="${csp}" />`);
    },
  }],
});
