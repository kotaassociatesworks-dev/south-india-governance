import { Router } from "express";
import { query } from "../db/pool.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const type = req.query.type;
    const params = [];
    let where = "";
    if (type && ["legacy", "msme", "mnc", "startup"].includes(String(type))) {
      where = "WHERE $1 = ANY(applicable)";
      params.push(type);
    }
    const { rows } = await query(
      `SELECT id, deadline_date AS date, description, type, applicable
       FROM compliance_deadlines ${where}
       ORDER BY deadline_date ASC`,
      params
    );
    res.json({ ok: true, deadlines: rows });
  } catch (e) { next(e); }
});

export default router;
