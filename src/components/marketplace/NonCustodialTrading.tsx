import { motion } from "framer-motion";
import { Wallet, FileCode, Ban, Shield, ArrowRight } from "lucide-react";

const FloatingCard = ({ 
  icon: Icon, 
  title, 
  description, 
  delay,
  gradient 
}: { 
  icon: any; 
  title: string; 
  description: string; 
  delay: number;
  gradient: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30, rotateX: -15 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    whileHover={{ y: -8, scale: 1.02 }}
    className="relative group"
  >
    <div className={`absolute inset-0 ${gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity`} />
    <div className="glass rounded-2xl p-6 relative z-10 border border-border/50 group-hover:border-white/30 transition-colors">
      <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-xl font-serif font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </motion.div>
);

export const NonCustodialTrading = () => {
  const highlights = [
    {
      icon: Wallet,
      title: "In your wallet",
      description: "Assets remain in your personal wallet at all times",
      gradient: "bg-primary/20"
    },
    {
      icon: FileCode,
      title: "Smart contracts only",
      description: "All trades executed by immutable code, not humans",
      gradient: "bg-accent/20"
    },
    {
      icon: Ban,
      title: "No custody risk",
      description: "Eliminate the biggest risk in finance: centralized custody failure",
      gradient: "bg-green-500/20"
    }
  ];

  return (
    <section className="py-24 section-gradient-bottom-glow relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[200px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase rounded-full bg-white/5 text-white border border-white/20">
              Non-Custodial
            </span>
            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              End-to-end{" "}
              <span className="text-gradient">non-custodial trading.</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Fragma never touches your funds. We never hold your tokens. We never store your cash.
            </p>
          </motion.div>
        </div>

        {/* Main Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto mb-16"
        >
          <div className="glass rounded-3xl p-8 lg:p-12 border border-white/10">
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              {/* Your Wallet */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div
                  animate={{ 
                    boxShadow: [
                      "0 0 0px rgba(var(--primary), 0)",
                      "0 0 40px rgba(var(--primary), 0.4)",
                      "0 0 0px rgba(var(--primary), 0)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-20 h-20 rounded-2xl bg-white/5 border border-white/20 flex items-center justify-center mx-auto mb-4"
                >
                  <Wallet className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-lg font-medium text-foreground mb-1">Your Wallet</h3>
                <p className="text-sm text-muted-foreground">Full control, always</p>
              </motion.div>

              {/* Arrow + Smart Contract */}
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="hidden lg:flex items-center gap-4"
                >
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/20 flex items-center justify-center">
                    <FileCode className="w-8 h-8 text-white" />
                  </div>
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-6 h-6 text-white" />
                  </motion.div>
                </motion.div>
                <p className="text-sm text-muted-foreground mt-2">Smart Contract</p>
              </div>

              {/* Settlement */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div
                  animate={{ 
                    boxShadow: [
                      "0 0 0px rgba(var(--accent), 0)",
                      "0 0 40px rgba(var(--accent), 0.4)",
                      "0 0 0px rgba(var(--accent), 0)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  className="w-20 h-20 rounded-2xl bg-white/5 border border-white/20 flex items-center justify-center mx-auto mb-4"
                >
                  <Shield className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-lg font-medium text-foreground mb-1">On-Chain Settlement</h3>
                <p className="text-sm text-muted-foreground">Instant & verifiable</p>
              </motion.div>
            </div>

            {/* Central Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center"
            >
              <div className="inline-block px-6 py-3 rounded-full bg-white/5 border border-white/20">
                <p className="text-foreground font-medium">
                  Everything happens <span className="text-white">directly in your wallet</span>, on your terms
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Highlight Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <FloatingCard key={i} {...item} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
};
