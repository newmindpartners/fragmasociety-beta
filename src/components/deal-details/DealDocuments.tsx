import { motion } from "framer-motion";
import { FileText, Lock, Shield, FolderOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const documents = [
  {
    name: "Term Sheet",
    description: "Key terms and conditions",
    type: "PDF",
  },
  {
    name: "Subscription Agreement",
    description: "Legal investment agreement",
    type: "PDF",
  },
  {
    name: "Risk Disclosure",
    description: "Risk factors and disclaimers",
    type: "PDF",
  },
  {
    name: "Private Placement Memorandum",
    description: "Detailed offering documentation",
    type: "PDF",
  },
  {
    name: "Financial Projections",
    description: "Projected performance",
    type: "PDF",
  },
  {
    name: "Legal Structure Overview",
    description: "SPV and tokenization details",
    type: "PDF",
  },
];

export const DealDocuments = () => {
  const handleRequestDocuments = () => {
    window.location.href = "mailto:ir@fragma.io?subject=Document%20Request&body=I%20would%20like%20to%20request%20access%20to%20the%20deal%20documents.";
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Split Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Header & CTA */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="sticky top-32"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                  <FolderOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs tracking-[0.3em] uppercase text-slate-500 font-semibold">
                  Due Diligence
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-light text-slate-900 leading-[1.1] mb-4">
                Investor <span className="italic font-serif text-slate-600">Documents</span>
              </h2>

              <p className="text-slate-500 mb-8 leading-relaxed">
                Access comprehensive documentation including term sheets, legal agreements, and financial projections.
              </p>

              {/* Request CTA Card */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 relative overflow-hidden">
                {/* Decorative */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl" />
                
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                    <Lock className="w-5 h-5 text-white/70" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    Request Access
                  </h3>
                  <p className="text-sm text-slate-400 mb-5">
                    Documents are available to verified investors upon request.
                  </p>
                  <Button
                    onClick={handleRequestDocuments}
                    className="w-full bg-white text-slate-900 hover:bg-slate-100 rounded-xl h-11 font-medium shadow-lg"
                  >
                    Request Documents
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>

              {/* Compliance Note */}
              <div className="flex items-start gap-3 mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <Shield className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-slate-500 leading-relaxed">
                  Documents provided under private placement exemptions. Distribution restricted to eligible investors.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: Documents List with Fade */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Documents Grid */}
              <div className="space-y-3">
                {documents.map((doc, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group bg-slate-50 border border-slate-100 rounded-xl p-4 transition-all hover:bg-slate-100/80"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-slate-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-medium text-slate-900">{doc.name}</h3>
                          <Lock className="w-3 h-3 text-slate-300" />
                        </div>
                        <p className="text-xs text-slate-500">{doc.description}</p>
                      </div>
                      <span className="text-[10px] font-medium text-slate-400 bg-white px-2 py-1 rounded border border-slate-200">
                        {doc.type}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Gradient Fade Overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none" />
              
              {/* Request Button at bottom */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <Button
                  onClick={handleRequestDocuments}
                  variant="outline"
                  className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50 rounded-full px-6 h-10 shadow-lg"
                >
                  <Lock className="w-3.5 h-3.5 mr-2" />
                  Request Documents Here
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
