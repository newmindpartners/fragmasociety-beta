import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Clock, Shield, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";

export const TwoWayOrders = () => {
  const benefits = [
    { 
      icon: Clock, 
      title: "14 Days Left", 
      description: "To invest in this opportunity",
      variant: "dark"
    },
    { 
      icon: Shield, 
      title: "Regulated Structure", 
      description: "Luxembourg securitization vehicle",
      variant: "light"
    },
    { 
      icon: Timer, 
      title: "Limited Availability", 
      description: "Closing soon — don't miss out",
      variant: "light"
    },
  ];

  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Subtle pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(30,41,59,1) 1px, transparent 1px), linear-gradient(90deg, rgba(30,41,59,1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-[#1e293b]" />
              <span className="text-xs tracking-[0.3em] uppercase text-slate-400 font-medium">
                Accepting Investments
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-[#1e293b] leading-[1.05] tracking-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Ready to
              <br />
              <span className="italic text-slate-400">participate?</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-500 max-w-md mb-10 leading-relaxed"
            >
              Express your interest today to secure your allocation in this exclusive opportunity.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Button 
                size="lg"
                className="bg-[#1e293b] text-white hover:bg-[#0f172a] rounded-full px-8 h-14 text-sm font-medium tracking-wide"
              >
                Express Interest
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-300 text-slate-600 hover:bg-slate-100 rounded-full px-8 h-14 text-sm font-medium tracking-wide"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Talk to our Team
              </Button>
            </motion.div>
          </div>

          {/* Right - Benefits Stack */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 flex items-center gap-5 ${
                  benefit.variant === 'dark' 
                    ? 'bg-[#1e293b] border-none' 
                    : 'bg-white border border-slate-200'
                }`}
                style={{
                  boxShadow: benefit.variant === 'light' 
                    ? '0 4px 20px -5px rgba(0, 0, 0, 0.06)'
                    : '0 8px 30px -8px rgba(15, 23, 42, 0.3)',
                }}
              >
                <div className={`w-14 h-14 flex items-center justify-center ${
                  benefit.variant === 'dark' 
                    ? 'bg-slate-800 border border-slate-700' 
                    : 'bg-slate-50 border border-slate-200'
                }`}>
                  <benefit.icon className={`w-6 h-6 ${
                    benefit.variant === 'dark' ? 'text-slate-400' : 'text-slate-400'
                  }`} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className={`text-lg font-medium mb-1 ${
                    benefit.variant === 'dark' ? 'text-white' : 'text-[#1e293b]'
                  }`}>
                    {benefit.title}
                  </h3>
                  <p className={`text-sm ${
                    benefit.variant === 'dark' ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
