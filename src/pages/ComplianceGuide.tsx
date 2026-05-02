import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Layout from "@/components/Layout";
import PageSEO from "@/components/PageSEO";
import DeadlineTypeBadge from "@/components/DeadlineTypeBadge";
import ComplianceTypeBadge from "@/components/ComplianceTypeBadge";
import { businessProfiles } from "@/data/businessProfiles";
import { deadlines, type BusinessType } from "@/data/complianceCalendar";
import { trackEvent } from "@/lib/analytics";
import { CheckCircle2, AlertTriangle, Printer } from "lucide-react";

const TABS: BusinessType[] = ["legacy", "msme", "mnc", "startup"];

const StartupChecker = () => {
  const [a, setA] = useState<boolean | null>(null);
  const [b, setB] = useState<boolean | null>(null);
  const [c, setC] = useState<boolean | null>(null);
  const [d, setD] = useState<boolean | null>(null);

  const all = a && b && c && d;
  const any = a !== null && b !== null && c !== null && d !== null;
  const failing = any && !all;

  const Q = ({ q, val, set }: { q: string; val: boolean | null; set: (v: boolean) => void }) => (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-card border border-border rounded">
      <p className="text-sm text-foreground/90 flex-1">{q}</p>
      <div className="flex gap-2">
        <button onClick={() => set(true)}
          className={`px-3 py-1.5 text-xs rounded border ${val === true ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300" : "border-border"}`}>Yes</button>
        <button onClick={() => set(false)}
          className={`px-3 py-1.5 text-xs rounded border ${val === false ? "bg-destructive/15 border-destructive/40 text-destructive" : "border-border"}`}>No</button>
      </div>
    </div>
  );

  return (
    <div className="space-y-3">
      <Q q="Incorporated as Pvt. Ltd / LLP / Partnership?" val={a} set={setA} />
      <Q q="Incorporated less than 10 years ago?" val={b} set={setB} />
      <Q q="Annual turnover ≤ ₹100 Crore in any year since incorporation?" val={c} set={setC} />
      <Q q="Innovation-driven product or service (scalable, disruptive)?" val={d} set={setD} />
      {all && (
        <div className="p-4 rounded bg-emerald-500/10 border border-emerald-500/40 flex gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <p className="text-sm">Your entity may be eligible for <strong>DPIIT recognition</strong> and the <strong>Section 80-IAC tax holiday</strong>. Consult Kota Associates to apply.</p>
        </div>
      )}
      {failing && (
        <div className="p-4 rounded bg-amber-500/10 border border-amber-500/40 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm">You may not qualify under Startup India. Our advisors can identify alternative tax structures for your situation.</p>
        </div>
      )}
    </div>
  );
};

