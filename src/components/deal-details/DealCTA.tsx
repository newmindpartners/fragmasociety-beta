import { motion } from "framer-motion";
import { ArrowRight, Shield, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import type { DealData } from "@/types/deal";

interface DealCTAProps {
  deal: DealData;
}

export const DealCTA = ({ deal }: DealCTAProps) => {
  const navigate = useNavigate();

  // Calculate progress percentage
  const raised = parseFloat(deal.currentRaised?.replace(/[€,]/g, '') || '0');
  const total = parseFloat(deal.totalRaise?.replace(/[€,]/g, '') || '1');
  const progress = (raised / total) * 100;
  const remaining = total - raised;

  return (
    <section className="py-32 bg-neutral-900">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs tracking-[0.3em] uppercase text-emerald-400 font-medium">
                  Accepting Investments
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-6">
                Ready to <span className="italic">participate?</span>
              </h2>
              
              <p className="text-lg text-neutral-400 mb-10 leading-relaxed">
                Join {deal.investorCount} investors who have already committed to this opportunity. 
                Express your interest today to secure your allocation.
              </p>

              {/* Progress - Elegant */}
              <div className="mb-10">
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-neutral-500">{Math.round(progress)}% funded</span>
                  <span className="text-white font-medium">€{remaining.toLocaleString()} remaining</span>
                </div>
                <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/auth")}
                  className="bg-white text-neutral-900 hover:bg-neutral-100 rounded-full px-8 h-14 text-base font-medium"
                >
                  Express Interest
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-white hover:bg-white/10 rounded-full px-8 h-14 text-base font-medium border border-neutral-700"
                >
                  Schedule a Call
                </Button>
              </div>
            </motion.div>

            {/* Right - Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="bg-neutral-800/50 border border-neutral-700 rounded-2xl p-6 flex items-center gap-5">
                <div className="w-14 h-14 rounded-xl bg-neutral-700/50 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-neutral-300" />
                </div>
                <div>
                  <p className="text-lg font-medium text-white">Regulated Structure</p>
                  <p className="text-sm text-neutral-400">Luxembourg securitization vehicle</p>
                </div>
              </div>

              <div className="bg-neutral-800/50 border border-neutral-700 rounded-2xl p-6 flex items-center gap-5">
                <div className="w-14 h-14 rounded-xl bg-neutral-700/50 flex items-center justify-center">
                  <Users className="w-6 h-6 text-neutral-300" />
                </div>
                <div>
                  <p className="text-lg font-medium text-white">{deal.investorCount} Investors</p>
                  <p className="text-sm text-neutral-400">Have already committed</p>
                </div>
              </div>

              <div className="bg-neutral-800/50 border border-neutral-700 rounded-2xl p-6 flex items-center gap-5">
                <div className="w-14 h-14 rounded-xl bg-neutral-700/50 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-neutral-300" />
                </div>
                <div>
                  <p className="text-lg font-medium text-white">Limited Availability</p>
                  <p className="text-sm text-neutral-400">Closing soon — don't miss out</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 pt-10 border-t border-neutral-800"
          >
            <p className="text-xs text-neutral-500 max-w-3xl leading-relaxed">
              This is not investment advice. Expressing interest does not commit you to invest. 
              Full documentation will be provided before any investment decision. 
              Capital at risk. Not suitable for all investors. Please read all risk disclosures carefully.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};