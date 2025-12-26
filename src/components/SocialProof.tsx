import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import bankFrickLogo from "@/assets/partners/bank-frick-new.png";
import dfnsLogo from "@/assets/partners/dfns-new.png";
import houseOfWeb3Logo from "@/assets/partners/house-of-web3.svg";
import swissquoteLogo from "@/assets/partners/swissquote-new.png";
import woudLawLogo from "@/assets/partners/woud-law-new.png";

const partners = [
  { name: "Bank Frick", logo: bankFrickLogo, className: "", url: "https://www.bankfrick.li" },
  { name: "DFNS", logo: dfnsLogo, className: "", url: "https://www.dfns.co" },
  { name: "House of Web3", logo: houseOfWeb3Logo, className: "", url: "https://www.houseofweb3.lu/" },
  { name: "Swissquote", logo: swissquoteLogo, className: "scale-150", url: "https://www.swissquote.com" },
  { name: "Woud Law Firm", logo: woudLawLogo, className: "", url: "https://woudlaw.com/" },
];


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
    <div className="relative overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
      
      {/* Animated logos - seamless infinite scroll */}
      <TooltipProvider delayDuration={100}>
        <motion.div 
          className="flex"
          animate={{ x: [0, -1 * (partners.length * 166 + 64)] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {/* Triple the logos for seamless loop */}
          {[...partners, ...partners, ...partners, ...partners].map((partner, i) => (
            <Tooltip key={`${partner.name}-${i}`}>
              <TooltipTrigger asChild>
                <a 
                  href={partner.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex-shrink-0 h-12 mx-8 opacity-40 grayscale hover:opacity-70 hover:grayscale-0 transition-all duration-300 cursor-pointer ${partner.className}`}
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="h-full w-auto object-contain max-w-[150px]"
                  />
                </a>
              </TooltipTrigger>
              <TooltipContent 
                side="bottom" 
                className="z-50 bg-slate-900 border-slate-700 px-3 py-1.5"
              >
                <p className="text-xs font-medium text-white">{partner.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </motion.div>
      </TooltipProvider>
    </div>
    
    {/* Bottom border */}
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
  </section>
);
