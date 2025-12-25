import { motion } from "framer-motion";
import { Ban, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Order {
  id: string;
  date: string;
  type: "buy" | "sell";
  amount: number;
  price: number;
  status: "pending" | "filled" | "cancelled";
}

// Empty state for demo - user has no active orders
const userOrders: Order[] = [];

export const MyOrders = () => {
  if (userOrders.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        {/* Empty State Icon */}
        <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-muted/80 flex items-center justify-center">
            <Ban className="w-8 h-8 text-muted-foreground/60" />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-2">No Orders</h3>
        <p className="text-sm text-muted-foreground max-w-[280px] leading-relaxed">
          Description can span across multiple lines. The maximum number of lines is three.
        </p>

        <Button variant="outline" className="mt-6">
          <FileText className="w-4 h-4 mr-2" />
          Place Your First Order
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Table Header */}
      <div className="grid grid-cols-5 gap-4 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        <div>Date</div>
        <div>Type</div>
        <div className="text-right">Amount</div>
        <div className="text-right">Price</div>
        <div className="text-right">Status</div>
      </div>

      {/* Orders List */}
      <div className="space-y-2">
        {userOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="grid grid-cols-5 gap-4 px-4 py-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors items-center"
          >
            <div className="text-sm text-foreground">{order.date}</div>
            <div>
              <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                order.type === "buy" 
                  ? "bg-green-500/10 text-green-600" 
                  : "bg-red-500/10 text-red-500"
              }`}>
                {order.type === "buy" ? "Buy" : "Sell"}
              </span>
            </div>
            <div className="text-right text-foreground">{order.amount}</div>
            <div className="text-right text-foreground">€{order.price}</div>
            <div className="text-right">
              <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                order.status === "pending" 
                  ? "bg-amber-500/10 text-amber-600"
                  : order.status === "filled"
                  ? "bg-green-500/10 text-green-600"
                  : "bg-muted text-muted-foreground"
              }`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
