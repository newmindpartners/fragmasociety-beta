import { ChevronDown } from "lucide-react";

interface TermsTabProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

const CURRENCIES = ['EUR', 'USD', 'GBP', 'CHF'];
const RISK_LEVELS = ['Low', 'Medium', 'High'];
const INSTRUMENT_TYPES = [
  'Notes',
  'LP Units',
  'Revenue Participation',
  'Equity',
  'Convertible Notes',
  'Profit Participation',
];
const DISTRIBUTION_FREQUENCIES = [
  'Monthly',
  'Quarterly',
  'Semi-Annually',
  'Annually',
  'Upon exit',
  'Upon events',
];

export const TermsTab = ({ formData, updateFormData }: TermsTabProps) => {
  return (
    <div className="space-y-6">
      {/* Investment Terms */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Investment Terms</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Currency</label>
            <div className="relative">
              <select
                value={formData.currency}
                onChange={(e) => updateFormData({ currency: e.target.value })}
                className="w-full appearance-none px-4 py-2.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                {CURRENCIES.map(cur => (
                  <option key={cur} value={cur}>{cur}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Minimum Ticket</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                {formData.currency}
              </span>
              <input
                type="number"
                value={formData.minTicket}
                onChange={(e) => updateFormData({ minTicket: e.target.value })}
                className="w-full pl-12 pr-4 py-2.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="50000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Maximum Ticket</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                {formData.currency}
              </span>
              <input
                type="number"
                value={formData.maxTicket}
                onChange={(e) => updateFormData({ maxTicket: e.target.value })}
                className="w-full pl-12 pr-4 py-2.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="500000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Total Raise Target</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                {formData.currency}
              </span>
              <input
                type="number"
                value={formData.totalRaise}
                onChange={(e) => updateFormData({ totalRaise: e.target.value })}
                className="w-full pl-12 pr-4 py-2.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="5000000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Target Return</label>
            <input
              type="text"
              value={formData.targetReturn}
              onChange={(e) => updateFormData({ targetReturn: e.target.value })}
              className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="10-15% IRR"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Term / Duration</label>
            <input
              type="text"
              value={formData.term}
              onChange={(e) => updateFormData({ term: e.target.value })}
              className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="24-32 months"
            />
          </div>
        </div>
      </div>

      {/* Instrument & Risk */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Instrument & Risk</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Instrument Type</label>
            <div className="relative">
              <select
                value={formData.instrumentType}
                onChange={(e) => updateFormData({ instrumentType: e.target.value })}
                className="w-full appearance-none px-4 py-2.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                {INSTRUMENT_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Distribution Frequency</label>
            <div className="relative">
              <select
                value={formData.distributionFrequency}
                onChange={(e) => updateFormData({ distributionFrequency: e.target.value })}
                className="w-full appearance-none px-4 py-2.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="">Select...</option>
                {DISTRIBUTION_FREQUENCIES.map(freq => (
                  <option key={freq} value={freq}>{freq}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Risk Level</label>
            <div className="relative">
              <select
                value={formData.risk}
                onChange={(e) => updateFormData({ risk: e.target.value })}
                className="w-full appearance-none px-4 py-2.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                {RISK_LEVELS.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h4 className="font-medium text-amber-800 mb-1">Important</h4>
        <p className="text-sm text-amber-700">
          Investment terms will be displayed to potential investors. Ensure all values are accurate 
          and have been reviewed by your compliance team. Target returns are projections only and 
          should include appropriate disclaimers.
        </p>
      </div>
    </div>
  );
};
