import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { motion } from "framer-motion";
import { EarlyAccessFormData, annualIncomeOptions, investableCapitalOptions } from "@/types/earlyAccess";

interface FinancialProfileStepProps {
  formData: EarlyAccessFormData;
  updateField: <K extends keyof EarlyAccessFormData>(field: K, value: EarlyAccessFormData[K]) => void;
  onNext: () => void;
  onBack: () => void;
}

export function FinancialProfileStep({ formData, updateField, onNext, onBack }: FinancialProfileStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-light text-white mb-2">
          Financial profile
        </h2>
        <p className="text-white/60">
          Help us understand your investment capacity
        </p>
      </div>

      <div className="space-y-6">
        {/* Annual Income */}
        <div className="space-y-3">
          <Label className="text-white/80 text-sm font-medium">
            Annual income (USD or EUR equivalent)
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {annualIncomeOptions.map((option) => {
              const isSelected = formData.annualIncome === option.value;
              return (
                <motion.button
                  key={option.value}
                  type="button"
                  onClick={() => updateField('annualIncome', option.value)}
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

        {/* Investable Capital */}
        <div className="space-y-3">
          <Label className="text-white/80 text-sm font-medium">
            Investable capital available for alternatives
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {investableCapitalOptions.map((option) => {
              const isSelected = formData.investableCapital === option.value;
              return (
                <motion.button
                  key={option.value}
                  type="button"
                  onClick={() => updateField('investableCapital', option.value)}
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
