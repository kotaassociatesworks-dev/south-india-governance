import { useState } from "react";
import ServicePageLayout from "@/components/service/ServicePageLayout";
import StepProgressBar from "@/components/service/StepProgressBar";
import PaymentModal from "@/components/service/PaymentModal";
import FileUploadZone from "@/components/service/FileUploadZone";
import SuccessConfirmation from "@/components/service/SuccessConfirmation";

const BalanceSheetService = () => {
  const [step, setStep] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [txnId, setTxnId] = useState("");
  const [form, setForm] = useState({
    businessName: "",
    financialYear: "",
    gstin: "",
    panNumber: "",
    transactionVolume: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const fieldClass = "w-full px-4 py-3 bg-background border border-border text-foreground text-sm focus:outline-none focus:border-accent transition-colors";
  const labelClass = "block text-sm font-semibold text-foreground mb-1.5";

  return (
    <ServicePageLayout title="Trial Balance to Balance Sheet" subtitle="Financial Statements">
      <StepProgressBar current={step} steps={["Details", "Payment", "Upload", "Confirm"]} />

      {step === 1 && (
        <div className="bg-background border border-border p-8 space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Business Name *</label>
              <input name="businessName" value={form.businessName} onChange={handleChange} className={fieldClass} placeholder="Your business name" />
            </div>
            <div>
              <label className={labelClass}>Financial Year *</label>
              <input name="financialYear" value={form.financialYear} onChange={handleChange} className={fieldClass} placeholder="e.g. 2024-25" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>GSTIN</label>
              <input name="gstin" value={form.gstin} onChange={handleChange} className={fieldClass} placeholder="15-digit GSTIN" />
            </div>
            <div>
              <label className={labelClass}>PAN Number *</label>
              <input name="panNumber" value={form.panNumber} onChange={handleChange} className={fieldClass} placeholder="10-digit PAN" />
            </div>
          </div>
          <div>
            <label className={labelClass}>Approximate Transaction Volume *</label>
            <select name="transactionVolume" value={form.transactionVolume} onChange={handleChange} className={fieldClass}>
              <option value="">Select volume</option>
              <option value="below-100">Below 100 transactions</option>
              <option value="100-500">100 - 500 transactions</option>
              <option value="500-1000">500 - 1000 transactions</option>
              <option value="above-1000">Above 1000 transactions</option>
            </select>
          </div>
          <button
            onClick={() => setStep(2)}
            disabled={!form.businessName || !form.financialYear || !form.panNumber || !form.transactionVolume}
            className="w-full py-3 bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wide hover:bg-primary/90 transition disabled:opacity-40"
          >
            Proceed to Payment — Starting ₹1,599
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="bg-background border border-border p-8 text-center">
          <p className="text-muted-foreground mb-6">Complete payment to proceed with document upload.</p>
          <button onClick={() => setShowPayment(true)} className="px-8 py-3 bg-accent text-accent-foreground font-semibold text-sm uppercase tracking-wide hover:brightness-110 transition">
            Pay ₹1,599
          </button>
          <PaymentModal
            open={showPayment}
            onClose={() => setShowPayment(false)}
            amount={1599}
            service="Trial Balance to Balance Sheet"
            onSuccess={(id) => { setTxnId(id); setStep(3); setShowPayment(false); }}
          />
        </div>
      )}

      {step === 3 && (
        <div className="bg-background border border-border p-8 space-y-6">
          <p className="text-sm text-muted-foreground">Upload your trial balance and supporting ledgers.</p>
          <FileUploadZone label="Trial Balance (PDF/Excel)" accept=".pdf,.xlsx,.xls,.csv" />
          <FileUploadZone label="Ledger Accounts (PDF/Excel)" accept=".pdf,.xlsx,.xls,.csv" />
          <FileUploadZone label="Bank Statements (Optional)" accept=".pdf,.xlsx" />
          <button onClick={() => setStep(4)} className="w-full py-3 bg-accent text-accent-foreground font-semibold text-sm uppercase tracking-wide hover:brightness-110 transition">
            Submit Documents
          </button>
        </div>
      )}

      {step === 4 && <SuccessConfirmation txnId={txnId} service="Trial Balance to Balance Sheet" />}
    </ServicePageLayout>
  );
};

export default BalanceSheetService;
