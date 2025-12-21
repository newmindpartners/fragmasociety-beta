import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DealHero } from "@/components/deal-details/DealHero";
import { DealSectionNav } from "@/components/deal-details/DealSectionNav";
import { DealOpportunity } from "@/components/deal-details/DealOpportunity";
import { DealKeyTerms } from "@/components/deal-details/DealKeyTerms";
import { DealAsset } from "@/components/deal-details/DealAsset";
import { DealTeam } from "@/components/deal-details/DealTeam";
import { DealHowItWorks } from "@/components/deal-details/DealHowItWorks";
import { DealRisks } from "@/components/deal-details/DealRisks";
import { DealDocuments } from "@/components/deal-details/DealDocuments";
import { DealCTA } from "@/components/deal-details/DealCTA";
import { DealMarketAnalysis } from "@/components/deal-details/DealMarketAnalysis";
import { DealTrackRecord } from "@/components/deal-details/DealTrackRecord";
import { DealStrategy } from "@/components/deal-details/DealStrategy";
import { DealPortfolio } from "@/components/deal-details/DealPortfolio";
import { DealTimeline } from "@/components/deal-details/DealTimeline";
import { DealFinancials } from "@/components/deal-details/DealFinancials";
import { DealCaseStudies } from "@/components/deal-details/DealCaseStudies";
import { DealSpecialOpportunity } from "@/components/deal-details/DealSpecialOpportunity";
import { DealHighlights } from "@/components/deal-details/DealHighlights";
import { DealSectionFAQ } from "@/components/deal-details/DealSectionFAQ";
import { useDeal } from "@/hooks/useDeal";
import type { DealData } from "@/types/deal";

