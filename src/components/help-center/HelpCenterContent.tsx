import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  FileText, 
  Shield, 
  CreditCard, 
  Users, 
  Building2,
  ChevronRight,
  ExternalLink,
  Clock,
  Sparkles,
  BookOpen,
  Wallet,
  ArrowRight,
  CheckCircle2,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

// FAQ Categories with questions
const faqCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Sparkles,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    questions: [
      {
        q: "How do I create an account?",
        a: "Creating an account is simple. Click 'Get Started' on our homepage, enter your email, and follow the verification steps. You'll need to complete KYC verification to start investing."
      },
      {
        q: "What documents do I need for verification?",
        a: "You'll need a valid government-issued ID (passport or national ID), proof of address (utility bill or bank statement dated within 3 months), and may need to provide source of funds documentation."
      },
      {
        q: "How long does account verification take?",
        a: "Most verifications are completed within 24-48 hours. Complex cases may take up to 5 business days. You'll receive email updates on your verification status."
      },
    ]
  },
  {
    id: "investments",
    title: "Investments",
    icon: Building2,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    questions: [
      {
        q: "What is the minimum investment amount?",
        a: "The minimum investment starts at €50 across the platform. However, individual deals may have higher minimums based on the asset class and structure. Check each deal's terms for specific requirements."
      },
      {
        q: "How are returns distributed?",
        a: "Returns are distributed according to each deal's specific terms. This can include quarterly dividends, annual distributions, or returns at exit. All distribution schedules are clearly outlined in the deal documentation."
      },
      {
        q: "Can I exit my investment early?",
        a: "Some investments can be traded on our secondary marketplace, allowing early exit subject to buyer availability. Terms vary by deal—check the specific deal documentation for liquidity options."
      },
      {
        q: "What asset types are available?",
        a: "We offer tokenized real estate, film & media rights, music royalties, private credit, luxury assets, and more. Each asset class has its own risk/return profile."
      },
    ]
  },
  {
    id: "wallet-payments",
    title: "Wallet & Payments",
    icon: Wallet,
    color: "text-violet-600",
    bgColor: "bg-violet-50",
    questions: [
      {
        q: "How do I deposit funds?",
        a: "Navigate to Banking in your dashboard, click 'Deposit Funds', and choose your preferred method (bank transfer or card). Follow the instructions to complete your deposit."
      },
      {
        q: "How long do withdrawals take?",
        a: "Withdrawals typically process within 1-3 business days for bank transfers. Card withdrawals may take 3-5 business days depending on your bank."
      },
      {
        q: "What currencies are supported?",
        a: "We primarily operate in EUR. USD and GBP are supported with automatic conversion. Other currencies may incur additional conversion fees."
      },
    ]
  },
  {
    id: "security",
    title: "Security & Privacy",
    icon: Shield,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    questions: [
      {
        q: "How is my investment protected?",
        a: "Your assets are held in regulated custody with institutional-grade security. We use smart contracts for transparent ownership and multi-signature protocols for all transactions."
      },
      {
        q: "What security measures are in place?",
        a: "We implement bank-grade encryption, two-factor authentication, biometric login options, and continuous fraud monitoring. All data is encrypted at rest and in transit."
      },
      {
        q: "How is my personal data used?",
        a: "Your data is used solely for account management, regulatory compliance, and improving our services. We never sell personal data. See our Privacy Policy for full details."
      },
    ]
  },
  {
    id: "account",
    title: "Account Management",
    icon: Users,
    color: "text-slate-600",
    bgColor: "bg-slate-100",
    questions: [
      {
        q: "How do I update my profile information?",
        a: "Go to Settings in your dashboard to update personal details. Some changes (like legal name) may require additional verification for compliance purposes."
      },
      {
        q: "Can I have multiple accounts?",
        a: "Each individual is limited to one personal account. Business accounts are available separately for entities. Contact support for business account inquiries."
      },
      {
        q: "How do I enable two-factor authentication?",
        a: "Navigate to Settings > Security and click 'Enable 2FA'. You can use an authenticator app or SMS verification for added protection."
      },
    ]
  },
];

const popularArticles = [
  { title: "Complete Guide to Tokenized Investments", icon: BookOpen },
  { title: "Understanding Risk Levels", icon: Shield },
  { title: "Secondary Market Trading Guide", icon: Building2 },
  { title: "Tax Documentation & Reporting", icon: FileText },
];

