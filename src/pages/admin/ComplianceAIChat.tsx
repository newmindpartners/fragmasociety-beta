import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Bot,
  Send,
  RefreshCw,
  User,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Scale,
  MessageSquare,
  Loader2,
  Copy,
  Check,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  "What are the requirements for Professional investor classification?",
  "How do I assess suitability for a high-risk investment?",
  "What documents are required for a US accredited investor?",
  "Explain the difference between Retail and Professional compartments",
  "What are the KYC requirements for PEP investors?",
  "Which jurisdictions allow retail investors?",
];

const ComplianceAIChat = () => {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiStatus, setAiStatus] = useState<{ available: boolean; message: string } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    checkAIStatus();
  }, []);

  const checkAIStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/api/compliance/ai/status`);
      const data = await response.json();
      setAiStatus(data);
    } catch (error) {
      setAiStatus({ available: false, message: 'Unable to connect to AI service' });
    }
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatMessages = [...messages, userMessage].map(m => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch(`${API_URL}/api/compliance/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatMessages }),
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error: any) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I apologize, but I encountered an error: ${error.message}. Please try again.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([]);
  };

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    return content
      .split('\n')
      .map((line, i) => {
        // Headers
        if (line.startsWith('## ')) {
          return <h3 key={i} className="text-base font-semibold text-foreground mt-4 mb-2">{line.slice(3)}</h3>;
        }
        if (line.startsWith('### ')) {
          return <h4 key={i} className="text-sm font-semibold text-foreground mt-3 mb-1">{line.slice(4)}</h4>;
        }
        // Bold
        if (line.includes('**')) {
          const parts = line.split(/\*\*(.*?)\*\*/g);
          return (
            <p key={i} className="text-sm text-foreground/90 mb-1">
              {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
            </p>
          );
        }
        // List items
        if (line.startsWith('- ') || line.startsWith('• ')) {
          return <li key={i} className="text-sm text-foreground/90 ml-4 mb-1">{line.slice(2)}</li>;
        }
        if (line.match(/^\d+\. /)) {
          return <li key={i} className="text-sm text-foreground/90 ml-4 mb-1 list-decimal">{line.slice(3)}</li>;
        }
        // Empty lines
        if (!line.trim()) {
          return <br key={i} />;
        }
        // Regular text
        return <p key={i} className="text-sm text-foreground/90 mb-1">{line}</p>;
      });
  };

  return (
    <div className="theme-dashboard relative flex min-h-screen w-full bg-background text-foreground">
      {/* Sidebar */}
      <AdminSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        adminName={user?.fullName || user?.firstName || 'Admin'}
        adminEmail={user?.email || ''}
      />

      {/* Main Content */}
      <div
        className="flex min-h-screen flex-1 flex-col overflow-hidden transition-[margin-left] duration-300 ease-out"
        style={{
          marginLeft: sidebarCollapsed ? 72 : 256,
        }}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-border/60 bg-card/80 backdrop-blur-xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-lg">
                <Bot className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-serif font-semibold text-foreground">AI Compliance Officer</h1>
                  <Sparkles className="w-4 h-4 text-violet-400" />
                </div>
                <p className="text-sm text-muted-foreground">Dr. Marie-Claire Laurent - 20+ years Luxembourg compliance expertise</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {aiStatus && (
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs ${
                  aiStatus.available 
                    ? 'bg-green-500/10 text-green-400' 
                    : 'bg-yellow-500/10 text-yellow-400'
                }`}>
                  {aiStatus.available ? (
                    <CheckCircle2 className="w-3 h-3" />
                  ) : (
                    <AlertCircle className="w-3 h-3" />
                  )}
                  {aiStatus.available ? 'AI Online' : 'Rule-based Mode'}
                </div>
              )}
              <button
                onClick={clearChat}
                className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                Clear Chat
              </button>
            </div>
          </div>
        </header>

        {/* Chat Area */}
        <main className="flex-1 flex flex-col min-h-0 bg-background">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-6 lg:px-10">
            <div className="mx-auto max-w-3xl space-y-6">
              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center">
                    <Scale className="w-10 h-10 text-violet-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    Welcome to the AI Compliance Officer
                  </h2>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    I'm Dr. Marie-Claire Laurent, your AI compliance assistant. Ask me about investor classification, 
                    regulatory requirements, or any compliance-related questions.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                    {SUGGESTED_QUESTIONS.map((question, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                        onClick={() => sendMessage(question)}
                        className="text-left p-4 rounded-xl border border-border bg-card hover:border-violet-500/40 hover:bg-violet-500/5 transition-all group"
                      >
                        <div className="flex items-start gap-3">
                          <MessageSquare className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-foreground/80 group-hover:text-foreground">
                            {question}
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      {/* Avatar */}
                      <div className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center ${
                        message.role === 'user' 
                          ? 'bg-violet-600' 
                          : 'bg-gradient-to-br from-violet-500/20 to-purple-500/20'
                      }`}>
                        {message.role === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-violet-400" />
                        )}
                      </div>

                      {/* Message */}
                      <div className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'text-right' : ''}`}>
                        <div className={`inline-block rounded-2xl px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-violet-600 text-white'
                            : 'bg-card border border-border'
                        }`}>
                          {message.role === 'user' ? (
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          ) : (
                            <div className="prose prose-sm prose-invert max-w-none">
                              {formatMessage(message.content)}
                            </div>
                          )}
                        </div>
                        
                        {/* Actions */}
                        {message.role === 'assistant' && (
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              onClick={() => copyToClipboard(message.content, message.id)}
                              className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                              title="Copy response"
                            >
                              {copiedId === message.id ? (
                                <Check className="w-3.5 h-3.5 text-green-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <span className="text-[10px] text-muted-foreground">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-violet-400" />
                  </div>
                  <div className="bg-card border border-border rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-violet-400 animate-spin" />
                      <span className="text-sm text-muted-foreground">Analyzing your question...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-border bg-card/50 backdrop-blur-xl px-6 py-4 lg:px-10">
            <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
              <div className="relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a compliance question..."
                  rows={1}
                  className="w-full resize-none rounded-xl border border-border bg-background pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 min-h-[48px] max-h-32"
                  style={{ height: 'auto' }}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:hover:bg-violet-600 transition-colors"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
              <p className="mt-2 text-[10px] text-muted-foreground text-center">
                AI responses are for guidance only. Always verify with legal counsel for final decisions.
              </p>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ComplianceAIChat;
