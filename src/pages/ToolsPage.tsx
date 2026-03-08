import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Truck, Search, IndianRupee, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const GSTLateFeeCalc = () => {
  const [returnType, setReturnType] = useState("GSTR-3B");
  const [dueDate, setDueDate] = useState("");
  const [filingDate, setFilingDate] = useState("");
  const [taxLiability, setTaxLiability] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!dueDate || !filingDate) return;
    const due = new Date(dueDate);
    const filed = new Date(filingDate);
    const diffTime = filed.getTime() - due.getTime();
    const days = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    const tax = parseFloat(taxLiability) || 0;

    let cgstFee, sgstFee;
    if (tax === 0) {
      // Nil return
      cgstFee = Math.min(days * 10, 500);
      sgstFee = Math.min(days * 10, 500);
    } else {
      cgstFee = Math.min(days * 25, 5000);
      sgstFee = Math.min(days * 25, 5000);
    }

    const interest = tax > 0 ? (tax * 0.18 * days) / 365 : 0;

    setResult({
      days,
      cgstFee,
      sgstFee,
      totalFee: cgstFee + sgstFee,
      interest: Math.round(interest),
      total: cgstFee + sgstFee + Math.round(interest),
    });
  };

  const fieldClass = "w-full h-11 px-4 border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring";
  const labelClass = "block text-sm font-semibold text-foreground mb-1.5";

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Return Type</label>
          <select value={returnType} onChange={(e) => setReturnType(e.target.value)} className={fieldClass}>
            <option>GSTR-3B</option>
            <option>GSTR-1</option>
            <option>GSTR-9</option>
            <option>GSTR-9C</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Tax Liability (₹)</label>
          <input type="number" value={taxLiability} onChange={(e) => setTaxLiability(e.target.value)} placeholder="0 for nil return" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Due Date</label>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Filing Date</label>
          <input type="date" value={filingDate} onChange={(e) => setFilingDate(e.target.value)} className={fieldClass} />
        </div>
      </div>
      <button onClick={calculate} className="w-full py-3 bg-primary text-primary-foreground font-semibold text-sm tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors">
        Calculate Late Fee
      </button>
      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-accent/10 border border-accent/30 p-6 space-y-2">
          <p className="text-sm"><span className="font-semibold">Delay:</span> {result.days} days</p>
          <p className="text-sm"><span className="font-semibold">CGST Late Fee:</span> ₹{result.cgstFee.toLocaleString("en-IN")}</p>
          <p className="text-sm"><span className="font-semibold">SGST Late Fee:</span> ₹{result.sgstFee.toLocaleString("en-IN")}</p>
          <p className="text-sm"><span className="font-semibold">Interest (18% p.a.):</span> ₹{result.interest.toLocaleString("en-IN")}</p>
          <div className="border-t border-accent/30 pt-2 mt-2">
            <p className="font-heading text-lg font-bold text-foreground">Total Payable: ₹{result.total.toLocaleString("en-IN")}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const IncomeTaxCalc = () => {
  const [income, setIncome] = useState("");
  const [regime, setRegime] = useState("new");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const gross = parseFloat(income) || 0;
    let tax = 0;

    if (regime === "new") {
      // New regime FY 2024-25
      const slabs = [
        { limit: 300000, rate: 0 },
        { limit: 700000, rate: 0.05 },
        { limit: 1000000, rate: 0.10 },
        { limit: 1200000, rate: 0.15 },
        { limit: 1500000, rate: 0.20 },
        { limit: Infinity, rate: 0.30 },
      ];
      let remaining = gross;
      let prev = 0;
      for (const slab of slabs) {
        const taxable = Math.min(remaining, slab.limit - prev);
        tax += taxable * slab.rate;
        remaining -= taxable;
        prev = slab.limit;
        if (remaining <= 0) break;
      }
    } else {
      // Old regime
      const slabs = [
        { limit: 250000, rate: 0 },
        { limit: 500000, rate: 0.05 },
        { limit: 1000000, rate: 0.20 },
        { limit: Infinity, rate: 0.30 },
      ];
      let remaining = gross;
      let prev = 0;
      for (const slab of slabs) {
        const taxable = Math.min(remaining, slab.limit - prev);
        tax += taxable * slab.rate;
        remaining -= taxable;
        prev = slab.limit;
        if (remaining <= 0) break;
      }
    }

    const cess = tax * 0.04;
    setResult({ tax: Math.round(tax), cess: Math.round(cess), total: Math.round(tax + cess) });
  };

  const fieldClass = "w-full h-11 px-4 border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Annual Income (₹)</label>
          <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="e.g. 1200000" className={fieldClass} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Tax Regime</label>
          <select value={regime} onChange={(e) => setRegime(e.target.value)} className={fieldClass}>
            <option value="new">New Regime (FY 2024-25)</option>
            <option value="old">Old Regime</option>
          </select>
        </div>
      </div>
      <button onClick={calculate} className="w-full py-3 bg-primary text-primary-foreground font-semibold text-sm tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors">
        Calculate Tax
      </button>
      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-accent/10 border border-accent/30 p-6 space-y-2">
          <p className="text-sm"><span className="font-semibold">Income Tax:</span> ₹{result.tax.toLocaleString("en-IN")}</p>
          <p className="text-sm"><span className="font-semibold">Health & Education Cess (4%):</span> ₹{result.cess.toLocaleString("en-IN")}</p>
          <div className="border-t border-accent/30 pt-2 mt-2">
            <p className="font-heading text-lg font-bold text-foreground">Total Tax: ₹{result.total.toLocaleString("en-IN")}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const EWayDistanceCalc = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const km = parseFloat(distance) || 0;
    let validity;
    if (km <= 100) validity = 1;
    else if (km <= 300) validity = 3;
    else if (km <= 500) validity = 5;
    else if (km <= 1000) validity = 10;
    else validity = Math.ceil(km / 100);

    setResult({ distance: km, validity, partBRequired: km > 50 });
  };

  const fieldClass = "w-full h-11 px-4 border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Origin City/PIN</label>
          <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="e.g. Gudur" className={fieldClass} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Destination City/PIN</label>
          <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="e.g. Chennai" className={fieldClass} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-foreground mb-1.5">Approximate Distance (KM)</label>
        <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} placeholder="Enter distance in KM" className={fieldClass} />
      </div>
      <button onClick={calculate} className="w-full py-3 bg-primary text-primary-foreground font-semibold text-sm tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors">
        Check E-Way Bill Validity
      </button>
      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-accent/10 border border-accent/30 p-6 space-y-2">
          <p className="text-sm"><span className="font-semibold">Distance:</span> {result.distance} KM</p>
          <p className="text-sm"><span className="font-semibold">E-Way Bill Validity:</span> {result.validity} day(s)</p>
          <p className="text-sm"><span className="font-semibold">Part-B Required:</span> {result.partBRequired ? "Yes" : "No (within 50 KM)"}</p>
        </motion.div>
      )}
    </div>
  );
};

