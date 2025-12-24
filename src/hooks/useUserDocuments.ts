import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

interface UserDocument {
  id: string;
  user_id: string;
  file_name: string;
  file_url: string;
  file_size: number | null;
  file_type: string | null;
  category: string | null;
  created_at: string;
  updated_at: string;
}

export const useUserDocuments = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);

  const { data: documents, isLoading, error } = useQuery({
    queryKey: ["user-documents", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from("user_documents")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as UserDocument[];
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
      // Upload file to storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("user-documents")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get the file URL
      const { data: urlData } = supabase.storage
        .from("user-documents")
        .getPublicUrl(fileName);

      // Create database record
      const { data, error: dbError } = await supabase
        .from("user_documents")
        .insert({
          user_id: user.id,
          file_name: file.name,
          file_url: urlData.publicUrl,
          file_size: file.size,
          file_type: file.type,
          category,
        })
        .select()
        .single();

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Document uploaded successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["user-documents", user.id] });
      return data;
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

      // Extract file path from URL
      const filePath = `${user.id}/${document.file_url.split("/").pop()}`;

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from("user-documents")
        .remove([filePath]);

      if (storageError) console.error("Storage delete error:", storageError);

      // Delete from database
      const { error: dbError } = await supabase
        .from("user_documents")
        .delete()
        .eq("id", document.id);

      if (dbError) throw dbError;
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
    if (!user?.id) return;

    try {
      const filePath = `${user.id}/${document.file_url.split("/").pop()}`;
      
      const { data, error } = await supabase.storage
        .from("user-documents")
        .download(filePath);

      if (error) throw error;

      // Create download link
      const url = URL.createObjectURL(data);
      const a = window.document.createElement("a");
      a.href = url;
      a.download = document.file_name;
      window.document.body.appendChild(a);
      a.click();
      window.document.body.removeChild(a);
      URL.revokeObjectURL(url);
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
