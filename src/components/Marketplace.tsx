import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, ArrowDownLeft, TrendingUp, Clock, Users, Building, Film, Briefcase } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import bankFrickLogo from "@/assets/partners/bank-frick.png";
import dfnsLogo from "@/assets/partners/dfns.png";
import houseOfWeb3Logo from "@/assets/partners/house-of-web3.svg";
import ledgityLogo from "@/assets/partners/ledgity.png";
import realizLogo from "@/assets/partners/realiz.png";
import swissquoteLogo from "@/assets/partners/swissquote.png";
import woudLawLogo from "@/assets/partners/woud-law.jpeg";

// Asset images
import rwaVilla from "@/assets/rwa-villa.jpg";
import rwaFilm from "@/assets/rwa-film.jpg";
import rwaCommercial from "@/assets/rwa-commercial.jpg";
import propertyMalibu from "@/assets/property-malibu.jpg";

interface TradableAsset {
  id: string;
  name: string;
  category: string;
  categoryIcon: typeof Building;
  image: string;
  tokenPrice: number;
  priceChange: number;
  totalValue: string;
  availableTokens: number;
  holders: number;
  orders: {
    buy: { price: number; quantity: number }[];
    sell: { price: number; quantity: number }[];
  };
}

const tradableAssets: TradableAsset[] = [
  {
    id: "malibu-estate",
    name: "Malibu Ocean View",
    category: "Real Estate",
    categoryIcon: Building,
    image: propertyMalibu,
    tokenPrice: 524.50,
    priceChange: 2.4,
    totalValue: "€4.2M",
    availableTokens: 1250,
    holders: 89,
    orders: {
      buy: [
        { price: 522.00, quantity: 45 },
        { price: 520.50, quantity: 78 },
        { price: 518.25, quantity: 120 },
      ],
      sell: [
        { price: 526.00, quantity: 32 },
        { price: 528.50, quantity: 65 },
        { price: 530.00, quantity: 88 },
      ],
    },
  },
  {
    id: "villa-tuscany",
    name: "Tuscan Villa Estate",
    category: "Real Estate",
    categoryIcon: Building,
    image: rwaVilla,
    tokenPrice: 892.25,
    priceChange: 1.8,
    totalValue: "€6.8M",
    availableTokens: 890,
    holders: 124,
    orders: {
      buy: [
        { price: 890.00, quantity: 28 },
        { price: 888.50, quantity: 52 },
        { price: 885.00, quantity: 95 },
      ],
      sell: [
        { price: 895.00, quantity: 22 },
        { price: 898.50, quantity: 48 },
        { price: 902.00, quantity: 71 },
      ],
    },
  },
  {
    id: "film-project",
    name: "Horizon Film Rights",
    category: "Film & Entertainment",
    categoryIcon: Film,
    image: rwaFilm,
    tokenPrice: 156.80,
    priceChange: 5.2,
    totalValue: "€2.1M",
    availableTokens: 2400,
    holders: 312,
    orders: {
      buy: [
        { price: 155.00, quantity: 180 },
        { price: 153.50, quantity: 245 },
        { price: 150.00, quantity: 420 },
      ],
      sell: [
        { price: 158.50, quantity: 95 },
        { price: 160.00, quantity: 165 },
        { price: 162.50, quantity: 280 },
      ],
    },
  },
  {
    id: "commercial-paris",
    name: "Paris Commercial",
    category: "Commercial",
    categoryIcon: Briefcase,
    image: rwaCommercial,
    tokenPrice: 1025.00,
    priceChange: 0.9,
    totalValue: "€8.5M",
    availableTokens: 650,
    holders: 78,
    orders: {
      buy: [
        { price: 1022.50, quantity: 15 },
        { price: 1020.00, quantity: 32 },
        { price: 1015.00, quantity: 58 },
      ],
      sell: [
        { price: 1028.00, quantity: 12 },
        { price: 1032.50, quantity: 28 },
        { price: 1040.00, quantity: 45 },
      ],
    },
  },
];

