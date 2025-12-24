import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowDownUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useWalletHistory } from "@/hooks/useWalletHistory";

interface Project {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  value: string;
  status: "Secondary market" | "Primary" | "Pending";
  icon?: string;
}

const mockProjects: Project[] = [
  { id: "1", name: "Santexpat.fr", symbol: "SXPT", amount: 0, value: "€0.00", status: "Secondary market" },
  { id: "2", name: "Santexpat.fr", symbol: "SXPT", amount: 0, value: "€0.00", status: "Secondary market" },
  { id: "3", name: "Santexpat.fr", symbol: "SXPT", amount: 0, value: "€0.00", status: "Secondary market" },
];

interface Order {
  id: string;
  project: string;
  type: "Buy" | "Sell";
  amount: string;
  status: "Open" | "Filled" | "Cancelled";
  date: string;
}

const mockOrders: Order[] = [
  { id: "1", project: "Santexpat.fr", type: "Buy", amount: "€500.00", status: "Open", date: "Apr 10, 2025" },
  { id: "2", project: "Santexpat.fr", type: "Sell", amount: "€250.00", status: "Filled", date: "Apr 8, 2025" },
];

export const WalletPortfolio = () => {
  const [activeTab, setActiveTab] = useState("project");
  const { history } = useWalletHistory();

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "Secondary market":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";
      case "Primary":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case "Pending":
        return "bg-amber-50 text-amber-700 border border-amber-200";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const getTypeIcon = (type: string) => {
    if (type === "Swap") {
      return <ArrowDownUp className="w-4 h-4 text-emerald-600" />;
    }
    return null;
  };

  const getAmountColor = (amount: string, type: string) => {
    if (type === "Swap") return "text-emerald-600";
    if (amount.startsWith("+")) return "text-emerald-600";
    if (amount.startsWith("-")) return "text-red-500";
    return "text-slate-900";
  };

  return (
    <div>
      <h2 className="text-2xl font-serif font-semibold text-foreground mb-6">My Wallet Overview</h2>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-transparent border-b border-border rounded-none w-full justify-start gap-8 h-auto p-0">
          <TabsTrigger 
            value="project"
            className="bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3"
          >
            Project
          </TabsTrigger>
          <TabsTrigger 
            value="orders"
            className="bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3"
          >
            Orders
          </TabsTrigger>
          <TabsTrigger 
            value="history"
            className="bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3"
          >
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="project" className="mt-0">
          <div className="bg-card border border-border rounded-2xl overflow-hidden mt-4">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-muted/30 border-b border-border text-sm text-muted-foreground">
              <span>Name</span>
              <span>Symbole</span>
              <span className="text-center">Nombre</span>
              <span>Valeur</span>
              <span>Status</span>
            </div>

            {/* Table Body */}
            {mockProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="grid grid-cols-5 gap-4 px-6 py-4 items-center border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                    X
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{project.name}</p>
                    <button className="text-xs text-primary hover:underline flex items-center gap-1">
                      Learn more
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div>
                  <Badge variant="secondary" className="bg-muted text-muted-foreground font-mono">
                    {project.symbol}
                  </Badge>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-semibold mx-auto">
                    {project.amount}
                  </div>
                </div>
                <div className="text-foreground">{project.value}</div>
                <div>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="orders" className="mt-0">
          <div className="bg-card border border-border rounded-2xl overflow-hidden mt-4">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-muted/30 border-b border-border text-sm text-muted-foreground">
              <span>Project</span>
              <span>Type</span>
              <span>Amount</span>
              <span>Status</span>
              <span>Date</span>
            </div>

            {/* Table Body */}
            {mockOrders.length > 0 ? (
              mockOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="grid grid-cols-5 gap-4 px-6 py-4 items-center border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
                >
                  <div className="font-medium text-foreground">{order.project}</div>
                  <div>
                    <Badge variant={order.type === "Buy" ? "default" : "secondary"}>
                      {order.type}
                    </Badge>
                  </div>
                  <div className="text-foreground">{order.amount}</div>
                  <div>
                    <Badge variant={order.status === "Filled" ? "default" : "outline"}>
                      {order.status}
                    </Badge>
                  </div>
                  <div className="text-muted-foreground text-sm">{order.date}</div>
                </motion.div>
              ))
            ) : (
              <div className="px-6 py-12 text-center text-muted-foreground">
                No orders yet
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-0">
          <div className="bg-card border border-border rounded-2xl overflow-hidden mt-4">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-muted/30 border-b border-border text-sm text-muted-foreground">
              <span>Type</span>
              <span>Amount</span>
              <span>Date</span>
              <span>Status</span>
            </div>

            {/* Table Body */}
            {history.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="grid grid-cols-4 gap-4 px-6 py-4 items-center border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {getTypeIcon(transaction.type)}
                  <span className="font-medium text-foreground">{transaction.type}</span>
                </div>
                <div className="flex flex-col">
                  <span className={getAmountColor(transaction.amount, transaction.type)}>
                    {transaction.amount}
                  </span>
                  {transaction.details && (
                    <span className="text-xs text-muted-foreground">{transaction.details}</span>
                  )}
                </div>
                <div className="text-muted-foreground text-sm">{transaction.date}</div>
                <div>
                  <Badge 
                    variant={transaction.status === "Completed" ? "default" : "outline"}
                    className={transaction.status === "Completed" ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "border-slate-200 text-slate-600"}
                  >
                    {transaction.status}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
