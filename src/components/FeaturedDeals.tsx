import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/Badge";
import { DealCard } from "@/components/DealCard";

const deals = [
  { 
    name: "Bryan Balsinger", 
    role: "Show Jumping Champion", 
    title: "Elite Racehorse Portfolio", 
    tags: ["Sports", "Yield"], 
    price: "250", 
    gradientClass: "bg-gradient-to-tr from-blue-900 to-secondary",
    initials: "BB"
  },
  { 
    name: "Philippe Naouri", 
    role: "Villa Designer", 
    title: "Malibu Mid-Century Project", 
    tags: ["Real Estate", "Design"], 
    price: "500", 
    gradientClass: "bg-gradient-to-tr from-emerald-900 to-secondary",
    initials: "PN"
  },
  { 
    name: "Tim Levy", 
    role: "Film Financier", 
    title: "Hollywood Blockbuster Slate", 
    tags: ["Media", "Revenue"], 
    price: "1,000", 
    gradientClass: "bg-gradient-to-tr from-violet-900 to-secondary",
    initials: "TL"
  },
  { 
    name: "André Messika", 
    role: "Master Diamantaire", 
    title: "Rare Diamond Vault", 
    tags: ["Luxury", "Hard Asset"], 
    price: "750", 
    gradientClass: "bg-gradient-to-tr from-cyan-900 to-secondary",
    initials: "AM"
  },
];

export const FeaturedDeals = () => (
  <section id="partners" className="relative w-full py-20 lg:py-28">
    <div className="container mx-auto px-6">
      <div className="flex justify-between items-end mb-12">
        <div>
          <Badge>Featured Partners</Badge>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
            Invest with Industry Leaders
          </h2>
        </div>
        <Button variant="ghost" className="hidden md:flex">
          See all deals <ArrowRight size={16} />
        </Button>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {deals.map((deal, i) => <DealCard key={i} {...deal} />)}
      </div>
    </div>
  </section>
);
