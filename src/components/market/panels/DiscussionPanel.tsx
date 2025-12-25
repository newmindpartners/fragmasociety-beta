import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, ThumbsUp, Reply, Send, User, Clock, TrendingUp, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const discussions = [
  {
    id: 1,
    author: "InvestorMike",
    avatar: null,
    date: "2 hours ago",
    content: "Really impressed with the Q4 distribution announcement. The 6.8% annualized yield is competitive with other real estate tokens I've seen. Anyone know if they plan to maintain this level going forward?",
    likes: 24,
    replies: 3,
    isLiked: false,
  },
  {
    id: 2,
    author: "RealEstateDAO",
    avatar: null,
    date: "5 hours ago",
    content: "The new Malibu Road acquisition looks solid. Ocean-front properties in that area rarely come to market. This should appreciate well over the next few years.",
    likes: 18,
    replies: 1,
    isLiked: true,
  },
  {
    id: 3,
    author: "TokenAnalyst",
    avatar: null,
    date: "1 day ago",
    content: "Quick analysis: The management fee reduction to 2% is significant. For a $10k investment, that's an extra $50/year in your pocket. Compound that over 5 years with reinvestment... 🚀",
    likes: 42,
    replies: 7,
    isLiked: false,
  },
  {
    id: 4,
    author: "CryptoCarl",
    avatar: null,
    date: "2 days ago",
    content: "Anyone else excited about the secondary market liquidity? Finally able to trade these shares without waiting for redemption windows.",
    likes: 31,
    replies: 5,
    isLiked: false,
  },
];

const communityStats = [
  { label: "Total Members", value: "1,247" },
  { label: "Posts This Week", value: "89" },
  { label: "Avg. Response Time", value: "2.4h" },
];

export const DiscussionPanel = () => {
  const [newComment, setNewComment] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="grid lg:grid-cols-[1fr,320px] gap-6"
    >
      {/* Main Discussion Thread */}
      <div className="space-y-5">
        {/* New Comment Box */}
        <Card className="p-4 border-border/50">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 space-y-3">
              <Textarea
                placeholder="Share your thoughts on this asset..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[80px] resize-none border-border/50"
              />
              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">
                  Be respectful and constructive in discussions
                </p>
                <Button size="sm" className="gap-2" disabled={!newComment.trim()}>
                  <Send className="w-4 h-4" />
                  Post
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Discussion Posts */}
        <div className="space-y-4">
          {discussions.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-5 border-border/50 hover:border-primary/20 transition-colors">
                <div className="flex gap-4">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-foreground">{post.author}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.date}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {post.content}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                      <button className={cn(
                        "flex items-center gap-1.5 text-sm font-medium transition-colors",
                        post.isLiked ? "text-primary" : "text-muted-foreground hover:text-foreground"
                      )}>
                        <ThumbsUp className={cn("w-4 h-4", post.isLiked && "fill-current")} />
                        {post.likes}
                      </button>
                      <button className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        <Reply className="w-4 h-4" />
                        {post.replies} replies
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center">
          <Button variant="outline" className="gap-2">
            Load More Discussions
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-5">
        {/* Community Stats */}
        <Card className="p-5 border-border/50">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-primary" />
            Community Stats
          </h3>
          <div className="space-y-3">
            {communityStats.map((stat) => (
              <div key={stat.label} className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <span className="font-semibold text-foreground">{stat.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Trending Topics */}
        <Card className="p-5 border-border/50">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Trending Topics
          </h3>
          <div className="space-y-2">
            {["Q4 Distribution", "Property Valuation", "Fee Reduction", "Secondary Trading"].map((topic) => (
              <button
                key={topic}
                className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
              >
                #{topic.replace(/\s+/g, '')}
              </button>
            ))}
          </div>
        </Card>

        {/* Guidelines */}
        <Card className="p-5 border-border/50 bg-muted/20">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-muted-foreground" />
            Community Guidelines
          </h3>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li>• Be respectful and constructive</li>
            <li>• No financial advice or guarantees</li>
            <li>• Report suspicious activity</li>
            <li>• Keep discussions on-topic</li>
          </ul>
        </Card>
      </div>
    </motion.div>
  );
};
