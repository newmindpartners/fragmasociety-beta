import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { motion, AnimatePresence } from "framer-motion";
import { useEarlyAccessForm } from "@/hooks/useEarlyAccessForm";
import { WelcomeStep } from "./steps/WelcomeStep";
import { IdentityStep } from "./steps/IdentityStep";
import { InvestorProfileStep } from "./steps/InvestorProfileStep";
import { InvestorDetailsStep } from "./steps/InvestorDetailsStep";
import { FinancialProfileStep } from "./steps/FinancialProfileStep";
import { ComplianceStep } from "./steps/ComplianceStep";
import { InvestmentPreferencesStep } from "./steps/InvestmentPreferencesStep";
import { AssetInterestsStep } from "./steps/AssetInterestsStep";
import { ContactStep } from "./steps/ContactStep";
import { AuthStep } from "./steps/AuthStep";
import { ThankYouStep } from "./steps/ThankYouStep";
import { FormProgress } from "./FormProgress";
import { toast } from "sonner";

interface EarlyAccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EarlyAccessModal({ open, onOpenChange }: EarlyAccessModalProps) {
  const form = useEarlyAccessForm();

  const handleClose = () => {
    onOpenChange(false);
    // Reset form after a delay to avoid visual glitch
    setTimeout(() => form.resetForm(), 300);
  };

  const handleNext = async () => {
    if (form.currentStep === 'welcome') {
      form.goNext();
      return;
    }

    if (!form.validateCurrentStep()) return;

    if (form.currentStep === 'contact') {
      const success = await form.submitForm();
      if (success) {
        form.goNext();
      }
    } else if (form.currentStep === 'auth') {
      // Only try to send email if Clerk is available (user actually authenticated)
      const isClerkAvailable = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
      if (isClerkAvailable) {
        console.log('User signed in, triggering confirmation email...');
        const emailResult = await form.sendConfirmationEmail();
        if (!emailResult.success) {
          console.error('Email failed:', emailResult.error);
          // Don't show error to user - registration was successful, email is just a nice-to-have
          console.warn('Email confirmation skipped - will be handled manually');
        }
      }
      form.goNext();
    } else {
      form.goNext();
    }
  };

  const renderStep = () => {
    const stepProps = {
      formData: form.formData,
      updateField: form.updateField,
      toggleArrayField: form.toggleArrayField,
      onNext: handleNext,
      onBack: form.goBack,
      isSubmitting: form.isSubmitting,
    };

    switch (form.currentStep) {
      case 'welcome':
        return <WelcomeStep onStart={handleNext} />;
      case 'identity':
        return <IdentityStep {...stepProps} />;
      case 'investor_profile':
        return <InvestorProfileStep {...stepProps} requiresEntityName={form.requiresEntityName} />;
      case 'investor_details':
        return <InvestorDetailsStep {...stepProps} />;
      case 'financial_profile':
        return <FinancialProfileStep {...stepProps} />;
      case 'compliance':
        return <ComplianceStep {...stepProps} />;
      case 'investment_preferences':
        return <InvestmentPreferencesStep {...stepProps} />;
      case 'asset_interests':
        return <AssetInterestsStep {...stepProps} requiresOtherRwaDescription={form.requiresOtherRwaDescription} />;
      case 'contact':
        return <ContactStep {...stepProps} requiresPhoneNumber={form.requiresPhoneNumber} />;
      case 'auth':
        return <AuthStep email={form.formData.email} onNext={handleNext} />;
      case 'thank_you':
        return <ThankYouStep onClose={handleClose} />;
      default:
        return null;
    }
  };

  const showProgress = form.currentStep !== 'welcome' && form.currentStep !== 'thank_you';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-950 border-white/10 p-0"
        hideClose={form.currentStep === 'welcome' || form.currentStep === 'thank_you'}
        aria-describedby={undefined}
      >
        <VisuallyHidden>
          <DialogTitle>Early Access Registration</DialogTitle>
          <DialogDescription>Register for early access to Fragma Society</DialogDescription>
        </VisuallyHidden>
        
        {showProgress && (
          <FormProgress progress={form.progress} currentStep={form.currentStep} />
        )}
        
        <AnimatePresence mode="wait">
          <motion.div
            key={form.currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="p-6 md:p-8"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
