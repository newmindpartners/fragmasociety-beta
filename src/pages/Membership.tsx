import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
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
  ArrowRight,
  Loader2,
  ChevronRight,
  Shield,
  CreditCard,
  RefreshCw,
  Info,
  Sparkles,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
    color: "slate",
    features: [
      { icon: TrendingUp, label: "Weekly Market Analysis & Trends", tooltip: "Receive curated weekly insights on market movements, emerging opportunities, and key trends in alternative investments." },
      { icon: Users, label: "Community Access (discussions, live Q&A)", tooltip: "Join our active community of investors for discussions, networking, and live Q&A sessions with industry experts." },
      { icon: Calendar, label: "Events Lobby", tooltip: "Browse and register for upcoming webinars, workshops, and networking events in the Fragma ecosystem." },
      { icon: Rocket, label: "1 Deal Investment per Year (up to $3,000, if eligible)", tooltip: "Participate in one investment opportunity annually with a maximum investment of $3,000, subject to eligibility requirements." },
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
    color: "violet",
    features: [
      { icon: Check, label: "Everything in Explorer", tooltip: "All features from the Explorer tier are included in your Premium membership." },
      { icon: Video, label: "Expert Webinars (monthly) + Replays", tooltip: "Attend exclusive monthly webinars with industry experts and access full replay library on-demand." },
      { icon: Zap, label: "3 Deal Investments per Year (up to $10,000, if eligible)", tooltip: "Participate in up to three investment opportunities annually with a maximum of $10,000 per deal, subject to eligibility." },
      { icon: FileText, label: "Basic Tax Export", tooltip: "Export your investment activity in a format ready for tax reporting and financial planning." },
      { icon: Rocket, label: "Early Window Previews on New Listings", tooltip: "Get exclusive previews of upcoming investment opportunities before they go live to the general community." },
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
    badge: "Elite",
    icon: Crown,
    color: "violet",
    features: [
      { icon: Check, label: "Everything in Premium", tooltip: "All features from Premium tier are included in your Elite membership." },
      { icon: Calendar, label: "Private Events (virtual & in-person)", tooltip: "Exclusive invitations to private investor events, both virtual roundtables and in-person gatherings." },
      { icon: Users, label: "Elite Networking Lounge", tooltip: "Access a private networking space to connect with other Elite members and industry leaders." },
      { icon: Rocket, label: "3-Day Early Access to Public Deals", tooltip: "Get priority access to invest in public deals 3 days before they open to other members." },
      { icon: Lock, label: "Access to Off-Market Fragma Deals", tooltip: "Exclusive access to private, off-market investment opportunities not available to other membership tiers." },
      { icon: Zap, label: "Unlimited Deals Investments", tooltip: "No limits on the number of deals you can participate in annually (subject to deal-specific terms)." },
      { icon: FileText, label: "Full Tax Exports", tooltip: "Comprehensive tax documentation including detailed transaction history, gains/losses reports, and jurisdiction-specific formats." },
      { icon: MessageCircle, label: "VIP Support (WhatsApp, Priority)", tooltip: "Direct WhatsApp access to our support team with priority response times and dedicated assistance." },
    ],
  },
};

const tierOrder = ["explorer", "premium", "elite"] as const;

