import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Handshake, Users, MapPin, Building2, ArrowRight, CheckCircle, Phone, Mail, MessageCircle, Briefcase, GraduationCap, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const whatsappUrl = "https://wa.me/919052878779?text=" + encodeURIComponent("Hello, I would like to inquire about taxation and compliance services.");
const gmailUrl = "mailto:kotaassociatesworks@gmail.com?subject=" + encodeURIComponent("Partnership Inquiry") + "&body=" + encodeURIComponent("Hi Kota Associates,\n\nI am interested in exploring partnership/franchise opportunities.\n\nMy Details:\n- Name: \n- Location: \n- Current Practice/Firm: \n- Areas of Interest: \n\nPlease share the details.\n\nThank you.");

const partnerTypes = [
  {
    icon: GraduationCap,
    title: "Chartered Accountants",
    desc: "Partner with us for GST, taxation, and compliance services. Expand your service portfolio with our established systems.",
    benefits: ["Access to proprietary compliance tools", "Client referral network", "Shared revenue model", "Training & knowledge sessions"],
  },
  {
    icon: Briefcase,
    title: "Tax Practitioners",
    desc: "Leverage our 70+ years of expertise to enhance your practice. We provide backend support for complex compliance matters.",
    benefits: ["GST and E-Way Bill support", "Legal drafting assistance", "Competitive commission structure", "Dedicated relationship manager"],
  },
  {
    icon: Building2,
    title: "Accounting Firms",
    desc: "White-label our services under your brand. Offer comprehensive compliance solutions without building in-house capacity.",
    benefits: ["White-label service delivery", "Volume-based pricing", "Multi-state compliance support", "Quality assured processes"],
  },
];

const franchiseRegions = [
  "Andhra Pradesh", "Telangana", "Tamil Nadu", "Karnataka", "Kerala", "Odisha", "Maharashtra",
];

const franchiseBenefits = [
  "Established brand since 1952",
  "Complete training and onboarding",
  "Technology platform access",
  "Marketing and lead generation support",
  "Centralized compliance processing",
  "Regular knowledge updates and webinars",
  "Dedicated support from head office",
  "Revenue sharing model with growth incentives",
];

const PartnershipPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", location: "", type: "", message: "" });
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent("Partnership Application - " + formData.name);
    const body = encodeURIComponent(
      `Partnership Application\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nLocation: ${formData.location}\nPartner Type: ${formData.type}\n\nMessage:\n${formData.message}`
    );
    window.open(`mailto:kotaassociatesworks@gmail.com?subject=${subject}&body=${body}`, "_blank");
  };

  const fieldClass = "w-full h-11 px-4 border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <main>
      <Navbar />
      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 border border-accent/30 rounded-full"
              style={{ left: `${20 * i}%`, top: `${10 + 15 * i}%` }}
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3">
            Grow Together
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-3xl lg:text-5xl font-bold mb-4">
            Partner With Kota Associates
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-2xl mx-auto text-primary-foreground/80 mb-8">
            Join South India's trusted financial compliance network. Leverage our 70+ year legacy to grow your practice.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-4">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-semibold text-sm tracking-wider uppercase hover:brightness-110 transition">
              <MessageCircle className="w-4 h-4" /> WhatsApp Us
            </a>
            <a href={gmailUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary-foreground/30 text-primary-foreground font-semibold text-sm tracking-wider uppercase hover:bg-primary-foreground/10 transition">
              <Mail className="w-4 h-4" /> Email Us
            </a>
          </motion.div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3">Who Can Partner</p>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground">Collaboration Opportunities</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {partnerTypes.map((pt, i) => {
              const Icon = pt.icon;
              return (
                <motion.div
                  key={pt.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="bg-background border border-border p-8 hover:border-accent/40 hover:shadow-lg transition-all group"
                >
                  <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-accent/10 transition-colors">
                    <Icon className="w-7 h-7 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{pt.title}</h3>
                  <p className="text-sm text-muted-foreground mb-5">{pt.desc}</p>
                  <ul className="space-y-2">
                    {pt.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Franchise Opportunity */}
      <section ref={ref} className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3">Expand With Us</p>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Franchise Opportunities Across South India</h2>
              <p className="text-muted-foreground mb-6">
                We're expanding our network of compliance professionals across 7 states. If you're an experienced tax practitioner or CA looking to build your own practice under an established brand, this is your opportunity.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {franchiseRegions.map((r) => (
                  <span key={r} className="inline-flex items-center gap-1 px-3 py-1.5 bg-secondary text-sm font-medium text-foreground">
                    <MapPin className="w-3 h-3 text-accent" />
                    {r}
                  </span>
                ))}
              </div>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-accent-foreground font-semibold text-sm tracking-[0.15em] uppercase hover:brightness-110 transition">
                Inquire Now <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-secondary border border-border p-8"
            >
              <h3 className="font-heading text-xl font-semibold text-foreground mb-6">What You Get</h3>
              <ul className="space-y-3">
                {franchiseBenefits.map((b, i) => (
                  <motion.li
                    key={b}
                    initial={{ opacity: 0, x: 10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="flex items-start gap-3 text-sm text-foreground"
                  >
                    <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    {b}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3">Get Started</p>
            <h2 className="font-heading text-3xl font-bold text-foreground">Apply for Partnership</h2>
          </div>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-background border border-border p-8 lg:p-10 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Full Name *</label>
                <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={fieldClass} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Phone *</label>
                <input required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={fieldClass} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Email *</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={fieldClass} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Location *</label>
                <input required value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className={fieldClass} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Partner Type *</label>
              <select required value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className={fieldClass}>
                <option value="">Select type</option>
                <option>Chartered Accountant</option>
                <option>Tax Practitioner</option>
                <option>Accounting Firm</option>
                <option>Franchise Inquiry</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Message</label>
              <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4} className="w-full px-4 py-3 border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
            </div>
            <button type="submit" className="w-full py-3.5 bg-primary text-primary-foreground font-semibold text-sm tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors">
              Submit Application
            </button>
          </motion.form>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default PartnershipPage;
