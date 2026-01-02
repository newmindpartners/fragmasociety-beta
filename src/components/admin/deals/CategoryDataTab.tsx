import { Plus, X, Home, Trophy, Palette, TrendingUp, BarChart3 } from "lucide-react";

interface CategoryDataTabProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

export const CategoryDataTab = ({ formData, updateFormData }: CategoryDataTabProps) => {
  const category = formData.category;

  // Track Record
  const trackRecord = formData.trackRecord || [];
  const addTrackRecordItem = () => {
    updateFormData({
      trackRecord: [...trackRecord, { title: '', value: '', subtitle: '' }]
    });
  };
  const updateTrackRecordItem = (index: number, field: string, value: string) => {
    const newItems = [...trackRecord];
    newItems[index] = { ...newItems[index], [field]: value };
    updateFormData({ trackRecord: newItems });
  };
  const removeTrackRecordItem = (index: number) => {
    updateFormData({ trackRecord: trackRecord.filter((_: any, i: number) => i !== index) });
  };

  // Strategies
  const strategies = formData.strategies || [];
  const addStrategy = () => {
    updateFormData({
      strategies: [...strategies, { title: '', description: '' }]
    });
  };
  const updateStrategy = (index: number, field: string, value: string) => {
    const newItems = [...strategies];
    newItems[index] = { ...newItems[index], [field]: value };
    updateFormData({ strategies: newItems });
  };
  const removeStrategy = (index: number) => {
    updateFormData({ strategies: strategies.filter((_: any, i: number) => i !== index) });
  };

  // Current Properties (for Real Estate)
  const currentProperties = formData.currentProperties || [];
  const addProperty = () => {
    updateFormData({
      currentProperties: [...currentProperties, {
        name: '',
        location: '',
        status: 'In Progress',
        acquisitionPrice: '',
        projectedSale: '',
        description: '',
        image: '',
      }]
    });
  };
  const updateProperty = (index: number, field: string, value: string) => {
    const newItems = [...currentProperties];
    newItems[index] = { ...newItems[index], [field]: value };
    updateFormData({ currentProperties: newItems });
  };
  const removeProperty = (index: number) => {
    updateFormData({ currentProperties: currentProperties.filter((_: any, i: number) => i !== index) });
  };

  return (
    <div className="space-y-6">
      {/* Category Header */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-2">
          {category === 'Real Estate' && <Home className="w-5 h-5 text-emerald-600" />}
          {category === 'Sports' && <Trophy className="w-5 h-5 text-blue-600" />}
          {category === 'Art' && <Palette className="w-5 h-5 text-purple-600" />}
          {(category === 'Private Equity' || !category) && <TrendingUp className="w-5 h-5 text-amber-600" />}
          <h3 className="text-lg font-semibold text-foreground">{category || 'Category'} Data</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Add data specific to {category || 'this category'}. These fields help investors understand the opportunity.
        </p>
      </div>

      {/* Total Past Profit */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Performance Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Total Past Profit</label>
            <input
              type="text"
              value={formData.totalPastProfit || ''}
              onChange={(e) => updateFormData({ totalPastProfit: e.target.value })}
              className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="$25M+ in realized profits"
            />
          </div>
        </div>
      </div>

      {/* Track Record */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Track Record</h3>
          <button
            type="button"
            onClick={addTrackRecordItem}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </div>
        
        {trackRecord.length > 0 ? (
          <div className="space-y-3">
            {trackRecord.map((item: any, index: number) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="flex-1 grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={item.value}
                    onChange={(e) => updateTrackRecordItem(index, 'value', e.target.value)}
                    className="px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="$25M+"
                  />
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateTrackRecordItem(index, 'title', e.target.value)}
                    className="px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="Total Profit"
                  />
                  <input
                    type="text"
                    value={item.subtitle}
                    onChange={(e) => updateTrackRecordItem(index, 'subtitle', e.target.value)}
                    className="px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="Realized gains"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeTrackRecordItem(index)}
                  className="p-2 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">No track record items added</p>
        )}
      </div>

      {/* Strategies */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Investment Strategy</h3>
          <button
            type="button"
            onClick={addStrategy}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Strategy
          </button>
        </div>
        
        {strategies.length > 0 ? (
          <div className="space-y-3">
            {strategies.map((item: any, index: number) => (
              <div key={index} className="p-4 bg-muted/50 rounded-lg relative">
                <button
                  type="button"
                  onClick={() => removeStrategy(index)}
                  className="absolute top-2 right-2 p-1.5 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="space-y-3 pr-8">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateStrategy(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="Acquisition Strategy"
                  />
                  <textarea
                    value={item.description}
                    onChange={(e) => updateStrategy(index, 'description', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                    placeholder="Describe the strategy..."
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">No strategies added</p>
        )}
      </div>

      {/* Category-Specific: Real Estate Properties */}
      {category === 'Real Estate' && (
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Current Properties</h3>
            <button
              type="button"
              onClick={addProperty}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Property
            </button>
          </div>
          
          {currentProperties.length > 0 ? (
            <div className="space-y-4">
              {currentProperties.map((prop: any, index: number) => (
                <div key={index} className="p-4 bg-muted/50 rounded-lg relative">
                  <button
                    type="button"
                    onClick={() => removeProperty(index)}
                    className="absolute top-2 right-2 p-1.5 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="grid grid-cols-2 gap-3 pr-8">
                    <input
                      type="text"
                      value={prop.name}
                      onChange={(e) => updateProperty(index, 'name', e.target.value)}
                      className="px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      placeholder="Property Name"
                    />
                    <input
                      type="text"
                      value={prop.location}
                      onChange={(e) => updateProperty(index, 'location', e.target.value)}
                      className="px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      placeholder="Malibu, CA"
                    />
                    <input
                      type="text"
                      value={prop.acquisitionPrice}
                      onChange={(e) => updateProperty(index, 'acquisitionPrice', e.target.value)}
                      className="px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      placeholder="$4.5M (Acquisition)"
                    />
                    <input
                      type="text"
                      value={prop.projectedSale}
                      onChange={(e) => updateProperty(index, 'projectedSale', e.target.value)}
                      className="px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      placeholder="$8.5M (Projected)"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-muted/30 rounded-lg border border-dashed border-border">
              <Home className="w-10 h-10 mx-auto mb-3 text-muted-foreground/50" />
              <p className="text-muted-foreground">No properties added</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
