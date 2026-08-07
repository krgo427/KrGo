import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Global error handlers to prevent server crashes from unhandled issues (e.g. Render Chromium lacking)
process.on("uncaughtException", (error) => {
  console.error("💥 Uncaught Exception:", error);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("💥 Unhandled Rejection at:", promise, "reason:", reason);
});

/**
 * Graceful shutdown — called on SIGINT / SIGTERM.
 * Stops the WhatsApp bot (destroys Puppeteer browser) before exiting
 * so nodemon restarts don't leave zombie Chrome processes.
 */
async function gracefulShutdown(signal) {
  console.log(`\n${signal} received   shutting down gracefully...`);
  process.exit(0);
}

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
