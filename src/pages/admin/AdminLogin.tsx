import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { SignIn, useUser } from "@clerk/clerk-react";
import { Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import fragmaLogo from "@/assets/fragma-logo-v2.png";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const { isAdmin } = useAuth();

  // Redirect to admin dashboard if already authenticated as admin
  useEffect(() => {
    if (isLoaded && user && isAdmin) {
      navigate('/admin');
    }
  }, [user, isLoaded, isAdmin, navigate]);

  // If authenticated but not admin, show access denied
  if (isLoaded && user && !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-white mb-3">
            Admin Access Required
          </h1>
          <p className="text-slate-400 mb-6">
            Your account does not have admin privileges. 
            Please sign in with an admin account or contact support.
          </p>
          <div className="flex gap-3 justify-center">
            <a 
              href="/" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-800/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src={fragmaLogo} 
            alt="Fragma" 
            className="h-10 mx-auto mb-4"
          />
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-violet-400" />
            <span className="text-sm font-bold text-violet-400 uppercase tracking-wider">
              Admin Portal
            </span>
          </div>
          <p className="text-slate-400 text-sm">
            Sign in with your admin account
          </p>
        </div>

        {/* Clerk SignIn Component */}
        <div className="flex justify-center">
          <SignIn 
            routing="hash"
            fallbackRedirectUrl="/admin"
            forceRedirectUrl="/admin"
            appearance={{
              layout: {
                socialButtonsVariant: "iconButton",
                socialButtonsPlacement: "top",
                logoPlacement: "none",
              },
              variables: {
                colorPrimary: "#8B5CF6",
                colorBackground: "rgb(30 41 59 / 0.5)",
                colorText: "#e2e8f0",
                colorTextSecondary: "#94a3b8",
                colorInputBackground: "rgb(15 23 42 / 0.5)",
                colorInputText: "#ffffff",
              },
              elements: {
                rootBox: "w-full",
                card: "bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 shadow-2xl",
                headerTitle: "text-white",
                headerSubtitle: "text-slate-400",
                socialButtonsIconButton: "border-slate-600 hover:bg-slate-700",
                dividerLine: "bg-slate-600",
                dividerText: "text-slate-500",
                formFieldLabel: "text-slate-300",
                formFieldInput: "bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500",
                formButtonPrimary: "bg-violet-600 hover:bg-violet-500",
                footerActionLink: "text-violet-400 hover:text-violet-300",
                identityPreviewEditButton: "text-violet-400",
              }
            }}
          />
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <a 
            href="/" 
            className="text-sm text-slate-400 hover:text-violet-400 transition-colors"
          >
            ← Back to main site
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
