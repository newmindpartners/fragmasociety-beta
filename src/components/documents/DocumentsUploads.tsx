import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Trash2, Upload, FolderOpen, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserDocuments } from "@/hooks/useUserDocuments";
import { DocumentUploadModal } from "./DocumentUploadModal";
import { format } from "date-fns";

const categoryLabels: Record<string, string> = {
  identification: "Identification",
  tax: "Tax Documents",
  financial: "Financial",
  legal: "Legal",
  other: "Other",
};

export const DocumentsUploads = () => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const { 
    documents, 
    isLoading, 
    uploading, 
    uploadDocument, 
    deleteDocument, 
    downloadDocument 
  } = useUserDocuments();

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "-";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  if (isLoading) {
    return (
      <div className="bg-card rounded-2xl border border-border p-12 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <>
      {/* Upload Button */}
      <div className="mb-6">
        <Button
          onClick={() => setUploadModalOpen(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {documents.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl border border-border p-12"
        >
          <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-6">
              <FolderOpen className="w-7 h-7 text-muted-foreground" />
            </div>
            
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No Uploads Yet
            </h3>
            
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Upload your documents here for easy access and secure storage.
              Supported formats: PDF, DOC, JPG, PNG.
            </p>
            
            <Button 
              onClick={() => setUploadModalOpen(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Your First Document
            </Button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl border border-border overflow-hidden"
        >
          <div className="divide-y divide-border">
            {documents.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-5 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {doc.file_name}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{format(new Date(doc.created_at), "MMM d, yyyy")}</span>
                      <span>•</span>
                      <span>{formatFileSize(doc.file_size)}</span>
                      <span>•</span>
                      <span className="capitalize">
                        {categoryLabels[doc.category || "other"] || doc.category}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                  <button
                    onClick={() => downloadDocument(doc)}
                    className="w-10 h-10 rounded-xl bg-muted hover:bg-primary flex items-center justify-center transition-all duration-200 group"
                  >
                    <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground" />
                  </button>
                  <button
                    onClick={() => deleteDocument(doc)}
                    className="w-10 h-10 rounded-xl bg-muted hover:bg-destructive flex items-center justify-center transition-all duration-200 group"
                  >
                    <Trash2 className="w-4 h-4 text-muted-foreground group-hover:text-destructive-foreground" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <DocumentUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUpload={uploadDocument}
        uploading={uploading}
      />
    </>
  );
};
