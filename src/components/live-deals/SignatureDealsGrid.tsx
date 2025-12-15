import { useState } from "react";
import { SignatureDealCard } from "./SignatureDealCard";
import { TrailerModal } from "./TrailerModal";
import { useNavigate } from "react-router-dom";

import bryanImage from "@/assets/bryan-balsinger.png";
import philippeImage from "@/assets/philippe-naouri.png";
import timImage from "@/assets/tim-levy.png";
import andreImage from "@/assets/andre-messika.png";

// Placeholder video URLs for hover preview
const placeholderVideos = [
  "https://videos.pexels.com/video-files/4625518/4625518-uhd_2560_1440_30fps.mp4", // horse riding
  "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4", // luxury architecture
  "https://videos.pexels.com/video-files/5377684/5377684-uhd_2560_1440_25fps.mp4", // cinema/film
  "https://videos.pexels.com/video-files/4812203/4812203-uhd_2560_1440_25fps.mp4", // luxury/diamonds
];

const signatureDeals = [
  {
    id: "balsiger-horse-portfolio",
    category: "Sports",
    subcategory: "Performance Rights",
    leaderName: "Bryan Balsiger",
    leaderRole: "Double European Champion Rider",
    title: "Champion Horse Portfolio",
    description: "Own a slice of a curated portfolio of competition horses with a European champion rider. Real prize money, real resale value, real upside.",
    image: bryanImage,
    videoUrl: placeholderVideos[0],
    minTicket: "€250",
    targetReturn: "8–12% p.a.",
    term: "24–36 months",
    risk: "Medium" as const,
  },
  {
    id: "naouri-malibu-villa",
    category: "Real Estate",
    subcategory: "Luxury Development",
    leaderName: "Philippe Naouri",
    leaderRole: "Renowned Architect & Builder",
    title: "Malibu Modern Villa",
    description: "Invest in a design-led California villa project with a renowned architect and builder. Premium location, premium returns.",
    image: philippeImage,
    videoUrl: placeholderVideos[1],
    minTicket: "€500",
    targetReturn: "10–15% p.a.",
    term: "18–24 months",
    risk: "Medium" as const,
  },
  {
    id: "levy-film-slate",
    category: "Film",
    subcategory: "Entertainment Rights",
    leaderName: "Tim Levy",
    leaderRole: "Hollywood Film Producer",
    title: "Hollywood Film Financing Slate",
    description: "Get exposure to a portfolio of blockbuster-backed film deals with structured recoupment. Studio-level deals, investor-level access.",
    image: timImage,
    videoUrl: placeholderVideos[2],
    minTicket: "€1,000",
    targetReturn: "12–18% p.a.",
    term: "36–48 months",
    risk: "High" as const,
  },
  {
    id: "messika-diamond-fund",
    category: "Luxury",
    subcategory: "Collectibles",
    leaderName: "André Messika",
    leaderRole: "Founder, Maison Messika",
    title: "Rare Diamond Fund",
    description: "Co-own a curated vault of rare diamonds sourced by a world-class maison. Tangible luxury, tokenized access.",
    image: andreImage,
    videoUrl: placeholderVideos[3],
    minTicket: "€2,500",
    targetReturn: "6–10% p.a.",
    term: "48–60 months",
    risk: "Low" as const,
  },
];

export const SignatureDealsGrid = () => {
  const navigate = useNavigate();
  const [selectedDeal, setSelectedDeal] = useState<typeof signatureDeals[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWatchTrailer = (deal: typeof signatureDeals[0]) => {
    setSelectedDeal(deal);
    setIsModalOpen(true);
  };

  const handleSeeDeal = (dealId: string) => {
    // Navigate to deal detail page (to be created)
    navigate(`/deals/${dealId}`);
  };

  return (
    <section className="py-20 relative">
      <div className="container">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {signatureDeals.map((deal) => (
            <SignatureDealCard
              key={deal.id}
              {...deal}
              onWatchTrailer={() => handleWatchTrailer(deal)}
              onSeeDeal={() => handleSeeDeal(deal.id)}
            />
          ))}
        </div>
      </div>

      <TrailerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        deal={selectedDeal}
        onSeeDeal={() => selectedDeal && handleSeeDeal(selectedDeal.id)}
      />
    </section>
  );
};
