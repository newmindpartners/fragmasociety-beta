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
  },
  {
    name: "Subscription Agreement",
    description: "Legal agreement for investment subscription",
    type: "PDF",
    size: "1.2 MB",
  },
  {
    name: "Risk Disclosure",
    description: "Comprehensive risk factors and disclaimers",
    type: "PDF",
    size: "380 KB",
  },
  {
    name: "Private Placement Memorandum",
    description: "Detailed offering documentation",
    type: "PDF",
    size: "4.8 MB",
  },
  {
    name: "Financial Projections",
    description: "Projected financial performance (not guaranteed)",
    type: "PDF",
    size: "890 KB",
  },
  {
    name: "Legal Structure Overview",
    description: "SPV and tokenization structure details",
    type: "PDF",
    size: "520 KB",
  },
];

export const DealDocuments = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isAuthenticated = !!user;

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-px bg-neutral-300" />
            <span className="text-xs tracking-[0.4em] uppercase text-neutral-400 font-medium">
              Due Diligence
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-light text-neutral-900 leading-[1.1]"
          >
            Investor <span className="italic">Documents</span>
          </motion.h2>
        </div>

        {/* Auth Gate */}
        {!isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mb-16"
          >
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-6">
                <Lock className="w-7 h-7 text-neutral-400" />
              </div>
              <h3 className="text-2xl font-light text-neutral-900 mb-3">
                Sign in to access documents
              </h3>
              <p className="text-neutral-500 mb-8 max-w-md mx-auto">
                For regulatory compliance, you must be signed in and verified to access full deal documentation.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => navigate("/auth")}
                  className="bg-neutral-900 text-white hover:bg-neutral-800 rounded-full px-8 h-12"
                >
                  Sign In
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/auth")}
                  className="border-neutral-300 text-neutral-700 hover:bg-neutral-100 rounded-full px-8 h-12"
                >
                  Create Account
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Documents Grid */}
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
          {documents.map((doc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`bg-neutral-50 border border-neutral-200 rounded-xl p-6 transition-all ${
                isAuthenticated ? 'hover:border-neutral-300 hover:bg-white cursor-pointer' : 'opacity-60'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-neutral-200 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-neutral-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-neutral-900">{doc.name}</h3>
                    {isAuthenticated ? (
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    ) : (
                      <Lock className="w-3 h-3 text-neutral-400 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-neutral-500 mb-2">{doc.description}</p>
                  <div className="flex items-center gap-3 text-xs text-neutral-400">
                    <span>{doc.type}</span>
                    <span>•</span>
                    <span>{doc.size}</span>
                  </div>
                </div>
                {isAuthenticated && (
                  <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-lg bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors">
                      <Eye className="w-4 h-4 text-neutral-500" />
                    </button>
                    <button className="w-10 h-10 rounded-lg bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors">
                      <Download className="w-4 h-4 text-neutral-500" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compliance Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mt-12"
        >
          <div className="flex items-start gap-3 text-sm text-neutral-400">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Documents are provided for informational purposes as part of private placement under applicable exemptions. 
              Distribution is restricted to eligible investors in permitted jurisdictions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};