/**
 * Jurisdiction Eligibility Rules Engine
 * 
 * Contains country-specific investor eligibility rules for:
 * - EU/EEA member states (27 + 3)
 * - EU-equivalent jurisdictions (CH, UK, MC, LI)
 * - Third country jurisdictions (US, CA, SG, AU, JP, AE, SA, QA)
 */

import { InvestorType, JurisdictionRegion } from '@prisma/client';

// =============================================
// TYPES
// =============================================

export interface JurisdictionRule {
  countryCode: string;
  countryName: string;
  region: JurisdictionRegion;
  
  // Eligibility by investor type
  retailAllowed: boolean;
  professionalAllowed: boolean;
  qualifiedAllowed: boolean;
  accreditedAllowed: boolean;
  wholesaleAllowed: boolean;
  
  // Investment limits (EUR)
  minInvestmentRetail?: number;
  minInvestmentPro?: number;
  maxInvestmentRetail?: number;
  
  // Thresholds for accredited/qualified status
  accreditedCriteria?: {
    income?: number;
    jointIncome?: number;
    netWorth?: number;
    financialAssets?: number;
  };
  
  // Documentation
  requiresProspectus: boolean;
  requiresLocalKID: boolean;
  requiresLocalLanguage: boolean;
  localLanguage?: string;
  
  // Required documents by investor type
  requiredDocuments: {
    retail?: string[];
    professional?: string[];
    accredited?: string[];
    wholesale?: string[];
    qii?: string[];
  };
  
  // Regulatory
  regulatorName?: string;
  regulatorNotification: boolean;
  passportingAllowed: boolean;
  
  // Marketing
  coldCallingAllowed: boolean;
  advertisingAllowed: boolean;
  riskWarningsRequired: boolean;
  coolingOffPeriod?: number;
  marketingRestrictions?: string[];
  
  // Special conditions
  specialRequirements?: string[];
  blockedReasons?: string;
  
  // Sub-jurisdictions
  hasSubJurisdictions: boolean;
  subJurisdictions?: string[];
}

export interface EligibilityResult {
  eligible: boolean;
  investorTypeInJurisdiction: InvestorType | null;
  restrictions: string[];
  requiredDocuments: string[];
  investmentLimits: {
    min?: number;
    max?: number;
  };
  marketingRestrictions: string[];
  reason: string;
}

export interface InvestorProfile {
  countryCode: string;
  investorType: InvestorType;
  totalAssets?: number;
  annualIncome?: number;
  financialAssets?: number;
  professionalStatus?: boolean;
  institutionalInvestor?: boolean;
  isUsPerson?: boolean;
}

// =============================================
// JURISDICTION RULES DATABASE
// =============================================

