import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, Calendar, ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface Update {
  id: string;
  deal_id: string;
  title: string;
  content: string;
  image_url: string | null;
  published_at: string;
}

interface DealUpdatesProps {
  dealId: string;
}

export const DealUpdates = ({ dealId }: DealUpdatesProps) => {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUpdates = async () => {
      const { data, error } = await supabase
        .from("deal_updates")
        .select("*")
        .eq("deal_id", dealId)
        .order("published_at", { ascending: false });

      if (error) {
        console.error("Error fetching updates:", error);
      } else {
        setUpdates(data || []);
      }
      setIsLoading(false);
    };

    fetchUpdates();
  }, [dealId]);

  return (
    <section className="py-16 px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
            <Bell className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Project Updates</h2>
            <p className="text-slate-500">Latest news and progress reports</p>
          </div>
        </motion.div>

        {/* Updates List */}
        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-slate-100 rounded-2xl h-48" />
            ))}
          </div>
        ) : updates.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-slate-100"
          >
            <Bell className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-700 mb-2">No updates yet</h3>
            <p className="text-slate-500">Project updates will appear here as they're published.</p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {updates.map((update, index) => (
              <motion.article
                key={update.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image */}
                {update.image_url ? (
                  <div className="aspect-[21/9] overflow-hidden">
                    <img
                      src={update.image_url}
                      alt={update.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="aspect-[21/9] bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-slate-300" />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(update.published_at), "MMMM d, yyyy")}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-violet-700 transition-colors">
                    {update.title}
                  </h3>

                  {/* Content */}
                  <p className="text-slate-600 leading-relaxed">{update.content}</p>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Subscribe CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center p-8 bg-gradient-to-br from-violet-50 to-slate-50 rounded-2xl border border-violet-100"
        >
          <Bell className="w-10 h-10 text-violet-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Stay Informed</h3>
          <p className="text-slate-600 mb-4">
            Get notified when new updates are posted for this project.
          </p>
          <a
            href="mailto:investors@fragma.co?subject=Subscribe to Project Updates"
            className="inline-flex items-center px-6 py-3 bg-violet-600 text-white font-medium rounded-xl hover:bg-violet-700 transition-colors"
          >
            Subscribe to Updates
          </a>
        </motion.div>
      </div>
    </section>
  );
};
