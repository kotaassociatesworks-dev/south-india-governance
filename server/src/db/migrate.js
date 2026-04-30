import { pool } from "./pool.js";

const SCHEMA = `
CREATE TABLE IF NOT EXISTS contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  service VARCHAR(120) NOT NULL,
  message TEXT NOT NULL,
  ip VARCHAR(64),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS appointments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  service VARCHAR(80) NOT NULL,
  price INTEGER NOT NULL,
  appt_date DATE NOT NULL,
  appt_time VARCHAR(20) NOT NULL,
  message TEXT,
  ip VARCHAR(64),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(160) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  tags TEXT[],
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS compliance_deadlines (
  id SERIAL PRIMARY KEY,
  deadline_date DATE NOT NULL,
  description TEXT NOT NULL,
  type VARCHAR(20) NOT NULL,
  applicable TEXT[] NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_appt_date ON appointments(appt_date);
CREATE INDEX IF NOT EXISTS idx_deadline_date ON compliance_deadlines(deadline_date);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
`;

const SEED_DEADLINES = [
  ["2025-04-07", "TDS deposit (March)", "tds", ["legacy","msme","mnc","startup"]],
  ["2025-04-11", "GSTR-1 (March)", "gst", ["legacy","msme","mnc","startup"]],
  ["2025-04-20", "GSTR-3B (March)", "gst", ["legacy","msme","mnc","startup"]],
  ["2025-04-30", "MSME Form 1 (Oct-Mar dues report)", "roc", ["msme","legacy","mnc"]],
  ["2025-05-31", "TDS Q4 Return", "tds", ["legacy","msme","mnc","startup"]],
  ["2025-05-31", "Form 61A SFT", "tax", ["legacy","mnc"]],
  ["2025-06-15", "Advance Tax Instalment 1 (15%)", "tax", ["legacy","msme","mnc","startup"]],
  ["2025-07-15", "FEMA FLA Annual Return", "fema", ["mnc"]],
  ["2025-07-31", "ITR (non-audit)", "itr", ["legacy","msme","mnc","startup"]],
  ["2025-09-15", "Advance Tax Instalment 2 (45%)", "tax", ["legacy","msme","mnc","startup"]],
  ["2025-09-30", "Tax Audit Report 3CA/3CB/3CD", "audit", ["legacy","msme","mnc"]],
  ["2025-10-31", "ITR (audit / company cases)", "itr", ["legacy","msme","mnc","startup"]],
  ["2025-10-31", "MSME Form 1 (Apr-Sep dues report)", "roc", ["msme","legacy","mnc"]],
  ["2025-11-30", "Form 3CEB Transfer Pricing", "audit", ["mnc"]],
  ["2025-12-15", "Advance Tax Instalment 3 (75%)", "tax", ["legacy","msme","mnc","startup"]],
  ["2025-12-31", "GSTR-9 / 9C Annual Return", "gst", ["legacy","msme","mnc","startup"]],
  ["2026-03-15", "Advance Tax Final Instalment (100%)", "tax", ["legacy","msme","mnc","startup"]],
];

(async () => {
  try {
    await pool.query(SCHEMA);
    // Seed deadlines (idempotent: only if empty)
    const { rows } = await pool.query("SELECT COUNT(*)::int AS c FROM compliance_deadlines");
    if (rows[0].c === 0) {
      for (const [d, desc, t, app] of SEED_DEADLINES) {
        await pool.query(
          "INSERT INTO compliance_deadlines (deadline_date, description, type, applicable) VALUES ($1,$2,$3,$4)",
          [d, desc, t, app]
        );
      }
      console.log(`✓ Seeded ${SEED_DEADLINES.length} compliance deadlines`);
    }
    console.log("✓ Migrations applied");
    process.exit(0);
  } catch (e) {
    console.error("Migration failed:", e);
    process.exit(1);
  }
})();
