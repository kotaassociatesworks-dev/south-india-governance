import { useState } from "react";
import ServicePageLayout from "@/components/service/ServicePageLayout";
import { Mail, Phone } from "lucide-react";

const Bookkeeping = () => {
  const [form, setForm] = useState({
    name: "", business: "", email: "", phone: "", transactionVolume: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const fieldClass = "w-full h-11 px-4 border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";
  const labelClass = "block text-sm font-semibold text-foreground mb-1.5";

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = `Name: ${form.name}%0ABusiness: ${form.business}%0APhone: ${form.phone}%0ATransaction Volume: ${form.transactionVolume}%0AMessage: ${form.message || "None"}`;
    window.location.href = `mailto:info@kotaassociates.in?subject=${encodeURIComponent("Bookkeeping Consultation Request")}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <ServicePageLayout title="Bookkeeping Services" subtitle="Custom Pricing">
      <div className="bg-background border border-border p-8 lg:p-10">
        <div className="bg-accent/10 border border-accent/30 p-5 mb-8">
          <p className="text-sm font-semibold text-foreground mb-1">Custom Pricing</p>
          <p className="text-sm text-muted-foreground">
            Pricing depends on transaction volume and business size. Submit the form below for a tailored quote.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-accent/15 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-heading text-xl font-bold text-foreground mb-2">Request Sent</h3>
            <p className="text-sm text-muted-foreground">We'll get back to you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className={labelClass}>Your Name *</label><input name="name" required value={form.name} onChange={handleChange} className={fieldClass} /></div>
              <div><label className={labelClass}>Business Name *</label><input name="business" required value={form.business} onChange={handleChange} className={fieldClass} /></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className={labelClass}>Email *</label><input name="email" type="email" required value={form.email} onChange={handleChange} className={fieldClass} /></div>
              <div><label className={labelClass}>Phone *</label><input name="phone" type="tel" required value={form.phone} onChange={handleChange} className={fieldClass} /></div>
            </div>
            <div>
              <label className={labelClass}>Estimated Monthly Transaction Volume *</label>
              <select name="transactionVolume" required value={form.transactionVolume} onChange={handleChange} className={fieldClass}>
                <option value="">Select range</option>
                <option value="0-100">Up to 100 transactions</option>
                <option value="100-500">100 – 500 transactions</option>
                <option value="500-1000">500 – 1,000 transactions</option>
                <option value="1000+">1,000+ transactions</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Additional Information</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Tell us about your bookkeeping needs…" className={fieldClass + " h-auto py-2"} />
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-semibold text-sm tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors">
              <Phone className="w-4 h-4" />
              Request Consultation
            </button>
          </form>
        )}
      </div>
    </ServicePageLayout>
  );
};

export default Bookkeeping;
