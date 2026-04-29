import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, Loader2, CheckCircle2 } from "lucide-react";

// ---------- Contact Form ----------
const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit Indian mobile"),
  email: z.string().trim().email("Invalid email").max(255),
  service: z.string().min(1, "Please select a service"),
  message: z.string().trim().min(5, "Message too short").max(1000),
});
type ContactForm = z.infer<typeof contactSchema>;

const services = ["GST Consultation", "GST Registration", "Bookkeeping", "Drafting Services", "E-Way Bill", "Tax Advisory", "Other"];

const ContactForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactForm) => {
    setSubmitting(true);
    // Try backend; fall back to mailto
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (apiUrl) {
        await fetch(`${apiUrl}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        // mailto fallback
        const body = `Name: ${data.name}%0DPhone: ${data.phone}%0DEmail: ${data.email}%0DService: ${data.service}%0D%0D${data.message}`;
        window.location.href = `mailto:kotaassociatesworks@gmail.com?subject=Enquiry from ${encodeURIComponent(data.name)}&body=${body}`;
      }
    } catch { /* ignore */ }
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    setSuccess(true);
    reset();
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="label-clean">Full Name *</label>
          <input className="input-clean" {...register("name")} />
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="label-clean">Phone *</label>
          <input className="input-clean" placeholder="10-digit mobile" {...register("phone")} />
          {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
        </div>
      </div>
      <div>
        <label className="label-clean">Email *</label>
        <input type="email" className="input-clean" {...register("email")} />
        {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label className="label-clean">Service *</label>
        <select className="input-clean" {...register("service")}>
          <option value="">— Select a service —</option>
          {services.map((s) => <option key={s}>{s}</option>)}
        </select>
        {errors.service && <p className="text-xs text-destructive mt-1">{errors.service.message}</p>}
      </div>
      <div>
        <label className="label-clean">Message *</label>
        <textarea rows={4} className="input-clean !h-auto py-3" {...register("message")} />
        {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
      </div>
      <button type="submit" disabled={submitting} className="btn-primary w-full md:w-auto disabled:opacity-60">
        {submitting ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting…</>) : "Send Enquiry"}
      </button>
      {success && (
        <div className="flex items-start gap-3 p-4 rounded bg-accent/10 border border-accent/40">
          <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
          <p className="text-sm text-foreground">Thank you! We'll contact you within 24 hours.</p>
        </div>
      )}
    </form>
  );
};

// ---------- Appointment Booking ----------
const consultations = [
  { id: "gst", label: "GST Consultation", price: 500 },
  { id: "income", label: "Income Tax", price: 500 },
  { id: "advisory", label: "Business Advisory", price: 1000 },
  { id: "notice", label: "Tax Notice", price: 750 },
];
const slots = ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"];

const tomorrow = () => {
  const d = new Date(); d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
};

const AppointmentBooking = () => {
  const [step, setStep] = useState(1);
  const [consult, setConsult] = useState(consultations[0]);
  const [date, setDate] = useState(tomorrow());
  const [slot, setSlot] = useState(slots[0]);
  const [details, setDetails] = useState({ name: "", phone: "", email: "", message: "" });
  const [confirmed, setConfirmed] = useState(false);

  const detailsValid = details.name.trim().length >= 2 && /^[6-9]\d{9}$/.test(details.phone) && /^\S+@\S+\.\S+$/.test(details.email);

  const submit = () => {
    if (!detailsValid) return;
    // Optional backend
    const apiUrl = import.meta.env.VITE_API_URL;
    if (apiUrl) {
      fetch(`${apiUrl}/api/appointment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...details, service: consult.label, price: consult.price, date, time: slot }),
      }).catch(() => {});
    }
    setConfirmed(true);
  };

  const waMessage = `Hello Kota Associates,%0D%0DI'd like to confirm my booking:%0DName: ${details.name}%0DService: ${consult.label} (₹${consult.price})%0DDate: ${date}%0DTime: ${slot}`;
  const waUrl = `https://wa.me/919052878779?text=${waMessage}`;

  if (confirmed) {
    return (
      <div className="bg-card border border-border rounded p-8">
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle2 className="w-7 h-7 text-accent" />
          <h3 className="font-heading text-2xl text-primary">Booking Confirmed</h3>
        </div>
        <div className="bg-secondary/50 rounded p-5 mb-6 space-y-2 text-sm">
          <p><span className="text-muted-foreground">Name:</span> <strong>{details.name}</strong></p>
          <p><span className="text-muted-foreground">Service:</span> <strong>{consult.label}</strong> (₹{consult.price})</p>
          <p><span className="text-muted-foreground">Date:</span> <strong>{date}</strong></p>
          <p><span className="text-muted-foreground">Time:</span> <strong>{slot}</strong></p>
          <p><span className="text-muted-foreground">Phone:</span> <strong>{details.phone}</strong></p>
          <p><span className="text-muted-foreground">Email:</span> <strong>{details.email}</strong></p>
        </div>
        <p className="text-sm text-muted-foreground mb-5">Please confirm your appointment via WhatsApp so our team can prepare in advance.</p>
        <div className="flex flex-wrap gap-3">
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-gold">Confirm on WhatsApp</a>
          <button onClick={() => { setConfirmed(false); setStep(1); setDetails({ name: "", phone: "", email: "", message: "" }); }} className="btn-outline">New Booking</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Stepper */}
      <div className="flex items-center justify-between mb-8 text-xs uppercase tracking-widest">
        {["Service", "Date & Time", "Details"].map((label, i) => (
          <div key={label} className="flex-1 flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-heading mr-2 ${step >= i + 1 ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"}`}>{i + 1}</div>
            <span className={step >= i + 1 ? "text-primary" : "text-muted-foreground"}>{label}</span>
            {i < 2 && <div className="flex-1 h-px bg-border mx-3" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {consultations.map((c) => (
              <button key={c.id} onClick={() => setConsult(c)}
                className={`p-5 text-left rounded border transition ${consult.id === c.id ? "border-accent bg-card" : "border-border bg-card hover:border-accent/50"}`}>
                <div className="font-heading text-lg text-primary">{c.label}</div>
                <div className="text-accent text-sm font-medium mt-1">₹{c.price}</div>
              </button>
            ))}
          </div>
          <button onClick={() => setStep(2)} className="btn-primary">Continue</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="mb-5">
            <label className="label-clean">Date</label>
            <input type="date" min={tomorrow()} value={date} onChange={(e) => setDate(e.target.value)} className="input-clean" />
          </div>
          <div className="mb-6">
            <label className="label-clean">Time Slot</label>
            <div className="flex flex-wrap gap-2">
              {slots.map((s) => (
                <button key={s} onClick={() => setSlot(s)}
                  className={`px-4 py-2 rounded text-sm border ${slot === s ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-accent"}`}>{s}</button>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="btn-outline">Back</button>
            <button onClick={() => setStep(3)} className="btn-primary">Continue</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div className="grid md:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="label-clean">Name *</label>
              <input className="input-clean" value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value })} />
            </div>
            <div>
              <label className="label-clean">Phone *</label>
              <input className="input-clean" placeholder="10-digit" value={details.phone} onChange={(e) => setDetails({ ...details, phone: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="label-clean">Email *</label>
              <input type="email" className="input-clean" value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="label-clean">Message</label>
              <textarea rows={3} className="input-clean !h-auto py-3" value={details.message} onChange={(e) => setDetails({ ...details, message: e.target.value })} />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="btn-outline">Back</button>
            <button onClick={submit} disabled={!detailsValid} className="btn-gold disabled:opacity-50">Confirm Booking</button>
          </div>
        </div>
      )}
    </div>
  );
};

