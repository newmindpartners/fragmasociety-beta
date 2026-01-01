import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App.tsx";
import "./index.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const AppWrapper = () => {
  // Allow running without Clerk if key is not set
  if (!PUBLISHABLE_KEY) {
    console.warn("⚠️ Running without Clerk authentication");
    return <App />;
  }

  return (
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY} 
      afterSignInUrl="/auth"
      afterSignUpUrl="/auth"
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
