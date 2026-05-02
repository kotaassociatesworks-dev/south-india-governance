import Layout from "@/components/Layout";
import { Calculator, ShieldCheck, TrendingUp, ScrollText } from "lucide-react";

const milestones = [
  { year: "1952", title: "Foundation", desc: "Kota Associates is established in Andhra Pradesh as a chartered accountancy practice." },
  { year: "1970s", title: "Regional Expansion", desc: "Practice extends to neighbouring districts and industrial clientele." },
  { year: "1990s", title: "Second Generation", desc: "Modern accounting standards and computerised practice introduced." },
  { year: "2010s", title: "Digital Transformation", desc: "Firm-wide adoption of computerised accounting, e-filing and digital client management systems." },
  { year: "2017",  title: "GST Era", desc: "Kota Associates was a full-service GST practice from Day 1 of the GST regime — guiding every client through registration, transition and ongoing compliance." },
  { year: "Today", title: "Seven-State Practice", desc: "Trusted advisor to over a thousand clients across South India." },
];

const values = [
  { title: "Integrity", desc: "Honesty and transparency guide every engagement." },
  { title: "Excellence", desc: "Rigorous standards in every filing, advisory and audit." },
  { title: "Confidentiality", desc: "Client matters held in absolute discretion." },
  { title: "Continuity", desc: "Three generations of consistent, principled service." },
];

const team = [
  { icon: Calculator, label: "Tax Experts", count: "15+" },
  { icon: ShieldCheck, label: "Compliance Specialists", count: "12+" },
  { icon: TrendingUp, label: "Financial Advisors", count: "10+" },
  { icon: ScrollText, label: "Legal Consultants", count: "8+" },
];

const About = () => (
  <Layout>
    <section className="bg-primary text-primary-foreground">
      <div className="container-narrow py-24 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4">Our Story</p>
        <h1 className="font-heading text-5xl md:text-6xl mb-4">About Kota Associates</h1>
        <div className="gold-divider mx-auto" />
      </div>
    </section>

    {/* Timeline */}
    <section className="section bg-background">
      <div className="container-narrow">
        <h2 className="font-heading text-3xl md:text-4xl text-primary mb-12 text-center">A Journey Since 1952</h2>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />
          {milestones.map((m, i) => (
            <div key={m.year} className={`relative mb-12 md:grid md:grid-cols-2 md:gap-10 ${i % 2 === 0 ? "" : "md:[direction:rtl]"}`}>
              <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-10" : "md:[direction:ltr] md:pl-10"}`}>
                <div className="font-heading text-3xl text-accent mb-1">{m.year}</div>
                <h3 className="font-heading text-xl text-primary mb-2">{m.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
              <div className="hidden md:block" />
              <div className="absolute left-4 md:left-1/2 top-2 w-3 h-3 rounded-full bg-accent -translate-x-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Mission */}
    <section className="section bg-secondary/40">
      <div className="container-narrow text-center max-w-3xl">
        <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4">Our Mission</p>
        <h2 className="font-heading text-3xl md:text-4xl text-primary mb-6">Quality, Assurance, Trust</h2>
        <div className="gold-divider mx-auto mb-8" />
        <p className="text-muted-foreground leading-relaxed text-lg">
          To safeguard the financial wellbeing of our clients through diligent compliance, sound advisory
          and a commitment to the highest professional standards — preserving the legacy entrusted to us
          by three generations of practice.
        </p>
      </div>
    </section>

    {/* Values */}
    <section className="section bg-background">
      <div className="container-narrow">
        <h2 className="font-heading text-3xl md:text-4xl text-primary mb-12 text-center">Our Values</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <div key={v.title} className="text-center">
              <div className="font-heading text-3xl text-accent mb-3">0{i + 1}</div>
              <h3 className="font-heading text-xl text-primary mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="section bg-primary text-primary-foreground">
      <div className="container-narrow">
        <h2 className="font-heading text-3xl md:text-4xl mb-12 text-center">Team Expertise</h2>
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
  </Layout>
);

export default About;
