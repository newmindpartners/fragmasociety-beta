import { ChevronDown } from "lucide-react";

interface BasicInfoTabProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

const CATEGORIES = [
  'Real Estate',
  'Sports',
  'Art',
  'Entertainment',
  'Private Equity',
  'Infrastructure',
  'Collectibles',
];

const STATUSES = [
  { value: 'DRAFT', label: 'Draft' },
  { value: 'PENDING_APPROVAL', label: 'Pending Approval' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'FUNDED', label: 'Funded' },
  { value: 'CLOSED', label: 'Closed' },
  { value: 'CANCELLED', label: 'Cancelled' },
];

export const BasicInfoTab = ({ formData, updateFormData }: BasicInfoTabProps) => {
  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    updateFormData({ slug });
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Basic Information</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => updateFormData({ title: e.target.value })}
              className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="Prime Beverly Hills & Malibu Portfolio"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Slug</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => updateFormData({ slug: e.target.value })}
                  className="flex-1 px-4 py-2.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-mono text-sm"
                  placeholder="prime-beverly-hills-malibu"
                />
                <button
                  type="button"
                  onClick={generateSlug}
                  className="px-3 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg text-sm"
                >
                  Generate
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                URL: /deal/{formData.slug || 'your-slug'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Status</label>
              <div className="relative">
                <select
                  value={formData.status}
                  onChange={(e) => updateFormData({ status: e.target.value })}
                  className="w-full appearance-none px-4 py-2.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  {STATUSES.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Tagline</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => updateFormData({ tagline: e.target.value })}
              className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="Acquire, renovate, and exit luxury properties in LA's most sought-after neighborhoods"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => updateFormData({ description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
              placeholder="Full deal description..."
            />
          </div>
        </div>
      </div>

      {/* Categorization */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Categorization</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Category *</label>
            <div className="relative">
              <select
                value={formData.category}
                onChange={(e) => updateFormData({ category: e.target.value })}
                className="w-full appearance-none px-4 py-2.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Subcategory</label>
            <input
              type="text"
              value={formData.subcategory}
              onChange={(e) => updateFormData({ subcategory: e.target.value })}
              className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="Luxury Development"
            />
          </div>
        </div>
      </div>

      {/* Deal Leader */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Deal Leader / Sponsor</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Name *</label>
              <input
                type="text"
                value={formData.leaderName}
                onChange={(e) => updateFormData({ leaderName: e.target.value })}
                className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="Philippe Naouri"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Role</label>
              <input
                type="text"
                value={formData.leaderRole}
                onChange={(e) => updateFormData({ leaderRole: e.target.value })}
                className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="Developer & Mid-Century Modern Expert"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Leader Image URL</label>
            <input
              type="url"
              value={formData.leaderImage}
              onChange={(e) => updateFormData({ leaderImage: e.target.value })}
              className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Bio</label>
            <textarea
              value={formData.leaderBio}
              onChange={(e) => updateFormData({ leaderBio: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
              placeholder="Background and expertise..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
