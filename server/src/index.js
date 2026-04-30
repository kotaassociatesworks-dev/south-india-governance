import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import contactRouter from "./routes/contact.js";
import appointmentRouter from "./routes/appointment.js";
import newsletterRouter from "./routes/newsletter.js";
import adminRouter from "./routes/admin.js";
import ewayInquiryRouter from "./routes/eway-inquiry.js";
import complianceCalendarRouter from "./routes/compliance-calendar.js";

dotenv.config();

const app = express();
app.set("trust proxy", 1);
app.use(helmet());
app.use(express.json({ limit: "20kb" }));
app.use(cors({ origin: process.env.ALLOWED_ORIGIN?.split(",") ?? "*", credentials: false }));

const writeLimiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 20, standardHeaders: true });
const readLimiter = rateLimit({ windowMs: 60 * 1000, max: 60 });

app.get("/api/health", (_req, res) => res.json({ ok: true, time: new Date().toISOString() }));

app.use("/api/contact", writeLimiter, contactRouter);
app.use("/api/appointment", writeLimiter, appointmentRouter);
app.use("/api/newsletter", writeLimiter, newsletterRouter);
app.use("/api/eway-inquiry", writeLimiter, ewayInquiryRouter);
app.use("/api/compliance-calendar", readLimiter, complianceCalendarRouter);
app.use("/api", readLimiter, adminRouter);

app.use((_req, res) => res.status(404).json({ error: "Not Found" }));
app.use((err, _req, res, _next) => {
  console.error("[error]", err);
  res.status(500).json({ error: "Internal Server Error" });
});

const port = Number(process.env.PORT || 4000);
app.listen(port, () => console.log(`✓ Kota Associates API listening on :${port}`));
