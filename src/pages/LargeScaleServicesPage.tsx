import { useState } from "react";
import { motion } from "framer-motion";
import { Factory, Building, CheckCircle2, ArrowRight, MessageCircle, Mail, Phone, FileText, ShieldCheck, Calculator, BookOpen, Scale, Truck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const whatsappUrl = "https://wa.me/919849847973?text=" + encodeURIComponent("Hi, I'm interested in Large Scale Services from Kota Associates.");

const allServices = [
  { name: "GST Registration", icon: FileText },
  { name: "GST Return Filing", icon: Calculator },
  { name: "GST Amendments", icon: FileText },
  { name: "ITC Claims & Reconciliation", icon: ShieldCheck },
  { name: "GST Refunds", icon: Calculator },
  { name: "GST Notices & Representation", icon: Scale },
  { name: "Bookkeeping", icon: BookOpen },
  { name: "Ledger Management", icon: BookOpen },
  { name: "Payroll Compliance", icon: FileText },
  { name: "Partnership Deed Drafting", icon: Scale },
  { name: "Rental Agreement Drafting", icon: FileText },
  { name: "TDS/TCS Compliance", icon: ShieldCheck },
  { name: "Balance Sheet Preparation", icon: Calculator },
  { name: "E-Way Bill Services", icon: Truck },
  { name: "Firm Registrations", icon: Building },
];

const tiers = [
  {
    key: "msme",
    icon: Factory,
    title: "M.S.M.E Package",
    subtitle: "Micro, Small & Medium Enterprises",
    badge: "Special MSME Pricing",
    description: "All-inclusive compliance solutions designed for growing businesses. Get dedicated support, priority processing, and negotiated rates across every service we offer.",
    highlights: [
      "Dedicated compliance manager",
      "Priority processing for all filings",
      
      
      "Special bulk pricing on E-Way Bills",
      "Annual compliance audit included",
    ],
  },
  {
    key: "mnc",
    icon: Building,
    title: "M.N.C Package",
    subtitle: "Multi-National Corporations",
    badge: "Enterprise Pricing",
    description: "Enterprise-grade compliance infrastructure with dedicated account management, SLA-backed turnaround times, and volume-based pricing across all states.",
    highlights: [
      "Dedicated enterprise account team",
      
      
      
      "24/7 priority support line",
      
    ],
  },
];

const LargeScaleServicesPage = () => {
  const [activeTier, setActiveTier] = useState(0);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    type: "",
    states: "",
    requirements: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Large Scale Services Inquiry - " + formData.companyName);
    const body = encodeURIComponent(
      `Large Scale Services Inquiry\n\nCompany: ${formData.companyName}\nContact Person: ${formData.contactPerson}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nBusiness Type: ${formData.type}\nStates Required: ${formData.states}\n\nRequirements:\n${formData.requirements}`
    );
    window.open(`mailto:kotaassociatesworks@gmail.com?subject=${subject}&body=${body}`, "_blank");
  };

  const fieldClass = "w-full h-11 px-4 border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring";
  const tier = tiers[activeTier];

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <p className="text-sm font-semibold tracking-[0.25em] uppercase text-gold mb-3">Enterprise Solutions</p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mb-5">Large Scale Services</h1>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Comprehensive compliance packages for MSMEs and MNCs — all services included with dedicated support and special pricing.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#packages" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-accent-foreground font-semibold text-sm tracking-[0.15em] uppercase hover:brightness-110 transition">
                View Packages <ArrowRight className="w-4 h-4" />
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-primary-foreground/30 text-primary-foreground font-semibold text-sm tracking-[0.15em] uppercase hover:bg-primary-foreground/10 transition">
                <MessageCircle className="w-4 h-4" /> Get a Quote
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3">Choose Your Package</p>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground">Service Packages</h2>
          </div>

          {/* Tier toggle */}
          <div className="flex justify-center gap-4 mb-12">
            {tiers.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.button
                  key={t.key}
                  whileHover={{ y: -2 }}
                  onClick={() => setActiveTier(i)}
                  className={`flex items-center gap-3 px-6 py-4 border transition-all ${
                    activeTier === i
                      ? "border-accent bg-accent/10 text-accent shadow-md"
                      : "border-border text-muted-foreground hover:border-accent/40"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="font-heading text-lg font-semibold">{t.title}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Active tier */}
          <motion.div key={activeTier} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-5xl mx-auto">
            <div className="bg-background border border-border p-8 lg:p-12">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-bold tracking-[0.15em] uppercase">
                  {tier.badge}
                </span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-1">{tier.title}</h3>
              <p className="text-muted-foreground mb-6">{tier.subtitle}</p>
              <p className="text-foreground/80 mb-8 text-lg leading-relaxed">{tier.description}</p>

              <div className="grid lg:grid-cols-2 gap-10">
                {/* Services included */}
                <div>
                  <h4 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent" /> All Services Included
                  </h4>
                  <div className="grid gap-2.5">
                    {allServices.map((svc) => {
                      const SvcIcon = svc.icon;
                      return (
                        <div key={svc.name} className="flex items-center gap-3 text-sm text-muted-foreground p-2 bg-secondary/50 hover:bg-secondary transition">
                          <SvcIcon className="w-4 h-4 text-accent shrink-0" />
                          {svc.name}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Package highlights */}
                <div>
                  <h4 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-accent" /> Package Highlights
                  </h4>
                  <div className="space-y-3 mb-8">
                    {tier.highlights.map((h, i) => (
                      <motion.div
                        key={h}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3 text-sm text-foreground p-3 bg-accent/5 border border-accent/10"
                      >
                        <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        {h}
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-primary p-6 text-primary-foreground">
                    <p className="font-heading text-lg font-semibold mb-2">Ready to get started?</p>
                    <p className="text-sm text-primary-foreground/70 mb-4">Contact us for a custom quote based on your requirements.</p>
                    <div className="flex flex-col gap-2">
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold text-accent-foreground font-semibold text-sm tracking-wider uppercase hover:brightness-110 transition">
                        <MessageCircle className="w-4 h-4" /> WhatsApp Us
                      </a>
                       <a href="tel:+919849847973" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-primary-foreground/30 text-primary-foreground font-semibold text-sm tracking-wider uppercase hover:bg-primary-foreground/10 transition">
                         <Phone className="w-4 h-4" /> Call: 9849847973
                       </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3">Get a Custom Quote</p>
            <h2 className="font-heading text-3xl font-bold text-foreground">Request a Proposal</h2>
          </div>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-secondary border border-border p-8 lg:p-10 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Company Name *</label>
                <input required value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} className={fieldClass} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Contact Person *</label>
                <input required value={formData.contactPerson} onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })} className={fieldClass} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Email *</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={fieldClass} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Phone *</label>
                <input required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={fieldClass} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Business Type *</label>
                <select required value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className={fieldClass}>
                  <option value="">Select type</option>
                  <option>MSME</option>
                  <option>MNC / Large Enterprise</option>
                  <option>Startup</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">States Required</label>
                <input placeholder="e.g., AP, TN, KA" value={formData.states} onChange={(e) => setFormData({ ...formData, states: e.target.value })} className={fieldClass} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Requirements</label>
              <textarea value={formData.requirements} onChange={(e) => setFormData({ ...formData, requirements: e.target.value })} rows={4} className="w-full px-4 py-3 border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" placeholder="Describe your compliance needs, number of entities, expected volume..." />
            </div>
            <button type="submit" className="w-full py-3.5 bg-primary text-primary-foreground font-semibold text-sm tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors">
              Submit Inquiry
            </button>
          </motion.form>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default LargeScaleServicesPage;
