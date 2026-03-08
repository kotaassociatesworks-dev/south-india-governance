import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, AlertTriangle, XCircle, ArrowRight, ArrowLeft, BarChart3, Phone, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const questions = [
  {
    id: "turnover",
    question: "What is your annual turnover?",
    options: [
      { label: "Below ₹20 Lakhs", score: 0 },
      { label: "₹20 Lakhs – ₹1 Crore", score: 5 },
      { label: "₹1 Crore – ₹5 Crore", score: 10 },
      { label: "Above ₹5 Crore", score: 15 },
    ],
  },
  {
    id: "gst_delays",
    question: "How often are your GST returns delayed?",
    options: [
      { label: "Never", score: 0 },
      { label: "Occasionally (1-2 months)", score: 10 },
      { label: "Frequently (3-6 months)", score: 20 },
      { label: "Severely delayed (6+ months)", score: 30 },
    ],
  },
  {
    id: "itc_mismatch",
    question: "Do you have ITC mismatches in GSTR-2A/2B?",
    options: [
      { label: "No mismatches", score: 0 },
      { label: "Minor mismatches (< 5%)", score: 10 },
      { label: "Moderate mismatches (5-15%)", score: 20 },
      { label: "Major mismatches (> 15%)", score: 30 },
    ],
  },
  {
    id: "notices",
    question: "Have you received any tax notices in the past 2 years?",
    options: [
      { label: "None", score: 0 },
      { label: "1 notice", score: 10 },
      { label: "2-3 notices", score: 20 },
      { label: "4 or more notices", score: 30 },
    ],
  },
  {
    id: "books",
    question: "Are your books of accounts regularly maintained?",
    options: [
      { label: "Yes, fully updated", score: 0 },
      { label: "Partially maintained", score: 10 },
      { label: "Irregularly maintained", score: 20 },
      { label: "No proper books", score: 25 },
    ],
  },
];

const getRiskLevel = (score) => {
  if (score <= 25) return { level: "Low Risk", color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/30", icon: ShieldCheck, desc: "Your tax compliance appears healthy. Keep up the good work!" };
  if (score <= 55) return { level: "Medium Risk", color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/30", icon: AlertTriangle, desc: "There are areas that need attention. Proactive compliance can prevent future issues." };
  return { level: "High Risk", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/30", icon: XCircle, desc: "Immediate compliance review recommended. Multiple risk factors detected." };
};

const recommendations = {
  low: [
    "Continue timely GST return filing",
    "Schedule annual compliance review",
    "Maintain proper documentation",
  ],
  medium: [
    "GST Compliance Review — verify ITC claims",
    "ITC Reconciliation with GSTR-2A/2B",
    "Consider professional bookkeeping services",
    "Evaluate pending notices if any",
  ],
  high: [
    "Urgent GST compliance review required",
    "ITC reconciliation and correction",
    "Professional notice consultation",
    "Complete books of accounts audit",
    "Penalty mitigation strategy",
  ],
};

const TaxRiskAnalyzerPage = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const totalScore = Object.values(answers).reduce((sum: number, s: number) => sum + s, 0) as number;
  const progress = ((Object.keys(answers).length) / questions.length) * 100;

  const handleSelect = (questionId, score) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) setCurrentQ((p) => p + 1);
    else setShowResult(true);
  };

  const handleBack = () => {
    if (currentQ > 0) setCurrentQ((p) => p - 1);
  };

  const handleReset = () => {
    setCurrentQ(0);
    setAnswers({});
    setShowResult(false);
  };

  const risk = getRiskLevel(totalScore);
  const RiskIcon = risk.icon;
  const recs = totalScore <= 25 ? recommendations.low : totalScore <= 55 ? recommendations.medium : recommendations.high;
  const q = questions[currentQ];

  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-accent/20 bg-accent/5">
              <BarChart3 className="w-4 h-4 text-accent" />
              <span className="text-accent text-xs font-semibold tracking-widest uppercase">Tax Risk Analyzer</span>
            </div>
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-3">Assess Your Tax Compliance Risk</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">Answer 5 quick questions and get a personalized compliance risk score with actionable recommendations.</p>
          </motion.div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{Object.keys(answers).length}/{questions.length} answered</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="bg-background border border-border rounded-xl p-8"
              >
                <p className="text-sm text-accent font-semibold mb-2">Question {currentQ + 1} of {questions.length}</p>
                <h2 className="font-heading text-xl font-bold text-foreground mb-6">{q.question}</h2>

                <div className="space-y-3">
                  {q.options.map((opt) => {
                    const selected = answers[q.id] === opt.score;
                    return (
                      <button
                        key={opt.label}
                        onClick={() => handleSelect(q.id, opt.score)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          selected
                            ? "border-accent bg-accent/5 text-foreground"
                            : "border-border hover:border-accent/30 text-foreground"
                        }`}
                      >
                        <span className="font-medium">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={handleBack} disabled={currentQ === 0}>
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back
                  </Button>
                  <Button onClick={handleNext} disabled={answers[q.id] === undefined}>
                    {currentQ === questions.length - 1 ? "View Results" : "Next"} <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                {/* Score Card */}
                <div className={`${risk.bg} ${risk.border} border-2 rounded-xl p-8 text-center`}>
                  <RiskIcon className={`w-16 h-16 ${risk.color} mx-auto mb-4`} />
                  <h2 className={`font-heading text-3xl font-bold ${risk.color} mb-2`}>{risk.level}</h2>
                  <p className="text-foreground text-lg font-semibold mb-1">Score: {totalScore} / 130</p>
                  <p className="text-muted-foreground">{risk.desc}</p>
                </div>

                {/* Recommendations */}
                <div className="bg-background border border-border rounded-xl p-8">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4">Recommendations</h3>
                  <ul className="space-y-3">
                    {recs.map((r, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-accent text-xs font-bold">{i + 1}</span>
                        </div>
                        <span className="text-foreground">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTAs */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <a
                    href="https://wa.me/919052878779?text=I%20got%20a%20risk%20score%20from%20your%20Tax%20Risk%20Analyzer.%20I%20need%20compliance%20help."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-accent text-accent-foreground font-semibold py-4 rounded-lg hover:bg-accent/90 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" /> Book Consultation
                  </a>
                  <a
                    href="tel:+919052878779"
                    className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-4 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Phone className="w-5 h-5" /> Contact Kota Associates
                  </a>
                </div>

                <div className="text-center">
                  <Button variant="outline" onClick={handleReset}>Take Assessment Again</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default TaxRiskAnalyzerPage;
