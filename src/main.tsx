import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App.tsx";
import "./index.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Allow running without Clerk in development for testing
const isDevelopment = import.meta.env.DEV;

if (!PUBLISHABLE_KEY && !isDevelopment) {
  throw new Error("Missing Publishable Key");
}

const AppWrapper = () => {
  // In development without Clerk key, render app without Clerk provider
  if (!PUBLISHABLE_KEY) {
    console.warn("⚠️ Running without Clerk authentication (dev mode)");
    return <App />;
  }

  return (
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY} 
      afterSignInUrl="/"
      afterSignUpUrl="/"
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
      appearance={{
        layout: {
          logoImageUrl: window.location.origin + "/fragma-logo-v2.png",
          logoPlacement: "inside"
        },
        variables: {
          colorPrimary: "#8B5CF6", // Violet color to match logo
        }
      }}
    >
      <App />
    </ClerkProvider>
  );
};

createRoot(document.getElementById("root")!).render(<AppWrapper />);
