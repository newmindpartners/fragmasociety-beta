import { FormStep } from "@/types/earlyAccess";

interface FormProgressProps {
  progress: number;
  currentStep: FormStep;
}

const stepLabels: Record<FormStep, string> = {
  welcome: 'Welcome',
  identity: 'Identity',
  investor_profile: 'Investor Profile',
  investor_details: 'Investor Details',
  financial_profile: 'Financial Profile',
  compliance: 'Compliance',
  investment_preferences: 'Investment Preferences',
  asset_interests: 'Asset Interests',
  contact: 'Contact',
  thank_you: 'Complete',
};

export function FormProgress({ progress, currentStep }: FormProgressProps) {
  return (
    <div className="px-6 md:px-8 pt-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-white/60">
          {stepLabels[currentStep]}
        </span>
        <span className="text-xs font-medium text-white/60">
          {progress}%
        </span>
      </div>
      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-violet-500 to-violet-400 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
