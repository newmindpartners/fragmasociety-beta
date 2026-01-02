import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Upload, Image, Check, Loader2 } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || '';

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
      // Create form data for file upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('dealId', dealId);

      const response = await fetch(`${API_URL}/api/admin/deals/${dealId}/image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      const publicUrl = data.imageUrl;

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
        <div className="relative">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <Button 
            variant="outline" 
            disabled={uploading}
            className="pointer-events-none"
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Banner Image
              </>
            )}
          </Button>
        </div>
        
        {previewUrl && (
          <span className="flex items-center text-sm text-green-600">
            <Check className="mr-1 h-4 w-4" />
            Image uploaded
          </span>
        )}
      </div>

      {previewUrl && (
        <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden border">
          <img 
            src={previewUrl} 
            alt="Banner preview" 
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Recommended: 1920x1080px, max 5MB, JPG or PNG
      </p>
    </div>
  );
};
