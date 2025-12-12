import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  Crown, 
  Zap, 
  Star, 
  Newspaper, 
  GraduationCap, 
  TrendingUp, 
  BookOpen, 
  Users, 
  Calendar, 
  Bell, 
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
  Loader2
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
    description: "Start your investment journey",
    badge: null,
    icon: Zap,
    color: "from-slate-500 to-slate-600",
    features: [
      { icon: TrendingUp, label: "Weekly Market Analysis & Trends" },
      { icon: BookOpen, label: "Tokenization Case Studies" },
      { icon: Users, label: "Community Access (discussions, live Q&A)" },
      { icon: Calendar, label: "Events Lobby" },
      { icon: Eye, label: "Watchlist on 1 Asset" },
      { icon: Rocket, label: "Invest in 1 Deal (if eligible)" },
    ],
  },
  premium: {
    id: "premium",
    name: "Premium",
    price: "$49",
    priceAmount: 49,
    productId: "prod_Tac53QEwQEfRhj",
    priceId: "price_1SdQrVLG6ZPmKb4cg2fUf2eE",
    description: "Advanced tools for serious investors",
    badge: "Most Popular",
    icon: Star,
    color: "from-primary to-primary-glow",
    features: [
      { icon: Check, label: "Everything in Explorer" },
      { icon: Video, label: "Expert Webinars (monthly) + Replays" },
      { icon: BookOpen, label: "Research Reports" },
      { icon: Eye, label: "Unlimited Asset Watchlist" },
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
    description: "Exclusive access for top investors",
    badge: "VIP",
    icon: Crown,
    color: "from-amber-500 to-yellow-500",
    features: [
      { icon: Check, label: "Everything in Premium", highlight: true },
      { icon: Calendar, label: "Private Events (virtual & in-person)" },
      { icon: Users, label: "Elite Networking Lounge" },
      { icon: Rocket, label: "3-Day Early Access to Public Deals" },
      { icon: PieChart, label: "Portfolio Pro Tools (digest, alerts, planner)" },
      { icon: FileText, label: "Full Tax Exports" },
      { icon: MessageCircle, label: "VIP Support (WhatsApp, Priority)" },
    ],
  },
};

const tierOrder = ["explorer", "premium", "elite"] as const;

