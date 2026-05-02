import Layout from "@/components/Layout";
import PageSEO from "@/components/PageSEO";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import EWayEligibilityChecker from "@/components/EWayEligibilityChecker";
import EWayPenaltyEstimator from "@/components/EWayPenaltyEstimator";
import { trackEvent } from "@/lib/analytics";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import { Truck, FileText } from "lucide-react";

const validity = [
  { distance: "Up to 100 km",      days: "1 Day",   note: "Most intra-city / district" },
  { distance: "100 – 300 km",      days: "3 Days",  note: "State-level movement" },
  { distance: "300 – 500 km",      days: "5 Days",  note: "Southern India cross-state" },
  { distance: "500 – 1,000 km",    days: "10 Days", note: "Pan-South India" },
  { distance: "Above 1,000 km",    days: "15 Days", note: "All-India" },
];

const exemptions = [
  "Non-motorised conveyance (hand cart, cycle, animal cart)",
  "Goods carried in customs-sealed containers moving to/from port",
  "Defence/military goods movement under government authority",
  "Empty cargo containers",
  "Goods transported by rail where consignor is Central/State Government",
  "Goods under Annexure II of E-Way Bill Rules (unprocessed tobacco, raw silk, sandalwood, wood in rough, currency, used personal effects, coral)",
  "Household goods moved during house shifting (non-supply)",
  "Goods cleared by Customs at ports in bond (Bill of Entry)",
];

const subThresholds = [
  ["Intra-state (Andhra Pradesh / Telangana)", "₹50,000"],
  ["Inter-state movement (all India)",         "₹50,000 — always"],
  ["Job work / handicrafts",                   "No threshold — always required"],
  ["Registered jewellery",                     "₹50,000"],
  ["Unregistered dealer sales",                "Threshold applies; buyer generates"],
];

const packages = [
  { count: 10,  price: 160,  perBill: 16, tag: null,           features: ["Part A + B filing", "Same-day processing", "PDF / SMS delivery"] },
  { count: 25,  price: 400,  perBill: 16, tag: null,           features: ["Part A + B filing", "Same-day processing", "PDF / SMS delivery", "Cancellation support"] },
  { count: 50,  price: 750,  perBill: 15, tag: "Most Popular", features: ["Part A + B filing", "Priority processing", "PDF / SMS delivery", "Cancellation support", "Vehicle update"] },
  { count: 100, price: 1400, perBill: 14, tag: null,           features: ["Part A + B filing", "Priority processing", "PDF / SMS delivery", "Cancellation support", "Vehicle update", "Bulk Excel upload"] },
];

const steps = [
  { title: "Login",                       desc: "ewaybillgst.gov.in using GSTIN credentials. Sub-user access can be granted to logistics staff under Masters → Sub Users." },
  { title: "Fill Part A — Supply Details",desc: "Supplier GSTIN, Recipient GSTIN (or URP), invoice number & date, supply type, HSN code (4-digit min), taxable value, tax rate." },
  { title: "Fill Part B — Transport",     desc: "Vehicle number (AA00AA0000), transport document number (rail/air/ship), or transporter GSTIN if they will update Part B." },
  { title: "Generate EWB",                desc: "12-digit EWB number is generated. Download as PDF or share via SMS to driver/transporter. Vehicle must carry printed or digital copy." },
  { title: "Update / Extend / Cancel",    desc: "Part B can be updated multiple times during transit. Cancellation: within 24 hours if not verified. Extension: before expiry with valid reason." },
  { title: "Bulk Generation",             desc: "Share invoice data in our standard Excel template. We upload via API and return EWB numbers within the same business day." },
];

