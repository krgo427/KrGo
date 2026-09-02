import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import pool from "./db.js";

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

// App Leads route: forwards contact form details to Google Sheets Webhook and saves to DB
app.post("/api/leads", async (req, res) => {
  try {
    const { Name, Phone, WebsiteType, TimeSlot, DateLabel, Timestamp } = req.body;

    // 1. Save to PostgreSQL Database
    try {
      await pool.query(
        `INSERT INTO leads (name, phone, website_type, time_slot, date_label, timestamp)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [Name, Phone, WebsiteType, TimeSlot, DateLabel, Timestamp]
      );
      console.log("Lead saved to Supabase database successfully");
    } catch (dbError) {
      console.error("Failed to save lead to database:", dbError);
      // We log but don't fail the request completely to still attempt sheet sync
    }

    // 2. Forward to Google Sheets Webhook
    const sheetWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (sheetWebhookUrl) {
      const response = await fetch(sheetWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(req.body)
      });

      if (!response.ok) {
          console.error("Failed to forward to Google Sheets");
      }
    } else {
      console.error("GOOGLE_SHEETS_WEBHOOK_URL is not set");
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
