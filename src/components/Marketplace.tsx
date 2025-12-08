import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/Badge";

export const Marketplace = () => (
  <section id="marketplace" className="relative w-full py-20 lg:py-28 bg-secondary/50">
    <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <Badge>Marketplace</Badge>
        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-6">
          Your assets, your price, your pace.
        </h2>
        <p className="text-muted-foreground mb-8">
          The Fragma Society marketplace lets you trade your tokenized slices peer‑to‑peer. Place limit orders and manage your portfolio 24/7.
        </p>
        <ul className="space-y-4 mb-8">
          {[
            'You keep control (Non-custodial)', 
            'Set your own price (Limit Orders)', 
            'Instant Settlement (On-chain)'
          ].map((item) => (
            <li key={item} className="flex items-center gap-3 text-foreground">
              <CheckCircle size={16} className="text-primary" /> {item}
            </li>
          ))}
        </ul>
        <Button>Explore Marketplace UI</Button>
      </div>

      {/* Mock Trading UI */}
      <div className="relative bg-background border border-foreground/10 rounded-xl p-4 shadow-card font-mono text-xs">
        <div className="flex justify-between items-center mb-4 border-b border-foreground/5 pb-2">
          <div className="flex gap-4">
            <span className="text-foreground font-bold">FRG-VILLA-01</span>
            <span className="text-primary">+4.2%</span>
          </div>
          <div className="text-muted-foreground">24h Vol: €142k</div>
        </div>
        
        <div className="flex gap-4 h-64">
          <div className="flex-1 flex items-end justify-between gap-1 pb-4 border-b border-foreground/5 relative">
            {/* Chart Candles */}
            {[40, 60, 45, 70, 65, 80, 75, 90, 85, 100].map((h, i) => (
              <div 
                key={i} 
                className="w-full bg-primary/20 hover:bg-primary transition-colors rounded-sm" 
                style={{ height: `${h}%` }} 
              />
            ))}
          </div>
          <div className="w-32 hidden sm:block border-l border-foreground/5 pl-4">
            <div className="text-muted-foreground mb-2">Order Book</div>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex justify-between mb-1">
                <span className="text-destructive">{500 + i * 5}</span>
                <span className="text-muted-foreground">{(Math.random() * 2).toFixed(2)}</span>
              </div>
            ))}
            <div className="my-2 border-t border-foreground/5"></div>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex justify-between mb-1">
                <span className="text-primary">{490 - i * 5}</span>
                <span className="text-muted-foreground">{(Math.random() * 2).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
