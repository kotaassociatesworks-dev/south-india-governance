import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileText, ShieldCheck, Calculator, BookOpen, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    icon: FileText,
    title: "E-Way Bill Generation",
    description: "Generate E-Way Bills with structured compliance. Upload invoices and receive processed bills directly.",
    price: "₹40 per Bill",
    href: "/portal/eway-bill",
  },
  {
    icon: ShieldCheck,
    title: "GST Registration",
    description: "Complete GST registration as per Section 25 of the GST Act. PAN, Aadhaar, and business verification.",
    price: "₹5,000",
    href: "/portal/gst-registration",
  },
  {
    icon: Calculator,
    title: "GST Monthly Filing",
    description: "Monthly GSTR-1, 3B filing with ITC reconciliation, outward/inward supply management.",
    price: "₹2,999/month",
    href: "/portal/gst-return-filing",
  },
  {
    icon: BookOpen,
    title: "Bookkeeping",
    description: "Professional bookkeeping and ledger management tailored to your transaction volume.",
    price: "Custom Pricing",
    href: "/portal/bookkeeping",
  },
];

const PortalPage = () => {
  return (
    <main>
      <Navbar />
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-secondary min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3">
              Client Portal
            </p>
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Self-Service Compliance Portal
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select a service, complete payment, upload documents, and our team will process your request.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <motion.div
                  key={svc.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={svc.href}
                    className="block bg-background border border-border p-8 hover:border-accent/40 transition-all group h-full"
                  >
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-accent/10 transition-colors">
                      <Icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                      {svc.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{svc.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-accent">{svc.price}</span>
                      <span className="flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                        Get Started <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default PortalPage;
