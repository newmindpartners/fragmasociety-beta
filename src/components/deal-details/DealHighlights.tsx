import { motion } from "framer-motion";
import type { DealData } from "@/types/deal";

interface DealHighlightsProps {
  deal: DealData;
}

// Generate highlights based on deal data
const generateHighlights = (deal: DealData): string[] => {
  const highlights: string[] = [];
  
  // Add leader/team highlights
  if (deal.team && deal.team.length > 0) {
    const leader = deal.team[0];
    if (leader.credentials && leader.credentials.length > 0) {
      highlights.push(`Led by ${leader.name}, ${leader.credentials[0]}`);
    }
  }
  
  // Add track record highlights
  if (deal.trackRecord && deal.trackRecord.length > 0) {
    const totalProfit = deal.totalPastProfit || `${deal.trackRecord.length} successful exits`;
    highlights.push(`Proven track record with ${totalProfit} in realized profits`);
  }
  
  // Add target return highlight
  if (deal.targetReturn) {
    highlights.push(`Target returns of ${deal.targetReturn} annually`);
  }
  
  // Add market-specific highlights based on category
  if (deal.category === "Real Estate") {
    highlights.push("Access to off-market luxury properties in prime locations");
    highlights.push("Institutional-grade development process with professional governance");
  }
  
  if (deal.category === "Sports") {
    highlights.push("Revenue participation in prize winnings and performance bonuses");
    highlights.push("Direct exposure to elite competition results");
  }
  
  if (deal.category === "Film") {
    highlights.push("Structured recoupment from theatrical, streaming, and ancillary revenues");
    highlights.push("Portfolio approach spreads risk across multiple productions");
  }
  
  if (deal.category === "Luxury") {
    highlights.push("Tangible assets with intrinsic value and appreciation potential");
    highlights.push("Expert curation from industry-leading specialists");
  }
  
  // Add term highlight
  if (deal.term) {
    highlights.push(`Investment horizon of ${deal.term} with defined exit strategy`);
  }
  
  // Add special opportunity highlight
  if (deal.specialOpportunity) {
    highlights.push(deal.specialOpportunity.description.split('.')[0]);
  }
  
  // Add market highlights if available
  if (deal.marketHighlights && deal.marketHighlights.length > 0) {
    highlights.push(...deal.marketHighlights.slice(0, 2));
  }
  
  // Add accessible investment highlight
  if (deal.minTicket) {
    highlights.push(`Accessible from ${deal.minTicket} minimum investment`);
  }
  
  return highlights.slice(0, 7); // Limit to 7 highlights
};

export const DealHighlights = ({ deal }: DealHighlightsProps) => {
  const highlights = generateHighlights(deal);

  if (highlights.length === 0) return null;

  return (
    <section className="py-16 bg-slate-50/50">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <h2 
            className="text-3xl md:text-4xl font-medium text-slate-800 mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Highlights
          </h2>
          <div className="w-12 h-0.5 bg-slate-300 mb-10" />

          {/* Highlights List */}
          <ul className="space-y-5">
            {highlights.map((highlight, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex items-start gap-4"
              >
                <span className="mt-2.5 w-2 h-2 rounded-full bg-slate-400 flex-shrink-0" />
                <span className="text-lg md:text-xl text-slate-600 leading-relaxed">
                  {highlight}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};