const HSNCodeFinder = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const hsnData = [
    { code: "0101", desc: "Live horses, asses, mules and hinnies", rate: "0%" },
    { code: "0201", desc: "Meat of bovine animals, fresh or chilled", rate: "0%" },
    { code: "1001", desc: "Wheat and meslin", rate: "0%" },
    { code: "1006", desc: "Rice", rate: "5%" },
    { code: "2201", desc: "Waters, including mineral waters", rate: "18%" },
    { code: "3004", desc: "Medicaments for therapeutic uses", rate: "12%" },
    { code: "3926", desc: "Articles of plastics", rate: "18%" },
    { code: "6109", desc: "T-shirts, singlets and other vests, knitted", rate: "5%" },
    { code: "7308", desc: "Structures of iron or steel", rate: "18%" },
    { code: "8471", desc: "Automatic data processing machines (computers)", rate: "18%" },
    { code: "8517", desc: "Telephone sets, smartphones", rate: "18%" },
    { code: "8703", desc: "Motor cars and vehicles for transport of persons", rate: "28%" },
    { code: "8704", desc: "Motor vehicles for transport of goods", rate: "28%" },
    { code: "9401", desc: "Seats and chairs", rate: "18%" },
    { code: "9403", desc: "Furniture and parts thereof", rate: "18%" },
    { code: "4901", desc: "Printed books, brochures, leaflets", rate: "0%" },
    { code: "6203", desc: "Men's or boys' suits, trousers", rate: "5%" },
    { code: "6204", desc: "Women's or girls' suits, dresses", rate: "5%" },
    { code: "8528", desc: "Television receivers, monitors", rate: "28%" },
    { code: "3304", desc: "Beauty or make-up preparations", rate: "28%" },
  ];

  const search = () => {
    if (!query.trim()) { setResults([]); return; }
    const q = query.toLowerCase();
    const found = hsnData.filter(
      (h) => h.code.includes(q) || h.desc.toLowerCase().includes(q)
    );
    setResults(found);
  };

  const fieldClass = "w-full h-11 px-4 border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && search()} placeholder="Search HSN code or product name..." className={fieldClass} />
        <button onClick={search} className="px-6 py-2 bg-primary text-primary-foreground font-semibold text-sm tracking-wider uppercase hover:bg-primary/90 transition-colors shrink-0">
          Search
        </button>
      </div>
      {results.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="text-left px-4 py-3 font-semibold">HSN Code</th>
                <th className="text-left px-4 py-3 font-semibold">Description</th>
                <th className="text-left px-4 py-3 font-semibold">GST Rate</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.code} className="border-t border-border hover:bg-secondary/50 transition-colors">
                  <td className="px-4 py-3 font-mono font-semibold text-accent">{r.code}</td>
                  <td className="px-4 py-3">{r.desc}</td>
                  <td className="px-4 py-3 font-semibold">{r.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
      {query && results.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">No results found. Try a different keyword or HSN code.</p>
      )}
    </div>
  );
};

