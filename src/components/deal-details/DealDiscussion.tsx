import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Reply, Send, User, Clock, Quote, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

interface Comment {
  id: string;
  deal_id: string;
  user_id: string;
  parent_id: string | null;
  content: string;
  user_name: string;
  user_avatar: string | null;
  created_at: string;
  replies?: Comment[];
}

interface DealDiscussionProps {
  dealId: string;
}

export const DealDiscussion = ({ dealId }: DealDiscussionProps) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("deal_comments")
      .select("*")
      .eq("deal_id", dealId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching comments:", error);
      return;
    }

    // Organize comments into threads
    const topLevel = data?.filter((c) => !c.parent_id) || [];
    const replies = data?.filter((c) => c.parent_id) || [];

    const threaded = topLevel.map((comment) => ({
      ...comment,
      replies: replies.filter((r) => r.parent_id === comment.id),
    }));

    setComments(threaded);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchComments();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("deal-comments")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "deal_comments",
          filter: `deal_id=eq.${dealId}`,
        },
        () => {
          fetchComments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [dealId]);

  const handleSubmitComment = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to join the discussion.",
        variant: "destructive",
      });
      return;
    }

    if (!newComment.trim()) return;

    setIsSubmitting(true);

    const { error } = await supabase.from("deal_comments").insert({
      deal_id: dealId,
      user_id: user.id,
      content: newComment.trim(),
      user_name: user.email?.split("@")[0] || "Anonymous",
      user_avatar: null,
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      });
    } else {
      setNewComment("");
      toast({
        title: "Comment posted",
        description: "Your comment has been added to the discussion.",
      });
    }

    setIsSubmitting(false);
  };

  const handleSubmitReply = async (parentId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to reply.",
        variant: "destructive",
      });
      return;
    }

    if (!replyContent.trim()) return;

    setIsSubmitting(true);

    const { error } = await supabase.from("deal_comments").insert({
      deal_id: dealId,
      user_id: user.id,
      parent_id: parentId,
      content: replyContent.trim(),
      user_name: user.email?.split("@")[0] || "Anonymous",
      user_avatar: null,
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to post reply. Please try again.",
        variant: "destructive",
      });
    } else {
      setReplyContent("");
      setReplyingTo(null);
    }

    setIsSubmitting(false);
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Premium background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-radial from-violet-100/40 via-slate-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gradient-radial from-amber-50/30 to-transparent rounded-full blur-3xl" />
        {/* Subtle pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Premium Header */}
        <div className="max-w-4xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-5 mb-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-violet-500" />
              <div className="w-16 h-px bg-gradient-to-r from-violet-400 to-transparent" />
            </div>
            <span className="text-xs tracking-[0.35em] uppercase text-slate-500 font-semibold">
              Community
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 leading-[1.05] mb-6"
          >
            Join the <br />
            <span className="relative inline-block">
              <span className="italic font-serif text-slate-700">Discussion</span>
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-violet-400 to-transparent rounded-full"
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
            Share insights, ask questions, and connect with fellow investors
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex items-center gap-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <p className="text-2xl font-light text-slate-900">{comments.length}</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Comments</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="max-w-4xl">
          {/* New Comment Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative mb-12"
          >
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl shadow-slate-200/50">
              {/* Form header */}
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="w-12 h-12 border-2 border-slate-100">
                  <AvatarFallback className="bg-gradient-to-br from-violet-100 to-violet-50 text-violet-700">
                    {user ? user.email?.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-slate-900">
                    {user ? user.email?.split("@")[0] : "Guest"}
                  </p>
                  <p className="text-sm text-slate-500">
                    {user ? "Share your thoughts" : "Sign in to participate"}
                  </p>
                </div>
              </div>

              <Textarea
                placeholder={user ? "What are your thoughts on this opportunity?" : "Sign in to join the discussion..."}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[120px] bg-slate-50 border-slate-200 focus:border-violet-300 focus:ring-violet-100 resize-none rounded-2xl text-slate-700 placeholder:text-slate-400 mb-6"
                disabled={!user}
              />
              
              <div className="flex justify-between items-center">
                <p className="text-xs text-slate-400">
                  Be respectful and constructive
                </p>
                <Button
                  onClick={handleSubmitComment}
                  disabled={!user || !newComment.trim() || isSubmitting}
                  className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-6 h-11 shadow-lg shadow-slate-900/20"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Post Comment
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Comments List */}
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-white rounded-2xl h-40 border border-slate-200" />
              ))}
            </div>
          ) : comments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border border-slate-200 p-16 text-center"
            >
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-100 to-violet-50 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-violet-500" />
              </div>
              <h3 className="text-2xl font-light text-slate-900 mb-3">Start the conversation</h3>
              <p className="text-slate-500 max-w-md mx-auto">
                Be the first to share your thoughts on this investment opportunity.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {comments.map((comment, index) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="p-6 lg:p-8">
                      {/* Comment Header */}
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12 border-2 border-slate-100 flex-shrink-0">
                          <AvatarImage src={comment.user_avatar || undefined} />
                          <AvatarFallback className="bg-gradient-to-br from-slate-100 to-slate-50 text-slate-700 font-medium">
                            {comment.user_name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center flex-wrap gap-3 mb-3">
                            <span className="font-semibold text-slate-900">{comment.user_name}</span>
                            <span className="text-slate-400 text-sm flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                            </span>
                          </div>
                          
                          {/* Comment content with quote styling */}
                          <div className="relative">
                            <Quote className="absolute -left-1 -top-1 w-6 h-6 text-slate-100" />
                            <p className="text-slate-700 leading-relaxed pl-6">{comment.content}</p>
                          </div>
                          
                          {/* Reply Button */}
                          <button
                            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                            className="mt-4 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-violet-600 transition-colors group/reply"
                          >
                            <Reply className="w-4 h-4" />
                            <span className="relative">
                              Reply
                              <span className="absolute left-0 -bottom-0.5 w-full h-px bg-violet-600 origin-left scale-x-0 group-hover/reply:scale-x-100 transition-transform duration-300" />
                            </span>
                          </button>

                          {/* Reply Form */}
                          <AnimatePresence>
                            {replyingTo === comment.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-6 overflow-hidden"
                              >
                                <div className="pl-6 border-l-2 border-violet-200">
                                  <Textarea
                                    placeholder="Write a thoughtful reply..."
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                    className="min-h-[100px] bg-slate-50 border-slate-200 resize-none rounded-xl mb-4"
                                  />
                                  <div className="flex gap-3">
                                    <Button
                                      size="sm"
                                      onClick={() => handleSubmitReply(comment.id)}
                                      disabled={!replyContent.trim() || isSubmitting}
                                      className="bg-violet-600 hover:bg-violet-700 rounded-lg"
                                    >
                                      <Send className="w-3.5 h-3.5 mr-1.5" />
                                      Reply
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => {
                                        setReplyingTo(null);
                                        setReplyContent("");
                                      }}
                                      className="text-slate-500 hover:text-slate-700"
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Replies */}
                          {comment.replies && comment.replies.length > 0 && (
                            <div className="mt-6 space-y-4 pl-6 border-l-2 border-slate-100">
                              {comment.replies.map((reply) => (
                                <motion.div 
                                  key={reply.id} 
                                  className="flex items-start gap-3 pt-4 first:pt-0"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                >
                                  <Avatar className="w-9 h-9 border border-slate-100 flex-shrink-0">
                                    <AvatarImage src={reply.user_avatar || undefined} />
                                    <AvatarFallback className="bg-slate-100 text-slate-600 text-xs font-medium">
                                      {reply.user_name.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center flex-wrap gap-2 mb-1">
                                      <span className="font-medium text-slate-800 text-sm">{reply.user_name}</span>
                                      <span className="text-slate-400 text-xs">
                                        {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}
                                      </span>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed">{reply.content}</p>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
