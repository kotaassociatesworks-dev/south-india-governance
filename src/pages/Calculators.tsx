import Layout from "@/components/Layout";
import { useState } from "react";

type Tab = "gst" | "tax" | "eway";

// ---------- GST ----------
const GSTCalc = () => {
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(18);
  const [type, setType] = useState<"intra" | "inter">("intra");

  const gst = (amount * rate) / 100;
  const cgst = type === "intra" ? gst / 2 : 0;
  const sgst = type === "intra" ? gst / 2 : 0;
  const igst = type === "inter" ? gst : 0;
  const total = amount + gst;

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

      <div className="bg-secondary/50 rounded p-6 border border-border">
        <h3 className="font-heading text-xl text-primary mb-4">Result — {regime === "new" ? "New" : "Old"} Regime</h3>
        <Row label="Taxable Income" val={active.taxable} />
        <div className="my-3 border-t border-border" />
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Slab Breakdown</p>
        <div className="space-y-1 mb-3 text-sm">
          {active.calc.breakdown.map((b, i) => (
            <div key={i} className="flex justify-between text-foreground/80">
              <span>{b.range} <span className="text-muted-foreground">({b.rate})</span></span>
              <span>₹{Math.round(b.tax).toLocaleString("en-IN")}</span>
            </div>
          ))}
        </div>
        <Row label="Tax Before Cess" val={active.calc.tax} />
        <Row label="Health & Edu Cess (4%)" val={active.calc.tax * 0.04} />
        <div className="border-t border-border my-3" />
        <Row label="Total Tax Payable" val={active.total} bold />
        <Row label="Effective Rate" val={`${effective.toFixed(2)}%`} />

        <div className="mt-5 p-4 rounded bg-card border border-accent/40">
          <p className="text-xs uppercase tracking-widest text-accent mb-1">Comparison</p>
          <div className="text-sm">New Regime: <strong>₹{Math.round(newTotal).toLocaleString("en-IN")}</strong></div>
          <div className="text-sm">Old Regime: <strong>₹{Math.round(oldTotal).toLocaleString("en-IN")}</strong></div>
          <div className="mt-2 text-sm text-primary font-medium">→ {better === "new" ? "New" : "Old"} regime saves ₹{Math.round(Math.abs(newTotal - oldTotal)).toLocaleString("en-IN")}</div>
        </div>
      </div>
    </div>
  );
};

// ---------- E-Way Bill ----------
const ewayPkgs = [
  { count: 10, price: 160 },
  { count: 25, price: 400 },
  { count: 50, price: 750 },
  { count: 100, price: 1400 },
];
const EwayCalc = () => {
  const [pkg, setPkg] = useState(ewayPkgs[1]);
  const perBill = pkg.price / pkg.count;
  const waLink = `https://wa.me/919052878779?text=${encodeURIComponent(`Hello Kota Associates, I'd like the ${pkg.count} E-Way Bills package (₹${pkg.price}).`)}`;
  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div>
        <label className="label-clean mb-3">Choose a Package</label>
        <div className="grid grid-cols-2 gap-3">
          {ewayPkgs.map((p) => (
            <button key={p.count} onClick={() => setPkg(p)} className={`p-5 rounded border text-left transition ${pkg.count === p.count ? "border-accent bg-card" : "border-border bg-card hover:border-accent/50"}`}>
              <div className="font-heading text-2xl text-primary">{p.count} <span className="text-sm text-muted-foreground">bills</span></div>
              <div className="text-accent font-medium mt-1">₹{p.price}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="bg-secondary/50 rounded p-6 border border-border">
        <h3 className="font-heading text-xl text-primary mb-4">Selected Package</h3>
        <Row label="Bills Included" val={pkg.count.toString()} />
        <Row label="Per Bill Cost" val={`₹${perBill.toFixed(2)}`} />
        <Row label="Total" val={pkg.price} bold />
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-gold w-full mt-6">Order via WhatsApp</a>
      </div>
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
  return (
    <Layout>
      <section className="bg-primary text-primary-foreground">
        <div className="container-narrow py-24 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4">Tools</p>
          <h1 className="font-heading text-5xl md:text-6xl mb-4">Calculators</h1>
          <div className="gold-divider mx-auto" />
        </div>
      </section>

      <section className="section bg-background">
        <div className="container-narrow">
          <div className="flex border-b border-border mb-10">
            {([
              ["gst", "GST Calculator"],
              ["tax", "Income Tax (FY 2024-25)"],
              ["eway", "E-Way Bill Packages"],
            ] as const).map(([k, label]) => (
              <button key={k} onClick={() => setTab(k)}
                className={`px-5 py-3 text-sm font-medium border-b-2 -mb-px transition ${tab === k ? "border-accent text-primary" : "border-transparent text-muted-foreground hover:text-primary"}`}>
                {label}
              </button>
            ))}
          </div>

          <div className="bg-card border border-border rounded p-6 md:p-10">
            {tab === "gst" && <GSTCalc />}
            {tab === "tax" && <IncomeTaxCalc />}
            {tab === "eway" && <EwayCalc />}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Calculators;
