import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import PageSEO from "@/components/PageSEO";
import heroCorporate from "@/assets/hero-corporate.jpg";
import {
  ArrowRight, BadgeCheck, Calculator, CheckCircle2, FileText,
  Landmark, MessageCircle, Phone, Scale, ShieldCheck, Truck,
} from "lucide-react";

const services = [
  { icon: FileText, title: "GST & Tax Compliance", desc: "Registrations, returns, reconciliations and practical advice for ongoing compliance.", to: "/services" },
  { icon: Scale, title: "Tax Notice Support", desc: "Clear review, response strategy and professionally drafted submissions within your deadline.", to: "/contact?service=notice-response" },
  { icon: Calculator, title: "Accounts & Tax Filing", desc: "Bookkeeping, payroll, TDS and income-tax support for businesses and individuals.", to: "/services" },
  { icon: Landmark, title: "Business Registration", desc: "Company, LLP, partnership, MSME and startup registration with end-to-end guidance.", to: "/services" },
  { icon: Truck, title: "E-Way Bill Assistance", desc: "Reliable generation support, validity guidance and bulk packages for logistics teams.", to: "/eway-bills" },
  { icon: ShieldCheck, title: "Business Advisory", desc: "Senior-led guidance for growth, structure, controls and complex compliance decisions.", to: "/contact#booking" },
];

const stats = [
  { value: "IV", label: "Generations of practice" },
  { value: "70+", label: "Years of experience" },
  { value: "1,000+", label: "Clients served" },
  { value: "7", label: "States served" },
];

const generations = [
  { number: "I", title: "The Foundation", copy: "A practice founded in 1952 on discipline, discretion and personal responsibility." },
  { number: "II", title: "The Continuation", copy: "The same principles carried forward as the firm served a growing generation of enterprises." },
  { number: "III", title: "The Modernisation", copy: "Established judgement strengthened by digital systems and a broader compliance practice." },
  { number: "IV", title: "The Practice Today", copy: "Four generations of experience applied to the tax and business realities of today." },
];

const testimonials = [
  { quote: "They understand the urgency of our logistics operations and consistently guide us with practical solutions.", name: "Rajesh Kumar", role: "Logistics Operator, Nellore" },
  { quote: "The team made our registration and tax planning clear, organised and easy to act on.", name: "Priya Venkataraman", role: "Technology Entrepreneur, Hyderabad" },
  { quote: "Three generations of our family business have relied on their steady, personal advice.", name: "D. Subramaniam", role: "Trading Business, Tirupati" },
];

