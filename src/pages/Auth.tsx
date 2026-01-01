import { motion } from "framer-motion";
import { SignIn, SignUp, useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Shield } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(!location.hash.includes("signup"));
  const { user, isLoaded } = useUser();

  useEffect(() => {
    setIsLogin(!location.hash.includes("signup"));
  }, [location.hash]);

  useEffect(() => {
    if (isLoaded && user) {
      // Redirect to KYC verification after login
      navigate("/dashboard/kyc");
    }
  }, [user, isLoaded, navigate]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md mb-8 text-center lg:text-left">
          <img src="/fragma-logo-v2.png" alt="Fragma" className="h-10 mb-8 mx-auto lg:mx-0" />
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
            {isLogin ? "Investor Access" : "Register as Investor"}
          </h1>
          <p className="text-muted-foreground">
            {isLogin 
              ? "Sign in to access detailed strategy information." 
              : "Create an account to view strategy details and metrics."}
          </p>
        </div>

        <div className="w-full max-w-md flex justify-center">
          {isLogin ? (
            <SignIn 
              routing="hash" 
              signUpUrl="/auth#signup" 
              fallbackRedirectUrl="/dashboard/kyc"
              forceRedirectUrl="/dashboard/kyc"
              appearance={{
                layout: {
                  socialButtonsVariant: "iconButton",
                  socialButtonsPlacement: "top",
                  logoPlacement: "none",
                },
                elements: {
                  socialButtonsBlockButton: "h-14 text-lg flex",
                  socialButtonsBlockButton__linkedin: { order: -3 },
                  socialButtonsBlockButton__google: { order: -2 },
                  socialButtonsBlockButton__discord: { order: -1 },
                  socialButtonsIconButton: "h-20 w-20",
                  socialButtonsIconButton__linkedin: { order: -3 },
                  socialButtonsIconButton__google: { order: -2 },
                  socialButtonsIconButton__discord: { order: -1 },
                  socialButtonsIconButton__logo: "h-10 w-10",
                  socialButtonsBlockButtonText: "font-medium",
                  socialButtonsBlockButton__logo: "h-6 w-6",
                }
              }}
            />
          ) : (
            <SignUp 
              routing="hash" 
              signInUrl="/auth" 
              fallbackRedirectUrl="/dashboard/kyc"
              forceRedirectUrl="/dashboard/kyc"
              appearance={{
                layout: {
                  socialButtonsVariant: "iconButton",
                  socialButtonsPlacement: "top",
                  logoPlacement: "none",
                },
                elements: {
                  socialButtonsBlockButton: "h-14 text-lg flex",
                  socialButtonsBlockButton__linkedin: { order: -3 },
                  socialButtonsBlockButton__google: { order: -2 },
                  socialButtonsBlockButton__discord: { order: -1 },
                  socialButtonsIconButton: "h-20 w-20",
                  socialButtonsIconButton__linkedin: { order: -3 },
                  socialButtonsIconButton__google: { order: -2 },
                  socialButtonsIconButton__discord: { order: -1 },
                  socialButtonsIconButton__logo: "h-10 w-10",
                  socialButtonsBlockButtonText: "font-medium",
                  socialButtonsBlockButton__logo: "h-6 w-6",
                }
              }}
            />
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => navigate(isLogin ? "/auth#signup" : "/auth")}
            className="text-primary hover:underline font-medium"
          >
            {isLogin ? "Register" : "Sign In"}
          </button>
        </p>
      </div>

      {/* Right side - Info */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-card via-background to-card items-center justify-center p-12 relative overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[150px]"
        />
        
        <div className="relative z-10 max-w-md">
          <Shield className="w-12 h-12 text-primary mb-6" />
          <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
            Investor Access
          </h2>
          <p className="text-muted-foreground mb-6">
            Access exclusive RWA investment opportunities, automated yield distributions, and a secondary market for liquidity.
          </p>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>Direct RWA Ownership</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>Automated Payouts</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>Secondary Market Trading</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
