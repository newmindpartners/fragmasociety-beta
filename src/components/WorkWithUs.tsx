import { Button } from "@/components/ui/button";
import { Badge } from "@/components/Badge";
import { motion } from "framer-motion";
import { ArrowRight, Star, TrendingUp, Shield } from "lucide-react";
import workWithUsHero from "@/assets/work-with-us-hero.png";

export const WorkWithUs = () => (
  <section className="relative w-full py-24 lg:py-32 bg-gradient-to-b from-background via-card to-background overflow-hidden">
    {/* Background decorative elements */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
    </div>

    <div className="container mx-auto px-6 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <Badge>For Industry Leaders</Badge>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mt-4 leading-tight">
              Your legacy deserves a{" "}
              <span className="text-primary">signature deal.</span>
            </h2>
            <p className="text-lg text-muted-foreground mt-6 leading-relaxed">
              Join an exclusive network of visionaries who are reshaping how premium assets 
              reach global investors. We handle the complexity—structuring, compliance, 
              and technology—so you can focus on what you do best.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">White-Glove Structuring</h4>
                <p className="text-sm text-muted-foreground">
                  Our team will design the best deal with legal and technical support.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Global Investor Access</h4>
                <p className="text-sm text-muted-foreground">
                  Tap into a curated network of qualified investors ready for premium opportunities.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Institutional-Grade Compliance</h4>
                <p className="text-sm text-muted-foreground">
                  Navigate regulations with confidence through our proven legal infrastructure.
                </p>
              </div>
            </div>
          </div>

          <Button size="lg" className="group">
            Launch Your Signature Deal
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* Right Visual */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Main image container */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10">
            <img
              src={workWithUsHero}
              alt="Industry leader with horses"
              className="w-full h-[500px] lg:h-[600px] object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            
            {/* Floating stats card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="absolute bottom-6 left-6 right-6 p-6 bg-card/95 backdrop-blur-sm rounded-xl border border-border/50"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">JM</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">James Mitchell</h4>
                  <p className="text-sm text-muted-foreground">Real Estate Magnate</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic">
                "Tokenizing our portfolio opened doors to investors we never could have reached. 
                The team made it seamless."
              </p>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </div>
  </section>
);
