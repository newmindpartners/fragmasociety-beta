import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { EarlyAccessFormData } from "@/types/earlyAccess";

interface ComplianceStepProps {
  formData: EarlyAccessFormData;
  updateField: <K extends keyof EarlyAccessFormData>(field: K, value: EarlyAccessFormData[K]) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ComplianceStep({ formData, updateField, onNext, onBack }: ComplianceStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-light text-white mb-2">
          Compliance checks
        </h2>
        <p className="text-white/60">
          Required regulatory questions
        </p>
      </div>

      <div className="space-y-8">
        {/* PEP Question */}
        <div className="space-y-3">
          <Label className="text-white/80 text-sm font-medium">
            Are you a Politically Exposed Person (PEP) or closely related to one?
          </Label>
          <p className="text-xs text-white/40">
            We may ask for enhanced checks if yes.
          </p>
          <div className="flex gap-3">
            {[
              { value: true, label: 'Yes' },
              { value: false, label: 'No' },
            ].map((option) => {
              const isSelected = formData.isPep === option.value;
              return (
                <motion.button
                  key={String(option.value)}
                  type="button"
                  onClick={() => updateField('isPep', option.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border ${
                    isSelected
                      ? "bg-violet-500/20 border-violet-500/50 text-white"
                      : "bg-white/5 border-white/10 text-white/70 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {option.label}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Sanctions Question */}
        <div className="space-y-3">
          <Label className="text-white/80 text-sm font-medium">
            Are you subject to sanctions / located in a sanctioned jurisdiction?
          </Label>
          <div className="flex gap-3">
            {[
              { value: true, label: 'Yes' },
              { value: false, label: 'No' },
            ].map((option) => {
              const isSelected = formData.isSanctioned === option.value;
              return (
                <motion.button
                  key={String(option.value)}
                  type="button"
                  onClick={() => updateField('isSanctioned', option.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border ${
                    isSelected
                      ? "bg-violet-500/20 border-violet-500/50 text-white"
                      : "bg-white/5 border-white/10 text-white/70 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {option.label}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Warning for sanctions */}
        {formData.isSanctioned && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30"
          >
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-200/80">
              Your application will require additional review. We will contact you with next steps.
            </p>
          </motion.div>
        )}
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
