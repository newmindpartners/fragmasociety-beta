import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SignatureDealHero } from "@/components/signature-deal/SignatureDealHero";
import { SignatureDealWhy } from "@/components/signature-deal/SignatureDealWhy";
import { SignatureDealProcess } from "@/components/signature-deal/SignatureDealProcess";
import { SignatureDealAudience } from "@/components/signature-deal/SignatureDealAudience";
import { SignatureDealBenefits } from "@/components/signature-deal/SignatureDealBenefits";
import { SignatureDealCTA } from "@/components/signature-deal/SignatureDealCTA";

const SignatureDeal = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <SignatureDealHero />
      <SignatureDealWhy />
      <SignatureDealProcess />
      <SignatureDealAudience />
      <SignatureDealBenefits />
      <SignatureDealCTA />
      <Footer />
    </div>
  );
};

export default SignatureDeal;
