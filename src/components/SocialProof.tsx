import { motion } from "framer-motion";

const partners = [
  { 
    name: "WOUD", 
    subtitle: "LAW FIRM",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-emerald-400">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    iconBg: "bg-emerald-500/10 border-emerald-500/20"
  },
  { 
    name: "House of Web3", 
    subtitle: "LUXEMBOURG",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-emerald-400">
        <path d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
    iconBg: "bg-emerald-500/10 border-emerald-500/20"
  },
  { 
    name: "Swissquote", 
    subtitle: "",
    icon: (
      <div className="w-6 h-6 bg-[#f15a29] rounded flex items-center justify-center text-white text-xs font-bold">
        SQ
      </div>
    ),
    iconBg: "bg-[#f15a29]/10 border-[#f15a29]/20"
  },
  { 
    name: "Bank Frick", 
    subtitle: "LIECHTENSTEIN",
    icon: (
      <div className="w-6 h-6 bg-emerald-600 rounded flex items-center justify-center text-white text-xs font-bold">
        BF
      </div>
    ),
    iconBg: "bg-emerald-600/10 border-emerald-600/20"
  },
  { 
    name: "Realiz", 
    subtitle: "",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12 4L4 8v8l8 4 8-4V8l-8-4z" fill="#14b8a6" opacity="0.8"/>
        <path d="M12 4L4 8l8 4 8-4-8-4z" fill="#22d3ee"/>
        <path d="M12 12l8-4v8l-8 4v-8z" fill="#0d9488"/>
      </svg>
    ),
    iconBg: "bg-teal-500/10 border-teal-500/20"
  },
  { 
    name: "Dfns", 
    subtitle: "WALLET INFRA",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-purple-400">
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path d="M9 12a3 3 0 106 0 3 3 0 00-6 0z" />
      </svg>
    ),
    iconBg: "bg-purple-500/10 border-purple-500/20"
  },
];

export const SocialProof = () => (
  <div className="relative w-full py-20">
    <div className="container mx-auto px-6 text-center relative z-10">
      <motion.h4 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-muted-foreground text-sm font-medium mb-12 uppercase tracking-[0.3em]"
      >
        Trusted Partners & Infrastructure
      </motion.h4>
      
      {/* First row - 5 partners */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {partners.slice(0, 5).map((partner, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-card/50 border border-white/10 backdrop-blur-sm hover:border-white/20 hover:bg-card/70 transition-all duration-300">
              <div className={`w-10 h-10 rounded-lg ${partner.iconBg} border flex items-center justify-center`}>
                {partner.icon}
              </div>
              <div className="text-left">
                <span className="text-foreground font-semibold text-sm block">{partner.name}</span>
                {partner.subtitle && (
                  <span className="text-muted-foreground text-[10px] uppercase tracking-wider">{partner.subtitle}</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Second row - 1 partner centered */}
      <div className="flex justify-center">
        {partners.slice(5).map((partner, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="group"
          >
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-card/50 border border-white/10 backdrop-blur-sm hover:border-white/20 hover:bg-card/70 transition-all duration-300">
              <div className={`w-10 h-10 rounded-lg ${partner.iconBg} border flex items-center justify-center`}>
                {partner.icon}
              </div>
              <div className="text-left">
                <span className="text-foreground font-semibold text-sm block">{partner.name}</span>
                {partner.subtitle && (
                  <span className="text-muted-foreground text-[10px] uppercase tracking-wider">{partner.subtitle}</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);
