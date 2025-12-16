import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DisclaimerModal } from "@/components/DisclaimerModal";
import Index from "./pages/Index";
import Strategy from "./pages/Strategy";
import Auth from "./pages/Auth";
import Membership from "./pages/Membership";
import Marketplace from "./pages/Marketplace";
import Tokenize from "./pages/Tokenize";
import SignatureDeal from "./pages/SignatureDeal";
import LiveDeals from "./pages/LiveDeals";
import DealDetails from "./pages/DealDetails";
import FAQ from "./pages/FAQ";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <DisclaimerModal />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/strategy" element={<Strategy />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/tokenize" element={<Tokenize />} />
            <Route path="/signature-deal" element={<SignatureDeal />} />
            <Route path="/live-deals" element={<LiveDeals />} />
            <Route path="/deal/:id" element={<DealDetails />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/fund" element={<Strategy />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
