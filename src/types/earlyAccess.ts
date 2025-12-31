export interface EarlyAccessFormData {
  // Identity
  fullName: string;
  email: string;
  country: string;
  city: string;

  // Investor Profile
  registeringAs: 'individual' | 'company_spv' | 'family_office' | 'fund_asset_manager' | '';
  entityName: string;
  isUsPerson: boolean | null;
  investorStatus: 'retail' | 'professional_eu' | 'accredited_us' | 'institutional' | 'not_sure' | '';

  // EU Professional Questions
  euProfessionalQualifications: string[];
  euQualificationsCount: '0-1' | '2' | '3' | '';

  // US Accredited Questions
  usAccreditedQualifications: string[];

  // Financial Profile
  annualIncome: string;
  investableCapital: string;

  // Compliance
  isPep: boolean | null;
  isSanctioned: boolean | null;

  // Investment Preferences
  investmentAmount3to6Months: string;
  preferredTicketSize: string;
  investmentHorizon: string;
  investmentPriorities: string[];

  // Asset Interests
  assetInterests: string[];
  otherRwaDescription: string;

  // Contact Preferences
  preferredContactChannel: string;
  phoneWhatsappNumber: string;
  consentToContact: boolean;
  marketingConsent: boolean;
}

export const initialFormData: EarlyAccessFormData = {
  fullName: '',
  email: '',
  country: '',
  city: '',
  registeringAs: '',
  entityName: '',
  isUsPerson: null,
  investorStatus: '',
  euProfessionalQualifications: [],
  euQualificationsCount: '',
  usAccreditedQualifications: [],
  annualIncome: '',
  investableCapital: '',
  isPep: null,
  isSanctioned: null,
  investmentAmount3to6Months: '',
  preferredTicketSize: '',
  investmentHorizon: '',
  investmentPriorities: [],
  assetInterests: [],
  otherRwaDescription: '',
  preferredContactChannel: '',
  phoneWhatsappNumber: '',
  consentToContact: false,
  marketingConsent: false,
};

export const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia",
  "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
  "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei",
  "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde",
  "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo",
  "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica",
  "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea",
  "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia",
  "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq",
  "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya",
  "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",
  "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Madagascar", "Malawi", "Malaysia",
  "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia",
  "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
  "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea",
  "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea",
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino",
  "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone",
  "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea",
  "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago",
  "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
  "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela",
  "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

export const assetTypes = [
  { id: 'btc_mining', label: 'Bitcoin mining (cashflow strategy)' },
  { id: 'prime_real_estate', label: 'Prime real estate (Malibu / Beverly Hills)' },
  { id: 'film_financing', label: 'Film financing (senior / gap loan)' },
  { id: 'show_jumping', label: 'Elite show jumping horses (performance + prize revenue potential)' },
  { id: 'rare_diamonds', label: 'Rare diamonds (Messika – curated allocation)' },
  { id: 'luxury_hospitality', label: 'Luxury hospitality (Mykonos hotel with Fundamental Group)' },
  { id: 'other_rwas', label: 'Other RWAs (art, collectibles, etc.)' },
  { id: 'diversified', label: 'I want diversified exposure across all' },
  { id: 'not_sure', label: 'Not sure yet' },
];

export const registeringAsOptions = [
  { value: 'individual', label: 'Individual' },
  { value: 'company_spv', label: 'Company / SPV' },
  { value: 'family_office', label: 'Family office' },
  { value: 'fund_asset_manager', label: 'Fund / Asset manager' },
];

export const investorStatusOptions = [
  { value: 'retail', label: 'Retail / Individual investor' },
  { value: 'professional_eu', label: 'Professional investor (EU MiFID)' },
  { value: 'accredited_us', label: 'Accredited investor (US)' },
  { value: 'institutional', label: 'Institutional (fund / bank / asset manager)' },
  { value: 'not_sure', label: 'Not sure (help me classify)' },
];

export const euProfessionalOptions = [
  { value: 'finance_role', label: 'I work / have worked in finance in a relevant role' },
  { value: 'portfolio_threshold', label: 'I have a portfolio of financial instruments above a meaningful threshold' },
  { value: 'frequent_trades', label: 'I have placed frequent trades over the last year' },
  { value: 'none', label: 'None of these / not sure' },
];

