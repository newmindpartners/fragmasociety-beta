import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import bryanBalsingerImg from "@/assets/bryan-balsinger.png";

const deals = [
  { 
    name: "Bryan Balsinger", 
    role: "Double European Champion",
    subtitle: "Jumping",
    initials: "BB",
    image: bryanBalsingerImg
  },
  { 
    name: "Philippe Naouri", 
    role: "Malibu Mid-Century",
    subtitle: "Villa Designer",
    initials: "PN",
    image: null
  },
  { 
    name: "Tim Levy", 
    role: "Hollywood Blockbuster",
    subtitle: "Film Financier",
    initials: "TL",
    image: null
  },
  { 
    name: "André Messika", 
    role: "Master Diamantaire",
    subtitle: "",
    initials: "AM",
    image: null
  },
];

interface SignatureCardProps {
  name: string;
  role: string;
  subtitle: string;
  initials: string;
  image?: string | null;
}

const SignatureCard = ({ name, role, subtitle, initials, image }: SignatureCardProps) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="relative h-[400px] flex flex-col"
  >
    {/* Card info box */}
    <div className="bg-gradient-to-br from-[hsl(225,65%,20%)] to-[hsl(225,65%,12%)] rounded-2xl p-6 pt-5 pb-8 text-center relative z-10 border border-primary/20">
      <p className="text-muted-foreground text-sm mb-1">Invest with</p>
      <h3 className="font-serif text-2xl font-bold text-foreground mb-3">{name}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {role}
        {subtitle && <><br />{subtitle}</>}
      </p>
    </div>
    
    {/* Avatar area */}
    <div className="flex-1 flex items-end justify-center -mt-2 relative">
      {image ? (
        <img 
          src={image} 
          alt={name}
          className="h-48 w-auto object-contain"
        />
      ) : (
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-muted/30 to-muted/10 flex items-center justify-center border border-border/30">
          <span className="text-4xl font-serif font-bold text-muted-foreground/50">
            {initials}
          </span>
        </div>
      )}
    </div>
  </motion.div>
);

export const FeaturedDeals = () => (
  <section id="partners" className="relative w-full py-20 lg:py-28">
    <div className="container mx-auto px-6">
      {/* Handwriting title */}
      <div className="text-center mb-4">
        <span className="font-handwriting text-primary text-3xl lg:text-4xl">
          Signature Deals
        </span>
      </div>
      
      {/* Main heading */}
      <div className="text-center mb-4">
        <h2 className="text-3xl lg:text-5xl font-serif font-bold">
          <span className="text-foreground">Invest With </span>
          <span className="text-primary">Industry Leaders</span>
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
        <CarouselContent className="-ml-4">
          {deals.map((deal, i) => (
            <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/4">
              <SignatureCard {...deal} />
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation arrows */}
        <div className="flex justify-center gap-4 mt-8">
          <CarouselPrevious className="relative inset-0 translate-x-0 translate-y-0 h-12 w-12 border-primary/30 bg-card/50 hover:bg-primary/20 hover:border-primary" />
          <CarouselNext className="relative inset-0 translate-x-0 translate-y-0 h-12 w-12 border-primary/30 bg-card/50 hover:bg-primary/20 hover:border-primary" />
        </div>
        
        {/* CTA Button */}
        <div className="flex justify-center mt-10">
          <Button size="lg" className="group">
            Unlock Deals
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </Carousel>
    </div>
  </section>
);
