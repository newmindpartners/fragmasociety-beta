import { Image, Video, Plus, X } from "lucide-react";

interface MediaTabProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export const MediaTab = ({ formData, updateFormData }: MediaTabProps) => {
  const addAssetImage = () => {
    updateFormData({ 
      assetImages: [...(formData.assetImages || []), ''] 
    });
  };

  const updateAssetImage = (index: number, value: string) => {
    const newImages = [...(formData.assetImages || [])];
    newImages[index] = value;
    updateFormData({ assetImages: newImages });
  };

  const removeAssetImage = (index: number) => {
    const newImages = formData.assetImages.filter((_: string, i: number) => i !== index);
    updateFormData({ assetImages: newImages });
  };

  return (
    <div className="space-y-6">
      {/* Banner & Hero */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Banner & Hero</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Banner Image URL</label>
            <input
              type="url"
              value={formData.bannerImage}
              onChange={(e) => updateFormData({ bannerImage: e.target.value })}
              className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="https://..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              Recommended: Transparent PNG cutout for hero section
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Hero Video URL</label>
            <input
              type="url"
              value={formData.heroVideoUrl}
              onChange={(e) => updateFormData({ heroVideoUrl: e.target.value })}
              className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="https://videos.pexels.com/..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              Background video for the deal hero section
            </p>
          </div>
        </div>
      </div>

      {/* Videos */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Videos</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Pitch Video URL</label>
            <input
              type="url"
              value={formData.pitchVideoUrl}
              onChange={(e) => updateFormData({ pitchVideoUrl: e.target.value })}
              className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="Leader pitch video..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Asset Video URL</label>
            <input
              type="url"
              value={formData.assetVideoUrl}
              onChange={(e) => updateFormData({ assetVideoUrl: e.target.value })}
              className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="Asset showcase video..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Team Video URL</label>
            <input
              type="url"
              value={formData.teamVideoUrl}
              onChange={(e) => updateFormData({ teamVideoUrl: e.target.value })}
              className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="Team introduction video..."
            />
          </div>
        </div>
      </div>

      {/* Asset Images */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Asset Images</h3>
          <button
            type="button"
            onClick={addAssetImage}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Image
          </button>
        </div>
        
        {formData.assetImages?.length > 0 ? (
          <div className="space-y-3">
            {formData.assetImages.map((url: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => updateAssetImage(index, e.target.value)}
                  className="flex-1 px-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                  placeholder={`Image ${index + 1} URL...`}
                />
                <button
                  type="button"
                  onClick={() => removeAssetImage(index)}
                  className="p-2 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center bg-muted/30 rounded-lg border border-dashed border-border">
            <Image className="w-10 h-10 mx-auto mb-3 text-muted-foreground/50" />
            <p className="text-muted-foreground">No asset images added</p>
          </div>
        )}
      </div>
    </div>
  );
};
