import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Shield, Zap, Eye, Bot, Cpu, Lock, Check, Sparkles, ArrowRight, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";

const benefits = [
  { icon: Zap, title: "Predictable Fees", description: "Know exact costs before execution", number: "01", gradient: "from-amber-400 to-orange-500" },
  { icon: Shield, title: "Maximum Security", description: "Isolated transaction model", number: "02", gradient: "from-emerald-400 to-teal-500" },
  { icon: Eye, title: "Full Transparency", description: "100% auditable on-chain", number: "03", gradient: "from-blue-400 to-indigo-500" },
  { icon: Bot, title: "Bot Protection", description: "MEV & front-running proof", number: "04", gradient: "from-violet-400 to-purple-500" },
];

const comparisons = [
  { feature: "Transaction Model", eutxo: "Isolated UTXOs", account: "Shared State", advantage: "+100%" },
  { feature: "Front-running Risk", eutxo: "Impossible", account: "High risk", advantage: "Zero" },
  { feature: "Fee Predictability", eutxo: "100% upfront", account: "Variable", advantage: "Exact" },
  { feature: "Parallel Processing", eutxo: "Native support", account: "Limited", advantage: "10x" },
  { feature: "Formal Verification", eutxo: "Built-in", account: "Optional", advantage: "Native" },
];

const howItWorks = [
  { icon: Lock, text: "Each order is a unique, self-contained piece of data (UTXO)", step: "01" },
  { icon: Shield, text: "Smart contracts validate everything deterministically", step: "02" },
  { icon: Cpu, text: "No shared global state = no congestion, no race conditions", step: "03" },
  { icon: Bot, text: "Your trades cannot be front-run or manipulated", step: "04" },
];

