import { Router } from "express";
import { query } from "../db/pool.js";
import { requireApiKey } from "../middleware/auth.js";

const router = Router();

router.get("/appointments", requireApiKey, async (_req, res, next) => {
  try {
    const { rows } = await query(`SELECT * FROM appointments ORDER BY created_at DESC LIMIT 500`);
    res.json({ data: rows });
  } catch (e) { next(e); }
});

router.get("/contacts", requireApiKey, async (_req, res, next) => {
  try {
    const { rows } = await query(`SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 500`);
    res.json({ data: rows });
  } catch (e) { next(e); }
});

export default router;
