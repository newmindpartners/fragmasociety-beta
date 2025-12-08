import { Badge } from "@/components/Badge";

export const HowItWorks = () => (
  <section className="relative w-full py-20 lg:py-28 bg-background">
    <div className="container mx-auto px-6 text-center">
      <Badge>How It Works</Badge>
      <h2 className="text-3xl font-serif font-bold text-foreground mb-12">
        Three steps to fractional ownership
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 relative">
        <div className="absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-primary/20 -z-10 hidden md:block" />
        {[
          { step: 1, title: "Browse", desc: "Explore curated deals" },
          { step: 2, title: "Invest", desc: "Buy fractional tokens" },
          { step: 3, title: "Earn", desc: "Receive automated yields" }
        ].map(({ step, title, desc }) => (
          <div key={step} className="flex flex-col items-center gap-3">
            <div className="bg-card border border-primary w-14 h-14 rounded-full flex items-center justify-center text-primary font-bold text-xl z-10">
              {step}
            </div>
            <h4 className="text-foreground font-bold">{title}</h4>
            <p className="text-muted-foreground text-sm">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
