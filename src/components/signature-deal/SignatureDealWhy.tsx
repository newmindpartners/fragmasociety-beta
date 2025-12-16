import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { 
  Palette, 
  Shield, 
  Crown, 
  Users, 
  Zap, 
  ArrowLeftRight, 
  Headphones,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const reasons = [
  {
    icon: Palette,
    title: "A deal crafted with you",
    subtitle: "Not copied from templates",
    description: "We co-create a bespoke investment product around your asset, brand, and story. Every detail is engineered for investor trust and long-term value.",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    bgGradient: "from-violet-500/20 via-purple-500/10 to-transparent",
  },
  {
    icon: Shield,
    title: "Institutional-grade structuring",
    subtitle: "Luxembourg compliance",
    description: "Regulated Luxembourg or partner frameworks ensure compliance, transparency, and cross-border investment access.",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    bgGradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
  },
  {
    icon: Crown,
    title: "Premium investor experience",
    subtitle: "Luxury-grade interface",
    description: "Your deal is showcased in a luxury-grade interface that elevates your brand and positions your project as a true investment product.",
    gradient: "from-amber-500 via-orange-500 to-yellow-500",
    bgGradient: "from-amber-500/20 via-orange-500/10 to-transparent",
  },
  {
    icon: Users,
    title: "Community activation",
    subtitle: "Fans become co-investors",
    description: "Transform your followers, fans, or customers into co-investors who care about your success.",
    gradient: "from-pink-500 via-rose-500 to-red-500",
    bgGradient: "from-pink-500/20 via-rose-500/10 to-transparent",
  },
  {
    icon: Zap,
    title: "Automated earnings",
    subtitle: "Smart contract distributions",
    description: "Yields, royalty flows, or revenues are distributed automatically through smart contracts.",
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    bgGradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
  },
  {
    icon: ArrowLeftRight,
    title: "Secondary-market liquidity",
    subtitle: "Trade on our marketplace",
    description: "Your investors can trade their ownership on our decentralized marketplace — increasing attractiveness and long-term engagement.",
    gradient: "from-indigo-500 via-violet-500 to-purple-500",
    bgGradient: "from-indigo-500/20 via-violet-500/10 to-transparent",
  },
  {
    icon: Headphones,
    title: "Full-service support",
    subtitle: "End-to-end partnership",
    description: "Structuring, design, web experience, legal setup, tokenization, distribution, compliance, marketing… We handle everything.",
    gradient: "from-white via-white/80 to-white/60",
    bgGradient: "from-white/10 via-white/5 to-transparent",
  }
];

export const SignatureDealWhy = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: "start",
      skipSnaps: false,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  useEffect(() => {
    if (!emblaApi) return;
    
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section className="py-32 relative overflow-hidden" ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/5" />
      
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-white font-semibold text-sm tracking-wider uppercase mb-4 block">
            The Fragma Advantage
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Why launch your signature deal
            <br />
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent">
              with Fragma?
            </span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          {/* Navigation buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hidden lg:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hidden lg:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {reasons.map((reason, index) => {
                const Icon = reason.icon;
                return (
                  <motion.div
                    key={reason.title}
                    className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="group relative h-full">
                      {/* Card */}
                      <div className="h-full p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.2)] overflow-hidden">
                        {/* Background gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${reason.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        
                        {/* Decorative circles */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-2xl" />
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-tr from-white/5 to-transparent blur-xl" />

                        {/* Content */}
                        <div className="relative z-10">
                          {/* Icon with gradient ring */}
                          <div className="relative mb-6">
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${reason.gradient} p-[2px]`}>
                              <div className="w-full h-full rounded-2xl bg-background/90 backdrop-blur flex items-center justify-center group-hover:bg-background/70 transition-colors duration-300">
                                <Icon className="w-7 h-7 text-white" />
                              </div>
                            </div>
                            {/* Glow effect */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${reason.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                          </div>

                          {/* Number badge */}
                          <div className="absolute top-0 right-0">
                            <span className={`text-5xl font-bold bg-gradient-to-br ${reason.gradient} bg-clip-text text-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-300`}>
                              0{index + 1}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-white transition-colors">
                            {reason.title}
                          </h3>
                          <p className={`text-sm font-medium bg-gradient-to-r ${reason.gradient} bg-clip-text text-transparent mb-4`}>
                            {reason.subtitle}
                          </p>

                          {/* Description */}
                          <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                            {reason.description}
                          </p>

                          {/* Bottom accent line */}
                          <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${reason.gradient} rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {reasons.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  selectedIndex === index 
                    ? "w-8 bg-white" 
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
