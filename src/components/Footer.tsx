import { Link } from "react-router-dom";

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
      {/* Logo and description */}
      <div className="mb-12">
        <img src="/fragma-society-logo.png" alt="Fragma Society" className="h-8 mb-4" />
        <p className="text-muted-foreground text-sm mb-2 max-w-md">
          Buy and sell real world assets.
        </p>
        <p className="text-muted-foreground text-xs max-w-md">
          Invest in real-world slices, receive automated profit distributions, and buy or sell your stake in alternative assets.
        </p>
      </div>

      {/* 3 Column Navigation */}
      <div className="grid md:grid-cols-3 gap-12 mb-12">
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
        <div>
          <h5 className="text-foreground font-bold mb-4">Businesses</h5>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li><Link to="/signature-deal" className="hover:text-white transition-colors">Launch your Signature Deal</Link></li>
            <li><Link to="/tokenize" className="hover:text-white transition-colors">Tokenize & List your asset</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="text-foreground font-bold mb-4">Learn</h5>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li><span className="hover:text-white cursor-pointer transition-colors">Community Center</span></li>
            <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><span className="hover:text-white cursor-pointer transition-colors">Documentations</span></li>
          </ul>
        </div>
      </div>

      {/* Legal Section */}
      <div className="border-t border-foreground/10 pt-8 mb-8">
        <h5 className="text-foreground font-bold mb-4">Legal</h5>
        <ul className="flex flex-wrap gap-x-8 gap-y-2 text-muted-foreground text-sm mb-6">
          <li><span className="hover:text-white cursor-pointer transition-colors">Risk Disclosure</span></li>
          <li><span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span></li>
          <li><span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span></li>
        </ul>
        <p className="text-muted-foreground text-xs leading-relaxed max-w-4xl">
          Investing in tokenized assets involves risks, including credit, liquidity, currency, interest rate, volatility, capital repayment, and market risks. These factors may affect the value and performance of your investment. Please consult with a financial advisor and review our full risk disclosure before investing.
        </p>
      </div>

      <div className="border-t border-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
        <p>© 2025 Fragma Society. Powered by Fragma Finance.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <span className="hover:text-white cursor-pointer transition-colors">X (Twitter)</span>
          <span className="hover:text-white cursor-pointer transition-colors">LinkedIn</span>
          <span className="hover:text-white cursor-pointer transition-colors">Discord</span>
        </div>
      </div>
    </div>
  </footer>
);
