import { Gem, Lock, TrendingUp } from "lucide-react";
import { Badge } from "@/components/Badge";

const features = [
  { 
    title: "Backed by audited assets", 
    desc: "Curated deals in real estate and luxury, vetted with institutional diligence.", 
    icon: Gem 
  },
  { 
    title: "Infrastructure you can trust", 
    desc: "Bank-level security, multi-sig wallets and ZK compliance controls.", 
    icon: Lock 
  },
  { 
    title: "Liquidity optionality", 
    desc: "Invest for yield, then trade your slices on our secondary marketplace.", 
    icon: TrendingUp 
  }
];

export const Features = () => (
  <section id="features" className="relative w-full py-20 lg:py-28 bg-card">
    <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16">
      <div>
        <Badge>Why Fragma Society</Badge>
        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-6">
          Fractional ownership without the complexity.
        </h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Tokenization is rewriting how the world owns real estate, art, and private markets. Fragma Society wraps this power into a simple investing experience.
        </p>
      </div>
      <div className="space-y-8">
        {features.map((item, i) => (
          <div key={i} className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <item.icon className="text-primary" size={24} />
            </div>
            <div>
              <h4 className="text-foreground font-bold text-lg mb-2">{item.title}</h4>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
