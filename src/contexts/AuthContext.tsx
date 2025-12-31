import { createContext, useContext, ReactNode } from "react";
import { useUser, useClerk, useSession } from "@clerk/clerk-react";

// Check if Clerk is available (publishable key is set)
const isClerkAvailable = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

interface AuthContextType {
  user: any | null;
  session: any | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider that uses Clerk hooks
const ClerkAuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoaded: userLoaded } = useUser();
  const { session, isLoaded: sessionLoaded } = useSession();
  const { signOut } = useClerk();

  const loading = !userLoaded || !sessionLoaded;

  return (
    <AuthContext.Provider value={{ 
      user: user ? {
        ...user,
        email: user.primaryEmailAddress?.emailAddress
      } : null, 
      session: session ?? null, 
      loading, 
      signOut: () => signOut().then(() => {}) 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Mock provider for development without Clerk
const MockAuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthContext.Provider value={{ 
      user: null, 
      session: null, 
      loading: false, 
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
