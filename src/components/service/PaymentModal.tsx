import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Check, Loader2 } from "lucide-react";

const PaymentModal = ({ open, onClose, amount, serviceName, onSuccess }) => {
  const [status, setStatus] = useState("idle"); // idle | processing | success

  const handlePay = () => {
    setStatus("processing");
    setTimeout(() => {
      const txnId = "TXN" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
      setStatus("success");
      setTimeout(() => {
        onSuccess(txnId);
        setStatus("idle");
      }, 2000);
    }, 2500);
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4"
        onClick={() => status === "idle" && onClose()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-background border border-border w-full max-w-md p-8"
        >
          {status === "success" ? (
            <div className="text-center py-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Check className="w-8 h-8 text-accent" />
              </motion.div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                Payment Successful
              </h3>
              <p className="text-sm text-muted-foreground">Redirecting to upload…</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Complete Payment
                </h3>
                {status === "idle" && (
                  <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="bg-secondary p-4 mb-6">
                <p className="text-sm text-muted-foreground mb-1">Service</p>
                <p className="font-semibold text-foreground text-sm">{serviceName}</p>
                <div className="border-t border-border my-3" />
                <p className="text-sm text-muted-foreground mb-1">Amount</p>
                <p className="font-heading text-2xl font-bold text-foreground">₹{amount.toLocaleString("en-IN")}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Card Number</label>
                  <input
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    maxLength={19}
                    className="w-full h-11 px-4 border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">Expiry</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full h-11 px-4 border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">CVV</label>
                    <input
                      type="password"
                      placeholder="•••"
                      maxLength={4}
                      className="w-full h-11 px-4 border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handlePay}
                disabled={status === "processing"}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-semibold text-sm tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors disabled:opacity-60"
              >
                {status === "processing" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing…
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    Pay ₹{amount.toLocaleString("en-IN")}
                  </>
                )}
              </button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Simulated payment — no real charges apply.
              </p>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentModal;
