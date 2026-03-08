import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, Zap, Crown, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter Compliance",
    icon: Zap,
    price: "₹2,999",
    period: "/month",
    desc: "Essential compliance for small businesses and sole proprietors.",
    features: [
      "Monthly GST return filing (GSTR-1 & 3B)",
      "Basic tax advisory (email support)",
      "ITC reconciliation alerts",
      "Filing deadline reminders",
      "Digital document storage",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Business Compliance",
    icon: Star,
    price: "₹6,999",
    period: "/month",
    desc: "Complete compliance suite for growing businesses.",
    features: [
      "Everything in Starter plan",
      "Professional bookkeeping",
      "Tax advisory (phone + email)",
      "TDS/TCS return filing",
      "Quarterly compliance review",
      "Dedicated relationship manager",
      "Notice handling support",
    ],
    cta: "Choose Business",
    popular: true,
  },
  {
    name: "Premium Advisory",
    icon: Crown,
    price: "₹14,999",
    period: "/month",
    desc: "Full-service compliance and strategic tax planning.",
    features: [
      "Everything in Business plan",
      "Full compliance management",
      "Strategic tax planning",
      "Income tax return filing",
      "Financial statement preparation",
      "Audit support & representation",
      "Priority notice resolution",
      "Unlimited consultations",
    ],
    cta: "Go Premium",
    popular: false,
  },
];

const SubscriptionPlansPage = () => {
  const [billing, setBilling] = useState("monthly");

  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-accent/20 bg-accent/5">
              <Crown className="w-4 h-4 text-accent" />
              <span className="text-accent text-xs font-semibold tracking-widest uppercase">Compliance Plans</span>
            </div>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-3">Choose Your Compliance Plan</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Recurring compliance subscriptions that keep your business tax-healthy year-round.</p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <span className={`text-sm font-medium ${billing === "monthly" ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
              <button
                onClick={() => setBilling(billing === "monthly" ? "annual" : "monthly")}
                className={`relative w-14 h-7 rounded-full transition-colors ${billing === "annual" ? "bg-accent" : "bg-border"}`}
              >
                <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-background shadow transition-transform ${billing === "annual" ? "translate-x-7" : "translate-x-0.5"}`} />
              </button>
              <span className={`text-sm font-medium ${billing === "annual" ? "text-foreground" : "text-muted-foreground"}`}>
                Annual <span className="text-accent text-xs font-bold ml-1">Save 20%</span>
              </span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {plans.map((plan, i) => {
              const Icon = plan.icon;
              const monthlyPrice = parseInt(plan.price.replace(/[₹,]/g, ""));
              const displayPrice = billing === "annual"
                ? `₹${Math.round(monthlyPrice * 0.8).toLocaleString("en-IN")}`
                : plan.price;

              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative bg-background border-2 rounded-xl p-8 flex flex-col ${
                    plan.popular ? "border-accent shadow-xl scale-[1.02]" : "border-border"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-bold px-4 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{plan.desc}</p>
                  </div>
                  <div className="mb-6">
                    <span className="font-heading text-4xl font-bold text-foreground">{displayPrice}</span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                    {billing === "annual" && (
                      <p className="text-xs text-accent mt-1">Billed annually</p>
                    )}
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                        <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`https://wa.me/919052878779?text=I'm%20interested%20in%20the%20${encodeURIComponent(plan.name)}%20plan%20(${billing}).`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className={`w-full ${plan.popular ? "" : "variant-outline"}`} variant={plan.popular ? "default" : "outline"}>
                      <MessageCircle className="w-4 h-4 mr-1" /> {plan.cta}
                    </Button>
                  </a>
                </motion.div>
              );
            })}
          </div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center text-sm text-muted-foreground mt-10">
            All plans include GST. Custom enterprise plans available on request. <a href="/#contact" className="text-accent underline">Contact us</a>
          </motion.p>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default SubscriptionPlansPage;