const Contact = () => {
  useEffect(() => {
    if (window.location.hash === "#booking") {
      setTimeout(() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, []);
  return (
    <Layout>
      <section className="bg-primary text-primary-foreground">
        <div className="container-narrow py-24 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-accent mb-4">Get in Touch</p>
          <h1 className="font-heading text-5xl md:text-6xl mb-4">Contact</h1>
          <div className="gold-divider mx-auto" />
        </div>
      </section>

      {/* Contact Form */}
      <section className="section bg-background">
        <div className="container-narrow grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-heading text-3xl text-primary mb-3">Send us an Enquiry</h2>
            <div className="gold-divider mb-6" />
            <p className="text-muted-foreground mb-8">Share your requirements and our team will respond within 24 hours.</p>
            <ContactForm />
          </div>
          <div>
            <h2 className="font-heading text-3xl text-primary mb-3">Reach Us</h2>
            <div className="gold-divider mb-6" />
            <ul className="space-y-5 mb-8">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-primary">Office Address</p>
                  <p className="text-sm text-muted-foreground">5/134 Patel Street, Near Alaganadhaswamy Temple,<br />East Gudur Rural, AP 524101</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-primary">Phone</p>
                  <a href="tel:+919052878779" className="text-sm text-muted-foreground hover:text-accent">+91 90528 78779</a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-primary">Email</p>
                  <a href="mailto:kotaassociatesworks@gmail.com" className="text-sm text-muted-foreground hover:text-accent">kotaassociatesworks@gmail.com</a>
                </div>
              </li>
            </ul>
            <div className="aspect-video bg-secondary border border-border rounded flex items-center justify-center text-muted-foreground text-sm">
              <iframe
                title="Office location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=79.840%2C14.140%2C79.870%2C14.160&layer=mapnik"
                className="w-full h-full rounded"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Booking */}
      <section id="booking" className="section bg-secondary/40 scroll-mt-24">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4">Schedule</p>
            <h2 className="font-heading text-4xl text-primary">Book a Consultation</h2>
            <div className="gold-divider mx-auto mt-6" />
          </div>
          <div className="max-w-3xl mx-auto bg-card border border-border rounded p-6 md:p-10">
            <AppointmentBooking />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
