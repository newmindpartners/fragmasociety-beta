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

// Sample deal data - in production this would come from an API/database
const dealsData: Record<string, DealData> = {
  "balsiger-horse-portfolio": {
    id: "balsiger-horse-portfolio",
    category: "Sports",
    subcategory: "Performance Rights",
    leaderName: "Bryan Balsiger",
    leaderRole: "Double European Champion Rider",
    title: "Champion Horse Portfolio",
    description: "Own a slice of a curated portfolio of competition horses with a European champion rider. Real prize money, real resale value, real upside.",
    heroVideoUrl: "https://videos.pexels.com/video-files/4625518/4625518-uhd_2560_1440_30fps.mp4",
    pitchVideoUrl: "https://videos.pexels.com/video-files/4625518/4625518-uhd_2560_1440_30fps.mp4",
    assetVideoUrl: "https://videos.pexels.com/video-files/4625518/4625518-uhd_2560_1440_30fps.mp4",
    teamVideoUrl: "https://videos.pexels.com/video-files/4625518/4625518-uhd_2560_1440_30fps.mp4",
    image: "/src/assets/bryan-balsinger.png",
    assetImages: [
      "/src/assets/category-sports.jpg",
    ],
    minTicket: "€250",
    maxTicket: "€50,000",
    targetReturn: "8-12%",
    term: "24-36 months",
    risk: "Medium" as const,
    instrumentType: "Performance Revenue Participation",
    currency: "EUR",
    distributionFrequency: "Upon prize events",
    totalRaise: "€500,000",
    currentRaised: "€125,000",
    investorCount: 32,
    teamBio: "Bryan Balsiger is a Swiss showjumping champion who has won two European Championships and competed at the highest international levels including the Olympics.",
    teamCredentials: ["Double European Champion", "Olympic Competitor", "World Ranking Top 50"],
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
    leaderRole: "Renowned Architect & Builder",
    title: "Malibu Modern Villa",
    description: "Invest in a design-led California villa project with a renowned architect and builder. Premium location, premium returns.",
    heroVideoUrl: "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4",
    pitchVideoUrl: "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4",
    assetVideoUrl: "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4",
    teamVideoUrl: "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4",
    image: "/src/assets/philippe-naouri.png",
    assetImages: [
      "/src/assets/rwa-villa.jpg",
      "/src/assets/category-realestate.jpg",
    ],
    minTicket: "€500",
    maxTicket: "€250,000",
    targetReturn: "10-15%",
    term: "18-24 months",
    risk: "Medium" as const,
    instrumentType: "Property-Backed Security Token",
    currency: "EUR",
    distributionFrequency: "Upon sale/exit",
    totalRaise: "€3,000,000",
    currentRaised: "€450,000",
    investorCount: 28,
    teamBio: "Philippe Naouri is a renowned architect and luxury property developer with a portfolio of iconic modern villas across California and the Mediterranean.",
    teamCredentials: ["$100M+ Portfolio", "Architectural Digest Featured", "20+ Luxury Builds"],
    risks: [
      { title: "Development Risk", description: "Construction projects may face delays, cost overruns, or regulatory challenges in California." },
      { title: "Property Market Risk", description: "Real estate values can fluctuate based on market conditions, location factors, and economic circumstances." },
      { title: "Currency Risk", description: "Returns may be affected by EUR/USD exchange rate fluctuations." },
      { title: "Illiquidity Risk", description: "Real estate investments are typically less liquid than traditional securities. Exit may take time." },
      { title: "Capital Risk", description: "You may lose some or all of your invested capital. Target returns are not guaranteed." },
    ],
  },
};

export interface DealData {
  id: string;
  category: string;
  subcategory: string;
  leaderName: string;
  leaderRole: string;
  title: string;
  description: string;
  heroVideoUrl: string;
  pitchVideoUrl: string;
  assetVideoUrl: string;
  teamVideoUrl: string;
  image: string;
  assetImages: string[];
  minTicket: string;
  maxTicket: string;
  targetReturn: string;
  term: string;
  risk: "Low" | "Medium" | "High";
  instrumentType: string;
  currency: string;
  distributionFrequency: string;
  totalRaise: string;
  currentRaised: string;
  investorCount: number;
  teamBio: string;
  teamCredentials: string[];
  risks: { title: string; description: string }[];
}

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
