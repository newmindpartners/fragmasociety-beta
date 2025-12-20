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
  { name: "Bank Frick", logo: bankFrickLogo, className: "" },
  { name: "DFNS", logo: dfnsLogo, className: "" },
  { name: "House of Web3", logo: houseOfWeb3Logo, className: "" },
  { name: "Swissquote", logo: swissquoteLogo, className: "scale-150" },
  { name: "Woud Law Firm", logo: woudLawLogo, className: "" },
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
      <TooltipProvider delayDuration={100}>
        <div
          className="flex items-center gap-16 animate-[scroll_30s_linear_infinite]"
          style={{
            width: 'max-content',
          }}
        >
          {doubledPartners.map((partner, i) => (
            <Tooltip key={`${partner.name}-${i}`}>
              <TooltipTrigger asChild>
                <div className={`flex-shrink-0 h-12 opacity-40 grayscale hover:opacity-70 hover:grayscale-0 transition-all duration-300 cursor-pointer ${partner.className}`}>
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="h-full w-auto object-contain max-w-[150px]"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent 
                side="bottom" 
                className="bg-slate-900 border-slate-700 px-3 py-1.5"
              >
                <p className="text-xs font-medium text-white">{partner.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </div>
    
    {/* Bottom border */}
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    
    <style>{`
      @keyframes scroll {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }
    `}</style>
  </section>
);
