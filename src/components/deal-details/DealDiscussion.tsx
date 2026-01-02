import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Reply, Send, User, Clock, Quote, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

const API_URL = import.meta.env.VITE_API_URL || '';

interface Comment {
  id: string;
  dealId: string;
  userId: string;
  parentId: string | null;
  content: string;
  userName: string;
  userAvatar: string | null;
  createdAt: string;
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

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/deals/${dealId}/comments`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setComments([]);
          return;
        }
        throw new Error('Failed to fetch comments');
      }

      const data = await response.json();
      const commentsData = data.comments || [];

      // Organize comments into threads
      const topLevel = commentsData.filter((c: Comment) => !c.parentId);
      const replies = commentsData.filter((c: Comment) => c.parentId);

      const threaded = topLevel.map((comment: Comment) => ({
        ...comment,
        replies: replies.filter((r: Comment) => r.parentId === comment.id),
      }));

      setComments(threaded);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  }, [dealId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmitComment = async () => {
    if (!user || !newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/deals/${dealId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newComment,
          userId: user.id,
          userName: user.fullName || user.firstName || 'Anonymous',
          userAvatar: user.imageUrl,
        }),
      });

      if (!response.ok) throw new Error('Failed to post comment');

      setNewComment("");
      fetchComments();
      toast({
        title: "Comment posted",
        description: "Your comment has been added to the discussion.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitReply = async (parentId: string) => {
    if (!user || !replyContent.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/deals/${dealId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: replyContent,
          parentId,
          userId: user.id,
          userName: user.fullName || user.firstName || 'Anonymous',
          userAvatar: user.imageUrl,
        }),
      });

      if (!response.ok) throw new Error('Failed to post reply');

      setReplyContent("");
      setReplyingTo(null);
      fetchComments();
      toast({
        title: "Reply posted",
        description: "Your reply has been added.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to post reply. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const CommentComponent = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${isReply ? "ml-12 border-l-2 border-violet-100 pl-4" : ""}`}
    >
      <div className="flex gap-3">
        <Avatar className="h-10 w-10 border-2 border-violet-100">
          <AvatarImage src={comment.userAvatar || undefined} />
          <AvatarFallback className="bg-violet-100 text-violet-700">
            {comment.userName?.charAt(0).toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-slate-900">{comment.userName}</span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </span>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">{comment.content}</p>
          {!isReply && user && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 text-slate-500 hover:text-violet-600"
              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
            >
              <Reply className="h-4 w-4 mr-1" />
              Reply
            </Button>
          )}

          {/* Reply Form */}
          <AnimatePresence>
            {replyingTo === comment.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 flex gap-2"
              >
                <Textarea
                  placeholder="Write a reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="min-h-[60px] text-sm"
                />
                <Button
                  size="sm"
                  onClick={() => handleSubmitReply(comment.id)}
                  disabled={isSubmitting || !replyContent.trim()}
                  className="bg-violet-600 hover:bg-violet-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {comment.replies.map((reply) => (
                <CommentComponent key={reply.id} comment={reply} isReply />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-violet-600" />
        <h3 className="text-lg font-semibold text-slate-900">Discussion</h3>
        <span className="text-sm text-slate-500">({comments.length} comments)</span>
      </div>

      {/* New Comment Form */}
      {user ? (
        <div className="flex gap-3">
          <Avatar className="h-10 w-10 border-2 border-violet-100">
            <AvatarImage src={user.imageUrl} />
            <AvatarFallback className="bg-violet-100 text-violet-700">
              {user.firstName?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 flex gap-2">
            <Textarea
              placeholder="Share your thoughts on this deal..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[80px]"
            />
            <Button
              onClick={handleSubmitComment}
              disabled={isSubmitting || !newComment.trim()}
              className="bg-violet-600 hover:bg-violet-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 rounded-lg p-4 text-center">
          <p className="text-slate-600">Sign in to join the discussion</p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <CommentComponent key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
};
