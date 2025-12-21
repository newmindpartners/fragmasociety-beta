import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface SectionFAQs {
  [key: string]: FAQItem[];
}

const sectionFAQs: SectionFAQs = {
  overview: [
    {
      question: "What is a Signature Deal and how does it differ from traditional investments?",
      answer: "A Signature Deal is an exclusive, curated investment opportunity that undergoes rigorous due diligence by our fund managers. Unlike traditional investments, these deals offer direct access to institutional-quality assets with transparent terms, tokenized ownership, and secondary market liquidity. Each deal is structured to provide professional investors with clear risk-adjusted returns while maintaining full regulatory compliance."
    },
    {
      question: "What are the minimum and maximum investment amounts?",
      answer: "Investment tickets typically range from €100,000 to €500,000 minimum, depending on the specific deal structure. Maximum allocations are set to ensure fair distribution among qualified investors. These thresholds ensure all participants meet accredited investor requirements and help maintain optimal fund management efficiency."
    },
    {
      question: "How is my capital protected in this investment structure?",
      answer: "Your investment is secured through multiple layers of protection: SPV (Special Purpose Vehicle) structuring isolates deal-specific risks, comprehensive insurance coverage on underlying assets, conservative loan-to-value ratios, and rigorous counterparty due diligence. Additionally, all deals undergo legal review by specialized investment attorneys."
    },
    {
      question: "What is the expected timeline for returns and distributions?",
      answer: "Distribution timelines vary by deal type. Income-generating deals typically distribute quarterly or monthly, while development deals may offer returns at specific milestones or upon exit. Each deal's timeline is clearly outlined in the offering documents, with target holding periods ranging from 18-60 months depending on the strategy."
    }
  ],
  strategy: [
    {
      question: "What is the investment thesis behind this strategy?",
      answer: "Our investment thesis is built on identifying market inefficiencies and capitalizing on asymmetric risk-reward opportunities. We focus on assets with strong fundamentals, experienced operators, and multiple exit paths. Each strategy undergoes stress-testing against various market scenarios to ensure resilience across economic cycles."
    },
    {
      question: "How does the fund manager select which deals to pursue?",
      answer: "Deal selection follows a rigorous multi-phase process: initial screening (evaluates market opportunity and operator track record), deep due diligence (financial modeling, legal review, asset inspection), investment committee approval, and final structuring. Less than 3% of deals reviewed make it through our full pipeline."
    },
    {
      question: "What happens if market conditions change during the investment period?",
      answer: "Our strategies include built-in flexibility mechanisms. Fund managers continuously monitor market conditions and can adjust tactics—such as extending hold periods, restructuring debt, or pursuing alternative exit strategies—to optimize outcomes. Regular investor updates keep you informed of any strategic adjustments."
    },
    {
      question: "How are the target returns calculated and what assumptions underlie them?",
      answer: "Target returns are calculated using conservative base-case assumptions validated against historical performance data and current market conditions. We provide multiple scenarios (base, upside, downside) in our financial models. Returns account for all fees, carried interest, and projected costs to give you a realistic net IRR expectation."
    }
  ],
  trackrecord: [
    {
      question: "How should I interpret past performance data when evaluating this deal?",
      answer: "Past performance provides context but not guarantees. Focus on: consistency of returns across market cycles, the specific team members who executed past deals, how comparable past assets were to the current opportunity, and whether returns met, exceeded, or fell short of original projections. This pattern analysis reveals operational capability."
    },
    {
      question: "What was the fund manager's performance during market downturns?",
      answer: "Our case studies include performance across various market conditions, including the 2020 pandemic period and recent interest rate environment. Key metrics to review: capital preservation during stress periods, ability to execute opportunistic acquisitions, and recovery trajectories. These demonstrate real-world crisis management capabilities."
    },
    {
      question: "Are the team members on this deal the same ones who generated past track record?",
      answer: "Yes, we ensure continuity between track record and current deals. The lead principals and key operators who generated historical returns are directly involved in sourcing, executing, and managing current opportunities. Any team composition details are disclosed in the team section."
    },
    {
      question: "How do realized returns compare to initial projections on previous deals?",
      answer: "We maintain full transparency on projection accuracy. Our historical deals have averaged within 2-3% of base-case projections, with most exceeding targets. Any deals that underperformed are disclosed with explanations of contributing factors and lessons applied to current deal structuring."
    }
  ],
  portfolio: [
    {
      question: "How diversified is the underlying portfolio and why does it matter?",
      answer: "Portfolio diversification reduces concentration risk. Our assets are typically diversified across: geographic locations (multiple neighborhoods/markets), tenant mix (residential, commercial, mixed-use), lease expiration schedules, and price points. This ensures that single-asset events don't materially impact overall portfolio performance."
    },
    {
      question: "What due diligence was performed on each property in the portfolio?",
      answer: "Each asset undergoes comprehensive due diligence including: professional third-party appraisals, environmental assessments (Phase I/II), title searches, structural engineering reports, rent roll verification, market comp analysis, and on-site inspections. Legal teams review all existing contracts, leases, and potential liabilities."
    },
    {
      question: "How are portfolio valuations determined and how often are they updated?",
      answer: "Portfolio valuations combine independent third-party appraisals with internal financial modeling. Valuations are updated quarterly based on market comparables, income performance, and cap rate movements. Investors receive valuation reports with their quarterly statements, providing transparency into NAV evolution."
    },
    {
      question: "What is the exit strategy for individual assets versus the whole portfolio?",
      answer: "We maintain flexibility in exit planning. Individual high-performing assets may be sold opportunistically, while others may be held for income. Portfolio-level exits include: sale to institutional buyers, recapitalization with new equity partners, or merger with larger platforms. The optimal path is determined based on market conditions and investor preferences."
    }
  ],
  market: [
    {
      question: "What macro-economic factors most significantly impact this investment?",
      answer: "Key macro factors include: interest rate environment (affects borrowing costs and cap rates), local employment trends (drives demand), supply/demand dynamics (new construction pipeline), demographic shifts (population growth, migration patterns), and regulatory changes (zoning, rent control). We monitor these continuously and adjust strategy accordingly."
    },
    {
      question: "How does this market compare to similar investment opportunities nationally?",
      answer: "We provide comparative market analysis benchmarking this opportunity against similar deals in peer markets. Key metrics include: cap rate spreads, price per square foot trends, rent growth trajectories, and competitive supply. This context helps you understand relative value and risk-adjusted return potential."
    },
    {
      question: "What are the primary demand drivers in this specific market?",
      answer: "Demand drivers are market-specific but typically include: employer base and job growth, proximity to amenities and transportation, school quality (for residential), tourism and business travel (for hospitality), and demographic trends. Each deal memo details the specific demand thesis with supporting data."
    },
    {
      question: "How might rising interest rates or economic recession affect projected returns?",
      answer: "Our financial models include sensitivity analysis for rate increases and recessionary scenarios. Downside cases typically assume 200+ basis point rate increases and 15-20% NOI compression. The structure of each deal (fixed vs floating debt, LTV ratio, reserve requirements) determines resilience. Conservative underwriting ensures viability across scenarios."
    }
  ],
  financials: [
    {
      question: "What fees am I paying and how do they compare to industry standards?",
      answer: "Our fee structure is fully transparent: management fees (typically 1.5-2% annually on committed capital), performance fees (carried interest of 15-20% above preferred return hurdle), and transaction-level fees (acquisition, disposition). These align with institutional standards while ensuring manager incentives align with investor returns."
    },
    {
      question: "What is the preferred return hurdle and how does the waterfall structure work?",
      answer: "Preferred return is the minimum annualized return (typically 6-8%) investors receive before managers share in profits. The waterfall structure distributes returns in order: first, return of capital; second, preferred return catch-up; third, remaining profits split between investors and managers. This ensures managers only profit when investors achieve strong returns."
    },
    {
      question: "How are projected operating expenses and capital reserves determined?",
      answer: "Operating expenses are budgeted based on historical actual costs, third-party property management quotes, and market benchmarks. Capital reserves (typically 2-5% of revenue) are held for unexpected repairs and improvements. Conservative budgeting includes contingency buffers to ensure projections remain achievable."
    },
    {
      question: "What tax considerations should I discuss with my advisor?",
      answer: "Common tax considerations include: depreciation benefits and potential recapture, 1031 exchange eligibility, K-1 issuance timing, state-level income tax implications, and UBTI concerns for IRA/pension investors. We provide detailed tax structure summaries, but recommend consulting your tax professional for personal planning implications."
    }
  ],
  team: [
    {
      question: "What is the lead operator's relevant experience in this asset class?",
      answer: "Our operators are selected based on deep experience specifically in the relevant asset class and geography. Lead operators typically have 15+ years of experience, having executed multiple cycles of similar deals. Background checks, reference calls with past investors, and track record verification are standard parts of our operator due diligence."
    },
    {
      question: "What skin in the game does the management team have?",
      answer: "Alignment is critical. Our deal sponsors typically co-invest 5-15% of equity alongside investors, ensuring shared upside and downside exposure. Additionally, management fees are often reinvested, and carried interest vests over the investment period. This structure ensures managers are motivated to maximize long-term returns."
    },
    {
      question: "How is the team structured for ongoing asset management?",
      answer: "Each deal has designated professionals for: asset management (strategic oversight), property management (day-to-day operations), investor relations (quarterly reporting, communications), and financial reporting (accounting, tax preparation). Clear accountability ensures nothing falls through the cracks during the hold period."
    },
    {
      question: "What happens if a key team member departs during the investment?",
      answer: "Succession planning is built into our governance structure. Key-person clauses protect investors, and we maintain depth in our operator relationships. If a key member departs, investors are notified promptly, and replacement protocols ensure operational continuity. This risk is mitigated through institutional-quality team building."
    }
  ],
  howitworks: [
    {
      question: "What documents will I need to provide to complete my investment?",
      answer: "Required documents typically include: government-issued ID, accredited investor certification or verification, completed subscription agreement, W-9 (for US investors) or W-8BEN (for international), and source of funds documentation for larger investments. Our concierge team guides you through each requirement."
    },
    {
      question: "How long does the subscription process typically take?",
      answer: "The standard process takes 5-10 business days from initial interest to capital deployment. This includes: document submission (1-2 days), compliance review (2-3 days), subscription execution (1-2 days), and capital call/wire (1-2 days). Experienced investors with documentation ready can often complete faster."
    },
    {
      question: "What happens after I invest—how will I receive updates?",
      answer: "Investors receive: quarterly performance reports (NAV, income, expenses), annual audited financials and K-1 tax documents, ad-hoc updates for material events, and access to an investor portal for real-time document retrieval. Our investor relations team is available for questions between formal reporting periods."
    },
    {
      question: "How can I exit or sell my position before the deal matures?",
      answer: "Tokenized positions can be offered on our secondary marketplace, subject to holding periods and transfer restrictions. We facilitate matching between buyers and sellers, with standard transfer fees. While liquidity is not guaranteed, our marketplace provides an exit option not available in traditional private investments."
    }
  ],
  risks: [
    {
      question: "What are the primary risk factors I should understand before investing?",
      answer: "Key risks vary by deal but commonly include: market risk (asset value fluctuation), operational risk (property management challenges), liquidity risk (inability to exit quickly), regulatory risk (zoning/policy changes), and interest rate risk (refinancing costs). Each deal memo provides a comprehensive risk factor section prioritized by materiality."
    },
    {
      question: "How does the fund structure protect against total capital loss?",
      answer: "Multiple protections exist: conservative LTV ratios (typically 50-65%) provide equity cushion, asset-level insurance covers casualty events, SPV structuring isolates deal-specific liabilities, diversification reduces concentration, and reserve accounts provide operating buffers. However, all investments carry risk and capital loss is possible."
    },
    {
      question: "What insurance and legal protections are in place?",
      answer: "Standard coverage includes: property and casualty insurance, liability coverage, business interruption insurance, and errors & omissions coverage for managers. Legal protections include: proper entity structuring, professional title insurance, environmental liability policies, and comprehensive indemnification provisions in operator agreements."
    },
    {
      question: "How should I size this investment within my overall portfolio?",
      answer: "Alternative investments like these should typically represent 10-25% of an investor's liquid portfolio, with individual positions sized for diversification. Consider your overall asset allocation, liquidity needs, and risk tolerance. We recommend consulting with a financial advisor to determine appropriate sizing for your specific situation."
    }
  ]
};

interface DealSectionFAQProps {
  sectionId: string;
}

export const DealSectionFAQ = ({ sectionId }: DealSectionFAQProps) => {
  const faqs = sectionFAQs[sectionId] || [];

  if (faqs.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-16 px-6 lg:px-8 bg-gradient-to-b from-slate-50/50 to-white border-t border-slate-100"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Frequently Asked Questions
            </h3>
            <p className="text-sm text-slate-500">
              Expert insights for this section
            </p>
          </div>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <AccordionItem 
                value={`faq-${index}`} 
                className="bg-white rounded-xl border border-slate-200/80 px-5 py-1 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <AccordionTrigger className="text-left text-[15px] font-medium text-slate-800 hover:text-violet-700 hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[14px] leading-relaxed text-slate-600 pb-4 pr-8">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-slate-500">
            Have more questions?{" "}
            <a 
              href="mailto:investors@fragma.co" 
              className="text-violet-600 hover:text-violet-700 font-medium hover:underline"
            >
              Contact our investor relations team
            </a>
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};
