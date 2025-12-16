import { useState, useEffect } from "react";
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
  Info
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
    features: [
      { icon: TrendingUp, label: "Weekly Market Analysis & Trends", tooltip: "Receive curated weekly insights on market movements, emerging opportunities, and key trends in alternative investments." },
      { icon: BookOpen, label: "Tokenization Case Studies", tooltip: "Access detailed case studies showing how real-world assets are tokenized, including success stories and lessons learned." },
      { icon: Users, label: "Community Access (discussions, live Q&A)", tooltip: "Join our active community of investors for discussions, networking, and live Q&A sessions with industry experts." },
      { icon: Calendar, label: "Events Lobby", tooltip: "Browse and register for upcoming webinars, workshops, and networking events in the Fragma ecosystem." },
      { icon: Eye, label: "Watchlist on 1 Asset", tooltip: "Track one asset of your choice with price alerts and updates delivered to your dashboard." },
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
    features: [
      { icon: Check, label: "Everything in Explorer", tooltip: "All features from the Explorer tier are included in your Premium membership." },
      { icon: Video, label: "Expert Webinars (monthly) + Replays", tooltip: "Attend exclusive monthly webinars with industry experts and access full replay library on-demand." },
      { icon: BookOpen, label: "Research Reports", tooltip: "Deep-dive research reports on asset classes, market sectors, and specific investment opportunities." },
      { icon: Eye, label: "Unlimited Asset Watchlist", tooltip: "Track unlimited assets with personalized alerts, price movements, and real-time updates." },
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
    badge: "VIP",
    icon: Crown,
    features: [
      { icon: Check, label: "Everything in Premium", tooltip: "All features from Premium tier are included in your Elite membership." },
      { icon: Calendar, label: "Private Events (virtual & in-person)", tooltip: "Exclusive invitations to private investor events, both virtual roundtables and in-person gatherings." },
      { icon: Users, label: "Elite Networking Lounge", tooltip: "Access a private networking space to connect with other Elite members and industry leaders." },
      { icon: Rocket, label: "3-Day Early Access to Public Deals", tooltip: "Get priority access to invest in public deals 3 days before they open to other members." },
      { icon: Lock, label: "Access to Off-Market Fragma Deals", tooltip: "Exclusive access to private, off-market investment opportunities not available to other membership tiers." },
      { icon: Zap, label: "Unlimited Deals Investments", tooltip: "No limits on the number of deals you can participate in annually (subject to deal-specific terms)." },
      { icon: PieChart, label: "Portfolio Pro Tools (digest, alerts, planner)", tooltip: "Advanced portfolio management with automated digests, smart alerts, and financial planning tools." },
      { icon: FileText, label: "Full Tax Exports", tooltip: "Comprehensive tax documentation including detailed transaction history, gains/losses reports, and jurisdiction-specific formats." },
      { icon: MessageCircle, label: "VIP Support (WhatsApp, Priority)", tooltip: "Direct WhatsApp access to our support team with priority response times and dedicated assistance." },
    ],
  },
};

const tierOrder = ["explorer", "premium", "elite"] as const;

