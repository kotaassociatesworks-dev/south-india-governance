import { useState } from "react";
import ServicePageLayout from "@/components/service/ServicePageLayout";
import StepProgressBar from "@/components/service/StepProgressBar";
import PaymentModal from "@/components/service/PaymentModal";
import FileUploadZone from "@/components/service/FileUploadZone";
import SuccessConfirmation from "@/components/service/SuccessConfirmation";

const STEPS = ["Details", "Payment", "Upload", "Confirm"];
const PRICE = 2999;

const GSTReturnFiling = () => {
  const [step, setStep] = useState(1);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [txnId, setTxnId] = useState("");
  const [form, setForm] = useState({
    gstin: "", month: "", year: new Date().getFullYear().toString(),
    outwardSupply: "", inwardSupply: "", itcDetails: "", pendingLiability: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const fieldClass = "w-full h-11 px-4 border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";
  const labelClass = "block text-sm font-semibold text-foreground mb-1.5";

  if (step === 4) {
    return (
      <ServicePageLayout title="GST Return Filing" subtitle="Service">
        <StepProgressBar steps={STEPS} currentStep={4} />
        <SuccessConfirmation serviceName="GST Return Filing (Monthly)" txnId={txnId} />
      </ServicePageLayout>
    );
  }

  return (
    <ServicePageLayout title="GST Return Filing" subtitle="Service • ₹2,999/month">
      <StepProgressBar steps={STEPS} currentStep={step} />
      <div className="bg-background border border-border p-8 lg:p-10">
        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); setStep(2); setPaymentOpen(true); }} className="space-y-5">
            <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider font-semibold">Required fields as per GST Act — GSTR-1, 3B Filing</p>

            <div className="grid sm:grid-cols-3 gap-4">
              <div><label className={labelClass}>GSTIN *</label><input name="gstin" required value={form.gstin} onChange={handleChange} placeholder="22AAAAA0000A1Z5" maxLength={15} className={fieldClass} /></div>
              <div>
                <label className={labelClass}>Month *</label>
                <select name="month" value={form.month} onChange={handleChange} required className={fieldClass}>
                  <option value="">Select</option>
                  {["January","February","March","April","May","June","July","August","September","October","November","December"].map((m,i) => (
                    <option key={m} value={String(i+1).padStart(2,'0')}>{m}</option>
                  ))}
                </select>
              </div>
              <div><label className={labelClass}>Year *</label><input name="year" type="number" required value={form.year} onChange={handleChange} className={fieldClass} /></div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className={labelClass}>Outward Supply Summary *</label><textarea name="outwardSupply" required value={form.outwardSupply} onChange={handleChange} rows={3} placeholder="Total sales, taxable value, tax collected…" className={fieldClass + " h-auto py-2"} /></div>
              <div><label className={labelClass}>Inward Supply Summary *</label><textarea name="inwardSupply" required value={form.inwardSupply} onChange={handleChange} rows={3} placeholder="Total purchases, taxable value, tax paid…" className={fieldClass + " h-auto py-2"} /></div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className={labelClass}>ITC Details *</label><textarea name="itcDetails" required value={form.itcDetails} onChange={handleChange} rows={2} placeholder="ITC available, ITC reversed, net ITC…" className={fieldClass + " h-auto py-2"} /></div>
              <div><label className={labelClass}>Previous Pending Liability</label><input name="pendingLiability" value={form.pendingLiability} onChange={handleChange} placeholder="₹0" className={fieldClass} /></div>
            </div>

            <button type="submit" className="w-full px-6 py-3.5 bg-primary text-primary-foreground font-semibold text-sm tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors mt-4">
              Proceed to Payment — ₹2,999
            </button>
          </form>
        )}

        {step === 2 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">Complete payment to proceed.</p>
            <button onClick={() => setPaymentOpen(true)} className="px-8 py-3.5 bg-primary text-primary-foreground font-semibold text-sm tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors">Open Payment</button>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={(e) => { e.preventDefault(); setStep(4); }} className="space-y-6">
            <div className="bg-accent/10 border border-accent/30 p-4 text-sm text-foreground">
              ✓ Payment successful — Transaction ID: <span className="font-mono font-semibold">{txnId}</span>
            </div>
            <FileUploadZone label="Sales Register *" accept=".pdf,.xlsx,.xls,.csv" />
            <FileUploadZone label="Purchase Register *" accept=".pdf,.xlsx,.xls,.csv" />
            <FileUploadZone label="GSTR-2A / 2B *" accept=".pdf,.xlsx,.xls,.csv,.json" />
            <FileUploadZone label="Bank Statement (optional)" accept=".pdf,.xlsx,.xls,.csv" />
            <button type="submit" className="w-full px-6 py-3.5 bg-accent text-accent-foreground font-semibold text-sm tracking-[0.1em] uppercase hover:brightness-110 transition mt-2">Submit Request</button>
          </form>
        )}
      </div>
      <PaymentModal open={paymentOpen} onClose={() => setPaymentOpen(false)} amount={PRICE} serviceName="GST Return Filing (Monthly)" onSuccess={(id) => { setTxnId(id); setPaymentOpen(false); setStep(3); }} />
    </ServicePageLayout>
  );
};

export default GSTReturnFiling;
