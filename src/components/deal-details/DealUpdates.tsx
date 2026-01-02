import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Calendar, ImageIcon, ArrowRight, Sparkles } from "lucide-react";
import { format } from "date-fns";

const API_URL = import.meta.env.VITE_API_URL || '';

interface Update {
  id: string;
  dealId: string;
  title: string;
  content: string;
  imageUrl: string | null;
  publishedAt: string;
}

interface DealUpdatesProps {
  dealId: string;
}

export const DealUpdates = ({ dealId }: DealUpdatesProps) => {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUpdate, setSelectedUpdate] = useState<string | null>(null);

  const fetchUpdates = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/deals/${dealId}/updates`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setUpdates([]);
          return;
        }
        throw new Error('Failed to fetch updates');
      }

      const data = await response.json();
      setUpdates(data.updates || []);
    } catch (error) {
      console.error("Error fetching updates:", error);
      setUpdates([]);
    } finally {
      setIsLoading(false);
    }
  }, [dealId]);

  useEffect(() => {
    fetchUpdates();
  }, [fetchUpdates]);

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Premium background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-amber-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-gradient-radial from-violet-50/40 to-transparent rounded-full blur-3xl" />
        {/* Subtle pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Premium Header */}
        <div className="max-w-4xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-5 mb-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <div className="w-16 h-px bg-gradient-to-r from-amber-400 to-transparent" />
            </div>
            <span className="text-xs tracking-[0.35em] uppercase text-slate-500 font-semibold">
              Latest News
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 leading-[1.05] mb-6"
          >
            Project <br />
            <span className="relative inline-block">
              <span className="italic font-serif text-slate-700">Updates</span>
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-transparent rounded-full"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 font-light max-w-xl"
          >
            Stay informed with the latest developments and progress reports
          </motion.p>
        </div>

        {/* Updates List */}
        {isLoading ? (
          <div className="grid gap-6 max-w-5xl">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="animate-pulse bg-white rounded-3xl h-48 border border-slate-100 shadow-lg" 
              />
            ))}
          </div>
        ) : updates.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="relative bg-white rounded-3xl border border-slate-200 p-16 text-center overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
              
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-amber-500" />
              </div>
              <h3 className="text-2xl font-light text-slate-900 mb-3">No updates yet</h3>
              <p className="text-slate-500 max-w-md mx-auto">
                Project updates will appear here as they're published. Check back soon for the latest news.
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="max-w-5xl">
            {/* Featured/Latest Update */}
            {updates.length > 0 && (
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <div className="group relative bg-white rounded-3xl border border-slate-200 overflow-hidden hover:border-slate-300 hover:shadow-2xl transition-all duration-500">
                  <div className="grid lg:grid-cols-2">
                    {/* Image */}
                    <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden bg-slate-100">
                      {updates[0].imageUrl ? (
                        <img
                          src={updates[0].imageUrl}
                          alt={updates[0].title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center">
                          <ImageIcon className="w-16 h-16 text-slate-300" />
                        </div>
                      )}
                      {/* Featured badge */}
                      <div className="absolute top-6 left-6 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold text-slate-900 shadow-lg">
                        Latest Update
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-10 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-amber-600" />
                        </div>
                        <span className="text-sm text-slate-500 font-medium">
                          {format(new Date(updates[0].publishedAt), "MMMM d, yyyy")}
                        </span>
                      </div>

                      <h3 className="text-2xl lg:text-3xl font-light text-slate-900 mb-4 leading-tight group-hover:text-slate-700 transition-colors">
                        {updates[0].title}
                      </h3>

                      <p className="text-slate-600 leading-relaxed mb-8 line-clamp-3">
                        {updates[0].content}
                      </p>

                      <button 
                        onClick={() => setSelectedUpdate(selectedUpdate === updates[0].id ? null : updates[0].id)}
                        className="inline-flex items-center gap-2 text-slate-900 font-medium group/btn"
                      >
                        <span className="relative">
                          Read full update
                          <span className="absolute left-0 -bottom-0.5 w-full h-px bg-slate-900 origin-left scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300" />
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {selectedUpdate === updates[0].id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-slate-100 overflow-hidden"
                      >
                        <div className="p-10 lg:p-12 bg-slate-50">
                          <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                            {updates[0].content}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            )}

            {/* Other Updates */}
            {updates.length > 1 && (
              <div className="grid md:grid-cols-2 gap-6">
                {updates.slice(1).map((update, index) => (
                  <motion.article
                    key={update.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-slate-300 hover:shadow-xl transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative aspect-[2/1] overflow-hidden bg-slate-100">
                      {update.imageUrl ? (
                        <img
                          src={update.imageUrl}
                          alt={update.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center">
                          <ImageIcon className="w-10 h-10 text-slate-300" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        {format(new Date(update.publishedAt), "MMMM d, yyyy")}
                      </div>

                      <h3 className="text-lg font-medium text-slate-900 mb-2 group-hover:text-slate-700 transition-colors line-clamp-2">
                        {update.title}
                      </h3>

                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4">
                        {update.content}
                      </p>

                      <button 
                        onClick={() => setSelectedUpdate(selectedUpdate === update.id ? null : update.id)}
                        className="text-sm text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1"
                      >
                        Read more
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {selectedUpdate === update.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-slate-100 overflow-hidden"
                        >
                          <div className="p-6 bg-slate-50">
                            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                              {update.content}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Subscribe CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 max-w-3xl"
        >
          <div className="relative bg-slate-900 rounded-3xl p-12 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-radial from-amber-500/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-radial from-violet-500/10 to-transparent rounded-full blur-3xl" />
            
            <div className="relative flex flex-col md:flex-row items-center gap-8">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Bell className="w-8 h-8 text-white" />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-light text-white mb-2">Stay Informed</h3>
                <p className="text-slate-400">
                  Get notified when new updates are posted for this project.
                </p>
              </div>

              <a
                href="mailto:investors@fragma.co?subject=Subscribe to Project Updates"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-medium rounded-xl hover:bg-slate-100 transition-colors group flex-shrink-0"
              >
                Subscribe
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
