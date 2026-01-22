import { createServer as createExpressServer } from "./index";

const PORT = parseInt(process.env.PORT || "8080", 10);

async function startDevServer() {
  // Create Express app with all API routes
  const app = createExpressServer();

  // Health check endpoint
  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.listen(PORT, () => {
    console.log(`\n✅ Express API server running on http://localhost:${PORT}`);
    console.log(`📍 Available endpoints:`);
    console.log(`   GET  /api/products`);
    console.log(`   POST /api/products`);
    console.log(`   PUT  /api/products/:id`);
    console.log(`   DELETE /api/products/:id`);
    console.log(`   GET  /health\n`);
  });
}

startDevServer().catch((err) => {
  console.error("Failed to start Express server:", err);
  process.exit(1);
});
