import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.status(200).json({ success: true, message: "Server is running" });
});

// Webhook handling (Placeholder for external integrations)
app.post("/webhook", (req, res) => {
  console.log("Webhook received:", req.body);
  res.status(200).json({ success: true });
});

// App Leads route: forwards contact form details to Google Sheets Webhook
app.post("/api/leads", async (req, res) => {
  try {
    const sheetWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (!sheetWebhookUrl) {
      console.error("GOOGLE_SHEETS_WEBHOOK_URL is not set");
      return res.status(500).json({ success: false, message: "Server misconfiguration" });
    }
    
    const response = await fetch(sheetWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
        throw new Error("Failed to forward to Google Sheets");
    }

    // Send confirmation emails
    import('./services/mailer.js').then(({ sendConfirmationEmails }) => {
      sendConfirmationEmails(req.body);
    }).catch(err => console.error("Failed to load mailer", err));

    res.status(200).json({ success: true, message: "Lead saved successfully" });
  } catch (error) {
    console.error("Error saving lead:", error);
    res.status(500).json({ success: false, message: "Failed to save lead" });
  }
});

// Serve frontend static files
const distPath = path.join(__dirname, "../../dist");
app.use(express.static(distPath));

// Handle React routing, return all requests to React app
app.use((req, res) => {
  if (req.originalUrl.startsWith("/api") || req.originalUrl.startsWith("/webhook") || req.originalUrl.startsWith("/health")) {
    return res.status(404).json({
      success: false,
      message: `Route not found: ${req.originalUrl}`,
    });
  }
  res.sendFile(path.join(distPath, "index.html"), (err) => {
    if (err) {
      console.error("⚠️ Failed to serve index.html. Ensure frontend is built.", err.message);
      res.status(500).send("Frontend build not found or failed to load.");
    }
  });
});

app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

export default app;
