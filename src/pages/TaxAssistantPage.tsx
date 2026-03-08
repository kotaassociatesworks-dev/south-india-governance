import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send, Bot, User, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const faqResponses: Record<string, string> = {
  "gst registration": "GST Registration is mandatory if your annual turnover exceeds ₹40 Lakhs (₹20 Lakhs for services). You'll need PAN, Aadhaar, business address proof, and bank account details.\n\n**Need help?** Kota Associates can handle your complete GST registration.",
  "gst return": "GST returns include GSTR-1 (outward supplies, due 11th), GSTR-3B (summary return, due 20th), and GSTR-9 (annual, due 31st Dec). Late filing attracts ₹50/day penalty.\n\n**Tip:** Regular filing avoids scrutiny notices.",
  "tds": "TDS (Tax Deducted at Source) must be deducted on payments like salary, rent, professional fees, and contractor payments. Quarterly returns are filed using Form 26Q.\n\n**Key deadlines:** 31st July, Oct, Jan, May.",
  "income tax": "Income Tax returns must be filed by 31st July (non-audit) or 31st October (audit cases). Different ITR forms apply based on income sources.\n\n**Pro tip:** Claim all eligible deductions under 80C, 80D, and other sections.",
  "e-way bill": "E-Way Bill is mandatory for movement of goods exceeding ₹50,000. It's valid for specific distances and must be generated before goods are dispatched.\n\n**Kota Associates** can generate E-Way Bills for ₹40 per bill.",
  "notice": "Tax notices can be from GST (ASMT-10, DRC-01, DRC-03) or Income Tax (scrutiny, demand). Always respond within the specified deadline.\n\n**Upload your notice** on our Notice Upload page for expert guidance.",
  "itc": "Input Tax Credit (ITC) allows you to reduce your GST liability by claiming credit on purchases. Reconcile with GSTR-2A/2B regularly.\n\n**Common issue:** ITC mismatches are a major trigger for GST notices.",
  "audit": "Tax audit u/s 44AB is mandatory if business turnover exceeds ₹1 Crore (₹10 Cr for digital transactions) or professional receipts exceed ₹50 Lakhs.\n\n**Deadline:** 30th September.",
  "penalty": "GST late fee is ₹50/day (₹20 for nil returns). Income Tax late filing fee is ₹5,000 (₹1,000 if income < ₹5L). Interest on late payment is 18% p.a. for GST.\n\n**Avoid penalties** with timely filing through our compliance plans.",
  "partnership": "Partnership firms are governed by the Indian Partnership Act, 1932. A partnership deed is essential, and the firm needs PAN, GST registration, and a current bank account.\n\n**We draft partnership deeds** starting at competitive rates.",
};

const getResponse = (input: string): string => {
  const lower = input.toLowerCase();
  for (const [key, value] of Object.entries(faqResponses)) {
    if (lower.includes(key)) return value;
  }
  return "Thank you for your question. For detailed guidance on this topic, we recommend consulting with our tax experts who can provide personalized advice.\n\n**Book a consultation** on WhatsApp or call +91 90528 78779.";
};

const quickQuestions = [
  "How do I register for GST?",
  "When are GST returns due?",
  "What is TDS and when to deduct?",
  "How does ITC work?",
  "What happens if I miss filing?",
  "What is E-Way Bill?",
];

const TaxAssistantPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm your Tax Question Assistant. Ask me about GST, Income Tax, TDS, compliance, or any tax-related question.\n\nFor complex queries, I'll recommend consulting our experts." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const response = getResponse(text);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setTyping(false);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-accent/20 bg-accent/5">
              <Bot className="w-4 h-4 text-accent" />
              <span className="text-accent text-xs font-semibold tracking-widest uppercase">Tax Assistant</span>
            </div>
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-2">Tax Question Assistant</h1>
            <p className="text-muted-foreground">Ask tax questions and get instant guidance. For complex matters, consult our experts.</p>
          </motion.div>

          {/* Quick Questions */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="text-xs px-3 py-1.5 rounded-full bg-background border border-border text-foreground hover:border-accent/40 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat */}
          <div className="bg-background border border-border rounded-xl overflow-hidden">
            <div className="h-[450px] overflow-y-auto p-6 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-accent" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground"
                  }`}>
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </motion.div>
              ))}
              {typing && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-accent" />
                  </div>
                  <div className="bg-secondary rounded-xl px-4 py-3">
                    <span className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="border-t border-border p-4 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Ask a tax question..."
                className="flex-1"
              />
              <Button onClick={() => sendMessage(input)} disabled={!input.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            This assistant provides general guidance. For personalized tax advice, <a href="https://wa.me/919052878779" target="_blank" rel="noopener noreferrer" className="text-accent underline">consult our experts</a>.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default TaxAssistantPage;