export const JURISDICTION_RULES: Record<string, JurisdictionRule> = {
  // =============================================
  // EU MEMBER STATES (Full Passport)
  // =============================================
  
  LU: {
    countryCode: 'LU',
    countryName: 'Luxembourg',
    region: 'EU',
    retailAllowed: true,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: true,
    requiresLocalKID: false,
    requiresLocalLanguage: false,
    regulatorName: 'CSSF',
    regulatorNotification: false, // Home jurisdiction
    passportingAllowed: true,
    coldCallingAllowed: true,
    advertisingAllowed: true,
    riskWarningsRequired: true,
    requiredDocuments: {
      retail: ['EU_PROSPECTUS', 'PRIIPS_KID', 'SUITABILITY_QUESTIONNAIRE'],
      professional: ['PPM', 'RISK_DISCLOSURE'],
    },
    hasSubJurisdictions: false,
  },
  
  FR: {
    countryCode: 'FR',
    countryName: 'France',
    region: 'EU',
    retailAllowed: true,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: true,
    requiresLocalKID: false,
    requiresLocalLanguage: true,
    localLanguage: 'fr',
    regulatorName: 'AMF',
    regulatorNotification: true,
    passportingAllowed: true,
    coldCallingAllowed: false,
    advertisingAllowed: true,
    riskWarningsRequired: true,
    marketingRestrictions: ['FINANCIAL_PROMOTION_RULES'],
    requiredDocuments: {
      retail: ['EU_PROSPECTUS', 'PRIIPS_KID', 'SUITABILITY_QUESTIONNAIRE', 'AMF_NOTIFICATION'],
      professional: ['PPM', 'RISK_DISCLOSURE'],
    },
    hasSubJurisdictions: false,
  },
  
  DE: {
    countryCode: 'DE',
    countryName: 'Germany',
    region: 'EU',
    retailAllowed: true,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: true,
    requiresLocalKID: true,
    requiresLocalLanguage: true,
    localLanguage: 'de',
    regulatorName: 'BaFin',
    regulatorNotification: true,
    passportingAllowed: true,
    coldCallingAllowed: false,
    advertisingAllowed: true,
    riskWarningsRequired: true,
    marketingRestrictions: ['STRICT_ADVERTISING', 'GERMAN_LANGUAGE_REQUIRED'],
    requiredDocuments: {
      retail: ['EU_PROSPECTUS', 'GERMAN_KID', 'SUITABILITY_QUESTIONNAIRE', 'BAFIN_NOTIFICATION'],
      professional: ['PPM', 'RISK_DISCLOSURE'],
    },
    hasSubJurisdictions: false,
  },
  
  BE: {
    countryCode: 'BE',
    countryName: 'Belgium',
    region: 'EU',
    retailAllowed: true,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: true,
    requiresLocalKID: false,
    requiresLocalLanguage: false,
    regulatorName: 'FSMA',
    regulatorNotification: true,
    passportingAllowed: true,
    coldCallingAllowed: false,
    advertisingAllowed: true,
    riskWarningsRequired: true,
    requiredDocuments: {
      retail: ['EU_PROSPECTUS', 'PRIIPS_KID', 'SUITABILITY_QUESTIONNAIRE'],
      professional: ['PPM', 'RISK_DISCLOSURE'],
    },
    hasSubJurisdictions: false,
  },
  
  NL: {
    countryCode: 'NL',
    countryName: 'Netherlands',
    region: 'EU',
    retailAllowed: true,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: true,
    requiresLocalKID: false,
    requiresLocalLanguage: false,
    regulatorName: 'AFM',
    regulatorNotification: true,
    passportingAllowed: true,
    coldCallingAllowed: false,
    advertisingAllowed: true,
    riskWarningsRequired: true,
    coolingOffPeriod: 14,
    requiredDocuments: {
      retail: ['EU_PROSPECTUS', 'PRIIPS_KID', 'SUITABILITY_QUESTIONNAIRE', 'AFM_NOTIFICATION'],
      professional: ['PPM', 'RISK_DISCLOSURE'],
    },
    hasSubJurisdictions: false,
  },
  
  IT: {
    countryCode: 'IT',
    countryName: 'Italy',
    region: 'EU',
    retailAllowed: true,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: true,
    requiresLocalKID: false,
    requiresLocalLanguage: true,
    localLanguage: 'it',
    regulatorName: 'CONSOB',
    regulatorNotification: true,
    passportingAllowed: true,
    coldCallingAllowed: false,
    advertisingAllowed: true,
    riskWarningsRequired: true,
    requiredDocuments: {
      retail: ['EU_PROSPECTUS', 'PRIIPS_KID', 'SUITABILITY_QUESTIONNAIRE', 'CONSOB_REGISTRATION'],
      professional: ['PPM', 'RISK_DISCLOSURE'],
    },
    hasSubJurisdictions: false,
  },
  
  ES: {
    countryCode: 'ES',
    countryName: 'Spain',
    region: 'EU',
    retailAllowed: true,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: true,
    requiresLocalKID: false,
    requiresLocalLanguage: true,
    localLanguage: 'es',
    regulatorName: 'CNMV',
    regulatorNotification: true,
    passportingAllowed: true,
    coldCallingAllowed: false,
    advertisingAllowed: true,
    riskWarningsRequired: true,
    marketingRestrictions: ['RISK_CATEGORY_DISCLOSURE'],
    requiredDocuments: {
      retail: ['EU_PROSPECTUS', 'PRIIPS_KID', 'SUITABILITY_QUESTIONNAIRE', 'CNMV_NOTIFICATION'],
      professional: ['PPM', 'RISK_DISCLOSURE'],
    },
    hasSubJurisdictions: false,
  },
  
  PT: {
    countryCode: 'PT',
    countryName: 'Portugal',
    region: 'EU',
    retailAllowed: true,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: true,
    requiresLocalKID: false,
    requiresLocalLanguage: false,
    regulatorName: 'CMVM',
    regulatorNotification: true,
    passportingAllowed: true,
    coldCallingAllowed: false,
    advertisingAllowed: true,
    riskWarningsRequired: true,
    requiredDocuments: {
      retail: ['EU_PROSPECTUS', 'PRIIPS_KID', 'SUITABILITY_QUESTIONNAIRE'],
      professional: ['PPM', 'RISK_DISCLOSURE'],
    },
    hasSubJurisdictions: false,
  },
  
  AT: {
    countryCode: 'AT',
    countryName: 'Austria',
    region: 'EU',
    retailAllowed: true,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: true,
    requiresLocalKID: false,
    requiresLocalLanguage: true,
    localLanguage: 'de',
    regulatorName: 'FMA',
    regulatorNotification: true,
    passportingAllowed: true,
    coldCallingAllowed: false,
    advertisingAllowed: true,
    riskWarningsRequired: true,
    requiredDocuments: {
      retail: ['EU_PROSPECTUS', 'PRIIPS_KID', 'SUITABILITY_QUESTIONNAIRE', 'FMA_NOTIFICATION'],
      professional: ['PPM', 'RISK_DISCLOSURE'],
    },
    hasSubJurisdictions: false,
  },
  
  IE: {
    countryCode: 'IE',
    countryName: 'Ireland',
    region: 'EU',
    retailAllowed: true,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: true,
    requiresLocalKID: false,
    requiresLocalLanguage: false,
    regulatorName: 'CBI',
    regulatorNotification: true,
    passportingAllowed: true,
    coldCallingAllowed: false,
    advertisingAllowed: true,
    riskWarningsRequired: true,
    requiredDocuments: {
      retail: ['EU_PROSPECTUS', 'PRIIPS_KID', 'SUITABILITY_QUESTIONNAIRE'],
      professional: ['PPM', 'RISK_DISCLOSURE'],
    },
    hasSubJurisdictions: false,
  },
  
  PL: {
    countryCode: 'PL',
    countryName: 'Poland',
    region: 'EU',
    retailAllowed: true,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: true,
    requiresLocalKID: false,
    requiresLocalLanguage: true,
    localLanguage: 'pl',
    regulatorName: 'KNF',
    regulatorNotification: true,
    passportingAllowed: true,
    coldCallingAllowed: false,
    advertisingAllowed: true,
    riskWarningsRequired: true,
    requiredDocuments: {
      retail: ['EU_PROSPECTUS', 'PRIIPS_KID', 'SUITABILITY_QUESTIONNAIRE'],
      professional: ['PPM', 'RISK_DISCLOSURE'],
    },
    hasSubJurisdictions: false,
  },
  
  SE: {
    countryCode: 'SE',
    countryName: 'Sweden',
    region: 'EU',
    retailAllowed: true,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: true,
    requiresLocalKID: false,
    requiresLocalLanguage: false,
    regulatorName: 'FI',
    regulatorNotification: true,
    passportingAllowed: true,
    coldCallingAllowed: false,
    advertisingAllowed: true,
    riskWarningsRequired: true,
    requiredDocuments: {
      retail: ['EU_PROSPECTUS', 'PRIIPS_KID', 'SUITABILITY_QUESTIONNAIRE'],
      professional: ['PPM', 'RISK_DISCLOSURE'],
    },
    hasSubJurisdictions: false,
  },
  
  DK: {
    countryCode: 'DK',
    countryName: 'Denmark',
    region: 'EU',
    retailAllowed: true,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: true,
    requiresLocalKID: false,
    requiresLocalLanguage: false,
    regulatorName: 'FSA',
    regulatorNotification: true,
    passportingAllowed: true,
    coldCallingAllowed: false,
    advertisingAllowed: true,
    riskWarningsRequired: true,
    requiredDocuments: {
      retail: ['EU_PROSPECTUS', 'PRIIPS_KID', 'SUITABILITY_QUESTIONNAIRE'],
      professional: ['PPM', 'RISK_DISCLOSURE'],
    },
    hasSubJurisdictions: false,
  },
  
  FI: {
    countryCode: 'FI',
    countryName: 'Finland',
    region: 'EU',
    retailAllowed: true,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: true,
    requiresLocalKID: false,
    requiresLocalLanguage: false,
    regulatorName: 'FIN-FSA',
    regulatorNotification: true,
    passportingAllowed: true,
    coldCallingAllowed: false,
    advertisingAllowed: true,
    riskWarningsRequired: true,
    requiredDocuments: {
      retail: ['EU_PROSPECTUS', 'PRIIPS_KID', 'SUITABILITY_QUESTIONNAIRE'],
      professional: ['PPM', 'RISK_DISCLOSURE'],
    },
    hasSubJurisdictions: false,
  },
  
  GR: {
    countryCode: 'GR',
    countryName: 'Greece',
    region: 'EU',
    retailAllowed: true,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: true,
    requiresLocalKID: false,
    requiresLocalLanguage: true,
    localLanguage: 'el',
    regulatorName: 'HCMC',
    regulatorNotification: true,
    passportingAllowed: true,
    coldCallingAllowed: false,
    advertisingAllowed: true,
    riskWarningsRequired: true,
    requiredDocuments: {
      retail: ['EU_PROSPECTUS', 'PRIIPS_KID', 'SUITABILITY_QUESTIONNAIRE'],
      professional: ['PPM', 'RISK_DISCLOSURE'],
    },
    hasSubJurisdictions: false,
  },
  
  CZ: {
    countryCode: 'CZ',
    countryName: 'Czech Republic',
    region: 'EU',
    retailAllowed: true,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: true,
    requiresLocalKID: false,
    requiresLocalLanguage: false,
    regulatorName: 'CNB',
    regulatorNotification: true,
    passportingAllowed: true,
    coldCallingAllowed: false,
    advertisingAllowed: true,
    riskWarningsRequired: true,
    requiredDocuments: {
      retail: ['EU_PROSPECTUS', 'PRIIPS_KID', 'SUITABILITY_QUESTIONNAIRE'],
      professional: ['PPM', 'RISK_DISCLOSURE'],
    },
    hasSubJurisdictions: false,
  },
  
  HU: {
    countryCode: 'HU',
    countryName: 'Hungary',
    region: 'EU',
    retailAllowed: true,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: true,
    requiresLocalKID: false,
    requiresLocalLanguage: true,
    localLanguage: 'hu',
    regulatorName: 'MNB',
    regulatorNotification: true,
    passportingAllowed: true,
    coldCallingAllowed: false,
    advertisingAllowed: true,
    riskWarningsRequired: true,
    requiredDocuments: {
      retail: ['EU_PROSPECTUS', 'PRIIPS_KID', 'SUITABILITY_QUESTIONNAIRE'],
      professional: ['PPM', 'RISK_DISCLOSURE'],
    },
    hasSubJurisdictions: false,
  },
  
  RO: {
    countryCode: 'RO',
    countryName: 'Romania',
    region: 'EU',
    retailAllowed: true,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: true,
    requiresLocalKID: false,
    requiresLocalLanguage: true,
    localLanguage: 'ro',
    regulatorName: 'ASF',
    regulatorNotification: true,
    passportingAllowed: true,
    coldCallingAllowed: false,
    advertisingAllowed: true,
    riskWarningsRequired: true,
    requiredDocuments: {
      retail: ['EU_PROSPECTUS', 'PRIIPS_KID', 'SUITABILITY_QUESTIONNAIRE'],
      professional: ['PPM', 'RISK_DISCLOSURE'],
    },
    hasSubJurisdictions: false,
  },
  
  BG: {
    countryCode: 'BG',
    countryName: 'Bulgaria',
    region: 'EU',
    retailAllowed: true,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: true,
    requiresLocalKID: false,
    requiresLocalLanguage: true,
    localLanguage: 'bg',
    regulatorName: 'FSC',
    regulatorNotification: true,
    passportingAllowed: true,
    coldCallingAllowed: false,
    advertisingAllowed: true,
    riskWarningsRequired: true,
    requiredDocuments: {
      retail: ['EU_PROSPECTUS', 'PRIIPS_KID', 'SUITABILITY_QUESTIONNAIRE'],
      professional: ['PPM', 'RISK_DISCLOSURE'],
    },
    hasSubJurisdictions: false,
  },
  
  HR: {
    countryCode: 'HR',
    countryName: 'Croatia',
    region: 'EU',
    retailAllowed: true,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: true,
    requiresLocalKID: false,
    requiresLocalLanguage: true,
    localLanguage: 'hr',
    regulatorName: 'HANFA',
    regulatorNotification: true,
    passportingAllowed: true,
    coldCallingAllowed: false,
    advertisingAllowed: true,
    riskWarningsRequired: true,
    requiredDocuments: {
      retail: ['EU_PROSPECTUS', 'PRIIPS_KID', 'SUITABILITY_QUESTIONNAIRE'],
      professional: ['PPM', 'RISK_DISCLOSURE'],
    },
    hasSubJurisdictions: false,
  },
  
  SK: {
    countryCode: 'SK',
    countryName: 'Slovakia',
    region: 'EU',
    retailAllowed: true,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: true,
    requiresLocalKID: false,
    requiresLocalLanguage: false,
    regulatorName: 'NBS',
    regulatorNotification: true,
    passportingAllowed: true,
    coldCallingAllowed: false,
    advertisingAllowed: true,
    riskWarningsRequired: true,
    requiredDocuments: {
      retail: ['EU_PROSPECTUS', 'PRIIPS_KID', 'SUITABILITY_QUESTIONNAIRE'],
      professional: ['PPM', 'RISK_DISCLOSURE'],
    },
    hasSubJurisdictions: false,
  },
  
  SI: {
    countryCode: 'SI',
    countryName: 'Slovenia',
    region: 'EU',
    retailAllowed: true,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: true,
    requiresLocalKID: false,
    requiresLocalLanguage: true,
    localLanguage: 'sl',
    regulatorName: 'ATVP',
    regulatorNotification: true,
    passportingAllowed: true,
    coldCallingAllowed: false,
    advertisingAllowed: true,
    riskWarningsRequired: true,
    requiredDocuments: {
      retail: ['EU_PROSPECTUS', 'PRIIPS_KID', 'SUITABILITY_QUESTIONNAIRE'],
      professional: ['PPM', 'RISK_DISCLOSURE'],
    },
    hasSubJurisdictions: false,
  },
  
  EE: {
    countryCode: 'EE',
    countryName: 'Estonia',
    region: 'EU',
    retailAllowed: true,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: true,
    requiresLocalKID: false,
    requiresLocalLanguage: false,
    regulatorName: 'FSA',
    regulatorNotification: true,
    passportingAllowed: true,
    coldCallingAllowed: false,
    advertisingAllowed: true,
    riskWarningsRequired: true,
    requiredDocuments: {
      retail: ['EU_PROSPECTUS', 'PRIIPS_KID', 'SUITABILITY_QUESTIONNAIRE'],
      professional: ['PPM', 'RISK_DISCLOSURE'],
    },
    hasSubJurisdictions: false,
  },
  
  LV: {
    countryCode: 'LV',
    countryName: 'Latvia',
    region: 'EU',
    retailAllowed: true,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: true,
    requiresLocalKID: false,
    requiresLocalLanguage: false,
    regulatorName: 'FCMC',
    regulatorNotification: true,
    passportingAllowed: true,
    coldCallingAllowed: false,
    advertisingAllowed: true,
    riskWarningsRequired: true,
    requiredDocuments: {
      retail: ['EU_PROSPECTUS', 'PRIIPS_KID', 'SUITABILITY_QUESTIONNAIRE'],
      professional: ['PPM', 'RISK_DISCLOSURE'],
    },
    hasSubJurisdictions: false,
  },
  
  LT: {
    countryCode: 'LT',
    countryName: 'Lithuania',
    region: 'EU',
    retailAllowed: true,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: true,
    requiresLocalKID: false,
    requiresLocalLanguage: false,
    regulatorName: 'BoL',
    regulatorNotification: true,
    passportingAllowed: true,
    coldCallingAllowed: false,
    advertisingAllowed: true,
    riskWarningsRequired: true,
    requiredDocuments: {
      retail: ['EU_PROSPECTUS', 'PRIIPS_KID', 'SUITABILITY_QUESTIONNAIRE'],
      professional: ['PPM', 'RISK_DISCLOSURE'],
    },
    hasSubJurisdictions: false,
  },
  
  CY: {
    countryCode: 'CY',
    countryName: 'Cyprus',
    region: 'EU',
    retailAllowed: true,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: true,
    requiresLocalKID: false,
    requiresLocalLanguage: false,
    regulatorName: 'CySEC',
    regulatorNotification: true,
    passportingAllowed: true,
    coldCallingAllowed: false,
    advertisingAllowed: true,
    riskWarningsRequired: true,
    requiredDocuments: {
      retail: ['EU_PROSPECTUS', 'PRIIPS_KID', 'SUITABILITY_QUESTIONNAIRE'],
      professional: ['PPM', 'RISK_DISCLOSURE'],
    },
    hasSubJurisdictions: false,
  },
  
  MT: {
    countryCode: 'MT',
    countryName: 'Malta',
    region: 'EU',
    retailAllowed: true,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: true,
    requiresLocalKID: false,
    requiresLocalLanguage: false,
    regulatorName: 'MFSA',
    regulatorNotification: true,
    passportingAllowed: true,
    coldCallingAllowed: false,
    advertisingAllowed: true,
    riskWarningsRequired: true,
    requiredDocuments: {
      retail: ['EU_PROSPECTUS', 'PRIIPS_KID', 'SUITABILITY_QUESTIONNAIRE'],
      professional: ['PPM', 'RISK_DISCLOSURE'],
    },
    hasSubJurisdictions: false,
  },
  
  // =============================================
  // EEA NON-EU MEMBERS
  // =============================================
  
  NO: {
    countryCode: 'NO',
    countryName: 'Norway',
    region: 'EEA',
    retailAllowed: true,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: true,
    requiresLocalKID: false,
    requiresLocalLanguage: false,
    regulatorName: 'Finanstilsynet',
    regulatorNotification: true,
    passportingAllowed: true,
    coldCallingAllowed: false,
    advertisingAllowed: true,
    riskWarningsRequired: true,
    requiredDocuments: {
      retail: ['EU_PROSPECTUS', 'PRIIPS_KID', 'SUITABILITY_QUESTIONNAIRE'],
      professional: ['PPM', 'RISK_DISCLOSURE'],
    },
    hasSubJurisdictions: false,
  },
  
  IS: {
    countryCode: 'IS',
    countryName: 'Iceland',
    region: 'EEA',
    retailAllowed: true,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: true,
    requiresLocalKID: false,
    requiresLocalLanguage: false,
    regulatorName: 'FME',
    regulatorNotification: true,
    passportingAllowed: true,
    coldCallingAllowed: false,
    advertisingAllowed: true,
    riskWarningsRequired: true,
    requiredDocuments: {
      retail: ['EU_PROSPECTUS', 'PRIIPS_KID', 'SUITABILITY_QUESTIONNAIRE'],
      professional: ['PPM', 'RISK_DISCLOSURE'],
    },
    hasSubJurisdictions: false,
  },
  
  LI: {
    countryCode: 'LI',
    countryName: 'Liechtenstein',
    region: 'EEA',
    retailAllowed: true,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: true,
    requiresLocalKID: false,
    requiresLocalLanguage: true,
    localLanguage: 'de',
    regulatorName: 'FMA-LI',
    regulatorNotification: true,
    passportingAllowed: true,
    coldCallingAllowed: false,
    advertisingAllowed: true,
    riskWarningsRequired: true,
    requiredDocuments: {
      retail: ['EU_PROSPECTUS', 'PRIIPS_KID', 'SUITABILITY_QUESTIONNAIRE'],
      professional: ['PPM', 'RISK_DISCLOSURE'],
    },
    hasSubJurisdictions: false,
  },
  
  // =============================================
  // EU-EQUIVALENT JURISDICTIONS
  // =============================================
  
  GB: {
    countryCode: 'GB',
    countryName: 'United Kingdom',
    region: 'EU_EQUIVALENT',
    retailAllowed: false,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    minInvestmentPro: 100000,
    requiresProspectus: false, // UK Prospectus if retail
    requiresLocalKID: false,
    requiresLocalLanguage: false,
    regulatorName: 'FCA',
    regulatorNotification: true,
    passportingAllowed: false,
    coldCallingAllowed: false,
    advertisingAllowed: false, // Needs FCA approval
    riskWarningsRequired: true,
    marketingRestrictions: ['NO_COLD_CALLING', 'FINANCIAL_PROMOTION_APPROVAL', 'NO_RETAIL'],
    specialRequirements: ['FCA_EXEMPTION_OR_REGISTRATION', 'APPROPRIATENESS_TEST'],
    requiredDocuments: {
      professional: ['FCA_EXEMPTION', 'PPM', 'RISK_DISCLOSURE', 'APPROPRIATENESS_TEST'],
    },
    hasSubJurisdictions: false,
  },
  
  CH: {
    countryCode: 'CH',
    countryName: 'Switzerland',
    region: 'EU_EQUIVALENT',
    retailAllowed: false,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    minInvestmentPro: 500000, // CHF
    requiresProspectus: false,
    requiresLocalKID: false,
    requiresLocalLanguage: false,
    regulatorName: 'FINMA',
    regulatorNotification: true,
    passportingAllowed: false,
    coldCallingAllowed: false,
    advertisingAllowed: false,
    riskWarningsRequired: true,
    marketingRestrictions: ['NO_RETAIL', 'SWISS_REP_REQUIRED', 'PROFESSIONAL_ONLY'],
    specialRequirements: ['SWISS_REP_AGENT', 'QUALIFIED_INVESTOR_DECLARATION'],
    requiredDocuments: {
      professional: ['SWISS_REP_AGENT', 'PPM', 'QUALIFIED_INVESTOR_DECLARATION'],
    },
    hasSubJurisdictions: false,
  },
  
  MC: {
    countryCode: 'MC',
    countryName: 'Monaco',
    region: 'EU_EQUIVALENT',
    retailAllowed: false,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: false,
    requiresLocalKID: false,
    requiresLocalLanguage: true,
    localLanguage: 'fr',
    regulatorName: 'CCAF',
    regulatorNotification: true,
    passportingAllowed: false,
    coldCallingAllowed: false,
    advertisingAllowed: false,
    riskWarningsRequired: true,
    marketingRestrictions: ['NO_RETAIL', 'PROFESSIONAL_ONLY'],
    requiredDocuments: {
      professional: ['CCAF_NOTIFICATION', 'PPM', 'QUALIFIED_INVESTOR'],
    },
    hasSubJurisdictions: false,
  },
  
  // =============================================
  // THIRD COUNTRY - FRIENDLY
  // =============================================
  
  AE: {
    countryCode: 'AE',
    countryName: 'United Arab Emirates',
    region: 'THIRD_COUNTRY_FRIENDLY',
    retailAllowed: false,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: false,
    requiresLocalKID: false,
    requiresLocalLanguage: false,
    regulatorName: 'SCA/DFSA/ADGM',
    regulatorNotification: true,
    passportingAllowed: false,
    coldCallingAllowed: false,
    advertisingAllowed: false,
    riskWarningsRequired: true,
    marketingRestrictions: ['NO_RETAIL', 'EMIRATE_SPECIFIC_RULES', 'PROFESSIONAL_ONLY'],
    specialRequirements: ['DFSA_OR_ADGM_EXEMPTION', 'PROFESSIONAL_CLIENT_CLASSIFICATION'],
    requiredDocuments: {
      professional: ['DFSA_OR_ADGM_EXEMPTION', 'PROFESSIONAL_CLIENT_CLASSIFICATION', 'PPM'],
    },
    hasSubJurisdictions: true,
    subJurisdictions: ['DIFC', 'ADGM', 'MAINLAND'],
  },
  
  SG: {
    countryCode: 'SG',
    countryName: 'Singapore',
    region: 'THIRD_COUNTRY_FRIENDLY',
    retailAllowed: false,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: true,
    wholesaleAllowed: false,
    accreditedCriteria: {
      netWorth: 2000000, // SGD
      income: 300000, // SGD
      financialAssets: 1000000, // SGD
    },
    requiresProspectus: false,
    requiresLocalKID: false,
    requiresLocalLanguage: false,
    regulatorName: 'MAS',
    regulatorNotification: true,
    passportingAllowed: false,
    coldCallingAllowed: false,
    advertisingAllowed: false,
    riskWarningsRequired: true,
    marketingRestrictions: ['ACCREDITED_ONLY', 'INSTITUTIONAL_ONLY'],
    specialRequirements: ['MAS_EXEMPTION', 'ACCREDITED_INVESTOR_OPT_IN'],
    requiredDocuments: {
      accredited: ['MAS_EXEMPTION', 'ACCREDITED_INVESTOR_OPT_IN', 'PPM'],
    },
    hasSubJurisdictions: false,
  },
  
  AU: {
    countryCode: 'AU',
    countryName: 'Australia',
    region: 'THIRD_COUNTRY_FRIENDLY',
    retailAllowed: false,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: true,
    accreditedCriteria: {
      netWorth: 2500000, // AUD (net assets)
      income: 250000, // AUD gross income for 2 years
    },
    requiresProspectus: false,
    requiresLocalKID: false,
    requiresLocalLanguage: false,
    regulatorName: 'ASIC',
    regulatorNotification: true,
    passportingAllowed: false,
    coldCallingAllowed: false,
    advertisingAllowed: false,
    riskWarningsRequired: true,
    marketingRestrictions: ['WHOLESALE_ONLY'],
    specialRequirements: ['ASIC_EXEMPTION', 'WHOLESALE_CLIENT_CERTIFICATE'],
    requiredDocuments: {
      wholesale: ['ASIC_EXEMPTION', 'WHOLESALE_CLIENT_CERTIFICATE', 'PPM'],
    },
    hasSubJurisdictions: false,
  },
  
  JP: {
    countryCode: 'JP',
    countryName: 'Japan',
    region: 'THIRD_COUNTRY_FRIENDLY',
    retailAllowed: false,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: false,
    requiresLocalKID: false,
    requiresLocalLanguage: true,
    localLanguage: 'ja',
    regulatorName: 'JFSA',
    regulatorNotification: true,
    passportingAllowed: false,
    coldCallingAllowed: false,
    advertisingAllowed: false,
    riskWarningsRequired: true,
    marketingRestrictions: ['QII_ONLY', 'NO_RETAIL'],
    specialRequirements: ['JFSA_NOTIFICATION', 'QII_CONFIRMATION'],
    requiredDocuments: {
      qii: ['JFSA_NOTIFICATION', 'QII_CONFIRMATION', 'PPM'],
    },
    hasSubJurisdictions: false,
  },
  
  SA: {
    countryCode: 'SA',
    countryName: 'Saudi Arabia',
    region: 'THIRD_COUNTRY_FRIENDLY',
    retailAllowed: false,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: false,
    requiresLocalKID: false,
    requiresLocalLanguage: false,
    regulatorName: 'CMA-SA',
    regulatorNotification: true,
    passportingAllowed: false,
    coldCallingAllowed: false,
    advertisingAllowed: false,
    riskWarningsRequired: true,
    marketingRestrictions: ['QUALIFIED_ONLY', 'NO_RETAIL'],
    specialRequirements: ['CMA_EXEMPTION', 'QUALIFIED_FOREIGN_INVESTOR'],
    requiredDocuments: {
      professional: ['CMA_EXEMPTION', 'QUALIFIED_FOREIGN_INVESTOR', 'PPM'],
    },
    hasSubJurisdictions: false,
  },
  
  QA: {
    countryCode: 'QA',
    countryName: 'Qatar',
    region: 'THIRD_COUNTRY_FRIENDLY',
    retailAllowed: false,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: false,
    requiresLocalKID: false,
    requiresLocalLanguage: false,
    regulatorName: 'QFCRA',
    regulatorNotification: true,
    passportingAllowed: false,
    coldCallingAllowed: false,
    advertisingAllowed: false,
    riskWarningsRequired: true,
    marketingRestrictions: ['PROFESSIONAL_ONLY', 'INSTITUTIONAL_ONLY'],
    specialRequirements: ['QFCRA_EXEMPTION', 'PROFESSIONAL_CLIENT'],
    requiredDocuments: {
      professional: ['QFCRA_EXEMPTION', 'PROFESSIONAL_CLIENT', 'PPM'],
    },
    hasSubJurisdictions: false,
  },
  
  CA: {
    countryCode: 'CA',
    countryName: 'Canada',
    region: 'THIRD_COUNTRY_FRIENDLY',
    retailAllowed: false,
    professionalAllowed: true,
    qualifiedAllowed: true,
    accreditedAllowed: true,
    wholesaleAllowed: false,
    accreditedCriteria: {
      income: 200000, // CAD individual, 300000 joint
      financialAssets: 1000000, // CAD
      netWorth: 5000000, // CAD (for permitted client)
    },
    requiresProspectus: false,
    requiresLocalKID: false,
    requiresLocalLanguage: false,
    regulatorName: 'Provincial Securities Commissions',
    regulatorNotification: true,
    passportingAllowed: false,
    coldCallingAllowed: false,
    advertisingAllowed: false,
    riskWarningsRequired: true,
    marketingRestrictions: ['ACCREDITED_ONLY', 'PROVINCIAL_VARIATIONS'],
    specialRequirements: ['NI_45_106_EXEMPTION', 'ACCREDITED_INVESTOR_FORM'],
    requiredDocuments: {
      accredited: ['NI_45_106_EXEMPTION', 'ACCREDITED_INVESTOR_FORM', 'PPM'],
    },
    hasSubJurisdictions: true,
    subJurisdictions: ['ON', 'BC', 'AB', 'QC', 'MB', 'SK', 'NS', 'NB'],
  },
  
  // =============================================
  // THIRD COUNTRY - RESTRICTED
  // =============================================
  
  US: {
    countryCode: 'US',
    countryName: 'United States',
    region: 'THIRD_COUNTRY_RESTRICTED',
    retailAllowed: false,
    professionalAllowed: false,
    qualifiedAllowed: false,
    accreditedAllowed: true,
    wholesaleAllowed: false,
    accreditedCriteria: {
      income: 200000, // USD individual, 300000 joint
      netWorth: 1000000, // USD excluding primary residence
    },
    requiresProspectus: false,
    requiresLocalKID: false,
    requiresLocalLanguage: false,
    regulatorName: 'SEC',
    regulatorNotification: true,
    passportingAllowed: false,
    coldCallingAllowed: false,
    advertisingAllowed: false,
    riskWarningsRequired: true,
    marketingRestrictions: ['ACCREDITED_ONLY', 'NO_ADVERTISING', 'STATE_BLUE_SKY', 'NO_GENERAL_SOLICITATION'],
    specialRequirements: ['REG_D_506C', 'FORM_D', 'ACCREDITED_INVESTOR_VERIFICATION'],
    requiredDocuments: {
      accredited: ['REG_D_506C', 'FORM_D', 'ACCREDITED_INVESTOR_VERIFICATION', 'PPM', 'SUBSCRIPTION_AGREEMENT'],
    },
    hasSubJurisdictions: true,
    subJurisdictions: ['CA', 'NY', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI'],
  },
  
  CN: {
    countryCode: 'CN',
    countryName: 'China',
    region: 'THIRD_COUNTRY_RESTRICTED',
    retailAllowed: false,
    professionalAllowed: false,
    qualifiedAllowed: false,
    accreditedAllowed: false,
    wholesaleAllowed: false,
    requiresProspectus: false,
    requiresLocalKID: false,
    requiresLocalLanguage: false,
    regulatorName: 'CSRC',
    regulatorNotification: false,
    passportingAllowed: false,
    coldCallingAllowed: false,
    advertisingAllowed: false,
    riskWarningsRequired: true,
    blockedReasons: 'Capital controls and regulatory restrictions prevent offering to Chinese residents',
    marketingRestrictions: ['FULLY_BLOCKED'],
    requiredDocuments: {},
    hasSubJurisdictions: false,
  },
};

// =============================================
// ELIGIBILITY FUNCTIONS
// =============================================

/**
 * Check if an investor is eligible in a specific jurisdiction
 */
export function checkJurisdictionEligibility(
  investor: InvestorProfile,
  jurisdictionCode: string
): EligibilityResult {
  const rule = JURISDICTION_RULES[jurisdictionCode];
  
  if (!rule) {
    return {
      eligible: false,
      investorTypeInJurisdiction: null,
      restrictions: ['JURISDICTION_NOT_SUPPORTED'],
      requiredDocuments: [],
      investmentLimits: {},
      marketingRestrictions: [],
      reason: `Jurisdiction ${jurisdictionCode} is not supported`,
    };
  }
  
  // Check if jurisdiction is blocked
  if (rule.blockedReasons) {
    return {
      eligible: false,
      investorTypeInJurisdiction: null,
      restrictions: ['JURISDICTION_BLOCKED'],
      requiredDocuments: [],
      investmentLimits: {},
      marketingRestrictions: rule.marketingRestrictions || [],
      reason: rule.blockedReasons,
    };
  }
  
  // Determine what investor type they qualify as in this jurisdiction
  let eligibleType: InvestorType | null = null;
  let requiredDocs: string[] = [];
  const restrictions: string[] = [];
  
  // Check investor type eligibility
  switch (investor.investorType) {
    case 'RETAIL':
      if (rule.retailAllowed) {
        eligibleType = 'RETAIL';
        requiredDocs = rule.requiredDocuments.retail || [];
      } else {
        restrictions.push('RETAIL_NOT_ALLOWED');
      }
      break;
      
    case 'PROFESSIONAL':
      if (rule.professionalAllowed) {
        eligibleType = 'PROFESSIONAL';
        requiredDocs = rule.requiredDocuments.professional || [];
      } else {
        restrictions.push('PROFESSIONAL_NOT_ALLOWED');
      }
      break;
      
    case 'QUALIFIED':
      if (rule.qualifiedAllowed) {
        eligibleType = 'QUALIFIED';
        requiredDocs = rule.requiredDocuments.professional || []; // Usually same as professional
      } else {
        restrictions.push('QUALIFIED_NOT_ALLOWED');
      }
      break;
      
    case 'ACCREDITED':
      if (rule.accreditedAllowed) {
        // Verify they meet accredited criteria
        if (rule.accreditedCriteria && investor.annualIncome && investor.totalAssets) {
          const meetsIncome = investor.annualIncome >= (rule.accreditedCriteria.income || 0);
          const meetsAssets = investor.totalAssets >= (rule.accreditedCriteria.netWorth || 0);
          
          if (meetsIncome || meetsAssets) {
            eligibleType = 'ACCREDITED';
            requiredDocs = rule.requiredDocuments.accredited || [];
          } else {
            restrictions.push('DOES_NOT_MEET_ACCREDITED_CRITERIA');
          }
        } else {
          eligibleType = 'ACCREDITED';
          requiredDocs = rule.requiredDocuments.accredited || [];
        }
      } else {
        restrictions.push('ACCREDITED_NOT_ALLOWED');
      }
      break;
      
    case 'WHOLESALE':
      if (rule.wholesaleAllowed) {
        eligibleType = 'WHOLESALE';
        requiredDocs = rule.requiredDocuments.wholesale || [];
      } else {
        restrictions.push('WHOLESALE_NOT_ALLOWED');
      }
      break;
      
    case 'QII':
      if (rule.requiredDocuments.qii) {
        eligibleType = 'QII';
        requiredDocs = rule.requiredDocuments.qii;
      } else {
        restrictions.push('QII_NOT_ALLOWED');
      }
      break;
  }
  
  // Add special requirements
  if (rule.specialRequirements) {
    restrictions.push(...rule.specialRequirements);
  }
  
  // Investment limits
  const investmentLimits: { min?: number; max?: number } = {};
  if (eligibleType === 'RETAIL' && rule.minInvestmentRetail) {
    investmentLimits.min = Number(rule.minInvestmentRetail);
  }
  if (eligibleType === 'RETAIL' && rule.maxInvestmentRetail) {
    investmentLimits.max = Number(rule.maxInvestmentRetail);
  }
  if (eligibleType !== 'RETAIL' && rule.minInvestmentPro) {
    investmentLimits.min = Number(rule.minInvestmentPro);
  }
  
  const eligible = eligibleType !== null;
  
  return {
    eligible,
    investorTypeInJurisdiction: eligibleType,
    restrictions,
    requiredDocuments: requiredDocs,
    investmentLimits,
    marketingRestrictions: rule.marketingRestrictions || [],
    reason: eligible 
      ? `Eligible as ${eligibleType} investor in ${rule.countryName}`
      : `Not eligible in ${rule.countryName}: ${restrictions.join(', ')}`,
  };
}

/**
 * Get all jurisdictions where an investor is eligible
 */
export function getEligibleJurisdictions(investor: InvestorProfile): Map<string, EligibilityResult> {
  const results = new Map<string, EligibilityResult>();
  
  for (const code of Object.keys(JURISDICTION_RULES)) {
    const result = checkJurisdictionEligibility(investor, code);
    results.set(code, result);
  }
  
  return results;
}

/**
 * Get all supported jurisdictions
 */
export function getAllJurisdictions(): JurisdictionRule[] {
  return Object.values(JURISDICTION_RULES);
}

/**
 * Get jurisdictions by region
 */
export function getJurisdictionsByRegion(region: JurisdictionRegion): JurisdictionRule[] {
  return Object.values(JURISDICTION_RULES).filter(j => j.region === region);
}

/**
 * Check if a deal can be marketed in a jurisdiction
 */
export function canMarketInJurisdiction(
  jurisdictionCode: string,
  dealCompartment: 'PROFESSIONAL' | 'RETAIL'
): { allowed: boolean; requirements: string[]; restrictions: string[] } {
  const rule = JURISDICTION_RULES[jurisdictionCode];
  
  if (!rule) {
    return {
      allowed: false,
      requirements: [],
      restrictions: ['JURISDICTION_NOT_SUPPORTED'],
    };
  }
  
  if (rule.blockedReasons) {
    return {
      allowed: false,
      requirements: [],
      restrictions: ['JURISDICTION_BLOCKED', rule.blockedReasons],
    };
  }
  
  const requirements: string[] = [];
  
  // Check compartment compatibility
  if (dealCompartment === 'RETAIL' && !rule.retailAllowed) {
    return {
      allowed: false,
      requirements: [],
      restrictions: ['RETAIL_DEALS_NOT_ALLOWED'],
    };
  }
  
  // Add documentation requirements
  if (rule.regulatorNotification) {
    requirements.push(`${rule.regulatorName}_NOTIFICATION`);
  }
  
  if (rule.requiresProspectus && dealCompartment === 'RETAIL') {
    requirements.push('EU_PROSPECTUS');
  }
  
  if (rule.requiresLocalKID) {
    requirements.push(`LOCAL_KID_${rule.localLanguage?.toUpperCase() || 'EN'}`);
  }
  
  if (rule.requiresLocalLanguage && rule.localLanguage) {
    requirements.push(`TRANSLATION_${rule.localLanguage.toUpperCase()}`);
  }
  
  return {
    allowed: true,
    requirements,
    restrictions: rule.marketingRestrictions || [],
  };
}