const Home = () => (
  <Layout>
    <PageSEO
      title="Four Generations of Tax & Business Consultancy | Est. 1952"
      description="Kota Associates brings four generations of continuous practice to GST, tax notices, accounting, registrations and business advisory across South India."
      canonical="/"
      breadcrumbs={[{ name: "Home", url: "/" }]}
    />

    <section className="bg-background overflow-hidden">
      <div className="container-narrow py-14 md:py-20 lg:py-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="max-w-2xl animate-fade-up">
          <div className="inline-flex items-center gap-3 text-accent text-xs font-semibold uppercase tracking-[0.22em] mb-6">
            <span className="w-8 h-px bg-accent" /> Established 1952 · Four generations
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-4">Continuity · Judgement · Personal Counsel</p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl leading-[1.14] text-primary mb-6">
            Four generations of experience. <span className="text-accent">One enduring practice.</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">
            Since 1952, Kota Associates has carried the same standard of careful judgement, discretion and personal service into every tax and business matter.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/contact#booking" className="btn-primary !px-7 !py-3.5">Request a Consultation <ArrowRight className="ml-2 w-4 h-4" /></Link>
            <a href="https://wa.me/919052878779?text=Hi%2C%20I%20need%20consultancy%20assistance." target="_blank" rel="noopener noreferrer" className="btn-outline !px-7 !py-3.5"><MessageCircle className="mr-2 w-4 h-4" /> WhatsApp Us</a>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-foreground/75">
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent" /> Continuity across generations</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent" /> Confidential consultation</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent" /> Clear next steps</span>
          </div>
        </div>

        <div className="relative pb-8 lg:pb-10 animate-fade-in">
          <div className="aspect-[4/3] overflow-hidden rounded-md shadow-xl">
            <img src={heroCorporate} alt="Professional consultants in a client advisory meeting" className="w-full h-full object-cover" />
          </div>
          <div className="absolute top-4 right-4 md:-right-5 w-24 h-24 rounded-full border border-accent/70 bg-primary text-primary-foreground grid place-items-center text-center shadow-xl">
            <span><strong className="block font-heading text-2xl text-accent">IV</strong><span className="block text-[8px] uppercase tracking-[0.16em] leading-tight">Generations<br />of practice</span></span>
          </div>
          <a href="tel:+919052878779" className="absolute bottom-0 left-4 md:-left-6 bg-card border border-border rounded-md shadow-xl p-4 md:p-5 flex items-center gap-4 min-w-[260px]">
            <span className="w-11 h-11 rounded bg-accent/15 grid place-items-center"><Phone className="w-5 h-5 text-accent" /></span>
            <span><span className="block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Speak with our team</span><span className="block text-primary font-semibold mt-1">+91 90528 78779</span></span>
          </a>
        </div>
      </div>
    </section>

    <section className="bg-primary text-primary-foreground border-y border-accent/20">
      <div className="container-narrow py-16 md:py-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="legacy-rule text-[10px] font-semibold uppercase tracking-[0.3em] mb-5"><span>Our Continuum</span></p>
          <h2 className="font-heading text-3xl md:text-5xl mb-5">Four generations. The same commitment.</h2>
          <p className="text-primary-foreground/70 leading-relaxed">Methods have evolved. Laws have changed. The responsibility we accept for every client matter has remained constant.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 border border-primary-foreground/15">
          {generations.map((generation) => (
            <article key={generation.number} className="p-6 md:p-7 border-b md:border-b-0 md:border-r last:border-0 border-primary-foreground/15">
              <p className="font-heading text-4xl text-accent mb-5">{generation.number}</p>
              <h3 className="font-heading text-lg mb-3">{generation.title}</h3>
              <p className="text-sm text-primary-foreground/65 leading-relaxed">{generation.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-card border-y border-border">
      <div className="container-narrow py-8 md:py-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => <div key={stat.label} className="lg:border-r last:border-r-0 border-border"><p className="font-heading text-2xl md:text-3xl text-primary">{stat.value}</p><p className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</p></div>)}
      </div>
    </section>

    <section className="section bg-background">
      <div className="container-narrow">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent mb-3">How can we help?</p>
          <h2 className="font-heading text-3xl md:text-5xl text-primary mb-4">Start with what you need today</h2>
          <p className="text-muted-foreground leading-relaxed">Choose your concern. We will connect you to the right consultant and explain the next step without unnecessary complexity.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-md overflow-hidden">
          {services.map((service) => (
            <Link key={service.title} to={service.to} className="group bg-card p-6 md:p-7 hover:bg-secondary/60 transition-colors">
              <service.icon className="w-7 h-7 text-accent mb-5" strokeWidth={1.6} />
              <h3 className="font-heading text-lg text-primary mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{service.desc}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent">Get help <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-primary text-primary-foreground">
      <div className="container-narrow py-16 md:py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent mb-4">Received a notice?</p>
          <h2 className="font-heading text-3xl md:text-5xl mb-5">Do not let a deadline become a bigger problem.</h2>
          <p className="text-primary-foreground/70 leading-relaxed max-w-xl">Send us your GST or income-tax notice. Our team will review the issue, explain the response required, and help prepare a legally sound reply.</p>
        </div>
        <div className="lg:justify-self-end flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
          <Link to="/contact?service=notice-response" className="btn-gold !py-3.5">Get Notice Help <ArrowRight className="ml-2 w-4 h-4" /></Link>
          <a href="tel:+919052878779" className="inline-flex items-center justify-center px-6 py-3.5 border border-primary-foreground/30 rounded font-medium hover:border-accent hover:text-accent transition"><Phone className="w-4 h-4 mr-2" /> Call Now</a>
        </div>
      </div>
    </section>

    <section className="section bg-background">
      <div className="container-narrow grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent mb-3">The Kota Standard</p>
          <h2 className="font-heading text-3xl md:text-5xl text-primary mb-6">Institutional experience. Personal responsibility.</h2>
          <p className="text-muted-foreground leading-relaxed mb-7">Four generations of continuous practice have shaped a disciplined approach: understand the complete matter, advise with independence, and remain accountable through execution.</p>
          <ul className="space-y-4">
            {["Senior professional oversight on every significant matter", "Four generations of accumulated practical judgement", "Advice delivered with independence, clarity and discretion", "Continuity from immediate resolution to long-term compliance"].map((item) => <li key={item} className="flex gap-3 text-sm text-foreground/80"><BadgeCheck className="w-5 h-5 text-accent shrink-0" />{item}</li>)}
          </ul>
          <Link to="/about" className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-accent">Learn about our practice <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid gap-4">
          {testimonials.map((item) => <figure key={item.name} className="border-l-2 border-accent pl-5 py-2"><blockquote className="font-heading text-base md:text-lg text-primary leading-relaxed">“{item.quote}”</blockquote><figcaption className="text-xs text-muted-foreground mt-3"><strong className="text-foreground">{item.name}</strong> · {item.role}</figcaption></figure>)}
        </div>
      </div>
    </section>

    <section className="bg-secondary/60 border-t border-border">
      <div className="container-narrow py-16 md:py-20 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent mb-3">Ready when you are</p>
        <h2 className="font-heading text-3xl md:text-5xl text-primary mb-5">Tell us what you need help with.</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">A short conversation can clarify your options and the right next step.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3"><Link to="/contact#booking" className="btn-primary">Book a Consultation</Link><a href="tel:+919052878779" className="btn-outline"><Phone className="w-4 h-4 mr-2" /> Call +91 90528 78779</a></div>
      </div>
    </section>
  </Layout>
);

export default Home;