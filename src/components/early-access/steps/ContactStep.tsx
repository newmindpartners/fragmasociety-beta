import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { motion } from "framer-motion";
import { EarlyAccessFormData, contactChannelOptions } from "@/types/earlyAccess";

interface ContactStepProps {
  formData: EarlyAccessFormData;
  updateField: <K extends keyof EarlyAccessFormData>(field: K, value: EarlyAccessFormData[K]) => void;
  onNext: () => void;
  onBack: () => void;
  isSubmitting: boolean;
  requiresPhoneNumber: boolean;
}

export function ContactStep({ formData, updateField, onNext, onBack, isSubmitting, requiresPhoneNumber }: ContactStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-light text-white mb-2">
          How can we reach you?
        </h2>
        <p className="text-white/60">
          Contact preferences & consent
        </p>
      </div>

      <div className="space-y-6">
        {/* Preferred Contact Channel */}
        <div className="space-y-3">
          <Label className="text-white/80 text-sm font-medium">
            Preferred contact channel
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {contactChannelOptions.map((option) => {
              const isSelected = formData.preferredContactChannel === option.value;
              return (
                <motion.button
                  key={option.value}
                  type="button"
                  onClick={() => updateField('preferredContactChannel', option.value)}
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

        {/* Phone / WhatsApp Number (conditional) */}
        {requiresPhoneNumber && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-2"
          >
            <Label htmlFor="phone" className="text-white/80 text-sm font-medium">
              Phone / WhatsApp number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.phoneWhatsappNumber}
              onChange={(e) => updateField('phoneWhatsappNumber', e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 rounded-xl focus:border-violet-500/50 focus:ring-violet-500/20"
            />
          </motion.div>
        )}

        {/* Consent Checkboxes */}
        <div className="space-y-4 pt-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="consent"
              checked={formData.consentToContact}
              onCheckedChange={(checked) => updateField('consentToContact', checked === true)}
              className="mt-1 border-white/20 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
            />
            <Label htmlFor="consent" className="text-sm text-white/70 cursor-pointer leading-relaxed">
              I consent to be contacted about eligibility, access, and investment opportunities.
            </Label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="marketing"
              checked={formData.marketingConsent}
              onCheckedChange={(checked) => updateField('marketingConsent', checked === true)}
              className="mt-1 border-white/20 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
            />
            <Label htmlFor="marketing" className="text-sm text-white/70 cursor-pointer leading-relaxed">
              I agree to receive updates and marketing communications. (optional)
            </Label>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6">
        <Button
          variant="ghost"
          onClick={onBack}
          disabled={isSubmitting}
          className="text-white/60 hover:text-white hover:bg-white/5"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={isSubmitting}
          className="bg-white text-slate-900 hover:bg-white/90 rounded-full px-8"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-slate-900/20 border-t-slate-900 rounded-full"
              />
              Submitting...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Submit
              <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
