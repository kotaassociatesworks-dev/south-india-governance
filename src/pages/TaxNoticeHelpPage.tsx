import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FileWarning, AlertTriangle, CreditCard, FileCheck, Upload,
  Phone, Mail, MessageCircle, Shield, ChevronDown, Clock,
  FileText, CheckCircle, XCircle, ArrowRight, Building2,
  BadgeIndianRupee, Scale, Landmark
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppointmentBooking from "@/components/AppointmentBooking";

const whatsappUrl = "https://wa.me/919849847973?text=" + encodeURIComponent("Hi, I need help with a GST/Tax notice.");

/* ─── GST NOTICE DATA ─── */
const gstNotices = [
  {
    id: "asmt-10",
    code: "ASMT-10",
    title: "Scrutiny Notice",
    icon: FileWarning,
    color: "hsl(var(--accent))",
    summary: "Issued when the tax officer finds discrepancies in your GST return and wants to examine the details more closely.",
    whatItMeans: "ASMT-10 is a scrutiny notice under Section 61 of the CGST Act, 2017. It is issued when the proper officer notices discrepancies or inconsistencies in a filed return. The officer may request clarification, supporting documents, or explanation for the differences observed.",
    whyIssued: [
      "Mismatch between GSTR-1 (outward supplies) and GSTR-3B (summary return)",
      "Discrepancies between GSTR-2A/2B and GSTR-3B Input Tax Credit (ITC) claims",
      "Unusually high ITC claims compared to output tax liability",
      "Non-filing or delayed filing of returns for consecutive periods",
      "Information received from other tax authorities or third parties",
    ],
    responseSteps: [
      "Read the notice carefully and identify the specific discrepancies mentioned",
      "Gather all supporting documents including invoices, credit notes, and bank statements",
      "Prepare a detailed written explanation addressing each point raised",
      "File your reply on the GST portal within the stipulated time (usually 30 days)",
      "Keep copies of all documents submitted and the acknowledgment receipt",
    ],
    complianceNotes: [
      "Respond within the time limit mentioned in the notice — typically 30 days",
      "If no response is filed, the officer may proceed to issue a show cause notice (DRC-01)",
      "Ensure your GSTR-1 and GSTR-3B data is reconciled before responding",
      "Maintain records of all correspondence with the department",
    ],
    timeline: "30 days from receipt",
    severity: "Medium",
  },
  {
    id: "drc-01",
    code: "DRC-01",
    title: "Show Cause Notice",
    icon: AlertTriangle,
    color: "hsl(0, 72%, 51%)",
    summary: "A formal notice asking you to explain why tax demand, interest, or penalty should not be imposed against you.",
    whatItMeans: "DRC-01 is a Show Cause Notice (SCN) issued under Sections 73 or 74 of the CGST Act. Section 73 covers cases without fraud (normal demand within 3 years), while Section 74 covers cases involving fraud, suppression, or willful misstatement (extended period of 5 years). This is a serious notice requiring immediate professional attention.",
    whyIssued: [
      "Tax not paid or short-paid for any period",
      "Excess Input Tax Credit claimed or utilized",
      "Wrong availment of ITC on ineligible items",
      "Tax collected but not deposited to the government",
      "Fraud, suppression of facts, or willful misstatement detected",
    ],
    responseSteps: [
      "Immediately note the date of receipt — strict time limits apply",
      "Identify whether the notice is under Section 73 (non-fraud) or Section 74 (fraud)",
      "Engage a qualified tax professional to analyze the notice thoroughly",
      "Prepare a detailed reply with supporting documents and legal arguments",
      "File the reply on the GST portal within 30 days (or as specified)",
      "If applicable, consider paying the admitted tax with interest under Section 73(5) or 74(5)",
    ],
    complianceNotes: [
      "Under Section 73: Pay tax + interest before SCN to avoid penalty entirely",
      "Under Section 74: Pay tax + interest + 15% penalty before SCN to close the matter",
      "Non-response may result in ex-parte order (DRC-07) with full penalty",
      "Personal hearing can be requested and should be attended",
    ],
    timeline: "30 days from receipt (extendable)",
    severity: "High",
  },
  {
    id: "drc-03",
    code: "DRC-03",
    title: "Voluntary Payment",
    icon: CreditCard,
    color: "hsl(142, 70%, 40%)",
    summary: "A form used by taxpayers to voluntarily pay tax dues before or after issuance of a show cause notice.",
    whatItMeans: "DRC-03 is an intimation of voluntary payment made by the taxpayer. It can be filed before the issuance of SCN (to avoid penalty) or after SCN but before the order. This is a proactive step that demonstrates good faith and can significantly reduce penalties and interest.",
    whyIssued: [
      "Self-assessment reveals short payment of tax",
      "Errors discovered in previous GST returns",
      "Voluntary disclosure during audit or investigation",
      "Payment to settle demands raised in notices",
      "Response to pre-notice communication from the department",
    ],
    responseSteps: [
      "Calculate the exact amount of tax shortfall including applicable interest",
      "Log in to the GST portal and navigate to DRC-03 form",
      "Select whether payment is 'Before SCN' or 'After SCN'",
      "Enter details of the tax period, tax amount, interest, and penalty (if any)",
      "Make the payment using electronic cash or credit ledger",
      "Save the acknowledgment and reference number",
    ],
    complianceNotes: [
      "Voluntary payment before SCN can completely avoid penalty proceedings",
      "Interest is calculated at 18% per annum on the outstanding tax amount",
      "Payment after SCN but before order: reduced penalty of 15% (Section 74) or no penalty (Section 73)",
      "DRC-03 acknowledgment should be preserved for future reference",
    ],
    timeline: "Voluntary — no strict deadline",
    severity: "Low",
  },
  {
    id: "drc-07",
    code: "DRC-07",
    title: "Demand Order",
    icon: FileCheck,
    color: "hsl(var(--primary))",
    summary: "A final order demanding payment of tax, interest, and penalty after adjudication proceedings.",
    whatItMeans: "DRC-07 is a Summary of the Demand Order issued after adjudication of a show cause notice (DRC-01). It specifies the final tax demand, interest, and penalty payable by the taxpayer. This is an enforceable order and the taxpayer must either comply or file an appeal within the prescribed time.",
    whyIssued: [
      "No response filed to the show cause notice (DRC-01)",
      "Reply filed but deemed unsatisfactory by the adjudicating authority",
      "Confirmation of tax demand after personal hearing",
      "Ex-parte proceedings when taxpayer fails to appear",
      "Partial acceptance of taxpayer's reply with remaining demand confirmed",
    ],
    responseSteps: [
      "Review the order carefully — check all calculations and legal citations",
      "Note the date of receipt — appeal must be filed within 3 months",
      "If you agree with the order: Pay the demanded amount within 3 months",
      "If you disagree: File an appeal before the First Appellate Authority within 3 months",
      "For appeal: Pay 10% of disputed tax as pre-deposit (mandatory)",
      "Consult a tax professional for appeal strategy and documentation",
    ],
    complianceNotes: [
      "Appeal deadline: 3 months from date of communication (extendable by 1 month)",
      "Pre-deposit of 10% disputed tax required to file appeal",
      "Non-compliance may lead to recovery proceedings including bank account attachment",
      "Second appeal lies with the Appellate Tribunal (GSTAT) within 3 months of first appeal order",
    ],
    timeline: "3 months for appeal",
    severity: "Critical",
  },
];

