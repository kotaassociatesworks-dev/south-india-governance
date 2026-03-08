import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Clock, Phone, Mail, MessageCircle, CheckCircle, CreditCard, User, IndianRupee } from "lucide-react";

const whatsappUrl = "https://wa.me/919052878779?text=" + encodeURIComponent("Hello, I would like to inquire about taxation and compliance services.");

const timeSlots = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
  "05:00 PM", "05:30 PM",
];

const consultationTypes = [
  { id: "gst", label: "GST Consultation", fee: "₹500", description: "GST registration, returns, notices, and compliance" },
  { id: "income-tax", label: "Income Tax Consultation", fee: "₹500", description: "ITR filing, tax planning, and notice response" },
  { id: "business", label: "Business Advisory", fee: "₹1,000", description: "Company registration, compliance, and structuring" },
  { id: "notice", label: "Tax Notice Review", fee: "₹750", description: "Detailed analysis and response strategy for notices" },
];

const AppointmentBooking = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    consultationType: "",
    date: "",
    time: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const selectedType = consultationTypes.find((t) => t.id === form.consultationType);

  const getMinDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const canProceedStep1 = form.consultationType !== "";
  const canProceedStep2 = form.date !== "" && form.time !== "";

  return (
    <section className="py-20 lg:py-28 bg-background relative overflow-hidden" ref={ref}>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 50%, hsl(var(--accent) / 0.03) 0%, transparent 50%)",
            "radial-gradient(ellipse at 80% 50%, hsl(var(--primary) / 0.03) 0%, transparent 50%)",
            "radial-gradient(ellipse at 20% 50%, hsl(var(--accent) / 0.03) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 lg:px-8 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <motion.p
            className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-3"
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={inView ? { opacity: 1, letterSpacing: "0.25em" } : {}}
            transition={{ delay: 0.2 }}
          >
            Schedule a Consultation
          </motion.p>
          <motion.h2
            className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Book Your Appointment
          </motion.h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Schedule a professional consultation with our tax experts. Choose your service, pick a convenient time, and we'll confirm your appointment.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-green-50 border border-green-200 p-10 text-center max-w-lg mx-auto"
          >
            <CheckCircle className="w-14 h-14 text-green-600 mx-auto mb-4" />
            <h3 className="font-heading text-2xl font-bold text-foreground mb-3">Appointment Requested!</h3>
            <p className="text-muted-foreground mb-2">
              Your consultation for <strong>{selectedType?.label}</strong> has been submitted.
            </p>
            <p className="text-sm text-muted-foreground mb-1">
              📅 {new Date(form.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>
            <p className="text-sm text-muted-foreground mb-4">🕐 {form.time}</p>
            <div className="bg-accent/10 border border-accent/20 p-4 mb-5">
              <p className="text-sm font-semibold text-foreground flex items-center justify-center gap-2">
                <IndianRupee className="w-4 h-4 text-accent" />
                Consultation Fee: <span className="text-accent">{selectedType?.fee}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">Payable at the time of consultation</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Our team will confirm your appointment via phone/email within 2 hours.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card border border-border"
          >
            {/* Step Progress */}
            <div className="flex items-center border-b border-border">
              {["Service", "Date & Time", "Details"].map((label, i) => (
                <button
                  key={label}
                  onClick={() => {
                    if (i + 1 < step) setStep(i + 1);
                  }}
                  className={`flex-1 py-4 text-center text-sm font-semibold tracking-wider uppercase transition-all border-b-2 ${
                    step === i + 1
                      ? "border-accent text-accent bg-accent/5"
                      : step > i + 1
                      ? "border-primary/30 text-primary"
                      : "border-transparent text-muted-foreground"
                  }`}
                >
                  <span className={`inline-flex items-center justify-center w-6 h-6 text-xs mr-2 ${
                    step > i + 1 ? "bg-primary text-primary-foreground" : step === i + 1 ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {step > i + 1 ? "✓" : i + 1}
                  </span>
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Select Service */}
              {step === 1 && (
                <div className="p-6 lg:p-8 space-y-4">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Select Consultation Type</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {consultationTypes.map((type) => (
                      <motion.button
                        key={type.id}
                        type="button"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setForm({ ...form, consultationType: type.id })}
                        className={`p-5 border text-left transition-all ${
                          form.consultationType === type.id
                            ? "border-accent bg-accent/5 shadow-md"
                            : "border-border hover:border-accent/30"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-heading font-semibold text-foreground">{type.label}</h4>
                          <span className="text-accent font-bold text-lg">{type.fee}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{type.description}</p>
                      </motion.button>
                    ))}
                  </div>
                  <div className="flex justify-end pt-4">
                    <motion.button
                      type="button"
                      disabled={!canProceedStep1}
                      onClick={() => setStep(2)}
                      whileHover={canProceedStep1 ? { scale: 1.03 } : {}}
                      whileTap={canProceedStep1 ? { scale: 0.97 } : {}}
                      className="px-8 py-3 bg-primary text-primary-foreground text-sm font-semibold tracking-wider uppercase disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      Next →
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Step 2: Date & Time */}
              {step === 2 && (
                <div className="p-6 lg:p-8 space-y-6">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Choose Date & Time</h3>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      <Calendar className="w-4 h-4 inline mr-1.5 text-accent" /> Select Date
                    </label>
                    <input
                      type="date"
                      required
                      min={getMinDate()}
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full sm:w-auto px-4 py-3 border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      <Clock className="w-4 h-4 inline mr-1.5 text-accent" /> Select Time Slot
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {timeSlots.map((slot) => (
                        <motion.button
                          key={slot}
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setForm({ ...form, time: slot })}
                          className={`py-2.5 text-xs font-semibold border transition-all ${
                            form.time === slot
                              ? "border-accent bg-accent/10 text-accent"
                              : "border-border text-muted-foreground hover:border-accent/30"
                          }`}
                        >
                          {slot}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between pt-4">
                    <button type="button" onClick={() => setStep(1)} className="text-sm text-muted-foreground hover:text-foreground transition">
                      ← Back
                    </button>
                    <motion.button
                      type="button"
                      disabled={!canProceedStep2}
                      onClick={() => setStep(3)}
                      whileHover={canProceedStep2 ? { scale: 1.03 } : {}}
                      whileTap={canProceedStep2 ? { scale: 0.97 } : {}}
                      className="px-8 py-3 bg-primary text-primary-foreground text-sm font-semibold tracking-wider uppercase disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      Next →
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Details */}
              {step === 3 && (
                <div className="p-6 lg:p-8 space-y-5">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Your Details</h3>

                  {/* Summary */}
                  <div className="bg-accent/5 border border-accent/15 p-4 flex flex-wrap items-center gap-4 text-sm">
                    <span className="font-semibold text-foreground">{selectedType?.label}</span>
                    <span className="text-muted-foreground">
                      📅 {form.date && new Date(form.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    <span className="text-muted-foreground">🕐 {form.time}</span>
                    <span className="ml-auto font-bold text-accent flex items-center gap-1">
                      <IndianRupee className="w-3.5 h-3.5" /> {selectedType?.fee}
                    </span>
                  </div>

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
                    <label className="block text-sm font-semibold text-foreground mb-1.5">Brief Description (Optional)</label>
                    <textarea
                      maxLength={500}
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent outline-none transition resize-none"
                      placeholder="Briefly describe your query or concern..."
                    />
                  </div>

                  <div className="bg-muted/50 border border-border p-4 text-xs text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-accent shrink-0" />
                      <strong>Consultation Fee:</strong> {selectedType?.fee} — payable at the time of consultation. Fee is non-refundable and will be adjusted against service charges if you proceed with our services.
                    </p>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button type="button" onClick={() => setStep(2)} className="text-sm text-muted-foreground hover:text-foreground transition">
                      ← Back
                    </button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-8 py-3 bg-accent text-accent-foreground font-semibold text-sm tracking-wider uppercase shadow-lg hover:shadow-xl transition-all"
                    >
                      Confirm Booking
                    </motion.button>
                  </div>
                </div>
              )}
            </form>
          </motion.div>
        )}

        {/* Alternative contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-10"
        >
          <p className="text-sm text-muted-foreground mb-4">Prefer to speak directly?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.a
              href="tel:+919052878779"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground text-sm font-semibold hover:border-accent/40 transition"
            >
              <Phone className="w-4 h-4 text-accent" /> Call: 9052878779
            </motion.a>
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[hsl(142,70%,40%)] text-white text-sm font-semibold transition"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AppointmentBooking;
