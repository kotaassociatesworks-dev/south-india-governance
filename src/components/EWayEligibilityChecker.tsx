import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

type SupplyType = "inter" | "intra" | "jobwork" | "handicraft" | "exempt";

const validityDays = (km: number, odc: boolean) => {
  let base: number;
  if (km <= 0) base = 0;
  else if (km <= 100) base = 1;
  else if (km <= 300) base = 3;
  else if (km <= 500) base = 5;
  else if (km <= 1000) base = 10;
  else base = 15;
  return odc ? base * 2 : base;
};

const EWayEligibilityChecker = ({ compact = false }: { compact?: boolean }) => {
  const [value, setValue] = useState(75000);
  const [distance, setDistance] = useState(150);
  const [type, setType] = useState<SupplyType>("inter");
  const [odc, setOdc] = useState(false);

  const result = useMemo(() => {
    const days = validityDays(distance, odc);
    if (type === "exempt") {
      return {
        kind: "warn" as const,
        title: "Likely Exempt — Verify HSN against Annexure II",
        note: "Goods listed in Annexure II of E-Way Bill Rules are exempt regardless of value. Confirm HSN code before dispatch.",
        days: 0,
      };
    }
    if (type === "jobwork") {
      return {
        kind: "danger" as const,
        title: "E-Way Bill REQUIRED — No threshold for job work",
        note: "Job work consignments require E-Way Bill irrespective of value. Validity: " + days + " day(s).",
        days,
      };
    }
    if (type === "handicraft") {
      return {
        kind: "danger" as const,
        title: "E-Way Bill REQUIRED — Handicrafts (no threshold)",
        note: "Handicraft supplies by unregistered persons availing exemption notification require EWB regardless of value. Validity: " + days + " day(s).",
        days,
      };
    }
    if (value >= 50000) {
      return {
        kind: "danger" as const,
        title: "E-Way Bill REQUIRED",
        note: `Consignment value ≥ ₹50,000. Validity: ${days} day(s)${odc ? " (ODC double validity applied)" : ""}.`,
        days,
      };
    }
    return {
      kind: "ok" as const,
      title: "E-Way Bill NOT Required",
      note: "Consignment value below ₹50,000 threshold. Keep tax invoice ready for verification at checkpoints.",
      days: 0,
    };
  }, [value, distance, type, odc]);

  const onTypeChange = (t: SupplyType) => {
    setType(t);
    trackEvent("eway", "checker_supply_type", t);
  };

  return (
    <div className={`grid ${compact ? "" : "md:grid-cols-2"} gap-8`}>
      <div className="space-y-5">
        <div>
          <label className="label-clean">Consignment Value (₹)</label>
          <input type="number" min={0} className="input-clean" value={value} onChange={(e) => setValue(+e.target.value || 0)} />
        </div>
        <div>
          <label className="label-clean">Distance (km)</label>
          <input type="number" min={0} className="input-clean" value={distance} onChange={(e) => setDistance(+e.target.value || 0)} />
        </div>
        <div>
          <label className="label-clean">Supply Type</label>
          <select className="input-clean" value={type} onChange={(e) => onTypeChange(e.target.value as SupplyType)}>
            <option value="inter">Inter-State</option>
            <option value="intra">Intra-State (AP/TG)</option>
            <option value="jobwork">Job Work</option>
            <option value="handicraft">Handicraft Supply</option>
            <option value="exempt">Exempt Category</option>
          </select>
        </div>
        <label className="flex items-center gap-2 text-sm text-foreground/80">
          <input type="checkbox" checked={odc} onChange={(e) => setOdc(e.target.checked)} className="accent-accent" />
          Over-Dimensional Cargo (ODC) — doubles validity
        </label>
      </div>

      <div
        className={`rounded p-6 border ${
          result.kind === "danger" ? "bg-destructive/10 border-destructive/40"
          : result.kind === "ok" ? "bg-emerald-500/10 border-emerald-500/40"
          : "bg-amber-500/10 border-amber-500/40"
        }`}
      >
        <div className="flex items-start gap-3 mb-3">
          {result.kind === "danger" && <ShieldAlert className="w-6 h-6 text-destructive shrink-0" />}
          {result.kind === "ok" && <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />}
          {result.kind === "warn" && <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />}
          <h3 className="font-heading text-xl text-foreground">{result.title}</h3>
        </div>
        <p className="text-sm text-foreground/80 mb-4">{result.note}</p>
        {result.days > 0 && (
          <div className="bg-card/60 rounded p-3 text-sm">
            <span className="text-muted-foreground">Validity from generation: </span>
            <strong>{result.days} day{result.days !== 1 ? "s" : ""}</strong>
          </div>
        )}
        <a
          href="/contact?service=eway-bill"
          className="inline-block mt-4 text-sm text-accent font-medium hover:underline"
        >
          For bulk filings or compliance verification, book a consultation →
        </a>
      </div>
    </div>
  );
};

export default EWayEligibilityChecker;
