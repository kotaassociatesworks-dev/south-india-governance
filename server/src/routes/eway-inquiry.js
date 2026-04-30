import { Router } from "express";
import { z } from "zod";
import { query } from "../db/pool.js";
import { sendMail, adminEmail } from "../lib/mailer.js";

const router = Router();

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/),
  email: z.string().trim().email().max(255),
  package: z.enum(["10", "25", "50", "100", "custom"]),
  monthlyVolume: z.number().int().nonnegative().optional(),
  message: z.string().trim().max(1000).optional(),
});

router.post("/", async (req, res, next) => {
  try {
    const data = schema.parse(req.body);
    const ip = req.ip;
    await query(
      `INSERT INTO contact_submissions (name, phone, email, service, message, ip)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [data.name, data.phone, data.email, `E-Way Bill Package — ${data.package}`,
        `${data.message || ""}\nMonthly volume: ${data.monthlyVolume ?? "n/a"}`, ip]
    );

    sendMail({
      to: adminEmail,
      subject: `New E-Way Bill Inquiry — Package ${data.package}`,
      html: `<h3>E-Way Bill inquiry from ${data.name}</h3>
        <p><b>Phone:</b> ${data.phone}<br><b>Email:</b> ${data.email}<br>
        <b>Package:</b> ${data.package}<br>
        <b>Monthly Volume:</b> ${data.monthlyVolume ?? "—"}</p>
        <p>${(data.message || "").replace(/\n/g, "<br>")}</p>`,
    }).catch(() => {});

    res.status(201).json({ ok: true });
  } catch (e) {
    if (e instanceof z.ZodError) return res.status(400).json({ error: "Invalid input", details: e.flatten() });
    next(e);
  }
});

export default router;
