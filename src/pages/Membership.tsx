import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  Crown, 
  Zap, 
  Star, 
  TrendingUp, 
  BookOpen, 
  Users, 
  Calendar, 
  Eye,
  Video,
  FileText,
  PieChart,
  HelpCircle,
  Rocket,
  MessageCircle,
  Lock,
  Sparkles,
  ArrowRight,
  Loader2,
  ChevronRight,
  Shield,
  CreditCard,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link, useSearchParams } from "react-router-dom";

// Stripe product/price mapping
const TIERS = {
  explorer: {
    id: "explorer",
    name: "Explorer",
    price: "Free",
    priceAmount: 0,
    productId: null,
    priceId: null,
    description: "Start your investment journey with essential tools",
    badge: null,
    icon: Zap,
    gradient: "from-slate-400 via-slate-500 to-slate-600",
    glowColor: "rgba(148, 163, 184, 0.3)",
    borderColor: "border-slate-500/20",
    features: [
      { icon: TrendingUp, label: "Weekly Market Analysis & Trends" },
      { icon: BookOpen, label: "Tokenization Case Studies" },
      { icon: Users, label: "Community Access (discussions, live Q&A)" },
      { icon: Calendar, label: "Events Lobby" },
      { icon: Eye, label: "Watchlist on 1 Asset" },
      { icon: Rocket, label: "1 Deal Investment per Year (up to $3,000, if eligible)" },
    ],
  },
  premium: {
    id: "premium",
    name: "Premium",
    price: "$49",
    priceAmount: 49,
    productId: "prod_Tac53QEwQEfRhj",
    priceId: "price_1SdQrVLG6ZPmKb4cg2fUf2eE",
    description: "Advanced tools for serious investors seeking growth",
    badge: "Most Popular",
    icon: Star,
    gradient: "from-primary via-primary to-primary-glow",
    glowColor: "rgba(var(--primary), 0.4)",
    borderColor: "border-primary/30",
    features: [
      { icon: Check, label: "Everything in Explorer" },
      { icon: Video, label: "Expert Webinars (monthly) + Replays" },
      { icon: BookOpen, label: "Research Reports" },
      { icon: Eye, label: "Unlimited Asset Watchlist" },
      { icon: Zap, label: "3 Deal Investments per Year (up to $10,000, if eligible)" },
      { icon: FileText, label: "Basic Tax Export" },
      { icon: Rocket, label: "Early Window Previews on New Listings" },
    ],
  },
  elite: {
    id: "elite",
    name: "Elite",
    price: "$199",
    priceAmount: 199,
    productId: "prod_Tac6EH7VNMOXB1",
    priceId: "price_1SdQroLG6ZPmKb4cFTKG0SYw",
    description: "Exclusive access for top-tier investors",
    badge: "VIP",
    icon: Crown,
    gradient: "from-amber-400 via-yellow-500 to-orange-500",
    glowColor: "rgba(251, 191, 36, 0.4)",
    borderColor: "border-amber-500/30",
    features: [
      { icon: Check, label: "Everything in Premium" },
      { icon: Calendar, label: "Private Events (virtual & in-person)" },
      { icon: Users, label: "Elite Networking Lounge" },
      { icon: Rocket, label: "3-Day Early Access to Public Deals" },
      { icon: Lock, label: "Access to Off-Market Fragma Deals" },
      { icon: Zap, label: "Unlimited Deals Investments" },
      { icon: PieChart, label: "Portfolio Pro Tools (digest, alerts, planner)" },
      { icon: FileText, label: "Full Tax Exports" },
      { icon: MessageCircle, label: "VIP Support (WhatsApp, Priority)" },
    ],
  },
};

const tierOrder = ["explorer", "premium", "elite"] as const;

