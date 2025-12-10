import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FundPartners = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
            Work with Fragma as your tokenised yield & growth partner.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Strategic Allocators */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-xl p-8"
          >
            <h3 className="text-xl font-serif font-bold text-foreground mb-4">Strategic Allocators</h3>
            <p className="text-muted-foreground mb-6">
              Fragma Fund can serve as a core or satellite allocation within existing alternative, private credit or digital infrastructure buckets. We work with CIOs and portfolio managers to tailor reporting, risk analytics and co-investment opportunities.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="text-sm text-muted-foreground flex gap-2">
                <span className="text-primary">•</span>
                Co-investment SPVs for larger tickets or specific strategies.
              </li>
              <li className="text-sm text-muted-foreground flex gap-2">
                <span className="text-primary">•</span>
                Access to Fragma's broader RWA/tokenisation pipeline and marketplace.
              </li>
            </ul>
            <Button className="group">
              Arrange CIO/IC briefing
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Distribution Partners */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-xl p-8"
          >
            <h3 className="text-xl font-serif font-bold text-foreground mb-4">Distribution Partners</h3>
            <p className="text-muted-foreground mb-6">
              Banks, wealth platforms and multi-family offices can integrate Fragma Fund into their offering, or combine it with our tokenisation rails and white-label modules to launch their own branded RWA strategies.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="text-sm text-muted-foreground flex gap-2">
                <span className="text-primary">•</span>
                White-label documentation and marketing support.
              </li>
              <li className="text-sm text-muted-foreground flex gap-2">
                <span className="text-primary">•</span>
                API and operational integration with Fragma Finance infrastructure.
              </li>
            </ul>
            <Button variant="outline" className="group">
              Discuss partnership
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
