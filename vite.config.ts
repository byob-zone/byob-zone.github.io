import { defineConfig } from 'vite';

// The page loads nothing from anywhere else: its own scripts, styles and fonts only.
// (The live pulse, next, adds the DAO's relays and chain gateway to connect-src.)
const csp = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "font-src 'self'",
  "img-src 'self' data:",
  "connect-src 'self'",
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
