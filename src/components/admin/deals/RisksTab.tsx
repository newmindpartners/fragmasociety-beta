import { Plus, X, AlertTriangle, Shield } from "lucide-react";

interface RisksTabProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

const COMMON_RISKS = [
  { title: 'Market Risk', description: 'Property values may fluctuate based on market conditions.' },
  { title: 'Liquidity Risk', description: 'This is an illiquid investment with no secondary market.' },
  { title: 'Development Risk', description: 'Construction delays or cost overruns may affect returns.' },
  { title: 'Regulatory Risk', description: 'Changes in regulations may impact the investment.' },
  { title: 'Capital Loss', description: 'You may lose some or all of your invested capital.' },
];

export const RisksTab = ({ formData, updateFormData }: RisksTabProps) => {
  const risks = formData.risks || [];

  const addRisk = (risk?: { title: string; description: string }) => {
    updateFormData({
      risks: [...risks, risk || { title: '', description: '' }]
    });
  };

  const updateRisk = (index: number, field: string, value: string) => {
    const newRisks = [...risks];
    newRisks[index] = { ...newRisks[index], [field]: value };
    updateFormData({ risks: newRisks });
  };

  const removeRisk = (index: number) => {
    updateFormData({ risks: risks.filter((_: any, i: number) => i !== index) });
  };

  const addCommonRisk = (risk: { title: string; description: string }) => {
    // Check if already added
    if (!risks.find((r: any) => r.title === risk.title)) {
      addRisk(risk);
    }
  };

  return (
    <div className="space-y-6">
      {/* Risk Warning */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-red-800">Important: Risk Disclosure</h4>
            <p className="text-sm text-red-700 mt-1">
              Risk disclosures are a legal requirement. Ensure all material risks are accurately 
              described. This content should be reviewed by your compliance and legal teams.
            </p>
          </div>
        </div>
      </div>

      {/* Common Risks Quick Add */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Add Common Risks</h3>
        <div className="flex flex-wrap gap-2">
          {COMMON_RISKS.map((risk) => {
            const isAdded = risks.find((r: any) => r.title === risk.title);
            return (
              <button
                key={risk.title}
                type="button"
                onClick={() => addCommonRisk(risk)}
                disabled={!!isAdded}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  isAdded
                    ? 'bg-green-100 text-green-700 cursor-default'
                    : 'bg-muted hover:bg-muted/70 text-foreground'
                }`}
              >
                {isAdded ? '✓ ' : '+ '}
                {risk.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Risks */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Risk Disclosures</h3>
          <button
            type="button"
            onClick={() => addRisk()}
            className="flex items-center gap-2 px-4 py-2 bg-foreground hover:bg-foreground/90 text-background rounded-lg transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Risk
          </button>
        </div>
        
        {risks.length > 0 ? (
          <div className="space-y-4">
            {risks.map((risk: any, index: number) => (
              <div key={index} className="p-4 bg-muted/50 rounded-lg relative">
                <button
                  type="button"
                  onClick={() => removeRisk(index)}
                  className="absolute top-3 right-3 p-1.5 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="space-y-3 pr-10">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Risk Title</label>
                    <input
                      type="text"
                      value={risk.title}
                      onChange={(e) => updateRisk(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      placeholder="Market Risk"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Description</label>
                    <textarea
                      value={risk.description}
                      onChange={(e) => updateRisk(index, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                      placeholder="Describe this risk in detail..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-muted/30 rounded-lg border border-dashed border-border p-12 text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground mb-2">No risk disclosures added</p>
            <p className="text-sm text-muted-foreground">
              Add risk disclosures to inform investors about potential risks
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
