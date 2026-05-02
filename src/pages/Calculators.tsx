import Layout from "@/components/Layout";
import PageSEO from "@/components/PageSEO";
import ComplianceHealthScore from "@/components/ComplianceHealthScore";
import { useState } from "react";
import EWayEligibilityChecker from "@/components/EWayEligibilityChecker";
import EWayPenaltyEstimator from "@/components/EWayPenaltyEstimator";
import { trackEvent } from "@/lib/analytics";

type Tab = "gst" | "tax" | "tds" | "eway" | "health";

// ---------- GST ----------
const GSTCalc = () => {
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(18);
  const [type, setType] = useState<"intra" | "inter">("intra");
  const [turnoverCr, setTurnoverCr] = useState(1.0);
  const [composition, setComposition] = useState<"trader" | "manufacturer" | "restaurant">("trader");

  const gst = (amount * rate) / 100;
  const cgst = type === "intra" ? gst / 2 : 0;
  const sgst = type === "intra" ? gst / 2 : 0;
  const igst = type === "inter" ? gst : 0;
  const total = amount + gst;

  const compRate = composition === "restaurant" ? 5 : composition === "manufacturer" ? 1 : 1;
  const compEligible = composition === "restaurant" ? turnoverCr <= 0.75 : turnoverCr <= 1.5;
  const compTax = compEligible ? (amount * compRate) / 100 : null;

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="space-y-5">
        <div>
          <label className="label-clean">Taxable Amount (₹)</label>
          <input type="number" min={0} className="input-clean" value={amount} onChange={(e) => setAmount(+e.target.value || 0)} />
        </div>
        <div>
          <label className="label-clean">GST Rate (%)</label>
          <div className="flex gap-2 flex-wrap">
            {[0, 5, 12, 18, 28].map((r) => (
              <button key={r} onClick={() => setRate(r)}
                className={`px-4 py-2 rounded text-sm border transition ${rate === r ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-accent"}`}>{r}%</button>
            ))}
          </div>
        </div>
        <div>
          <label className="label-clean">Supply Type</label>
          <div className="flex gap-2">
            <button onClick={() => setType("intra")}
              className={`flex-1 px-4 py-2 rounded text-sm border ${type === "intra" ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"}`}>Intra-State</button>
            <button onClick={() => setType("inter")}
              className={`flex-1 px-4 py-2 rounded text-sm border ${type === "inter" ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"}`}>Inter-State</button>
          </div>
        </div>
        <div className="pt-3 border-t border-border space-y-3">
          <p className="text-xs uppercase tracking-widest text-accent">Composition Scheme Check</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-clean">Annual Turnover (₹ Cr)</label>
              <input type="number" step="0.1" min={0} className="input-clean" value={turnoverCr} onChange={(e) => setTurnoverCr(+e.target.value || 0)} />
            </div>
            <div>
              <label className="label-clean">Business Type</label>
              <select className="input-clean" value={composition} onChange={(e) => setComposition(e.target.value as typeof composition)}>
                <option value="trader">Trader (1%)</option>
                <option value="manufacturer">Manufacturer (1%)</option>
                <option value="restaurant">Restaurant (5%)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-secondary/50 rounded p-6 border border-border">
        <h3 className="font-heading text-xl text-primary mb-4">Result</h3>
        <Row label="Taxable Value" val={amount} />
        {type === "intra" ? (
          <>
            <Row label={`CGST (${rate / 2}%)`} val={cgst} />
            <Row label={`SGST (${rate / 2}%)`} val={sgst} />
          </>
        ) : (
          <Row label={`IGST (${rate}%)`} val={igst} />
        )}
        <Row label="Total GST" val={gst} />
        <div className="border-t border-border my-3" />
        <Row label="Invoice Value" val={total} bold />

        <div className="mt-5 p-4 rounded bg-card border border-accent/30">
          <p className="text-xs uppercase tracking-widest text-accent mb-1">Composition Scheme Tax</p>
          {compTax !== null ? (
            <>
              <p className="font-heading text-xl text-primary">₹{Math.round(compTax).toLocaleString("en-IN")} <span className="text-sm text-muted-foreground">@ {compRate}%</span></p>
              <p className="text-xs text-muted-foreground mt-1">Composition dealers cannot issue tax invoices or collect GST from customers. Must issue Bill of Supply.</p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Not eligible — turnover exceeds composition limit ({composition === "restaurant" ? "₹75 L" : "₹1.5 Cr"}).</p>
          )}
        </div>
      </div>
    </div>
  );
};

