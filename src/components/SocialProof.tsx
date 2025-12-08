import { Shield } from "lucide-react";

export const SocialProof = () => (
  <div className="w-full bg-card border-t border-primary/20 py-8">
    <div className="container mx-auto px-6 text-center">
      <h4 className="text-muted-foreground text-sm font-medium mb-6 uppercase tracking-widest">
        Trusted Partners & Regulated Rails
      </h4>
      <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
        {['Custodian', 'Bank Partner', 'Audit Firm', 'Tech Enabler'].map((item, i) => (
          <div key={i} className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
            <Shield size={20} className="text-primary" /> {item}
          </div>
        ))}
      </div>
    </div>
  </div>
);
