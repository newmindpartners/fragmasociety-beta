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

export const SocialProof = () => (
  <div className="relative w-full py-12">
    {/* Glassmorphism container */}
    <div className="absolute inset-0 bg-card/30 backdrop-blur-xl border-y border-white/5" />
    
    <div className="container mx-auto px-6 text-center relative z-10">
      <h4 className="text-muted-foreground text-sm font-medium mb-8 uppercase tracking-widest">
        Trusted Partners & Regulated Rails
      </h4>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
        {partners.map((partner, i) => (
          <div 
            key={i} 
            className="h-10 md:h-12 opacity-70 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
          >
            <img 
              src={partner.logo} 
              alt={partner.name}
              className="h-full w-auto object-contain max-w-[120px] md:max-w-[150px]"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);
