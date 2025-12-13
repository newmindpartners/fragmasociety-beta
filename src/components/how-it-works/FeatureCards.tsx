import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Shield, 
  Landmark, 
  Wallet, 
  Link2, 
  FileWarning,
  Sparkles
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "KYC verified",
    description: "Every investor verified",
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Landmark,
    title: "Regulated",
    description: "Luxembourg structures",
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
  },
  {
    icon: Wallet,
    title: "Non-custodial",
    description: "You control your assets",
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
  },
  {
    icon: Link2,
    title: "On-chain",
    description: "Cardano blockchain",
    gradient: "from-orange-500/20 to-red-500/20",
    iconColor: "text-orange-400",
  },
  {
    icon: FileWarning,
    title: "Clear risks",
    description: "No hidden terms",
    gradient: "from-yellow-500/20 to-amber-500/20",
    iconColor: "text-yellow-400",
  },
  {
    icon: Sparkles,
    title: "Curated",
    description: "Hand-picked deals",
    gradient: "from-primary/20 to-accent/20",
    iconColor: "text-primary",
  },
];

export const FeatureCards = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Built on{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              trust
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Safe by design. Transparent by technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative h-full p-8 bg-card/80 backdrop-blur-sm border border-border/50 rounded-3xl hover:border-primary/30 transition-colors overflow-hidden">
                {/* Animated corner accent */}
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                />

                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}
                  whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                >
                  <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                </motion.div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