// Animated particle component
const FloatingParticle = ({ delay, size, x, duration }: { delay: number; size: number; x: string; duration: number }) => (
  <motion.div
    className="absolute rounded-full bg-gradient-to-br from-violet-500/20 to-blue-500/10"
    style={{ width: size, height: size, left: x }}
    initial={{ y: "100%", opacity: 0 }}
    animate={{ 
      y: [100, -100],
      opacity: [0, 0.6, 0.6, 0],
      scale: [0.8, 1.2, 1, 0.8]
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

// 3D Card component with tilt effect
const Card3D = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const CardanoEUTXO = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null);

  return (
    <section className="relative py-32 lg:py-48 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Premium dark background with aurora effect */}
      <div className="absolute inset-0">
        {/* Main aurora gradients */}
        <motion.div 
          className="absolute top-0 left-1/4 w-[1200px] h-[800px] opacity-30"
          animate={{ 
            background: [
              "radial-gradient(ellipse at center, rgba(139,92,246,0.4) 0%, transparent 60%)",
              "radial-gradient(ellipse at center, rgba(99,102,241,0.4) 0%, transparent 60%)",
              "radial-gradient(ellipse at center, rgba(139,92,246,0.4) 0%, transparent 60%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "blur(80px)" }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-[1000px] h-[600px] opacity-25"
          animate={{ 
            background: [
              "radial-gradient(ellipse at center, rgba(59,130,246,0.4) 0%, transparent 60%)",
              "radial-gradient(ellipse at center, rgba(139,92,246,0.4) 0%, transparent 60%)",
              "radial-gradient(ellipse at center, rgba(59,130,246,0.4) 0%, transparent 60%)"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ filter: "blur(100px)" }}
        />
        
        {/* Animated mesh gradient overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(at 20% 30%, rgba(139,92,246,0.3) 0, transparent 50%),
              radial-gradient(at 80% 70%, rgba(59,130,246,0.25) 0, transparent 50%),
              radial-gradient(at 50% 50%, rgba(168,85,247,0.2) 0, transparent 60%)
            `
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingParticle delay={0} size={6} x="10%" duration={12} />
        <FloatingParticle delay={2} size={4} x="25%" duration={15} />
        <FloatingParticle delay={4} size={8} x="40%" duration={18} />
        <FloatingParticle delay={1} size={5} x="60%" duration={14} />
        <FloatingParticle delay={3} size={7} x="75%" duration={16} />
        <FloatingParticle delay={5} size={4} x="90%" duration={13} />
      </div>

      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-96 h-96 border-l border-t border-violet-500/10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 border-r border-b border-blue-500/10" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Premium Header Section */}
        <div className="max-w-5xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-10"
          >
            <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-500/10 to-blue-500/10 border border-violet-500/20 rounded-full backdrop-blur-sm">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-violet-400" />
              </motion.div>
              <span className="text-xs tracking-[0.3em] uppercase text-violet-300/80 font-medium">
                Built on Cardano
              </span>
            </div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-[1.0] mb-8"
          >
            Why{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-violet-400 bg-clip-text text-transparent font-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                EUTXO
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
            {" "}Gives You
            <br />
            <span className="text-slate-400 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
              More Security
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto"
          >
            Our marketplace leverages Cardano's Extended UTXO model — the same fundamental design 
            Bitcoin pioneered, enhanced for sophisticated smart contracts and institutional-grade security.
          </motion.p>
        </div>

        {/* Premium Benefits Grid - 3D Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-24"
        >
          {benefits.map((benefit, index) => (
            <Card3D key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                onMouseEnter={() => setHoveredBenefit(index)}
                onMouseLeave={() => setHoveredBenefit(null)}
                className="relative group cursor-pointer h-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className={`relative p-6 lg:p-8 h-full rounded-2xl border transition-all duration-500 ${
                  hoveredBenefit === index 
                    ? 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-violet-500/40' 
                    : 'bg-slate-900/50 border-slate-700/30 hover:border-slate-600/50'
                } backdrop-blur-xl overflow-hidden`}>
                  
                  {/* Glow effect on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`}
                  />
                  
                  {/* Large decorative number */}
                  <span 
                    className="absolute top-2 right-4 text-[80px] font-extralight leading-none text-white/[0.03] transition-all duration-500 group-hover:text-white/[0.06] group-hover:scale-110"
                    style={{ fontFamily: "'Playfair Display', serif", transform: "translateZ(20px)" }}
                  >
                    {benefit.number}
                  </span>

                  {/* Icon with gradient background */}
                  <motion.div 
                    className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.gradient} p-[1px] mb-6 transform transition-transform duration-300`}
                    animate={{ y: hoveredBenefit === index ? -5 : 0 }}
                    style={{ transform: "translateZ(30px)" }}
                  >
                    <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center">
                      <benefit.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                    </div>
                  </motion.div>
                  
                  <h4 
                    className="text-lg font-medium text-white mb-2 transition-colors duration-300"
                    style={{ transform: "translateZ(25px)" }}
                  >
                    {benefit.title}
                  </h4>
                  <p 
                    className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    {benefit.description}
                  </p>

                  {/* Bottom accent line */}
                  <motion.div 
                    className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${benefit.gradient}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoveredBenefit === index ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ transformOrigin: "left" }}
                  />
                </div>
              </motion.div>
            </Card3D>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Interactive How it Works */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <h3 className="text-2xl lg:text-3xl font-light text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                How <span className="text-violet-400 italic">EUTXO</span> Works
              </h3>
              <p className="text-slate-400">Understanding the technology behind your secure trades</p>
            </div>

            <div className="space-y-4">
              {howItWorks.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  onMouseEnter={() => setActiveStep(i)}
                  className={`relative group cursor-pointer rounded-xl transition-all duration-500 ${
                    activeStep === i 
                      ? 'bg-gradient-to-r from-violet-500/10 via-slate-800/50 to-transparent border-violet-500/30' 
                      : 'bg-slate-800/30 border-slate-700/30 hover:bg-slate-800/50'
                  } border backdrop-blur-sm overflow-hidden`}
                >
                  {/* Active indicator */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 to-blue-500"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: activeStep === i ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="flex items-center gap-5 p-5 lg:p-6">
                    {/* Step number */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-medium text-sm transition-all duration-300 ${
                      activeStep === i
                        ? 'bg-gradient-to-br from-violet-500 to-blue-500 text-white'
                        : 'bg-slate-700/50 text-slate-400 group-hover:bg-slate-700'
                    }`}>
                      {item.step}
                    </div>
                    
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                      activeStep === i
                        ? 'border-violet-500/50 bg-violet-500/10'
                        : 'border-slate-600/50 bg-slate-800/50'
                    }`}>
                      <item.icon className={`w-5 h-5 transition-colors duration-300 ${
                        activeStep === i ? 'text-violet-400' : 'text-slate-500'
                      }`} strokeWidth={1.5} />
                    </div>
                    
                    {/* Text */}
                    <p className={`text-sm lg:text-base transition-colors duration-300 ${
                      activeStep === i ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'
                    }`}>
                      {item.text}
                    </p>
                    
                    {/* Arrow */}
                    <motion.div
                      className="ml-auto"
                      animate={{ x: activeStep === i ? 5 : 0, opacity: activeStep === i ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight className="w-5 h-5 text-violet-400" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Premium Quote */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-10 relative"
            >
              <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500 via-blue-500 to-transparent" />
              <div className="pl-8 py-2">
                <p className="text-lg text-slate-300 leading-relaxed italic mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  "This is why Fragma chose Cardano — it is designed for safety-first financial markets."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Fragma Technical Team</p>
                    <p className="text-xs text-slate-500">Blockchain Architecture</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Premium Comparison Table */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card3D className="perspective-1000">
              <div 
                className="relative rounded-2xl border border-slate-700/50 overflow-hidden backdrop-blur-xl"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(30,41,59,0.8) 100%)',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)'
                }}
              >
                {/* Table Header */}
                <div className="relative p-6 lg:p-8 border-b border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl lg:text-2xl font-light text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                        EUTXO vs Account Model
                      </h3>
                      <p className="text-sm text-slate-400">Why Cardano's approach is fundamentally safer</p>
                    </div>
                    <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-emerald-400 font-medium">EUTXO Advantage</span>
                    </div>
                  </div>
                </div>
                
                {/* Table Content */}
                <div className="p-2">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700/30">
                        <th className="text-left p-4 text-[10px] font-medium text-slate-500 uppercase tracking-wider">Feature</th>
                        <th className="text-center p-4">
                          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-violet-500/20 to-blue-500/20 border border-violet-500/30 rounded-full">
                            <span className="text-[10px] font-medium text-violet-300 uppercase tracking-wider">EUTXO</span>
                          </span>
                        </th>
                        <th className="text-center p-4 text-[10px] font-medium text-slate-500 uppercase tracking-wider">Account</th>
                        <th className="text-center p-4 text-[10px] font-medium text-slate-500 uppercase tracking-wider">Advantage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisons.map((row, i) => (
                        <motion.tr
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.08 }}
                          className="group border-b border-slate-700/20 last:border-0 hover:bg-slate-800/30 transition-colors"
                        >
                          <td className="p-4 text-sm text-slate-300 font-medium">{row.feature}</td>
                          <td className="p-4 text-center">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-xs font-medium text-emerald-400">{row.eutxo}</span>
                            </span>
                          </td>
                          <td className="p-4 text-center text-sm text-slate-500">{row.account}</td>
                          <td className="p-4 text-center">
                            <span className="text-xs font-bold text-transparent bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text">
                              {row.advantage}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer CTA */}
                <div className="p-6 lg:p-8 border-t border-slate-700/30 bg-gradient-to-r from-violet-500/5 to-blue-500/5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-400">
                      Experience the difference with institutional-grade security
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-500 to-blue-500 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-violet-500/25 transition-shadow"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </Card3D>
          </motion.div>
        </div>

        {/* Bottom decorative element */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-24 flex justify-center"
        >
          <div className="h-px w-48 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};