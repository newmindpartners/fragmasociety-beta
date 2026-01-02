/**
 * AI Compliance Agent Service
 * 
 * Senior Compliance Officer with 20+ years experience at top-tier Luxembourg law firms.
 * Expert in MiFID II, CSSF regulations, securitisation law, and investor protection.
 * Conservative, thorough, documentation-focused approach.
 */

import OpenAI from 'openai';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { env } from '../config/env.js';
import { JURISDICTION_RULES, checkJurisdictionEligibility, InvestorProfile, EligibilityResult } from './jurisdiction.service.js';

// AI Provider type
type AIProvider = 'gemini' | 'openai';

// =============================================
// TYPES
// =============================================

export interface InvestorQuestionnaire {
  countryCode: string;
  totalAssets?: number;
  annualIncome?: number;
  financialAssets?: number;
  professionalExperience?: boolean;
  institutionalInvestor?: boolean;
  isUsPerson?: boolean;
  riskTolerance?: 'conservative' | 'moderate' | 'aggressive';
  investmentHorizon?: string;
  investmentObjectives?: string[];
  investmentExperience?: string;
  sourceOfFunds?: string;
}

export interface InvestorClassification {
  recommendedType: string;
  confidence: number;
  reasoning: string;
  warnings: string[];
  requiredDocuments: string[];
  nextSteps: string[];
}

export interface SuitabilityResult {
  suitable: boolean;
  score: number;
  reasoning: string;
  warnings: string[];
  recommendations: string[];
  requiredDisclosures: string[];
}

export interface ComplianceCase {
  investorId: string;
  investorEmail: string;
  investorType: string;
  countryCode: string;
  kycStatus?: string;
  totalAssets?: number;
  annualIncome?: number;
  complianceStatus: string;
  complianceNotes?: string;
  isPep?: boolean;
  isSanctioned?: boolean;
  recentActivity?: string;
}

