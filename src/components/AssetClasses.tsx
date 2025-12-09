import { Building2, Clapperboard, Gem, BarChart3, Leaf, Briefcase } from "lucide-react";
const assets = [{
  title: "Prime Real Estate",
  icon: Building2
}, {
  title: "Entertainment",
  icon: Clapperboard
}, {
  title: "Luxury Goods",
  icon: Gem
}, {
  title: "Private Credit",
  icon: BarChart3
}, {
  title: "ESG & Impact",
  icon: Leaf
}, {
  title: "Institutional",
  icon: Briefcase
}];
export const AssetClasses = () => <section className="relative w-full py-20 lg:py-28">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-serif font-bold text-foreground text-center mb-12">Access Member-only asset classes</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {assets.map((asset, i) => <div key={i} className="p-6 bg-card rounded-xl border border-foreground/5 hover:border-primary transition-colors text-center group cursor-pointer">
            <asset.icon className="mx-auto text-muted-foreground group-hover:text-primary mb-3 transition-colors" size={28} />
            <p className="text-foreground font-medium text-sm">{asset.title}</p>
          </div>)}
      </div>
    </div>
  </section>;