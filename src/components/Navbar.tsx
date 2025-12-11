import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-foreground/5">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/fragma-society-logo.png" alt="Fragma Society" className="h-8" />
        </Link>
        
        <div className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
          <a href="/#features" className="hover:text-primary transition-colors">How it works</a>
          <a href="/#marketplace" className="hover:text-primary transition-colors">Marketplace</a>
          <Link to="/strategy" className="hover:text-primary transition-colors">Invest with us</Link>
          <a href="/#partners" className="hover:text-primary transition-colors">Partners</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link to="/strategy">
                <Button variant="outline" size="sm">Investor Portal</Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={() => signOut()}>Sign Out</Button>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="outline" size="sm">Investor Login</Button>
            </Link>
          )}
        </div>

        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0 }} 
            animate={{ height: 'auto' }} 
            exit={{ height: 0 }}
            className="md:hidden bg-card overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              <a href="/#features" className="text-foreground hover:text-primary transition-colors">How it works</a>
              <a href="/#marketplace" className="text-foreground hover:text-primary transition-colors">Marketplace</a>
              <Link to="/strategy" className="text-foreground hover:text-primary transition-colors">Invest with us</Link>
              <a href="/#partners" className="text-foreground hover:text-primary transition-colors">Partners</a>
              {user ? (
                <Button onClick={() => signOut()}>Sign Out</Button>
              ) : (
                <Link to="/auth"><Button className="w-full">Investor Login</Button></Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
