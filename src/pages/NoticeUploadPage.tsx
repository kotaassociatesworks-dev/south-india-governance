import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, XCircle, CheckCircle2, Shield, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NoticeUploadPage = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [reviewType, setReviewType] = useState("");

  const handleFile = (e) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const removeFile = () => setFile(null);

  const handleSubmit = (type) => {
    setReviewType(type);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-secondary">
        <Navbar />
        <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="container mx-auto px-4 max-w-2xl">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-background border border-border rounded-xl p-10 text-center">
              <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-4" />
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Notice Submitted</h2>
              <p className="text-muted-foreground mb-2">
                You selected: <span className="font-semibold text-foreground">{reviewType === "basic" ? "Basic Explanation" : "Professional Notice Review"}</span>
              </p>
              <p className="text-muted-foreground mb-6">Our team will review your notice and contact you within 24 hours.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="https://wa.me/919052878779" target="_blank" rel="noopener noreferrer">
                  <Button>WhatsApp Us</Button>
                </a>
                <Button variant="outline" onClick={() => { setSubmitted(false); setFile(null); setForm({ name: "", phone: "", email: "" }); }}>
                  Upload Another Notice
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const valid = form.name.trim() && form.phone.trim() && form.email.trim() && file;

  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-accent/20 bg-accent/5">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-accent text-xs font-semibold tracking-widest uppercase">Notice Help</span>
            </div>
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-3">Upload Your Tax Notice</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">Upload your GST or Income Tax notice and get expert guidance from our team.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-background border border-border rounded-xl p-8 space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Phone Number</label>
                <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Upload Notice (PDF, JPG, PNG)</label>
              {!file ? (
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-border hover:border-accent/50 rounded-lg p-8 cursor-pointer transition-colors">
                  <Upload className="w-10 h-10 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Click to upload or drag & drop</span>
                  <span className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG — Max 10 MB</span>
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFile} className="hidden" />
                </label>
              ) : (
                <div className="flex items-center justify-between bg-secondary border border-border rounded-lg px-4 py-3">
                  <span className="flex items-center gap-2 text-sm text-foreground truncate">
                    <FileText className="w-4 h-4 text-accent shrink-0" />
                    {file.name}
                  </span>
                  <button onClick={removeFile} className="text-muted-foreground hover:text-destructive transition-colors">
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Review Options */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <button
                disabled={!valid}
                onClick={() => handleSubmit("basic")}
                className="border-2 border-border hover:border-accent/40 rounded-lg p-5 text-left transition-all disabled:opacity-40 disabled:pointer-events-none group"
              >
                <h3 className="font-heading font-bold text-foreground mb-1 group-hover:text-accent transition-colors">Basic Explanation</h3>
                <p className="text-sm text-muted-foreground">Get a simplified summary of your notice and what it means.</p>
                <span className="text-accent font-semibold text-sm mt-2 block">Free</span>
              </button>
              <button
                disabled={!valid}
                onClick={() => handleSubmit("professional")}
                className="border-2 border-accent/30 bg-accent/5 hover:border-accent rounded-lg p-5 text-left transition-all disabled:opacity-40 disabled:pointer-events-none group"
              >
                <h3 className="font-heading font-bold text-foreground mb-1 group-hover:text-accent transition-colors">Professional Review</h3>
                <p className="text-sm text-muted-foreground">Detailed analysis with reply drafting and compliance advisory.</p>
                <span className="text-accent font-semibold text-sm mt-2 block">Starting ₹999</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default NoticeUploadPage;
