import { createContext, useContext, ReactNode } from "react";
import { useUser, useClerk, useSession } from "@clerk/clerk-react";

// Check if Clerk is available (publishable key is set)
const isClerkAvailable = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

interface AuthContextType {
  user: { id: string; email?: string } | null;
  session: any | null;
  loading: boolean;
  isLoading: boolean; // Alias for loading
  isAuthenticated: boolean;
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

  return (
    <AuthContext.Provider value={{ 
      user: user ? {
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress
      } : null, 
      session: session ?? null, 
      loading,
      isLoading: loading,
      isAuthenticated,
      signOut: () => signOut().then(() => {}) 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Mock provider for development without Clerk
const MockAuthProvider = ({ children }: { children: ReactNode }) => {
  // Provide a demo user for development/testing
  const demoUser = {
    id: 'demo-user-123',
    email: 'demo@fragma.io'
  };

  return (
    <AuthContext.Provider value={{ 
      user: demoUser, 
      session: null, 
      loading: false,
      isLoading: false,
      isAuthenticated: true, // Assume authenticated for demo
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
