import server from './dist/server/server.js';

const PORT = process.env.PORT || 3000;

console.log(`🚀 Starting TanStack Start server on http://localhost:${PORT}...`);

Bun.serve({
  port: PORT,
  async fetch(req) {
    try {
      return await server.fetch(req);
    } catch (err) {
      console.error("Error handling request:", err);
      return new Response("Internal Server Error", { status: 500 });
    }
  }
});
