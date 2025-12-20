import { ArrowDown } from "lucide-react";

export const LiveDealsHero = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background with subtle texture */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800/50 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDI5M2EiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0tNiA2aC0ydi00aDJ2NHptMC02aC0ydi00aDJ2NHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
      </div>

      {/* Accent lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-slate-600 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-t from-transparent via-slate-600 to-transparent" />

      {/* Content */}
      <div className="container relative z-10 text-center px-6 py-20">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-8 h-px bg-slate-600" />
          <span className="text-[11px] tracking-[0.35em] uppercase text-slate-500 font-medium">
            Live Opportunities
          </span>
          <div className="w-8 h-px bg-slate-600" />
        </div>

        {/* Main headline */}
        <h1 
          className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-6 tracking-tight"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Signature Deals
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-slate-400 font-light max-w-2xl mx-auto mb-4 leading-relaxed">
          Curated investment opportunities in{" "}
          <span className="text-white">real assets</span>,{" "}
          <span className="text-white">tokenized</span> for modern investors.
        </p>

        {/* Stats row */}
        <div className="flex items-center justify-center gap-8 md:gap-16 mt-12 pt-8 border-t border-slate-800/60">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-light text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>4</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Live Deals</p>
          </div>
          <div className="w-px h-10 bg-slate-800" />
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-light text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>€250</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Min Entry</p>
          </div>
          <div className="w-px h-10 bg-slate-800" />
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-light text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>8-18%</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Target Returns</p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-600">Explore</span>
          <ArrowDown className="w-4 h-4 text-slate-600" />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />
    </section>
  );
};
