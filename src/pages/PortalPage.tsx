import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileText, ShieldCheck, Calculator, BookOpen, ArrowRight, Lock, Gavel, Receipt, IndianRupee, Clock, FileCheck, Bell } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const oneShotServices = [
  {
    icon: FileText,
    title: "E-Way Bill Generation",
    description: "Generate E-Way Bills with structured compliance. Upload invoices and receive processed bills directly.",
    price: "₹40 per Bill",
    href: "/portal/eway-bill",
    available: true,
  },
  {
    icon: ShieldCheck,
    title: "GST Registration",
    description: "Complete GST registration as per Section 25 of the GST Act. PAN, Aadhaar, and business verification.",
    price: "Not Available Online",
    href: "#",
    available: false,
  },
  {
    icon: Calculator,
    title: "GST Monthly Filing",
    description: "Monthly GSTR-1, 3B filing with ITC reconciliation, outward/inward supply management.",
    price: "Not Available Online",
    href: "#",
    available: false,
  },
  {
    icon: BookOpen,
    title: "Bookkeeping",
    description: "Professional bookkeeping and ledger management tailored to your transaction volume.",
    price: "Not Available Online",
    href: "#",
    available: false,
  },
];

const draftingServices = [
  {
    icon: Gavel,
    title: "Partnership Deed Drafting",
    description: "Legally compliant partnership deed as per Indian Partnership Act, 1932.",
    price: "Starting ₹4,999*",
    href: "/portal/drafting",
    available: true,
  },
  {
    icon: Gavel,
    title: "Rental Agreement Drafting",
    description: "Commercial and residential rental agreements with stamp duty guidance.",
    price: "Starting ₹4,999*",
    href: "/portal/drafting",
    available: true,
  },
  {
    icon: Gavel,
    title: "Mercantile Law Documents",
    description: "Sale of Goods Act, Negotiable Instruments Act, and related commercial documentation.",
    price: "Starting ₹4,999*",
    href: "/portal/drafting",
    available: true,
  },
];

const directTaxServices = [
  {
    icon: Receipt,
    title: "TDS Compliance",
    description: "TDS return filing, TDS certificates, and quarterly statement preparation.",
    price: "Contact Us",
    href: "/#contact",
    available: true,
  },
  {
    icon: Receipt,
    title: "TCS Compliance",
    description: "Tax Collected at Source return filing and compliance management.",
    price: "Contact Us",
    href: "/#contact",
    available: true,
  },
  {
    icon: IndianRupee,
    title: "Trial Balance to Balance Sheet",
    description: "Preparation of financial statements from trial balance including P&L and Balance Sheet.",
    price: "Starting ₹1,599*",
    href: "/portal/balance-sheet",
    available: true,
  },
  {
    icon: Calculator,
    title: "Income Tax Filing",
    description: "Individual and business income tax return preparation and filing.",
    price: "Coming Soon",
    href: "#",
    available: false,
  },
];

const ServiceCard = ({ svc, i }: { svc: typeof oneShotServices[0]; i: number }) => {
  const Icon = svc.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.06, duration: 0.4 }}
      whileHover={svc.available ? { y: -4, transition: { duration: 0.2 } } : {}}
    >
      {svc.available ? (
        <Link
          to={svc.href}
          className="block bg-background border border-border rounded-lg p-8 hover:border-accent/40 hover:shadow-xl transition-all group h-full relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-accent/0 via-accent to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
              <Icon className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{svc.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{svc.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-accent">{svc.price}</span>
              <span className="flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                Get Started <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </Link>
      ) : (
        <div className="block bg-background border border-border rounded-lg p-8 h-full relative overflow-hidden opacity-60">
          <div className="absolute top-4 right-4">
            <Lock className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-5">
            <Icon className="w-6 h-6 text-muted-foreground" />
          </div>
          <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{svc.title}</h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{svc.description}</p>
          <span className="text-sm font-bold text-muted-foreground">{svc.price}</span>
        </div>
      )}
    </motion.div>
  );
};

const SectionHeader = ({ tag, title, subtitle }: { tag: string; title: string; subtitle: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="text-center mb-12"
  >
    <p className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3">{tag}</p>
    <h2 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-3 tracking-tight">{title}</h2>
    <div className="section-divider mt-3 mb-4" />
    <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
  </motion.div>
);

const PortalPage = () => {
  return (
    <main>
      <Navbar />
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-secondary min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-accent/20 bg-accent/5"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent text-xs font-semibold tracking-widest uppercase">Client Portal</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight"
            >
              Self-Service Compliance Portal
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground max-w-2xl mx-auto text-lg"
            >
              Select a service, complete payment, upload documents, and our team will process your request.
            </motion.p>
          </div>

          {/* Dashboard Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-20"
          >
            {[
              { icon: FileCheck, label: "Active Requests", value: "—", color: "text-accent" },
              { icon: Clock, label: "Processing", value: "—", color: "text-royal" },
              { icon: Bell, label: "Notifications", value: "—", color: "text-accent" },
              { icon: ShieldCheck, label: "Completed", value: "—", color: "text-accent" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-background border border-border rounded-lg p-5 text-center">
                  <Icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                  <p className="font-heading text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground tracking-wider uppercase mt-1">{stat.label}</p>
                </div>
              );
            })}
          </motion.div>

          {/* One-Shot Services */}
          <SectionHeader
            tag="Instant Services"
            title="One-Shot Services"
            subtitle="Pay online and get your compliance work done instantly."
          />
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-24">
            {oneShotServices.map((svc, i) => (
              <ServiceCard key={svc.title} svc={svc} i={i} />
            ))}
          </div>

          {/* Drafting Services */}
          <SectionHeader
            tag="Legal Documentation"
            title="Drafting Services"
            subtitle="Professional legal document drafting under Mercantile Law and allied statutes."
          />
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-24">
            {draftingServices.map((svc, i) => (
              <ServiceCard key={svc.title} svc={svc} i={i} />
            ))}
          </div>

          {/* Direct Taxes */}
          <SectionHeader
            tag="Taxation"
            title="Direct Tax Services"
            subtitle="TDS, TCS, financial statement preparation, and income tax compliance."
          />
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
            {directTaxServices.map((svc, i) => (
              <ServiceCard key={svc.title} svc={svc} i={i} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default PortalPage;
