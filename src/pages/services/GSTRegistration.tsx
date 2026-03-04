import { useState } from "react";
import ServicePageLayout from "@/components/service/ServicePageLayout";
import StepProgressBar from "@/components/service/StepProgressBar";
import PaymentModal from "@/components/service/PaymentModal";
import FileUploadZone from "@/components/service/FileUploadZone";
import SuccessConfirmation from "@/components/service/SuccessConfirmation";

const STEPS = ["Details", "Payment", "Upload", "Confirm"];
const PRICE = 5000;

const GSTRegistration = () => {
  const [step, setStep] = useState(1);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [txnId, setTxnId] = useState("");
  const [form, setForm] = useState({
    pan: "", aadhaar: "", constitution: "proprietorship", businessName: "",
    businessAddress: "", state: "", bankName: "", accountNumber: "", ifsc: "",
    signatoryName: "", signatoryDesignation: "", natureOfBusiness: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const fieldClass = "w-full h-11 px-4 border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";
  const labelClass = "block text-sm font-semibold text-foreground mb-1.5";

  if (step === 4) {
    return (
      <ServicePageLayout title="GST Registration" subtitle="Service">
        <StepProgressBar steps={STEPS} currentStep={4} />
        <SuccessConfirmation serviceName="GST Registration" txnId={txnId} />
      </ServicePageLayout>
    );
  }

  return (
    <ServicePageLayout title="GST Registration" subtitle="Service • ₹5,000">
      <StepProgressBar steps={STEPS} currentStep={step} />
      <div className="bg-background border border-border p-8 lg:p-10">
        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); setStep(2); setPaymentOpen(true); }} className="space-y-5">
            <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider font-semibold">Required fields as per GST Act — Section 25</p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className={labelClass}>PAN *</label><input name="pan" required value={form.pan} onChange={handleChange} placeholder="ABCDE1234F" maxLength={10} className={fieldClass} /></div>
              <div><label className={labelClass}>Aadhaar *</label><input name="aadhaar" required value={form.aadhaar} onChange={handleChange} placeholder="1234 5678 9012" maxLength={14} className={fieldClass} /></div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Business Constitution *</label>
                <select name="constitution" value={form.constitution} onChange={handleChange} className={fieldClass}>
                  <option value="proprietorship">Proprietorship</option>
                  <option value="partnership">Partnership</option>
                  <option value="pvtLtd">Pvt. Ltd.</option>
                  <option value="llp">LLP</option>
                  <option value="huf">HUF</option>
                  <option value="trust">Trust / Society</option>
                </select>
              </div>
              <div><label className={labelClass}>Business Name *</label><input name="businessName" required value={form.businessName} onChange={handleChange} className={fieldClass} /></div>
            </div>

            <div><label className={labelClass}>Business Address *</label><input name="businessAddress" required value={form.businessAddress} onChange={handleChange} className={fieldClass} /></div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>State of Registration *</label>
                <select name="state" value={form.state} onChange={handleChange} required className={fieldClass}>
                  <option value="">Select State</option>
                  <option value="AP">Andhra Pradesh</option>
                  <option value="TS">Telangana</option>
                  <option value="TN">Tamil Nadu</option>
                  <option value="KA">Karnataka</option>
                  <option value="KL">Kerala</option>
                  <option value="OD">Odisha</option>
                  <option value="MH">Maharashtra</option>
                </select>
              </div>
              <div><label className={labelClass}>Nature of Business *</label><input name="natureOfBusiness" required value={form.natureOfBusiness} onChange={handleChange} placeholder="Trading / Manufacturing / Services" className={fieldClass} /></div>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider font-semibold">Bank Details</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div><label className={labelClass}>Bank Name *</label><input name="bankName" required value={form.bankName} onChange={handleChange} className={fieldClass} /></div>
                <div><label className={labelClass}>Account No. *</label><input name="accountNumber" required value={form.accountNumber} onChange={handleChange} className={fieldClass} /></div>
                <div><label className={labelClass}>IFSC *</label><input name="ifsc" required value={form.ifsc} onChange={handleChange} placeholder="SBIN0001234" maxLength={11} className={fieldClass} /></div>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider font-semibold">Authorized Signatory</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className={labelClass}>Name *</label><input name="signatoryName" required value={form.signatoryName} onChange={handleChange} className={fieldClass} /></div>
                <div><label className={labelClass}>Designation *</label><input name="signatoryDesignation" required value={form.signatoryDesignation} onChange={handleChange} className={fieldClass} /></div>
              </div>
            </div>

            <button type="submit" className="w-full px-6 py-3.5 bg-primary text-primary-foreground font-semibold text-sm tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors mt-4">
              Proceed to Payment — ₹5,000
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
            <FileUploadZone label="PAN Copy (PDF) *" accept=".pdf,.jpg,.jpeg,.png" />
            <FileUploadZone label="Aadhaar Copy *" accept=".pdf,.jpg,.jpeg,.png" />
            <FileUploadZone label="Address Proof *" accept=".pdf,.jpg,.jpeg,.png" />
            <FileUploadZone label="Bank Proof *" accept=".pdf,.jpg,.jpeg,.png" />
            <FileUploadZone label="Photograph *" accept=".jpg,.jpeg,.png" />
            <button type="submit" className="w-full px-6 py-3.5 bg-accent text-accent-foreground font-semibold text-sm tracking-[0.1em] uppercase hover:brightness-110 transition mt-2">Submit Request</button>
          </form>
        )}
      </div>
      <PaymentModal open={paymentOpen} onClose={() => setPaymentOpen(false)} amount={PRICE} serviceName="GST Registration" onSuccess={(id) => { setTxnId(id); setPaymentOpen(false); setStep(3); }} />
    </ServicePageLayout>
  );
};

export default GSTRegistration;
