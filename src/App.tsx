import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { KYCProvider } from "@/contexts/KYCContext";
import { KYCProtectedRoute } from "@/components/kyc/KYCProtectedRoute";
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
import AdminSubmissions from "./pages/admin/AdminSubmissions";
import ComplianceDashboard from "./pages/admin/ComplianceDashboard";
import InvestorReview from "./pages/admin/InvestorReview";
import JurisdictionsPage from "./pages/admin/JurisdictionsPage";
import ComplianceAIChat from "./pages/admin/ComplianceAIChat";
import { AdminRoute } from "./components/admin/AdminRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <KYCProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <DisclaimerModal />
          <BrowserRouter>
            <Routes>
              {/* Public routes - no KYC required */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/signature-deal" element={<SignatureDeal />} />
              
              {/* KYC page - accessible without KYC approval */}
              <Route path="/dashboard/kyc" element={<KYC />} />
              
              {/* Protected routes - require KYC approval */}
              <Route path="/marketplace" element={<KYCProtectedRoute><Marketplace /></KYCProtectedRoute>} />
              <Route path="/tokenize" element={<KYCProtectedRoute><Tokenize /></KYCProtectedRoute>} />
              <Route path="/live-deals" element={<KYCProtectedRoute><LiveDeals /></KYCProtectedRoute>} />
              <Route path="/deal/:id" element={<KYCProtectedRoute><DealDetails /></KYCProtectedRoute>} />
              <Route path="/order/:orderId" element={<KYCProtectedRoute><OrderDetails /></KYCProtectedRoute>} />
              <Route path="/dashboard" element={<KYCProtectedRoute><Dashboard /></KYCProtectedRoute>} />
              <Route path="/dashboard/portfolio" element={<KYCProtectedRoute><MyPortfolio /></KYCProtectedRoute>} />
              <Route path="/dashboard/watchlist" element={<KYCProtectedRoute><Watchlist /></KYCProtectedRoute>} />
              <Route path="/dashboard/banking" element={<KYCProtectedRoute><Banking /></KYCProtectedRoute>} />
              <Route path="/dashboard/banking/*" element={<KYCProtectedRoute><Banking /></KYCProtectedRoute>} />
              <Route path="/dashboard/documents" element={<KYCProtectedRoute><Documents /></KYCProtectedRoute>} />
              <Route path="/dashboard/wallet" element={<KYCProtectedRoute><Wallet /></KYCProtectedRoute>} />
              <Route path="/dashboard/earnings" element={<KYCProtectedRoute><Earnings /></KYCProtectedRoute>} />
              <Route path="/dashboard/market" element={<KYCProtectedRoute><SecondaryMarket /></KYCProtectedRoute>} />
              <Route path="/dashboard/notifications" element={<KYCProtectedRoute><Notifications /></KYCProtectedRoute>} />
              <Route path="/dashboard/settings" element={<KYCProtectedRoute><Settings /></KYCProtectedRoute>} />
              <Route path="/dashboard/help" element={<KYCProtectedRoute><HelpCenter /></KYCProtectedRoute>} />
              <Route path="/dashboard/*" element={<KYCProtectedRoute><Dashboard /></KYCProtectedRoute>} />
              <Route path="/fund" element={<KYCProtectedRoute><Strategy /></KYCProtectedRoute>} />
              
              {/* Admin Routes - separate authentication */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/submissions" element={<AdminRoute><AdminSubmissions /></AdminRoute>} />
              
              {/* Compliance Engine Routes */}
              <Route path="/admin/compliance" element={<AdminRoute><ComplianceDashboard /></AdminRoute>} />
              <Route path="/admin/compliance/investors" element={<AdminRoute><InvestorReview /></AdminRoute>} />
              <Route path="/admin/compliance/investors/:investorId" element={<AdminRoute><InvestorReview /></AdminRoute>} />
              <Route path="/admin/compliance/jurisdictions" element={<AdminRoute><JurisdictionsPage /></AdminRoute>} />
              <Route path="/admin/compliance/jurisdictions/:countryCode" element={<AdminRoute><JurisdictionsPage /></AdminRoute>} />
              <Route path="/admin/compliance/audit" element={<AdminRoute><ComplianceDashboard /></AdminRoute>} />
              <Route path="/admin/compliance/ai-assistant" element={<AdminRoute><ComplianceAIChat /></AdminRoute>} />
              
              <Route path="/admin/*" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              
              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </KYCProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
