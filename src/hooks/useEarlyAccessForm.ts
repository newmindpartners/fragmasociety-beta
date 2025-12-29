import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  EarlyAccessFormData, 
  initialFormData, 
  FormStep,
  computeTags 
} from '@/types/earlyAccess';

export function useEarlyAccessForm() {
  const [formData, setFormData] = useState<EarlyAccessFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState<FormStep>('welcome');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = useCallback(<K extends keyof EarlyAccessFormData>(
    field: K, 
    value: EarlyAccessFormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const toggleArrayField = useCallback(<K extends keyof EarlyAccessFormData>(
    field: K,
    value: string
  ) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(v => v !== value)
        : [...currentArray, value];
      return { ...prev, [field]: newArray };
    });
  }, []);

  const getNextStep = useCallback((): FormStep => {
    switch (currentStep) {
      case 'welcome':
        return 'identity';
      case 'identity':
        return 'investor_profile';
      case 'investor_profile':
        return 'investor_details';
      case 'investor_details':
        return 'financial_profile';
      case 'financial_profile':
        return 'compliance';
      case 'compliance':
        return 'investment_preferences';
      case 'investment_preferences':
        return 'asset_interests';
      case 'asset_interests':
        return 'contact';
      case 'contact':
        return 'thank_you';
      default:
        return 'thank_you';
    }
  }, [currentStep]);

  const getPreviousStep = useCallback((): FormStep => {
    switch (currentStep) {
      case 'identity':
        return 'welcome';
      case 'investor_profile':
        return 'identity';
      case 'investor_details':
        return 'investor_profile';
      case 'financial_profile':
        return 'investor_details';
      case 'compliance':
        return 'financial_profile';
      case 'investment_preferences':
        return 'compliance';
      case 'asset_interests':
        return 'investment_preferences';
      case 'contact':
        return 'asset_interests';
      default:
        return 'welcome';
    }
  }, [currentStep]);

  const goNext = useCallback(() => {
    setCurrentStep(getNextStep());
  }, [getNextStep]);

  const goBack = useCallback(() => {
    setCurrentStep(getPreviousStep());
  }, [getPreviousStep]);

  const goToStep = useCallback((step: FormStep) => {
    setCurrentStep(step);
  }, []);

  const validateCurrentStep = useCallback((): boolean => {
    switch (currentStep) {
      case 'identity':
        if (!formData.fullName.trim()) {
          toast.error('Please enter your full name');
          return false;
        }
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          toast.error('Please enter a valid email address');
          return false;
        }
        if (!formData.country) {
          toast.error('Please select your country of residence');
          return false;
        }
        return true;

      case 'investor_profile':
        if (!formData.registeringAs) {
          toast.error('Please select how you are registering');
          return false;
        }
        if ((formData.registeringAs === 'company_spv' || formData.registeringAs === 'fund_asset_manager') && !formData.entityName.trim()) {
          toast.error('Please enter your entity name');
          return false;
        }
        if (formData.isUsPerson === null) {
          toast.error('Please indicate if you are a US Person');
          return false;
        }
        if (!formData.investorStatus) {
          toast.error('Please select your investor status');
          return false;
        }
        return true;

      case 'investor_details':
        // EU Professional needs to answer qualification questions
        if (formData.investorStatus === 'professional_eu' || formData.investorStatus === 'not_sure') {
          if (formData.euProfessionalQualifications.length === 0) {
            toast.error('Please select at least one option for EU professional qualifications');
            return false;
          }
          if (!formData.euQualificationsCount && !formData.euProfessionalQualifications.includes('none')) {
            toast.error('Please indicate how many qualifications apply');
            return false;
          }
        }
        // US Accredited needs to answer qualification questions
        if (formData.investorStatus === 'accredited_us' || formData.investorStatus === 'not_sure') {
          if (formData.usAccreditedQualifications.length === 0) {
            toast.error('Please select at least one option for US accredited qualifications');
            return false;
          }
        }
        return true;

      case 'financial_profile':
        if (!formData.annualIncome) {
          toast.error('Please select your annual income range');
          return false;
        }
        if (!formData.investableCapital) {
          toast.error('Please select your investable capital range');
          return false;
        }
        return true;

      case 'compliance':
        if (formData.isPep === null) {
          toast.error('Please answer the PEP question');
          return false;
        }
        if (formData.isSanctioned === null) {
          toast.error('Please answer the sanctions question');
          return false;
        }
        return true;

      case 'investment_preferences':
        if (!formData.investmentAmount3to6Months) {
          toast.error('Please select your planned investment amount');
          return false;
        }
        if (!formData.preferredTicketSize) {
          toast.error('Please select your preferred ticket size');
          return false;
        }
        if (!formData.investmentHorizon) {
          toast.error('Please select your investment horizon');
          return false;
        }
        if (formData.investmentPriorities.length === 0) {
          toast.error('Please select at least one investment priority');
          return false;
        }
        return true;

      case 'asset_interests':
        if (formData.assetInterests.length === 0) {
          toast.error('Please select at least one asset type');
          return false;
        }
        if (formData.assetInterests.includes('other_rwas') && !formData.otherRwaDescription.trim()) {
          toast.error('Please describe the other RWAs you are interested in');
          return false;
        }
        return true;

      case 'contact':
        if (!formData.preferredContactChannel) {
          toast.error('Please select your preferred contact channel');
          return false;
        }
        if ((formData.preferredContactChannel === 'whatsapp' || formData.preferredContactChannel === 'phone') && !formData.phoneWhatsappNumber.trim()) {
          toast.error('Please enter your phone/WhatsApp number');
          return false;
        }
        if (!formData.consentToContact) {
          toast.error('Please provide consent to be contacted');
          return false;
        }
        return true;

      default:
        return true;
    }
  }, [currentStep, formData]);

  const submitForm = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const tags = computeTags(formData);

      const { error } = await supabase
        .from('early_access_submissions')
        .insert({
          full_name: formData.fullName,
          email: formData.email,
          country: formData.country,
          registering_as: formData.registeringAs,
          entity_name: formData.entityName || null,
          is_us_person: formData.isUsPerson,
          investor_status: formData.investorStatus,
          eu_professional_qualifications: formData.euProfessionalQualifications.length > 0 ? formData.euProfessionalQualifications : null,
          eu_qualifications_count: formData.euQualificationsCount || null,
          us_accredited_qualifications: formData.usAccreditedQualifications.length > 0 ? formData.usAccreditedQualifications : null,
          annual_income: formData.annualIncome,
          investable_capital: formData.investableCapital,
          is_pep: formData.isPep,
          is_sanctioned: formData.isSanctioned,
          investment_amount_3_6_months: formData.investmentAmount3to6Months,
          preferred_ticket_size: formData.preferredTicketSize,
          investment_horizon: formData.investmentHorizon,
          investment_priorities: formData.investmentPriorities,
          asset_interests: formData.assetInterests,
          other_rwa_description: formData.otherRwaDescription || null,
          preferred_contact_channel: formData.preferredContactChannel,
          phone_whatsapp_number: formData.phoneWhatsappNumber || null,
          consent_to_contact: formData.consentToContact,
          marketing_consent: formData.marketingConsent,
          tags: tags,
        });

      if (error) {
        console.error('Submission error:', error);
        toast.error('Something went wrong. Please try again.');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Something went wrong. Please try again.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setCurrentStep('welcome');
  }, []);

  // Check if we should show investor details step
  const shouldShowInvestorDetails = 
    formData.investorStatus === 'professional_eu' || 
    formData.investorStatus === 'accredited_us' || 
    formData.investorStatus === 'not_sure';

  // Check if entity name is required
  const requiresEntityName = 
    formData.registeringAs === 'company_spv' || 
    formData.registeringAs === 'fund_asset_manager';

  // Check if phone/whatsapp is required
  const requiresPhoneNumber = 
    formData.preferredContactChannel === 'whatsapp' || 
    formData.preferredContactChannel === 'phone';

  // Check if other RWAs description is needed
  const requiresOtherRwaDescription = formData.assetInterests.includes('other_rwas');

  // Calculate progress
  const steps: FormStep[] = [
    'welcome', 'identity', 'investor_profile', 'investor_details', 
    'financial_profile', 'compliance', 'investment_preferences', 
    'asset_interests', 'contact', 'thank_you'
  ];
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = Math.round((currentStepIndex / (steps.length - 1)) * 100);

  return {
    formData,
    currentStep,
    isSubmitting,
    progress,
    updateField,
    toggleArrayField,
    goNext,
    goBack,
    goToStep,
    validateCurrentStep,
    submitForm,
    resetForm,
    shouldShowInvestorDetails,
    requiresEntityName,
    requiresPhoneNumber,
    requiresOtherRwaDescription,
  };
}
