import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import handler from './api/submit-guess.js';

// Load local environment files
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

/**
 * Local development middleware plugin to handle /api/submit-guess requests
 * without needing an external backend or vercel dev CLI.
 */
function devApiPlugin() {
  return {
    name: 'dev-api-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : '';
        if (url === '/api/submit-guess') {
          let bodyData = '';
          req.on('data', (chunk) => {
            bodyData += chunk;
          });
          req.on('end', async () => {
            try {
              if (bodyData) {
                try {
                  req.body = JSON.parse(bodyData);
                } catch {
                  req.body = bodyData;
                }
              }

              // Polyfill Express-style helper methods for serverless handler
              res.status = (statusCode) => {
                res.statusCode = statusCode;
                return res;
              };
              res.json = (jsonData) => {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(jsonData));
                return res;
              };

              await handler(req, res);
            } catch (err) {
              console.error('[DEV API EXCEPTION]', err);
              if (!res.writableEnded) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: 'SUBMISSION FAILED. Please try again.' }));
              }
            }
          });
          return;
        }
        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), devApiPlugin()],
  server: {
    host: true,
    port: 5173,
    strictPort: false
  }
});
