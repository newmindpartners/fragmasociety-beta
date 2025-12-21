import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Reply, Send, User, Clock } from "lucide-react";
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
    <section className="py-16 px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-violet-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Discussion</h2>
            <p className="text-slate-500">
              {comments.length} comment{comments.length !== 1 ? "s" : ""}
            </p>
          </div>
        </motion.div>

        {/* New Comment Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100"
        >
          <Textarea
            placeholder={user ? "Share your thoughts or questions..." : "Sign in to join the discussion..."}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px] bg-white border-slate-200 focus:border-violet-300 resize-none mb-4"
            disabled={!user}
          />
          <div className="flex justify-end">
            <Button
              onClick={handleSubmitComment}
              disabled={!user || !newComment.trim() || isSubmitting}
              className="bg-violet-600 hover:bg-violet-700 text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              Post Comment
            </Button>
          </div>
        </motion.div>

        {/* Comments List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-slate-100 rounded-xl h-32" />
            ))}
          </div>
        ) : comments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-100"
          >
            <MessageCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-700 mb-2">No comments yet</h3>
            <p className="text-slate-500">Be the first to start the discussion!</p>
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
                className="bg-white rounded-xl border border-slate-200 p-5"
              >
                {/* Comment Header */}
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={comment.user_avatar || undefined} />
                    <AvatarFallback className="bg-violet-100 text-violet-700">
                      <User className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-slate-900">{comment.user_name}</span>
                      <span className="text-slate-400 text-sm flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{comment.content}</p>
                    
                    {/* Reply Button */}
                    <button
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                      className="mt-3 text-sm text-violet-600 hover:text-violet-700 flex items-center gap-1"
                    >
                      <Reply className="w-4 h-4" />
                      Reply
                    </button>

                    {/* Reply Form */}
                    {replyingTo === comment.id && (
                      <div className="mt-4 pl-4 border-l-2 border-violet-200">
                        <Textarea
                          placeholder="Write a reply..."
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          className="min-h-[80px] bg-slate-50 border-slate-200 resize-none mb-3"
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleSubmitReply(comment.id)}
                            disabled={!replyContent.trim() || isSubmitting}
                            className="bg-violet-600 hover:bg-violet-700"
                          >
                            Reply
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setReplyingTo(null);
                              setReplyContent("");
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-4 space-y-4 pl-4 border-l-2 border-slate-100">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex items-start gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={reply.user_avatar || undefined} />
                              <AvatarFallback className="bg-slate-100 text-slate-600 text-xs">
                                <User className="w-4 h-4" />
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-slate-800 text-sm">{reply.user_name}</span>
                                <span className="text-slate-400 text-xs">
                                  {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}
                                </span>
                              </div>
                              <p className="text-slate-600 text-sm">{reply.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
