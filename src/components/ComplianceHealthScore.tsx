import { useState } from "react";
import { CheckCircle2, AlertTriangle, ShieldCheck, Share2, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const QUESTIONS = [
  { id: 1,  q: "Are you registered for GST (if your turnover exceeds the threshold)?",                  fix: "Get GST registration done immediately to avoid penalty under Sec 122(1)(xi)." },
  { id: 2,  q: "Do you file GSTR-1 and GSTR-3B by the due date every month?",                            fix: "Late fees of ₹50/day (₹20 for Nil) per return apply. Set up automated reminders." },
  { id: 3,  q: "Is your ITC reconciled against GSTR-2B every month/quarter?",                            fix: "Mismatches lead to ITC reversal + interest. Begin monthly 2B reconciliation." },
  { id: 4,  q: "Do you file TDS returns within the quarterly deadline?",                                 fix: "Late filing attracts ₹200/day under Sec 234E + penalty under Sec 271H." },
  { id: 5,  q: "Is your income tax return filed before the due date (without extension)?",               fix: "Belated return loses loss carry-forward + ₹5,000 fee under Sec 234F." },
  { id: 6,  q: "Do you maintain proper books of accounts updated monthly?",                              fix: "Books not maintained → presumptive estimation by AO + Sec 271A penalty." },
  { id: 7,  q: "Do you generate E-Way Bills for every consignment above ₹50,000?",                        fix: "Sec 129 penalty: 100% of tax + 200% of tax for misclassified goods." },
  { id: 8,  q: "Are your ROC annual filings (AOC-4, MGT-7) filed on time?",                              fix: "₹100/day per form, no upper cap. Strike-off risk after 3 years of non-filing." },
  { id: 9,  q: "Do you have a tax audit done if your turnover exceeds the threshold (₹1 Cr / ₹10 Cr)?", fix: "Sec 271B: penalty 0.5% of turnover, capped at ₹1.5L. Get an audit scheduled." },
  { id: 10, q: "Are you aware of and compliant with all applicable labour law registrations (PF/ESI/PT)?", fix: "Statutory dues attract interest + damages. Register and file monthly returns." },
];

type Answers = Record<number, boolean | null>;

const band = (score: number) => {
  if (score >= 90) return { label: "Excellent", color: "emerald", msg: "Excellent compliance health — keep it up. Book an annual review with our partners." };
  if (score >= 70) return { label: "Good",      color: "blue",    msg: "Good compliance with minor gaps. Our advisors can close them quickly." };
  if (score >= 50) return { label: "Amber",     color: "amber",   msg: "Significant compliance gaps. Schedule a consultation to avoid penalties." };
  return                  { label: "High Risk", color: "red",     msg: "High-risk compliance position. Contact Kota Associates immediately." };
};

const colorMap: Record<string, { bg: string; border: string; text: string; ring: string }> = {
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/40", text: "text-emerald-700 dark:text-emerald-300", ring: "ring-emerald-500/30" },
  blue:    { bg: "bg-blue-500/10",    border: "border-blue-500/40",    text: "text-blue-700 dark:text-blue-300",       ring: "ring-blue-500/30" },
  amber:   { bg: "bg-amber-500/10",   border: "border-amber-500/40",   text: "text-amber-700 dark:text-amber-300",     ring: "ring-amber-500/30" },
  red:     { bg: "bg-red-500/10",     border: "border-red-500/40",     text: "text-red-700 dark:text-red-300",         ring: "ring-red-500/30" },
};

const ComplianceHealthScore = () => {
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareForm, setShareForm] = useState({ name: "", company: "", phone: "", address: "" });
  const [shareDone, setShareDone] = useState(false);

  const allAnswered = QUESTIONS.every((q) => answers[q.id] !== undefined && answers[q.id] !== null);
  const yesCount = QUESTIONS.filter((q) => answers[q.id] === true).length;
  const score = yesCount * 10;
  const result = band(score);
  const c = colorMap[result.color];
  const failures = QUESTIONS.filter((q) => answers[q.id] === false);

  const set = (id: number, v: boolean) => setAnswers((a) => ({ ...a, [id]: v }));

  const submit = () => {
    setSubmitted(true);
    trackEvent("health_score", "submit", result.label, score);
  };

  const reset = () => { setAnswers({}); setSubmitted(false); };

  const validShare = shareForm.name.trim().length >= 2
    && shareForm.phone.trim().match(/^[+\d][\d\s-]{7,}$/)
    && shareForm.address.trim().length >= 5;

  const submitShare = () => {
    if (!validShare) return;
    trackEvent("health_score", "share_unlocked", shareForm.company || shareForm.name);
    setShareDone(true);
    const text = encodeURIComponent(
      `Kota Associates Compliance Health Score\n\nName: ${shareForm.name}\nCompany: ${shareForm.company || "—"}\nScore: ${score}/100 (${result.label})\n\n${result.msg}\n\nGet your free assessment: https://kotaassociates.in/calculators`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  };

  if (!submitted) {
    return (
      <div className="space-y-4">
        <div className="bg-card border border-border rounded p-6">
          <div className="flex items-start gap-3 mb-2">
            <ShieldCheck className="w-7 h-7 text-accent shrink-0" />
            <div>
              <h3 className="font-heading text-2xl text-primary">Compliance Health Score</h3>
              <p className="text-sm text-muted-foreground">Answer 10 quick yes/no questions. Get a tailored action list and consultation pathway.</p>
            </div>
          </div>
        </div>

        {QUESTIONS.map((q) => (
          <div key={q.id} className="flex flex-wrap items-center justify-between gap-3 p-4 bg-card border border-border rounded">
            <p className="text-sm text-foreground/90 flex-1"><span className="text-accent font-heading mr-2">{String(q.id).padStart(2, "0")}</span>{q.q}</p>
            <div className="flex gap-2">
              <button onClick={() => set(q.id, true)}
                className={`px-4 py-1.5 text-xs rounded border transition ${answers[q.id] === true ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300" : "border-border hover:border-accent"}`}>Yes</button>
              <button onClick={() => set(q.id, false)}
                className={`px-4 py-1.5 text-xs rounded border transition ${answers[q.id] === false ? "bg-destructive/15 border-destructive/40 text-destructive" : "border-border hover:border-accent"}`}>No</button>
            </div>
          </div>
        ))}

        <div className="text-center pt-4">
          <button disabled={!allAnswered} onClick={submit}
            className="btn-gold disabled:opacity-50 disabled:cursor-not-allowed">
            {allAnswered ? "Calculate My Score" : `Answer all questions (${Object.values(answers).filter((v) => v !== null && v !== undefined).length}/10)`}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 no-share-zone" onContextMenu={(e) => e.preventDefault()}>
      <div className={`p-6 md:p-10 rounded border-2 ${c.border} ${c.bg} text-center`}>
        <p className={`text-xs uppercase tracking-widest font-semibold mb-2 ${c.text}`}>{result.label}</p>
        <p className="font-heading text-7xl text-primary mb-1">{score}<span className="text-3xl text-muted-foreground">/100</span></p>
        <div className="gold-divider mx-auto my-4" />
        <p className="text-sm md:text-base text-foreground/85 max-w-xl mx-auto">{result.msg}</p>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <a href="/contact#booking" onClick={() => trackEvent("health_score", "cta_book", result.label)} className="btn-gold">Book Consultation</a>
          <button onClick={() => setShareOpen(true)} className="btn-outline inline-flex items-center gap-2"><Share2 className="w-4 h-4" />Share Score</button>
          <button onClick={reset} className="text-sm text-muted-foreground hover:text-primary underline">Retake</button>
        </div>
      </div>

      {failures.length > 0 && (
        <div className="bg-card border border-border rounded p-6">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">Action Items ({failures.length})</p>
          <ul className="space-y-3">
            {failures.map((f) => (
              <li key={f.id} className="flex gap-3 text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-foreground"><strong>{f.q}</strong></p>
                  <p className="text-muted-foreground text-xs mt-1">{f.fix}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {failures.length === 0 && (
        <div className="bg-emerald-500/10 border border-emerald-500/40 rounded p-6 flex gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <p className="text-sm">A perfect score. Book an annual compliance review to keep this position.</p>
        </div>
      )}

      {/* Share Modal — gated lead-capture */}
      {shareOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => !shareDone && setShareOpen(false)}>
          <div className="bg-background border border-border rounded-lg max-w-md w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShareOpen(false)} className="absolute top-3 right-3 text-muted-foreground hover:text-primary"><X className="w-5 h-5" /></button>

            {!shareDone ? (
              <>
                <h3 className="font-heading text-2xl text-primary mb-1">Share Your Score</h3>
                <p className="text-sm text-muted-foreground mb-5">Enter your details to unlock sharing. Our advisors may follow up.</p>
                <div className="space-y-3">
                  <input className="input-clean" placeholder="Full Name *" value={shareForm.name} onChange={(e) => setShareForm({ ...shareForm, name: e.target.value })} maxLength={80} />
                  <input className="input-clean" placeholder="Company / Business Name (optional)" value={shareForm.company} onChange={(e) => setShareForm({ ...shareForm, company: e.target.value })} maxLength={120} />
                  <input className="input-clean" placeholder="Phone Number *" value={shareForm.phone} onChange={(e) => setShareForm({ ...shareForm, phone: e.target.value })} maxLength={20} />
                  <textarea className="input-clean !h-auto py-3" placeholder="City / Address *" rows={2} value={shareForm.address} onChange={(e) => setShareForm({ ...shareForm, address: e.target.value })} maxLength={200} />
                  <button onClick={submitShare} disabled={!validShare} className="btn-gold w-full disabled:opacity-50">Unlock & Share via WhatsApp</button>
                  <p className="text-[11px] text-muted-foreground text-center">By submitting, you agree to be contacted by Kota Associates regarding your compliance position.</p>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h3 className="font-heading text-2xl text-primary mb-2">Thank you, {shareForm.name.split(" ")[0]}</h3>
                <p className="text-sm text-muted-foreground mb-5">WhatsApp share opened in a new tab. We'll be in touch within 24 hours.</p>
                <button onClick={() => { setShareOpen(false); setShareDone(false); }} className="btn-primary w-full">Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplianceHealthScore;
