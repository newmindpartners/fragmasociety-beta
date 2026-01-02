import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const API_URL = import.meta.env.VITE_API_URL || '';

interface UserDocument {
  id: string;
  userId: string;
  fileName: string;
  fileUrl: string;
  fileSize: number | null;
  fileType: string | null;
  category: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const useUserDocuments = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);

  const { data: documents, isLoading, error } = useQuery({
    queryKey: ["user-documents", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const response = await fetch(
        `${API_URL}/api/users/me/documents?clerkUserId=${user.id}`
      );

      if (!response.ok) {
        if (response.status === 404) return [];
        throw new Error('Failed to fetch documents');
      }

      const data = await response.json();
      return (data.documents || []) as UserDocument[];
    },
    enabled: !!user?.id,
  });

  const uploadDocument = async (file: File, category: string = "other") => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to upload documents",
        variant: "destructive",
      });
      return null;
    }

    setUploading(true);

    try {
      // Create form data for file upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', category);
      formData.append('clerkUserId', user.id);

      const response = await fetch(`${API_URL}/api/users/me/documents`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload document');

      const data = await response.json();

      toast({
        title: "Success",
        description: "Document uploaded successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["user-documents", user.id] });
      return data.document;
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload document",
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const deleteDocument = useMutation({
    mutationFn: async (document: UserDocument) => {
      if (!user?.id) throw new Error("Not authenticated");

      const response = await fetch(
        `${API_URL}/api/users/me/documents/${document.id}?clerkUserId=${user.id}`,
        { method: 'DELETE' }
      );

      if (!response.ok) throw new Error('Failed to delete document');
    },
    onSuccess: () => {
      toast({
        title: "Document Deleted",
        description: "The document has been removed",
      });
      queryClient.invalidateQueries({ queryKey: ["user-documents", user?.id] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete document",
        variant: "destructive",
      });
    },
  });

  const downloadDocument = async (document: UserDocument) => {
    if (!user?.id || !document.fileUrl) return;

    try {
      // Open file URL in new tab or trigger download
      window.open(document.fileUrl, '_blank');
    } catch (error: any) {
      toast({
        title: "Download Failed",
        description: error.message || "Failed to download document",
        variant: "destructive",
      });
    }
  };

  return {
    documents: documents || [],
    isLoading,
    error,
    uploading,
    uploadDocument,
    deleteDocument: deleteDocument.mutate,
    downloadDocument,
  };
};
