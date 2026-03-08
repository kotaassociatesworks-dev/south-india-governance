import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, FileText, ShieldCheck, Calculator, BookOpen, Gavel, Receipt, IndianRupee, MessageCircle, Check, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const allServices = [
  { id: 1, name: "GST Registration", category: "Registration", price: "₹999", icon: ShieldCheck, popular: true, features: ["PAN & Aadhaar verification", "Application filing", "Certificate delivery"] },
  { id: 2, name: "GST Monthly Filing", category: "Filing", price: "₹599/mo", icon: Calculator, popular: true, features: ["GSTR-1 filing", "GSTR-3B filing", "ITC reconciliation"] },
  { id: 3, name: "E-Way Bill Generation", category: "Compliance", price: "₹40/bill", icon: FileText, popular: false, features: ["Invoice-based generation", "Multi-vehicle support", "Instant delivery"] },
  { id: 4, name: "Bookkeeping", category: "Accounting", price: "₹1,499/mo", icon: BookOpen, popular: false, features: ["Ledger management", "Bank reconciliation", "Monthly reports"] },
  { id: 5, name: "Partnership Deed Drafting", category: "Legal", price: "₹4,999", icon: Gavel, popular: false, features: ["Legally compliant draft", "Stamp duty guidance", "2 revisions included"] },
  { id: 6, name: "Tax Notice Reply", category: "Advisory", price: "₹999", icon: Receipt, popular: true, features: ["Notice analysis", "Reply drafting", "Filing assistance"] },
  { id: 7, name: "TDS Compliance", category: "Filing", price: "₹2,499/qtr", icon: Receipt, popular: false, features: ["TDS return filing", "Certificate generation", "Quarterly statements"] },
  { id: 8, name: "Balance Sheet Preparation", category: "Accounting", price: "₹1,599", icon: IndianRupee, popular: false, features: ["Trial balance to BS", "P&L statement", "Financial ratios"] },
  { id: 9, name: "Income Tax Filing", category: "Filing", price: "₹499", icon: Calculator, popular: true, features: ["ITR-1 to ITR-4", "Form 16 processing", "Refund tracking"] },
  { id: 10, name: "Rental Agreement Drafting", category: "Legal", price: "₹4,999", icon: Gavel, popular: false, features: ["Commercial & residential", "Stamp duty calculation", "Registration guidance"] },
  { id: 11, name: "Tax Advisory Session", category: "Advisory", price: "₹1,499", icon: ShieldCheck, popular: false, features: ["30-min consultation", "Compliance roadmap", "Action items report"] },
  { id: 12, name: "GST Annual Return", category: "Filing", price: "₹2,999", icon: FileText, popular: false, features: ["GSTR-9 preparation", "Reconciliation", "Filing & submission"] },
];

const cats = ["All", "Registration", "Filing", "Compliance", "Accounting", "Legal", "Advisory"];

const ServiceMarketplacePage = () => {
  const [filter, setFilter] = useState("All");
  const [cart, setCart] = useState([]);

  const filtered = filter === "All" ? allServices : allServices.filter((s) => s.category === filter);

  const toggleCart = (id) => {
    setCart((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const cartItems = allServices.filter((s) => cart.includes(s.id));
  const whatsappMsg = cartItems.length
    ? `I'm interested in these services: ${cartItems.map((s) => s.name).join(", ")}. Please share details.`
    : "";

  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-accent/20 bg-accent/5">
              <ShoppingCart className="w-4 h-4 text-accent" />
              <span className="text-accent text-xs font-semibold tracking-widest uppercase">Service Marketplace</span>
            </div>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-3">Browse & Book Services</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Select the services you need and get started instantly.</p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === c ? "bg-accent text-accent-foreground" : "bg-background border border-border text-foreground hover:border-accent/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {filtered.map((svc, i) => {
              const Icon = svc.icon;
              const inCart = cart.includes(svc.id);
              return (
                <motion.div
                  key={svc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`relative bg-background border-2 rounded-xl p-6 transition-all ${
                    inCart ? "border-accent shadow-lg" : "border-border hover:border-accent/30"
                  }`}
                >
                  {svc.popular && (
                    <span className="absolute top-3 right-3 text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-semibold">Popular</span>
                  )}
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-1">{svc.name}</h3>
                  <p className="text-accent font-bold text-lg mb-3">{svc.price}</p>
                  <ul className="space-y-1.5 mb-5">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-3.5 h-3.5 text-accent shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={inCart ? "default" : "outline"}
                    className="w-full"
                    onClick={() => toggleCart(svc.id)}
                  >
                    {inCart ? <><X className="w-4 h-4 mr-1" /> Remove</> : <>Add to Inquiry</>}
                  </Button>
                </motion.div>
              );
            })}
          </div>

          {/* Cart Summary */}
          {cart.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground rounded-xl px-6 py-4 shadow-2xl flex items-center gap-4 z-50 max-w-lg"
            >
              <ShoppingCart className="w-5 h-5 shrink-0" />
              <span className="text-sm font-medium">{cart.length} service{cart.length > 1 ? "s" : ""} selected</span>
              <a
                href={`https://wa.me/919052878779?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <MessageCircle className="w-4 h-4 mr-1" /> Inquire on WhatsApp
                </Button>
              </a>
            </motion.div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ServiceMarketplacePage;