// Clean tier card component
const TierCard = ({ 
  tier, 
  isCurrentPlan, 
  isAuthenticated, 
  onSubscribe, 
  isLoading,
}: { 
  tier: typeof TIERS.explorer;
  isCurrentPlan: boolean;
  isAuthenticated: boolean;
  onSubscribe: (priceId: string) => void;
  isLoading: boolean;
}) => {
  const Icon = tier.icon;
  const isPaid = tier.priceId !== null;
  const isPremium = tier.id === "premium";
  const isElite = tier.id === "elite";

  return (
    <div className={`relative flex flex-col h-full ${isPremium ? "lg:-mt-4 lg:mb-4" : ""}`}>
      {/* Badge */}
      {tier.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <div
            className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide ${
              isElite ? "bg-elite text-elite-foreground" : "bg-foreground text-background"
            }`}
          >
            {tier.badge}
          </div>
        </div>
      )}

      {/* Card */}
      <div className={`flex flex-col h-full rounded-2xl border p-8 ${
        isPremium || isElite
          ? "border-white/30 bg-white/[0.03]" 
          : "border-border bg-card"
      }`}>
        {/* Current plan indicator */}
        {isCurrentPlan && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/20">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-xs font-medium text-white">Active</span>
            </div>
          </div>
        )}

        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
            isElite
              ? "bg-elite text-elite-foreground"
              : isPremium
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground"
          }`}
        >
          <Icon className="w-6 h-6" strokeWidth={1.5} />
        </div>

        {/* Name & Price */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-foreground mb-2">{tier.name}</h3>
          <div className="flex items-baseline gap-1">
            <span className={`text-4xl font-bold ${
              isPremium || isElite
                ? "text-white" 
                : "text-foreground"
            }`}>
              {tier.price}
            </span>
            {isPaid && (
              <span className="text-muted-foreground text-sm">/month</span>
            )}
          </div>
          <p className="text-muted-foreground text-sm mt-2">{tier.description}</p>
        </div>

        {/* CTA Button */}
        <div className="mb-6">
          {isCurrentPlan ? (
            <Button 
              variant="outline" 
              className="w-full h-11 rounded-lg"
              disabled
            >
              <Check size={16} className="mr-2" />
              Current Plan
            </Button>
          ) : !isAuthenticated ? (
            <Link to="/auth" className="block">
              <Button 
                className={`w-full h-11 rounded-lg font-medium ${
                  isPremium || isElite
                    ? "bg-white hover:bg-white/90 text-background" 
                    : "bg-muted hover:bg-muted/80 text-foreground"
                }`}
              >
                {isPaid ? "Sign Up to Subscribe" : "Get Started Free"}
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          ) : isPaid ? (
            <Button 
              className="w-full h-11 rounded-lg font-medium bg-white hover:bg-white/90 text-background"
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
                  <ArrowRight size={16} className="ml-2" />
                </>
              )}
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="w-full h-11 rounded-lg"
              disabled
            >
              Free Forever
            </Button>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-6" />

        {/* Features */}
        <TooltipProvider delayDuration={200}>
          <div className="space-y-3 flex-1">
            {tier.features.map((feature, featureIndex) => {
              const FeatureIcon = feature.icon;
              const isHighlight = feature.label.startsWith("Everything in");
              
              return (
                <div
                  key={featureIndex}
                  className={`flex items-start gap-3 ${
                    isHighlight ? "text-white" : "text-muted-foreground"
                  }`}
                >
                  <div className={`flex-shrink-0 w-5 h-5 rounded flex items-center justify-center mt-0.5 ${
                    isHighlight ? "bg-white/10" : "bg-muted"
                  }`}>
                    <FeatureIcon size={12} className={isHighlight ? "text-white" : "text-muted-foreground"} />
                  </div>
                  <span className={`text-sm leading-relaxed flex-1 ${isHighlight ? "font-medium" : ""}`}>
                    {feature.label}
                  </span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="flex-shrink-0 mt-0.5 opacity-50 hover:opacity-100 transition-opacity">
                        <Info size={14} className="text-muted-foreground" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-[250px] text-xs">
                      {feature.tooltip}
                    </TooltipContent>
                  </Tooltip>
                </div>
              );
            })}
          </div>
        </TooltipProvider>
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

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-6">
              <Crown size={14} />
              Investor Membership
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground leading-tight mb-6">
              Choose Your Membership
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select the plan that matches your investment goals and unlock exclusive benefits.
            </p>
          </div>

          {/* Subscription Status */}
          {isAuthenticated && currentProductId && (
            <div className="max-w-md mx-auto mb-12">
              <div className="p-5 rounded-xl bg-white/5 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Active Membership</p>
                    <p className="text-lg font-semibold text-foreground flex items-center gap-2">
                      {TIERS[currentTierId as keyof typeof TIERS]?.name}
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
                    className="rounded-lg border-white/30 text-white hover:bg-white/10"
                  >
                    <RefreshCw size={14} className="mr-2" />
                    Manage
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tierOrder.map((tierId) => (
              <TierCard
                key={tierId}
                tier={TIERS[tierId]}
                isCurrentPlan={currentTierId === tierId}
                isAuthenticated={isAuthenticated}
                onSubscribe={handleSubscribe}
                isLoading={isLoading}
              />
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center gap-6">
            {[
              { icon: Shield, label: "Secure Payments" },
              { icon: CreditCard, label: "Powered by Stripe" },
              { icon: RefreshCw, label: "Cancel Anytime" },
              { icon: MessageCircle, label: "24/7 Support" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-muted-foreground">
                <item.icon size={16} />
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-4">
              <HelpCircle size={14} />
              FAQ
            </div>
            <h2 className="text-3xl font-serif font-bold text-foreground mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know about our membership plans
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
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
              ].map((faq) => (
                <AccordionItem 
                  key={faq.value}
                  value={faq.value} 
                  className="bg-background border border-border rounded-lg px-5"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <span className="font-medium text-foreground flex items-center gap-2">
                      <ChevronRight size={14} className="text-muted-foreground" />
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 pl-6 text-sm">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
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