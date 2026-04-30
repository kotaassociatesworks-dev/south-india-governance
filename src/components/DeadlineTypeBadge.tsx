import { typeColors, type DeadlineType } from "@/data/complianceCalendar";

const DeadlineTypeBadge = ({ type }: { type: DeadlineType }) => {
  const c = typeColors[type];
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  );
};

export default DeadlineTypeBadge;
