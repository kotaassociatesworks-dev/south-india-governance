import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const SuccessConfirmation = ({ serviceName, txnId }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-background border border-border p-10 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="w-20 h-20 bg-accent/15 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle2 className="w-10 h-10 text-accent" />
      </motion.div>
      <h2 className="font-heading text-2xl font-bold text-foreground mb-3">
        Submission Successful
      </h2>
      <p className="text-muted-foreground mb-2">
        Your <strong>{serviceName}</strong> request has been submitted successfully.
      </p>
      {txnId && (
        <p className="text-sm text-muted-foreground mb-6">
          Transaction ID: <span className="font-mono font-semibold text-foreground">{txnId}</span>
        </p>
      )}
      <p className="text-sm text-muted-foreground mb-8">
        Our team will review your documents and get back to you within 24 hours.
      </p>
      <Link
        to="/services"
        className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold text-sm tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors"
      >
        Back to Services
      </Link>
    </motion.div>
  );
};

export default SuccessConfirmation;