export interface ComplianceReview {
  decision: 'approve' | 'reject' | 'escalate' | 'request_documents';
  confidence: number;
  reasoning: string;
  riskFactors: string[];
  mitigatingFactors: string[];
  recommendations: string[];
  requiredActions: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// =============================================
// SYSTEM PROMPTS
// =============================================

const COMPLIANCE_OFFICER_PERSONA = `You are Dr. Marie-Claire Laurent, a Senior Compliance Officer with 20+ years of experience at top-tier Luxembourg law firms, now serving as the Chief Compliance Officer for Fragma Society, a Luxembourg-based securitisation vehicle.

## Your Background
- Former partner at Elvinger Hoss Prussen (Luxembourg's leading law firm)
- PhD in Financial Law from University of Luxembourg
- Certified Compliance Officer (CCO) by CSSF
- Expert in MiFID II, EU Prospectus Regulation, PRIIPS, Luxembourg Securitisation Law
- Worked with CSSF on regulatory frameworks for tokenised securities

## Your Approach
- Conservative and thorough - you prioritise investor protection
- Documentation-focused - proper paperwork prevents problems
- Risk-aware - you identify and flag potential issues early
- Regulatory-minded - you ensure full compliance with all applicable laws
- Client-friendly - you explain complex regulations in accessible terms

## Fragma Society Structure
Fragma Society is a Luxembourg securitisation vehicle (société de titrisation) under the Law of 22 March 2004:
- Professional Compartment: For Professional/Qualified investors (min EUR 100k), requires PPM
- Retail Compartment: For all investors, requires EU Prospectus + PRIIPS KID + CSSF approval

## Key Regulations You Apply
1. MiFID II - Client classification, suitability, appropriateness
2. EU Prospectus Regulation - Disclosure requirements for retail
3. PRIIPS - Key Information Documents for retail packaged products
4. CSSF Circular - Luxembourg fund registration and marketing
5. AML/KYC - Anti-money laundering and know-your-customer
6. GDPR - Data protection for investor information

## Your Communication Style
- Professional but approachable
- Use clear, jargon-free language when possible
- Always cite relevant regulations
- Provide actionable recommendations
- Flag risks clearly but constructively`;

const CLASSIFICATION_PROMPT = `${COMPLIANCE_OFFICER_PERSONA}

## Current Task: Investor Classification Analysis

Analyze the investor questionnaire and provide a classification recommendation following MiFID II guidelines.

### Classification Categories:
1. RETAIL - Default classification, highest protection level
2. PROFESSIONAL - Meets at least 2 of: (a) significant transactions in last 4 quarters, (b) portfolio > EUR 500,000, (c) works/worked in financial sector
3. QUALIFIED - Institutional investor or meets professional criteria with explicit opt-up
4. ACCREDITED - For US/Canada/Singapore investors meeting local thresholds
5. WHOLESALE - For Australian investors meeting wholesale client test

### Your Response Format:
Provide a JSON response with:
- recommendedType: The investor classification
- confidence: 0-1 score of how confident you are
- reasoning: Detailed explanation citing relevant criteria
- warnings: Any red flags or concerns
- requiredDocuments: Documents needed to confirm classification
- nextSteps: Actions required before final approval`;

const SUITABILITY_PROMPT = `${COMPLIANCE_OFFICER_PERSONA}

## Current Task: Suitability Assessment

Assess whether a specific investment is suitable for an investor, following MiFID II suitability requirements.

### Suitability Factors:
1. Risk Profile Match - Does the investment risk align with investor tolerance?
2. Investment Horizon - Does the lock-up period match investor timeline?
3. Diversification - Would this investment overconcentrate the portfolio?
4. Liquidity Needs - Can the investor afford illiquidity?
5. Knowledge/Experience - Does investor understand the product?
6. Financial Capacity - Can investor absorb potential losses?

### Your Response Format:
Provide a JSON response with:
- suitable: true/false
- score: 0-100 suitability score
- reasoning: Detailed explanation of your assessment
- warnings: Any concerns that must be communicated
- recommendations: Suggestions for the investor
- requiredDisclosures: Risk warnings that must be provided`;

const CASE_REVIEW_PROMPT = `${COMPLIANCE_OFFICER_PERSONA}

## Current Task: Compliance Case Review

Review an investor compliance case and provide your recommendation.

### Review Factors:
1. KYC Status - Is identity verified?
2. AML Concerns - Any red flags (PEP, sanctions, source of funds)?
3. Classification Accuracy - Does investor type match their profile?
4. Documentation - Are all required documents in place?
5. Jurisdiction - Are there geographic restrictions?
6. Risk Assessment - Overall compliance risk level

### Decision Options:
- approve: Clear for investment
- reject: Cannot proceed, too risky
- escalate: Needs senior review or legal opinion
- request_documents: Missing required documentation

### Your Response Format:
Provide a JSON response with:
- decision: approve/reject/escalate/request_documents
- confidence: 0-1 score
- reasoning: Detailed explanation
- riskFactors: Identified risks
- mitigatingFactors: Positive factors
- recommendations: Suggested actions
- requiredActions: Mandatory next steps`;

// =============================================
// AI SERVICE CLASS
// =============================================

class ComplianceAIService {
  private openai: OpenAI | null = null;
  private gemini: GoogleGenerativeAI | null = null;
  private geminiModel: GenerativeModel | null = null;
  private activeProvider: AIProvider | null = null;

  constructor() {
    // Initialize OpenAI if configured
    if (env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: env.OPENAI_API_KEY,
      });
      console.log(`✅ OpenAI initialized with model: ${env.OPENAI_MODEL}`);
    }

    // Initialize Gemini if configured
    if (env.GOOGLE_AI_API_KEY) {
      this.gemini = new GoogleGenerativeAI(env.GOOGLE_AI_API_KEY);
      this.geminiModel = this.gemini.getGenerativeModel({ 
        model: env.GEMINI_MODEL,
        generationConfig: {
          temperature: 0.3,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 4096,
        },
      });
      console.log(`✅ Gemini initialized with model: ${env.GEMINI_MODEL}`);
    }

