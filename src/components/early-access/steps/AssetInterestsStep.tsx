import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { motion } from "framer-motion";
import { EarlyAccessFormData, assetTypes } from "@/types/earlyAccess";

interface AssetInterestsStepProps {
  formData: EarlyAccessFormData;
  toggleArrayField: <K extends keyof EarlyAccessFormData>(field: K, value: string) => void;
  updateField: <K extends keyof EarlyAccessFormData>(field: K, value: EarlyAccessFormData[K]) => void;
  onNext: () => void;
  onBack: () => void;
  requiresOtherRwaDescription: boolean;
}

export function AssetInterestsStep({ formData, toggleArrayField, updateField, onNext, onBack, requiresOtherRwaDescription }: AssetInterestsStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-light text-white mb-2">
          Asset interests
        </h2>
        <p className="text-white/60">
          What asset types are you interested in? (select all that apply)
        </p>
      </div>

      <div className="space-y-4">
        {/* Asset Types */}
        <div className="space-y-2">
          {assetTypes.map((asset) => {
            const isSelected = formData.assetInterests.includes(asset.id);
            return (
              <motion.button
                key={asset.id}
                type="button"
                onClick={() => toggleArrayField('assetInterests', asset.id)}
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
                {asset.label}
              </motion.button>
            );
          })}
        </div>

        {/* Other RWAs description (conditional) */}
        {requiresOtherRwaDescription && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-2 pt-4"
          >
            <Label htmlFor="otherRwa" className="text-white/80 text-sm font-medium">
              Which other RWAs interest you?
            </Label>
            <Input
              id="otherRwa"
              type="text"
              placeholder="e.g., Art, Wine, Watches, etc."
              value={formData.otherRwaDescription}
              onChange={(e) => updateField('otherRwaDescription', e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 rounded-xl focus:border-violet-500/50 focus:ring-violet-500/20"
            />
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
