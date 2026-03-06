import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileText, ShieldCheck, Calculator, BookOpen, Truck, Briefcase, Gavel, Receipt, ArrowRight, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const serviceGroups = [
  {
    title: "GST & Compliance",
    icon: ShieldCheck,
    services: [
      "GST Registration",
      "GST Amendments",
      "GST Return Filing (GSTR-1, 3B, 9, 9C)",
      "ITC Claims & Reconciliation",
      "GST Refunds",
      "GST Notices & Representation",
    ],
  },
  {
    title: "Accounting Services",
    icon: Calculator,
    services: [
      "Bookkeeping",
      "Ledger Management",
      "Payroll Compliance",
    ],
  },
  {
    title: "Drafting & Legal Services",
    icon: Gavel,
    services: [
      "Partnership Deed Drafting",
      "Rental Agreement Drafting",
      "Sale of Goods Act Documentation",
      "Negotiable Instruments Act Compliance",
      "Power of Attorney",
      "All Mercantile Law Related Drafting",
    ],
  },
  {
    title: "Direct Tax Services",
    icon: Receipt,
    services: [
      "TDS Return Filing & Compliance",
      "TCS Return Filing & Compliance",
      "Trial Balance to Balance Sheet Preparation",
      "Income Tax Filing (Coming Soon)",
    ],
  },
  {
    title: "Legal & Business Services",
    icon: Briefcase,
    services: [
      "Partnership Deeds",
      "Commercial Rental Agreements",
      "Firm Registrations",
    ],
  },
  {
    title: "E-Way Bill Bulk Upload Service",
    icon: Truck,
    services: [
      "10 E-Way Bills",
      "25 E-Way Bills",
      "50 E-Way Bills",
      "100 E-Way Bills",
    ],
  },
];

const ServicesPage = () => {
  return (
    <main>
      <Navbar />
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-secondary min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3"
            >
              Our Services
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4"
            >
              Professional Compliance Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Comprehensive financial compliance, taxation, and advisory services.
              Contact us for customized pricing based on your requirements.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {serviceGroups.map((group, i) => {
              const Icon = group.icon;
              return (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-background border border-border p-8 hover:border-accent/40 hover:shadow-lg transition-all group relative overflow-hidden"
                >
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-accent/0 group-hover:bg-accent transition-colors duration-300" />
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-accent/10 transition-colors">
                    <Icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                    {group.title}
                  </h3>
                  <ul className="space-y-2 mb-6">
                    {group.services.map((s) => (
                      <li key={s} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/#contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-primary transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Contact Us for Pricing
                  </a>
                </motion.div>
              );
            })}
          </div>

          {/* CTA to Portal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-20 p-10 bg-background border border-border max-w-2xl mx-auto relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
            <div className="relative">
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">
                Need instant service?
              </h3>
              <p className="text-muted-foreground mb-6 text-sm">
                Use our Client Portal for quick E-Way Bill generation, GST Registration, drafting, and monthly filing with online payment.
              </p>
              <Link
                to="/portal"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-accent-foreground font-semibold text-sm tracking-[0.15em] uppercase hover:brightness-110 transition"
              >
                Go to Client Portal <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ServicesPage;
