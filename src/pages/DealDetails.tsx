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
  "1": {
    id: "1",
    category: "Film & Entertainment",
    subcategory: "Feature Film",
    leaderName: "Philippe Naouri",
    leaderRole: "Film Producer & Director",
    title: "Premium Film Investment Opportunity",
    description: "Co-invest in an award-winning director's next feature film with established distribution channels across Europe and North America.",
    heroVideoUrl: "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761",
    pitchVideoUrl: "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761",
    assetVideoUrl: "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761",
    teamVideoUrl: "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761",
    image: "/src/assets/philippe-naouri.png",
    assetImages: [
      "/src/assets/rwa-film.jpg",
      "/src/assets/category-film.jpg",
    ],
    minTicket: "€5,000",
    maxTicket: "€500,000",
    targetReturn: "12-18%",
    term: "24-36 months",
    risk: "Medium" as const,
    instrumentType: "Revenue Participation Notes",
    currency: "EUR",
    distributionFrequency: "Upon revenue events",
    totalRaise: "€2,500,000",
    currentRaised: "€875,000",
    investorCount: 47,
    teamBio: "Philippe Naouri is an acclaimed French film producer with over 20 years of experience in international co-productions. His films have premiered at Cannes, Venice, and Berlin film festivals.",
    teamCredentials: ["Cannes Film Festival Selection", "César Award Nominee", "20+ International Productions"],
    risks: [
      { title: "Production Risk", description: "Film production may face delays, budget overruns, or creative challenges that could impact the final product and returns." },
      { title: "Distribution Risk", description: "Commercial success depends on securing distribution deals and audience reception, which cannot be guaranteed." },
      { title: "Market Risk", description: "Entertainment market conditions and audience preferences may change, affecting potential revenues." },
      { title: "Illiquidity Risk", description: "Your investment may be illiquid for the duration of the term. Secondary market trading may not always be available." },
      { title: "Capital Risk", description: "You may lose some or all of your invested capital. Returns are not guaranteed." },
    ],
  },
  "2": {
    id: "2",
    category: "Real Estate",
    subcategory: "Luxury Villa",
    leaderName: "André Messika",
    leaderRole: "Real Estate Developer",
    title: "Mediterranean Luxury Villa Development",
    description: "Fractional ownership in a premium villa development on the French Riviera with rental income and appreciation potential.",
    heroVideoUrl: "https://player.vimeo.com/external/517090081.sd.mp4?s=60b5a7a3a8f3c0e3c9f2c9f2c9f2c9f2c9f2c9f2&profile_id=164",
    pitchVideoUrl: "https://player.vimeo.com/external/517090081.sd.mp4?s=60b5a7a3a8f3c0e3c9f2c9f2c9f2c9f2c9f2c9f2&profile_id=164",
    assetVideoUrl: "https://player.vimeo.com/external/517090081.sd.mp4?s=60b5a7a3a8f3c0e3c9f2c9f2c9f2c9f2c9f2c9f2&profile_id=164",
    teamVideoUrl: "https://player.vimeo.com/external/517090081.sd.mp4?s=60b5a7a3a8f3c0e3c9f2c9f2c9f2c9f2c9f2c9f2&profile_id=164",
    image: "/src/assets/andre-messika.png",
    assetImages: [
      "/src/assets/rwa-villa.jpg",
      "/src/assets/category-realestate.jpg",
    ],
    minTicket: "€10,000",
    maxTicket: "€1,000,000",
    targetReturn: "8-12%",
    term: "36-60 months",
    risk: "Low" as const,
    instrumentType: "Property-Backed Security Token",
    currency: "EUR",
    distributionFrequency: "Quarterly",
    totalRaise: "€5,000,000",
    currentRaised: "€2,150,000",
    investorCount: 83,
    teamBio: "André Messika has been developing luxury properties across the Mediterranean for over 15 years, with a portfolio exceeding €200M in completed projects.",
    teamCredentials: ["€200M+ Portfolio", "15+ Years Experience", "Award-Winning Developments"],
    risks: [
      { title: "Property Market Risk", description: "Real estate values can fluctuate based on market conditions, location factors, and economic circumstances." },
      { title: "Rental Income Risk", description: "Projected rental income is not guaranteed and depends on occupancy rates and market demand." },
      { title: "Development Risk", description: "Construction projects may face delays, cost overruns, or regulatory challenges." },
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
