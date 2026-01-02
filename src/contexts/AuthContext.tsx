import { createContext, useContext, ReactNode } from "react";
import { useUser, useClerk, useSession } from "@clerk/clerk-react";

// Check if Clerk is available (publishable key is set)
const isClerkAvailable = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Admin roles
export type AdminRole = 'super_admin' | 'admin' | 'moderator';

// Hardcoded super admin emails (fallback if Clerk metadata not set)
const SUPER_ADMIN_EMAILS = [
  'hi@fragmasociety.com',
  'laurent@fragmasociety.com',
  'admin@fragmasociety.com',
];

interface AuthContextType {
  user: { 
    id: string; 
    email?: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    imageUrl?: string;
  } | null;
  session: any | null;
  loading: boolean;
  isLoading: boolean; // Alias for loading
  isAuthenticated: boolean;
  isAdmin: boolean;
  adminRole: AdminRole | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider that uses Clerk hooks
const ClerkAuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoaded: userLoaded } = useUser();
  const { session, isLoaded: sessionLoaded } = useSession();
  const { signOut } = useClerk();

  const loading = !userLoaded || !sessionLoaded;
  const isAuthenticated = !!user;
  
  // Check admin role from user's public metadata OR hardcoded email list
  const userEmail = user?.primaryEmailAddress?.emailAddress?.toLowerCase();
  const isSuperAdminByEmail = userEmail && SUPER_ADMIN_EMAILS.includes(userEmail);
  const adminRole = (user?.publicMetadata?.role as AdminRole) || (isSuperAdminByEmail ? 'super_admin' : null);
  const isAdmin = !!adminRole;

  return (
    <AuthContext.Provider value={{ 
      user: user ? {
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        firstName: user.firstName || undefined,
        lastName: user.lastName || undefined,
        fullName: user.fullName || undefined,
        imageUrl: user.imageUrl || undefined,
      } : null, 
      session: session ?? null, 
      loading,
      isLoading: loading,
      isAuthenticated,
      isAdmin,
      adminRole,
      signOut: () => signOut().then(() => {}) 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Mock provider for development without Clerk - no fake users
const MockAuthProvider = ({ children }: { children: ReactNode }) => {
  // No mock user - require real authentication
  return (
    <AuthContext.Provider value={{ 
      user: null, 
      session: null, 
      loading: false,
      isLoading: false,
      isAuthenticated: false,
      isAdmin: false,
      adminRole: null,
      signOut: async () => {} 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the appropriate provider based on Clerk availability
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  if (!isClerkAvailable) {
    return <MockAuthProvider>{children}</MockAuthProvider>;
  }
  return <ClerkAuthProvider>{children}</ClerkAuthProvider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
