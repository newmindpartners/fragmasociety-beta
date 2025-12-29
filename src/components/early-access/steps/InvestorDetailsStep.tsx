import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { motion } from "framer-motion";
import { EarlyAccessFormData, euProfessionalOptions, usAccreditedOptions } from "@/types/earlyAccess";

interface InvestorDetailsStepProps {
  formData: EarlyAccessFormData;
  updateField: <K extends keyof EarlyAccessFormData>(field: K, value: EarlyAccessFormData[K]) => void;
  toggleArrayField: <K extends keyof EarlyAccessFormData>(field: K, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function InvestorDetailsStep({ formData, updateField, toggleArrayField, onNext, onBack }: InvestorDetailsStepProps) {
  const showEuQuestions = formData.investorStatus === 'professional_eu' || formData.investorStatus === 'not_sure';
  const showUsQuestions = formData.investorStatus === 'accredited_us' || formData.investorStatus === 'not_sure';

  // If neither applies, skip this step
  if (!showEuQuestions && !showUsQuestions) {
    onNext();
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-light text-white mb-2">
          Investor classification
        </h2>
        <p className="text-white/60">
          Help us verify your investor status
        </p>
      </div>

      <div className="space-y-8">
        {/* EU Professional Questions */}
        {showEuQuestions && (
          <div className="space-y-4">
            <div className="space-y-3">
              <Label className="text-white/80 text-sm font-medium">
                Professional investor (EU) – which applies?
              </Label>
              <div className="space-y-2">
                {euProfessionalOptions.map((option) => {
                  const isSelected = formData.euProfessionalQualifications.includes(option.value);
                  return (
                    <motion.button
                      key={option.value}
                      type="button"
                      onClick={() => toggleArrayField('euProfessionalQualifications', option.value)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`relative w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border text-left ${
                        isSelected
                          ? "bg-violet-500/20 border-violet-500/50 text-white"
                          : "bg-white/5 border-white/10 text-white/70 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {isSelected && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-1/2 -translate-y-1/2 right-3"
                        >
                          <Check className="w-4 h-4 text-violet-400" />
                        </motion.span>
                      )}
                      {option.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* How many apply */}
            {formData.euProfessionalQualifications.length > 0 && !formData.euProfessionalQualifications.includes('none') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-3"
              >
                <Label className="text-white/80 text-sm font-medium">
                  How many of the above apply?
                </Label>
                <div className="flex gap-3">
                  {[
                    { value: '0-1', label: '0–1' },
                    { value: '2', label: '2' },
                    { value: '3', label: '3' },
                  ].map((option) => {
                    const isSelected = formData.euQualificationsCount === option.value;
                    return (
                      <motion.button
                        key={option.value}
                        type="button"
                        onClick={() => updateField('euQualificationsCount', option.value as EarlyAccessFormData['euQualificationsCount'])}
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
              </motion.div>
            )}
          </div>
        )}

        {/* US Accredited Questions */}
        {showUsQuestions && (
          <div className="space-y-3">
            <Label className="text-white/80 text-sm font-medium">
              Accredited investor (US) – which applies?
            </Label>
            <div className="space-y-2">
              {usAccreditedOptions.map((option) => {
                const isSelected = formData.usAccreditedQualifications.includes(option.value);
                return (
                  <motion.button
                    key={option.value}
                    type="button"
                    onClick={() => toggleArrayField('usAccreditedQualifications', option.value)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`relative w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border text-left ${
                      isSelected
                        ? "bg-violet-500/20 border-violet-500/50 text-white"
                        : "bg-white/5 border-white/10 text-white/70 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-1/2 -translate-y-1/2 right-3"
                      >
                        <Check className="w-4 h-4 text-violet-400" />
                      </motion.span>
                    )}
                    {option.label}
                  </motion.button>
                );
              })}
            </div>
          </div>
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
          className="bg-violet-600 hover:bg-violet-500 text-white rounded-full px-6"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
