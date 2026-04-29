import { Router } from "express";
import { z } from "zod";
import { query } from "../db/pool.js";
import { sendMail, adminEmail } from "../lib/mailer.js";

const router = Router();

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/),
  email: z.string().trim().email().max(255),
  service: z.string().trim().min(1).max(80),
  message: z.string().trim().min(5).max(1000),
});

router.post("/", async (req, res, next) => {
  try {
    const data = contactSchema.parse(req.body);
    const ip = req.ip;
    const { rows } = await query(
      `INSERT INTO contact_submissions (name, phone, email, service, message, ip)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, created_at`,
      [data.name, data.phone, data.email, data.service, data.message, ip]
    );

    sendMail({
      to: adminEmail,
      subject: `New Enquiry — ${data.service}`,
      html: `<h3>New enquiry from ${data.name}</h3>
        <p><b>Phone:</b> ${data.phone}<br><b>Email:</b> ${data.email}<br><b>Service:</b> ${data.service}</p>
        <p>${data.message.replace(/\n/g, "<br>")}</p>`,
    }).catch(() => {});

    res.json({ ok: true, id: rows[0].id });
  } catch (e) {
    if (e instanceof z.ZodError) return res.status(400).json({ error: "Invalid input", details: e.flatten() });
    next(e);
  }
});

export default router;