// Premium tier card component with light mode design
const TierCard = ({ 
  tier, 
  isCurrentPlan, 
  isAuthenticated, 
  onSubscribe, 
  isLoading,
  index,
}: { 
  tier: typeof TIERS.explorer;
  isCurrentPlan: boolean;
  isAuthenticated: boolean;
  onSubscribe: (priceId: string) => void;
  isLoading: boolean;
  index: number;
}) => {
  const Icon = tier.icon;
  const isPaid = tier.priceId !== null;
  const isPremium = tier.id === "premium";
  const isElite = tier.id === "elite";
  const [isHovered, setIsHovered] = useState(false);

  const cardColors = {
    explorer: {
      bg: "bg-gradient-to-b from-gray-100/80 via-gray-50 to-white",
      border: "border-gray-200",
      icon: "bg-gray-300 text-gray-600",
      badge: null,
      button: "bg-slate-800 hover:bg-slate-900 text-white",
      checkBg: "bg-gray-100",
      checkIcon: "text-gray-500",
    },
    premium: {
      bg: "bg-gradient-to-b from-gray-100/80 via-gray-50 to-white",
      border: "border-gray-200",
      icon: "bg-slate-700 text-white",
      badge: "bg-slate-700 text-white",
      button: "bg-slate-700 hover:bg-slate-800 text-white",
      checkBg: "bg-slate-100",
      checkIcon: "text-slate-600",
    },
    elite: {
      bg: "bg-gradient-to-b from-gray-100/80 via-gray-50 to-white",
      border: "border-gray-200",
      icon: "bg-violet-500 text-white",
      badge: "bg-violet-500 text-white",
      button: "bg-violet-500 hover:bg-violet-600 text-white",
      checkBg: "bg-violet-100",
      checkIcon: "text-violet-500",
    },
  };

  const colors = cardColors[tier.id as keyof typeof cardColors];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative flex flex-col h-full ${isPremium ? "lg:-mt-6 lg:mb-6 z-10" : ""}`}
    >
      {/* Badge */}
      <AnimatePresence>
        {tier.badge && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
            className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 z-20"
          >
            <div className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider shadow-lg ${colors.badge}`}>
              <span className="flex items-center gap-1.5">
                {isElite && <Sparkles className="w-3 h-3" />}
                {tier.badge}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card */}
      <motion.div
        animate={{
          y: isHovered ? -8 : 0,
          boxShadow: isHovered
            ? "0 32px 64px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)"
            : "0 8px 32px -8px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`flex flex-col h-full rounded-2xl sm:rounded-3xl border-2 p-5 sm:p-8 ${colors.bg} ${colors.border} overflow-hidden relative`}
      >
        {/* Decorative dot pattern */}
        <div className="absolute top-4 left-4 grid grid-cols-4 gap-1.5 opacity-20 pointer-events-none">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-slate-400" />
          ))}
        </div>
        <div className="absolute bottom-4 right-4 grid grid-cols-4 gap-1.5 opacity-20 pointer-events-none">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-slate-400" />
          ))}
        </div>
        
        {/* Current plan indicator */}
        {isCurrentPlan && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-6 right-6"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-200">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-emerald-500"
              />
              <span className="text-xs font-semibold text-emerald-700">Active</span>
            </div>
          </motion.div>
        )}

        {/* Icon */}
        <motion.div
          animate={{ rotate: isHovered ? 5 : 0, scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
          className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg ${colors.icon}`}
        >
          <Icon className="w-5 h-5 sm:w-7 sm:h-7" strokeWidth={1.5} />
        </motion.div>

        {/* Name & Price */}
        <div className="mb-6 sm:mb-8 relative">
          <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1.5 sm:mb-2 font-sans">{tier.name}</h3>
          <div className="flex items-baseline gap-1">
            <motion.span
              animate={{ scale: isHovered ? 1.02 : 1 }}
              className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {tier.price}
            </motion.span>
            {isPaid && (
              <span className="text-slate-500 text-sm sm:text-base font-medium">/month</span>
            )}
          </div>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed">{tier.description}</p>
        </div>

        {/* CTA Button */}
        <div className="mb-6 sm:mb-8">
          {isCurrentPlan ? (
            <Button 
              className="w-full h-11 sm:h-12 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-100 cursor-default shadow-none border border-slate-200 text-sm sm:text-base"
              disabled
            >
              <Check size={16} className="mr-2 sm:mr-2" />
              Current Plan
            </Button>
          ) : !isAuthenticated ? (
            <Link to="/auth" className="block">
              <Button 
                className={`w-full h-11 sm:h-12 rounded-xl font-medium shadow-lg transition-all duration-300 hover:shadow-xl text-sm sm:text-base ${colors.button}`}
              >
                {isPaid ? "Sign Up to Subscribe" : "Get Started Free"}
                <motion.span
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight size={16} className="ml-2" />
                </motion.span>
              </Button>
            </Link>
          ) : isPaid ? (
            <Button 
              className={`w-full h-11 sm:h-12 rounded-xl font-medium shadow-lg transition-all duration-300 hover:shadow-xl text-sm sm:text-base ${colors.button}`}
              onClick={() => onSubscribe(tier.priceId!)}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Processing...
                </span>
              ) : (
                <>
                  Subscribe Now
                  <motion.span
                    animate={{ x: isHovered ? 4 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight size={16} className="ml-2" />
                  </motion.span>
                </>
              )}
            </Button>
          ) : (
            <Button 
              className="w-full h-11 sm:h-12 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-100 cursor-default shadow-none border border-slate-200 text-sm sm:text-base"
              disabled
            >
              Free Forever
            </Button>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-6 sm:mb-8" />

        {/* Features */}
        <TooltipProvider delayDuration={200}>
          <div className="space-y-3 sm:space-y-4 flex-1">
            {tier.features.map((feature, featureIndex) => {
              const FeatureIcon = feature.icon;
              const isHighlight = feature.label.startsWith("Everything in");
              
              return (
                <motion.div
                  key={featureIndex}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + featureIndex * 0.05 }}
                  className="flex items-start gap-2.5 sm:gap-3 group/feature"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mt-0.5 ${
                      isHighlight ? colors.checkBg : "bg-slate-100/80"
                    }`}
                  >
                    {isHighlight ? (
                      <Check size={14} className={`sm:w-4 sm:h-4 ${colors.checkIcon}`} strokeWidth={2.5} />
                    ) : (
                      <FeatureIcon size={12} className="sm:w-3.5 sm:h-3.5 text-slate-500" />
                    )}
                  </motion.div>
                  <span className={`text-xs sm:text-sm leading-relaxed flex-1 pt-1 sm:pt-1.5 ${
                    isHighlight ? "font-semibold text-slate-900" : "text-slate-600"
                  }`}>
                    {feature.label}
                  </span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="flex-shrink-0 mt-1 sm:mt-1.5 opacity-30 hover:opacity-100 transition-opacity min-w-[28px] min-h-[28px] flex items-center justify-center">
                        <Info size={14} className="text-slate-400" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-[280px] text-xs bg-slate-900 text-white border-slate-800">
                      {feature.tooltip}
                    </TooltipContent>
                  </Tooltip>
                </motion.div>
              );
            })}
          </div>
        </TooltipProvider>
      </motion.div>
    </motion.div>
  );
};

