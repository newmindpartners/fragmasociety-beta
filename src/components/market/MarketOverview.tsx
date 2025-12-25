import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { OrderBook } from "./OrderBook";
import { MyOrders } from "./MyOrders";
import { MarketHistory } from "./MarketHistory";
import { OrderHistory } from "./OrderHistory";
import { InfoTooltip } from "@/components/ui/info-tooltip";

export const MarketOverview = () => {
  return (
    <Card className="p-6 bg-card border-border/50">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-xl font-serif font-bold text-foreground">Overview</h2>
        <InfoTooltip content="View order book depth, your active orders, order history, and recent market transactions" />
      </div>

      <Tabs defaultValue="orderbook" className="w-full">
        <TabsList className="w-full grid grid-cols-4 bg-muted/30 p-1 rounded-lg">
          <TabsTrigger 
            value="orderbook"
            className="data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-md py-2.5 text-xs sm:text-sm font-medium"
          >
            Order Book
          </TabsTrigger>
          <TabsTrigger 
            value="myorders"
            className="data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-md py-2.5 text-xs sm:text-sm font-medium"
          >
            My Orders
          </TabsTrigger>
          <TabsTrigger 
            value="orderhistory"
            className="data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-md py-2.5 text-xs sm:text-sm font-medium"
          >
            Order History
          </TabsTrigger>
          <TabsTrigger 
            value="markethistory"
            className="data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-md py-2.5 text-xs sm:text-sm font-medium"
          >
            Market
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="orderbook" className="m-0">
            <OrderBook />
          </TabsContent>
          
          <TabsContent value="myorders" className="m-0">
            <MyOrders />
          </TabsContent>
          
          <TabsContent value="orderhistory" className="m-0">
            <OrderHistory />
          </TabsContent>
          
          <TabsContent value="markethistory" className="m-0">
            <MarketHistory />
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
};