// ---------- Income Tax ----------
const newSlabs = [
  [300000, 0], [700000, 0.05], [1000000, 0.10], [1200000, 0.15], [1500000, 0.20], [Infinity, 0.30],
] as const;
const oldSlabs = [
  [250000, 0], [500000, 0.05], [1000000, 0.20], [Infinity, 0.30],
] as const;

function calcSlabTax(taxable: number, slabs: readonly (readonly [number, number])[]) {
  let tax = 0; let prev = 0;
  const breakdown: { range: string; rate: string; tax: number }[] = [];
  for (const [limit, rate] of slabs) {
    if (taxable <= prev) break;
    const upper = Math.min(taxable, limit);
    const slabAmt = upper - prev;
    const slabTax = slabAmt * rate;
    tax += slabTax;
    breakdown.push({
      range: `₹${prev.toLocaleString("en-IN")} – ${limit === Infinity ? "above" : "₹" + limit.toLocaleString("en-IN")}`,
      rate: `${(rate * 100).toFixed(0)}%`,
      tax: slabTax,
    });
    prev = limit;
  }
  return { tax, breakdown };
}

const IncomeTaxCalc = () => {
  const [income, setIncome] = useState(1200000);
  const [regime, setRegime] = useState<"new" | "old">("new");
  const [d80c, setD80c] = useState(150000);
  const [d80d, setD80d] = useState(25000);
  const [hra, setHra] = useState(0);

  const stdNew = 75000;
  const stdOld = 50000;

  const newTaxable = Math.max(0, income - stdNew);
  const newCalc = calcSlabTax(newTaxable, newSlabs);
  const newTotal = newCalc.tax * 1.04;

  const oldDeductions = Math.min(d80c, 150000) + Math.min(d80d, 25000) + hra + stdOld;
  const oldTaxable = Math.max(0, income - oldDeductions);
  const oldCalc = calcSlabTax(oldTaxable, oldSlabs);
  const oldTotal = oldCalc.tax * 1.04;

  const active = regime === "new" ? { taxable: newTaxable, calc: newCalc, total: newTotal } : { taxable: oldTaxable, calc: oldCalc, total: oldTotal };
  const better = newTotal <= oldTotal ? "new" : "old";
  const savings = Math.abs(newTotal - oldTotal);
  const effective = active.taxable > 0 ? (active.total / income) * 100 : 0;

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="space-y-5">
        <div>
          <label className="label-clean">Annual Income (₹)</label>
          <input type="number" min={0} className="input-clean" value={income} onChange={(e) => setIncome(+e.target.value || 0)} />
        </div>
        <div>
          <label className="label-clean">Regime</label>
          <div className="flex gap-2">
            <button onClick={() => setRegime("new")} className={`flex-1 px-4 py-2 rounded text-sm border ${regime === "new" ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"}`}>New Regime</button>
            <button onClick={() => setRegime("old")} className={`flex-1 px-4 py-2 rounded text-sm border ${regime === "old" ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"}`}>Old Regime</button>
          </div>
        </div>
        {regime === "old" && (
          <>
            <div>
              <label className="label-clean">80C Deduction (max ₹1.5L)</label>
              <input type="number" min={0} className="input-clean" value={d80c} onChange={(e) => setD80c(+e.target.value || 0)} />
            </div>
            <div>
              <label className="label-clean">80D Deduction (max ₹25K)</label>
              <input type="number" min={0} className="input-clean" value={d80d} onChange={(e) => setD80d(+e.target.value || 0)} />
            </div>
            <div>
              <label className="label-clean">HRA Exemption</label>
              <input type="number" min={0} className="input-clean" value={hra} onChange={(e) => setHra(+e.target.value || 0)} />
            </div>
            <p className="text-xs text-muted-foreground">+ Standard Deduction ₹50,000 applied automatically.</p>
          </>
        )}
        {regime === "new" && <p className="text-xs text-muted-foreground">Standard Deduction ₹75,000 applied automatically.</p>}
      </div>

      {/* Always-visible side-by-side comparison */}
      <div className="md:col-span-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { key: "new", title: "New Regime", taxable: newTaxable, calc: newCalc, total: newTotal, std: stdNew },
          { key: "old", title: "Old Regime", taxable: oldTaxable, calc: oldCalc, total: oldTotal, std: stdOld },
        ].map((r) => {
          const isBetter = better === r.key;
          return (
            <div key={r.key} className={`rounded p-5 border-2 transition ${isBetter ? "border-emerald-500/60 bg-emerald-500/5 shadow-md" : "border-border bg-secondary/50"}`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading text-lg text-primary">{r.title}</h3>
                {isBetter && <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 rounded font-semibold tracking-wider">RECOMMENDED ✓</span>}
              </div>
              <Row label="Std Deduction" val={r.std} />
              <Row label="Taxable Income" val={r.taxable} />
              <div className="my-2 border-t border-border" />
              <Row label="Tax (slab)" val={r.calc.tax} />
              <Row label="Cess (4%)" val={r.calc.tax * 0.04} />
              <div className="my-2 border-t border-border" />
              <Row label="Total Payable" val={r.total} bold />
            </div>
          );
        })}
        <div className="sm:col-span-2 mt-2 p-4 rounded bg-card border border-accent/40 text-center">
          <p className="font-heading text-lg text-primary">
            You save <span className="text-accent">₹{Math.round(savings).toLocaleString("en-IN")}</span> by choosing the {better === "new" ? "New" : "Old"} Regime
          </p>
          <p className="text-xs text-muted-foreground mt-1">Active regime in slab breakdown: <strong>{regime === "new" ? "New" : "Old"}</strong> · Effective rate {effective.toFixed(2)}%</p>
        </div>

        {/* Slab breakdown for selected regime */}
        <div className="sm:col-span-2 bg-card rounded p-4 border border-border">
          <p className="text-xs uppercase tracking-widest text-accent mb-2">Slab Breakdown — {regime === "new" ? "New" : "Old"} Regime</p>
          <div className="space-y-1 text-sm">
            {active.calc.breakdown.map((b, i) => (
              <div key={i} className="flex justify-between text-foreground/80">
                <span>{b.range} <span className="text-muted-foreground">({b.rate})</span></span>
                <span>₹{Math.round(b.tax).toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------- TDS ----------
const tdsRules = {
  salary:       { rate: -1, section: "192",   form: "Form 24Q", label: "Salary",                     noPan: 20 },
  contractor_i: { rate: 1,  section: "194C",  form: "Form 26Q", label: "Contractor — Individual",    noPan: 20 },
  contractor_c: { rate: 2,  section: "194C",  form: "Form 26Q", label: "Contractor — Company",       noPan: 20 },
  rent_pm:      { rate: 2,  section: "194I",  form: "Form 26Q", label: "Rent — Plant / Machinery",   noPan: 20 },
  rent_lb:      { rate: 10, section: "194I",  form: "Form 26Q", label: "Rent — Land / Building",     noPan: 20 },
  commission:   { rate: 5,  section: "194H",  form: "Form 26Q", label: "Commission / Brokerage",     noPan: 20 },
  professional: { rate: 10, section: "194J",  form: "Form 26Q", label: "Professional Fees",          noPan: 20 },
  interest:     { rate: 10, section: "194A",  form: "Form 26Q", label: "Interest (other than secs)", noPan: 20 },
  property:     { rate: 1,  section: "194IA", form: "Form 26QB",label: "Property Purchase (>₹50L)",  noPan: 20 },
} as const;

type TdsKey = keyof typeof tdsRules;

const TDSCalc = () => {
  const [type, setType] = useState<TdsKey>("contractor_i");
  const [amount, setAmount] = useState(100000);
  const [hasPan, setHasPan] = useState(true);

  const rule = tdsRules[type];
  let rate: number;
  let note = "";
  if (rule.rate === -1) {
    // Salary — slab-based, give an indicative effective rate using new regime
    const taxable = Math.max(0, amount * 12 - 75000);
    const calc = calcSlabTax(taxable, newSlabs);
    const annualTax = calc.tax * 1.04;
    rate = amount > 0 ? (annualTax / 12 / amount) * 100 : 0;
    note = `Salary TDS is computed on annual projected income at slab rates. Indicative monthly TDS shown.`;
  } else if (!hasPan) {
    rate = rule.noPan;
    note = "PAN not provided — higher TDS rate (Sec 206AA) applied.";
  } else {
    rate = rule.rate;
  }
  if (type === "property" && amount <= 5000000 && hasPan) {
    rate = 0;
    note = "Threshold not met (≤ ₹50 L). No TDS under Sec 194-IA.";
  }

  const tds = (amount * rate) / 100;

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="space-y-5">
        <div>
          <label className="label-clean">Payment Type</label>
          <select className="input-clean" value={type} onChange={(e) => setType(e.target.value as TdsKey)}>
            {Object.entries(tdsRules).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
        </div>
        <div>
          <label className="label-clean">Payment Amount (₹)</label>
          <input type="number" min={0} className="input-clean" value={amount} onChange={(e) => setAmount(+e.target.value || 0)} />
        </div>
        <div>
          <label className="label-clean">PAN Provided?</label>
          <div className="flex gap-2">
            <button onClick={() => setHasPan(true)}
              className={`flex-1 px-4 py-2 rounded text-sm border ${hasPan ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"}`}>Yes</button>
            <button onClick={() => setHasPan(false)}
              className={`flex-1 px-4 py-2 rounded text-sm border ${!hasPan ? "bg-destructive text-destructive-foreground border-destructive" : "bg-card border-border"}`}>No</button>
          </div>
        </div>
      </div>

      <div className="bg-secondary/50 rounded p-6 border border-border">
        <h3 className="font-heading text-xl text-primary mb-4">TDS Liability</h3>
        <Row label="Section" val={`Sec ${rule.section}`} />
        <Row label="Effective Rate" val={`${rate.toFixed(2)}%`} />
        <div className="border-t border-border my-3" />
        <Row label="TDS Amount" val={tds} bold />
        <Row label="Net Payment" val={amount - tds} />
        <div className="mt-5 space-y-2 text-xs">
          <p><span className="text-muted-foreground">Return Form: </span><strong>{rule.form}</strong></p>
          <p><span className="text-muted-foreground">Deposit Due: </span><strong>7th of following month (30 Apr for March)</strong></p>
          {note && <p className="text-amber-700 dark:text-amber-400 mt-3">{note}</p>}
        </div>
      </div>
    </div>
  );
};

// ---------- E-Way Bill (sub-tabs) ----------
type EwayTab = "checker" | "penalty" | "validity";
const EWayTab = () => {
  const [sub, setSub] = useState<EwayTab>("checker");
  const [distance, setDistance] = useState(250);
  const [odc, setOdc] = useState(false);
  const [departure, setDeparture] = useState("");

  const days = (() => {
    if (distance <= 100) return 1;
    if (distance <= 300) return 3;
    if (distance <= 500) return 5;
    if (distance <= 1000) return 10;
    return 15;
  })() * (odc ? 2 : 1);

  const expiry = departure ? (() => {
    const d = new Date(departure);
    d.setDate(d.getDate() + days);
    return d.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
  })() : null;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-border">
        {([["checker", "Threshold Checker"], ["penalty", "Penalty Calculator"], ["validity", "Validity Calculator"]] as const).map(([k, label]) => (
          <button key={k} onClick={() => setSub(k)}
            className={`px-4 py-2 text-sm rounded border ${sub === k ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-accent"}`}>{label}</button>
        ))}
      </div>
      {sub === "checker" && <EWayEligibilityChecker />}
      {sub === "penalty" && <EWayPenaltyEstimator />}
      {sub === "validity" && (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div>
              <label className="label-clean">Distance (km)</label>
              <input type="number" min={0} className="input-clean" value={distance} onChange={(e) => setDistance(+e.target.value || 0)} />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={odc} onChange={(e) => setOdc(e.target.checked)} className="accent-accent" />
              Over-Dimensional Cargo (ODC)
            </label>
            <div>
              <label className="label-clean">Departure (optional)</label>
              <input type="datetime-local" className="input-clean" value={departure} onChange={(e) => setDeparture(e.target.value)} />
            </div>
          </div>
          <div className="bg-secondary/50 rounded p-6 border border-border">
            <h3 className="font-heading text-xl text-primary mb-4">Validity</h3>
            <Row label="Validity Days" val={`${days} day${days !== 1 ? "s" : ""}`} bold />
            {expiry && <Row label="Expires At" val={expiry} />}
          </div>
        </div>
      )}
    </div>
  );
};

const Row = ({ label, val, bold = false }: { label: string; val: number | string; bold?: boolean }) => (
  <div className={`flex justify-between py-1.5 ${bold ? "text-primary font-heading text-lg" : "text-foreground/90 text-sm"}`}>
    <span>{label}</span>
    <span>{typeof val === "number" ? `₹${Math.round(val).toLocaleString("en-IN")}` : val}</span>
  </div>
);

const Calculators = () => {
  const [tab, setTab] = useState<Tab>("gst");
  const onChange = (t: Tab) => { setTab(t); trackEvent("calculator", "calculator_used", t); };

  return (
    <Layout>
      <PageSEO
        title="Free GST, Income Tax & TDS Calculators"
        description="Calculate your GST liability, compare new vs old income tax regime, estimate TDS deductions, check e-way bill validity, and assess your compliance health score online."
        canonical="/calculators"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Calculators", url: "/calculators" }]}
      />
      <section className="bg-primary text-primary-foreground">
        <div className="container-narrow py-24 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4">Tools</p>
          <h1 className="font-heading text-5xl md:text-6xl mb-4">Calculators</h1>
          <div className="gold-divider mx-auto" />
        </div>
      </section>

      <section className="section bg-background">
        <div className="container-narrow">
          <div className="flex flex-wrap border-b border-border mb-10">
            {([
              ["gst",    "GST Calculator"],
              ["tax",    "Income Tax (FY 2024-25)"],
              ["tds",    "TDS Calculator"],
              ["eway",   "E-Way Bill Tools"],
              ["health", "Health Score"],
            ] as const).map(([k, label]) => (
              <button key={k} onClick={() => onChange(k)}
                className={`px-5 py-3 text-sm font-medium border-b-2 -mb-px transition ${tab === k ? "border-accent text-primary" : "border-transparent text-muted-foreground hover:text-primary"}`}>
                {label}
              </button>
            ))}
          </div>

          <div className="bg-card border border-border rounded p-6 md:p-10">
            {tab === "gst"    && <GSTCalc />}
            {tab === "tax"    && <IncomeTaxCalc />}
            {tab === "tds"    && <TDSCalc />}
            {tab === "eway"   && <EWayTab />}
            {tab === "health" && <ComplianceHealthScore />}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Calculators;
