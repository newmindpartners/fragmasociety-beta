import { motion } from "framer-motion";
import { HelpCircle, ChevronDown, Shield, Wallet, BookOpen, Zap, Scale, Users } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
          className="text-center mb-16"
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

        {/* FAQ Categories */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
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
                <h3 className="text-lg font-semibold text-foreground">
                  {category.title}
                </h3>
              </div>

              {/* Accordion */}
              <Accordion type="single" collapsible className="space-y-2">
                {category.faqs.map((faq, faqIndex) => (
                  <AccordionItem
                    key={faqIndex}
                    value={`${category.id}-${faqIndex}`}
                    className="border border-border/30 rounded-xl px-4 data-[state=open]:bg-card/50 transition-colors"
                  >
                    <AccordionTrigger className="text-left text-sm font-medium hover:no-underline hover:text-primary transition-colors py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>

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
