import { useState } from "react";
import ServicePageLayout from "@/components/service/ServicePageLayout";
import StepProgressBar from "@/components/service/StepProgressBar";
import PaymentModal from "@/components/service/PaymentModal";
import FileUploadZone from "@/components/service/FileUploadZone";
import SuccessConfirmation from "@/components/service/SuccessConfirmation";

const STEPS = ["Details", "Payment", "Upload", "Confirm"];
const PRICE = 40;

const EWayBillService = () => {
  const [step, setStep] = useState(1);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [txnId, setTxnId] = useState("");
  const [billCount, setBillCount] = useState(1);
  const [form, setForm] = useState({
    gstin: "",
    invoiceNumber: "",
    invoiceDate: "",
    consignorName: "",
    consignorAddress: "",
    consigneeName: "",
    consigneeAddress: "",
    hsnCode: "",
    taxableValue: "",
    transportMode: "road",
    vehicleNumber: "",
    distance: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fieldClass =
    "w-full h-11 px-4 border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";
  const labelClass = "block text-sm font-semibold text-foreground mb-1.5";

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    setStep(2);
    setPaymentOpen(true);
  };

  const handlePaymentSuccess = (id) => {
    setTxnId(id);
    setPaymentOpen(false);
    setStep(3);
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    setStep(4);
  };

  if (step === 4) {
    return (
      <ServicePageLayout title="E-Way Bill Generation" subtitle="Service">
        <StepProgressBar steps={STEPS} currentStep={4} />
        <SuccessConfirmation serviceName="E-Way Bill Generation" txnId={txnId} />
      </ServicePageLayout>
    );
  }

  return (
    <ServicePageLayout title="E-Way Bill Generation" subtitle="Service • ₹40 per Bill">
      <StepProgressBar steps={STEPS} currentStep={step} />

      <div className="bg-background border border-border p-8 lg:p-10">
        {step === 1 && (
          <form onSubmit={handleDetailsSubmit} className="space-y-5">
            <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider font-semibold">
              Required fields as per GST Act — E-Way Bill Rules
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Number of E-Way Bills</label>
                <input type="number" min={1} value={billCount} onChange={(e) => setBillCount(Math.max(1, parseInt(e.target.value) || 1))} className={fieldClass} />
                <p className="text-xs text-accent font-semibold mt-1">Total: ₹{(billCount * PRICE).toLocaleString("en-IN")}</p>
              </div>
              <div>
                <label className={labelClass}>GSTIN *</label>
                <input name="gstin" required value={form.gstin} onChange={handleChange} placeholder="22AAAAA0000A1Z5" className={fieldClass} maxLength={15} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Invoice Number *</label>
                <input name="invoiceNumber" required value={form.invoiceNumber} onChange={handleChange} placeholder="INV-2024-001" className={fieldClass} />
              </div>
              <div>
                <label className={labelClass}>Invoice Date *</label>
                <input name="invoiceDate" type="date" required value={form.invoiceDate} onChange={handleChange} className={fieldClass} />
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider font-semibold">Consignor Details</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Consignor Name *</label>
                  <input name="consignorName" required value={form.consignorName} onChange={handleChange} className={fieldClass} />
                </div>
                <div>
                  <label className={labelClass}>Consignor Address *</label>
                  <input name="consignorAddress" required value={form.consignorAddress} onChange={handleChange} className={fieldClass} />
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider font-semibold">Consignee Details</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Consignee Name *</label>
                  <input name="consigneeName" required value={form.consigneeName} onChange={handleChange} className={fieldClass} />
                </div>
                <div>
                  <label className={labelClass}>Consignee Address *</label>
                  <input name="consigneeAddress" required value={form.consigneeAddress} onChange={handleChange} className={fieldClass} />
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider font-semibold">Goods & Transport</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>HSN Code *</label>
                  <input name="hsnCode" required value={form.hsnCode} onChange={handleChange} placeholder="8471" className={fieldClass} />
                </div>
                <div>
                  <label className={labelClass}>Taxable Value (₹) *</label>
                  <input name="taxableValue" type="number" required value={form.taxableValue} onChange={handleChange} placeholder="50000" className={fieldClass} />
                </div>
                <div>
                  <label className={labelClass}>Transport Mode *</label>
                  <select name="transportMode" value={form.transportMode} onChange={handleChange} className={fieldClass}>
                    <option value="road">Road</option>
                    <option value="rail">Rail</option>
                    <option value="air">Air</option>
                    <option value="ship">Ship</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Vehicle Number *</label>
                  <input name="vehicleNumber" required value={form.vehicleNumber} onChange={handleChange} placeholder="AP09AB1234" className={fieldClass} />
                </div>
                <div>
                  <label className={labelClass}>Distance (KM) *</label>
                  <input name="distance" type="number" required value={form.distance} onChange={handleChange} placeholder="150" className={fieldClass} />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3.5 bg-primary text-primary-foreground font-semibold text-sm tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors mt-4"
            >
              Proceed to Payment — ₹{(billCount * PRICE).toLocaleString("en-IN")}
            </button>
          </form>
        )}

        {step === 2 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">Complete payment to proceed.</p>
            <button
              onClick={() => setPaymentOpen(true)}
              className="px-8 py-3.5 bg-primary text-primary-foreground font-semibold text-sm tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors"
            >
              Open Payment
            </button>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleUploadSubmit} className="space-y-6">
            <div className="bg-accent/10 border border-accent/30 p-4 text-sm text-foreground">
              ✓ Payment successful — Transaction ID: <span className="font-mono font-semibold">{txnId}</span>
            </div>
            <FileUploadZone label="Invoice Copy (PDF) *" accept=".pdf" />
            <FileUploadZone label="Transport Document" accept=".pdf,.jpg,.jpeg,.png" />
            <button
              type="submit"
              className="w-full px-6 py-3.5 bg-accent text-accent-foreground font-semibold text-sm tracking-[0.1em] uppercase hover:brightness-110 transition mt-2"
            >
              Submit Request
            </button>
          </form>
        )}
      </div>

      <PaymentModal
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        amount={billCount * PRICE}
        serviceName="E-Way Bill Generation"
        onSuccess={handlePaymentSuccess}
      />
    </ServicePageLayout>
  );
};

export default EWayBillService;
