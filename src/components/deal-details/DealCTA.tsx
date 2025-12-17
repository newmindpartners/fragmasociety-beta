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
    <section className="py-32 relative overflow-hidden">
      {/* Light Grey Studio Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-slate-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-slate-200/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
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
                <motion.div 
                  className="w-2 h-2 rounded-full bg-slate-600"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs tracking-[0.3em] uppercase text-slate-500 font-medium">
                  Accepting Investments
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 leading-[1.1] mb-6">
                Ready to <span className="italic text-slate-500 font-serif">participate?</span>
              </h2>
              
              <p className="text-lg text-slate-500 mb-10 leading-relaxed">
                Join {deal.investorCount} investors who have already committed to this opportunity. 
                Express your interest today to secure your allocation.
              </p>

              {/* Progress */}
              <div className="mb-10 bg-white p-6 border border-slate-200">
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-slate-500">{Math.round(progress)}% funded</span>
                  <span className="text-slate-700 font-medium">€{remaining.toLocaleString()} remaining</span>
                </div>
                <div className="h-2 bg-slate-100 overflow-hidden">
                  <motion.div
                    className="h-full bg-slate-800"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
                <div className="flex justify-between mt-4 text-xs text-slate-400">
                  <span>Raised: {deal.currentRaised}</span>
                  <span>Target: {deal.totalRaise}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/auth")}
                  className="bg-slate-900 text-white hover:bg-slate-800 px-8 h-14 text-base font-medium"
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
                  className="text-slate-700 hover:bg-slate-100 px-8 h-14 text-base font-medium border border-slate-200"
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
              {/* Featured card */}
              <div className="bg-slate-800 p-8 relative overflow-hidden">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-slate-700 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-white">Regulated Structure</p>
                    <p className="text-sm text-slate-400">Luxembourg securitization vehicle</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-6 flex items-center gap-5 hover:border-slate-300 transition-colors">
                <div className="w-14 h-14 bg-slate-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-slate-600" />
                </div>
                <div>
                  <p className="text-lg font-medium text-slate-900">{deal.investorCount} Investors</p>
                  <p className="text-sm text-slate-500">Have already committed</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-6 flex items-center gap-5 hover:border-slate-300 transition-colors">
                <div className="w-14 h-14 bg-slate-100 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-slate-600" />
                </div>
                <div>
                  <p className="text-lg font-medium text-slate-900">Limited Availability</p>
                  <p className="text-sm text-slate-500">Closing soon — don't miss out</p>
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
            className="mt-16 pt-10 border-t border-slate-200"
          >
            <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
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
