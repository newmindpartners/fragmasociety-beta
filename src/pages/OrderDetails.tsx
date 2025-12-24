import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, TrendingDown, Clock, FileText, Download, Share2, AlertCircle, CheckCircle, Info, Calendar, CreditCard, Building2, Layers, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

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

// Mock data
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
      <div className="theme-dashboard min-h-screen bg-background flex items-center justify-center">
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
      active: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", icon: Clock, label: "Active" },
      partial: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", icon: AlertCircle, label: "Partially Filled" },
      completed: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20", icon: CheckCircle, label: "Completed" },
      cancelled: { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-200", icon: AlertCircle, label: "Cancelled" },
    };
    
    const { bg, text, border, icon: Icon, label } = config[status];
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border ${bg} ${text} ${border}`}>
        <Icon className="w-4 h-4" />
        {label}
      </span>
    );
  };

  const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );

  return (
    <div className="theme-dashboard relative flex min-h-screen w-full bg-background text-foreground">
      <DashboardSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div
        className="flex min-h-screen flex-1 flex-col overflow-hidden transition-[margin-left] duration-300 ease-out"
        style={{
          marginLeft: sidebarCollapsed ? 72 : 256,
        }}
      >
        <DashboardHeader onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

        <main className="flex-1 min-w-0 bg-background px-6 py-6 lg:px-10 lg:py-8">
          <div className="mx-auto w-full max-w-3xl">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6"
            >
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="text-gray-500 hover:text-gray-900 -ml-2"
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
              <h1 className="text-3xl font-bold text-gray-900 mt-1 mb-4">Order Details</h1>
              <div className="flex items-center gap-4">
                {getStatusBadge(order.status)}
                <span className="text-sm text-gray-500">
                  Transaction ID: {order.transactionId}
                </span>
              </div>
            </motion.div>

            {/* Order Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                  order.orderType === "buy" ? "bg-emerald-50" : "bg-rose-50"
                }`}>
                  {order.orderType === "buy" ? (
                    <TrendingUp className="w-7 h-7 text-emerald-600" />
                  ) : (
                    <TrendingDown className="w-7 h-7 text-rose-500" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{order.assetName}</h2>
                  <p className="text-sm text-gray-500">{order.assetType}</p>
                </div>
                <span className={`ml-auto px-3 py-1.5 rounded-lg text-sm font-bold ${
                  order.orderType === "buy" 
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                    : "bg-rose-50 text-rose-600 border border-rose-200"
                }`}>
                  {order.orderType === "buy" ? "Buy Order" : "Sell Order"}
                </span>
              </div>

              <DetailRow label="Base Shares" value={order.tokens.toString()} />
              <DetailRow label="Venture Club Shares" value="—" />
              <DetailRow label="Total Shares" value={order.tokens.toString()} />
              <DetailRow label="Share Price" value={order.pricePerToken} />
              <DetailRow label="Fees" value={order.fees} />
              
              <div className="flex items-center justify-between py-4 mt-2 bg-primary/5 -mx-6 px-6 rounded-b-xl border-t border-primary/10">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">Cost Basis</span>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <span className="text-lg font-bold text-primary">{order.costBasis}</span>
              </div>
            </motion.div>

            {/* Account Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-100"
            >
              <div className="space-y-0">
                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">Account</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{order.account}</span>
                </div>
                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">Payment Method</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{order.paymentMethod}</span>
                </div>
                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">Offering Type</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{order.offeringType}</span>
                </div>
                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">Shares Offered</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{order.sharesOffered}</span>
                </div>
                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">Instrument Type</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{order.instrumentType}</span>
                </div>
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">Submitted</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{order.submittedAt}</span>
                </div>
              </div>
            </motion.div>

            {/* Blockchain Info */}
            {order.blockchainHash && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm"
              >
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Blockchain Verification</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Transaction Hash</span>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono text-gray-600 truncate max-w-[300px]">
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
              <Button variant="outline" className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50">
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </Button>
              <Button variant="outline" className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50">
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

        {/* Footer */}
        <footer className="mt-auto border-t border-gray-200 bg-white px-6 py-4 lg:px-10">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-gray-500">
              © 2024 Fragma Finance. All rights reserved.
            </p>
            <nav className="flex items-center gap-8">
              <a href="#" className="text-xs font-medium text-gray-500 transition-colors hover:text-gray-900">
                Privacy Policy
              </a>
              <a href="#" className="text-xs font-medium text-gray-500 transition-colors hover:text-gray-900">
                Terms of Service
              </a>
              <a href="#" className="text-xs font-medium text-gray-500 transition-colors hover:text-gray-900">
                Contact
              </a>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default OrderDetails;
