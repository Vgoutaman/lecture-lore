import { useState, useRef, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles, User, FileText, Layers, BookOpen, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: { document: string; page: number }[];
  timestamp: Date;
}

interface SuggestedQuestion {
  text: string;
  icon: React.ElementType;
}

const suggestedQuestions: SuggestedQuestion[] = [
  { text: "Explain the concept of backpropagation in neural networks", icon: BookOpen },
  { text: "What are the ACID properties in database systems?", icon: FileText },
  { text: "Compare quick sort vs merge sort time complexity", icon: Layers },
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Based on your uploaded documents, here's what I found:\n\n${text.includes("backpropagation") 
          ? "**Backpropagation** is a supervised learning algorithm used to train neural networks. It works by:\n\n1. **Forward Pass**: Input data flows through the network to produce an output\n2. **Error Calculation**: The difference between predicted and actual output is computed\n3. **Backward Pass**: Gradients are calculated layer by layer, moving backwards\n4. **Weight Update**: Weights are adjusted using the calculated gradients\n\nThe key insight is using the chain rule to efficiently compute gradients for all weights in the network."
          : "I found relevant information in your documents. The answer is grounded in the materials you've uploaded, ensuring accuracy and proper citation."}`,
        citations: [
          { document: "Machine Learning Notes.pdf", page: 23 },
          { document: "Neural Networks Slides.pptx", page: 15 },
        ],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <MainLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        {/* Header */}
        <div className="mb-6 animate-fade-in">
          <h1 className="text-4xl font-bold font-serif mb-2">Q&A Chat</h1>
          <p className="text-muted-foreground">
            Ask questions grounded in your uploaded documents. All answers include citations.
          </p>
        </div>

        {/* Chat Area */}
        <Card variant="elevated" className="flex-1 flex flex-col overflow-hidden animate-slide-up">
          <ScrollArea className="flex-1 p-6" ref={scrollRef}>
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="h-16 w-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                  <Sparkles className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Ask anything about your documents</h3>
                <p className="text-muted-foreground mb-8 max-w-md">
                  Get accurate, citation-backed answers from your study materials. No hallucinations, just facts.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-4 text-left justify-start animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => sendMessage(question.text)}
                    >
                      <question.icon className="h-4 w-4 mr-2 shrink-0 text-accent" />
                      <span className="text-sm">{question.text}</span>
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-4 animate-fade-in",
                      message.role === "user" && "flex-row-reverse"
                    )}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div
                      className={cn(
                        "h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-accent text-accent-foreground"
                      )}
                    >
                      {message.role === "user" ? (
                        <User className="h-5 w-5" />
                      ) : (
                        <Sparkles className="h-5 w-5" />
                      )}
                    </div>
                    <div
                      className={cn(
                        "flex-1 max-w-2xl",
                        message.role === "user" && "text-right"
                      )}
                    >
                      <div
                        className={cn(
                          "inline-block p-4 rounded-2xl",
                          message.role === "user"
                            ? "bg-primary text-primary-foreground rounded-tr-sm"
                            : "bg-muted rounded-tl-sm"
                        )}
                      >
                        <p className="whitespace-pre-wrap text-left">{message.content}</p>
                      </div>
                      {message.citations && message.citations.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.citations.map((citation, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-highlight-soft text-sm"
                            >
                              <FileText className="h-3 w-3 text-accent" />
                              {citation.document} · p.{citation.page}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-4 animate-fade-in">
                    <div className="h-10 w-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center shrink-0">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div className="flex items-center gap-2 p-4 rounded-2xl bg-muted rounded-tl-sm">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-muted-foreground">Searching documents...</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {/* Input Area */}
          <CardContent className="border-t p-4">
            <div className="flex gap-4">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question about your documents..."
                className="min-h-[60px] max-h-[200px] resize-none"
                disabled={isLoading}
              />
              <Button
                variant="accent"
                size="icon"
                className="h-[60px] w-[60px] shrink-0"
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isLoading}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
