import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Truck, Upload, Mail, FileText, XCircle, PenLine } from "lucide-react";

const serviceTypes = [
  { value: "generation", label: "E-Way Bill Generation", icon: FileText },
  { value: "cancellation", label: "E-Way Bill Cancellation", icon: XCircle },
  { value: "amendment", label: "E-Way Bill Amendment", icon: PenLine },
];

const EWayBillSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({
    serviceType: "generation",
    userId: "",
    password: "",
    email: "",
    notes: "",
  });
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const serviceLabel =
      serviceTypes.find((s) => s.value === form.serviceType)?.label ?? form.serviceType;
    const fileNames = files.map((f) => f.name).join(", ") || "No files attached";

    const body = `Hello KOTA Associates,%0A%0AI would like to request: ${encodeURIComponent(serviceLabel)}%0A%0AE-Way Bill Portal User ID: ${encodeURIComponent(form.userId)}%0AEmail for delivery: ${encodeURIComponent(form.email)}%0AInvoices: ${encodeURIComponent(fileNames)}%0AAdditional Notes: ${encodeURIComponent(form.notes || "None")}%0A%0APlease process at the earliest. Thank you.`;

    const mailtoLink = `mailto:info@kotaassociates.in?subject=${encodeURIComponent(`E-Way Bill Request – ${serviceLabel}`)}&body=${body}`;
    window.location.href = mailtoLink;
  };

  const handleWhatsApp = () => {
    const serviceLabel =
      serviceTypes.find((s) => s.value === form.serviceType)?.label ?? form.serviceType;
    const fileNames = files.map((f) => f.name).join(", ") || "No files attached";

    const text = `Hello KOTA Associates,\n\nI would like to request: ${serviceLabel}\n\nE-Way Bill Portal User ID: ${form.userId}\nEmail for delivery: ${form.email}\nInvoices: ${fileNames}\nAdditional Notes: ${form.notes || "None"}\n\nPlease process at the earliest. Thank you.`;

    const waLink = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(waLink, "_blank");
  };

  return (
    <section id="eway-bill" className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3">
            E-Way Bill Services
          </p>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
            E-Way Bill Generation, Amendment & Cancellation
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Submit your portal credentials and invoices — we'll generate, amend, or cancel
            your E-Way Bills and deliver them straight to your inbox.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <form
            onSubmit={handleSubmit}
            className="bg-background border border-border p-8 lg:p-10 space-y-6"
          >
            {/* Service Type */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Service Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {serviceTypes.map((st) => {
                  const Icon = st.icon;
                  const selected = form.serviceType === st.value;
                  return (
                    <button
                      key={st.value}
                      type="button"
                      onClick={() => setForm({ ...form, serviceType: st.value })}
                      className={`flex items-center gap-2 px-4 py-3 border text-sm font-medium transition-colors ${
                        selected
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border text-muted-foreground hover:border-accent/40"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {st.label.replace("E-Way Bill ", "")}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* User ID */}
            <div>
              <label htmlFor="userId" className="block text-sm font-semibold text-foreground mb-2">
                E-Way Bill Portal User ID
              </label>
              <input
                id="userId"
                name="userId"
                type="text"
                required
                value={form.userId}
                onChange={handleChange}
                placeholder="Your portal login ID"
                className="w-full h-11 px-4 border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-foreground mb-2">
                Portal Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="Your portal password"
                className="w-full h-11 px-4 border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <p className="text-xs text-muted-foreground mt-1.5">
                Your credentials are shared only via your email client — we do not store them.
              </p>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                Email Address (for E-Way Bill delivery)
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className="w-full h-11 px-4 border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Invoice Upload */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Upload Invoices
              </label>
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-border hover:border-accent/50 transition-colors p-6 cursor-pointer group">
                <Upload className="w-8 h-8 text-muted-foreground group-hover:text-accent transition-colors mb-2" />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  Click to select invoices (PDF, Excel, Images)
                </span>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.xlsx,.xls,.csv,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {files.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {files.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between text-sm text-foreground bg-secondary px-3 py-2"
                    >
                      <span className="truncate">{f.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="text-muted-foreground hover:text-destructive transition-colors ml-2"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-semibold text-foreground mb-2">
                Additional Notes (optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={form.notes}
                onChange={handleChange}
                placeholder="Any specific instructions…"
                className="w-full px-4 py-3 border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>

            {/* Submit buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-semibold text-sm tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Send via Email
              </button>
              <button
                type="button"
                onClick={handleWhatsApp}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-accent-foreground font-semibold text-sm tracking-[0.1em] uppercase hover:brightness-110 transition"
              >
                <Truck className="w-4 h-4" />
                Send via WhatsApp
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default EWayBillSection;