// Animated background component
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Gradient orbs */}
    <motion.div
      animate={{ 
        x: [0, 100, 0],
        y: [0, -50, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"
    />
    <motion.div
      animate={{ 
        x: [0, -80, 0],
        y: [0, 60, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-amber-500/15 rounded-full blur-[120px]"
    />
    <motion.div
      animate={{ 
        x: [0, 50, 0],
        y: [0, -30, 0],
      }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-primary-glow/10 rounded-full blur-[100px]"
    />
    
    {/* Grid pattern */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
    
    {/* Noise texture */}
    <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }} />
  </div>
);

// Premium tier card component
const TierCard = ({ 
  tier, 
  isCurrentPlan, 
  isAuthenticated, 
  onSubscribe, 
  isLoading,
  index
}: { 
  tier: typeof TIERS.explorer;
  isCurrentPlan: boolean;
  isAuthenticated: boolean;
  onSubscribe: (priceId: string) => void;
  isLoading: boolean;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = tier.icon;
  const isPaid = tier.priceId !== null;
  const isPremium = tier.id === "premium";
  const isElite = tier.id === "elite";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group ${isPremium ? "lg:-mt-8 lg:mb-8 z-10" : "z-0"}`}
    >
      {/* Animated badge */}
      {tier.badge && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5 + index * 0.15 }}
          className="absolute -top-5 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div 
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg ${
              isElite 
                ? "bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 text-black" 
                : "bg-gradient-to-r from-primary to-primary-glow text-white"
            }`}
          >
            <span className="flex items-center gap-1.5">
              {isElite ? <Crown size={12} /> : <Sparkles size={12} />}
              {tier.badge}
            </span>
          </motion.div>
        </motion.div>
      )}

      {/* Card glow effect */}
      <motion.div
        animate={{ 
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1 : 0.95,
        }}
        transition={{ duration: 0.4 }}
        className={`absolute -inset-1 rounded-[2rem] bg-gradient-to-b ${tier.gradient} blur-xl`}
      />

      {/* Main card */}
      <motion.div 
        animate={{ 
          y: isHovered ? -8 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`relative h-full rounded-[1.75rem] border backdrop-blur-xl transition-all duration-500 overflow-hidden ${
          isCurrentPlan 
            ? `${tier.borderColor} bg-gradient-to-b from-white/[0.08] to-white/[0.02]` 
            : isPremium
              ? "border-primary/40 bg-gradient-to-b from-primary/[0.08] via-background/90 to-background/80"
              : "border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-background/80 hover:border-white/20"
        }`}
      >
        {/* Animated border gradient for premium */}
        {isPremium && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-[1px] rounded-[1.75rem] opacity-60"
            style={{
              background: "conic-gradient(from 0deg, transparent, hsl(var(--primary)), transparent 30%)",
            }}
          />
        )}

        {/* Inner content wrapper */}
        <div className="relative p-8 lg:p-10">
          {/* Current plan indicator */}
          <AnimatePresence>
            {isCurrentPlan && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-6 right-6"
              >
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-primary"
                  />
                  <span className="text-xs font-semibold text-primary">Active</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Icon with animated background */}
          <motion.div 
            className="relative mb-8"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ 
                rotate: isHovered ? 180 : 0,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${tier.gradient} opacity-20 blur-lg`}
            />
            <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center shadow-lg`}>
              <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
            </div>
            
            {/* Floating particles on hover */}
            <AnimatePresence>
              {isHovered && (
                <>
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        x: [0, (i - 1) * 30],
                        y: [0, -40 - i * 10],
                      }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`absolute top-0 left-8 w-2 h-2 rounded-full bg-gradient-to-r ${tier.gradient}`}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Name & Price */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-foreground mb-2">{tier.name}</h3>
            <div className="flex items-baseline gap-1.5">
              <motion.span 
                className={`text-5xl font-bold bg-gradient-to-r ${tier.gradient} bg-clip-text text-transparent`}
                animate={{ opacity: isHovered ? 1 : 0.9 }}
              >
                {tier.price}
              </motion.span>
              {isPaid && (
                <span className="text-muted-foreground text-sm">/month</span>
              )}
            </div>
            <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{tier.description}</p>
          </div>

          {/* CTA Button */}
          <div className="mb-8">
            {isCurrentPlan ? (
              <Button 
                variant="outline" 
                className="w-full h-12 border-primary/30 text-primary hover:bg-primary/10 rounded-xl font-semibold"
                disabled
              >
                <Check size={18} className="mr-2" />
                Current Plan
              </Button>
            ) : !isAuthenticated ? (
              <Link to="/auth" className="block">
                <Button 
                  className={`w-full h-12 rounded-xl font-semibold group overflow-hidden relative ${
                    isPremium 
                      ? "bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg hover:shadow-primary/25" 
                      : isElite
                        ? "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black hover:shadow-lg hover:shadow-amber-500/25"
                        : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  <motion.span 
                    className="relative z-10 flex items-center gap-2"
                    animate={{ x: isHovered ? 0 : 0 }}
                  >
                    {isPaid ? "Sign Up to Subscribe" : "Get Started Free"}
                    <motion.span
                      animate={{ x: isHovered ? 4 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight size={16} />
                    </motion.span>
                  </motion.span>
                </Button>
              </Link>
            ) : isPaid ? (
              <Button 
                className={`w-full h-12 rounded-xl font-semibold group overflow-hidden relative ${
                  isPremium 
                    ? "bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg hover:shadow-primary/25" 
                    : "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black hover:shadow-lg hover:shadow-amber-500/25"
                }`}
                onClick={() => onSubscribe(tier.priceId!)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={18} className="animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <motion.span 
                    className="relative z-10 flex items-center gap-2"
                  >
                    Subscribe Now
                    <motion.span
                      animate={{ x: isHovered ? 4 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight size={16} />
                    </motion.span>
                  </motion.span>
                )}
              </Button>
            ) : (
              <Button 
                variant="outline" 
                className="w-full h-12 border-white/10 hover:bg-white/5 rounded-xl font-semibold"
                disabled
              >
                Free Forever
              </Button>
            )}
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${tier.borderColor}`} />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-background text-xs text-muted-foreground uppercase tracking-wider">
                What's included
              </span>
            </div>
          </div>

          {/* Features with staggered animation */}
          <div className="space-y-4">
            {tier.features.map((feature, featureIndex) => {
              const FeatureIcon = feature.icon;
              const isHighlight = feature.label.startsWith("Everything in");
              
              return (
                <motion.div
                  key={featureIndex}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + featureIndex * 0.05 }}
                  whileHover={{ x: 4 }}
                  className={`flex items-start gap-3 group/feature cursor-default ${
                    isHighlight ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center ${
                      isHighlight 
                        ? "bg-primary/20" 
                        : "bg-white/[0.05] group-hover/feature:bg-primary/10"
                    } transition-colors`}
                  >
                    <FeatureIcon size={14} className={isHighlight ? "text-primary" : "text-primary/60 group-hover/feature:text-primary"} />
                  </motion.div>
                  <span className={`text-sm leading-relaxed ${isHighlight ? "font-medium" : "group-hover/feature:text-foreground"} transition-colors`}>
                    {feature.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Trust indicator component
const TrustIndicator = ({ icon: IconComponent, label, delay }: { icon: typeof Shield; label: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ scale: 1.05, y: -2 }}
    className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm"
  >
    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
      <IconComponent size={18} className="text-primary" />
    </div>
    <span className="text-sm font-medium text-foreground">{label}</span>
  </motion.div>
);

const Membership = () => {
  const { user, session } = useAuth();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  const [subscriptionEnd, setSubscriptionEnd] = useState<string | null>(null);

  const isAuthenticated = !!user;

  // Check for success/cancel URL params
  useEffect(() => {
    if (searchParams.get("success") === "true") {
      toast({
        title: "Subscription Successful!",
        description: "Welcome to your new membership tier. Enjoy your benefits!",
      });
      checkSubscription();
    } else if (searchParams.get("canceled") === "true") {
      toast({
        title: "Subscription Canceled",
        description: "No charges were made. You can try again anytime.",
        variant: "destructive",
      });
    }
  }, [searchParams]);

  const checkSubscription = async () => {
    if (!session) return;

    try {
      const { data, error } = await supabase.functions.invoke("check-subscription", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      if (data.subscribed) {
        setCurrentProductId(data.productId);
        setSubscriptionEnd(data.subscriptionEnd);
      } else {
        setCurrentProductId(null);
        setSubscriptionEnd(null);
      }
    } catch (error) {
      console.error("Error checking subscription:", error);
    }
  };

  useEffect(() => {
    if (session) {
      checkSubscription();
      const interval = setInterval(checkSubscription, 60000);
      return () => clearInterval(interval);
    }
  }, [session]);

  const handleSubscribe = async (priceId: string) => {
    if (!session) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to subscribe.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { priceId },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      if (data.url) {
        window.open(data.url, "_blank");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Error",
        description: "Failed to start checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    if (!session) return;

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("customer-portal", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      if (data.url) {
        window.open(data.url, "_blank");
      }
    } catch (error) {
      console.error("Portal error:", error);
      toast({
        title: "Error",
        description: "Failed to open subscription management. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentTierId = () => {
    if (!currentProductId) return "explorer";
    for (const [key, tier] of Object.entries(TIERS)) {
      if (tier.productId === currentProductId) return key;
    }
    return "explorer";
  };

  const currentTierId = getCurrentTierId();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24">
        <AnimatedBackground />

        <div className="container mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-primary-glow/20 border border-primary/30 text-primary text-sm font-semibold mb-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Crown size={16} />
              </motion.div>
              Investor Membership
            </motion.div>
            
            <h1 className="text-5xl lg:text-7xl font-serif font-bold text-foreground leading-[1.1] mb-8">
              Unlock Your
              <br />
              <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
                Investment Potential
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Choose the perfect membership tier to access exclusive tools, insights, and opportunities tailored to your investment journey.
            </p>
          </motion.div>

          {/* Subscription Status */}
          <AnimatePresence>
            {isAuthenticated && currentProductId && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="max-w-lg mx-auto mb-16"
              >
                <div className="relative p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-primary-glow/10 border border-primary/20 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Active Membership</p>
                      <p className="text-xl font-bold text-foreground flex items-center gap-2">
                        {TIERS[currentTierId as keyof typeof TIERS]?.name}
                        <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-semibold">Active</span>
                      </p>
                      {subscriptionEnd && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Renews {new Date(subscriptionEnd).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleManageSubscription}
                      disabled={isLoading}
                      className="border-primary/30 text-primary hover:bg-primary/10 rounded-xl"
                    >
                      <RefreshCw size={14} className="mr-2" />
                      Manage
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto items-start">
            {tierOrder.map((tierId, index) => (
              <TierCard
                key={tierId}
                tier={TIERS[tierId]}
                isCurrentPlan={currentTierId === tierId}
                isAuthenticated={isAuthenticated}
                onSubscribe={handleSubscribe}
                isLoading={isLoading}
                index={index}
              />
            ))}
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20 flex flex-wrap justify-center gap-4"
          >
            <TrustIndicator icon={Shield} label="Secure Payments" delay={0.1} />
            <TrustIndicator icon={CreditCard} label="Powered by Stripe" delay={0.2} />
            <TrustIndicator icon={RefreshCw} label="Cancel Anytime" delay={0.3} />
            <TrustIndicator icon={MessageCircle} label="24/7 Support" delay={0.4} />
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
            >
              <HelpCircle size={16} />
              FAQ
            </motion.div>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
              Questions? We've Got Answers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Everything you need to know about our membership plans
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  value: "billing-1",
                  question: "How does billing work?",
                  answer: "Your membership is billed monthly on the same date you subscribed. All payments are processed securely through Stripe. You'll receive an email receipt for each payment, and you can view your billing history in the customer portal."
                },
                {
                  value: "billing-2",
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit and debit cards including Visa, Mastercard, American Express, and Discover. We also support Apple Pay, Google Pay, and bank transfers in select regions."
                },
                {
                  value: "upgrade-1",
                  question: "How do I upgrade my membership?",
                  answer: "You can upgrade your membership at any time from this page. When you upgrade, you'll be charged the prorated difference for the remainder of your billing period. Your new benefits will be available immediately."
                },
                {
                  value: "upgrade-2",
                  question: "Can I switch between plans?",
                  answer: "Absolutely! You can upgrade or downgrade at any time. When upgrading, you get immediate access with prorated billing. When downgrading, your current plan remains active until the end of the billing period."
                },
                {
                  value: "cancel-1",
                  question: "How do I cancel my subscription?",
                  answer: "You can cancel anytime through the 'Manage Subscription' button. Once canceled, you'll retain access to paid features until the end of your current billing period."
                },
                {
                  value: "cancel-2",
                  question: "What happens when I cancel?",
                  answer: "Your membership remains active until the end of your billing period. After that, you'll be moved to the free Explorer tier. Your account data and history will be preserved."
                },
                {
                  value: "general-1",
                  question: "Do I need a membership to invest?",
                  answer: "No, you can invest with any tier including Explorer. Paid memberships provide enhanced research tools, earlier access to deals, and exclusive content to help you make informed decisions."
                },
                {
                  value: "general-2",
                  question: "How do I contact support?",
                  answer: "Explorer and Premium members can reach support via email. Elite members enjoy VIP support through a dedicated WhatsApp group with priority response times."
                },
              ].map((faq, index) => (
                <motion.div
                  key={faq.value}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <AccordionItem 
                    value={faq.value} 
                    className="bg-background/60 backdrop-blur-sm border border-white/[0.08] rounded-2xl px-6 data-[state=open]:border-primary/30 transition-colors"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-6 group">
                      <span className="font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-3">
                        <ChevronRight size={16} className="text-primary/60 transition-transform group-data-[state=open]:rotate-90" />
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6 pl-7">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Membership;
