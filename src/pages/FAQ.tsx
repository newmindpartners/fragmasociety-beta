import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FAQHero } from "@/components/faq/FAQHero";
import { FAQSearch } from "@/components/faq/FAQSearch";
import { FAQCategories } from "@/components/faq/FAQCategories";
import { FAQContact } from "@/components/faq/FAQContact";
import { faqCategories } from "@/components/faq/faqData";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return faqCategories;

    const query = searchQuery.toLowerCase();
    
    return faqCategories
      .map(category => ({
        ...category,
        faqs: category.faqs.filter(
          faq =>
            faq.question.toLowerCase().includes(query) ||
            faq.answer.toLowerCase().includes(query)
        )
      }))
      .filter(category => category.faqs.length > 0);
  }, [searchQuery]);

  const totalResults = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.faqs.length, 0);
  }, [filteredCategories]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      <Navbar />
      <div className="pt-20">
        <FAQHero />
        <FAQSearch 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          totalResults={totalResults}
        />
        <FAQCategories 
          categories={filteredCategories}
          searchQuery={searchQuery}
        />
        <FAQContact />
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
