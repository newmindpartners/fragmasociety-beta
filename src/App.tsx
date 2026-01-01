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
import Dashboard from "./pages/Dashboard";
import Banking from "./pages/Banking";
import Documents from "./pages/Documents";
import Wallet from "./pages/Wallet";
import Earnings from "./pages/Earnings";
import SecondaryMarket from "./pages/SecondaryMarket";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import OrderDetails from "./pages/OrderDetails";
import Watchlist from "./pages/Watchlist";
import HelpCenter from "./pages/HelpCenter";
import MyPortfolio from "./pages/MyPortfolio";
import KYC from "./pages/KYC";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { AdminRoute } from "./components/admin/AdminRoute";

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
            {/* <Route path="/strategy" element={<Strategy />} /> */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/tokenize" element={<Tokenize />} />
            <Route path="/signature-deal" element={<SignatureDeal />} />
            <Route path="/live-deals" element={<LiveDeals />} />
            <Route path="/deal/:id" element={<DealDetails />} />
            <Route path="/order/:orderId" element={<OrderDetails />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/portfolio" element={<MyPortfolio />} />
            <Route path="/dashboard/watchlist" element={<Watchlist />} />
            <Route path="/dashboard/banking" element={<Banking />} />
            <Route path="/dashboard/banking/*" element={<Banking />} />
            <Route path="/dashboard/documents" element={<Documents />} />
            <Route path="/dashboard/wallet" element={<Wallet />} />
            <Route path="/dashboard/earnings" element={<Earnings />} />
            <Route path="/dashboard/market" element={<SecondaryMarket />} />
            <Route path="/dashboard/notifications" element={<Notifications />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/dashboard/help" element={<HelpCenter />} />
            <Route path="/dashboard/kyc" element={<KYC />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/fund" element={<Strategy />} />
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/*" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
