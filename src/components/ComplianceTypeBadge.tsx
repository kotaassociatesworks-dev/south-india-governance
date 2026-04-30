import type { LucideIcon } from "lucide-react";

const ComplianceTypeBadge = ({ icon: Icon, label }: { icon?: LucideIcon; label: string }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 border border-accent/30 rounded-full text-xs font-medium text-accent">
    {Icon && <Icon className="w-3.5 h-3.5" />} {label}
  </span>
);

export default ComplianceTypeBadge;
