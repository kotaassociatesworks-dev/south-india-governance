import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";
import PageSEO from "@/components/PageSEO";
import { ArrowRight, FileText, Calculator, Briefcase, ScrollText, Building2, Truck, ShieldCheck, Award, TrendingUp, Factory, Globe, Rocket, ChevronDown, AlertOctagon, Quote } from "lucide-react";

const stats = [
  { value: 70,   suffix: "+", label: "Years of Legacy" },
  { value: 7,    suffix: "",  label: "States Served" },
  { value: 1000, suffix: "+", label: "Clients" },
  { value: 50,   suffix: "+", label: "Partners" },
];

// Counter that animates 0 → target on mount
const Counter = ({ to, suffix = "", duration = 1400 }: { to: number; suffix?: string; duration?: number }) => {
  const [val, setVal] = useState(0);
  const startedRef = useRef(false);
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <span>{val.toLocaleString("en-IN")}{suffix}</span>;
};

const services = [
  { icon: FileText,    title: "GST & Compliance",       desc: "Registration, returns, ITC reconciliation, notices and refunds." },
  { icon: Calculator,  title: "Accounting Services",    desc: "Bookkeeping, ledger maintenance and payroll management." },
  { icon: ScrollText,  title: "Drafting & Legal",       desc: "Partnership deeds, rental agreements and powers of attorney." },
  { icon: Briefcase,   title: "Direct Taxes",           desc: "ITR filing, TDS/TCS compliance and balance sheet preparation." },
  { icon: Building2,   title: "Business Services",      desc: "Incorporation, ROC compliance and business advisory." },
  { icon: Truck,       title: "E-Way Bill Services",    desc: "Bulk e-way bill generation packages for logistics." },
];

const segments = [
  { id: "legacy",  icon: Building2, label: "Legacy Firm", tagline: "70+ year established businesses" },
  { id: "msme",    icon: Factory,   label: "MSME",         tagline: "Micro, Small & Medium enterprises" },
  { id: "mnc",     icon: Globe,     label: "MNC",          tagline: "Foreign subsidiaries & branch offices" },
  { id: "startup", icon: Rocket,    label: "Startup",      tagline: "DPIIT-recognised & early-stage" },
];

const stories = [
  { sector: "Logistics",     result: "₹12L tax liability reduced by 93%", note: "Strategic restructuring & ITC optimisation" },
  { sector: "Manufacturing", result: "Significant GST savings",            note: "End-to-end compliance overhaul" },
  { sector: "Retail",        result: "₹4.2L refund recovered",             note: "Litigation support and timely filing" },
];

const testimonials = [
  { name: "Rajesh Kumar",        business: "Logistics Operator, Nellore",        text: "Kota Associates handles all our e-way bills. We generate 80+ bills a month and they've never missed a same-day turnaround in two years." },
  { name: "Priya Venkataraman",  business: "Software Startup, Hyderabad",        text: "They got us DPIIT recognition and made sure we didn't miss the 80-IAC deduction. Saved us ₹18L in the first year alone." },
  { name: "D. Subramaniam",      business: "Family Trading Business, Tirupati",  text: "Third generation dealing with Kota Associates. The trust my grandfather placed in them is exactly why I stay." },
];

const team = [
  { icon: Calculator,  label: "Tax Experts",            count: "15+" },
  { icon: ShieldCheck, label: "Compliance Specialists", count: "12+" },
  { icon: TrendingUp,  label: "Financial Advisors",     count: "10+" },
  { icon: ScrollText,  label: "Legal Consultants",      count: "8+" },
];

const pillars = [
  { title: "Seven Decades of Trust",  desc: "Established in 1952, we have built lasting relationships across generations." },
  { title: "Multi-State Presence",    desc: "Serving clients across seven states in South India with consistent quality." },
  { title: "Personalised Advisory",   desc: "Every client receives tailored guidance from senior partners." },
  { title: "Confidentiality First",   desc: "Your financial matters are handled with absolute discretion and care." },
];

const heroBg: React.CSSProperties = {
  backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(184,146,42,0.05) 40px, rgba(184,146,42,0.05) 41px)",
};

