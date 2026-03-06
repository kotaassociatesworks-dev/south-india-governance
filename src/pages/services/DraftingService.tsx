import { useState } from "react";
import ServicePageLayout from "@/components/service/ServicePageLayout";
import StepProgressBar from "@/components/service/StepProgressBar";
import PaymentModal from "@/components/service/PaymentModal";
import FileUploadZone from "@/components/service/FileUploadZone";
import SuccessConfirmation from "@/components/service/SuccessConfirmation";

const draftingTypes = [
  "Partnership Deed",
  "Rental Agreement (Commercial)",
  "Rental Agreement (Residential)",
  "Sale of Goods Agreement",
  "Power of Attorney",
  "Memorandum of Understanding",
  "Other Mercantile Law Document",
];

const DraftingService = () => {
  const [step, setStep] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [txnId, setTxnId] = useState("");
  const [form, setForm] = useState({
    draftingType: "",
    partyOneName: "",
    partyTwoName: "",
    description: "",
    specialClauses: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const fieldClass = "w-full px-4 py-3 bg-background border border-border text-foreground text-sm focus:outline-none focus:border-accent transition-colors";
  const labelClass = "block text-sm font-semibold text-foreground mb-1.5";

  return (
    <ServicePageLayout title="Drafting Services" subtitle="Legal Documentation">
      <StepProgressBar currentStep={step} steps={["Details", "Payment", "Upload", "Confirm"]} />

      {step === 1 && (
        <div className="bg-background border border-border p-8 space-y-5">
          <div>
            <label className={labelClass}>Document Type *</label>
            <select name="draftingType" value={form.draftingType} onChange={handleChange} className={fieldClass}>
              <option value="">Select document type</option>
              {draftingTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Party One Name *</label>
              <input name="partyOneName" value={form.partyOneName} onChange={handleChange} className={fieldClass} placeholder="First party name" />
            </div>
            <div>
              <label className={labelClass}>Party Two Name *</label>
              <input name="partyTwoName" value={form.partyTwoName} onChange={handleChange} className={fieldClass} placeholder="Second party name" />
            </div>
          </div>
          <div>
            <label className={labelClass}>Description / Key Terms *</label>
            <textarea name="description" value={form.description} onChange={handleChange} className={fieldClass} rows={4} placeholder="Describe the key terms and conditions" />
          </div>
          <div>
            <label className={labelClass}>Special Clauses (Optional)</label>
            <textarea name="specialClauses" value={form.specialClauses} onChange={handleChange} className={fieldClass} rows={3} placeholder="Any special clauses to include" />
          </div>
          <button
            onClick={() => setStep(2)}
            disabled={!form.draftingType || !form.partyOneName || !form.partyTwoName || !form.description}
            className="w-full py-3 bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wide hover:bg-primary/90 transition disabled:opacity-40"
          >
            Proceed to Payment — ₹4,999
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="bg-background border border-border p-8 text-center">
          <p className="text-muted-foreground mb-6">Complete payment to proceed with document upload.</p>
          <button onClick={() => setShowPayment(true)} className="px-8 py-3 bg-accent text-accent-foreground font-semibold text-sm uppercase tracking-wide hover:brightness-110 transition">
            Pay ₹4,999
          </button>
          <PaymentModal
            open={showPayment}
            onClose={() => setShowPayment(false)}
            amount={4999}
            serviceName="Drafting Service"
            onSuccess={(id) => { setTxnId(id); setStep(3); setShowPayment(false); }}
          />
        </div>
      )}

      {step === 3 && (
        <div className="bg-background border border-border p-8 space-y-6">
          <p className="text-sm text-muted-foreground">Upload supporting documents for your {form.draftingType}.</p>
          <FileUploadZone label="Supporting Documents (ID Proofs, Previous Agreements, etc.)" accept=".pdf,.jpg,.jpeg,.png,.xlsx" />
          <button onClick={() => setStep(4)} className="w-full py-3 bg-accent text-accent-foreground font-semibold text-sm uppercase tracking-wide hover:brightness-110 transition">
            Submit Documents
          </button>
        </div>
      )}

      {step === 4 && <SuccessConfirmation txnId={txnId} serviceName={`Drafting — ${form.draftingType}`} />}
    </ServicePageLayout>
  );
};

export default DraftingService;