const TierCard = ({ 
  tier, 
  isCurrentPlan, 
  isAuthenticated, 
  onSubscribe, 
  isLoading 
}: { 
  tier: typeof TIERS.explorer;
  isCurrentPlan: boolean;
  isAuthenticated: boolean;
  onSubscribe: (priceId: string) => void;
  isLoading: boolean;
}) => {
  const Icon = tier.icon;
  const isPaid = tier.priceId !== null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`relative group ${tier.id === "premium" ? "lg:-mt-4 lg:mb-4" : ""}`}
    >
      {/* Popular badge */}
      {tier.badge && (
        <div className={`absolute -top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
          tier.badge === "VIP" 
            ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-black" 
            : "bg-gradient-to-r from-primary to-primary-glow text-white"
        }`}>
          {tier.badge}
        </div>
      )}

      <div className={`relative h-full p-8 rounded-3xl border transition-all duration-500 ${
        isCurrentPlan 
          ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" 
          : tier.id === "premium"
            ? "border-primary/30 bg-background/80 hover:border-primary/50"
            : "border-white/[0.08] bg-background/60 hover:border-white/20"
      }`}>
        {/* Glow effect for premium */}
        {tier.id === "premium" && (
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        )}

        {/* Current plan indicator */}
        {isCurrentPlan && (
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
            <Check size={12} />
            Your Plan
          </div>
        )}

        <div className="relative">
          {/* Icon */}
          <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${tier.color} mb-6`}>
            <Icon className="w-7 h-7 text-white" />
          </div>

          {/* Name & Price */}
          <h3 className="text-2xl font-bold text-foreground mb-1">{tier.name}</h3>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-4xl font-bold text-foreground">{tier.price}</span>
            {isPaid && <span className="text-muted-foreground">/month</span>}
          </div>
          <p className="text-muted-foreground text-sm mb-8">{tier.description}</p>

          {/* CTA Button */}
          {isCurrentPlan ? (
            <Button 
              variant="outline" 
              className="w-full mb-8 border-primary/30 text-primary hover:bg-primary/10"
              disabled
            >
              Current Plan
            </Button>
          ) : !isAuthenticated ? (
            <Link to="/auth" className="block mb-8">
              <Button 
                className={`w-full group ${
                  tier.id === "premium" 
                    ? "bg-primary hover:bg-primary/90" 
                    : tier.id === "elite"
                      ? "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black"
                      : "bg-muted hover:bg-muted/80"
                }`}
              >
                {isPaid ? "Sign Up to Subscribe" : "Get Started Free"}
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          ) : isPaid ? (
            <Button 
              className={`w-full mb-8 group ${
                tier.id === "premium" 
                  ? "bg-primary hover:bg-primary/90" 
                  : "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black"
              }`}
              onClick={() => onSubscribe(tier.priceId!)}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Subscribe Now
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="w-full mb-8 border-white/10 hover:bg-white/5"
              disabled
            >
              Free Forever
            </Button>
          )}

          {/* Features */}
          <div className="space-y-3">
            {tier.features.map((feature, index) => {
              const FeatureIcon = feature.icon;
              const isHighlight = feature.label.startsWith("Everything in");
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center gap-3 ${
                    isHighlight ? "text-primary font-medium" : "text-muted-foreground"
                  }`}
                >
                  <FeatureIcon size={16} className={isHighlight ? "text-primary" : "text-primary/60"} />
                  <span className="text-sm">{feature.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
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

  // Check subscription status
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
      // Refresh every minute
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
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Crown size={16} />
              Investor Membership
            </div>
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-foreground leading-tight mb-6">
              Choose Your <span className="text-gradient">Investment Journey</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Unlock exclusive tools, insights, and opportunities tailored to your investment goals.
            </p>
          </motion.div>

          {/* Subscription Status */}
          {isAuthenticated && currentProductId && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto mb-12 p-4 rounded-2xl bg-primary/5 border border-primary/20 text-center"
            >
              <p className="text-sm text-muted-foreground mb-2">
                Your current plan: <span className="font-semibold text-primary">{TIERS[currentTierId as keyof typeof TIERS]?.name}</span>
              </p>
              {subscriptionEnd && (
                <p className="text-xs text-muted-foreground">
                  Renews on {new Date(subscriptionEnd).toLocaleDateString()}
                </p>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleManageSubscription}
                disabled={isLoading}
                className="mt-3 border-primary/30 text-primary hover:bg-primary/10"
              >
                Manage Subscription
              </Button>
            </motion.div>
          )}

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
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
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Lock size={16} className="text-primary" />
                Secure Payment via Stripe
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-primary" />
                Cancel Anytime
              </div>
              <div className="flex items-center gap-2">
                <HelpCircle size={16} className="text-primary" />
                24/7 Support
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <HelpCircle size={16} />
              FAQ
            </div>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
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
              {/* Billing Questions */}
              <AccordionItem value="billing-1" className="bg-background/60 border border-white/[0.08] rounded-2xl px-6 data-[state=open]:border-primary/30">
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-foreground">How does billing work?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  Your membership is billed monthly on the same date you subscribed. All payments are processed securely through Stripe. You'll receive an email receipt for each payment, and you can view your billing history in the customer portal.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="billing-2" className="bg-background/60 border border-white/[0.08] rounded-2xl px-6 data-[state=open]:border-primary/30">
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-foreground">What payment methods do you accept?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  We accept all major credit and debit cards including Visa, Mastercard, American Express, and Discover. We also support Apple Pay, Google Pay, and bank transfers in select regions. All payments are processed through Stripe's secure payment infrastructure.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="billing-3" className="bg-background/60 border border-white/[0.08] rounded-2xl px-6 data-[state=open]:border-primary/30">
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-foreground">Will I be charged automatically?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  Yes, your subscription will automatically renew each month until you cancel. You'll receive an email reminder 3 days before each renewal. You can manage your subscription or update your payment method at any time through the customer portal.
                </AccordionContent>
              </AccordionItem>

              {/* Upgrade Questions */}
              <AccordionItem value="upgrade-1" className="bg-background/60 border border-white/[0.08] rounded-2xl px-6 data-[state=open]:border-primary/30">
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-foreground">How do I upgrade my membership?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  You can upgrade your membership at any time from this page or through the customer portal. When you upgrade, you'll be charged the prorated difference for the remainder of your current billing period. Your new benefits will be available immediately.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="upgrade-2" className="bg-background/60 border border-white/[0.08] rounded-2xl px-6 data-[state=open]:border-primary/30">
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-foreground">Can I switch between plans?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  Absolutely! You can upgrade or downgrade your plan at any time. When upgrading, you get immediate access to new features with prorated billing. When downgrading, your current plan remains active until the end of the billing period, then switches to the new plan.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="upgrade-3" className="bg-background/60 border border-white/[0.08] rounded-2xl px-6 data-[state=open]:border-primary/30">
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-foreground">Is there a free trial for Premium or Elite?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  We don't currently offer free trials, but our Explorer tier is completely free forever and gives you access to essential features. This allows you to experience the platform before committing to a paid membership. You can upgrade anytime when you're ready.
                </AccordionContent>
              </AccordionItem>

              {/* Cancellation Questions */}
              <AccordionItem value="cancel-1" className="bg-background/60 border border-white/[0.08] rounded-2xl px-6 data-[state=open]:border-primary/30">
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-foreground">How do I cancel my subscription?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  You can cancel your subscription at any time through the "Manage Subscription" button on this page. Once canceled, you'll retain access to your paid features until the end of your current billing period. No refunds are provided for partial months.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cancel-2" className="bg-background/60 border border-white/[0.08] rounded-2xl px-6 data-[state=open]:border-primary/30">
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-foreground">What happens when I cancel?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  When you cancel, your membership will remain active until the end of your current billing period. After that, you'll be automatically moved to the free Explorer tier. Your account data, watchlists, and history will be preserved, but you'll lose access to premium features.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cancel-3" className="bg-background/60 border border-white/[0.08] rounded-2xl px-6 data-[state=open]:border-primary/30">
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-foreground">Can I get a refund?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  We don't offer refunds for partial billing periods. However, if you're experiencing issues with your membership or believe you were charged in error, please contact our support team and we'll be happy to help resolve the situation.
                </AccordionContent>
              </AccordionItem>

              {/* General Questions */}
              <AccordionItem value="general-1" className="bg-background/60 border border-white/[0.08] rounded-2xl px-6 data-[state=open]:border-primary/30">
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-foreground">Do I need a membership to invest?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  No, you can invest through the Fragma marketplace with any membership tier, including the free Explorer plan. Paid memberships provide enhanced research tools, earlier access to deals, and exclusive educational content to help you make more informed investment decisions.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="general-2" className="bg-background/60 border border-white/[0.08] rounded-2xl px-6 data-[state=open]:border-primary/30">
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-foreground">How do I contact support?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  Explorer and Premium members can reach support via email at support@fragma.io. Elite members enjoy VIP support through a dedicated WhatsApp group with priority response times. All members can also access our community forums for peer assistance.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Membership;
