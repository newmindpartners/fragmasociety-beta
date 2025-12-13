import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TrailerModal } from "@/components/live-deals/TrailerModal";
import bryanBalsingerImg from "@/assets/bryan-balsinger.png";
import philippeNaouriImg from "@/assets/philippe-naouri.png";
import timLevyImg from "@/assets/tim-levy.png";
import andreMessikaImg from "@/assets/andre-messika.png";

const deals = [
  { 
    name: "Bryan Balsinger", 
    role: "Double European Champion",
    subtitle: "Jumping",
    initials: "BB",
    image: bryanBalsingerImg,
    description: "Join the journey of a double European champion as he prepares for the next Olympic cycle.",
    minTicket: "€500",
    targetReturn: "12-15%",
    term: "24 months"
  },
  { 
    name: "Philippe Naouri", 
    role: "Malibu Mid-Century",
    subtitle: "Villa Designer",
    initials: "PN",
    image: philippeNaouriImg,
    description: "Invest in a stunning mid-century modern villa designed by a renowned architect.",
    minTicket: "€1,000",
    targetReturn: "8-10%",
    term: "36 months"
  },
  { 
    name: "Tim Levy", 
    role: "Hollywood Blockbuster",
    subtitle: "Film Financier",
    initials: "TL",
    image: timLevyImg,
    description: "Co-invest in upcoming Hollywood productions with proven box office track record.",
    minTicket: "€2,500",
    targetReturn: "15-20%",
    term: "18 months"
  },
  { 
    name: "André Messika", 
    role: "Master Diamantaire",
    subtitle: "",
    initials: "AM",
    image: andreMessikaImg,
    description: "Own a share in exclusive diamond collections from a master jeweler.",
    minTicket: "€5,000",
    targetReturn: "10-12%",
    term: "12 months"
  },
];

interface SignatureCardProps {
  name: string;
  role: string;
  subtitle: string;
  initials: string;
  image?: string | null;
  onOpenModal: () => void;
}

const SignatureCard = ({ name, role, subtitle, initials, image, onOpenModal }: SignatureCardProps) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="relative h-[600px] w-[280px] flex flex-col group cursor-pointer"
  >
    {/* Card info box at top */}
    <div className="bg-gradient-to-t from-black/80 to-[hsl(225,50%,18%)]/70 backdrop-blur-xl rounded-2xl p-8 pt-10 pb-36 text-center relative z-10 h-[600px] overflow-hidden">
      <p className="text-muted-foreground text-base mb-3">Invest with</p>
      <h3 className="font-serif text-3xl font-bold text-foreground mb-6">{name}</h3>
      <p className="text-muted-foreground text-base leading-relaxed">
        {role}
        {subtitle && <><br />{subtitle}</>}
      </p>
      
      {/* Hover overlay with button */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center rounded-2xl z-30">
        <Button 
          variant="outline" 
          size="lg" 
          className="border-white text-white hover:bg-white hover:text-background relative z-40"
          onClick={onOpenModal}
        >
          Register to see detail
        </Button>
      </div>
    </div>
    
    {/* Avatar area - overlaps from bottom */}
    <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center pointer-events-none transition-all duration-300 group-hover:blur-sm group-hover:opacity-40">
      {image ? (
        <img 
          src={image} 
          alt={name}
          className="w-full h-auto object-contain drop-shadow-2xl"
        />
      ) : (
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-muted/30 to-muted/10 flex items-center justify-center border border-border/30 mb-4">
          <span className="text-4xl font-serif font-bold text-muted-foreground/50">
            {initials}
          </span>
        </div>
      )}
    </div>
  </motion.div>
);

export const FeaturedDeals = () => {
  const [selectedDeal, setSelectedDeal] = useState<typeof deals[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (deal: typeof deals[0]) => {
    setSelectedDeal(deal);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDeal(null);
  };

  return (
    <section id="partners" className="relative w-full py-20 lg:py-28">
      <div className="container mx-auto px-6">
        {/* Handwriting title */}
        <div className="text-center mb-4">
          <span className="font-handwriting text-white text-3xl lg:text-4xl">
            Signature Deals
          </span>
        </div>
        
        {/* Main heading */}
        <div className="text-center mb-4">
          <h2 className="text-3xl lg:text-5xl font-serif font-bold">
            <span className="text-foreground">Invest With </span>
            <span className="text-gradient">Industry Leaders</span>
          </h2>
        </div>
        
        {/* Subtitle */}
        <p className="text-center text-muted-foreground text-lg mb-12">
          Own a Stake in Their Next Chapter
        </p>
        
        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 justify-center">
            {deals.map((deal, i) => (
              <CarouselItem key={i} className="pl-4 basis-auto">
                <SignatureCard {...deal} onOpenModal={() => handleOpenModal(deal)} />
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Navigation arrows */}
          <div className="flex justify-center gap-4 mt-8">
            <CarouselPrevious className="relative inset-0 translate-x-0 translate-y-0 h-12 w-12 border-white/30 bg-card/50 hover:bg-white/20 hover:border-white" />
            <CarouselNext className="relative inset-0 translate-x-0 translate-y-0 h-12 w-12 border-white/30 bg-card/50 hover:bg-white/20 hover:border-white" />
          </div>
          
          {/* CTA Button */}
          <div className="flex justify-center mt-10">
            <Button size="lg" variant="outline" className="group border-white text-white hover:bg-white hover:text-background">
              Unlock Deals
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </Carousel>
      </div>

      {/* Trailer Modal */}
      <TrailerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        deal={selectedDeal ? {
          leaderName: selectedDeal.name,
          title: `${selectedDeal.role}${selectedDeal.subtitle ? ` - ${selectedDeal.subtitle}` : ''}`,
          description: selectedDeal.description,
          image: selectedDeal.image,
          minTicket: selectedDeal.minTicket,
          targetReturn: selectedDeal.targetReturn,
          term: selectedDeal.term
        } : null}
        onSeeDeal={() => {}}
      />
    </section>
  );
};
