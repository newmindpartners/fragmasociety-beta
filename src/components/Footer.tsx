import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Custom X (Twitter) icon since Lucide doesn't have the new X logo
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Custom Telegram icon
const TelegramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

// Custom Discord icon
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
  </svg>
);

// Custom Circle community icon
const CircleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
  </svg>
);

const socialLinks = [
  { name: "Telegram", href: "https://t.me/+BGJB5RBN2wAwODY0", Icon: TelegramIcon },
  { name: "Instagram", href: "https://www.instagram.com/fragmasociety/", Icon: Instagram },
  { name: "X", href: "https://x.com/FragmaSociety", Icon: XIcon },
  { name: "Circle", href: "#", Icon: CircleIcon, comingSoon: true },
  { name: "Discord", href: "https://discord.gg/5AGfST93u3", Icon: DiscordIcon },
];

export const Footer = () => (
  <footer className="relative pt-20 pb-10 overflow-hidden">
    {/* Dark Navy Base */}
    <div className="absolute inset-0 bg-[hsl(220,30%,8%)]" />
    
    {/* Studio Spotlight Effects */}
    <div className="absolute inset-0">
      {/* Top-left white glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-[120px]" />
      {/* Center-right subtle white */}
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-white/8 rounded-full blur-[100px]" />
      {/* Bottom center soft glow */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-white/5 rounded-full blur-[140px]" />
    </div>
    
    {/* Top border accent */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    
    <div className="container mx-auto px-6 relative z-10">
      {/* 4 Column Navigation */}
      <div className="grid md:grid-cols-4 gap-12 mb-12">
        {/* Logo Column */}
        <div>
          <img src="/fragma-society-logo.png" alt="Fragma Society" className="h-8 mb-4" />
          <p className="text-muted-foreground text-sm mb-2">
            Buy and sell real world assets.
          </p>
          <p className="text-muted-foreground text-xs mb-6">
            Invest in real-world slices, receive automated profit distributions, and buy or sell your stake in alternative assets.
          </p>
          
          {/* Social Media Icons with Tooltips */}
          <TooltipProvider delayDuration={100}>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <Tooltip key={social.name}>
                  <TooltipTrigger asChild>
                    <a
                      href={social.comingSoon ? undefined : social.href}
                      target={social.comingSoon ? undefined : "_blank"}
                      rel={social.comingSoon ? undefined : "noopener noreferrer"}
                      className={`w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-muted-foreground transition-all duration-300 ${
                        social.comingSoon 
                          ? "opacity-50 cursor-not-allowed" 
                          : "hover:text-white hover:border-white hover:bg-white/10 cursor-pointer"
                      }`}
                      aria-label={social.name}
                      onClick={social.comingSoon ? (e) => e.preventDefault() : undefined}
                    >
                      <social.Icon className="w-4 h-4" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-card border-white/20">
                    <p>{social.comingSoon ? `${social.name} - Coming Soon` : social.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </div>

        {/* Investors Column */}
        <div>
          <h5 className="text-foreground font-bold mb-4">Investors</h5>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li><Link to="/live-deals" className="hover:text-white transition-colors">Live Deals</Link></li>
            <li><Link to="/marketplace" className="hover:text-white transition-colors">Buy & Sell - Marketplace</Link></li>
            <li><Link to="/how-it-works" className="hover:text-white transition-colors">How it works?</Link></li>
            <li><Link to="/membership" className="hover:text-white transition-colors">Investor Membership</Link></li>
            <li><Link to="/strategy" className="hover:text-white transition-colors">Fragma One - Invest with us</Link></li>
          </ul>
        </div>

        {/* Businesses Column */}
        <div>
          <h5 className="text-foreground font-bold mb-4">Businesses</h5>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li><Link to="/signature-deal" className="hover:text-white transition-colors">Launch your Signature Deal</Link></li>
            <li><Link to="/tokenize" className="hover:text-white transition-colors">Tokenize & List your asset</Link></li>
          </ul>
        </div>

        {/* Learn Column */}
        <div>
          <h5 className="text-foreground font-bold mb-4">Learn</h5>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li><span className="hover:text-white cursor-pointer transition-colors">Community Center</span></li>
            <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><span className="hover:text-white cursor-pointer transition-colors">Documentations</span></li>
          </ul>
        </div>
      </div>

      {/* Legal Section - Full Width */}
      <div className="border-t border-foreground/10 pt-8 mb-8">
        <h5 className="text-foreground font-bold mb-4">Legal</h5>
        <ul className="flex flex-wrap gap-x-8 gap-y-2 text-muted-foreground text-sm mb-6">
          <li><span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span></li>
          <li><span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span></li>
        </ul>
        <p className="text-muted-foreground text-xs leading-relaxed">
          Investing in tokenized assets involves risks, including credit, liquidity, currency, interest rate, volatility, capital repayment, and market risks. These factors may affect the value and performance of your investment. Please consult with a financial advisor and review our full risk disclosure before investing.
        </p>
      </div>

      <div className="border-t border-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-muted-foreground">
        <p>© 2025 Fragma Society.</p>
        <p className="text-right">
          Gyeld Sàrl, 26 Rue Goethe, L-1637 Luxembourg, Grand-Duché de Luxembourg · RCS B293857
        </p>
      </div>
    </div>
  </footer>
);
