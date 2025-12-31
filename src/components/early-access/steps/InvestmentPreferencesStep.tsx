import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { motion } from "framer-motion";
import { 
  EarlyAccessFormData, 
  investmentAmountOptions, 
  ticketSizeOptions, 
  investmentHorizonOptions,
  investmentPriorityOptions 
} from "@/types/earlyAccess";

interface InvestmentPreferencesStepProps {
  formData: EarlyAccessFormData;
  updateField: <K extends keyof EarlyAccessFormData>(field: K, value: EarlyAccessFormData[K]) => void;
  toggleArrayField: <K extends keyof EarlyAccessFormData>(field: K, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function InvestmentPreferencesStep({ formData, updateField, toggleArrayField, onNext, onBack }: InvestmentPreferencesStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-light text-white mb-2">
          Investment preferences
        </h2>
        <p className="text-white/60">
          Tell us about your investment goals
        </p>
      </div>

      <div className="space-y-6">
        {/* Investment Amount 3-6 months */}
        <div className="space-y-3">
          <Label className="text-white/80 text-sm font-medium">
            How much are you looking to invest in the next 3–6 months?
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {investmentAmountOptions.map((option) => {
              const isSelected = formData.investmentAmount3to6Months === option.value;
              return (
                <motion.button
                  key={option.value}
                  type="button"
                  onClick={() => updateField('investmentAmount3to6Months', option.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border ${
                    isSelected
                      ? "bg-violet-500/20 border-violet-500/50 text-white"
                      : "bg-white/5 border-white/10 text-white/70 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2"
                    >
                      <Check className="w-3.5 h-3.5 text-violet-400" />
                    </motion.span>
                  )}
                  {option.label}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Preferred Ticket Size */}
        <div className="space-y-3">
          <Label className="text-white/80 text-sm font-medium">
            Preferred ticket size per deal
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {ticketSizeOptions.map((option) => {
              const isSelected = formData.preferredTicketSize === option.value;
              return (
                <motion.button
                  key={option.value}
                  type="button"
                  onClick={() => updateField('preferredTicketSize', option.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border ${
                    isSelected
                      ? "bg-violet-500/20 border-violet-500/50 text-white"
                      : "bg-white/5 border-white/10 text-white/70 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2"
                    >
                      <Check className="w-3.5 h-3.5 text-violet-400" />
                    </motion.span>
                  )}
                  {option.label}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Investment Horizon */}
        <div className="space-y-3">
          <Label className="text-white/80 text-sm font-medium">
            Investment horizon
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {investmentHorizonOptions.map((option) => {
              const isSelected = formData.investmentHorizon === option.value;
              return (
                <motion.button
                  key={option.value}
                  type="button"
                  onClick={() => updateField('investmentHorizon', option.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border ${
                    isSelected
                      ? "bg-violet-500/20 border-violet-500/50 text-white"
                      : "bg-white/5 border-white/10 text-white/70 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2"
                    >
                      <Check className="w-3.5 h-3.5 text-violet-400" />
                    </motion.span>
                  )}
                  {option.label}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Investment Priorities (Multi-select) */}
        <div className="space-y-3">
          <Label className="text-white/80 text-sm font-medium">
            What matters most? (select all that apply)
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {investmentPriorityOptions.map((option) => {
              const isSelected = formData.investmentPriorities.includes(option.value);
              return (
                <motion.button
                  key={option.value}
                  type="button"
                  onClick={() => toggleArrayField('investmentPriorities', option.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border text-left ${
                    isSelected
                      ? "bg-violet-500/20 border-violet-500/50 text-white"
                      : "bg-white/5 border-white/10 text-white/70 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2"
                    >
                      <Check className="w-3.5 h-3.5 text-violet-400" />
                    </motion.span>
                  )}
                  {option.label}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-white/60 hover:text-white hover:bg-white/5"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={onNext}
          className="bg-white text-slate-900 hover:bg-white/90 rounded-full px-6"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
