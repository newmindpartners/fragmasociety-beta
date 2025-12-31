import { SignUp, useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { useEffect } from "react";

interface AuthStepProps {
  email: string;
  onNext: () => void;
}

export function AuthStep({ email, onNext }: AuthStepProps) {
  const { user, isLoaded } = useUser();

  // If user is already signed in or just finished signing up, move to next step
  useEffect(() => {
    if (isLoaded && user) {
      onNext();
    }
  }, [user, isLoaded, onNext]);

  return (
    <div className="space-y-6 flex flex-col items-center">
      <div className="text-center mb-4">
        <h2 className="text-2xl md:text-3xl font-light text-white mb-2">
          Create your account
        </h2>
        <p className="text-white/60">
          Almost there! Sign up to join the exclusive investor list.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex justify-center"
      >
        <SignUp 
          routing="hash"
          signInUrl="/auth"
          fallbackRedirectUrl="/"
          forceRedirectUrl="/"
          initialValues={{ emailAddress: email }}
          appearance={{
            layout: {
              socialButtonsVariant: "iconButton",
              socialButtonsPlacement: "top",
              logoPlacement: "none",
            },
            elements: {
              rootBox: "mx-auto",
              card: "bg-slate-900 border border-white/10 shadow-none",
              headerTitle: "text-white",
              headerSubtitle: "text-white/60",
              socialButtonsBlockButton: "bg-white/5 border-white/10 text-white hover:bg-white/10 h-14 text-lg flex",
              socialButtonsBlockButton__linkedin: { order: -3 },
              socialButtonsBlockButton__google: { order: -2 },
              socialButtonsBlockButton__discord: { order: -1 },
              socialButtonsIconButton: "h-20 w-20 bg-white/5 border-white/10 text-white hover:bg-white/10",
              socialButtonsIconButton__linkedin: { order: -3 },
              socialButtonsIconButton__google: { order: -2 },
              socialButtonsIconButton__discord: { order: -1 },
              socialButtonsIconButton__logo: "h-10 w-10",
              socialButtonsBlockButton__logo: "h-6 w-6",
              dividerLine: "bg-white/10",
              dividerText: "text-white/40",
              formFieldLabel: "text-white/80",
              formFieldInput: "bg-white/5 border-white/10 text-white",
              formButtonPrimary: "bg-white text-slate-900 hover:bg-white/90",
              footerActionText: "text-white/60",
              footerActionLink: "text-violet-400 hover:text-violet-300",
              identityPreviewText: "text-white",
              identityPreviewEditButtonIcon: "text-white/60"
            }
          }}
        />
      </motion.div>
    </div>
  );
}
