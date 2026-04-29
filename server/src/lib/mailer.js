import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

let transporter = null;
const enabled = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

if (enabled) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

export async function sendMail({ to, subject, html, text }) {
  if (!enabled) {
    console.log("[mail] SMTP not configured, skipping. Subject:", subject);
    return { skipped: true };
  }
  return transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to, subject, html, text,
  });
}

export const adminEmail = process.env.ADMIN_NOTIFY_EMAIL || process.env.SMTP_USER;
