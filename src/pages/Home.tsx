import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowRight, FileText, Calculator, Briefcase, ScrollText, Building2, Truck, ShieldCheck, Award, Users, TrendingUp } from "lucide-react";

const stats = [
  { value: "70+", label: "Years of Legacy" },
  { value: "7", label: "States Served" },
  { value: "1000+", label: "Clients" },
  { value: "50+", label: "Partners" },
];

const services = [
  { icon: FileText, title: "GST & Compliance", desc: "Registration, returns, ITC reconciliation, notices and refunds." },
  { icon: Calculator, title: "Accounting Services", desc: "Bookkeeping, ledger maintenance and payroll management." },
  { icon: ScrollText, title: "Drafting & Legal", desc: "Partnership deeds, rental agreements and powers of attorney." },
  { icon: Briefcase, title: "Direct Taxes", desc: "ITR filing, TDS/TCS compliance and balance sheet preparation." },
  { icon: Building2, title: "Business Services", desc: "Incorporation, ROC compliance and business advisory." },
  { icon: Truck, title: "E-Way Bill Services", desc: "Bulk e-way bill generation packages for logistics." },
];

const stories = [
  { sector: "Logistics", result: "₹12L tax liability reduced by 93%", note: "Strategic restructuring & ITC optimization" },
  { sector: "Manufacturing", result: "Significant GST savings", note: "End-to-end compliance overhaul" },
  { sector: "Retail", result: "₹4.2L refund recovered", note: "Litigation support and timely filing" },
];

const team = [
  { icon: Calculator, label: "Tax Experts", count: "15+" },
  { icon: ShieldCheck, label: "Compliance Specialists", count: "12+" },
  { icon: TrendingUp, label: "Financial Advisors", count: "10+" },
  { icon: ScrollText, label: "Legal Consultants", count: "8+" },
];

const pillars = [
  { title: "Seven Decades of Trust", desc: "Established in 1952, we have built lasting relationships across generations." },
  { title: "Multi-State Presence", desc: "Serving clients across seven states in South India with consistent quality." },
  { title: "Personalised Advisory", desc: "Every client receives tailored guidance from senior partners." },
  { title: "Confidentiality First", desc: "Your financial matters are handled with absolute discretion and care." },
];

const Home = () => (
  <Layout>
    {/* Hero */}
    <section className="bg-primary text-primary-foreground">
      <div className="container-narrow py-28 md:py-40 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-accent mb-6">Est. 1952</p>
        <h1 className="font-heading text-5xl md:text-7xl mb-6">Kota Associates</h1>
        <div className="gold-divider mx-auto mb-6" />
        <p className="text-base md:text-lg tracking-[0.3em] uppercase text-primary-foreground/80 mb-10">Quality · Assurance · Trust</p>
        <p className="max-w-2xl mx-auto text-primary-foreground/70 mb-10 leading-relaxed">
          A legacy chartered accountancy and tax consultancy firm serving South India for over seven decades.
        </p>
        <Link to="/contact#booking" className="btn-gold">Book Consultation <ArrowRight className="ml-2 w-4 h-4" /></Link>
      </div>
    </section>

    {/* About */}
    <section className="section bg-background">
      <div className="container-narrow grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4">About the Firm</p>
          <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">A Legacy Built on Integrity</h2>
          <div className="gold-divider mb-6" />
          <p className="text-muted-foreground leading-relaxed mb-4">
            Since 1952, Kota Associates has been delivering quality and assured financial compliance,
            taxation, and advisory services across seven states in South India.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Three generations of practice have shaped a firm that combines time-honoured principles
            with modern expertise — trusted by businesses, families and institutions alike.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-px bg-border">
          {stats.map((s) => (
            <div key={s.label} className="bg-card p-8 text-center">
              <div className="font-heading text-4xl text-accent mb-2">{s.value}</div>
              <div className="text-sm text-muted-foreground tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Services */}
    <section className="section bg-secondary/40">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4">Our Practice</p>
          <h2 className="font-heading text-4xl md:text-5xl text-primary">Comprehensive Services</h2>
          <div className="gold-divider mx-auto mt-6" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="card-clean">
              <s.icon className="w-9 h-9 text-accent mb-5" strokeWidth={1.5} />
              <h3 className="font-heading text-xl text-primary mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/services" className="btn-outline">View All Services</Link>
        </div>
      </div>
    </section>

    {/* Success Stories */}
    <section className="section bg-background">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4">Client Outcomes</p>
          <h2 className="font-heading text-4xl md:text-5xl text-primary">Success Stories</h2>
          <div className="gold-divider mx-auto mt-6" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((s) => (
            <div key={s.sector} className="border-l-2 border-accent pl-6 py-2">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{s.sector}</p>
              <p className="font-heading text-2xl text-primary mb-3">{s.result}</p>
              <p className="text-sm text-muted-foreground">{s.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="section bg-primary text-primary-foreground">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4">Our People</p>
          <h2 className="font-heading text-4xl md:text-5xl">Expertise Across Disciplines</h2>
          <div className="gold-divider mx-auto mt-6" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((t) => (
            <div key={t.label} className="text-center">
              <t.icon className="w-10 h-10 mx-auto text-accent mb-4" strokeWidth={1.5} />
              <div className="font-heading text-3xl text-accent mb-1">{t.count}</div>
              <div className="text-sm text-primary-foreground/70">{t.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Why Choose Us */}
    <section className="section bg-background">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4">Why Choose Us</p>
          <h2 className="font-heading text-4xl md:text-5xl text-primary">Four Pillars of Practice</h2>
          <div className="gold-divider mx-auto mt-6" />
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          {pillars.map((p, i) => (
            <div key={p.title} className="flex gap-5">
              <div className="font-heading text-3xl text-accent shrink-0 w-12">0{i + 1}</div>
              <div>
                <h3 className="font-heading text-xl text-primary mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Contact preview */}
    <section className="section bg-secondary/40">
      <div className="container-narrow text-center">
        <Award className="w-10 h-10 text-accent mx-auto mb-6" strokeWidth={1.5} />
        <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">Speak with our Partners</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10">
          Schedule a consultation with our senior advisors to discuss your tax, compliance or advisory needs.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contact" className="btn-primary">Get in Touch</Link>
          <Link to="/contact#booking" className="btn-gold">Book Consultation</Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default Home;
