import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import fundPartnersBg from "@/assets/fund-partners-bg.jpg";

export const StrategyPartners = () => {
  return (
    <section 
      className="py-24 relative"
      style={{
        backgroundImage: `url(${fundPartnersBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/75" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white">
            Work with Fragma as your tokenised yield & growth partner.
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card/90 backdrop-blur-sm border border-border rounded-xl p-8"
          >
            <h3 className="text-xl font-serif font-bold text-foreground mb-4">
              Distribution Partners
            </h3>
            <p className="text-muted-foreground mb-6">
              Banks, wealth platforms and multi-family offices can integrate
              Fragma products into their offering, or combine it with our
              tokenisation rails and white-label modules to launch their own
              branded RWA strategies.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="text-sm text-muted-foreground flex gap-2">
                <span className="text-primary">•</span>
                White-label documentation and marketing support.
              </li>
              <li className="text-sm text-muted-foreground flex gap-2">
                <span className="text-primary">•</span>
                API and operational integration with Fragma Finance infrastructure.
              </li>
            </ul>
            <Button variant="outline" className="group">
              Discuss partnership
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
