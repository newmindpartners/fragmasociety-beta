import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Shield, Wallet, BookOpen, Zap, Scale, Users, Search, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

const faqCategories = [
  {
    id: "basics",
    icon: BookOpen,
    title: "Getting Started",
    color: "from-emerald-500/20 to-teal-500/20",
    faqs: [
      {
        question: "What is the Fragma Society secondary marketplace?",
        answer: "The secondary marketplace is a peer-to-peer trading platform where investors can buy and sell tokenised real-world assets (RWA). You set your own price, place limit orders, and trade directly with other investors — without giving up control of your assets."
      },
      {
        question: "Is the marketplace centralized or decentralized?",
        answer: "It is fully non-custodial and decentralized. Your assets stay in your wallet or Smart Vault at all times. Trades are executed by Cardano smart contracts, not by Fragma or any third party."
      },
      {
        question: "Do I have to understand DeFi to use the marketplace?",
        answer: "No. Everything is designed to be simple, intuitive, and beginner-friendly. You see clear prices, you choose your price, you confirm the transaction — smart contracts handle the rest. If you've ever used a stock trading app, you'll feel right at home."
      }
    ]
  },
  {
    id: "security",
    icon: Shield,
    title: "Security & Custody",
    color: "from-violet-500/20 to-purple-500/20",
    faqs: [
      {
        question: "What does \"non-custodial\" mean?",
        answer: "Non-custodial means: We never hold your funds. Your assets stay in your wallet. Only you can approve transactions. Even if Fragma disappeared, your assets remain safe. This is the opposite of centralized exchanges or platforms that require you to deposit funds first."
      },
      {
        question: "What is a Smart Vault?",
        answer: "A Smart Vault is an on-chain secure contract that holds your asset while waiting for your order to execute. Think of it like a digital safety deposit box: Only you can put assets in, only you can approve movement, and no one — including Fragma — can take funds. Smart Vaults are built on Cardano and use the EUTXO model for maximum security and predictability."
      },
      {
        question: "What happens if Fragma Society goes offline?",
        answer: "Nothing happens to your assets. Because everything is non-custodial and on-chain: Your tokens remain in your wallet, smart contracts remain operational, and assets cannot be seized or frozen by us. This is the core advantage of a decentralized marketplace."
      }
    ]
  },
  {
    id: "trading",
    icon: Zap,
    title: "Trading & Orders",
    color: "from-amber-500/20 to-orange-500/20",
    faqs: [
      {
        question: "How does the order book work?",
        answer: "The order book shows all buy orders (bids) and sell orders (asks) placed by traders. If your buy price meets someone's sell price → a trade executes. If your sell price meets someone's buy price → a trade executes. Prices and liquidity are fully transparent. You can place limit orders at whatever price you decide — you do not have to accept market price."
      },
      {
        question: "What are limit orders?",
        answer: "A limit order is an order you place at a specific price. Example: \"Buy 10 slices at €95\" or \"Sell 5 slices at €120\". Your order stays active until: matched with another trader, cancelled by you, or expires (if you set an expiration)."
      },
      {
        question: "What are two-way orders?",
        answer: "Two-way orders allow you to place a buy order at one price and a sell order at another price — both stay active at the same time. Example: You want to buy at €95 and sell at €120. Fragma lets you do both — the smart contract executes whichever condition is met first."
      },
      {
        question: "Can I cancel or change my order?",
        answer: "Yes, any time before it executes. Just click Cancel Order in your order list."
      }
    ]
  },
  {
    id: "technology",
    icon: Wallet,
    title: "Technology",
    color: "from-primary/20 to-accent/20",
    faqs: [
      {
        question: "Why did you choose Cardano?",
        answer: "Cardano provides: EUTXO architecture for predictable, conflict-free execution, high security from Bitcoin-inspired transaction logic, low stable fees, smart contracts without global-state conflicts, and stronger protection against front-running and MEV. For financial markets, these are critical advantages."
      },
      {
        question: "What is EUTXO in simple terms?",
        answer: "EUTXO stands for Extended Unspent Transaction Output. In simple words: Each order or asset is a self-contained piece of data, smart contracts validate each piece independently, and there are no global conflicts or race conditions. This makes trading safer, cleaner, and more predictable than on global-state blockchains."
      },
      {
        question: "How does settlement work?",
        answer: "Settlement happens directly on Cardano, using smart contracts. When a buy and sell order match: Funds move from the buyer's vault, assets move from the seller's vault, the smart contract verifies everything, and the trade completes instantly. No middlemen. No custodians. No human intervention."
      },
      {
        question: "What wallets can I use?",
        answer: "Any Cardano-compatible wallet supporting: multi-asset tokens, smart contract signing, and DApp connectors. We also support partner custodians for institutional clients."
      }
    ]
  },
  {
    id: "options",
    icon: Scale,
    title: "Options & Advanced",
    color: "from-rose-500/20 to-pink-500/20",
    faqs: [
      {
        question: "What is options trading on Fragma?",
        answer: "Options trading lets you: Earn extra yield (selling covered calls or puts), hedge risk (buying puts), and speculate with limited downside (buying calls). All options are fully collateralized, meaning no leverage risk and no chance of liquidation cascades. Everything is executed transparently by smart contracts."
      }
    ]
  },
  {
    id: "general",
    icon: Users,
    title: "Fees & Access",
    color: "from-cyan-500/20 to-sky-500/20",
    faqs: [
      {
        question: "Are there fees?",
        answer: "Yes, small trading fees apply. These fees support: blockchain settlement, infrastructure cost, and marketplace maintenance. Fees are clearly displayed before confirming a trade."
      },
      {
        question: "Can I lose money?",
        answer: "Yes. As with any investment or trading activity: Asset prices can go down, orders may not fill, and market liquidity can vary. However, the marketplace cannot lose your assets, because it is non-custodial."
      },
      {
        question: "Is liquidity guaranteed?",
        answer: "No marketplace can guarantee liquidity. However, Fragma provides tools to help liquidity emerge, including: transparent order books, fair pricing, decentralized matching engine, and options for market makers. Liquidity depends on market activity and demand."
      },
      {
        question: "Is the marketplace regulated?",
        answer: "The marketplace is a technology layer, not a custodian. However, the underlying assets are issued under appropriate Luxembourg or partner jurisdiction regulated frameworks, ensuring compliance at the product level."
      },
      {
        question: "Can anyone use the marketplace?",
        answer: "Retail access depends on jurisdiction and asset type. Some assets may be restricted to: professional investors, accredited investors, or users passing enhanced verification. The platform shows these rules clearly before you trade."
      }
    ]
  }
];

