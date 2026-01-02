import { useState, useEffect } from "react";
import { PieChart, Users, DollarSign, RefreshCw, Download } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface CapTableTabProps {
  dealId?: string;
}

interface Investor {
  id: string;
  investor: {
    id: string;
    name: string;
    email: string;
    country: string;
    investorType: string;
  };
  amount: string;
  tokens: string;
  ownershipPercent: string;
  status: string;
  investedAt: string;
}

interface CapTableSummary {
  totalInvestors: number;
  totalRaised: string;
  targetRaise: string;
}

export const CapTableTab = ({ dealId }: CapTableTabProps) => {
  const [investments, setInvestments] = useState<Investor[]>([]);
  const [summary, setSummary] = useState<CapTableSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (dealId) {
      fetchCapTable();
    }
  }, [dealId]);

  const fetchCapTable = async () => {
    if (!dealId) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/admin/deals/${dealId}/cap-table`);
      const data = await response.json();
      
      if (data.success) {
        setInvestments(data.capTable || []);
        setSummary(data.summary || null);
      } else {
        setError(data.error || 'Failed to load cap table');
      }
    } catch (err) {
      console.error('Fetch cap table error:', err);
      setError('Failed to load cap table');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: string | number) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Country', 'Type', 'Amount', 'Ownership %', 'Status', 'Date'];
    const rows = investments.map(inv => [
      inv.investor.name,
      inv.investor.email,
      inv.investor.country,
      inv.investor.investorType,
      inv.amount,
      inv.ownershipPercent + '%',
      inv.status,
      new Date(inv.investedAt).toLocaleDateString(),
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cap-table-${dealId}.csv`;
    a.click();
  };

  if (!dealId) {
    return (
      <div className="bg-card rounded-xl border border-border p-12 text-center">
        <PieChart className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
        <p className="text-muted-foreground mb-2">Cap Table Not Available</p>
        <p className="text-sm text-muted-foreground">
          Save the deal first to access cap table and investor management
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      {summary && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-foreground">{summary.totalInvestors}</p>
            <p className="text-xs text-muted-foreground">Total Investors</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">
              {summary.totalRaised ? formatCurrency(summary.totalRaised) : '€0'}
            </p>
            <p className="text-xs text-muted-foreground">Total Raised</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 mb-1">
              <PieChart className="w-4 h-4 text-violet-600" />
            </div>
            <p className="text-2xl font-bold text-violet-600">
              {summary.targetRaise ? formatCurrency(summary.targetRaise) : '—'}
            </p>
            <p className="text-xs text-muted-foreground">Target Raise</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Investors</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchCapTable}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-1.5 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors text-sm"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          {investments.length > 0 && (
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 px-3 py-1.5 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          )}
        </div>
      </div>

      {/* Investors Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground">Loading investors...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600">
            {error}
          </div>
        ) : investments.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground mb-2">No investors yet</p>
            <p className="text-sm text-muted-foreground">
              Investments will appear here when investors commit to this deal
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Investor</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Type</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Amount</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Ownership</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">Date</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((inv) => (
                <tr key={inv.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-foreground">{inv.investor.name}</p>
                      <p className="text-xs text-muted-foreground">{inv.investor.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-xs px-2 py-1 rounded bg-muted text-foreground">
                      {inv.investor.investorType}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-foreground">
                    {formatCurrency(inv.amount)}
                  </td>
                  <td className="py-3 px-4 text-right text-foreground">
                    {inv.ownershipPercent}%
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`text-xs px-2 py-1 rounded ${
                      inv.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                      inv.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-sm text-muted-foreground">
                    {new Date(inv.investedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
