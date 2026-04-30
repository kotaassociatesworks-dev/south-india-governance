import { useEffect, useState } from "react";
import { X, Megaphone } from "lucide-react";

interface AlertData {
  message?: string;
  href?: string;
  enabled?: boolean;
}

const DISMISS_KEY = "kota-alert-dismissed";

const ComplianceAlert = () => {
  const [alert, setAlert] = useState<AlertData | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check env first
    const envMsg = (import.meta.env.VITE_COMPLIANCE_ALERT as string | undefined)?.trim();
    if (envMsg) { setAlert({ message: envMsg, enabled: true }); return; }
    // Then alerts.json (firm can edit without redeploy)
    fetch("/alerts.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: AlertData | null) => {
        if (data?.enabled && data.message) setAlert(data);
      })
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
