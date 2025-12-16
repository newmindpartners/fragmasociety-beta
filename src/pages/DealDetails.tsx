import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DealHero } from "@/components/deal-details/DealHero";
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
import type { DealData } from "@/types/deal";

// Sample deal data - in production this would come from an API/database
const dealsData: Record<string, DealData> = {
  "balsiger-horse-portfolio": {
    id: "balsiger-horse-portfolio",
    category: "Sports",
    subcategory: "Performance Rights",
    leaderName: "Bryan Balsiger",
    leaderRole: "Double European Champion Rider",
    leaderImage: "/src/assets/bryan-balsinger.png",
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
    title: "Prime Beverly Hills & Malibu Portfolio",
    tagline: "Exclusive mid-century modern villas in California's most prestigious locations",
    description: "Targeting high-value real estate in Beverly Hills and Malibu for significant returns through strategic acquisition, renovation, and resale. Capitalizing on the luxury and exclusivity of these areas, known for stable and rapidly appreciating property values. Focusing on luxury mid-century modern villas desired for their architectural elegance and scarcity.",
    heroVideoUrl: "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4",
    pitchVideoUrl: "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4",
    assetVideoUrl: "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4",
    teamVideoUrl: "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4",
    assetImages: [
      "/src/assets/rwa-villa.jpg",
      "/src/assets/category-realestate.jpg",
    ],
    minTicket: "€50,000",
    maxTicket: "€5,000,000",
    targetReturn: "10-15% IRR",
    term: "24-32 months",
    risk: "Medium",
    instrumentType: "Real Estate Fund Participation",
    currency: "USD",
    distributionFrequency: "Upon property sale/exit",
    totalRaise: "$20,000,000",
    currentRaised: "$2,500,000",
    investorCount: 8,
    team: [
      {
        name: "Philippe Naouri",
        role: "Developer & Interior Designer",
        bio: "Philippe Naouri is a prolific designer with 15 years of expertise in Beverly Hills and Malibu markets. With five projects in Malibu soon coming to market and a Trousdale estate on Loma Vista offered at $20,000,000, he specializes in authentically restoring mid-century modern architectural masterpieces by legendary architects like Craig Ellwood and Edward Fickett.",
        credentials: [
          "15 Years Track Record",
          "$40.2M+ Total Profit from Past Deals",
          "Forbes Featured",
          "Mid-Century Modern Expert",
          "Open House TV Featured"
        ],
        image: "/src/assets/philippe-naouri.png",
        pressLinks: [
          { title: "From Fickett To Neutra: Mid-Century Perfection Reimagined", source: "Forbes" },
          { title: "Inside a $25 Million Los Angeles Midcentury Mansion", source: "Forbes" }
        ]
      },
      {
        name: "Jacobsen Arquitetura",
        role: "Architecture Partner",
        bio: "Jacobsen Arquitetura is an international architecture office founded in Rio de Janeiro. As a premise and design methodology, they develop projects seeking integration between the built environment and its natural context. With international operations, the office has headquarters in São Paulo, Rio de Janeiro and Lisbon.",
        credentials: [
          "Architecture Digest Award Winner",
          "Wallpaper: 100 Most Influential People",
          "Architizer: Top 25 Brazilian Architecture Firms",
          "Prix Versailles 2022 Award",
          "Architizer A+ Awards 2014 Winner"
        ],
        image: "/src/assets/philippe-naouri.png"
      }
    ],
    strategies: [
      { title: "Acquisition of Undervalued Assets", description: "Targeting high-value real estate in Beverly Hills and Malibu for significant returns through strategic acquisition and resale." },
      { title: "Investment in Off-Plan Properties", description: "Capitalize on early-stage investments in off-plan properties in prime locations for substantial value appreciation." },
      { title: "Renting for Revenue Generation", description: "Implement a 3-year rental strategy on acquired properties to ensure consistent revenue streams during the holding period." },
      { title: "Building and Enhancing Value", description: "Strategically enhance and develop properties to maximize market value and attractiveness to potential buyers." },
      { title: "Sale and Realization of Gains", description: "Execute a well-timed sale strategy to realize significant gains from the enhanced properties, aligning with market conditions." },
    ],
    trackRecord: [
      { address: "3226 Serra Rd, Malibu", acquisitionPrice: "$3.9M", totalInvestment: "$5.2M", salePrice: "$10M", profit: "$4.8M" },
      { address: "20737 Cool Oak Way, Malibu", acquisitionPrice: "$4.0M", totalInvestment: "$5.5M", salePrice: "$11M", profit: "$5.5M" },
      { address: "5901 Filaree Heights Ave, Malibu", acquisitionPrice: "$4.2M", totalInvestment: "$5.7M", salePrice: "$14M", profit: "$5.2M" },
      { address: "Cool Oak Way", acquisitionPrice: "$3.2M", totalInvestment: "$5.2M", salePrice: "$9M", profit: "$3.8M" },
      { address: "Big Rock", acquisitionPrice: "$4.7M", totalInvestment: "$6.7M", salePrice: "$9.5M", profit: "$2.8M" },
      { address: "Rock Point", acquisitionPrice: "$2.5M", totalInvestment: "$4.5M", salePrice: "$5.5M", profit: "$1M" },
      { address: "8818 Rising Glen Pl, Los Angeles", acquisitionPrice: "$4.7M", totalInvestment: "$6.2M", salePrice: "$9M", profit: "$2.8M" },
    ],
    totalPastProfit: "$40.2M",
    currentProperties: [
      { address: "5878 Deerhead Rd, Malibu", acquisitionPrice: "$6.5M", constructionCost: "$11M", projectedExitPrice: "$32M", size: "2.3 Acres / 11,343 SF", specs: "5 Bed / 9 Bath - Designed by Jacobsen", status: "construction" },
      { address: "20799 Cool Oak Way, Malibu", acquisitionPrice: "$3.2M", constructionCost: "$2M", projectedExitPrice: "$9M", size: "1.14 Acres", specs: "New Build Opportunity", status: "acquisition" },
      { address: "20771 Big Rock Drive, Malibu", acquisitionPrice: "$4.7M", constructionCost: "$2M", projectedExitPrice: "$9.5M", size: "1.06 Acres", specs: "Development Land", status: "acquisition" },
      { address: "20706 Rockpoint Way, Malibu", acquisitionPrice: "$2.5M", constructionCost: "$2M", projectedExitPrice: "$6.5M", size: "1.2 Acres / 2,700 SF", specs: "Renovation Project", status: "acquisition" },
    ],
    marketData: {
      region: "Malibu, Beverly Hills & West Hollywood",
      stats: [
        { label: "Avg Beach-side Price", value: "$10.9M", trend: "up", description: "Malibu beachfront" },
        { label: "Days on Market", value: "~113 days", trend: "stable", description: "In line with overall market" },
        { label: "YoY Listing Change", value: "-34%", trend: "down", description: "Scarce inventory at coast" },
        { label: "Annual Growth", value: "5-7%", trend: "up", description: "Luxury sector projection" },
      ],
      projections: [
        { period: "2025 Snapshot", description: "Average beach-side price around $10.9M. DOM ~113 days, in line with overall market but longer than pre-2023 norms." },
        { period: "2026 Outlook", description: "Beachfront inventory expected to stay constrained, supporting firm to rising prices. Luxury ~7% annual growth." },
        { period: "2027 Projection", description: "As wildfire recovery normalizes, activity should pick up while maintaining premium. Growth moderating to ~5-7%/year." },
      ],
      highlights: [
        "Beachfront listings down ~34% YoY (≈82 → 54), largely due to North Malibu wildfire impact",
        "Scarce, high-leverage inventory at the coast creates opportunity",
        "Strong demand from entertainment and technology industry buyers",
        "Luxury sector expected to continue its strong growth, attracting high-profile investors",
        "Days on market expected to normalize around 90-100 in 2026",
      ],
    },
    caseStudies: [
      {
        address: "5901 Filaree Heights, Malibu",
        acquisitionPrice: "$4.2M",
        constructionCost: "$2M",
        exitPrice: "$14M",
        profit: "$5.2M",
        size: "2.4 Acres",
        specs: "4,100 SF / 4 Bed / 4 Bath",
        yearBuilt: "1973",
        architect: "Edward Fickett",
        description: "The Filaree House is one of Edward Fickett's most remarkable architectural creations, thoughtfully situated on over an acre in Malibu Park. While honoring Fickett's midcentury modern vision, the renovation upholds the authenticity of the original details and design. Walls of glass unveil breathtaking vistas of the Pacific and vibrant sunsets.",
        features: ["Ocean & Panoramic Views", "Pool & Paddle Tennis Court", "Meditation Garden", "Renovated Airstream", "A-frame Structure"],
      },
      {
        address: "20737 Cool Oak Way, Malibu",
        acquisitionPrice: "$4.0M",
        constructionCost: "$1.5M",
        exitPrice: "$11.5M",
        profit: "$5.5M",
        size: "5.7 Acres",
        specs: "2,700 SF / 4 Bed / 3 Bath",
        yearBuilt: "1966",
        architect: "Robert Skinner, AIA",
        description: "The Eckhardt House is the one and only estate in Malibu designed by Robert Skinner, AIA. Nestled on approximately three acres, this mid-century architectural masterpiece was preserved and meticulously restored by Maison d'Artiste. Flooded with natural light, the open floor plan showcases magnificent panoramic ocean views.",
        features: ["Coastline & Ocean Views", "Pool Deck", "Private Sauna", "Terraced Landscaping", "Chef's Kitchen"],
      },
      {
        address: "3226 Serra Road, Malibu",
        acquisitionPrice: "$3.9M",
        constructionCost: "$1.3M",
        exitPrice: "$9.5M",
        profit: "$4.8M",
        size: "1.4 Acres",
        specs: "6,500 SF / 6 Bed / 6 Bath",
        description: "A stunning mid-century modern restoration in the heart of Malibu. The property was transformed from an undervalued asset into a luxury estate through strategic renovation and premium finishes.",
        features: ["Mid-Century Architecture", "Premium Finishes", "Ocean Views", "Private Setting"],
      },
      {
        address: "8818 Rising Glen Place, West Hollywood",
        acquisitionPrice: "$4.7M",
        constructionCost: "$1.5M",
        exitPrice: "$9M",
        profit: "$2.8M",
        size: "0.5 Acres",
        specs: "3,446 SF / 4 Bed / 4 Bath",
        description: "A Hollywood Hills mid-century gem restored to its original glory with modern amenities. Strategic location near entertainment industry hubs made this property highly desirable.",
        features: ["Hollywood Hills Location", "Modern Amenities", "Privacy", "City Views"],
      },
    ],
    timeline: {
      phases: [
        { date: "Q1 2026", title: "Acquisition", description: "Property acquisition & permit approval", status: "upcoming" },
        { date: "Q3 2026", title: "Construction Start", description: "Begin renovation/construction", status: "upcoming" },
        { date: "Q2 2027", title: "Rental Period", description: "Optional rental for revenue generation", status: "upcoming" },
        { date: "Q4 2028", title: "Exit", description: "Property sale & profit realization", status: "upcoming" },
      ],
      totalDuration: "24-32 months",
    },
    financials: {
      projectedProfit: "$13M",
      optimisticScenario: "$33.36M",
      conservativeScenario: "$8M",
      portfolioTarget: "$15M",
      resaleTarget: "$28M",
      fundSize: "$50M",
      minimumInvestment: "$50,000",
      targetIRR: "10-15%",
    },
    specialOpportunity: {
      title: "Pacific Palisades Rebuild",
      description: "Post-fire dynamics create a unique opportunity in this high-value coastal submarket with new-build premium potential. Emergency orders and City Planning guidance aim to streamline permits, creating favorable conditions for strategic acquisitions.",
      bulletPoints: [
        "Rebuild pipeline: ~750 approved / ~390 under construction",
        "Land/lot sales jumped: ~94 sold YTD vs 1 prior-year period",
        "Acquire lots where sellers value speed/certainty vs. multi-year rebuild",
        "Deliver new product built to current wildfire-resilience guidance",
        "Value levers: speed-to-permit + cost control + premium design",
        "Timeline drives IRR - post-fire transactions are timing/insurance sensitive",
      ],
    },
    risks: [
      { title: "Development Risk", description: "Construction projects may face delays, cost overruns, or regulatory challenges in California. Permit timelines and contractor availability can impact project schedules." },
      { title: "Property Market Risk", description: "Real estate values can fluctuate based on market conditions, interest rates, and economic circumstances. The luxury segment may be sensitive to broader economic cycles." },
      { title: "Natural Disaster Risk", description: "Properties in Malibu and coastal areas may be subject to wildfire, earthquake, and other natural disaster risks that could affect property values or construction timelines." },
      { title: "Currency Risk", description: "For EUR-based investors, returns may be affected by EUR/USD exchange rate fluctuations over the investment period." },
      { title: "Illiquidity Risk", description: "Real estate investments are typically less liquid than traditional securities. Exit timing depends on market conditions and buyer demand." },
      { title: "Capital Risk", description: "You may lose some or all of your invested capital. Target returns of 10-15% IRR are projections and not guaranteed." },
    ],
  },
};

const DealDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const deal = id ? dealsData[id] : null;

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <DealHero deal={deal} />
      <DealOpportunity deal={deal} />
      <DealKeyTerms deal={deal} />
      <DealMarketAnalysis deal={deal} />
      <DealStrategy deal={deal} />
      <DealTrackRecord deal={deal} />
      <DealPortfolio deal={deal} />
      <DealAsset deal={deal} />
      <DealCaseStudies deal={deal} />
      <DealTimeline deal={deal} />
      <DealFinancials deal={deal} />
      <DealSpecialOpportunity deal={deal} />
      <DealTeam deal={deal} />
      <DealHowItWorks />
      <DealRisks deal={deal} />
      <DealDocuments />
      <DealCTA deal={deal} />
      <Footer />
    </div>
  );
};

export default DealDetails;