export const MarketplaceFAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return faqCategories;

    const query = searchQuery.toLowerCase();
    
    return faqCategories
      .map(category => ({
        ...category,
        faqs: category.faqs.filter(
          faq =>
            faq.question.toLowerCase().includes(query) ||
            faq.answer.toLowerCase().includes(query)
        )
      }))
      .filter(category => category.faqs.length > 0);
  }, [searchQuery]);

  const totalResults = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.faqs.length, 0);
  }, [filteredCategories]);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">FAQ</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Frequently Asked{" "}
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about the Fragma Society secondary marketplace
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto mb-12"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-12 py-6 text-base bg-card/80 border-border/50 rounded-2xl focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 p-1 rounded-full hover:bg-muted transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Search Results Count */}
          <AnimatePresence>
            {searchQuery && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-muted-foreground text-center mt-4"
              >
                {totalResults === 0 ? (
                  "No results found"
                ) : (
                  <>
                    Found <span className="text-primary font-medium">{totalResults}</span> result{totalResults !== 1 ? "s" : ""}
                  </>
                )}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* FAQ Categories */}
        <AnimatePresence mode="wait">
          {filteredCategories.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
            >
              {filteredCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.05 }}
                  className="card-premium p-6"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}
                      whileHover={{ rotate: 5, scale: 1.05 }}
                    >
                      <category.icon className="w-5 h-5 text-primary" />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {category.title}
                      </h3>
                      {searchQuery && (
                        <p className="text-xs text-muted-foreground">
                          {category.faqs.length} result{category.faqs.length !== 1 ? "s" : ""}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Accordion */}
                  <Accordion type="single" collapsible className="space-y-2" defaultValue={searchQuery ? `${category.id}-0` : undefined}>
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem
                        key={faqIndex}
                        value={`${category.id}-${faqIndex}`}
                        className="border border-border/30 rounded-xl px-4 data-[state=open]:bg-card/50 transition-colors"
                      >
                        <AccordionTrigger className="text-left text-sm font-medium hover:no-underline hover:text-primary transition-colors py-4">
                          <HighlightText text={faq.question} highlight={searchQuery} />
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                          <HighlightText text={faq.answer} highlight={searchQuery} />
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No results found</h3>
              <p className="text-muted-foreground mb-4">
                Try searching with different keywords
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="text-primary hover:underline text-sm"
              >
                Clear search
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            Still have questions?
          </p>
          <motion.a
            href="mailto:support@fragma.io"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/30 text-primary font-medium hover:bg-primary/20 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Support
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

// Helper component to highlight search terms
const HighlightText = ({ text, highlight }: { text: string; highlight: string }) => {
  if (!highlight.trim()) {
    return <>{text}</>;
  }

  const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark key={index} className="bg-primary/30 text-foreground rounded px-0.5">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
};