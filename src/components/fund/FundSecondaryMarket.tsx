import { motion } from "framer-motion";
import { Coins, BookOpen, RefreshCw, Layers } from "lucide-react";

const OrderbookCard = () => {
  const bids = [
    { price: "€99.85", size: "25,000", total: "€2,496,250" },
    { price: "€99.80", size: "50,000", total: "€4,990,000" },
    { price: "€99.75", size: "35,000", total: "€3,491,250" },
  ];

  const asks = [
    { price: "€100.15", size: "20,000", total: "€2,003,000" },
    { price: "€100.20", size: "45,000", total: "€4,509,000" },
    { price: "€100.25", size: "30,000", total: "€3,007,500" },
  ];

  return (
    <div className="relative">
      {/* Glow effect */}
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-0 bg-primary/10 rounded-2xl blur-3xl"
      />
      
      <div className="glass rounded-2xl p-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-muted-foreground">FRAGMA FUND NOTES</p>
            <p className="text-lg font-serif font-bold text-foreground">FRG-FUND-01</p>
          </div>
          <span className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">Illustrative</span>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div>
            <p className="text-xs text-muted-foreground">Last Price</p>
            <p className="text-lg font-bold text-foreground">€100.00</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">24h Volume</p>
            <p className="text-lg font-bold text-foreground">€1.2M</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Spread</p>
            <p className="text-lg font-bold text-primary">0.30%</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Bids */}
          <div>
            <div className="grid grid-cols-3 gap-1 text-xs text-muted-foreground mb-2 px-2">
              <span>Price</span>
              <span className="text-right">Size</span>
              <span className="text-right">Total</span>
            </div>
            {bids.map((bid, i) => (
              <div key={i} className="grid grid-cols-3 gap-1 text-xs py-1.5 px-2 rounded bg-green-500/10 mb-1">
                <span className="text-green-400">{bid.price}</span>
                <span className="text-right text-foreground">{bid.size}</span>
                <span className="text-right text-muted-foreground">{bid.total}</span>
              </div>
            ))}
          </div>

          {/* Asks */}
          <div>
            <div className="grid grid-cols-3 gap-1 text-xs text-muted-foreground mb-2 px-2">
              <span>Price</span>
              <span className="text-right">Size</span>
              <span className="text-right">Total</span>
            </div>
            {asks.map((ask, i) => (
              <div key={i} className="grid grid-cols-3 gap-1 text-xs py-1.5 px-2 rounded bg-red-500/10 mb-1">
                <span className="text-red-400">{ask.price}</span>
                <span className="text-right text-foreground">{ask.size}</span>
                <span className="text-right text-muted-foreground">{ask.total}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const FundSecondaryMarket = () => {
  const bullets = [
    {
      icon: Coins,
      title: "Tokenised fund positions",
      description: "Each note can be represented as on-chain units in a non-custodial wallet, mirroring the legal position in the Luxembourg structure."
    },
    {
      icon: BookOpen,
      title: "Order-book based trading",
      description: "Investors can submit bid and ask orders at the price and size they choose, seeing aggregated depth in the order book rather than opaque OTC indications."
    },
    {
      icon: RefreshCw,
      title: "Portfolio flexibility",
      description: "Subject to demand and eligibility rules, investors may rebalance, trim or increase their exposure over time instead of being locked until final maturity."
    },
    {
      icon: Layers,
      title: "Aligned with other Fragma RWAs",
      description: "Fragma Fund notes sit alongside tokenised real estate, private credit and other deals on the same marketplace, giving allocators a single secondary venue for multiple strategies."
    }
  ];

  return (
    <section className="py-24 bg-navy-surface relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
              Secondary Market • Fragma Society
            </span>

            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-6">
              Order-book trading for potential liquidity.
            </h2>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              Once issued, eligible Fragma Fund notes are expected to be tokenised and admitted to trading on the Fragma Society marketplace, where investors can place limit orders on an order-book – creating a venue for potential secondary market liquidity without giving up custody of their assets.
            </p>

            <div className="space-y-5">
              {bullets.map((bullet, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <bullet.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">{bullet.title}</h3>
                    <p className="text-sm text-muted-foreground">{bullet.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground mt-8 p-4 bg-card/50 rounded-lg border border-border">
              Secondary market access is not guaranteed. Liquidity depends on market conditions, the presence of other buyers and sellers, and regulatory or listing requirements. Investors should be prepared to hold Fragma Fund notes to maturity.
            </p>
          </motion.div>

          {/* Right Column - Orderbook */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="hidden lg:block"
          >
            <OrderbookCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
