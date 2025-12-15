import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import bankFrickLogo from "@/assets/partners/bank-frick.png";
import dfnsLogo from "@/assets/partners/dfns.png";
import houseOfWeb3Logo from "@/assets/partners/house-of-web3.svg";
import ledgityLogo from "@/assets/partners/ledgity.png";
import realizLogo from "@/assets/partners/realiz.png";
import swissquoteLogo from "@/assets/partners/swissquote.png";
import woudLawLogo from "@/assets/partners/woud-law.jpeg";

const partners = [
  { name: "Bank Frick", logo: bankFrickLogo, subtitle: "Banking Partner" },
  { name: "DFNS", logo: dfnsLogo, subtitle: "Wallet Infrastructure" },
  { name: "House of Web3", logo: houseOfWeb3Logo, subtitle: "Web3 Advisory" },
  { name: "Ledgity Yield", logo: ledgityLogo, subtitle: "DeFi Partner" },
  { name: "Realiz", logo: realizLogo, subtitle: "Technology Partner" },
  { name: "Swissquote", logo: swissquoteLogo, subtitle: "Trading Partner" },
  { name: "Woud Law Firm", logo: woudLawLogo, subtitle: "Legal Partner" },
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
      
      <TooltipProvider delayDuration={100}>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          {partners.map((partner, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-pointer group">
                    <div className="h-10 md:h-12 lg:h-14 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500 hover:scale-110">
                      <img 
                        src={partner.logo} 
                        alt={partner.name}
                        className="h-full w-auto object-contain max-w-[100px] md:max-w-[130px] lg:max-w-[160px]"
                      />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent 
                  side="bottom" 
                  className="bg-card/95 backdrop-blur-md border border-white/10 px-4 py-2"
                >
                  <div className="text-center">
                    <p className="text-sm font-semibold text-foreground">{partner.name}</p>
                    <p className="text-xs text-muted-foreground">{partner.subtitle}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </motion.div>
          ))}
        </div>
      </TooltipProvider>
    </div>
  </div>
);
