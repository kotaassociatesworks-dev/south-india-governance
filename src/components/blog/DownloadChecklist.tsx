import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Mail, Check, FileText } from "lucide-react";
import { downloadableChecklists } from "@/data/blogData";
import { z } from "zod";

const emailSchema = z.string().trim().email("Please enter a valid email").max(255);

const DownloadChecklist = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [downloaded, setDownloaded] = useState<Set<string>>(new Set());

  const handleDownload = (id: string) => {
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }
    setError("");
    setDownloaded((prev) => new Set(prev).add(id));
    setSelectedId(null);
    setEmail("");
  };

  return (
    <div className="bg-background border border-border p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-primary/10 flex items-center justify-center">
          <Download className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-heading text-lg font-bold text-foreground">Free Compliance Checklists</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-6 pl-[52px]">
        Enter your email to download professional checklists.
      </p>
      <div className="space-y-3">
        {downloadableChecklists.map((cl) => (
          <div key={cl.id}>
            <motion.button
              whileHover={{ x: 4 }}
              onClick={() => {
                if (downloaded.has(cl.id)) return;
                setSelectedId(selectedId === cl.id ? null : cl.id);
              }}
              className="w-full flex items-start gap-3 p-4 border border-border hover:border-accent/40 transition-colors text-left"
            >
              <FileText className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-semibold text-sm text-foreground block">{cl.title}</span>
                <span className="text-xs text-muted-foreground">{cl.description}</span>
              </div>
              {downloaded.has(cl.id) ? (
                <Check className="w-5 h-5 text-accent flex-shrink-0" />
              ) : (
                <Download className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              )}
            </motion.button>
            <AnimatePresence>
              {selectedId === cl.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 border border-t-0 border-border bg-secondary/30">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); setError(""); }}
                          className="w-full h-10 pl-10 pr-3 border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDownload(cl.id)}
                        className="h-10 px-4 bg-accent text-accent-foreground text-sm font-semibold flex items-center gap-1"
                      >
                        <Download className="w-4 h-4" />
                        Get
                      </motion.button>
                    </div>
                    {error && <p className="text-xs text-destructive mt-1">{error}</p>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DownloadChecklist;