const tools = [
  { id: "gst-late-fee", icon: Calculator, title: "GST Late Fee Calculator", desc: "Calculate late fees and interest for delayed GST return filing under CGST Act.", component: GSTLateFeeCalc },
  { id: "income-tax", icon: IndianRupee, title: "Income Tax Calculator", desc: "Calculate income tax under new and old regime for FY 2024-25.", component: IncomeTaxCalc },
  { id: "eway-distance", icon: Truck, title: "E-Way Bill Distance & Validity", desc: "Check E-Way Bill validity period based on distance as per Rule 138.", component: EWayDistanceCalc },
  { id: "hsn-finder", icon: Search, title: "HSN Code Finder", desc: "Search HSN codes and find applicable GST rates for goods.", component: HSNCodeFinder },
];

const ToolsPage = () => {
  const [activeTool, setActiveTool] = useState(tools[0].id);
  const ActiveComponent = tools.find((t) => t.id === activeTool)?.component || GSTLateFeeCalc;

  return (
    <main>
      <Navbar />
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-secondary min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3">
              Free Tools
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Compliance Calculators & Tools
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-muted-foreground max-w-2xl mx-auto">
              Free professional tools for GST, Income Tax, E-Way Bill, and HSN code lookup.
            </motion.p>
          </div>

          {/* Tool selector */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
            {tools.map((tool, i) => {
              const Icon = tool.icon;
              const active = activeTool === tool.id;
              return (
                <motion.button
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setActiveTool(tool.id)}
                  className={`text-left p-5 border transition-all group ${
                    active
                      ? "bg-primary text-primary-foreground border-primary shadow-lg"
                      : "bg-background border-border hover:border-accent/40 hover:shadow-md"
                  }`}
                >
                  <Icon className={`w-6 h-6 mb-3 ${active ? "text-accent" : "text-primary group-hover:text-accent"} transition-colors`} />
                  <h3 className="font-heading text-sm font-semibold">{tool.title}</h3>
                </motion.button>
              );
            })}
          </div>

          {/* Active tool */}
          <motion.div
            key={activeTool}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto bg-background border border-border p-8 lg:p-10"
          >
            <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
              {tools.find((t) => t.id === activeTool)?.title}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              {tools.find((t) => t.id === activeTool)?.desc}
            </p>
            <ActiveComponent />
          </motion.div>

          {/* SEO content */}
          <div className="max-w-3xl mx-auto mt-16 space-y-8 text-sm text-muted-foreground">
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">How GST Late Fee is Calculated?</h2>
              <p>Under the CGST Act, a late fee of ₹25 per day each under CGST and SGST (₹50/day total) is charged for delayed filing of GST returns. For nil returns, the fee is ₹10 per day each (₹20/day total). Maximum late fee is capped at ₹5,000 per return under each act. Additionally, interest at 18% per annum is charged on the outstanding tax liability from the due date.</p>
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">E-Way Bill Validity Rules</h2>
              <p>E-Way Bills are mandatory for movement of goods exceeding ₹50,000 in value. Part-B is required when distance exceeds 50 KM. Validity is 1 day for every 100 KM (up to 100 KM = 1 day). Over-dimensional cargo gets 1 day per 20 KM. E-Way Bills can be extended before or within 8 hours of expiry.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ToolsPage;
