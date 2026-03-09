import { Shield, Award, Clock } from "lucide-react";

const TrustBadgeBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-9 bg-gradient-to-r from-[hsl(210,72%,8%)] via-[hsl(210,60%,12%)] to-[hsl(210,72%,8%)] border-b border-accent/20">
      <div className="container mx-auto h-full flex items-center justify-center gap-6 px-4 text-xs tracking-widest uppercase">
        <div className="flex items-center gap-1.5 text-accent/90">
          <Shield className="w-3 h-3" />
          <span>Established 1952</span>
        </div>
        <span className="text-accent/40">·</span>
        <div className="flex items-center gap-1.5 text-accent/90">
          <Clock className="w-3 h-3" />
          <span>70+ Years of Trust</span>
        </div>
        <span className="text-accent/40 hidden sm:inline">·</span>
        <div className="hidden sm:flex items-center gap-1.5 text-accent/90">
          <Award className="w-3 h-3" />
          <span>Trusted by 500+ Businesses</span>
        </div>
      </div>
    </div>
  );
};

export default TrustBadgeBar;
