import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Scale, BookOpen, Shield, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getGSTExpertResponse, formatGSTResponse, gstQuickQueries } from "@/lib/engines/gstExpertEngine";
import LeadCapturePopup from "@/components/LeadCapturePopup";

interface Message {
  role: "user" | "assistant";
  content: string;
  category?: string;
}

const TaxAssistantPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "✅ **Kota Associates GST Expert System — Active**\n\nI am your CA-grade GST advisory engine, trained on the complete Indian GST law framework including CGST Act, IGST Act, GST Rules, and all latest amendments.\n\n📜 **Coverage:** Registration • Returns • ITC • E-Invoicing • E-Way Bills • RCM • Exports • Place of Supply • Demands & Notices • Refunds • Penalties • Job Work • Works Contract • Composition Scheme\n\n🛠 **How I respond:** Every answer includes Section references, practical interpretation, step-by-step implementation, and risk notes.\n\nAsk me any GST question or select a topic below.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [queryCount, setQueryCount] = useState(0);
  const [showLead, setShowLead] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (queryCount > 0 && queryCount % 3 === 0) {
      setShowLead(true);
    }
  }, [queryCount]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const gstResponse = getGSTExpertResponse(text);
      const formatted = formatGSTResponse(gstResponse);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: formatted, category: gstResponse.category },
      ]);
      setTyping(false);
      setQueryCount((c) => c + 1);
    }, 600);
  };

  const stats = [
    { icon: Scale, label: "Sections Covered", value: "500+" },
    { icon: BookOpen, label: "Rules & Notifications", value: "200+" },
    { icon: Shield, label: "Compliance Areas", value: "25+" },
    { icon: Sparkles, label: "CA-Grade Accuracy", value: "100%" },
  ];

  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
            <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 rounded-full border border-accent/20 bg-accent/5">
              <Bot className="w-4 h-4 text-accent" />
              <span className="text-accent text-xs font-semibold tracking-widest uppercase">
                CA-Grade GST Expert System
              </span>
            </div>
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-2">
              GST Expert Advisory
            </h1>
            <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
              Section-accurate guidance based on CGST Act, IGST Act, GST Rules, notifications, circulars & case laws. Every response is implementation-ready.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {stats.map((s) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-background border border-border rounded-lg p-3 text-center"
              >
                <s.icon className="w-5 h-5 text-accent mx-auto mb-1" />
                <div className="text-lg font-bold text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Quick Queries */}
          <div className="flex flex-wrap gap-2 justify-center mb-5">
            {gstQuickQueries.map((q) => (
              <button
                key={q.label}
                onClick={() => sendMessage(q.label)}
                className="text-xs px-3 py-1.5 rounded-full bg-background border border-border text-foreground hover:border-accent/40 hover:bg-accent/5 transition-colors flex items-center gap-1.5"
              >
                <span>{q.icon}</span>
                <span>{q.label}</span>
              </button>
            ))}
          </div>

          {/* Chat */}
          <div className="bg-background border border-border rounded-xl overflow-hidden shadow-lg">
            <div className="h-[500px] overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-accent" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-foreground border border-border"
                      }`}
                    >
                      {msg.category && msg.role === "assistant" && (
                        <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded mb-2">
                          {msg.category}
                        </span>
                      )}
                      {msg.content.split(/(\*\*.*?\*\*)/).map((part, j) =>
                        part.startsWith("**") && part.endsWith("**") ? (
                          <strong key={j} className="font-semibold">
                            {part.slice(2, -2)}
                          </strong>
                        ) : (
                          <span key={j}>{part}</span>
                        )
                      )}
                    </div>
                    {msg.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              {typing && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-accent" />
                  </div>
                  <div className="bg-secondary border border-border rounded-xl px-4 py-3">
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
                placeholder="Ask a GST question — e.g., 'Can I claim ITC on office rent?'"
                className="flex-1"
              />
              <Button onClick={() => sendMessage(input)} disabled={!input.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-4">
            This system provides guidance based on Indian GST law. For client-specific, legally defensible advice,{" "}
            <a href="https://wa.me/919052878779" target="_blank" rel="noopener noreferrer" className="text-accent underline">
              consult Kota Associates
            </a>.
          </p>
        </div>
      </section>
      <Footer />
      <LeadCapturePopup isOpen={showLead} onClose={() => setShowLead(false)} />
    </main>
  );
};

export default TaxAssistantPage;