// Asset Card Component with Order Book
const AssetCard = ({ 
  asset, 
  isActive, 
  onSelect,
  index,
  isInView 
}: { 
  asset: TradableAsset; 
  isActive: boolean;
  onSelect: () => void;
  index: number;
  isInView: boolean;
}) => {
  const Icon = asset.categoryIcon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
      onClick={onSelect}
      className={`group relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 ${
        isActive 
          ? 'ring-2 ring-slate-900 shadow-2xl shadow-slate-900/20' 
          : 'hover:shadow-xl hover:shadow-slate-200'
      }`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={asset.image} 
          alt={asset.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isActive ? 'scale-105' : 'group-hover:scale-105'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full">
          <Icon className="w-3.5 h-3.5 text-slate-700" />
          <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-700">
            {asset.category}
          </span>
        </div>
        
        {/* Price Change Badge */}
        <div className={`absolute top-4 right-4 px-2.5 py-1 rounded-full flex items-center gap-1 ${
          asset.priceChange >= 0 ? 'bg-emerald-500/90' : 'bg-rose-500/90'
        }`}>
          <TrendingUp className={`w-3 h-3 text-white ${asset.priceChange < 0 ? 'rotate-180' : ''}`} />
          <span className="text-[10px] font-bold text-white">
            {asset.priceChange >= 0 ? '+' : ''}{asset.priceChange}%
          </span>
        </div>
        
        {/* Asset Name */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-lg font-semibold text-white mb-1">{asset.name}</h3>
          <div className="flex items-center gap-3 text-white/70 text-xs">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {asset.holders} holders
            </span>
            <span>{asset.totalValue}</span>
          </div>
        </div>
      </div>
      
      {/* Trading Info */}
      <div className="p-5 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Token Price</span>
            <div className="text-2xl font-bold text-slate-900">€{asset.tokenPrice.toFixed(2)}</div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Available</span>
            <div className="text-lg font-semibold text-slate-700">{asset.availableTokens.toLocaleString()}</div>
          </div>
        </div>
        
        {/* Mini Order Book Preview */}
        <div className="grid grid-cols-2 gap-3">
          {/* Buy Orders */}
          <div className="bg-slate-50 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700">Buy Orders</span>
            </div>
            <div className="space-y-1.5">
              {asset.orders.buy.slice(0, 2).map((order, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span className="font-mono text-emerald-600">€{order.price.toFixed(2)}</span>
                  <span className="text-slate-500">{order.quantity}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Sell Orders */}
          <div className="bg-slate-50 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <ArrowDownLeft className="w-3.5 h-3.5 text-violet-600" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-700">Sell Orders</span>
            </div>
            <div className="space-y-1.5">
              {asset.orders.sell.slice(0, 2).map((order, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span className="font-mono text-violet-600">€{order.price.toFixed(2)}</span>
                  <span className="text-slate-500">{order.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Active indicator */}
      {isActive && (
        <motion.div 
          layoutId="activeAssetIndicator"
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-800 via-indigo-600 to-violet-600"
        />
      )}
    </motion.div>
  );
};

// Detailed Order Book Panel
const OrderBookPanel = ({ asset, isInView }: { asset: TradableAsset; isInView: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 30 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/50"
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden">
              <img src={asset.image} alt={asset.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">{asset.name}</h3>
              <span className="text-sm text-slate-500">{asset.category}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-slate-500">Live</span>
          </div>
        </div>
        
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-slate-50 rounded-xl">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Token Price</span>
            <span className="text-lg font-bold text-slate-900">€{asset.tokenPrice.toFixed(2)}</span>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-xl">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">24h Change</span>
            <span className={`text-lg font-bold ${asset.priceChange >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              {asset.priceChange >= 0 ? '+' : ''}{asset.priceChange}%
            </span>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-xl">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Total Value</span>
            <span className="text-lg font-bold text-slate-900">{asset.totalValue}</span>
          </div>
        </div>
      </div>
      
      {/* Order Book */}
      <div className="grid grid-cols-2 divide-x divide-slate-100">
        {/* Buy Side */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <span className="text-sm font-semibold text-slate-900 block">Buy Orders</span>
              <span className="text-[10px] text-slate-400">Bids</span>
            </div>
          </div>
          
          <div className="space-y-2">
            {asset.orders.buy.map((order, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="relative overflow-hidden rounded-lg"
              >
                <div 
                  className="absolute inset-y-0 left-0 bg-emerald-100/50"
                  style={{ width: `${(order.quantity / 150) * 100}%` }}
                />
                <div className="relative flex justify-between p-2.5 text-sm">
                  <span className="font-mono font-medium text-emerald-700">€{order.price.toFixed(2)}</span>
                  <span className="text-slate-600">{order.quantity} tokens</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Sell Side */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
              <ArrowDownLeft className="w-4 h-4 text-violet-600" />
            </div>
            <div>
              <span className="text-sm font-semibold text-slate-900 block">Sell Orders</span>
              <span className="text-[10px] text-slate-400">Asks</span>
            </div>
          </div>
          
          <div className="space-y-2">
            {asset.orders.sell.map((order, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="relative overflow-hidden rounded-lg"
              >
                <div 
                  className="absolute inset-y-0 right-0 bg-violet-100/50"
                  style={{ width: `${(order.quantity / 150) * 100}%` }}
                />
                <div className="relative flex justify-between p-2.5 text-sm">
                  <span className="font-mono font-medium text-violet-700">€{order.price.toFixed(2)}</span>
                  <span className="text-slate-600">{order.quantity} tokens</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Trading Actions */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="grid grid-cols-2 gap-3">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-6 font-semibold">
            <ArrowUpRight className="w-4 h-4 mr-2" />
            Buy Tokens
          </Button>
          <Button variant="outline" className="border-violet-200 text-violet-700 hover:bg-violet-50 rounded-xl py-6 font-semibold">
            <ArrowDownLeft className="w-4 h-4 mr-2" />
            Sell Tokens
          </Button>
        </div>
        
        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          <span>Settlement: T+0 • 24/7 Trading</span>
        </div>
      </div>
    </motion.div>
  );
};

export const Marketplace = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedAsset, setSelectedAsset] = useState(0);

  const features = [
    { icon: Clock, title: "24/7 Trading", desc: "Trade anytime, anywhere" },
    { icon: Users, title: "Peer-to-Peer", desc: "Direct investor matching" },
    { icon: TrendingUp, title: "Real-Time", desc: "Live price discovery" },
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-[#fafafa]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-slate-200/40 rounded-full blur-3xl" />
      </div>
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(90deg, #1e293b 1px, transparent 1px), linear-gradient(180deg, #1e293b 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Editorial Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-6 mb-8"
          >
            <span className="text-[11px] tracking-[0.4em] uppercase text-slate-400 font-medium">
              Secondary Market
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-slate-300 to-transparent" />
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-slate-900 leading-[0.95] tracking-tight mb-4">
                Trade Real
                <span className="block font-serif italic text-slate-500">World Assets</span>
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed max-w-lg font-light">
                Buy and sell tokenized assets directly with other investors. 
                Real-time order matching, instant settlement.
              </p>
            </motion.div>
            
            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex flex-wrap gap-3 lg:justify-end"
            >
              {features.map((feature, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-3 px-4 py-2.5 bg-white rounded-full border border-slate-200 shadow-sm"
                >
                  <feature.icon className="w-4 h-4 text-slate-600" />
                  <div>
                    <span className="text-sm font-medium text-slate-900">{feature.title}</span>
                    <span className="text-xs text-slate-400 ml-2">{feature.desc}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {/* Asset Cards Grid */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
            {tradableAssets.map((asset, index) => (
              <AssetCard
                key={asset.id}
                asset={asset}
                isActive={selectedAsset === index}
                onSelect={() => setSelectedAsset(index)}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
          
          {/* Order Book Panel */}
          <div className="lg:col-span-1">
            <OrderBookPanel 
              asset={tradableAssets[selectedAsset]} 
              isInView={isInView}
            />
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center"
        >
          <Button 
            size="lg" 
            className="bg-slate-900 hover:bg-slate-800 text-white px-10 py-7 text-base rounded-full shadow-xl shadow-slate-900/20"
            onClick={() => window.location.href = '/marketplace'}
          >
            Explore Marketplace
            <ArrowUpRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
        
        {/* Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-24 pt-16 border-t border-slate-200"
        >
          <p className="text-center text-sm text-slate-400 uppercase tracking-widest mb-12">
            Trusted Partners & Infrastructure
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 md:gap-6 lg:gap-8">
            {[
              { name: "Woud Law Firm", logo: woudLawLogo },
              { name: "House of Web3", logo: houseOfWeb3Logo, logoClassName: "invert opacity-50 group-hover:opacity-80" },
              { name: "Swissquote", logo: swissquoteLogo },
              { name: "Bank Frick", logo: bankFrickLogo },
              { name: "Realiz", logo: realizLogo },
              { name: "Ledgity Yield", logo: ledgityLogo },
              { name: "DFNS", logo: dfnsLogo },
            ].map((partner, i) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
                transition={{ duration: 0.4, delay: 0.9 + i * 0.08 }}
                className="group"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="cursor-pointer">
                      <div className="flex items-center justify-center rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 px-6 py-4">
                        <div className="h-10 md:h-12 lg:h-14 flex items-center justify-center">
                          <img
                            src={partner.logo}
                            alt={`${partner.name} logo`}
                            loading="lazy"
                            decoding="async"
                            className={`h-full w-auto object-contain max-w-[170px] opacity-50 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 ${partner.logoClassName ?? ""}`}
                          />
                        </div>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="bg-slate-900 border-slate-700 px-3 py-2"
                  >
                    <span className="text-xs font-medium text-white">{partner.name}</span>
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
