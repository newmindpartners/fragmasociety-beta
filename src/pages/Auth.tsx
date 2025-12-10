import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Eye, EyeOff, ArrowRight, Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const authSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  
  const { signIn, signUp, user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && user) {
      navigate("/strategy");
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate input
    const result = authSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0] === "email") fieldErrors.email = issue.message;
        if (issue.path[0] === "password") fieldErrors.password = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    if (!isLogin && !disclaimerAccepted) {
      toast({
        title: "Disclaimer Required",
        description: "Please accept the risk disclaimer to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = isLogin 
        ? await signIn(email, password)
        : await signUp(email, password);

      if (error) {
        let message = error.message;
        if (error.message.includes("User already registered")) {
          message = "An account with this email already exists. Please sign in.";
        } else if (error.message.includes("Invalid login credentials")) {
          message = "Invalid email or password. Please try again.";
        }
        toast({
          title: "Authentication Error",
          description: message,
          variant: "destructive"
        });
      } else {
        toast({
          title: isLogin ? "Welcome back!" : "Account created!",
          description: isLogin ? "You have successfully signed in." : "Your investor account has been created."
        });
        navigate("/strategy");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <img src="/fragma-society-logo.png" alt="Fragma" className="h-10 mb-8" />
            <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
              {isLogin ? "Investor Access" : "Register as Investor"}
            </h1>
            <p className="text-muted-foreground">
              {isLogin 
                ? "Sign in to access detailed strategy information." 
                : "Create an account to view strategy details and metrics."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1.5"
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1.5">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive mt-1">{errors.password}</p>
              )}
            </div>

            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="glass rounded-lg p-4 space-y-3"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium text-foreground mb-2">Risk Acknowledgement</p>
                    <ul className="space-y-1.5 text-xs">
                      <li>• Target returns only. No guarantee. Capital at risk.</li>
                      <li>• Unlisted, illiquid securities – you may not be able to sell quickly or at all.</li>
                      <li>• Past performance and targets are not reliable indicators of future results.</li>
                    </ul>
                  </div>
                </div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={disclaimerAccepted}
                    onChange={(e) => setDisclaimerAccepted(e.target.checked)}
                    className="mt-1 rounded border-border"
                  />
                  <span className="text-xs text-muted-foreground">
                    I confirm I am a professional / qualified investor and I understand and accept these risks.
                  </span>
                </label>
              </motion.div>
            )}

            <Button 
              type="submit" 
              className="w-full group" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : (isLogin ? "Sign In" : "Create Account")}
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline font-medium"
            >
              {isLogin ? "Register" : "Sign In"}
            </button>
          </p>
        </motion.div>
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
            Investor Portal
          </h2>
          <p className="text-muted-foreground mb-6">
            Access detailed strategy information, target return metrics, and investment documentation.
          </p>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>Strategy documentation & PPM</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>Target return information</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>Allocation process</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