const severityColors = {
  Low: "bg-green-100 text-green-800 border-green-200",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  High: "bg-orange-100 text-orange-800 border-orange-200",
  Critical: "bg-red-100 text-red-800 border-red-200",
};

/* ─── UPLOAD FORM ─── */
const UploadNoticeSection = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className="py-20 bg-card"
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <div className="text-center mb-10">
          <motion.div
            className="w-16 h-16 bg-accent/10 flex items-center justify-center mx-auto mb-4"
            animate={{ boxShadow: ["0 0 0px hsl(var(--accent) / 0)", "0 0 20px hsl(var(--accent) / 0.15)", "0 0 0px hsl(var(--accent) / 0)"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Upload className="w-8 h-8 text-accent" />
          </motion.div>
          <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Upload Your GST Notice</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Our team will review your notice and contact you with a detailed analysis and recommended course of action.
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-green-50 border border-green-200 p-8 text-center"
          >
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-heading text-xl font-bold text-foreground mb-2">Notice Submitted Successfully</h3>
            <p className="text-muted-foreground">Our team will review your notice and contact you within 24 hours.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-background border border-border p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Full Name *</label>
                <input
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent outline-none transition"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Phone Number *</label>
                <input
                  required
                  type="tel"
                  maxLength={15}
                  pattern="[0-9+\- ]{7,15}"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent outline-none transition"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Email Address *</label>
              <input
                required
                type="email"
                maxLength={255}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent outline-none transition"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Upload Notice (PDF, JPG, PNG) *</label>
              <div className="border-2 border-dashed border-border hover:border-accent/40 transition-colors p-6 text-center cursor-pointer relative">
                <input
                  required
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {file ? (
                  <div className="flex items-center justify-center gap-2 text-accent">
                    <FileText className="w-5 h-5" />
                    <span className="text-sm font-medium">{file.name}</span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Click or drag to upload your notice</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">Max file size: 10MB</p>
                  </>
                )}
              </div>
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 bg-primary text-primary-foreground font-semibold text-sm tracking-[0.15em] uppercase transition-all hover:shadow-lg"
            >
              Submit Notice for Review
            </motion.button>
            <p className="text-xs text-center text-muted-foreground">
              Your documents are handled with strict confidentiality.
            </p>
          </form>
        )}
      </div>
    </motion.section>
  );
};

