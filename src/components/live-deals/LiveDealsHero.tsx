import { Sparkles } from "lucide-react";

export const LiveDealsHero = () => {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-slate-950">
      {/* Solid dark background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />

      {/* Content */}
      <div className="container relative z-10 px-6 lg:px-12">
        {/* Icon + Label */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-violet-400" />
          </div>
          <span className="text-sm tracking-[0.2em] uppercase text-violet-400 font-medium">
            Live Opportunities
          </span>
        </div>

        {/* Main headline - left aligned */}
        <h1 
          className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-6"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Signature{" "}
          <span className="italic text-violet-300">Deals</span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-slate-400 font-light max-w-2xl leading-relaxed mb-16">
          Curated investment opportunities in real assets, designed for modern investors.
        </p>

        {/* Stats cards - matching market analysis style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="relative rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 p-6">
            <div className="flex items-start justify-between mb-4">
              <p className="text-[10px] uppercase tracking-[0.15em] text-slate-400">
                Live Deals
              </p>
              <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-slate-400" />
              </div>
            </div>
            <p className="text-3xl md:text-4xl font-light text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              4
            </p>
            <p className="text-xs text-slate-500">Active opportunities</p>
          </div>

          <div className="relative rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 p-6">
            <div className="flex items-start justify-between mb-4">
              <p className="text-[10px] uppercase tracking-[0.15em] text-slate-400">
                Min Entry
              </p>
              <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
                <span className="text-slate-400 text-sm font-medium">€</span>
              </div>
            </div>
            <p className="text-3xl md:text-4xl font-light text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              €250
            </p>
            <p className="text-xs text-slate-500">Accessible investing</p>
          </div>

          <div className="relative rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 p-6">
            <div className="flex items-start justify-between mb-4">
              <p className="text-[10px] uppercase tracking-[0.15em] text-slate-400">
                Target Returns
              </p>
              <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
                <span className="text-slate-400 text-sm">%</span>
              </div>
            </div>
            <p className="text-3xl md:text-4xl font-light text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              8-18%
            </p>
            <p className="text-xs text-slate-500">Annual yield target</p>
          </div>

          <div className="relative rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 p-6">
            <div className="flex items-start justify-between mb-4">
              <p className="text-[10px] uppercase tracking-[0.15em] text-slate-400">
                Asset Classes
              </p>
              <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
                <span className="text-slate-400 text-sm">◆</span>
              </div>
            </div>
            <p className="text-3xl md:text-4xl font-light text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              4
            </p>
            <p className="text-xs text-slate-500">Diversified sectors</p>
          </div>
        </div>
      </div>
    </section>
  );
};