const Home = () => (
  <Layout>
    <PageSEO
      title="Tax Consultancy & Legal Advisory Since 1952"
      description="Kota Associates — GST, E-Way Bills, Income Tax, MSME, MNC & Startup compliance across South India since 1952. Quality, Assurance, Trust. Book a free consultation."
      canonical="/"
      breadcrumbs={[{ name: "Home", url: "/" }]}
    />

    {/* Split Hero with animated stats */}
    <section className="bg-primary text-primary-foreground relative overflow-hidden" style={heroBg}>
      <div className="container-narrow py-24 md:py-32 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7">
          <p className="text-xs tracking-[0.4em] uppercase text-accent mb-5">Est. 1952</p>
          <h1 className="font-heading text-5xl md:text-7xl leading-[1.05] mb-5">Kota Associates</h1>
          <div className="h-[2px] w-20 bg-accent mb-6" />
          <p className="text-sm md:text-base tracking-[0.3em] uppercase text-primary-foreground/80 mb-6">Quality · Assurance · Trust</p>
          <p className="text-primary-foreground/75 max-w-xl leading-relaxed mb-8">
            A legacy tax consultancy and legal advisory firm serving South India for over seven decades.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact#booking" className="btn-gold">Book Consultation <ArrowRight className="ml-2 w-4 h-4" /></Link>
            <Link to="/services" className="border border-accent/60 text-accent hover:bg-accent hover:text-accent-foreground transition px-6 py-3 rounded font-medium">Our Services</Link>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="grid grid-cols-2 gap-px bg-accent/20 rounded-md overflow-hidden border border-accent/20">
            {stats.map((s) => (
              <div key={s.label} className="bg-primary/95 p-6 md:p-8 text-center">
                <div className="font-heading text-4xl md:text-5xl text-accent mb-1 tabular-nums">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="text-[11px] uppercase tracking-widest text-primary-foreground/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-accent/70">
        <ChevronDown className="w-6 h-6 animate-bounce" />
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
            Since 1952, Kota Associates has delivered quality and assured tax, compliance, and advisory services across seven states in South India.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Three generations of practice have shaped a firm that combines time-honoured principles with modern expertise — trusted by businesses, families and institutions alike.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-px bg-border">
          {stats.map((s) => (
            <div key={s.label} className="bg-card p-8 text-center">
              <div className="font-heading text-4xl text-accent mb-2">{s.value}{s.suffix}</div>
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

    {/* Notice Response — high-urgency lead-gen card */}
    <section className="bg-background pb-12 md:pb-16">
      <div className="container-narrow">
        <div className="border-2 border-destructive/50 bg-destructive/5 rounded-md p-6 md:p-8 flex flex-col md:flex-row items-start gap-5">
          <div className="shrink-0 w-12 h-12 rounded-full bg-destructive/15 flex items-center justify-center">
            <AlertOctagon className="w-6 h-6 text-destructive" />
          </div>
          <div className="flex-1">
            <h3 className="font-heading text-2xl text-primary mb-2">Received a GST or Income Tax Notice?</h3>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Do not ignore it. Most notices have a <strong>15–30 day response window</strong>. Our team prepares legally sound replies (DRC-01, DRC-03, ASMT-10, REV-03) within 48 hours.
            </p>
          </div>
          <Link to="/contact?service=notice-response" className="bg-destructive text-destructive-foreground px-5 py-3 rounded font-medium hover:opacity-90 whitespace-nowrap">Get Help Now →</Link>
        </div>
      </div>
    </section>

    {/* Success Stories */}
    <section className="section bg-background pt-0 md:pt-0">
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

    {/* Testimonials */}
    <section className="section bg-secondary/40">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4">In Our Clients' Words</p>
          <h2 className="font-heading text-4xl md:text-5xl text-primary">Testimonials</h2>
          <div className="gold-divider mx-auto mt-6" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure key={t.name} className="bg-card border border-border border-l-4 border-l-accent p-6 rounded">
              <Quote className="w-6 h-6 text-accent/60 mb-3" />
              <blockquote className="text-sm text-foreground/85 italic leading-relaxed mb-4">"{t.text}"</blockquote>
              <figcaption>
                <p className="font-heading text-base text-primary">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.business}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>

    {/* Client Segment Strip */}
    <section className="section bg-background">
      <div className="container-narrow">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4">Tailored for Every Business</p>
          <h2 className="font-heading text-4xl text-primary">Choose Your Business Type</h2>
          <div className="gold-divider mx-auto mt-6" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {segments.map((s) => (
            <Link key={s.id} to={`/compliance?type=${s.id}`}
              className="group bg-card border border-border rounded p-6 transition hover:-translate-y-1 hover:shadow-md hover:border-l-4 hover:border-l-accent">
              <s.icon className="w-9 h-9 text-accent mb-4" strokeWidth={1.5} />
              <h3 className="font-heading text-xl text-primary mb-1">{s.label}</h3>
              <p className="text-sm text-muted-foreground mb-4">{s.tagline}</p>
              <span className="text-sm font-medium text-accent group-hover:underline">View compliance guide →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* E-Way Bill Highlight Band */}
    <section className="bg-primary text-primary-foreground">
      <div className="container-narrow py-12 md:py-14 grid md:grid-cols-3 gap-8 items-center">
        <div className="md:col-span-2">
          <h2 className="font-heading text-3xl md:text-4xl mb-2">E-Way Bill Generation</h2>
          <p className="text-primary-foreground/75">From ₹16/bill · Bulk packages · Same-day processing</p>
        </div>
        <div className="flex md:flex-col gap-4 md:items-end items-center">
          <div className="text-right text-primary-foreground/85">
            <p className="text-xs uppercase tracking-widest text-accent">Threshold / Min Penalty</p>
            <p className="font-heading text-2xl">₹50,000 <span className="text-primary-foreground/40">|</span> ₹10,000</p>
          </div>
          <Link to="/eway-bills" className="btn-gold !py-2.5 text-sm">View Packages →</Link>
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="section bg-background">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4">Our People</p>
          <h2 className="font-heading text-4xl md:text-5xl text-primary">Expertise Across Disciplines</h2>
          <div className="gold-divider mx-auto mt-6" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((t) => (
            <div key={t.label} className="text-center">
              <t.icon className="w-10 h-10 mx-auto text-accent mb-4" strokeWidth={1.5} />
              <div className="font-heading text-3xl text-accent mb-1">{t.count}</div>
              <div className="text-sm text-muted-foreground">{t.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Why Choose Us */}
    <section className="section bg-secondary/40">
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
    <section className="section bg-background">
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