/* ─── PROFESSIONAL CTA ─── */
const ProfessionalCTA = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="border border-accent/20 bg-gradient-to-br from-primary/5 via-background to-accent/5 p-8 my-8 relative overflow-hidden"
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent"
      animate={{ x: ["-100%", "200%"] }}
      transition={{ duration: 5, repeat: Infinity, repeatDelay: 5 }}
    />
    <div className="relative z-10 text-center">
      <Shield className="w-10 h-10 text-accent mx-auto mb-3" />
      <p className="text-sm text-foreground font-medium max-w-xl mx-auto mb-5">
        "Handling GST notices requires proper procedural response. Professional assistance ensures compliance and avoids unnecessary penalties."
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
        <motion.a
          href="/#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold tracking-wider uppercase"
        >
          <Phone className="w-4 h-4" /> Contact Kota Associates
        </motion.a>
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[hsl(142,70%,40%)] text-white text-sm font-semibold tracking-wider uppercase"
        >
          <MessageCircle className="w-4 h-4" /> WhatsApp Consultation
        </motion.a>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-muted-foreground">
        <span>📞 9849847973</span>
        <span>✉️ kotaassociatesworks@gmail.com</span>
      </div>
    </div>
  </motion.div>
);

/* ─── NOTICE CARD ─── */
const NoticeCard = ({ notice, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = notice.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-background border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-lg"
    >
      {/* Header */}
      <div className="p-6 lg:p-8 border-b border-border">
        <div className="flex items-start gap-4 mb-4">
          <motion.div
            className="w-14 h-14 flex items-center justify-center shrink-0"
            style={{ backgroundColor: notice.color + "15" }}
            whileHover={{ scale: 1.1 }}
          >
            <Icon className="w-7 h-7" style={{ color: notice.color }} />
          </motion.div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1 flex-wrap">
              <h3 className="font-heading text-xl lg:text-2xl font-bold text-foreground">{notice.code}</h3>
              <span className={`px-2.5 py-0.5 text-xs font-semibold border ${severityColors[notice.severity]}`}>
                {notice.severity}
              </span>
            </div>
            <p className="text-sm font-semibold text-accent tracking-wide uppercase">{notice.title}</p>
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed">{notice.summary}</p>
        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span>Response Timeline: <strong className="text-foreground">{notice.timeline}</strong></span>
        </div>
      </div>

      {/* Expandable Details */}
      <Accordion type="single" collapsible className="border-none">
        <AccordionItem value="details" className="border-none">
          <AccordionTrigger className="px-6 lg:px-8 py-4 text-sm font-semibold text-primary hover:text-accent transition-colors [&[data-state=open]>svg]:rotate-180">
            View Full Details & Response Guide
          </AccordionTrigger>
          <AccordionContent className="px-6 lg:px-8 pb-6 space-y-6">
            {/* What it means */}
            <div>
              <h4 className="font-heading text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-accent" /> What This Notice Means
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{notice.whatItMeans}</p>
            </div>

            {/* Why issued */}
            <div>
              <h4 className="font-heading text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-accent" /> Why This Notice May Be Issued
              </h4>
              <ul className="space-y-2">
                {notice.whyIssued.map((reason, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <ArrowRight className="w-3.5 h-3.5 text-accent shrink-0 mt-1" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>

            {/* Response steps */}
            <div>
              <h4 className="font-heading text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" /> Response Steps
              </h4>
              <ol className="space-y-2">
                {notice.responseSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="w-6 h-6 bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-bold">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Compliance notes */}
            <div className="bg-accent/5 border border-accent/15 p-5">
              <h4 className="font-heading text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent" /> Important Compliance Notes
              </h4>
              <ul className="space-y-2">
                {notice.complianceNotes.map((note, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0 mt-2" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA after each notice */}
            <ProfessionalCTA />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
};

/* ─── INCOME TAX COMING SOON ─── */
const IncomeTaxComingSoon = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className="max-w-2xl mx-auto text-center py-16"
    >
      <div className="bg-background border border-border p-12">
        <motion.div
          className="w-20 h-20 bg-primary/10 flex items-center justify-center mx-auto mb-6"
          animate={{ boxShadow: ["0 0 0px hsl(var(--primary) / 0)", "0 0 25px hsl(var(--primary) / 0.1)", "0 0 0px hsl(var(--primary) / 0)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Landmark className="w-10 h-10 text-primary" />
        </motion.div>
        <motion.span
          className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-xs font-bold tracking-[0.2em] uppercase border border-accent/20 mb-5"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Coming Soon
        </motion.span>
        <h3 className="font-heading text-2xl font-bold text-foreground mb-3">Income Tax Notice Guidance</h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-6">
          Comprehensive guidance on Income Tax notices under Sections 143, 148, 156, and more will be available soon. This section is currently under development.
        </p>
        <p className="text-sm text-muted-foreground">
          In the meantime, contact us directly for assistance with any Income Tax notice.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <motion.a
            href="/#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold tracking-wider uppercase"
          >
            <Phone className="w-4 h-4" /> Contact Us Now
          </motion.a>
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[hsl(142,70%,40%)] text-white text-sm font-semibold tracking-wider uppercase"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── MAIN PAGE ─── */
const TaxNoticeHelpPage = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-20 bg-gradient-to-b from-primary/5 via-background to-background overflow-hidden">
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              "radial-gradient(ellipse at 30% 20%, hsl(var(--accent) / 0.04) 0%, transparent 60%)",
              "radial-gradient(ellipse at 70% 80%, hsl(var(--primary) / 0.04) 0%, transparent 60%)",
              "radial-gradient(ellipse at 30% 20%, hsl(var(--accent) / 0.04) 0%, transparent 60%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={heroRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.p
              className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-4"
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={heroInView ? { opacity: 1, letterSpacing: "0.25em" } : {}}
              transition={{ delay: 0.2 }}
            >
              Tax Notice Help Center
            </motion.p>
            <motion.h1
              className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-5"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={heroInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Understanding <span className="text-accent">Tax Notices</span>
            </motion.h1>
            <motion.p
              className="text-lg text-muted-foreground max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              Learn about common GST and Income Tax notices, what they mean, and how to respond effectively.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Tabs for GST / Income Tax */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <Tabs defaultValue="gst" className="max-w-5xl mx-auto">
            <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-12 bg-card border border-border h-auto p-1">
              <TabsTrigger
                value="gst"
                className="py-3 text-sm font-semibold tracking-wider uppercase data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
              >
                <Scale className="w-4 h-4 mr-2" /> GST Notices
              </TabsTrigger>
              <TabsTrigger
                value="income-tax"
                className="py-3 text-sm font-semibold tracking-wider uppercase data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
              >
                <Landmark className="w-4 h-4 mr-2" /> Income Tax
              </TabsTrigger>
            </TabsList>

            <TabsContent value="gst" className="space-y-8">
              {gstNotices.map((notice, i) => (
                <NoticeCard key={notice.id} notice={notice} index={i} />
              ))}
            </TabsContent>

            <TabsContent value="income-tax">
              <IncomeTaxComingSoon />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Upload Notice */}
      <UploadNoticeSection />

      {/* Appointment Booking */}
      <AppointmentBooking />

      <Footer />
    </div>
  );
};

export default TaxNoticeHelpPage;
