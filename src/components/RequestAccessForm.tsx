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
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/98 via-slate-900/95 to-slate-950/98" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      
      {/* Subtle glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-14"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium tracking-wider uppercase mb-6"
            >
              Exclusive Access
            </motion.span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-5">
              Register your interest
            </h2>
            <p className="text-lg text-white/50 font-light">
              Join our exclusive investor community
            </p>
          </motion.div>

          {/* Form Card */}
          {!isSubmitted ? (
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="relative bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 md:p-10 space-y-7"
            >
              {/* Glass reflection effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.05] via-transparent to-transparent pointer-events-none" />
              
              {/* Email */}
              <div className="relative space-y-2.5">
                <Label htmlFor="email" className="text-white/70 text-sm font-medium tracking-wide">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/25 h-13 rounded-xl focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20 transition-all duration-300"
                  required
                />
              </div>

              {/* Country */}
              <div className="relative space-y-2.5">
                <Label className="text-white/70 text-sm font-medium tracking-wide">
                  Country / Residency
                </Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger className="bg-white/[0.03] border-white/[0.08] text-white h-13 rounded-xl focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20 transition-all duration-300 [&>span]:text-white/50 [&[data-state=open]>span]:text-white">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900/95 backdrop-blur-xl border-white/10 rounded-xl">
                    {countries.map((c) => (
                      <SelectItem 
                        key={c} 
                        value={c}
                        className="text-white/80 hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg cursor-pointer"
                      >
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Investor Type */}
              <div className="relative space-y-2.5">
                <Label className="text-white/70 text-sm font-medium tracking-wide">
                  Investor Type
                </Label>
                <Select value={investorType} onValueChange={setInvestorType}>
                  <SelectTrigger className="bg-white/[0.03] border-white/[0.08] text-white h-13 rounded-xl focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20 transition-all duration-300 [&>span]:text-white/50 [&[data-state=open]>span]:text-white">
                    <SelectValue placeholder="Select investor type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900/95 backdrop-blur-xl border-white/10 rounded-xl">
                    <SelectItem value="retail" className="text-white/80 hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg cursor-pointer">
                      Retail Investor
                    </SelectItem>
                    <SelectItem value="professional" className="text-white/80 hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg cursor-pointer">
                      Professional Investor
                    </SelectItem>
                    <SelectItem value="accredited" className="text-white/80 hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg cursor-pointer">
                      Accredited Investor
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Interests */}
              <div className="relative space-y-4">
                <Label className="text-white/70 text-sm font-medium tracking-wide">
                  Areas of Interest
                </Label>
                <div className="flex flex-wrap gap-2.5">
                  {interests.map((interest) => {
                    const isSelected = selectedInterests.includes(interest.id);
                    return (
                      <motion.button
                        key={interest.id}
                        type="button"
                        onClick={() => toggleInterest(interest.id)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`relative px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                          isSelected
                            ? "bg-amber-500/15 border-amber-500/40 text-amber-300"
                            : "bg-white/[0.02] border-white/[0.08] text-white/60 hover:border-white/20 hover:text-white/80"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {isSelected && (
                            <motion.span
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                            >
                              <Check className="w-3.5 h-3.5" />
                            </motion.span>
                          )}
                          {interest.label}
                        </span>
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
                className="pt-3"
              >
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 rounded-full h-14 text-base font-semibold shadow-lg shadow-amber-500/20 disabled:opacity-50 transition-all duration-300"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-slate-950/20 border-t-slate-950 rounded-full"
                      />
                      Processing...
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
              <p className="text-center text-xs text-white/30 pt-1">
                Capital at risk. Access depends on eligibility and jurisdiction.
              </p>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10 }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/30 flex items-center justify-center mx-auto mb-6"
              >
                <Check className="w-10 h-10 text-amber-400" />
              </motion.div>
              <h3 className="font-serif text-2xl font-medium text-white mb-3">
                Thank you for registering
              </h3>
              <p className="text-white/50 font-light">
                We'll review your application and be in touch soon.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
