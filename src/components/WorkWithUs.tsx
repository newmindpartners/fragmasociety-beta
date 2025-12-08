import { Button } from "@/components/ui/button";
import { Badge } from "@/components/Badge";

const cards = [
  { 
    title: "Industry Leaders", 
    desc: "Launch your signature deal. We handle structuring & tech.", 
    btn: "List your asset" 
  },
  { 
    title: "Institutions", 
    desc: "Embed tokenization with our white-label APIs and SDKs.", 
    btn: "Contact Partners" 
  },
  { 
    title: "Builders", 
    desc: "Join the team bridging TradFi and DeFi.", 
    btn: "View Open Roles" 
  }
];

export const WorkWithUs = () => (
  <section className="relative w-full py-20 lg:py-28 bg-card">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <Badge>Work With Us</Badge>
        <h2 className="text-4xl font-serif font-bold text-foreground">
          Bring your next chapter to life.
        </h2>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <div 
            key={i} 
            className="p-8 bg-secondary rounded-xl border border-foreground/5 flex flex-col items-start hover:border-primary/50 transition-colors"
          >
            <h3 className="text-foreground font-bold text-2xl mb-4">{card.title}</h3>
            <p className="text-muted-foreground mb-8 flex-grow">{card.desc}</p>
            <Button variant="outline" className="w-full">{card.btn}</Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);