    // Determine active provider based on preference
    this.activeProvider = this.determineProvider();
    if (this.activeProvider) {
      console.log(`🤖 AI Compliance Officer using: ${this.activeProvider.toUpperCase()}`);
    }
  }

  private determineProvider(): AIProvider | null {
    const preference = env.AI_PROVIDER;

    if (preference === 'gemini' && this.gemini) {
      return 'gemini';
    }
    if (preference === 'openai' && this.openai) {
      return 'openai';
    }
    if (preference === 'auto') {
      // Prefer Gemini (Gemini 3), fallback to OpenAI (GPT-5.2)
      if (this.gemini) return 'gemini';
      if (this.openai) return 'openai';
    }
    return null;
  }

  private isConfigured(): boolean {
    return this.activeProvider !== null;
  }

  getActiveProvider(): string | null {
    return this.activeProvider;
  }

  getModelInfo(): { provider: string; model: string } | null {
    if (this.activeProvider === 'gemini') {
      return { provider: 'Google Gemini', model: env.GEMINI_MODEL };
    }
    if (this.activeProvider === 'openai') {
      return { provider: 'OpenAI', model: env.OPENAI_MODEL };
    }
    return null;
  }

  private async chat(
    systemPrompt: string,
    userMessage: string,
    temperature: number = 0.3
  ): Promise<string> {
    if (this.activeProvider === 'gemini' && this.geminiModel) {
      return this.chatWithGemini(systemPrompt, userMessage, temperature);
    }
    if (this.activeProvider === 'openai' && this.openai) {
      return this.chatWithOpenAI(systemPrompt, userMessage, temperature);
    }
    throw new Error('No AI provider configured. Please set GOOGLE_AI_API_KEY or OPENAI_API_KEY.');
  }

  private async chatWithGemini(
    systemPrompt: string,
    userMessage: string,
    temperature: number = 0.3
  ): Promise<string> {
    if (!this.geminiModel) {
      throw new Error('Gemini is not configured.');
    }

    // Gemini uses a different format - combine system prompt with user message
    const fullPrompt = `${systemPrompt}\n\n---\n\nUser Query:\n${userMessage}`;
    
    const result = await this.geminiModel.generateContent({
      contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
      generationConfig: { temperature },
    });

    const response = result.response;
    return response.text() || '';
  }

  private async chatWithOpenAI(
    systemPrompt: string,
    userMessage: string,
    temperature: number = 0.3
  ): Promise<string> {
    if (!this.openai) {
      throw new Error('OpenAI is not configured.');
    }

    const response = await this.openai.chat.completions.create({
      model: env.OPENAI_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      temperature,
      max_tokens: 4096,
    });

    return response.choices[0]?.message?.content || '';
  }

  private async chatWithHistory(
    systemPrompt: string,
    messages: ChatMessage[],
    temperature: number = 0.5
  ): Promise<string> {
    if (this.activeProvider === 'gemini' && this.geminiModel) {
      return this.chatWithHistoryGemini(systemPrompt, messages, temperature);
    }
    if (this.activeProvider === 'openai' && this.openai) {
      return this.chatWithHistoryOpenAI(systemPrompt, messages, temperature);
    }
    throw new Error('No AI provider configured.');
  }

  private async chatWithHistoryGemini(
    systemPrompt: string,
    messages: ChatMessage[],
    temperature: number = 0.5
  ): Promise<string> {
    if (!this.geminiModel) {
      throw new Error('Gemini is not configured.');
    }

    // Build conversation history for Gemini
    const history = messages.slice(0, -1).map(m => ({
      role: m.role === 'assistant' ? 'model' as const : 'user' as const,
      parts: [{ text: m.content }],
    }));

    const chat = this.geminiModel.startChat({
      history,
      generationConfig: { temperature },
    });

    // Add system prompt context to the last user message
    const lastMessage = messages[messages.length - 1];
    const contextualMessage = messages.length === 1 
      ? `${systemPrompt}\n\n---\n\nUser Query:\n${lastMessage.content}`
      : lastMessage.content;

    const result = await chat.sendMessage(contextualMessage);
    return result.response.text() || '';
  }

  private async chatWithHistoryOpenAI(
    systemPrompt: string,
    messages: ChatMessage[],
    temperature: number = 0.5
  ): Promise<string> {
    if (!this.openai) {
      throw new Error('OpenAI is not configured.');
    }

    const formattedMessages = [
      { role: 'system' as const, content: systemPrompt },
      ...messages.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
    ];

    const response = await this.openai.chat.completions.create({
      model: env.OPENAI_MODEL,
      messages: formattedMessages,
      temperature,
      max_tokens: 4096,
    });

    return response.choices[0]?.message?.content || '';
  }

  private parseJSON<T>(text: string): T | null {
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
      const jsonString = jsonMatch ? jsonMatch[1].trim() : text.trim();
      return JSON.parse(jsonString) as T;
    } catch {
      console.error('Failed to parse AI response as JSON:', text);
      return null;
    }
  }

  /**
   * Classify an investor based on questionnaire responses
   */
  async classifyInvestor(questionnaire: InvestorQuestionnaire): Promise<InvestorClassification> {
    if (!this.isConfigured()) {
      // Fallback to rule-based classification
      return this.classifyInvestorRuleBased(questionnaire);
    }

    const jurisdictionRule = JURISDICTION_RULES[questionnaire.countryCode];
    const jurisdictionContext = jurisdictionRule 
      ? `The investor is from ${jurisdictionRule.countryName} (${questionnaire.countryCode}), which is in the ${jurisdictionRule.region} region. 
         Retail allowed: ${jurisdictionRule.retailAllowed}, Professional allowed: ${jurisdictionRule.professionalAllowed}.
         Regulator: ${jurisdictionRule.regulatorName || 'N/A'}`
      : `Unknown jurisdiction: ${questionnaire.countryCode}`;

    const userMessage = `
## Investor Questionnaire Responses

${JSON.stringify(questionnaire, null, 2)}

## Jurisdiction Context
${jurisdictionContext}

Please analyze this investor and provide your classification recommendation in JSON format.
`;

    try {
      const response = await this.chat(CLASSIFICATION_PROMPT, userMessage, 0.2);
      const parsed = this.parseJSON<InvestorClassification>(response);
      
      if (parsed) {
        return parsed;
      }
    } catch (error) {
      console.error('AI classification error:', error);
    }

    // Fallback to rule-based
    return this.classifyInvestorRuleBased(questionnaire);
  }

  private classifyInvestorRuleBased(questionnaire: InvestorQuestionnaire): InvestorClassification {
    const warnings: string[] = [];
    const requiredDocuments: string[] = ['ID_VERIFICATION', 'PROOF_OF_ADDRESS'];
    const nextSteps: string[] = ['Complete KYC verification'];

    // US Person check
    if (questionnaire.isUsPerson) {
      const meetsAccredited = (questionnaire.annualIncome || 0) >= 200000 || (questionnaire.totalAssets || 0) >= 1000000;
      if (meetsAccredited) {
        return {
          recommendedType: 'ACCREDITED',
          confidence: 0.85,
          reasoning: 'US person meeting accredited investor criteria under SEC Regulation D 506(c). Either income >= $200,000 or net worth >= $1,000,000 excluding primary residence.',
          warnings: ['US persons face additional restrictions', 'Form D filing may be required', 'State blue sky laws apply'],
          requiredDocuments: [...requiredDocuments, 'ACCREDITED_INVESTOR_CERTIFICATION', 'INCOME_VERIFICATION_OR_NET_WORTH_LETTER'],
          nextSteps: ['Verify accredited status through third-party verification', 'Confirm state-specific requirements'],
        };
      } else {
        return {
          recommendedType: 'RETAIL',
          confidence: 0.95,
          reasoning: 'US person not meeting accredited investor thresholds. Cannot participate in most private offerings.',
          warnings: ['US retail investors are generally excluded from private offerings', 'Very limited investment options available'],
          requiredDocuments,
          nextSteps: ['Review available investment options for non-accredited US persons'],
        };
      }
    }

    // Institutional investor
    if (questionnaire.institutionalInvestor) {
      return {
        recommendedType: 'QUALIFIED',
        confidence: 0.95,
        reasoning: 'Institutional investor (bank, insurance company, investment fund, pension fund). Automatically qualifies as professional client under MiFID II Annex II.',
        warnings: [],
        requiredDocuments: [...requiredDocuments, 'INSTITUTIONAL_INVESTOR_DECLARATION', 'ENTITY_DOCUMENTATION'],
        nextSteps: ['Verify institutional status', 'Obtain entity documentation'],
      };
    }

    // High net worth check
    const hasHighAssets = (questionnaire.totalAssets || 0) >= 500000;
    const hasHighFinancialAssets = (questionnaire.financialAssets || 0) >= 500000;
    const hasProfessionalExp = questionnaire.professionalExperience;

    if ((hasHighAssets || hasHighFinancialAssets) && hasProfessionalExp) {
      return {
        recommendedType: 'QUALIFIED',
        confidence: 0.88,
        reasoning: 'High net worth (>= EUR 500k) with professional financial experience. Meets criteria for elective professional client classification under MiFID II.',
        warnings: ['Client must explicitly opt-up to professional status', 'Must demonstrate expertise, experience, and knowledge'],
        requiredDocuments: [...requiredDocuments, 'ELECTIVE_PROFESSIONAL_DECLARATION', 'PROOF_OF_ASSETS', 'EVIDENCE_OF_EXPERIENCE'],
        nextSteps: ['Obtain signed elective professional declaration', 'Document assessment of expertise'],
      };
    }

    if (hasHighAssets || hasHighFinancialAssets) {
      return {
        recommendedType: 'PROFESSIONAL',
        confidence: 0.82,
        reasoning: 'High net worth (>= EUR 500k assets). May qualify as elective professional client if demonstrating knowledge and experience.',
        warnings: ['Additional assessment of knowledge required', 'Must complete appropriateness test'],
        requiredDocuments: [...requiredDocuments, 'PROOF_OF_ASSETS', 'APPROPRIATENESS_QUESTIONNAIRE'],
        nextSteps: ['Complete appropriateness assessment', 'Review investment knowledge and experience'],
      };
    }

    // Default to retail
    return {
      recommendedType: 'RETAIL',
      confidence: 0.92,
      reasoning: 'Does not meet criteria for professional or qualified investor classification under MiFID II. Entitled to highest level of investor protection.',
      warnings: questionnaire.riskTolerance === 'aggressive' 
        ? ['Aggressive risk tolerance flagged - ensure suitability for complex products'] 
        : [],
      requiredDocuments: [...requiredDocuments, 'SUITABILITY_QUESTIONNAIRE'],
      nextSteps: ['Complete full suitability assessment', 'Provide PRIIPS KID for any investments'],
    };
  }

  /**
   * Assess suitability of a deal for an investor
   */
  async assessSuitability(
    investor: {
      investorType: string;
      riskProfile?: string;
      riskScore?: number;
      totalAssets?: number;
      investmentExperience?: string;
    },
    deal: {
      name: string;
      compartmentType: string;
      riskLevel: number;
      minimumInvestment: number;
      assetClass: string;
      liquidityRisk?: string;
      capitalAtRisk: boolean;
    }
  ): Promise<SuitabilityResult> {
    if (!this.isConfigured()) {
      return this.assessSuitabilityRuleBased(investor, deal);
    }

    const userMessage = `
## Investor Profile
${JSON.stringify(investor, null, 2)}

## Investment Opportunity
${JSON.stringify(deal, null, 2)}

Please assess whether this investment is suitable for this investor and provide your analysis in JSON format.
`;

    try {
      const response = await this.chat(SUITABILITY_PROMPT, userMessage, 0.3);
      const parsed = this.parseJSON<SuitabilityResult>(response);
      
      if (parsed) {
        return parsed;
      }
    } catch (error) {
      console.error('AI suitability error:', error);
    }

    return this.assessSuitabilityRuleBased(investor, deal);
  }

  private assessSuitabilityRuleBased(
    investor: { investorType: string; riskProfile?: string; riskScore?: number; totalAssets?: number },
    deal: { name: string; compartmentType: string; riskLevel: number; minimumInvestment: number; liquidityRisk?: string; capitalAtRisk: boolean }
  ): SuitabilityResult {
    const warnings: string[] = [];
    const recommendations: string[] = [];
    const requiredDisclosures: string[] = [];
    let score = 100;

    // Compartment check
    if (deal.compartmentType === 'PROFESSIONAL' && investor.investorType === 'RETAIL') {
      return {
        suitable: false,
        score: 0,
        reasoning: 'Retail investors cannot invest in Professional compartment products. This is a regulatory requirement, not a suitability judgment.',
        warnings: ['Investment not available to retail investors'],
        recommendations: ['Review Retail compartment investments'],
        requiredDisclosures: [],
      };
    }

    // Risk alignment
    const investorRiskScore = investor.riskScore || 5;
    if (deal.riskLevel > investorRiskScore + 2) {
      score -= 35;
      warnings.push('Investment risk level significantly exceeds your stated risk tolerance');
      requiredDisclosures.push('ENHANCED_RISK_WARNING');
    } else if (deal.riskLevel > investorRiskScore) {
      score -= 15;
      warnings.push('Investment risk level slightly exceeds your stated risk tolerance');
    }

    // Capital at risk
    if (deal.capitalAtRisk) {
      if (investor.riskProfile === 'conservative') {
        score -= 25;
        warnings.push('Your capital is at risk - this may not align with your conservative investment approach');
      }
      requiredDisclosures.push('CAPITAL_AT_RISK_WARNING');
      recommendations.push('Ensure you understand you may lose some or all of your investment');
    }

    // Liquidity risk
    if (deal.liquidityRisk === 'high') {
      score -= 15;
      warnings.push('This investment has high liquidity risk - you may not be able to exit when you want');
      requiredDisclosures.push('LIQUIDITY_RISK_WARNING');
    }

    // Concentration check
    const investorAssets = investor.totalAssets || 0;
    if (investorAssets > 0 && deal.minimumInvestment / investorAssets > 0.1) {
      score -= 20;
      warnings.push('This investment would represent more than 10% of your total assets');
      recommendations.push('Consider the impact on your portfolio diversification');
      requiredDisclosures.push('CONCENTRATION_RISK_WARNING');
    }

    const suitable = score >= 60;

    return {
      suitable,
      score,
      reasoning: suitable 
        ? `Investment appears suitable based on the analysis. Risk alignment is ${score >= 80 ? 'good' : 'acceptable'} with some considerations.`
        : `Investment may not be suitable. Key concerns include: ${warnings.join(', ')}`,
      warnings,
      recommendations,
      requiredDisclosures,
    };
  }

  /**
   * Review a compliance case and provide recommendation
   */
  async reviewComplianceCase(caseData: ComplianceCase): Promise<ComplianceReview> {
    if (!this.isConfigured()) {
      return this.reviewComplianceCaseRuleBased(caseData);
    }

    const jurisdictionContext = JURISDICTION_RULES[caseData.countryCode];
    
    const userMessage = `
## Compliance Case Details
${JSON.stringify(caseData, null, 2)}

## Jurisdiction Context
${jurisdictionContext ? JSON.stringify({
  countryName: jurisdictionContext.countryName,
  region: jurisdictionContext.region,
  retailAllowed: jurisdictionContext.retailAllowed,
  professionalAllowed: jurisdictionContext.professionalAllowed,
  regulator: jurisdictionContext.regulatorName,
  blockedReasons: jurisdictionContext.blockedReasons,
}, null, 2) : 'Unknown jurisdiction'}

Please review this compliance case and provide your recommendation in JSON format.
`;

    try {
      const response = await this.chat(CASE_REVIEW_PROMPT, userMessage, 0.2);
      const parsed = this.parseJSON<ComplianceReview>(response);
      
      if (parsed) {
        return parsed;
      }
    } catch (error) {
      console.error('AI case review error:', error);
    }

    return this.reviewComplianceCaseRuleBased(caseData);
  }

  private reviewComplianceCaseRuleBased(caseData: ComplianceCase): ComplianceReview {
    const riskFactors: string[] = [];
    const mitigatingFactors: string[] = [];
    const recommendations: string[] = [];
    const requiredActions: string[] = [];

    // PEP check
    if (caseData.isPep) {
      riskFactors.push('Politically Exposed Person (PEP) - requires enhanced due diligence');
      requiredActions.push('Complete enhanced due diligence for PEP');
      requiredActions.push('Obtain senior management approval');
    }

    // Sanctions check
    if (caseData.isSanctioned) {
      return {
        decision: 'reject',
        confidence: 0.99,
        reasoning: 'Investor appears on sanctions list. Cannot proceed under any circumstances.',
        riskFactors: ['SANCTIONED_INDIVIDUAL_OR_ENTITY'],
        mitigatingFactors: [],
        recommendations: ['Report to compliance team immediately'],
        requiredActions: ['Block all transactions', 'File SAR if required'],
      };
    }

    // KYC check
    if (caseData.kycStatus !== 'approved') {
      if (!caseData.kycStatus || caseData.kycStatus === 'not_started') {
        return {
          decision: 'request_documents',
          confidence: 0.95,
          reasoning: 'KYC verification not started. Cannot proceed without identity verification.',
          riskFactors: ['NO_KYC_VERIFICATION'],
          mitigatingFactors: [],
          recommendations: ['Direct investor to complete KYC'],
          requiredActions: ['Complete KYC verification before any investment'],
        };
      }
      if (caseData.kycStatus === 'pending') {
        return {
          decision: 'request_documents',
          confidence: 0.9,
          reasoning: 'KYC verification in progress. Awaiting completion.',
          riskFactors: ['KYC_PENDING'],
          mitigatingFactors: ['KYC process already initiated'],
          recommendations: ['Follow up on KYC completion'],
          requiredActions: ['Wait for KYC approval before proceeding'],
        };
      }
      if (caseData.kycStatus === 'rejected' || caseData.kycStatus === 'failed') {
        return {
          decision: 'reject',
          confidence: 0.95,
          reasoning: 'KYC verification failed or was rejected. Cannot proceed.',
          riskFactors: ['FAILED_KYC_VERIFICATION'],
          mitigatingFactors: [],
          recommendations: ['Investor may reapply with correct documentation'],
          requiredActions: ['Do not proceed with any investment'],
        };
      }
    } else {
      mitigatingFactors.push('KYC verified and approved');
    }

    // Jurisdiction check
    const jurisdictionRule = JURISDICTION_RULES[caseData.countryCode];
    if (!jurisdictionRule) {
      riskFactors.push('Unknown jurisdiction - requires manual review');
      return {
        decision: 'escalate',
        confidence: 0.8,
        reasoning: 'Investor is from an unsupported or unknown jurisdiction. Requires legal review.',
        riskFactors,
        mitigatingFactors,
        recommendations: ['Obtain legal opinion on jurisdiction'],
        requiredActions: ['Escalate to legal team', 'Do not proceed until cleared'],
      };
    }

    if (jurisdictionRule.blockedReasons) {
      return {
        decision: 'reject',
        confidence: 0.98,
        reasoning: `Jurisdiction blocked: ${jurisdictionRule.blockedReasons}`,
        riskFactors: ['BLOCKED_JURISDICTION'],
        mitigatingFactors: [],
        recommendations: ['Investor cannot participate from this jurisdiction'],
        requiredActions: ['Communicate rejection to investor'],
      };
    }

    // Check investor type allowed in jurisdiction
    const typeAllowed = 
      (caseData.investorType === 'RETAIL' && jurisdictionRule.retailAllowed) ||
      (caseData.investorType === 'PROFESSIONAL' && jurisdictionRule.professionalAllowed) ||
      (caseData.investorType === 'QUALIFIED' && jurisdictionRule.qualifiedAllowed) ||
      (caseData.investorType === 'ACCREDITED' && jurisdictionRule.accreditedAllowed);

    if (!typeAllowed) {
      riskFactors.push(`Investor type ${caseData.investorType} not allowed in ${caseData.countryCode}`);
      return {
        decision: 'reject',
        confidence: 0.95,
        reasoning: `${caseData.investorType} investors are not permitted in ${jurisdictionRule.countryName}.`,
        riskFactors,
        mitigatingFactors,
        recommendations: ['Check if investor qualifies for a different classification'],
        requiredActions: ['Communicate restriction to investor'],
      };
    }

    mitigatingFactors.push(`Investor type ${caseData.investorType} allowed in ${jurisdictionRule.countryName}`);

    // All clear
    if (riskFactors.length === 0) {
      return {
        decision: 'approve',
        confidence: 0.9,
        reasoning: 'All compliance checks passed. Investor is eligible to proceed.',
        riskFactors: [],
        mitigatingFactors,
        recommendations: ['Proceed with investment'],
        requiredActions: ['Ensure all required documents are signed'],
      };
    }

    // Some risks but manageable
    if (caseData.isPep && riskFactors.length === 1) {
      return {
        decision: 'escalate',
        confidence: 0.85,
        reasoning: 'PEP status requires enhanced due diligence and senior management approval.',
        riskFactors,
        mitigatingFactors,
        recommendations: ['Complete EDD procedures', 'Document risk assessment'],
        requiredActions,
      };
    }

    return {
      decision: 'approve',
      confidence: 0.85,
      reasoning: 'Compliance checks passed with minor considerations.',
      riskFactors,
      mitigatingFactors,
      recommendations,
      requiredActions: requiredActions.length > 0 ? requiredActions : ['Proceed with standard onboarding'],
    };
  }

  /**
   * Chat with the AI Compliance Officer
   */
  async chat_with_officer(
    messages: ChatMessage[],
    context?: {
      investorData?: any;
      dealData?: any;
      jurisdictionCode?: string;
    }
  ): Promise<string> {
    if (!this.isConfigured()) {
      return this.fallbackResponse(messages[messages.length - 1]?.content || '');
    }

    let systemPrompt = COMPLIANCE_OFFICER_PERSONA + '\n\n';

    // Add context if provided
    if (context) {
      systemPrompt += '## Current Context\n\n';
      
      if (context.investorData) {
        systemPrompt += `### Investor Data\n${JSON.stringify(context.investorData, null, 2)}\n\n`;
      }
      
      if (context.dealData) {
        systemPrompt += `### Deal Data\n${JSON.stringify(context.dealData, null, 2)}\n\n`;
      }
      
      if (context.jurisdictionCode) {
        const rule = JURISDICTION_RULES[context.jurisdictionCode];
        if (rule) {
          systemPrompt += `### Jurisdiction: ${rule.countryName} (${rule.region})\n`;
          systemPrompt += `Retail: ${rule.retailAllowed ? 'Yes' : 'No'}, Professional: ${rule.professionalAllowed ? 'Yes' : 'No'}\n`;
          systemPrompt += `Regulator: ${rule.regulatorName || 'N/A'}\n\n`;
        }
      }
    }

    systemPrompt += `
## Instructions
Answer the user's question about compliance, regulations, investor eligibility, or any other compliance-related topic.
Be thorough but concise. Cite relevant regulations when applicable.
If you're unsure about something, say so - never guess on compliance matters.
`;

    try {
      return await this.chatWithHistory(systemPrompt, messages, 0.5);
    } catch (error) {
      console.error('AI chat error:', error);
      return this.fallbackResponse(messages[messages.length - 1]?.content || '');
    }
  }

  private fallbackResponse(question: string): string {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes('professional') || lowerQuestion.includes('classification')) {
      return `To qualify as a Professional investor under MiFID II, an individual must meet at least two of the following criteria:

1. **Transaction frequency**: Carried out transactions of significant size in the relevant market at an average frequency of 10 per quarter over the previous four quarters
2. **Portfolio size**: Financial instrument portfolio (including cash deposits) exceeding EUR 500,000
3. **Professional experience**: Works or has worked in the financial sector for at least one year in a position requiring knowledge of relevant transactions

Would you like me to assess a specific investor's classification?`;
    }

    if (lowerQuestion.includes('retail') || lowerQuestion.includes('protection')) {
      return `Retail investors receive the highest level of protection under MiFID II, including:

- Full suitability assessment before any investment recommendation
- PRIIPS Key Information Document (KID) for packaged products
- Clear risk warnings and disclosures
- Right to complain to the FIN-NET network
- Access to investor compensation schemes

For Fragma's Retail Compartment, we also require a CSSF-approved EU Prospectus.`;
    }

    if (lowerQuestion.includes('kyc') || lowerQuestion.includes('verification')) {
      return `KYC (Know Your Customer) verification is mandatory for all investors. This includes:

1. **Identity Verification**: Government-issued ID (passport, national ID)
2. **Proof of Address**: Utility bill or bank statement (less than 3 months old)
3. **Source of Funds**: Declaration of how investment funds were obtained
4. **PEP Screening**: Politically Exposed Person check
5. **Sanctions Screening**: Against EU, UN, OFAC sanctions lists

Our KYC is processed through Sumsub with the "id-and-liveness" verification level.`;
    }

    return `I'm the AI Compliance Officer, but I'm currently operating in limited mode. 

For full AI-powered compliance analysis, please ensure the OPENAI_API_KEY is configured.

In the meantime, I can help with:
- Investor classification guidance (Professional vs Retail)
- Jurisdiction eligibility checks
- Suitability assessment basics
- KYC/AML requirements

What specific compliance question can I help you with?`;
  }

  /**
   * Check if AI service is available
   */
  isAvailable(): boolean {
    return this.isConfigured();
  }
}

// Export singleton instance
export const complianceAI = new ComplianceAIService();
