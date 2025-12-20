import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Upload, Image, Check } from "lucide-react";

interface DealImageUploaderProps {
  dealId: string;
  currentImageUrl?: string;
  onUploadComplete?: (url: string) => void;
}

export const DealImageUploader = ({ 
  dealId, 
  currentImageUrl,
  onUploadComplete 
}: DealImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setUploading(true);

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${dealId}/banner-${Date.now()}.${fileExt}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('deal-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('deal-images')
        .getPublicUrl(fileName);

      // Update deal in database
      const { error: updateError } = await supabase
        .from('deals')
        .update({ banner_image: publicUrl })
        .eq('id', dealId);

      if (updateError) throw updateError;

      setPreviewUrl(publicUrl);
      onUploadComplete?.(publicUrl);
      toast.success("Banner image uploaded successfully!");

    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
          className="max-w-xs"
        />
        <Button disabled={uploading} variant="outline">
          {uploading ? (
            <>
              <Upload className="w-4 h-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Image className="w-4 h-4 mr-2" />
              Upload Banner
            </>
          )}
        </Button>
      </div>

      {previewUrl && (
        <div className="relative">
          <div className="flex items-center gap-2 text-sm text-emerald-600 mb-2">
            <Check className="w-4 h-4" />
            Banner uploaded
          </div>
          <img 
            src={previewUrl} 
            alt="Banner preview" 
            className="max-h-64 rounded-lg border border-border object-contain bg-slate-900"
          />
        </div>
      )}
    </div>
  );
};
