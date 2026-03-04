import { Check } from "lucide-react";

const StepProgressBar = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const done = currentStep > stepNum;
        const active = currentStep === stepNum;
        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                  done
                    ? "bg-accent border-accent text-accent-foreground"
                    : active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground"
                }`}
              >
                {done ? <Check className="w-5 h-5" /> : stepNum}
              </div>
              <span
                className={`text-xs mt-2 font-medium whitespace-nowrap ${
                  active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-12 sm:w-20 h-0.5 mx-1 mt-[-1rem] ${
                  currentStep > stepNum ? "bg-accent" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepProgressBar;
