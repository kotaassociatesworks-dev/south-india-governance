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

// Indian PIN code → approximate lat/lng database (major pin ranges)
const pinDatabase: Record<string, { lat: number; lng: number; city: string }> = {
  // Andhra Pradesh
  "524101": { lat: 14.15, lng: 79.85, city: "Gudur" },
  "524201": { lat: 14.42, lng: 79.97, city: "Nellore" },
  "520001": { lat: 16.51, lng: 80.63, city: "Vijayawada" },
  "530001": { lat: 17.69, lng: 83.21, city: "Visakhapatnam" },
  "515001": { lat: 15.48, lng: 78.49, city: "Anantapur" },
  "516001": { lat: 14.68, lng: 78.83, city: "Cuddapah" },
  "518001": { lat: 15.83, lng: 78.05, city: "Kurnool" },
  "522001": { lat: 16.31, lng: 80.44, city: "Guntur" },
  "517001": { lat: 13.63, lng: 79.42, city: "Tirupati" },
  "533001": { lat: 16.99, lng: 81.78, city: "Rajahmundry" },
  "534001": { lat: 16.58, lng: 81.53, city: "Eluru" },
  "523001": { lat: 15.51, lng: 80.05, city: "Ongole" },
  // Telangana
  "500001": { lat: 17.38, lng: 78.49, city: "Hyderabad" },
  "500081": { lat: 17.44, lng: 78.35, city: "Kukatpally" },
  "501001": { lat: 17.39, lng: 78.08, city: "Sangareddy" },
  "502001": { lat: 17.60, lng: 78.11, city: "Medak" },
  "503001": { lat: 18.33, lng: 78.54, city: "Nizamabad" },
  "504001": { lat: 19.17, lng: 79.27, city: "Adilabad" },
  "505001": { lat: 18.67, lng: 79.50, city: "Karimnagar" },
  "506001": { lat: 17.98, lng: 79.59, city: "Warangal" },
  "507001": { lat: 17.33, lng: 80.62, city: "Khammam" },
  "508001": { lat: 16.75, lng: 79.45, city: "Nalgonda" },
  "509001": { lat: 16.73, lng: 78.08, city: "Mahbubnagar" },
  // Tamil Nadu
  "600001": { lat: 13.08, lng: 80.27, city: "Chennai" },
  "600017": { lat: 13.04, lng: 80.24, city: "T Nagar" },
  "641001": { lat: 11.00, lng: 76.96, city: "Coimbatore" },
  "625001": { lat: 9.92, lng: 78.12, city: "Madurai" },
  "620001": { lat: 10.79, lng: 78.69, city: "Trichy" },
  "636001": { lat: 11.65, lng: 78.16, city: "Salem" },
  "628001": { lat: 8.76, lng: 78.14, city: "Tuticorin" },
  "627001": { lat: 8.73, lng: 77.69, city: "Tirunelveli" },
  "632001": { lat: 12.92, lng: 79.13, city: "Vellore" },
  "630001": { lat: 10.36, lng: 79.14, city: "Sivaganga" },
  "613001": { lat: 10.79, lng: 79.14, city: "Thanjavur" },
  "642001": { lat: 10.79, lng: 76.65, city: "Pollachi" },
  // Karnataka
  "560001": { lat: 12.97, lng: 77.59, city: "Bangalore" },
  "570001": { lat: 12.30, lng: 76.64, city: "Mysore" },
  "580001": { lat: 15.36, lng: 75.12, city: "Hubli-Dharwad" },
  "590001": { lat: 15.85, lng: 74.50, city: "Belgaum" },
  "575001": { lat: 12.87, lng: 74.88, city: "Mangalore" },
  // Kerala
  "682001": { lat: 9.98, lng: 76.28, city: "Kochi" },
  "695001": { lat: 8.50, lng: 76.95, city: "Thiruvananthapuram" },
  "673001": { lat: 11.25, lng: 75.77, city: "Kozhikode" },
  "680001": { lat: 10.52, lng: 76.21, city: "Thrissur" },
  // Maharashtra
  "400001": { lat: 18.93, lng: 72.83, city: "Mumbai" },
  "411001": { lat: 18.52, lng: 73.85, city: "Pune" },
  "440001": { lat: 21.15, lng: 79.09, city: "Nagpur" },
  "431001": { lat: 19.88, lng: 75.34, city: "Aurangabad" },
  "422001": { lat: 19.99, lng: 73.79, city: "Nashik" },
  // Odisha
  "751001": { lat: 20.30, lng: 85.83, city: "Bhubaneswar" },
  "753001": { lat: 20.46, lng: 85.88, city: "Cuttack" },
  "769001": { lat: 22.26, lng: 84.79, city: "Rourkela" },
  // Delhi
  "110001": { lat: 28.63, lng: 77.22, city: "New Delhi" },
  // Gujarat
  "380001": { lat: 23.02, lng: 72.57, city: "Ahmedabad" },
  "395001": { lat: 21.17, lng: 72.83, city: "Surat" },
  // Rajasthan
  "302001": { lat: 26.92, lng: 75.78, city: "Jaipur" },
  "342001": { lat: 26.29, lng: 73.02, city: "Jodhpur" },
  // West Bengal
  "700001": { lat: 22.57, lng: 88.36, city: "Kolkata" },
  // Uttar Pradesh
  "226001": { lat: 26.85, lng: 80.95, city: "Lucknow" },
  "201001": { lat: 28.67, lng: 77.41, city: "Ghaziabad" },
  // Madhya Pradesh
  "462001": { lat: 23.26, lng: 77.41, city: "Bhopal" },
  "452001": { lat: 22.72, lng: 75.86, city: "Indore" },
};

