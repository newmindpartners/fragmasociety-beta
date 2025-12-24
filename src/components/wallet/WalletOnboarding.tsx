import { motion } from "framer-motion";
import { Wallet, Plus, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WalletOnboardingProps {
  onCreateWallet: () => void;
}

export const WalletOnboarding = ({ onCreateWallet }: WalletOnboardingProps) => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-indigo-50/50 to-cyan-50/30 dark:from-blue-950/20 dark:via-indigo-950/10 dark:to-cyan-950/5" />
      
      {/* Decorative circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center text-center max-w-lg px-6"
      >
        {/* Wallet Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
            <Wallet className="w-12 h-12 text-primary-foreground" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-4xl md:text-5xl font-serif font-semibold text-primary mb-4"
        >
          Create your wallet
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-muted-foreground text-lg mb-10 leading-relaxed"
        >
          Choose how you want to store your wallet: securely with Fragma –
          no setup or recovery phrase needed.
        </motion.p>

        {/* Create Wallet Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-full max-w-md"
        >
          <button
            onClick={onCreateWallet}
            className="w-full bg-card border border-border rounded-2xl p-5 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Plus className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">Create with</span>
                  <span className="font-bold text-primary">FRAGMA</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Your wallet will be stored securely with our
                  partner Fragma
                </p>
              </div>
            </div>
          </button>
        </motion.div>

        {/* Footer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-16 text-sm text-muted-foreground flex items-center gap-2"
        >
          <Shield className="w-4 h-4" />
          Safe. Reliable. Designed for your peace of mind
        </motion.p>
      </motion.div>
    </div>
  );
};
