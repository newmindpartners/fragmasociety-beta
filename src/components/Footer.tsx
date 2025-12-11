import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="relative pt-20 pb-10 overflow-hidden">
    {/* Dark Navy Base */}
    <div className="absolute inset-0 bg-[hsl(220,30%,8%)]" />
    
    {/* Studio Spotlight Effects */}
    <div className="absolute inset-0">
      {/* Top-left turquoise glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      {/* Center-right subtle turquoise */}
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-primary/15 rounded-full blur-[100px]" />
      {/* Bottom center soft glow */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-primary/10 rounded-full blur-[140px]" />
    </div>
    
    {/* Top border accent */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    
    <div className="container mx-auto px-6 relative z-10">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1">
          <img src="/fragma-society-logo.png" alt="Fragma Society" className="h-8 mb-4" />
          <p className="text-muted-foreground text-sm">
            Making real-world assets simple to own, earn from and trade.
          </p>
        </div>
        <div>
          <h5 className="text-foreground font-bold mb-4">Platform</h5>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li className="hover:text-primary cursor-pointer transition-colors">Marketplace</li>
            <li className="hover:text-primary cursor-pointer transition-colors">How it Works</li>
            <li><a href="/#work-with-us" className="hover:text-primary transition-colors">Launch your Signature Deal</a></li>
            <li><Link to="/strategy" className="hover:text-primary transition-colors">Invest with us</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="text-foreground font-bold mb-4">Company</h5>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li className="hover:text-primary cursor-pointer transition-colors">About</li>
            <li className="hover:text-primary cursor-pointer transition-colors">Careers</li>
            <li className="hover:text-primary cursor-pointer transition-colors">Partners</li>
          </ul>
        </div>
        <div>
          <h5 className="text-foreground font-bold mb-4">Legal</h5>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li className="hover:text-primary cursor-pointer transition-colors">Risk Disclosure</li>
            <li className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</li>
            <li className="hover:text-primary cursor-pointer transition-colors">Terms of Service</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
        <p>© 2025 Fragma Society. Powered by Fragma Finance.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <span className="hover:text-primary cursor-pointer transition-colors">X (Twitter)</span>
          <span className="hover:text-primary cursor-pointer transition-colors">LinkedIn</span>
          <span className="hover:text-primary cursor-pointer transition-colors">Discord</span>
        </div>
      </div>
    </div>
  </footer>
);
