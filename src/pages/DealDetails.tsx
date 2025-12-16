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
    description: "Targeting high-value real estate in Beverly Hills and Malibu for significant returns through strategic acquisition, renovation, and resale. Capitalizing on the luxury and exclusivity of these areas, known for stable and rapidly appreciating property values.",
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
    team: [{
      name: "Philippe Naouri",
      role: "Developer & Interior Designer",
      bio: "Philippe Naouri is a prolific designer with 15 years of expertise in Beverly Hills and Malibu markets. With five projects in Malibu soon coming to market and a Trousdale estate on Loma Vista offered at $20,000,000, he specializes in authentically restoring mid-century modern architectural masterpieces by legendary architects like Craig Ellwood and Edward Fickett.",
      credentials: [
        "15 Years Track Record",
        "$40.2M+ Total Profit from Past Deals",
        "Forbes Featured",
        "Mid-Century Modern Expert"
      ],
      image: "/src/assets/philippe-naouri.png"
    }],
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
      { address: "5878 Deerhead Rd, Malibu", acquisitionPrice: "$6.5M", constructionCost: "$11M", projectedExitPrice: "$32M", size: "2.3 Acres / 11,343 SF", specs: "5 Bed / 9 Bath - Designed by Jacobsen" },
      { address: "20799 Cool Oak Way, Malibu", acquisitionPrice: "$3.2M", constructionCost: "$2M", projectedExitPrice: "$9M", size: "1.14 Acres", specs: "New Build Opportunity" },
      { address: "20771 Big Rock Drive, Malibu", acquisitionPrice: "$4.7M", constructionCost: "$2M", projectedExitPrice: "$9.5M", size: "1.06 Acres", specs: "Development Land" },
      { address: "20706 Rockpoint Way, Malibu", acquisitionPrice: "$2.5M", constructionCost: "$2M", projectedExitPrice: "$6.5M", size: "1.2 Acres / 2,700 SF", specs: "Renovation Project" },
    ],
    marketHighlights: [
      "Average beach-side price around $10.9M in Malibu",
      "Beachfront listings down ~34% YoY, creating scarce, high-leverage inventory",
      "Luxury sector expected to continue ~5-7% annual growth",
      "Strong demand from entertainment and technology industry buyers",
      "Post-fire Pacific Palisades rebuild opportunity with new-build premium potential",
    ],
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
          <p className="text-muted-foreground mb-8">The deal you're looking for doesn't exist or has been removed.</p>
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
      <DealAsset deal={deal} />
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
