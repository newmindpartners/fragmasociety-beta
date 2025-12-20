import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { SignatureDealCard } from "./SignatureDealCard";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

import bryanImage from "@/assets/bryan-balsinger.png";
import philippeImage from "@/assets/philippe-naouri.png";
import timImage from "@/assets/tim-levy.png";
import andreImage from "@/assets/andre-messika.png";

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
    minTicket: "€2,500",
    targetReturn: "6–10% p.a.",
    term: "48–60 mo",
    risk: "Low" as const,
    comingSoon: true,
  },
];

export const SignatureDealsGrid = () => {
  const navigate = useNavigate();
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    containScroll: false,
  });
  
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

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
                className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  canScrollPrev || true
                    ? 'border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white'
                    : 'border-slate-200 text-slate-300 cursor-not-allowed'
                }`}
                disabled={!canScrollPrev && false}
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <button
                onClick={scrollNext}
                className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  canScrollNext || true
                    ? 'border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white'
                    : 'border-slate-200 text-slate-300 cursor-not-allowed'
                }`}
                disabled={!canScrollNext && false}
              >
                <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Carousel with blur edges */}
        <div className="relative">
          {/* Left blur fade */}
          <div className="absolute left-0 top-0 bottom-0 w-24 lg:w-48 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />
          
          {/* Right blur fade */}
          <div className="absolute right-0 top-0 bottom-0 w-24 lg:w-48 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />

          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {signatureDeals.map((deal, index) => (
                <div 
                  key={deal.id} 
                  className="flex-none w-[85%] sm:w-[45%] lg:w-[32%] pl-6 first:pl-12 lg:first:pl-24"
                >
                  <SignatureDealCard
                    {...deal}
                    onSeeDeal={() => handleSeeDeal(deal.id)}
                  />
                </div>
              ))}
            </div>
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
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  index === selectedIndex 
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