export const usAccreditedOptions = [
  { value: 'income', label: 'Income > $200k (or $300k joint) in each of the last 2 years' },
  { value: 'net_worth', label: 'Net worth > $1M (excluding primary residence)' },
  { value: 'professional_license', label: 'I qualify via professional license / entity status' },
  { value: 'none', label: 'None / not sure' },
];

export const annualIncomeOptions = [
  { value: 'under_50k', label: '< $50k' },
  { value: '50k_100k', label: '$50k–$100k' },
  { value: '100k_250k', label: '$100k–$250k' },
  { value: '250k_500k', label: '$250k–$500k' },
  { value: '500k_1m', label: '$500k–$1M' },
  { value: 'over_1m', label: '$1M+' },
  { value: 'prefer_not_say', label: 'Prefer not to say' },
];

export const investableCapitalOptions = [
  { value: 'under_10k', label: '< $10k' },
  { value: '10k_50k', label: '$10k–$50k' },
  { value: '50k_250k', label: '$50k–$250k' },
  { value: '250k_1m', label: '$250k–$1M' },
  { value: 'over_1m', label: '$1M+' },
  { value: 'prefer_not_say', label: 'Prefer not to say' },
];

export const investmentAmountOptions = [
  { value: 'under_1k', label: '< $1,000' },
  { value: '1k_5k', label: '$1k–$5k' },
  { value: '5k_25k', label: '$5k–$25k' },
  { value: '25k_100k', label: '$25k–$100k' },
  { value: '100k_250k', label: '$100k–$250k' },
  { value: 'over_250k', label: '$250k+' },
];

export const ticketSizeOptions = [
  { value: 'under_1k', label: '< $1k' },
  { value: '1k_5k', label: '$1k–$5k' },
  { value: '5k_25k', label: '$5k–$25k' },
  { value: '25k_100k', label: '$25k–$100k' },
  { value: 'over_100k', label: '$100k+' },
];

export const investmentHorizonOptions = [
  { value: 'under_12_months', label: '< 12 months' },
  { value: '1_3_years', label: '1–3 years' },
  { value: '3_5_years', label: '3–5 years' },
  { value: 'over_5_years', label: '5+ years' },
];

export const investmentPriorityOptions = [
  { value: 'yield', label: 'Predictable yield' },
  { value: 'growth', label: 'Growth upside' },
  { value: 'capital_preservation', label: 'Capital preservation' },
  { value: 'liquidity', label: 'Liquidity / ability to exit' },
  { value: 'diversification', label: 'Diversification' },
];

export const contactChannelOptions = [
  { value: 'email', label: 'Email' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'phone', label: 'Phone call' },
  { value: 'telegram', label: 'Telegram' },
];

export type FormStep = 
  | 'welcome'
  | 'identity'
  | 'investor_profile'
  | 'investor_details'
  | 'financial_profile'
  | 'compliance'
  | 'investment_preferences'
  | 'asset_interests'
  | 'contact'
  | 'auth'
  | 'thank_you';

export function computeTags(data: EarlyAccessFormData): string[] {
  const tags: string[] = [];

  // US Person flow
  if (data.isUsPerson) {
    tags.push('US_FLOW');
  }

  // Investor status tags
  if (data.investorStatus === 'professional_eu') {
    if (data.euQualificationsCount === '2' || data.euQualificationsCount === '3') {
      tags.push('EU_PRO');
    }
  }

  if (data.investorStatus === 'accredited_us') {
    const hasQualification = data.usAccreditedQualifications.some(q => q !== 'none');
    if (hasQualification) {
      tags.push('US_ACCREDITED');
    }
  }

  if (data.investorStatus === 'retail') {
    tags.push('RETAIL');
  }

  if (data.investorStatus === 'not_sure') {
    const lowIncome = ['under_50k', '50k_100k'].includes(data.annualIncome);
    const lowCapital = ['under_10k', '10k_50k'].includes(data.investableCapital);
    if (lowIncome || lowCapital) {
      tags.push('RETAIL_CANDIDATE');
    }
  }

  // Compliance flags
  if (data.isPep) {
    tags.push('EDD_REQUIRED');
  }

  if (data.isSanctioned) {
    tags.push('BLOCKED_REVIEW');
  }

  return tags;
}
