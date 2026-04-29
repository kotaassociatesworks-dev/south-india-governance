import Layout from "@/components/Layout";
import { Link } from "react-router-dom";

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
];

const ewayPackages = [
  { count: 10, price: 160 },
  { count: 25, price: 400 },
  { count: 50, price: 750 },
  { count: 100, price: 1400 },
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
            <p className="text-sm text-muted-foreground">Reliable bulk e-way bill generation for businesses and logistics operators.</p>
          </div>
          <div className="md:col-span-2 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ewayPackages.map((p) => (
              <div key={p.count} className="card-clean text-center !p-6">
                <div className="font-heading text-3xl text-accent mb-1">{p.count}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Bills</div>
                <div className="font-heading text-xl text-primary">₹{p.price}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center pt-8">
          <Link to="/contact#booking" className="btn-gold">Book a Consultation</Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default Services;