const faqs = [
  { q: "Do I need an E-Way Bill for goods moved within a single city?", a: "Only if the consignment value exceeds ₹50,000 and it is a taxable supply. Movement purely within a district for non-supply reasons (job work return, exhibition) may be exempt. Check the specific reason for transport in Part A." },
  { q: "What if my transporter refuses to fill Part B?",                  a: "You can fill Part B yourself if you know the vehicle number at time of dispatch. Alternatively, assign the transporter GSTIN in Part A — they then have the responsibility and authority to fill Part B before movement." },
  { q: "Can I generate a single E-Way Bill for multiple invoices?",       a: "No. Each invoice requires a separate EWB. However, if a single vehicle is carrying multiple consignments, a Consolidated E-Way Bill (CEWB) can be generated to cover all EWBs for that vehicle's trip." },
  { q: "What happens if the vehicle breaks down and the EWB expires?",    a: "Apply for extension on the EWB portal before the expiry time. Provide the reason (breakdown, natural calamity, transshipment). The officer can verify via RFID/app at checkpoints. Keep documentary evidence of the incident." },
  { q: "Is E-Way Bill required for goods sent on approval basis?",        a: "Yes, if value exceeds ₹50,000. Use supply type 'Sales on Approval' or 'Exhibition' as appropriate." },
  { q: "How does Kota Associates generate bulk E-Way Bills?",             a: "You share your invoice data in our standard Excel template. We upload via the NIC bulk API and return all EWB numbers and PDFs to you within the same business day. For 100+ bills, we operate a dedicated sub-user account on your GSTIN." },
];

const partA = [
  "GSTIN of supplier",
  "GSTIN of recipient (or 'URP')",
  "Place of delivery (pin code)",
  "Invoice / Bill of Supply number and date",
  "HSN code of goods",
  "Reason for transport (supply / return / job work / etc.)",
  "Approximate value of goods",
];
const partB = [
  "Vehicle number",
  "Mode of transport (road / rail / air / ship)",
  "Transporter document number (consignment note)",
  "Transporter GSTIN",
];

