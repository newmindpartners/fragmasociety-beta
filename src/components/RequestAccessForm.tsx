import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner";
import { ArrowRight, Check } from "lucide-react";

import ctaBg from "@/assets/signature-deal-cta-bg.jpg";

const interests = [
  { id: "real-estate", label: "Prime Real Estate" },
  { id: "film-music", label: "Film/Music Rights" },
  { id: "btc-mining", label: "BTC Mining" },
  { id: "luxury", label: "Luxury/Collectibles" },
  { id: "sport", label: "Elite Sport" },
];

const countries = [
  "Switzerland", "Luxembourg", "France", "Germany", "United Kingdom", 
  "United States", "Singapore", "Hong Kong", "UAE", "Other"
];

export const RequestAccessForm = () => {
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [investorType, setInvestorType] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !country || !investorType) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Thank you! We'll be in touch soon.");
  };

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={ctaBg} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-950/95" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-violet-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-4">
              Register your interest
            </h2>
            <p className="text-lg text-white/60">
              Join our exclusive investor community
            </p>
          </motion.div>

          {/* Form */}
          {!isSubmitted ? (
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* Email */}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-white/80 text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-14 rounded-xl focus:border-violet-500/50 focus:ring-violet-500/20"
                  required
                />
              </div>

              {/* Country */}
              <div className="space-y-3">
                <Label className="text-white/80 text-sm font-medium">
                  Country / Residency
                </Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white h-14 rounded-xl focus:border-violet-500/50 focus:ring-violet-500/20">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/10">
                    {countries.map((c) => (
                      <SelectItem 
                        key={c} 
                        value={c}
                        className="text-white hover:bg-white/10 focus:bg-white/10"
                      >
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Investor Type */}
              <div className="space-y-3">
                <Label className="text-white/80 text-sm font-medium">
                  Investor Type
                </Label>
                <Select value={investorType} onValueChange={setInvestorType}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white h-14 rounded-xl focus:border-violet-500/50 focus:ring-violet-500/20">
                    <SelectValue placeholder="Select investor type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/10">
                    <SelectItem value="retail" className="text-white hover:bg-white/10 focus:bg-white/10">
                      Retail
                    </SelectItem>
                    <SelectItem value="professional" className="text-white hover:bg-white/10 focus:bg-white/10">
                      Professional
                    </SelectItem>
                    <SelectItem value="accredited" className="text-white hover:bg-white/10 focus:bg-white/10">
                      Accredited
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Interests */}
              <div className="space-y-4">
                <Label className="text-white/80 text-sm font-medium">
                  What stories are you drawn to?
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {interests.map((interest) => {
                    const isSelected = selectedInterests.includes(interest.id);
                    return (
                      <motion.button
                        key={interest.id}
                        type="button"
                        onClick={() => toggleInterest(interest.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border ${
                          isSelected
                            ? "bg-violet-500/20 border-violet-500/50 text-white"
                            : "bg-white/5 border-white/10 text-white/70 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {isSelected && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2"
                          >
                            <Check className="w-3.5 h-3.5 text-violet-400" />
                          </motion.span>
                        )}
                        {interest.label}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="pt-4"
              >
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-white text-slate-900 hover:bg-white/90 rounded-full h-14 text-base font-medium shadow-xl shadow-white/10 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-slate-900/20 border-t-slate-900 rounded-full"
                      />
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Register your interest
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </motion.div>

              {/* Disclaimer */}
              <p className="text-center text-xs text-white/40 pt-2">
                Capital at risk. Access depends on eligibility and jurisdiction.
              </p>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10 }}
                className="w-20 h-20 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center mx-auto mb-6"
              >
                <Check className="w-10 h-10 text-violet-400" />
              </motion.div>
              <h3 className="text-2xl font-medium text-white mb-3">
                Thank you for registering
              </h3>
              <p className="text-white/60">
                We'll review your application and be in touch soon.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