export const HelpCenterContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({ subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter FAQs based on search
  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => searchQuery === "" || category.questions.length > 0);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent!",
      description: "Our support team will respond within 24 hours.",
    });
    
    setContactForm({ subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium mb-4"
        >
          <HelpCircle className="w-4 h-4" />
          Help Center
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-3xl font-serif text-foreground mb-3"
        >
          How can we help you?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground"
        >
          Search our knowledge base or browse categories below
        </motion.p>
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="max-w-2xl mx-auto"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 py-6 text-base bg-card border-border/60 rounded-xl shadow-sm"
          />
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
      >
        {[
          { 
            title: "Live Chat", 
            subtitle: "Get instant help", 
            icon: MessageSquare, 
            color: "bg-emerald-500",
            available: true 
          },
          { 
            title: "Schedule Call", 
            subtitle: "Book a consultation", 
            icon: Phone, 
            color: "bg-blue-500",
            available: true 
          },
          { 
            title: "Email Support", 
            subtitle: "support@fragma.io", 
            icon: Mail, 
            color: "bg-violet-500",
            available: true 
          },
        ].map((action, index) => (
          <motion.button
            key={action.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + index * 0.05 }}
            className="group bg-card border border-border/60 rounded-xl p-4 text-left hover:shadow-lg hover:border-slate-300 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-white", action.color)}>
                <action.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground">{action.title}</p>
                  {action.available && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{action.subtitle}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* FAQ Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Browse by Topic
          </h3>
          {faqCategories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + index * 0.05 }}
              onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200",
                activeCategory === category.id 
                  ? "bg-slate-900 text-white shadow-lg" 
                  : "bg-card border border-border/60 hover:border-slate-300 hover:shadow-sm"
              )}
            >
              <div className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center",
                activeCategory === category.id ? "bg-white/10" : category.bgColor
              )}>
                <category.icon className={cn(
                  "w-4 h-4",
                  activeCategory === category.id ? "text-white" : category.color
                )} />
              </div>
              <div className="flex-1">
                <p className={cn(
                  "font-medium text-sm",
                  activeCategory === category.id ? "text-white" : "text-foreground"
                )}>
                  {category.title}
                </p>
                <p className={cn(
                  "text-xs",
                  activeCategory === category.id ? "text-white/70" : "text-muted-foreground"
                )}>
                  {category.questions.length} articles
                </p>
              </div>
              <ChevronRight className={cn(
                "w-4 h-4 transition-transform",
                activeCategory === category.id ? "text-white rotate-90" : "text-muted-foreground"
              )} />
            </motion.button>
          ))}

          {/* Popular Articles */}
          <div className="pt-6">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
              Popular Articles
            </h3>
            <div className="space-y-2">
              {popularArticles.map((article, index) => (
                <motion.button
                  key={article.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg text-left hover:bg-slate-50 transition-colors group"
                >
                  <article.icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground group-hover:text-slate-900 flex-1">
                    {article.title}
                  </span>
                  <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* FAQ Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="lg:col-span-2"
        >
          <div className="bg-card border border-border/60 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="p-5 border-b border-border/60 bg-slate-50/50">
              <h2 className="font-semibold text-foreground">
                {activeCategory 
                  ? faqCategories.find(c => c.id === activeCategory)?.title 
                  : "Frequently Asked Questions"
                }
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {searchQuery 
                  ? `${filteredCategories.reduce((acc, c) => acc + c.questions.length, 0)} results found`
                  : "Find answers to common questions"
                }
              </p>
            </div>

            {/* FAQ List */}
            <div className="p-5">
              <AnimatePresence mode="wait">
                {filteredCategories.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="font-medium text-foreground mb-2">No results found</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Try a different search term or browse categories
                    </p>
                    <Button 
                      variant="navy-outline" 
                      size="sm"
                      onClick={() => setSearchQuery("")}
                    >
                      Clear Search
                    </Button>
                  </motion.div>
                ) : (
                  <Accordion type="single" collapsible className="space-y-3">
                    {filteredCategories
                      .filter(c => !activeCategory || c.id === activeCategory)
                      .flatMap(category => 
                        category.questions.map((item, qIndex) => (
                          <AccordionItem 
                            key={`${category.id}-${qIndex}`} 
                            value={`${category.id}-${qIndex}`}
                            className="border border-border/60 rounded-xl px-4 data-[state=open]:shadow-sm transition-shadow"
                          >
                            <AccordionTrigger className="hover:no-underline py-4">
                              <div className="flex items-start gap-3 text-left">
                                <div className={cn("w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5", category.bgColor)}>
                                  <category.icon className={cn("w-3 h-3", category.color)} />
                                </div>
                                <span className="font-medium text-foreground">{item.q}</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-9 pb-4 text-muted-foreground">
                              {item.a}
                            </AccordionContent>
                          </AccordionItem>
                        ))
                      )
                    }
                  </Accordion>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white"
          >
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <Send className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Still need help?</h3>
                <p className="text-white/70 text-sm">
                  Send us a message and we'll get back to you within 24 hours
                </p>
              </div>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Subject"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
                  required
                />
              </div>
              <div>
                <Textarea
                  placeholder="Describe your issue or question..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 min-h-[120px] resize-none"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Clock className="w-4 h-4" />
                  Typical response: 2-4 hours
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-white text-slate-900 hover:bg-white/90 gap-2"
                >
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};