const ComplianceGuide = () => {
  const { t } = useTranslation();
  const [params, setParams] = useSearchParams();
  const initial = (params.get("type") as BusinessType) || "legacy";
  const [tab, setTab] = useState<BusinessType>(TABS.includes(initial) ? initial : "legacy");

  useEffect(() => {
    if (params.get("type") !== tab) {
      const p = new URLSearchParams(params);
      p.set("type", tab);
      setParams(p, { replace: true });
    }
    trackEvent("compliance", "compliance_tab", tab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const profile = businessProfiles[tab];
  const filteredDeadlines = useMemo(() => deadlines.filter((d) => d.applicable.includes(tab)), [tab]);

  // group by month
  const byMonth = useMemo(() => {
    const m: Record<string, typeof filteredDeadlines> = {};
    filteredDeadlines.forEach((d) => {
      const month = new Date(d.iso).toLocaleString("en-US", { month: "long" });
      (m[month] ||= []).push(d);
    });
    return m;
  }, [filteredDeadlines]);

  const handlePrintChecklist = () => {
    trackEvent("compliance", "checklist_print", tab);
    const items = [
      ...(profile.checklist || []),
      ...(profile.specific || []),
      ...(profile.domestic || []),
    ];
    const html = `<!doctype html><html><head><meta charset="utf-8"/><title>FY 2025-26 Compliance Checklist for ${profile.label} — Kota Associates</title>
      <style>
        body{font-family:Georgia,serif;max-width:780px;margin:32px auto;padding:0 24px;color:#0f1e3d}
        h1{font-size:28px;margin:0 0 4px;color:#0f1e3d}
        h2{font-size:18px;margin:24px 0 8px;color:#b8922a;border-bottom:1px solid #b8922a;padding-bottom:4px}
        .sub{color:#666;font-size:13px;margin-bottom:24px}
        ul{padding-left:0;list-style:none}
        li{padding:8px 0;border-bottom:1px solid #eee;display:flex;justify-content:space-between;gap:16px;font-size:14px}
        li span.f{color:#b8922a;font-size:11px;text-transform:uppercase;letter-spacing:1px}
        .adv{margin-top:24px;padding:14px;border-left:4px solid #b8922a;background:#fafaf6;font-size:13px}
        footer{margin-top:48px;padding-top:16px;border-top:1px solid #ddd;font-size:11px;color:#666;text-align:center;line-height:1.6}
        @media print{button{display:none}}
        button{background:#b8922a;color:#fff;border:0;padding:10px 18px;cursor:pointer;border-radius:4px;font-size:13px}
      </style></head><body>
      <h1>FY 2025–26 Compliance Checklist</h1>
      <p class="sub">For ${profile.label} · Prepared by Kota Associates</p>
      <h2>Compliance Items</h2>
      <ul>${items.map((c) => `<li><span>${c.name}</span><span class="f">${c.freq}</span></li>`).join("")}</ul>
      <div class="adv"><strong>Advisory:</strong> ${profile.advisory}</div>
      <p style="text-align:center;margin-top:24px"><button onclick="window.print()">Save / Print as PDF</button></p>
      <footer>
        <strong>Kota Associates</strong> · Est. 1952<br/>
        5/134 Patel Street, Near Alaganadhaswamy Temple, East Gudur Rural, Gudur, Andhra Pradesh 524101<br/>
        +91 90528 78779 · kotaassociatesworks@gmail.com · kotaassociates.in
      </footer>
      <script>window.onload=()=>setTimeout(()=>window.print(),300)</script>
      </body></html>`;
    const w = window.open("", "_blank", "noopener,width=900,height=900");
    if (w) { w.document.write(html); w.document.close(); }
  };

  return (
    <Layout>
      <PageSEO
        title="Business Compliance Guide — Legacy, MSME, MNC, Startup"
        description="Tailored GST, TDS and ROC compliance checklists for Legacy firms, MSMEs, MNCs and Startups. Updated for FY 2025–26 with downloadable checklist."
        canonical="/compliance"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Compliance Guide", url: "/compliance" }]}
      />
      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-narrow py-24 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4">{t("compliance.label")}</p>
          <h1 className="font-heading text-5xl md:text-6xl mb-4">{t("compliance.title")}</h1>
          <div className="gold-divider mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-primary-foreground/80">{t("compliance.subtitle")}</p>
        </div>
      </section>

      {/* Tabs */}
      <section className="section bg-background">
        <div className="container-narrow">
          <div className="flex flex-wrap border-b border-border mb-10">
            {TABS.map((id) => {
              const p = businessProfiles[id];
              return (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`px-5 py-3 text-sm font-medium border-b-2 -mb-px transition flex items-center gap-2 ${tab === id ? "border-accent text-primary" : "border-transparent text-muted-foreground hover:text-primary"}`}
                >
                  <p.icon className="w-4 h-4" /> {p.label}
                </button>
              );
            })}
          </div>

          {/* Profile card */}
          <div className="bg-card border border-border rounded p-6 md:p-10 mb-10">
            <div className="flex items-start gap-4 mb-5">
              <profile.icon className="w-9 h-9 text-accent shrink-0" strokeWidth={1.5} />
              <div>
                <h2 className="font-heading text-3xl text-primary mb-2">{profile.label}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{profile.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.badges.map((b) => <ComplianceTypeBadge key={b} label={b} />)}
            </div>
          </div>

          {/* Eligibility checker (Startup only) */}
          {tab === "startup" && (
            <div className="mb-10">
              <h3 className="font-heading text-2xl text-primary mb-4">Startup Eligibility Checker</h3>
              <div className="gold-divider mb-6" />
              <StartupChecker />
            </div>
          )}

          {/* Thresholds (Legacy) */}
          {profile.thresholds && (
            <div className="mb-10">
              <h3 className="font-heading text-2xl text-primary mb-4">{t("compliance.thresholdsTitle")}</h3>
              <div className="gold-divider mb-6" />
              <div className="grid sm:grid-cols-2 gap-3">
                {profile.thresholds.map((th) => (
                  <div key={th.obligation} className="bg-card border border-border rounded p-4">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{th.obligation}</p>
                    <p className="font-heading text-lg text-primary">{th.threshold}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Classification (MSME) */}
          {profile.classification && (
            <div className="mb-10">
              <h3 className="font-heading text-2xl text-primary mb-4">MSME Classification</h3>
              <div className="gold-divider mb-6" />
              <div className="overflow-x-auto">
                <table className="w-full border border-border text-sm">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="text-left p-3 font-heading">Category</th>
                      <th className="text-left p-3 font-heading">Investment</th>
                      <th className="text-left p-3 font-heading">Annual Turnover</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profile.classification.map((c) => (
                      <tr key={c.category} className="border-t border-border">
                        <td className="p-3 font-medium text-primary">{c.category}</td>
                        <td className="p-3">{c.investment}</td>
                        <td className="p-3">{c.turnover}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Specific Obligations */}
          {profile.specific && profile.specificTitle && (
            <div className="mb-10">
              <h3 className="font-heading text-2xl text-primary mb-4">{profile.specificTitle}</h3>
              <div className="gold-divider mb-6" />
              <div className="grid sm:grid-cols-2 gap-3">
                {profile.specific.map((c) => (
                  <div key={c.name} className="flex items-center justify-between p-4 bg-card border border-border rounded">
                    <span className="text-sm text-foreground">{c.name}</span>
                    <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded">{c.freq}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Domestic (MNC) */}
          {profile.domestic && profile.domesticTitle && (
            <div className="mb-10">
              <h3 className="font-heading text-2xl text-primary mb-4">{profile.domesticTitle}</h3>
              <div className="gold-divider mb-6" />
              <div className="grid sm:grid-cols-2 gap-3">
                {profile.domestic.map((c) => (
                  <div key={c.name} className="flex items-center justify-between p-4 bg-card border border-border rounded">
                    <span className="text-sm text-foreground">{c.name}</span>
                    <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded">{c.freq}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Startup Benefits */}
          {profile.benefits && (
            <div className="mb-10">
              <h3 className="font-heading text-2xl text-primary mb-4">Startup India Benefits</h3>
              <div className="gold-divider mb-6" />
              <div className="overflow-x-auto">
                <table className="w-full border border-border text-sm">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="text-left p-3 font-heading">Benefit</th>
                      <th className="text-left p-3 font-heading">Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profile.benefits.map((b) => (
                      <tr key={b.title} className="border-t border-border">
                        <td className="p-3 font-medium text-primary w-1/3">{b.title}</td>
                        <td className="p-3 text-foreground/80">{b.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Lifecycle (Startup) */}
          {profile.lifecycle && (
            <div className="mb-10">
              <h3 className="font-heading text-2xl text-primary mb-4">Startup Compliance Lifecycle</h3>
              <div className="gold-divider mb-6" />
              <ol className="space-y-3">
                {profile.lifecycle.map((step, i) => (
                  <li key={i} className="flex gap-4 p-4 bg-card border border-border rounded">
                    <div className="font-heading text-2xl text-accent shrink-0 w-8">{String(i + 1).padStart(2, "0")}</div>
                    <p className="text-sm text-foreground/90 self-center">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Main checklist */}
          {profile.checklist.length > 0 && (
            <div className="mb-10">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h3 className="font-heading text-2xl text-primary">{t("compliance.checklistTitle")}</h3>
                <button onClick={handlePrintChecklist} className="btn-outline !py-2 !px-4 text-sm inline-flex items-center gap-2">
                  <Printer className="w-4 h-4" /> Download Checklist (PDF)
                </button>
              </div>
              <div className="gold-divider mb-6" />
              <div className="grid sm:grid-cols-2 gap-3">
                {profile.checklist.map((c) => (
                  <div key={c.name} className="flex items-center justify-between p-4 bg-card border border-border rounded">
                    <span className="text-sm text-foreground">{c.name}</span>
                    <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded">{c.freq}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Advisory */}
          <div className="border-l-4 border-accent bg-accent/5 p-6 rounded-r mb-16">
            <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">{t("compliance.advisoryTitle")}</p>
            <p className="text-sm text-foreground/85 leading-relaxed">{profile.advisory}</p>
          </div>
        </div>
      </section>

      {/* Compliance Calendar */}
      <section className="section bg-secondary/40">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4">Calendar</p>
            <h2 className="font-heading text-4xl text-primary">{t("compliance.calendarTitle")}</h2>
            <div className="gold-divider mx-auto mt-6 mb-4" />
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("compliance.calendarSub")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {Object.entries(byMonth).map(([month, items]) => (
              <div key={month} className="bg-card border border-border rounded p-5">
                <h3 className="font-heading text-lg text-primary mb-3 pb-2 border-b border-border">{month}</h3>
                <ul className="space-y-2">
                  {items.map((d, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="font-mono text-xs px-2 py-0.5 bg-secondary rounded shrink-0 w-16 text-center">{d.date}</span>
                      <span className="flex-1 text-foreground/85">{d.description}</span>
                      <DeadlineTypeBadge type={d.type} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 border-l-4 border-accent bg-accent/5 p-5 rounded-r">
            <p className="text-sm text-foreground/85"><strong>Note:</strong> {t("compliance.ewbNote")}</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ComplianceGuide;