// Mobile Swipeable Cards Component
const MobileSwipeableCards = ({
  tierOrder,
  TIERS,
  currentTierId,
  isAuthenticated,
  handleSubscribe,
  isLoading,
}: {
  tierOrder: readonly string[];
  TIERS: any;
  currentTierId: string;
  isAuthenticated: boolean;
  handleSubscribe: (priceId: string) => void;
  isLoading: boolean;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(1); // Start at Premium (middle)
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const scrollToIndex = useCallback((index: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth * 0.85;
      const gap = 16;
      const scrollPosition = index * (cardWidth + gap);
      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < tierOrder.length - 1) {
      scrollToIndex(currentIndex + 1);
    } else if (isRightSwipe && currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  // Handle scroll end to update current index
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const cardWidth = scrollRef.current.offsetWidth * 0.85;
        const gap = 16;
        const scrollPosition = scrollRef.current.scrollLeft;
        const newIndex = Math.round(scrollPosition / (cardWidth + gap));
        if (newIndex !== currentIndex && newIndex >= 0 && newIndex < tierOrder.length) {
          setCurrentIndex(newIndex);
        }
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      return () => scrollElement.removeEventListener("scroll", handleScroll);
    }
  }, [currentIndex, tierOrder.length]);

  // Scroll to Premium (index 1) on mount for mobile
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToIndex(1);
    }, 100);
    return () => clearTimeout(timer);
  }, [scrollToIndex]);

  return (
    <div className="max-w-6xl mx-auto mb-10 sm:mb-16 mt-6 sm:mt-0">
      {/* Mobile Carousel */}
      <div className="md:hidden">
        {/* Navigation Arrows */}
        <div className="flex justify-between items-center px-4 mb-4">
          <button
            onClick={() => scrollToIndex(Math.max(0, currentIndex - 1))}
            className={`p-2 rounded-full bg-white/10 border border-white/20 transition-all ${
              currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-white/20"
            }`}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex gap-2">
            {tierOrder.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-violet-500 w-6"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => scrollToIndex(Math.min(tierOrder.length - 1, currentIndex + 1))}
            className={`p-2 rounded-full bg-white/10 border border-white/20 transition-all ${
              currentIndex === tierOrder.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-white/20"
            }`}
            disabled={currentIndex === tierOrder.length - 1}
          >
            <ChevronLeft className="w-5 h-5 text-white rotate-180" />
          </button>
        </div>

        {/* Swipeable Container */}
        <div
          ref={scrollRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {tierOrder.map((tierId, index) => (
            <div
              key={tierId}
              className="flex-shrink-0 snap-center"
              style={{ width: "85%" }}
            >
              <TierCard
                tier={TIERS[tierId]}
                isCurrentPlan={currentTierId === tierId}
                isAuthenticated={isAuthenticated}
                onSubscribe={handleSubscribe}
                isLoading={isLoading}
                index={index}
              />
            </div>
          ))}
        </div>

        {/* Swipe Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-xs text-slate-400 mt-4"
        >
          Swipe to compare plans
        </motion.p>
      </div>

      {/* Desktop/Tablet Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
    </div>
  );
};

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
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section - Dark Mode with elegant design */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden">
        {/* Dark background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-violet-900/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-40 sm:w-80 h-40 sm:h-80 bg-violet-800/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-6 sm:mb-8"
            >
              <Crown size={12} className="sm:w-3.5 sm:h-3.5 text-violet-400" />
              Investor Membership
            </motion.div>
            
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.1] mb-4 sm:mb-6 text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Choose Your{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-violet-400 to-violet-300 bg-clip-text text-transparent">
                  Membership
                </span>
                <motion.span
                  className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-2 sm:h-3 bg-violet-500/30 -z-0"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  style={{ originX: 0 }}
                />
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-sm sm:text-base md:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed px-4 sm:px-0"
            >
              Select the plan that matches your investment goals and unlock exclusive benefits.
            </motion.p>
          </motion.div>

          {/* Subscription Status */}
          <AnimatePresence>
            {isAuthenticated && currentProductId && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="max-w-md mx-auto mb-10 sm:mb-16 px-4 sm:px-0"
              >
                <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-xs sm:text-sm text-slate-400 mb-1">Active Membership</p>
                      <p className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
                        {TIERS[currentTierId as keyof typeof TIERS]?.name}
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-2 h-2 rounded-full bg-emerald-500"
                        />
                      </p>
                      {subscriptionEnd && (
                        <p className="text-[10px] sm:text-xs text-slate-500 mt-1">
                          Renews {new Date(subscriptionEnd).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleManageSubscription}
                      disabled={isLoading}
                      className="rounded-xl border-white/20 text-white hover:bg-white/10 hover:border-white/30 w-full sm:w-auto min-h-[44px] sm:min-h-0"
                    >
                      <RefreshCw size={14} className="mr-2" />
                      Manage
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pricing Cards - Mobile Swipeable Carousel */}
          <MobileSwipeableCards
            tierOrder={tierOrder}
            TIERS={TIERS}
            currentTierId={currentTierId}
            isAuthenticated={isAuthenticated}
            handleSubscribe={handleSubscribe}
            isLoading={isLoading}
          />

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-4 sm:gap-8 lg:gap-12"
          >
            {[
              { icon: Shield, label: "Secure Payments" },
              { icon: CreditCard, label: "Powered by Stripe" },
              { icon: RefreshCw, label: "Cancel Anytime" },
              { icon: MessageCircle, label: "24/7 Support" },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 sm:gap-2.5 text-slate-400 group cursor-default"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors flex-shrink-0">
                  <item.icon size={14} className="sm:w-4 sm:h-4 text-slate-300" />
                </div>
                <span className="text-xs sm:text-sm font-medium">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section - Light Mode */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-slate-50 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <HelpCircle size={12} className="sm:w-3.5 sm:h-3.5" />
              FAQ
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-slate-900 mb-3 sm:mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm sm:text-base md:text-lg px-4 sm:px-0">
              Everything you need to know about our membership plans
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
              {[
                {
                  value: "billing-1",
                  question: "How does billing work?",
                  answer: "Your membership is billed monthly on the same date you subscribed. All payments are processed securely through Stripe. You'll receive an email receipt for each payment."
                },
                {
                  value: "billing-2",
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit and debit cards including Visa, Mastercard, American Express, and Discover. We also support Apple Pay and Google Pay."
                },
                {
                  value: "upgrade-1",
                  question: "How do I upgrade my membership?",
                  answer: "You can upgrade your membership at any time from this page. When you upgrade, you'll be charged the prorated difference for the remainder of your billing period."
                },
                {
                  value: "cancel-1",
                  question: "How do I cancel my subscription?",
                  answer: "You can cancel anytime through the 'Manage Subscription' button. Once canceled, you'll retain access to paid features until the end of your current billing period."
                },
                {
                  value: "general-1",
                  question: "Do I need a membership to invest?",
                  answer: "No, you can invest with any tier including Explorer. Paid memberships provide enhanced research tools, earlier access to deals, and exclusive content."
                },
                {
                  value: "general-2",
                  question: "How do I contact support?",
                  answer: "Explorer and Premium members can reach support via email. Elite members enjoy VIP support through a dedicated WhatsApp group with priority response times."
                },
              ].map((faq, index) => (
                <motion.div
                  key={faq.value}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <AccordionItem 
                    value={faq.value} 
                    className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl px-4 sm:px-6 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4 sm:py-5 group min-h-[48px]">
                      <span className="font-medium text-slate-900 flex items-center gap-2.5 sm:gap-3 text-sm sm:text-base">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-violet-100 transition-colors flex-shrink-0">
                          <ChevronDown size={12} className="sm:w-3.5 sm:h-3.5 text-slate-500 group-hover:text-violet-600 transition-colors" />
                        </div>
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 pb-4 sm:pb-5 pl-7 sm:pl-9 text-sm sm:text-base leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Membership;
