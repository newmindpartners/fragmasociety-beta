import { motion } from "framer-motion";
import { ArrowRight, Shield, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import type { DealData } from "@/pages/DealDetails";

interface DealCTAProps {
  deal: DealData;
}

export const DealCTA = ({ deal }: DealCTAProps) => {
  const navigate = useNavigate();

  // Calculate progress percentage
  const raised = parseFloat(deal.currentRaised.replace(/[€,]/g, ''));
  const total = parseFloat(deal.totalRaise.replace(/[€,]/g, ''));
  const progress = (raised / total) * 100;
  const remaining = total - raised;

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      {/* Animated glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[150px]"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main CTA Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left - Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-medium text-green-300">Accepting Investments</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Ready to Participate?
                </h2>
                
                <p className="text-muted-foreground mb-6">
                  Join {deal.investorCount} investors who have already committed to this opportunity. 
                  Express your interest today to secure your allocation.
                </p>

                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">{Math.round(progress)}% funded</span>
                    <span className="text-foreground font-semibold">€{remaining.toLocaleString()} remaining</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-[hsl(175,70%,50%)]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    onClick={() => navigate("/auth")}
                    className="bg-white text-background hover:bg-white/90 group"
                  >
                    Express Interest
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white hover:text-background"
                  >
                    Schedule a Call
                  </Button>
                </div>
              </div>

              {/* Right - Trust Indicators */}
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white/70" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Regulated Structure</p>
                    <p className="text-xs text-muted-foreground">Luxembourg securitization vehicle</p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-white/70" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{deal.investorCount} Investors</p>
                    <p className="text-xs text-muted-foreground">Have already committed</p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white/70" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Limited Availability</p>
                    <p className="text-xs text-muted-foreground">Closing soon - don't miss out</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <p className="text-[11px] text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              This is not investment advice. Expressing interest does not commit you to invest. 
              Full documentation will be provided before any investment decision. 
              Capital at risk. Not suitable for all investors. Please read all risk disclosures carefully.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
