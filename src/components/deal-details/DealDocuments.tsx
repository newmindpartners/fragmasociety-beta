import { motion } from "framer-motion";
import { FileText, Lock, Download, Eye, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const documents = [
  {
    name: "Term Sheet",
    description: "Key terms and conditions of the investment",
    type: "PDF",
    size: "245 KB",
    available: true,
  },
  {
    name: "Subscription Agreement",
    description: "Legal agreement for investment subscription",
    type: "PDF",
    size: "1.2 MB",
    available: true,
  },
  {
    name: "Risk Disclosure",
    description: "Comprehensive risk factors and disclaimers",
    type: "PDF",
    size: "380 KB",
    available: true,
  },
  {
    name: "Private Placement Memorandum",
    description: "Detailed offering documentation",
    type: "PDF",
    size: "4.8 MB",
    available: true,
  },
  {
    name: "Financial Projections",
    description: "Projected financial performance (not guaranteed)",
    type: "PDF",
    size: "890 KB",
    available: true,
  },
  {
    name: "Legal Structure Overview",
    description: "SPV and tokenization structure details",
    type: "PDF",
    size: "520 KB",
    available: true,
  },
];

export const DealDocuments = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isAuthenticated = !!user;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
            <Lock className="w-4 h-4 text-white" />
            <span className="text-sm text-white font-medium">Investor Documents</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">Due Diligence </span>
            <span className="bg-gradient-to-r from-primary via-[hsl(175,70%,50%)] to-primary bg-clip-text text-transparent">
              Materials
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access comprehensive documentation to make an informed investment decision
          </p>
        </motion.div>

        {/* Auth Gate */}
        {!isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-white/70" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Sign In to Access Documents
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                For regulatory compliance, you must be signed in and verified to access full deal documentation.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => navigate("/auth")}
                  className="bg-white text-background hover:bg-white/90"
                >
                  Sign In
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/auth")}
                  className="border-white/30 text-white hover:bg-white hover:text-background"
                >
                  Create Account
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Documents Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4">
            {documents.map((doc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`bg-white/5 border border-white/10 rounded-xl p-5 transition-all ${
                  isAuthenticated ? 'hover:border-white/20 cursor-pointer' : 'opacity-60'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-white/70" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-foreground truncate">{doc.name}</h3>
                      {isAuthenticated ? (
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      ) : (
                        <Lock className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{doc.description}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground/70">
                      <span>{doc.type}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                    </div>
                  </div>
                  {isAuthenticated && (
                    <div className="flex gap-2">
                      <button className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                        <Eye className="w-4 h-4 text-white/70" />
                      </button>
                      <button className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                        <Download className="w-4 h-4 text-white/70" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Compliance Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto mt-12"
        >
          <div className="flex items-start gap-3 text-xs text-muted-foreground">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Documents are provided for informational purposes as part of private placement under applicable exemptions. 
              Distribution is restricted to eligible investors in permitted jurisdictions. 
              By accessing these documents, you confirm your eligibility and agree to maintain confidentiality.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
