import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileText, ShieldCheck, Calculator, BookOpen, ArrowRight, Lock, Gavel, Receipt, IndianRupee } from "lucide-react";
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
    price: "₹5,000",
    href: "/portal/gst-registration",
    available: true,
  },
  {
    icon: Calculator,
    title: "GST Monthly Filing",
    description: "Monthly GSTR-1, 3B filing with ITC reconciliation, outward/inward supply management.",
    price: "Starting ₹599*",
    href: "/portal/gst-return-filing",
    available: true,
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.08, duration: 0.5 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
    >
      {svc.available ? (
        <Link
          to={svc.href}
          className="block bg-background border border-border p-8 hover:border-accent/50 hover:shadow-xl transition-all group h-full relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
          <div className="relative">
            <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-accent/10 transition-colors">
              <Icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{svc.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{svc.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-accent">{svc.price}</span>
              <span className="flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                Get Started <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </Link>
      ) : (
        <div className="block bg-background border border-border p-8 h-full relative overflow-hidden opacity-70">
          <div className="absolute top-4 right-4">
            <Lock className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="w-12 h-12 bg-muted flex items-center justify-center mb-5">
            <Icon className="w-6 h-6 text-muted-foreground" />
          </div>
          <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{svc.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{svc.description}</p>
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
    <h2 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-3">{title}</h2>
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
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3"
            >
              Client Portal
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4"
            >
              Self-Service Compliance Portal
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Select a service, complete payment, upload documents, and our team will process your request.
            </motion.p>
          </div>

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
