import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Shield, Loader2 } from "lucide-react";

interface AdminRouteProps {
  children: ReactNode;
}

/**
 * AdminRoute - Protects admin routes by checking:
 * 1. User is authenticated (via Clerk)
 * 2. User has admin role in their publicMetadata
 */
export const AdminRoute = ({ children }: AdminRouteProps) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-violet-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location, adminRequired: true }} replace />;
  }

  // Authenticated but not an admin - show access denied
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-white mb-3">
            Access Denied
          </h1>
          <p className="text-slate-400 mb-6">
            You don't have permission to access the admin panel. 
            Please contact an administrator if you believe this is an error.
          </p>
          <a 
            href="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    );
  }

  // User is authenticated and is an admin - render children
  return <>{children}</>;
};

export default AdminRoute;