// City name → lat/lng lookup
const cityDatabase: Record<string, { lat: number; lng: number }> = {};
Object.values(pinDatabase).forEach((v) => {
  cityDatabase[v.city.toLowerCase()] = { lat: v.lat, lng: v.lng };
});

const haversineDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // Multiply by 1.3 to approximate road distance
  return Math.round(R * c * 1.3);
};

const resolveLocation = (input: string): { lat: number; lng: number; label: string } | null => {
  const trimmed = input.trim();
  // Try as PIN code
  if (pinDatabase[trimmed]) {
    const p = pinDatabase[trimmed];
    return { lat: p.lat, lng: p.lng, label: `${p.city} (${trimmed})` };
  }
  // Try as city name
  const cityKey = trimmed.toLowerCase();
  if (cityDatabase[cityKey]) {
    return { lat: cityDatabase[cityKey].lat, lng: cityDatabase[cityKey].lng, label: trimmed };
  }
  // Try partial match on city
  const partial = Object.entries(pinDatabase).find(([, v]) =>
    v.city.toLowerCase().includes(cityKey)
  );
  if (partial) {
    return { lat: partial[1].lat, lng: partial[1].lng, label: `${partial[1].city} (${partial[0]})` };
  }
  return null;
};

const EWayDistanceCalc = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [result, setResult] = useState<{
    originLabel: string;
    destLabel: string;
    distance: number;
    validity: number;
    partBRequired: boolean;
  } | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);

    const orig = resolveLocation(origin);
    const dest = resolveLocation(destination);

    if (!orig) {
      setError(`Could not find location: "${origin}". Try a PIN code (e.g. 524101) or city name (e.g. Gudur).`);
      return;
    }
    if (!dest) {
      setError(`Could not find location: "${destination}". Try a PIN code (e.g. 600001) or city name (e.g. Chennai).`);
      return;
    }

    const km = haversineDistance(orig.lat, orig.lng, dest.lat, dest.lng);

    let validity;
    if (km <= 100) validity = 1;
    else if (km <= 300) validity = 3;
    else if (km <= 500) validity = 5;
    else if (km <= 1000) validity = 10;
    else validity = Math.ceil(km / 100);

    setResult({
      originLabel: orig.label,
      destLabel: dest.label,
      distance: km,
      validity,
      partBRequired: km > 50,
    });
  };

  const fieldClass = "w-full h-11 px-4 border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Origin (PIN Code or City)</label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && calculate()}
            placeholder="e.g. 524101 or Gudur"
            className={fieldClass}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Destination (PIN Code or City)</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && calculate()}
            placeholder="e.g. 600001 or Chennai"
            className={fieldClass}
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Enter a 6-digit PIN code or city name. Distance is auto-calculated using built-in coordinates.
      </p>
      <button onClick={calculate} className="w-full py-3 bg-primary text-primary-foreground font-semibold text-sm tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors">
        Calculate Distance & Validity
      </button>
      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-destructive/10 border border-destructive/30 p-4 text-sm text-destructive">
          {error}
        </motion.div>
      )}
      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-accent/10 border border-accent/30 p-6 space-y-2">
          <p className="text-sm"><span className="font-semibold">From:</span> {result.originLabel}</p>
          <p className="text-sm"><span className="font-semibold">To:</span> {result.destLabel}</p>
          <p className="text-sm"><span className="font-semibold">Approx. Road Distance:</span> {result.distance} KM</p>
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
