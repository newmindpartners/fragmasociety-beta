import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { usePullToRefresh } from "@/hooks/usePullToRefresh";

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  className?: string;
}

export const PullToRefresh = ({ onRefresh, children, className = "" }: PullToRefreshProps) => {
  const { pullDistance, isRefreshing, isPulling, handlers } = usePullToRefresh({
    onRefresh,
    threshold: 80,
  });

  const progress = Math.min(pullDistance / 80, 1);
  const showIndicator = pullDistance > 10 || isRefreshing;

  return (
    <div 
      className={`relative ${className}`}
      {...handlers}
    >
      {/* Pull indicator */}
      <AnimatePresence>
        {showIndicator && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: 1, 
              y: Math.min(pullDistance - 20, 60),
            }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed left-1/2 -translate-x-1/2 z-50 pointer-events-none"
            style={{ top: 80 }}
          >
            <motion.div 
              className="w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center"
              animate={{
                scale: isRefreshing ? 1 : 0.8 + progress * 0.2,
              }}
            >
              <motion.div
                animate={{
                  rotate: isRefreshing ? 360 : progress * 180,
                }}
                transition={isRefreshing ? {
                  repeat: Infinity,
                  duration: 1,
                  ease: "linear",
                } : {
                  duration: 0.1,
                }}
              >
                <RefreshCw 
                  className={`w-5 h-5 transition-colors ${
                    progress >= 1 || isRefreshing ? 'text-violet-600' : 'text-slate-400'
                  }`}
                />
              </motion.div>
            </motion.div>
            
            {/* Pull hint text */}
            {isPulling && !isRefreshing && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: progress > 0.3 ? 1 : 0 }}
                className="text-xs text-slate-500 text-center mt-2 whitespace-nowrap"
              >
                {progress >= 1 ? "Release to refresh" : "Pull to refresh"}
              </motion.p>
            )}
            
            {isRefreshing && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-violet-600 text-center mt-2 whitespace-nowrap"
              >
                Refreshing...
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content with pull effect */}
      <motion.div
        animate={{
          y: isPulling || isRefreshing ? Math.min(pullDistance * 0.3, 30) : 0,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        {children}
      </motion.div>
    </div>
  );
};
