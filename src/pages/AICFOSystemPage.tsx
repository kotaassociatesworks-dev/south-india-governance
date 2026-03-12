import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, TrendingUp, Shield, Calculator, Brain } from "lucide-react";
import Navbar from "@/components/Navbar";
import TrustBadgeBar from "@/components/TrustBadgeBar";
import Footer from "@/components/Footer";

interface Message { role: 'user' | 'ai'; content: string }

const AI_RESPONSES: Record<string, string> = {
  'gst': '📊 Based on your current turnover pattern, your estimated GST liability for this quarter is approximately ₹4.2L. I recommend maximizing Input Tax Credit by ensuring all purchase invoices are reconciled before the GSTR-2B deadline.',
  'tax saving': '💡 Tax Optimization Opportunities Detected:\n\n1. **Section 80C** — You have ₹42,000 unused capacity. Consider ELSS mutual funds for both tax saving and wealth creation.\n2. **Section 80D** — Health insurance premium deduction available up to ₹25,000.\n3. **NPS (80CCD)** — Additional ₹50,000 deduction available.\n\nEstimated additional savings: ₹35,400',
  'compliance': '🛡️ Compliance Status Summary:\n\n✅ GSTR-1 (Oct) — Filed on time\n✅ GSTR-3B (Oct) — Filed on time\n⚠️ TDS Return (Q2) — Due in 5 days\n❌ Advance Tax (Q3) — Overdue by 2 days\n\nRecommendation: File advance tax immediately to avoid 1% monthly interest under Section 234C.',
  'audit': '🔍 Audit Risk Assessment:\n\nYour current audit risk score is **Low (22/100)**.\n\nFactors:\n• Turnover below ₹10Cr threshold ✅\n• All returns filed within due dates ✅\n• No mismatch in GSTR-1 vs GSTR-3B ✅\n• ITC utilization ratio within normal range ✅\n\nContinue maintaining clean compliance records.',
  'forecast': '📈 Financial Forecast (Next Quarter):\n\n• Projected Revenue: ₹52.4L (+8% QoQ)\n• Estimated Expenses: ₹36.8L\n• Projected Profit: ₹15.6L\n• GST Liability: ₹4.8L\n• Advance Tax Due: ₹3.9L\n\nCash flow recommendation: Maintain ₹8.7L reserve for tax obligations.',
  'default': '🤖 I can help you with:\n\n• **GST Analysis** — liability estimation, ITC optimization\n• **Tax Savings** — identify unused deductions & exemptions\n• **Compliance** — filing status, deadline tracking\n• **Audit Risk** — risk assessment & mitigation\n• **Forecasting** — revenue, profit & tax projections\n\nWhat would you like to explore?',
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('gst') || lower.includes('input tax')) return AI_RESPONSES['gst'];
  if (lower.includes('save') || lower.includes('saving') || lower.includes('deduction') || lower.includes('80c')) return AI_RESPONSES['tax saving'];
  if (lower.includes('compliance') || lower.includes('filing') || lower.includes('return')) return AI_RESPONSES['compliance'];
  if (lower.includes('audit') || lower.includes('risk')) return AI_RESPONSES['audit'];
  if (lower.includes('forecast') || lower.includes('project') || lower.includes('predict')) return AI_RESPONSES['forecast'];
  return AI_RESPONSES['default'];
}

const quickActions = [
  { label: 'GST Liability', icon: Calculator, query: 'What is my estimated GST liability?' },
  { label: 'Tax Savings', icon: TrendingUp, query: 'Find tax saving opportunities' },
  { label: 'Compliance Check', icon: Shield, query: 'Show my compliance status' },
  { label: 'Financial Forecast', icon: Brain, query: 'Forecast my next quarter financials' },
];

const AICFOSystemPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: '👋 Welcome to **Kota AI CFO**. I\'m your virtual Chief Financial Officer, powered by financial intelligence.\n\nI can analyze your financial data, optimize taxes, forecast liabilities, and provide strategic insights. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: getAIResponse(text) }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-background">
      <TrustBadgeBar />
      <Navbar />
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm text-accent font-medium">AI-Powered Financial Intelligence</span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Kota <span className="gradient-text">AI CFO</span>
            </h1>
            <p className="text-muted-foreground mt-2">Your virtual Chief Financial Officer</p>
          </motion.div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {quickActions.map(qa => (
              <button key={qa.label} onClick={() => sendMessage(qa.query)}
                className="glass-card rounded-lg p-3 border border-border/40 hover:border-accent/40 transition-all text-left group">
                <qa.icon className="w-5 h-5 text-accent mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-foreground">{qa.label}</span>
              </button>
            ))}
          </div>

          {/* Chat */}
          <div className="glass-card rounded-xl border border-border/40 overflow-hidden">
            <div ref={scrollRef} className="h-[450px] overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                    {msg.role === 'ai' && (
                      <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-accent" />
                      </div>
                    )}
                    <div className={`max-w-[75%] rounded-xl px-4 py-3 text-sm whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-muted/50 text-foreground border border-border/40'
                    }`}>
                      {msg.content}
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-accent" />
                  </div>
                  <div className="bg-muted/50 rounded-xl px-4 py-3 border border-border/40">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-border/40 p-4 flex gap-3">
              <input value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                placeholder="Ask about tax, compliance, forecasting..."
                className="flex-1 bg-muted/30 border border-border/40 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent/50" />
              <button onClick={() => sendMessage(input)}
                className="px-5 py-3 rounded-lg bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default AICFOSystemPage;
