import { BookOpen, Shield, Zap, Wallet, Scale, Users } from "lucide-react";

export const faqCategories = [
  {
    id: "basics",
    icon: BookOpen,
    title: "Getting Started",
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
