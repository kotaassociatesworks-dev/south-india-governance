import { Router } from "express";
import { z } from "zod";
import { query } from "../db/pool.js";
import { sendMail, adminEmail } from "../lib/mailer.js";

const router = Router();

const apptSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/),
  email: z.string().trim().email().max(255),
  service: z.string().trim().min(1).max(80),
  price: z.number().int().nonnegative(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().min(1).max(20),
  message: z.string().trim().max(1000).optional().default(""),
});

router.post("/", async (req, res, next) => {
  try {
    const data = apptSchema.parse(req.body);
    const ip = req.ip;
    const { rows } = await query(
      `INSERT INTO appointments (name, phone, email, service, price, appt_date, appt_time, message, ip)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id, created_at`,
      [data.name, data.phone, data.email, data.service, data.price, data.date, data.time, data.message, ip]
    );

    sendMail({
      to: adminEmail,
      subject: `New Appointment — ${data.service} — ${data.date} ${data.time}`,
      html: `<h3>${data.name} booked ${data.service}</h3>
        <p><b>Date:</b> ${data.date}<br><b>Time:</b> ${data.time}<br><b>Fee:</b> ₹${data.price}</p>
        <p><b>Phone:</b> ${data.phone}<br><b>Email:</b> ${data.email}</p>
        ${data.message ? `<p>${data.message.replace(/\n/g, "<br>")}</p>` : ""}`,
    }).catch(() => {});

    sendMail({
      to: data.email,
      subject: "Booking Received — Kota Associates",
      html: `<p>Dear ${data.name},</p>
        <p>We have received your booking for <b>${data.service}</b> on <b>${data.date}</b> at <b>${data.time}</b>.</p>
        <p>Our team will confirm shortly. For instant confirmation, message us on WhatsApp at +91 90528 78779.</p>
        <p>— Kota Associates</p>`,
    }).catch(() => {});

    res.json({ ok: true, id: rows[0].id });
  } catch (e) {
    if (e instanceof z.ZodError) return res.status(400).json({ error: "Invalid input", details: e.flatten() });
    next(e);
  }
});

export default router;
