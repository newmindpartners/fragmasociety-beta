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
import philippeNaouriImg from "@/assets/philippe-naouri.png";

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
    image: philippeNaouriImg
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
    className="relative h-[480px] flex flex-col group cursor-pointer"
  >
    {/* Card info box at top */}
    <div className="bg-gradient-to-t from-black/80 to-[hsl(225,50%,18%)]/70 backdrop-blur-xl rounded-2xl p-6 pt-8 pb-32 text-center relative z-10 h-[340px] overflow-hidden">
      <p className="text-muted-foreground text-sm mb-2">Invest with</p>
      <h3 className="font-serif text-2xl font-bold text-foreground mb-6">{name}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {role}
        {subtitle && <><br />{subtitle}</>}
      </p>
      
      {/* Hover overlay with button */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center rounded-2xl">
        <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
          Register to see detail
        </Button>
      </div>
    </div>
    
    {/* Avatar area - overlaps from bottom */}
    <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center">
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
