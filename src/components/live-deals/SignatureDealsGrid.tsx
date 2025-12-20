import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { SignatureDealCard } from "./SignatureDealCard";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import bryanImage from "@/assets/bryan-balsinger.png";
import philippeImage from "@/assets/philippe-naouri.png";
import timImage from "@/assets/tim-levy.png";
import andreImage from "@/assets/andre-messika.png";

const placeholderVideos = [
  "https://videos.pexels.com/video-files/4625518/4625518-uhd_2560_1440_30fps.mp4",
  "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4",
  "https://videos.pexels.com/video-files/5377684/5377684-uhd_2560_1440_25fps.mp4",
  "https://videos.pexels.com/video-files/4812203/4812203-uhd_2560_1440_25fps.mp4",
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
    term: "24–36 mo",
    risk: "Medium" as const,
    comingSoon: false,
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
    term: "18–24 mo",
    risk: "Medium" as const,
    comingSoon: true,
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
    term: "36–48 mo",
    risk: "High" as const,
    comingSoon: true,
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
    term: "48–60 mo",
    risk: "Low" as const,
    comingSoon: true,
  },
];

export const SignatureDealsGrid = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardWidth = container.scrollWidth / signatureDeals.length;
    container.scrollTo({
      left: cardWidth * index,
      behavior: 'smooth'
    });
    setCurrentIndex(index);
  }, []);

  const scrollPrev = useCallback(() => {
    const newIndex = currentIndex === 0 ? signatureDeals.length - 1 : currentIndex - 1;
    scrollToIndex(newIndex);
  }, [currentIndex, scrollToIndex]);

  const scrollNext = useCallback(() => {
    const newIndex = currentIndex === signatureDeals.length - 1 ? 0 : currentIndex + 1;
    scrollToIndex(newIndex);
  }, [currentIndex, scrollToIndex]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      scrollNext();
    } else if (isRightSwipe) {
      scrollPrev();
    }
  };

  // Update current index based on scroll position
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cardWidth = container.scrollWidth / signatureDeals.length;
      const newIndex = Math.round(container.scrollLeft / cardWidth);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < signatureDeals.length) {
        setCurrentIndex(newIndex);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentIndex]);

  const handleSeeDeal = (dealId: string) => {
    navigate(`/deal/${dealId}`);
  };

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Premium Light Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-radial from-white via-slate-50/60 to-transparent rounded-full blur-3xl opacity-80" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-slate-100/40 via-slate-100/30 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-6 lg:px-12 mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="w-12 h-px bg-slate-300" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-slate-400 font-medium">
                  Signature Deals
                </span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 leading-[1.05]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Invest alongside
                <br />
                <span className="italic text-slate-500">industry leaders.</span>
              </motion.h2>
            </div>

            {/* Navigation Arrows */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <button
                onClick={scrollPrev}
                className="w-14 h-14 rounded-full border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white flex items-center justify-center transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <button
                onClick={scrollNext}
                className="w-14 h-14 rounded-full border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white flex items-center justify-center transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Carousel with dark blur edge on right only */}
        <div className="relative">
          {/* Right dark blur fade */}
          <div className="absolute right-0 top-0 bottom-0 w-24 lg:w-40 bg-gradient-to-l from-slate-900 via-slate-900/80 to-transparent z-10 pointer-events-none" />

          {/* Scrollable Cards */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-6 lg:px-24 snap-x snap-mandatory touch-pan-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {signatureDeals.map((deal) => (
              <div 
                key={deal.id} 
                className="flex-none w-[85%] sm:w-[45%] lg:w-[32%] snap-start"
              >
                <SignatureDealCard
                  {...deal}
                  onSeeDeal={() => handleSeeDeal(deal.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Progress indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="container mx-auto px-6 lg:px-12 mt-12"
        >
          <div className="flex items-center justify-center gap-2">
            {signatureDeals.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  index === currentIndex 
                    ? 'w-8 bg-slate-900' 
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-20 flex justify-center"
        >
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};
