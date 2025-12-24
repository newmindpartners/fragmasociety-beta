import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, TrendingDown, Clock, FileText, Download, Share2, AlertCircle, CheckCircle, Info, Calendar, CreditCard, Building2, Layers, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

interface OrderData {
  id: string;
  assetName: string;
  assetType: string;
  orderType: "buy" | "sell";
  tokens: number;
  pricePerToken: string;
  totalValue: string;
  status: "active" | "partial" | "completed" | "cancelled";
  createdAt: string;
  filledTokens: number;
  expiresAt?: string;
  // Additional details
  fees: string;
  costBasis: string;
  account: string;
  paymentMethod: string;
  offeringType: string;
  sharesOffered: string;
  instrumentType: string;
  submittedAt: string;
  transactionId: string;
  blockchainHash?: string;
}

// Mock data - in production this would come from API/database
const mockOrders: Record<string, OrderData> = {
  "1": {
    id: "1",
    assetName: "Malibu Estate Fund",
    assetType: "Real Estate",
    orderType: "buy",
    tokens: 50,
    pricePerToken: "€120.00",
    totalValue: "€6,000.00",
    status: "active",
    createdAt: "2024-01-15",
    filledTokens: 0,
    expiresAt: "2024-02-15",
    fees: "€62.40",
    costBasis: "€6,062.40",
    account: "Individual",
    paymentMethod: "Wire Transfer",
    offeringType: "Equity",
    sharesOffered: "Common Stock",
    instrumentType: "Tokenized Shares",
    submittedAt: "January 15, 2024 2:30 PM",
    transactionId: "TXN-2024-00142",
    blockchainHash: "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385",
  },
  "2": {
    id: "2",
    assetName: "Film Rights Portfolio",
    assetType: "Entertainment",
    orderType: "sell",
    tokens: 25,
    pricePerToken: "€85.00",
    totalValue: "€2,125.00",
    status: "partial",
    createdAt: "2024-01-12",
    filledTokens: 10,
    expiresAt: "2024-02-12",
    fees: "€22.10",
    costBasis: "€2,102.90",
    account: "Individual",
    paymentMethod: "Bank Account",
    offeringType: "Revenue Share",
    sharesOffered: "Participation Units",
    instrumentType: "Tokenized Rights",
    submittedAt: "January 12, 2024 10:15 AM",
    transactionId: "TXN-2024-00138",
  },
  "3": {
    id: "3",
    assetName: "Corporate Bond SPV",
    assetType: "Credit",
    orderType: "buy",
    tokens: 100,
    pricePerToken: "€100.00",
    totalValue: "€10,000.00",
    status: "completed",
    createdAt: "2024-01-10",
    filledTokens: 100,
    fees: "€104.00",
    costBasis: "€10,104.00",
    account: "Corporate",
    paymentMethod: "Wire Transfer",
    offeringType: "Debt",
    sharesOffered: "Bond Units",
    instrumentType: "Tokenized Bonds",
    submittedAt: "January 10, 2024 9:45 AM",
    transactionId: "TXN-2024-00125",
    blockchainHash: "0x3a8fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91888",
  },
  "4": {
    id: "4",
    assetName: "Music Royalties Fund",
    assetType: "Music",
    orderType: "sell",
    tokens: 30,
    pricePerToken: "€75.00",
    totalValue: "€2,250.00",
    status: "cancelled",
    createdAt: "2024-01-08",
    filledTokens: 0,
    fees: "€0.00",
    costBasis: "€0.00",
    account: "Individual",
    paymentMethod: "Bank Account",
    offeringType: "Royalty Stream",
    sharesOffered: "Revenue Units",
    instrumentType: "Tokenized Royalties",
    submittedAt: "January 8, 2024 3:20 PM",
    transactionId: "TXN-2024-00118",
  },
};

const OrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const order = orderId ? mockOrders[orderId] : null;

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Order Not Found</h1>
          <p className="text-muted-foreground mb-4">The order you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: OrderData["status"]) => {
    const config = {
      active: { bg: "bg-emerald-500/10", text: "text-emerald-600", border: "border-emerald-500/20", icon: Clock, label: "Active" },
      partial: { bg: "bg-amber-500/10", text: "text-amber-600", border: "border-amber-500/20", icon: AlertCircle, label: "Partially Filled" },
      completed: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20", icon: CheckCircle, label: "Completed" },
      cancelled: { bg: "bg-muted", text: "text-muted-foreground", border: "border-border", icon: AlertCircle, label: "Cancelled" },
    };
    
    const { bg, text, border, icon: Icon, label } = config[status];
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border ${bg} ${text} ${border}`}>
        <Icon className="w-4 h-4" />
        {label}
      </span>
    );
  };

  const DetailRow = ({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) => (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-b-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`text-sm font-medium ${highlight ? 'text-primary font-bold' : 'text-foreground'}`}>{value}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="text-muted-foreground hover:text-foreground -ml-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </motion.div>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <Link 
                to="/live-deals" 
                className="text-primary text-sm font-medium hover:underline"
              >
                {order.assetName}
              </Link>
              <h1 className="text-3xl font-bold text-foreground mt-1 mb-4">Order Details</h1>
              <div className="flex items-center gap-4">
                {getStatusBadge(order.status)}
                <span className="text-sm text-muted-foreground">
                  Transaction ID: {order.transactionId}
                </span>
              </div>
            </motion.div>

            {/* Order Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-xl border border-border p-6 mb-6"
            >
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                  order.orderType === "buy" ? "bg-emerald-500/10" : "bg-rose-500/10"
                }`}>
                  {order.orderType === "buy" ? (
                    <TrendingUp className="w-7 h-7 text-emerald-600" />
                  ) : (
                    <TrendingDown className="w-7 h-7 text-rose-500" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">{order.assetName}</h2>
                  <p className="text-sm text-muted-foreground">{order.assetType}</p>
                </div>
                <span className={`ml-auto px-3 py-1.5 rounded-lg text-sm font-bold ${
                  order.orderType === "buy" 
                    ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" 
                    : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                }`}>
                  {order.orderType === "buy" ? "Buy Order" : "Sell Order"}
                </span>
              </div>

              <DetailRow label="Base Shares" value={order.tokens.toString()} />
              <DetailRow label="Venture Club Shares" value="—" />
              <DetailRow label="Total Shares" value={order.tokens.toString()} />
              <DetailRow label="Share Price" value={order.pricePerToken} />
              <DetailRow label="Fees" value={order.fees} />
              <div className="flex items-center justify-between py-4 mt-2 bg-accent/30 -mx-6 px-6 rounded-b-xl">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">Cost Basis</span>
                  <Info className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="text-lg font-bold text-primary">{order.costBasis}</span>
              </div>
            </motion.div>

            {/* Account Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-accent/50 rounded-xl p-6 mb-6"
            >
              <div className="space-y-0">
                <div className="flex items-center justify-between py-4 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Account</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{order.account}</span>
                </div>
                <div className="flex items-center justify-between py-4 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Payment Method</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{order.paymentMethod}</span>
                </div>
                <div className="flex items-center justify-between py-4 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Offering Type</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{order.offeringType}</span>
                </div>
                <div className="flex items-center justify-between py-4 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Shares Offered</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{order.sharesOffered}</span>
                </div>
                <div className="flex items-center justify-between py-4 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Instrument Type</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{order.instrumentType}</span>
                </div>
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Submitted</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{order.submittedAt}</span>
                </div>
              </div>
            </motion.div>

            {/* Blockchain Info (if available) */}
            {order.blockchainHash && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card rounded-xl border border-border p-6 mb-6"
              >
                <h3 className="text-sm font-semibold text-foreground mb-4">Blockchain Verification</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Transaction Hash</span>
                  <code className="text-xs bg-muted px-2 py-1 rounded font-mono text-muted-foreground truncate max-w-[300px]">
                    {order.blockchainHash}
                  </code>
                </div>
              </motion.div>
            )}

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4"
            >
              <Button variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                Share Details
              </Button>
              {(order.status === "active" || order.status === "partial") && (
                <Button variant="destructive" className="flex-1">
                  Cancel Order
                </Button>
              )}
            </motion.div>
          </div>
        </main>
      </div>
  );
};

export default OrderDetails;
