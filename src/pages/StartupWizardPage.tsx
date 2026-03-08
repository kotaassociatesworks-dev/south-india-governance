import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Users, Landmark, ArrowRight, ArrowLeft, CheckCircle2, FileText, CreditCard, ShieldCheck, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import StepProgressBar from "@/components/service/StepProgressBar";

const businessTypes = [
  { id: "proprietorship", label: "Sole Proprietorship", icon: Building2, desc: "Single owner, simplest structure. Ideal for freelancers & small traders." },
  { id: "partnership", label: "Partnership Firm", icon: Users, desc: "Two or more partners sharing profits. Governed by Indian Partnership Act, 1932." },
  { id: "company", label: "Private Limited Company", icon: Landmark, desc: "Separate legal entity with limited liability. Best for scalable businesses." },
];

const registrations = {
  proprietorship: [
    { name: "PAN Card (Individual)", required: true },
    { name: "Aadhaar Card", required: true },
    { name: "GST Registration", required: true },
    { name: "Current Bank Account", required: true },
    { name: "Shop & Establishment License", required: false },
    { name: "MSME/Udyam Registration", required: false },
  ],
  partnership: [
    { name: "PAN Card (Firm)", required: true },
    { name: "Partnership Deed", required: true },
    { name: "GST Registration", required: true },
    { name: "Current Bank Account", required: true },
    { name: "Firm Registration (optional)", required: false },
    { name: "MSME/Udyam Registration", required: false },
  ],
  company: [
    { name: "DSC (Digital Signature Certificate)", required: true },
    { name: "DIN (Director Identification Number)", required: true },
    { name: "Company Name Approval", required: true },
    { name: "MOA & AOA Drafting", required: true },
    { name: "PAN & TAN (Company)", required: true },
    { name: "GST Registration", required: true },
    { name: "Current Bank Account", required: true },
    { name: "MSME/Udyam Registration", required: false },
  ],
};

const services = {
  proprietorship: [
    "GST Registration — ₹999",
    "Monthly GST Filing — ₹599/month",
    "Bookkeeping — ₹1,499/month",
  ],
  partnership: [
    "Partnership Deed Drafting — ₹4,999",
    "GST Registration — ₹999",
    "Monthly GST Filing — ₹599/month",
    "Bookkeeping — ₹2,499/month",
    "TDS Compliance — Contact us",
  ],
  company: [
    "Company Incorporation — Contact us",
    "GST Registration — ₹999",
    "Monthly GST Filing — ₹999/month",
    "Full Bookkeeping — ₹4,999/month",
    "TDS/TCS Compliance — Contact us",
    "Annual Return Filing — Contact us",
  ],
};

const StartupWizardPage = () => {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState("");

  const stepLabels = ["Business Type", "Registrations", "Recommended Services"];

  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-accent/20 bg-accent/5">
              <Building2 className="w-4 h-4 text-accent" />
              <span className="text-accent text-xs font-semibold tracking-widest uppercase">Startup Wizard</span>
            </div>
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-3">Business Startup Guide</h1>
            <p className="text-muted-foreground">Choose your business type and get a complete registration roadmap.</p>
          </motion.div>

          <StepProgressBar steps={stepLabels} currentStep={step} />

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-4">
                {businessTypes.map((bt) => {
                  const Icon = bt.icon;
                  const selected = selectedType === bt.id;
                  return (
                    <button
                      key={bt.id}
                      onClick={() => setSelectedType(bt.id)}
                      className={`w-full flex items-start gap-4 p-6 rounded-xl border-2 text-left transition-all ${
                        selected ? "border-accent bg-accent/5" : "border-border bg-background hover:border-accent/30"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${selected ? "bg-accent/20" : "bg-muted"}`}>
                        <Icon className={`w-6 h-6 ${selected ? "text-accent" : "text-muted-foreground"}`} />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-foreground text-lg">{bt.label}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{bt.desc}</p>
                      </div>
                    </button>
                  );
                })}
                <div className="flex justify-end pt-4">
                  <Button onClick={() => setStep(2)} disabled={!selectedType}>
                    Next <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && selectedType && (
              <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="bg-background border border-border rounded-xl p-8">
                <h2 className="font-heading text-xl font-bold text-foreground mb-6">Required Registrations</h2>
                <ul className="space-y-3">
                  {registrations[selectedType].map((reg) => (
                    <li key={reg.name} className="flex items-center gap-3">
                      {reg.required ? (
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-border shrink-0" />
                      )}
                      <span className="text-foreground">{reg.name}</span>
                      {reg.required && <span className="text-xs text-accent font-semibold ml-auto">Required</span>}
                      {!reg.required && <span className="text-xs text-muted-foreground ml-auto">Optional</span>}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between pt-6">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back
                  </Button>
                  <Button onClick={() => setStep(3)}>
                    View Services <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && selectedType && (
              <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6">
                <div className="bg-background border border-border rounded-xl p-8">
                  <h2 className="font-heading text-xl font-bold text-foreground mb-6">Recommended Services</h2>
                  <ul className="space-y-3">
                    {services[selectedType].map((s) => (
                      <li key={s} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                        <FileText className="w-5 h-5 text-accent shrink-0" />
                        <span className="text-foreground text-sm font-medium">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <a
                    href={`https://wa.me/919052878779?text=I%20want%20to%20start%20a%20${encodeURIComponent(selectedType)}%20business.%20Please%20guide%20me.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-accent text-accent-foreground font-semibold py-4 rounded-lg hover:bg-accent/90 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" /> Get Started on WhatsApp
                  </a>
                  <Button variant="outline" className="py-4 h-auto" onClick={() => { setStep(1); setSelectedType(""); }}>
                    Start Over
                  </Button>
                </div>

                <div className="flex justify-start">
                  <Button variant="ghost" onClick={() => setStep(2)}>
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Registrations
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default StartupWizardPage;
