import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { motion } from "framer-motion";
import { EarlyAccessFormData, registeringAsOptions, investorStatusOptions } from "@/types/earlyAccess";

interface InvestorProfileStepProps {
  formData: EarlyAccessFormData;
  updateField: <K extends keyof EarlyAccessFormData>(field: K, value: EarlyAccessFormData[K]) => void;
  onNext: () => void;
  onBack: () => void;
  requiresEntityName: boolean;
}

export function InvestorProfileStep({ formData, updateField, onNext, onBack, requiresEntityName }: InvestorProfileStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-light text-white mb-2">
          Your investor profile
        </h2>
        <p className="text-white/60">
          Help us understand your investment setup
        </p>
      </div>

      <div className="space-y-6">
        {/* Registering As */}
        <div className="space-y-3">
          <Label className="text-white/80 text-sm font-medium">
            Are you registering as...
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {registeringAsOptions.map((option) => {
              const isSelected = formData.registeringAs === option.value;
              return (
                <motion.button
                  key={option.value}
                  type="button"
                  onClick={() => updateField('registeringAs', option.value as EarlyAccessFormData['registeringAs'])}
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

        {/* Entity Name (conditional) */}
        {requiresEntityName && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <Label htmlFor="entityName" className="text-white/80 text-sm font-medium">
              Entity name
            </Label>
            <Input
              id="entityName"
              type="text"
              placeholder="Your company or fund name"
              value={formData.entityName}
              onChange={(e) => updateField('entityName', e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 rounded-xl focus:border-violet-500/50 focus:ring-violet-500/20"
            />
          </motion.div>
        )}

        {/* US Person */}
        <div className="space-y-3">
          <Label className="text-white/80 text-sm font-medium">
            Are you a "US Person" for tax/regulatory purposes?
          </Label>
          <p className="text-xs text-white/40">
            Includes US citizens, green card holders, US residents, or US entities.
          </p>
          <div className="flex gap-3">
            {[
              { value: true, label: 'Yes' },
              { value: false, label: 'No' },
            ].map((option) => {
              const isSelected = formData.isUsPerson === option.value;
              return (
                <motion.button
                  key={String(option.value)}
                  type="button"
                  onClick={() => updateField('isUsPerson', option.value)}
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

        {/* Investor Status */}
        <div className="space-y-3">
          <Label className="text-white/80 text-sm font-medium">
            Which best describes your investor status today?
          </Label>
          <div className="space-y-2">
            {investorStatusOptions.map((option) => {
              const isSelected = formData.investorStatus === option.value;
              return (
                <motion.button
                  key={option.value}
                  type="button"
                  onClick={() => updateField('investorStatus', option.value as EarlyAccessFormData['investorStatus'])}
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
