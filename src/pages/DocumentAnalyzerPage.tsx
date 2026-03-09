import { useState } from "react";
import { motion } from "framer-motion";
import { FileSearch, Upload, AlertTriangle, CheckCircle, Info, ArrowRight, FileText, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const analysisResults = [
  { type: "warning", title: "Potential Missing GSTR-3B Filing", desc: "Based on your documents, GSTR-3B for October 2025 may not have been filed. Late filing attracts ₹50/day penalty." },
  { type: "issue", title: "ITC Mismatch Detected", desc: "Input Tax Credit claimed (₹2,45,000) does not match supplier-reported values in GSTR-2B. Difference: ₹18,500." },
  { type: "info", title: "E-Way Bill Compliance", desc: "All uploaded E-Way Bills are within validity period. No issues detected." },
  { type: "warning", title: "TDS Certificate Gap", desc: "Form 16A for Q2 (July-September 2025) not found in uploaded documents. Ensure it is collected from the deductor." },
  { type: "success", title: "GST Registration Active", desc: "Your GST registration certificate is valid and active. No compliance action required." },
];

const typeConfig = {
  warning: { icon: AlertTriangle, color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-900/20", border: "border-yellow-200 dark:border-yellow-800" },
  issue: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/5", border: "border-destructive/20" },
  info: { icon: Info, color: "text-accent", bg: "bg-accent/5", border: "border-accent/20" },
  success: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20", border: "border-green-200 dark:border-green-800" },
};

const DocumentAnalyzerPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleFiles = (newFiles: FileList) => {
    setFiles(prev => [...prev, ...Array.from(newFiles)]);
    setShowResults(false);
  };

  const removeFile = (idx: number) => setFiles(prev => prev.filter((_, i) => i !== idx));

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => { setAnalyzing(false); setShowResults(true); }, 2500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-gold/30 bg-gold/5">
              <FileSearch className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-semibold tracking-widest uppercase">AI-Powered</span>
            </div>
            <h1 className="font-heading text-4xl lg:text-5xl font-bold mb-4">Document Analyzer</h1>
            <p className="text-primary-foreground/60 max-w-xl mx-auto text-lg">
              Upload your tax documents and get instant analysis for missing filings, compliance issues, and data inconsistencies.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Upload area */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-background border-2 border-dashed border-border rounded-xl p-10 text-center mb-8 hover:border-accent/40 transition-colors"
          onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files); }}
        >
          <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
          <p className="text-foreground font-medium mb-2">Drag & drop your documents here</p>
          <p className="text-sm text-muted-foreground mb-4">GST returns, notices, financial statements, agreements</p>
          <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground font-semibold text-sm rounded-lg cursor-pointer hover:bg-accent/90 transition-colors">
            <FileText className="w-4 h-4" /> Browse Files
            <input type="file" multiple className="hidden" onChange={e => e.target.files && handleFiles(e.target.files)} />
          </label>
        </motion.div>

        {/* File list */}
        {files.length > 0 && (
          <div className="space-y-2 mb-6">
            {files.map((f, i) => (
              <div key={i} className="flex items-center justify-between bg-secondary border border-border rounded-lg px-4 py-3">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-accent" />
                  <span className="text-sm text-foreground">{f.name}</span>
                  <span className="text-xs text-muted-foreground">({(f.size / 1024).toFixed(0)} KB)</span>
                </div>
                <button onClick={() => removeFile(i)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="w-full mt-4 px-6 py-3 bg-accent text-accent-foreground font-semibold text-sm rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50"
            >
              {analyzing ? "Analyzing Documents..." : "Analyze Documents"}
            </button>
          </div>
        )}

        {/* Analyzing animation */}
        {analyzing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-foreground font-medium">Scanning documents for compliance issues...</p>
            <p className="text-sm text-muted-foreground mt-1">This may take a moment</p>
          </motion.div>
        )}

        {/* Results */}
        {showResults && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-bold text-foreground">Analysis Results</h2>
              <span className="text-sm text-muted-foreground">{analysisResults.length} findings</span>
            </div>

            <div className="space-y-4 mb-10">
              {analysisResults.map((r, i) => {
                const cfg = typeConfig[r.type as keyof typeof typeConfig];
                const Icon = cfg.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`${cfg.bg} ${cfg.border} border rounded-xl p-5`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className={`w-5 h-5 ${cfg.color} mt-0.5 shrink-0`} />
                      <div>
                        <h3 className="font-heading text-base font-bold text-foreground mb-1">{r.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="bg-secondary border border-border rounded-xl p-8 text-center">
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Need Expert Review?</h3>
              <p className="text-sm text-muted-foreground mb-5">Get a detailed professional analysis from our compliance specialists.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-semibold text-sm rounded-lg hover:bg-accent/90 transition-colors">
                  Book Expert Review <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="https://wa.me/919052878779" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-semibold text-sm rounded-lg hover:border-accent/40 transition-colors">
                  WhatsApp Consultation
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DocumentAnalyzerPage;
