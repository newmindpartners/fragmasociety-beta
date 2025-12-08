const pillars = [
  { 
    label: "OWN", 
    title: "Fractional Stakes", 
    desc: "Access tokenized slices of properties and portfolios. Diversify without millions." 
  },
  { 
    label: "EARN", 
    title: "Automated Yield", 
    desc: "Smart contracts handle payouts directly to your wallet with full traceability." 
  },
  { 
    label: "EXIT", 
    title: "Secondary Market", 
    desc: "List, bid and trade tokens when buyers are available. No paperwork." 
  }
];

export const Pillars = () => (
  <section className="relative w-full py-20 lg:py-28 bg-background">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-serif font-bold text-foreground text-center mb-16">
        Own. Earn. Exit.
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {pillars.map((item, i) => (
          <div 
            key={i} 
            className="relative p-8 rounded-2xl bg-gradient-card border border-foreground/5 text-center hover:border-primary/30 transition-colors"
          >
            <div className="text-primary font-bold tracking-widest mb-4">{item.label}</div>
            <h3 className="text-foreground text-xl font-bold mb-4">{item.title}</h3>
            <p className="text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
