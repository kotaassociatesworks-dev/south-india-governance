import Layout from "@/components/Layout";
import PageSEO from "@/components/PageSEO";
import { Link, useSearchParams } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";
import { AlertOctagon, Truck, Factory, Store, HardHat } from "lucide-react";

const groups = [
  {
    title: "GST & Compliance",
    items: [
      "GST Registration",
      "Monthly & Quarterly Return Filing",
      "Input Tax Credit (ITC) Reconciliation",
      "GST Amendments",
      "Notice Handling & Replies (DRC-01, DRC-03, ASMT-10, REV-03) — ₹999 flat",
      "GST Refund Applications",
    ],
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

const industries: Record<string, { icon: any; label: string; tagline: string }> = {
  logistics:     { icon: Truck,    label: "Logistics",     tagline: "E-Way Bills, GST compliance and freight-related TDS — all under one roof." },
  manufacturing: { icon: Factory,  label: "Manufacturing", tagline: "MSME registration, GST, E-Way Bills and ROC compliance for manufacturers." },
  retail:        { icon: Store,    label: "Retail",        tagline: "Composition Scheme, GST and TDS compliance for retail and trading businesses." },
  construction:  { icon: HardHat,  label: "Construction",  tagline: "TDS on contractor payments and GST on works contracts — specialist support." },
};

const Services = () => {
  const [params] = useSearchParams();
  const industry = params.get("industry");
  const ind = industry && industries[industry] ? industries[industry] : null;

  return (
    <Layout>
      <PageSEO
        title={ind ? `CA Services for ${ind.label} — South India` : "CA Services — GST, TDS, ROC, E-Way Bills"}
        description={ind ? `Specialist chartered accountancy services for the ${ind.label.toLowerCase()} industry across South India. ${ind.tagline}` : "Full-service GST compliance, income tax, TDS, ROC filings, MSME registration, company incorporation and e-way bill generation."}
        canonical={ind ? `/services?industry=${industry}` : "/services"}
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Services", url: "/services" }]}
      />
      <section className="bg-primary text-primary-foreground">
        <div className="container-narrow py-24 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4">Our Practice Areas</p>
          <h1 className="font-heading text-5xl md:text-6xl mb-4">Services</h1>
          <div className="gold-divider mx-auto" />
        </div>
      </section>

      {ind && (
        <section className="bg-accent/10 border-y border-accent/30">
          <div className="container-narrow py-6 flex items-start gap-4">
            <ind.icon className="w-8 h-8 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
            <div className="flex-1">
              <p className="text-xs uppercase tracking-widest text-accent font-semibold">Serving the {ind.label} industry</p>
              <p className="text-sm text-foreground/85 mt-1">{ind.tagline}</p>
            </div>
            <Link to={`/contact?industry=${industry}`} className="btn-gold !py-2 text-sm whitespace-nowrap">Speak to Specialist</Link>
          </div>
        </section>
      )}

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

          {/* Notice Response highlight */}
          <div className="border-2 border-destructive/50 bg-destructive/5 rounded-md p-6 md:p-8 flex flex-col md:flex-row items-start gap-5">
            <div className="shrink-0 w-12 h-12 rounded-full bg-destructive/15 flex items-center justify-center">
              <AlertOctagon className="w-6 h-6 text-destructive" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading text-2xl text-primary mb-2">Received a GST or Income Tax Notice?</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Do not ignore it. Most notices have a <strong>15–30 day response window</strong>. Our team prepares legally sound replies — DRC-01, DRC-03, ASMT-10, REV-03 — within 48 hours.
              </p>
            </div>
            <Link to="/contact?service=notice-response" className="bg-destructive text-destructive-foreground px-5 py-3 rounded font-medium hover:opacity-90 whitespace-nowrap">Get Help Now →</Link>
          </div>

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

          {/* Industry quick-links */}
          <div className="pt-8 border-t border-border">
            <p className="text-xs tracking-[0.3em] uppercase text-accent text-center mb-4">Industry Specialisations</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {Object.entries(industries).map(([id, i]) => (
                <Link key={id} to={`/services?industry=${id}`}
                  onClick={() => trackEvent("services", "industry_select", id)}
                  className={`bg-card border rounded p-4 transition hover:-translate-y-0.5 hover:border-accent ${industry === id ? "border-accent border-2" : "border-border"}`}>
                  <i.icon className="w-6 h-6 text-accent mb-2" strokeWidth={1.5} />
                  <p className="font-heading text-base text-primary">{i.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{i.tagline.split(".")[0]}.</p>
                </Link>
              ))}
            </div>
          </div>

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
};

export default Services;
