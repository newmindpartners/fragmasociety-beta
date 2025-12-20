import { motion } from "framer-motion";

import bankFrickLogo from "@/assets/partners/bank-frick.png";
import dfnsLogo from "@/assets/partners/dfns.png";
import houseOfWeb3Logo from "@/assets/partners/house-of-web3.svg";
import ledgityLogo from "@/assets/partners/ledgity.png";
import realizLogo from "@/assets/partners/realiz.png";
import swissquoteLogo from "@/assets/partners/swissquote.png";
import woudLawLogo from "@/assets/partners/woud-law.jpeg";

const partners = [
  { name: "Bank Frick", logo: bankFrickLogo },
  { name: "DFNS", logo: dfnsLogo },
  { name: "House of Web3", logo: houseOfWeb3Logo },
  { name: "Ledgity Yield", logo: ledgityLogo },
  { name: "Realiz", logo: realizLogo },
  { name: "Swissquote", logo: swissquoteLogo },
  { name: "Woud Law Firm", logo: woudLawLogo },
];

// Double the partners for seamless loop
const doubledPartners = [...partners, ...partners];

export const SocialProof = () => (
  <section className="relative w-full py-10 bg-white overflow-hidden">
    {/* Top border */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    
    <div className="container mx-auto px-6 mb-6">
      <p className="text-slate-400 text-[10px] font-medium uppercase tracking-[0.25em] text-center">
        Trusted Partners
      </p>
    </div>
    
    {/* Scrolling logos container */}
    <div className="relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
      
      {/* Animated logos */}
      <motion.div
        className="flex items-center gap-16"
        animate={{ x: [0, -50 * partners.length * 2.5] }}
        transition={{
          x: {
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {doubledPartners.map((partner, i) => (
          <div
            key={`${partner.name}-${i}`}
            className="flex-shrink-0 h-12 opacity-40 grayscale hover:opacity-70 hover:grayscale-0 transition-all duration-300"
          >
            <img 
              src={partner.logo} 
              alt={partner.name}
              className="h-full w-auto object-contain max-w-[150px]"
            />
          </div>
        ))}
      </motion.div>
    </div>
    
    {/* Bottom border */}
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
  </section>
);
