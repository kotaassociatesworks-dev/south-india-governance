import { Router } from "express";
import { z } from "zod";
import { query } from "../db/pool.js";

const router = Router();

const schema = z.object({ email: z.string().trim().email().max(255) });

router.post("/", async (req, res, next) => {
  try {
    const { email } = schema.parse(req.body);
    await query(
      `INSERT INTO newsletter_subscribers (email) VALUES ($1) ON CONFLICT (email) DO NOTHING`,
      [email]
    );
    res.json({ ok: true });
  } catch (e) {
    if (e instanceof z.ZodError) return res.status(400).json({ error: "Invalid email" });
    next(e);
  }
});

export default router;
