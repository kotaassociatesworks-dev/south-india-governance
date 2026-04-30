import { useMemo, useState } from "react";
import { AlertTriangle } from "lucide-react";

type Scenario = "no_ewb" | "expired" | "vehicle_mismatch" | "value_understate" | "goods_not_covered";

const scenarios: { id: Scenario; label: string; section: "129" | "122" }[] = [
  { id: "no_ewb",            label: "No E-Way Bill generated",                section: "129" },
  { id: "expired",           label: "Expired E-Way Bill at checkpoint",       section: "129" },
  { id: "vehicle_mismatch",  label: "Vehicle number mismatch",                section: "129" },
  { id: "value_understate",  label: "Invoice value understatement",           section: "122" },
  { id: "goods_not_covered", label: "Goods not covered in E-Way Bill",        section: "122" },
];

const EWayPenaltyEstimator = () => {
  const [tax, setTax] = useState(18000);
  const [goodsValue, setGoodsValue] = useState(100000);
  const [scenario, setScenario] = useState<Scenario>("no_ewb");

  const result = useMemo(() => {
    const sc = scenarios.find((s) => s.id === scenario)!;
    if (sc.section === "129") {
      const penalty = Math.max(10000, tax);
      return {
        section: "Section 129 CGST",
        penalty,
        formula: "max(₹10,000, 100% of tax amount)",
        detain: true,
      };
    }
    const penalty = Math.max(10000, 0.5 * (goodsValue + tax));
    return {
      section: "Section 122 CGST",
      penalty,
      formula: "max(₹10,000, 50% of goods value + tax)",
      detain: false,
    };
  }, [tax, goodsValue, scenario]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-5">
        <div>
          <label className="label-clean">Tax Amount on Consignment (₹)</label>
          <input type="number" min={0} className="input-clean" value={tax} onChange={(e) => setTax(+e.target.value || 0)} />
          <p className="text-xs text-muted-foreground mt-1">CGST + SGST or IGST applicable on goods.</p>
        </div>
        <div>
          <label className="label-clean">Goods Value (₹) — for Sec 122 calculations</label>
          <input type="number" min={0} className="input-clean" value={goodsValue} onChange={(e) => setGoodsValue(+e.target.value || 0)} />
        </div>
        <div>
          <label className="label-clean">Penalty Scenario</label>
          <select className="input-clean" value={scenario} onChange={(e) => setScenario(e.target.value as Scenario)}>
            {scenarios.map((s) => (
              <option key={s.id} value={s.id}>{s.label} (Sec {s.section})</option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded p-6 bg-destructive/10 border border-destructive/40">
        <div className="flex items-start gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-destructive shrink-0" />
          <h3 className="font-heading text-xl text-foreground">{result.section}</h3>
        </div>
        <div className="bg-card/60 rounded p-4 mb-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Estimated Minimum Penalty</p>
          <p className="font-heading text-3xl text-destructive">₹{Math.round(result.penalty).toLocaleString("en-IN")}</p>
          <p className="text-xs text-muted-foreground mt-1">Formula: {result.formula}</p>
        </div>
        {result.detain && (
          <p className="text-sm text-foreground/80 mb-3">⚠ Vehicle and goods may be <strong>detained</strong> until penalty and tax are paid.</p>
        )}
        <p className="text-xs text-muted-foreground">
          These are minimum penalties. Repeat violations can attract prosecution under Section 132 CGST.
        </p>
      </div>
    </div>
  );
};

export default EWayPenaltyEstimator;
