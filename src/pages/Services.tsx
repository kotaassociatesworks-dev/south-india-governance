import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";

const groups = [
  {
    title: "GST & Compliance",
    items: ["GST Registration", "Monthly & Quarterly Return Filing", "Input Tax Credit (ITC) Reconciliation", "GST Amendments", "Notice Handling & Replies", "GST Refund Applications"],
  },
  {
    title: "Accounting Services",
    items: ["Bookkeeping", "Ledger Maintenance", "Payroll Processing"],
  },
  {
    title: "Drafting & Legal",
    items: ["Partnership Deeds", "Rental Agreements", "Power of Attorney"],
  },
  {
    title: "Direct Tax",
    items: ["Income Tax Return (ITR) Filing", "TDS / TCS Compliance", "Balance Sheet Preparation"],
  },
  {
    title: "Business Services",
    items: [
      "Company / LLP Incorporation (SPICe+)",
      "ROC Annual Filings (AOC-4, MGT-7)",
      "Udyam (MSME) Registration",
      "DPIIT Startup Recognition",
      "FEMA & RBI Compliance",
      "Transfer Pricing Documentation",
      "Secretarial Audit (MR-3)",
      "Professional Tax Registration",
    ],
  },
];

const ewayPackages = [
  { count: 10,  price: 160,  perBill: 16, tag: null },
  { count: 25,  price: 400,  perBill: 16, tag: null },
  { count: 50,  price: 750,  perBill: 15, tag: "Most Popular" },
  { count: 100, price: 1400, perBill: 14, tag: null },
];

const Services = () => (
  <Layout>
    <section className="bg-primary text-primary-foreground">
      <div className="container-narrow py-24 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4">Our Practice Areas</p>
        <h1 className="font-heading text-5xl md:text-6xl mb-4">Services</h1>
        <div className="gold-divider mx-auto" />
      </div>
    </section>

    <section className="section bg-background">
      <div className="container-narrow space-y-16">
        {groups.map((g) => (
          <div key={g.title} className="grid md:grid-cols-3 gap-10">
            <div>
              <h2 className="font-heading text-3xl text-primary mb-4">{g.title}</h2>
              <div className="gold-divider" />
            </div>
            <ul className="md:col-span-2 grid sm:grid-cols-2 gap-4">
              {g.items.map((i) => (
                <li key={i} className="bg-card border border-border rounded p-5 text-sm text-foreground hover:border-accent/40 transition">
                  <span className="text-accent mr-2">›</span>{i}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* E-Way Packages */}
        <div className="grid md:grid-cols-3 gap-10 pt-8 border-t border-border">
          <div>
            <h2 className="font-heading text-3xl text-primary mb-4">E-Way Bill Packages</h2>
            <div className="gold-divider mb-4" />
            <p className="text-sm text-muted-foreground mb-3">Reliable bulk e-way bill generation for businesses and logistics operators.</p>
            <Link to="/eway-bills" className="text-sm text-accent font-medium hover:underline">Learn More →</Link>
          </div>
          <div className="md:col-span-2 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ewayPackages.map((p) => (
              <div key={p.count}
                onClick={() => trackEvent("services", "eway_package_view", String(p.count))}
                className={`relative bg-card rounded p-5 text-center transition hover:-translate-y-1 ${p.tag ? "border-2 border-accent shadow-md" : "border border-border hover:border-accent/40"}`}>
                {p.tag && <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-accent text-accent-foreground text-[10px] font-semibold tracking-wider rounded-full">{p.tag.toUpperCase()}</span>}
                <div className="font-heading text-3xl text-accent mb-1">{p.count}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Bills</div>
                <div className="font-heading text-xl text-primary">₹{p.price}</div>
                <div className="text-xs text-muted-foreground mt-1">₹{p.perBill}/bill</div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto">
          Custom packages for 200+ bills/month. All packages include Part A + Part B filing, vehicle updates, cancellation, and bulk upload support.
        </p>

        <div className="text-center pt-4 space-y-4">
          <p className="text-sm text-muted-foreground">
            Not sure which services apply to your business type?{" "}
            <Link to="/compliance" className="text-accent font-medium hover:underline">View our tailored compliance guide →</Link>
          </p>
          <Link to="/contact#booking" className="btn-gold">Book a Consultation</Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default Services;