// Fallback data for deals not yet in database
const fallbackDeals: Record<string, DealData> = {
  "balsiger-horse-portfolio": {
    id: "balsiger-horse-portfolio",
    category: "Sports",
    subcategory: "Performance Rights",
    leaderName: "Bryan Balsiger",
    leaderRole: "Double European Champion Rider",
    leaderImage: "/src/assets/bryan-balsinger.png",
    bannerImage: "/src/assets/bryan-banner.png",
    title: "Champion Horse Portfolio",
    tagline: "Performance rights meets elite equestrian sport",
    description: "Own a slice of a curated portfolio of competition horses with a European champion rider. Real prize money, real resale value, real upside.",
    heroVideoUrl: "https://videos.pexels.com/video-files/4625518/4625518-uhd_2560_1440_30fps.mp4",
    pitchVideoUrl: "https://videos.pexels.com/video-files/4625518/4625518-uhd_2560_1440_30fps.mp4",
    assetVideoUrl: "https://videos.pexels.com/video-files/4625518/4625518-uhd_2560_1440_30fps.mp4",
    teamVideoUrl: "https://videos.pexels.com/video-files/4625518/4625518-uhd_2560_1440_30fps.mp4",
    assetImages: ["/src/assets/category-sports.jpg"],
    minTicket: "€250",
    maxTicket: "€50,000",
    targetReturn: "8-12%",
    term: "24-36 months",
    risk: "Medium",
    instrumentType: "Performance Revenue Participation",
    currency: "EUR",
    distributionFrequency: "Upon prize events",
    totalRaise: "€500,000",
    currentRaised: "€125,000",
    investorCount: 32,
    team: [{
      name: "Bryan Balsiger",
      role: "Lead Rider & Portfolio Manager",
      bio: "Bryan Balsiger is a Swiss showjumping champion who has won two European Championships and competed at the highest international levels including the Olympics.",
      credentials: ["Double European Champion", "Olympic Competitor", "World Ranking Top 50"],
      image: "/src/assets/bryan-balsinger.png"
    }],
    risks: [
      { title: "Performance Risk", description: "Horse competition results depend on many factors including animal health, rider performance, and competition conditions." },
      { title: "Animal Health Risk", description: "Horses may suffer injuries or health issues that could affect their competitive ability and value." },
      { title: "Market Risk", description: "The equestrian market for competition horses can fluctuate based on demand and economic conditions." },
      { title: "Illiquidity Risk", description: "Your investment may be illiquid for the duration of the term. Secondary market trading may not always be available." },
      { title: "Capital Risk", description: "You may lose some or all of your invested capital. Returns are not guaranteed." },
    ],
  },
  "naouri-malibu-villa": {
    id: "naouri-malibu-villa",
    category: "Real Estate",
    subcategory: "Luxury Development",
    leaderName: "Philippe Naouri",
    leaderRole: "Developer & Mid-Century Modern Expert",
    leaderImage: "/src/assets/philippe-naouri.png",
    bannerImage: "/src/assets/philippe-banner.png",
    title: "Prime Beverly Hills & Malibu Portfolio",
    tagline: "Acquire, renovate, and exit luxury properties in LA's most sought-after neighborhoods",
    description: "Partner with Philippe Naouri to invest in a curated portfolio of luxury real estate in Beverly Hills and Malibu.",
    heroVideoUrl: "https://videos.pexels.com/video-files/5548162/5548162-uhd_2560_1440_25fps.mp4",
    pitchVideoUrl: "https://videos.pexels.com/video-files/5548162/5548162-uhd_2560_1440_25fps.mp4",
    assetVideoUrl: "https://videos.pexels.com/video-files/5548162/5548162-uhd_2560_1440_25fps.mp4",
    teamVideoUrl: "https://videos.pexels.com/video-files/5548162/5548162-uhd_2560_1440_25fps.mp4",
    assetImages: ["/src/assets/category-realestate.jpg", "/src/assets/property-malibu.jpg"],
    minTicket: "$50,000",
    maxTicket: "$500,000",
    targetReturn: "10-15% IRR",
    term: "24-32 months",
    risk: "Medium",
    instrumentType: "Real Estate LP Units",
    currency: "USD",
    distributionFrequency: "Upon exit",
    totalRaise: "$5,000,000",
    currentRaised: "$1,250,000",
    investorCount: 18,
    totalPastProfit: "$26.9M",
    team: [{
      name: "Philippe Naouri",
      role: "Lead Developer",
      bio: "Philippe Naouri is a renowned developer specializing in mid-century modern architecture in Los Angeles' most prestigious neighborhoods.",
      credentials: ["30+ Years Experience", "100+ Properties Developed", "Beverly Hills Specialist"],
      image: "/src/assets/philippe-naouri.png"
    }],
    trackRecord: [
      {
        address: "5901 Filaree Heights, Malibu",
        acquisitionPrice: "$4.2M",
        totalInvestment: "$2.0M",
        salePrice: "$14.0M",
        profit: "$7.8M"
      },
      {
        address: "20737 Cool Oak Way, Malibu",
        acquisitionPrice: "$4.0M",
        totalInvestment: "$1.5M",
        salePrice: "$11.5M",
        profit: "$6.0M"
      },
      {
        address: "2460 Sunset Plaza Dr, Los Angeles",
        acquisitionPrice: "$5.575M",
        totalInvestment: "$500K",
        salePrice: "$8.0M",
        profit: "$1.925M"
      },
      {
        address: "20647 Seaboard Rd, Malibu",
        acquisitionPrice: "$1.6M",
        totalInvestment: "$250K",
        salePrice: "$2.495M",
        profit: "$645K"
      },
      {
        address: "8818 Rising Glen Place, Los Angeles",
        acquisitionPrice: "$4.7M",
        totalInvestment: "$1.5M",
        salePrice: "$9.0M",
        profit: "$2.8M"
      },
      {
        address: "1394 Casiano Rd, Los Angeles",
        acquisitionPrice: "$3.1M",
        totalInvestment: "$150K",
        salePrice: "$3.9M",
        profit: "$650K"
      },
      {
        address: "1061 Loma Vista Dr, Beverly Hills",
        acquisitionPrice: "$5.9M",
        totalInvestment: "$5.0M",
        salePrice: "$17.0M",
        profit: "$6.1M"
      },
      {
        address: "4965 Calvin Avenue, Tarzana",
        acquisitionPrice: "$1.465M",
        totalInvestment: "$50K",
        salePrice: "$2.495M",
        profit: "$980K"
      }
    ],
    risks: [
      { title: "Market Risk", description: "Real estate values can fluctuate based on market conditions." },
      { title: "Construction Risk", description: "Renovation projects may face delays or cost overruns." },
      { title: "Illiquidity Risk", description: "Your investment may be illiquid for the duration of the term." },
      { title: "Capital Risk", description: "You may lose some or all of your invested capital." },
    ],
  },
};

const DealDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  
  const { data: dbDeal, isLoading } = useDeal(id);
  
  // Use database deal if available, otherwise fall back to hardcoded data
  const deal = dbDeal || (id ? fallbackDeals[id] : null);

  // Define sections based on available deal data
  const sections = [
    { id: "overview", label: "Overview", available: true },
    { id: "strategy", label: "Strategy", available: !!(deal?.strategies && deal.strategies.length > 0) },
    { id: "trackrecord", label: "Track Record", available: !!((deal?.trackRecord && deal.trackRecord.length > 0) || (deal?.caseStudies && deal.caseStudies.length > 0)) },
    { id: "portfolio", label: "Portfolio", available: !!(deal?.currentProperties && deal.currentProperties.length > 0) },
    { id: "market", label: "Market Analysis", available: !!deal?.marketData },
    { id: "financials", label: "Financials", available: !!deal?.financials },
    { id: "team", label: "Team", available: true },
    { id: "howitworks", label: "How It Works", available: true },
    { id: "risks", label: "Risks & Docs", available: true },
  ];

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    // Smooth scroll to top of content area
    window.scrollTo({ top: 450, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 py-32 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 py-32 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Deal Not Found</h1>
          <p className="text-muted-foreground mb-8">The deal you are looking for does not exist or has been removed.</p>
          <button 
            onClick={() => navigate("/live-deals")}
            className="text-primary hover:underline"
          >
            ← Back to Live Deals
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  // Render content based on active section
  const renderSectionContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <>
            <DealHighlights deal={deal} />
            <DealOpportunity deal={deal} />
            <DealKeyTerms deal={deal} />
            {deal.specialOpportunity && (
              <DealSpecialOpportunity deal={deal} />
            )}
            <DealSectionFAQ sectionId="overview" />
          </>
        );
      case "trackrecord":
        return (
          <>
            {deal.trackRecord && deal.trackRecord.length > 0 && (
              <DealTrackRecord deal={deal} />
            )}
            {deal.caseStudies && deal.caseStudies.length > 0 && (
              <DealCaseStudies deal={deal} />
            )}
            <DealSectionFAQ sectionId="trackrecord" />
          </>
        );
      case "strategy":
        return (
          <>
            {deal.strategies && deal.strategies.length > 0 && (
              <DealStrategy deal={deal} />
            )}
            {deal.timeline && (
              <DealTimeline deal={deal} />
            )}
            <DealSectionFAQ sectionId="strategy" />
          </>
        );
      case "portfolio":
        return (
          <>
            {deal.currentProperties && deal.currentProperties.length > 0 && (
              <DealPortfolio deal={deal} />
            )}
            <DealAsset deal={deal} />
            <DealSectionFAQ sectionId="portfolio" />
          </>
        );
      case "market":
        return (
          <>
            {deal.marketData && (
              <DealMarketAnalysis deal={deal} />
            )}
            <DealSectionFAQ sectionId="market" />
          </>
        );
      case "financials":
        return (
          <>
            {deal.financials && (
              <DealFinancials deal={deal} />
            )}
            <DealSectionFAQ sectionId="financials" />
          </>
        );
      case "team":
        return (
          <>
            <DealTeam deal={deal} />
            <DealSectionFAQ sectionId="team" />
          </>
        );
      case "howitworks":
        return (
          <>
            <DealHowItWorks />
            <DealSectionFAQ sectionId="howitworks" />
          </>
        );
      case "risks":
        return (
          <>
            <DealRisks deal={deal} />
            <DealDocuments />
            <DealSectionFAQ sectionId="risks" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <DealHero deal={deal} />
      <div className="relative bg-white">
        <DealSectionNav 
          sections={sections} 
          activeSection={activeSection} 
          onSectionChange={handleSectionChange} 
        />
        <div className="min-h-[60vh] bg-white">
          {renderSectionContent()}
        </div>
      </div>
      <DealCTA deal={deal} />
      <Footer />
    </div>
  );
};

export default DealDetails;
