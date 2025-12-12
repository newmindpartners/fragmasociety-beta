import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MarketplaceFAQ } from "@/components/marketplace/MarketplaceFAQ";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <div className="pt-20">
        <MarketplaceFAQ />
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
