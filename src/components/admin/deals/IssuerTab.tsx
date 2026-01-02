import { useState, useEffect } from "react";
import { Building2, Plus, ChevronDown, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface IssuerTabProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

interface Issuer {
  id: string;
  companyName: string;
  legalName?: string;
  jurisdiction: string;
  isVerified: boolean;
}

export const IssuerTab = ({ formData, updateFormData }: IssuerTabProps) => {
  const [issuers, setIssuers] = useState<Issuer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIssuers();
  }, []);

  const fetchIssuers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/issuers`);
      const data = await response.json();
      if (data.success) {
        setIssuers(data.issuers || []);
      }
    } catch (err) {
      console.error('Fetch issuers error:', err);
    } finally {
      setLoading(false);
    }
  };

  const selectedIssuer = issuers.find(i => i.id === formData.issuerId);

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Issuer / Sponsor Company</h3>
          <Link
            to="/admin/deals/issuers"
            className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
          >
            <Plus className="w-4 h-4" />
            Manage Issuers
          </Link>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Select Issuer</label>
            <div className="relative">
              <select
                value={formData.issuerId || ''}
                onChange={(e) => updateFormData({ issuerId: e.target.value || null })}
                className="w-full appearance-none px-4 py-2.5 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="">No issuer selected</option>
                {issuers.map(issuer => (
                  <option key={issuer.id} value={issuer.id}>
                    {issuer.companyName} ({issuer.jurisdiction})
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Selected Issuer Details */}
          {selectedIssuer && (
            <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <Building2 className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-foreground">{selectedIssuer.companyName}</h4>
                    {selectedIssuer.isVerified && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                  {selectedIssuer.legalName && (
                    <p className="text-sm text-muted-foreground">{selectedIssuer.legalName}</p>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">{selectedIssuer.jurisdiction}</p>
                  <Link
                    to={`/admin/deals/issuers/${selectedIssuer.id}`}
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline mt-2"
                  >
                    View full details
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {!selectedIssuer && !loading && (
            <div className="p-6 text-center bg-muted/30 rounded-lg border border-dashed border-border">
              <Building2 className="w-10 h-10 mx-auto mb-3 text-muted-foreground/50" />
              <p className="text-muted-foreground mb-2">No issuer selected</p>
              <p className="text-sm text-muted-foreground">
                Select an existing issuer or{' '}
                <Link to="/admin/deals/issuers" className="text-blue-600 hover:underline">
                  create a new one
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 mb-1">What is an Issuer?</h4>
        <p className="text-sm text-blue-700">
          The issuer is the legal entity that issues the securities for this deal. This is typically 
          a special purpose vehicle (SPV), fund, or company that holds the assets and issues notes 
          or shares to investors. For compliance purposes, issuer details are required before a deal 
          can be activated.
        </p>
      </div>
    </div>
  );
};
