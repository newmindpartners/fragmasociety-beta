import { motion } from "framer-motion";
import { Calendar, FileText, TrendingUp, Bell, ExternalLink, Image } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const updates = [
  {
    id: 1,
    date: "Dec 20, 2024",
    title: "Q4 2024 Distribution Announced",
    description: "We are pleased to announce a quarterly distribution of $0.42 per share, representing a 6.8% annualized yield. Payments will be processed on December 28th.",
    type: "distribution",
    isNew: true,
  },
  {
    id: 2,
    date: "Dec 15, 2024",
    title: "Property Valuation Update",
    description: "Independent appraisal completed for the Malibu property portfolio. Total valuation increased by 12.4% year-over-year, reflecting strong coastal real estate demand.",
    type: "valuation",
    isNew: true,
  },
  {
    id: 3,
    date: "Nov 28, 2024",
    title: "New Acquisition Completed",
    description: "Successfully closed on a 4-bedroom oceanfront property at 24681 Malibu Road. This acquisition expands our portfolio to 6 premium properties.",
    type: "acquisition",
    hasImage: true,
  },
  {
    id: 4,
    date: "Nov 10, 2024",
    title: "Management Fee Reduction",
    description: "Effective January 1, 2025, management fees will be reduced from 2.5% to 2.0% annually, reflecting our commitment to maximizing investor returns.",
    type: "announcement",
  },
  {
    id: 5,
    date: "Oct 15, 2024",
    title: "Q3 2024 Distribution Paid",
    description: "Quarterly distribution of $0.38 per share has been successfully distributed to all shareholders. Total distributed: $156,420.",
    type: "distribution",
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "distribution": return <TrendingUp className="w-4 h-4" />;
    case "valuation": return <FileText className="w-4 h-4" />;
    case "acquisition": return <Image className="w-4 h-4" />;
    default: return <Bell className="w-4 h-4" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "distribution": return "bg-green-500/10 text-green-600 border-green-500/20";
    case "valuation": return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    case "acquisition": return "bg-purple-500/10 text-purple-600 border-purple-500/20";
    default: return "bg-muted text-muted-foreground border-border/50";
  }
};

export const UpdatesPanel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Latest Updates</h2>
          <p className="text-sm text-muted-foreground">Stay informed on asset performance and announcements</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Bell className="w-4 h-4" />
          Subscribe
        </Button>
      </div>

      {/* Updates List */}
      <div className="space-y-4">
        {updates.map((update, index) => (
          <motion.div
            key={update.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-5 border-border/50 hover:border-primary/30 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                {/* Type Badge */}
                <div className={`p-2.5 rounded-lg border ${getTypeColor(update.type)}`}>
                  {getTypeIcon(update.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {update.date}
                    </span>
                    {update.isNew && (
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-primary text-primary-foreground rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {update.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {update.description}
                  </p>
                  
                  {update.hasImage && (
                    <div className="mt-3 h-32 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Property Image</span>
                    </div>
                  )}
                </div>

                {/* Action */}
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center pt-4">
        <Button variant="outline" className="gap-2">
          Load More Updates
        </Button>
      </div>
    </motion.div>
  );
};
