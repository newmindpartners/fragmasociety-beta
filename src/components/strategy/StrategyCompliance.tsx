import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { Scale, Shield, Eye, FileCheck, CheckCircle2 } from "lucide-react";

const complianceItems = [
  {
    icon: Scale,
    title: "MiCA Compliance",
    description: "Native compliance with Crypto-asset Markets regulations, anticipating future directives.",
    gradient: "from-blue-500/20 to-indigo-500/20",
    iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
    delay: 0
  },
  {
    icon: Shield,
    title: "AMLD5 Integration",
    description: "Robust anti-money laundering procedures built into every transaction and verification.",
    gradient: "from-violet-500/20 to-purple-500/20",
    iconBg: "bg-gradient-to-br from-violet-500 to-purple-600",
    delay: 0.1
  },
  {
    icon: Eye,
    title: "GDPR Protection",
    description: "Selective data disclosure and complete auditability respecting user privacy.",
    gradient: "from-cyan-500/20 to-blue-500/20",
    iconBg: "bg-gradient-to-br from-cyan-500 to-blue-600",
    delay: 0.2
  }
];

const ComplianceCard = ({ item, index, isInView }: { item: typeof complianceItems[0]; index: number; isInView: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: 0.3 + item.delay, 
        ease: [0.22, 1, 0.36, 1] as const 
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative cursor-pointer"
    >
      {/* Card glow effect */}
      <motion.div 
        className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${item.gradient} blur-xl opacity-0 transition-opacity duration-500`}
        animate={{ opacity: isHovered ? 0.6 : 0 }}
      />
      
      <div className="relative h-full p-8 lg:p-10 rounded-2xl bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden">
        {/* Animated background gradient */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0`}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 opacity-0"
          animate={{ 
            opacity: isHovered ? 1 : 0,
            background: isHovered 
              ? "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.8) 45%, rgba(255,255,255,0.8) 50%, transparent 55%)"
              : "none",
            backgroundPosition: isHovered ? "200% 0" : "-100% 0"
          }}
          transition={{ duration: 0.6 }}
          style={{ backgroundSize: "200% 100%" }}
        />

        {/* Icon */}
        <motion.div 
          className="relative mb-6"
          animate={{ 
            y: isHovered ? -4 : 0,
            scale: isHovered ? 1.05 : 1
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className={`w-14 h-14 rounded-2xl ${item.iconBg} flex items-center justify-center shadow-lg`}>
            <item.icon className="w-7 h-7 text-white" strokeWidth={1.8} />
          </div>
          
          {/* Icon glow */}
          <motion.div 
            className={`absolute inset-0 rounded-2xl ${item.iconBg} blur-xl`}
            animate={{ opacity: isHovered ? 0.5 : 0, scale: isHovered ? 1.5 : 1 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>

        {/* Title */}
        <motion.h3 
          className="relative text-xl lg:text-2xl font-semibold text-slate-900 mb-3 text-left font-sans"
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {item.title}
        </motion.h3>

        {/* Description */}
        <p className="relative text-slate-500 leading-relaxed text-left text-[15px]">
          {item.description}
        </p>

        {/* Bottom accent line */}
        <motion.div 
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.iconBg.replace('bg-', '')}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />
      </div>
    </motion.div>
  );
};

export const StrategyCompliance = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section 
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%)"
      }}
    >
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-100/30 rounded-full blur-3xl" />
      
      {/* Subtle pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #1e40af 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <FileCheck className="w-4 h-4 text-blue-600" strokeWidth={2} />
            </motion.div>
            <span className="text-sm font-medium text-blue-700">Enterprise-Grade Compliance</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-slate-900 mb-6 tracking-tight leading-[1.1]"
          >
            Regulations Integrated at{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Architecture Level
              </span>
              <motion.span 
                className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-blue-200 to-violet-200 rounded-full -z-10"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                style={{ transformOrigin: "left" }}
              />
            </span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-16 leading-relaxed"
          >
            Built-in compliance frameworks ensuring your business meets all regulatory standards from day one
          </motion.p>

          {/* Compliance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {complianceItems.map((item, index) => (
              <ComplianceCard key={item.title} item={item} index={index} isInView={isInView} />
            ))}
          </div>

          {/* Bottom Statement */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-6 flex-wrap">
              {["Automated Audits", "Real-time Monitoring", "Instant Reporting"].map((feature, i) => (
                <motion.div 
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-sm font-medium text-slate-600">{feature}</span>
                </motion.div>
              ))}
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 1.1 }}
              className="mt-8 text-slate-400 text-sm leading-relaxed max-w-xl mx-auto"
            >
              Our platform architecture integrates regulatory compliance at every layer, ensuring seamless adherence to evolving financial regulations.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