const EWayBills = () => {
  const { t } = useTranslation();

  const onPackageSelect = (count: number) => {
    trackEvent("eway", "eway_package_select", String(count), count);
  };

  return (
    <Layout>
      <PageSEO
        title="E-Way Bill Generation Service — From ₹16/bill"
        description="Bulk e-way bill generation packages starting ₹16/bill. Same-day processing. Part A + Part B filing. Threshold checker, penalty estimator, validity calculator. Serving logistics across South India."
        canonical="/eway-bills"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "E-Way Bills", url: "/eway-bills" }]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-narrow py-24 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4">{t("eway.label")}</p>
          <h1 className="font-heading text-5xl md:text-6xl mb-4">{t("eway.title")}</h1>
          <div className="gold-divider mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-primary-foreground/80">{t("eway.subtitle")}</p>
        </div>
      </section>

      {/* Threshold Quick-Reference */}
      <section className="section bg-background">
        <div className="container-narrow grid md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded p-8">
            <p className="text-xs uppercase tracking-widest text-accent mb-2">{t("eway.thresholdTitle")}</p>
            <p className="font-heading text-6xl text-accent mb-2">₹50,000</p>
            <p className="text-sm text-muted-foreground mb-5">Consignment value trigger for most goods</p>
            <ul className="space-y-2 text-sm">
              {subThresholds.map(([k, v]) => (
                <li key={k} className="flex justify-between gap-3 py-1.5 border-b border-border last:border-0">
                  <span className="text-foreground/80">{k}</span>
                  <span className="font-medium text-primary text-right">{v}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card border border-border rounded p-8">
            <p className="text-xs uppercase tracking-widest text-accent mb-2">{t("eway.exemptTitle")}</p>
            <h2 className="font-heading text-2xl text-primary mb-4">When EWB is NOT Required</h2>
            <ul className="space-y-2 text-sm">
              {exemptions.map((e) => (
                <li key={e} className="flex gap-2"><span className="text-accent mt-1">●</span><span className="text-foreground/80">{e}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Validity */}
      <section className="section bg-secondary/40">
        <div className="container-narrow">
          <h2 className="font-heading text-3xl text-primary mb-2 text-center">{t("eway.validityTitle")}</h2>
          <div className="gold-divider mx-auto mb-10" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {validity.map((v) => (
              <div key={v.distance} className="bg-card border border-border rounded p-5 text-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{v.distance}</p>
                <p className="font-heading text-2xl text-accent mb-2">{v.days}</p>
                <p className="text-xs text-muted-foreground">{v.note}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center mt-6 max-w-2xl mx-auto">
            Over-Dimensional Cargo (ODC) gets <strong>double</strong> the above validity. Extension can be applied before expiry with valid reason.
          </p>
        </div>
      </section>

      {/* Eligibility Checker */}
      <section className="section bg-background">
        <div className="container-narrow">
          <h2 className="font-heading text-3xl text-primary mb-2 text-center">{t("eway.checkerTitle")}</h2>
          <div className="gold-divider mx-auto mb-10" />
          <div className="bg-card border border-border rounded p-6 md:p-10">
            <EWayEligibilityChecker />
          </div>
        </div>
      </section>

      {/* Penalty Estimator */}
      <section className="section bg-secondary/40">
        <div className="container-narrow">
          <h2 className="font-heading text-3xl text-primary mb-2 text-center">{t("eway.penaltyTitle")}</h2>
          <div className="gold-divider mx-auto mb-10" />
          <div className="bg-card border border-border rounded p-6 md:p-10">
            <EWayPenaltyEstimator />
          </div>
        </div>
      </section>

      {/* Generation Guide */}
      <section className="section bg-background">
        <div className="container-narrow">
          <h2 className="font-heading text-3xl text-primary mb-2 text-center">{t("eway.guideTitle")}</h2>
          <div className="gold-divider mx-auto mb-10" />
          <ol className="space-y-4 max-w-3xl mx-auto">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-5 p-5 bg-card border border-border rounded">
                <div className="font-heading text-3xl text-accent shrink-0 w-12">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <h3 className="font-heading text-lg text-primary mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Part A vs Part B */}
      <section className="section bg-secondary/40">
        <div className="container-narrow">
          <h2 className="font-heading text-3xl text-primary mb-2 text-center">{t("eway.structureTitle")}</h2>
          <div className="gold-divider mx-auto mb-10" />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-accent" />
                <h3 className="font-heading text-xl text-primary">Part A — Consignor fills</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground/85">
                {partA.map((p) => <li key={p}><span className="text-accent mr-2">›</span>{p}</li>)}
              </ul>
            </div>
            <div className="bg-card border border-border rounded p-6">
              <div className="flex items-center gap-3 mb-4">
                <Truck className="w-6 h-6 text-accent" />
                <h3 className="font-heading text-xl text-primary">Part B — Transporter fills</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground/85">
                {partB.map((p) => <li key={p}><span className="text-accent mr-2">›</span>{p}</li>)}
              </ul>
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center mt-6 max-w-2xl mx-auto">
            For rail / air / ship, Part B can be filled within 15 days. For road transport, Part B must be filled before movement begins.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="section bg-background">
        <div className="container-narrow">
          <h2 className="font-heading text-3xl text-primary mb-2 text-center">{t("eway.packagesTitle")}</h2>
          <div className="gold-divider mx-auto mb-4" />
          <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto mb-10">{t("eway.packagesSub")}</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {packages.map((p) => (
              <div key={p.count}
                className={`relative bg-card border rounded p-6 transition hover:-translate-y-1 ${p.tag ? "border-accent border-2 shadow-md" : "border-border hover:border-accent/40"}`}>
                {p.tag && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent text-accent-foreground text-[10px] font-semibold tracking-wider rounded-full">{p.tag.toUpperCase()}</span>
                )}
                <p className="font-heading text-4xl text-accent">{p.count}</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Bills</p>
                <p className="font-heading text-2xl text-primary">₹{p.price}</p>
                <p className="text-xs text-muted-foreground mb-4">₹{p.perBill}/bill</p>
                <ul className="space-y-1.5 text-xs text-foreground/80 mb-5">
                  {p.features.map((f) => <li key={f}>✓ {f}</li>)}
                </ul>
                <a
                  href={`https://wa.me/919052878779?text=${encodeURIComponent(`Hello Kota Associates, I'd like the ${p.count} E-Way Bills package (₹${p.price}).`)}`}
                  target="_blank" rel="noopener noreferrer"
                  onClick={() => onPackageSelect(p.count)}
                  className={`block text-center w-full py-2.5 rounded text-sm font-medium ${p.tag ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`}>
                  Order via WhatsApp
                </a>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-sm text-muted-foreground mb-3">Need 200+ bills/month? Contact us for a custom logistics partnership.</p>
            <Link to="/contact?service=eway-bill-bulk" className="btn-outline">Custom Package Enquiry</Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section bg-secondary/40">
        <div className="container-narrow max-w-3xl">
          <h2 className="font-heading text-3xl text-primary mb-2 text-center">{t("eway.faqTitle")}</h2>
          <div className="gold-divider mx-auto mb-10" />
          <Accordion type="single" collapsible className="bg-card border border-border rounded">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`q${i}`} className="px-5">
                <AccordionTrigger className="text-left font-medium text-primary hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-foreground/80 leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </Layout>
  );
};

export default EWayBills;
