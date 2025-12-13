import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HowItWorksHero } from "@/components/how-it-works/HowItWorksHero";
import { BigPicture } from "@/components/how-it-works/BigPicture";
import { StepSection } from "@/components/how-it-works/StepSection";
import { CuratedDeals } from "@/components/how-it-works/CuratedDeals";
import { SafetyTrust } from "@/components/how-it-works/SafetyTrust";
import { QuickSnapshot } from "@/components/how-it-works/QuickSnapshot";
import { HowItWorksCTA } from "@/components/how-it-works/HowItWorksCTA";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HowItWorksHero />
      <BigPicture />
      <StepSection
        step={1}
        title="Create your account & verify your identity (KYC)"
        description="To keep things safe and compliant, everyone goes through a simple onboarding:"
        items={[
          "Sign up with your email.",
          "Fill in a short investor profile (country, basic info, experience level).",
          "Complete a quick KYC (upload ID + selfie; standard for regulated platforms)."
        ]}
        additionalContent={{
          title: "We use this to:",
          items: [
            "Confirm it's really you (anti–money laundering checks).",
            "Understand where you're based (country rules).",
            "Know if you're a retail, professional or elite / qualified investor."
          ],
          footer: "You only do this once. After that, the platform automatically shows you the deals you're allowed to access.",
          highlight: "In short: One KYC. Clear, compliant access to the right deals."
        }}
      />
      <CuratedDeals />
      <StepSection
        step={2}
        title="Browse Signature Deals tailored to your profile"
        description="Once your account is set up and KYC is done, you can:"
        items={[]}
        categories={[
          "Real estate",
          "Film & entertainment",
          "Sports & performance rights",
          "Luxury goods & collectibles",
          "Private credit and funds",
          "ESG & impact"
        ]}
        cardItems={[
          "Minimum investment",
          "Target return",
          "Duration",
          "Risk level",
          "Category & country"
        ]}
        additionalContent={{
          footer: "Many deals include a short video trailer so you can understand the story in 60–90 seconds before reading the numbers.",
          highlight: "Use filters like risk level, asset type and minimum ticket to find opportunities that match your comfort zone."
        }}
        variant="alt"
      />
      <StepSection
        step={3}
        title="Open the deal page to see the full picture"
        description="When a Signature Deal interests you, click into its page. You'll find:"
        items={[
          "What you're investing in – the asset, project or strategy",
          "Who is behind it – the industry leader, issuer or brand",
          "How you earn – yield, revenue share, profit participation, or growth",
          "Key numbers – target returns, term, minimum, fees",
          "Legal setup – how the deal is structured (e.g. Luxembourg securitisation)",
          "Risks – explained in clear, non-legal language",
          "FAQs – specific to that opportunity"
        ]}
        additionalContent={{
          highlight: "Take your time. If something isn't clear, don't invest yet."
        }}
      />
      <StepSection
        step={4}
        title="Choose how much you want to invest"
        description="When you're ready:"
        items={[
          "Click Invest on the deal page.",
          "Pick your amount (e.g. €50, €250, €1,000, or more depending on the deal).",
          "Confirm that you understand the key terms and risks.",
          "Pay using your available options (card, bank transfer, or crypto – depending on region and deal)."
        ]}
        additionalContent={{
          highlight: "You'll get a confirmation once your subscription is accepted."
        }}
        variant="alt"
      />
      <StepSection
        step={5}
        title="Get your tokens – your digital proof of ownership"
        description="Behind the scenes, Fragma's infrastructure tokenizes your position:"
        items={[
          "You receive digital tokens that represent your share in that deal.",
        ]}
        tokenHolding={[
          "In a non-custodial wallet you control directly, or",
          "In a Smart Vault linked to your account, still under a non-custodial model."
        ]}
        portfolioItems={[
          "Deal name",
          "Number of tokens / units",
          "Invested amount",
          "Current value (when available)"
        ]}
      />
      <StepSection
        step={6}
        title="Earn payouts automatically when the asset generates income"
        description="Depending on the deal, you may earn:"
        items={[
          "Regular yield / interest (monthly, quarterly, annually)",
          "Revenue share (e.g. from film revenues, performance fees, rent)",
          "Profit participation when an asset is sold or refinanced",
          "Capital gains if you sell at a higher price on the marketplace"
        ]}
        payoutProcess={[
          "Cashflow from the asset flows into the structure",
          "Smart contracts or administrators calculate each investor's share",
          "Funds are passed on to you as per the deal terms"
        ]}
        dashboardItems={[
          "Payout history",
          "Upcoming or indicative distributions",
          "Downloadable summaries for your records or tax advisor"
        ]}
        variant="alt"
      />
      <StepSection
        step={7}
        title="Hold long term or use the decentralized marketplace (when available)"
        description="Some deals are hold-to-maturity only. Others are eligible for secondary trading on the Fragma marketplace."
        items={[]}
        marketplaceFeatures={[
          "You can list your tokens for sale at your chosen price.",
          "Other investors can place buy orders.",
          "Trades are matched on a non-custodial, Cardano-based order book.",
          "Settlement happens automatically on-chain."
        ]}
        additionalContent={{
          title: "Important for beginners:",
          footer: "Liquidity is not guaranteed. The ability to sell depends on demand and market conditions. You should always be ready to hold your investment until the end of the deal."
        }}
      />
      <SafetyTrust />
      <QuickSnapshot />
      <HowItWorksCTA />
      <Footer />
    </div>
  );
};

export default HowItWorks;
