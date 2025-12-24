import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AddPaymentMethodModal } from "./AddPaymentMethodModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PaymentMethod {
  id: string;
  type: "mastercard" | "visa";
  last4: string;
  isDefault: boolean;
}

const mockPaymentMethods: PaymentMethod[] = [
  { id: "1", type: "mastercard", last4: "1244", isDefault: true },
];

export const PaymentMethods = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [paymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-primary mb-6">
        <Link to="/dashboard/banking" className="hover:underline">
          Banking
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="text-muted-foreground">Payment Methods</span>
      </div>

      <h1 className="text-3xl font-serif font-semibold text-foreground mb-2">Payment Methods</h1>
      <p className="text-muted-foreground mb-8">All info is kept highly secure</p>

      {/* Payment Methods List */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-4">
        {paymentMethods.map((method, index) => (
          <motion.div
            key={method.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-400 flex items-center justify-center">
                {method.type === "mastercard" && (
                  <div className="flex -space-x-2">
                    <div className="w-5 h-5 rounded-full bg-red-600"></div>
                    <div className="w-5 h-5 rounded-full bg-orange-400"></div>
                  </div>
                )}
                {method.type === "visa" && (
                  <span className="text-white font-bold text-xs">VISA</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium text-foreground capitalize">
                  {method.type}
                </span>
                {method.isDefault && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-xs">
                    Default
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">**** {method.last4}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-muted/50">
                    <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Set as Default</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Payment Method Button */}
      <Button
        variant="ghost"
        className="text-primary hover:text-primary/80 hover:bg-transparent p-0 h-auto font-medium"
        onClick={() => setAddModalOpen(true)}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Payment Methods
      </Button>

      {/* Current Balance Card */}
      <div className="bg-card border border-border rounded-2xl p-6 mt-8">
        <h3 className="font-semibold text-foreground mb-2">Your Current Balance</h3>
        <p className="text-primary text-lg">US$0.00 Available</p>
      </div>

      <AddPaymentMethodModal open={addModalOpen} onOpenChange={setAddModalOpen} />
    </div>
  );
};
