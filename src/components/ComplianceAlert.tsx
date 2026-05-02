import { useEffect, useState } from "react";
import { X, Megaphone } from "lucide-react";

interface AlertData {
  message?: string;
  href?: string;
  tag?: string;
  enabled?: boolean;
  expires?: string; // YYYY-MM-DD
}

const DISMISS_KEY = "kota-alert-dismissed";

const isLive = (a: AlertData | null | undefined): a is AlertData => {
  if (!a?.enabled || !a.message) return false;
  if (a.expires) {
    const exp = new Date(a.expires + "T23:59:59");
    if (!isNaN(exp.getTime()) && Date.now() > exp.getTime()) return false;
  }
  return true;
};

const ComplianceAlert = () => {
  const [alert, setAlert] = useState<AlertData | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const envMsg = (import.meta.env.VITE_COMPLIANCE_ALERT as string | undefined)?.trim();
    if (envMsg) { setAlert({ message: envMsg, enabled: true }); return; }
    fetch("/alerts.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: AlertData | null) => { if (isLive(data)) setAlert(data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (alert?.message && sessionStorage.getItem(DISMISS_KEY) === alert.message) setDismissed(true);
  }, [alert]);

  if (!alert?.message || dismissed) return null;

  return (
    <div className="bg-accent text-accent-foreground text-sm">
      <div className="container-narrow py-2 flex items-center gap-3">
        <Megaphone className="w-4 h-4 shrink-0" />
        {alert.tag && (
          <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 bg-accent-foreground/15 rounded shrink-0">{alert.tag}</span>
        )}
        <p className="flex-1 leading-snug">
          {alert.message}{" "}
          {alert.href && <a href={alert.href} className="underline font-medium" target="_blank" rel="noopener noreferrer">Read more →</a>}
        </p>
        <button
          aria-label="Dismiss alert"
          onClick={() => { sessionStorage.setItem(DISMISS_KEY, alert.message!); setDismissed(true); }}
          className="p-1 hover:bg-accent-foreground/10 rounded"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ComplianceAlert;
