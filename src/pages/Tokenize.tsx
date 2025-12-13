import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TokenizeHero } from "@/components/tokenize/TokenizeHero";
import { TokenizeUseCases } from "@/components/tokenize/TokenizeUseCases";
import { TokenizeProcess } from "@/components/tokenize/TokenizeProcess";
import { TokenizeCTA } from "@/components/tokenize/TokenizeCTA";

const Tokenize = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <TokenizeHero />
      <TokenizeUseCases />
      <TokenizeProcess />
      <TokenizeCTA />
      <Footer />
    </div>
  );
};

export default Tokenize;
