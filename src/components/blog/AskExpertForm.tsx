import { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, Phone, Mail, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const querySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(10, "Valid phone number required").max(15),
  email: z.string().trim().email("Valid email required").max(255),
  question: z.string().trim().min(5, "Please describe your question").max(1000),
});

const AskExpertForm = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", phone: "", email: "", question: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = querySchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
    toast({ title: "Query Submitted", description: "Our experts will review your query and contact you shortly." });
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-background border border-accent/30 p-8 text-center"
      >
        <div className="w-16 h-16 bg-accent/10 flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="w-8 h-8 text-accent" />
        </div>
        <h3 className="font-heading text-xl font-bold text-foreground mb-2">Query Received!</h3>
        <p className="text-sm text-muted-foreground">
          Our tax experts will review your question and contact you within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="bg-background border border-border p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-accent/10 flex items-center justify-center">
          <HelpCircle className="w-5 h-5 text-accent" />
        </div>
        <h3 className="font-heading text-lg font-bold text-foreground">Ask a Tax Expert</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-6 pl-[52px]">
        Our experts will review your query and contact you.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full h-11 pl-10 pr-4 border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full h-11 pl-10 pr-4 border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
          </div>
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full h-11 pl-10 pr-4 border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
          </div>
        </div>
        <div>
          <textarea
            placeholder="Describe your tax question..."
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
            rows={3}
            className="w-full p-4 border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
          {errors.question && <p className="text-xs text-destructive mt-1">{errors.question}</p>}
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full h-11 bg-accent text-accent-foreground font-semibold text-sm tracking-wider uppercase flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          Submit Your Query
        </motion.button>
      </form>
    </div>
  );
};

export default AskExpertForm;
