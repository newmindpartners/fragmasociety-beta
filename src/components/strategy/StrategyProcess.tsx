import { motion } from "framer-motion";
import { MessageCircle, Search, FileText, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const StrategyProcess = () => {
  const steps = [
    {
      icon: MessageCircle,
      number: 1,
      title: "Initial discussion",
      description: "Clarify investor profile and preferred cashflow / tax profile (income-heavy, balanced, growth-oriented)."
    },
    {
      icon: Search,
      number: 2,
      title: "Due diligence",
      description: "Access full PPM, terms and risk factors in the data room; Q&A with the Manager and service providers."
    },
    {
      icon: FileText,
      number: 3,
      title: "Structuring & subscription",
      description: "Agree ticket size and instrument class, complete KYC/AML and subscription documentation."
    },
    {
      icon: BarChart3,
      number: 4,
      title: "Deployment & reporting",
      description: "Capital is deployed according to the Strategy pacing; investors receive NAV reports and distributions as per terms."
    }
  ];

  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
            Allocation in four steps.
          </h2>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-border" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex flex-col items-center lg:items-start">
                  <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mb-4 relative z-10 bg-card">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-center lg:text-left">
                    <span className="text-sm text-primary font-medium">Step {step.number}</span>
                    <h3 className="text-lg font-serif font-bold text-foreground mt-1 mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mt-16"
        >
          <Button size="lg" className="group">
            Request PPM & data room access
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" size="lg">
            Speak with the investment team
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
