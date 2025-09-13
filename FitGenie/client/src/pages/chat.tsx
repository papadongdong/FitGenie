import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import ChatBubble from "@/components/chat-bubble";
import { Bot, Send, User } from "lucide-react";

interface Message {
  role: 'user' | 'ai';
  content: string;
  timestamp: number;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      content: "Hello! I'm your AI fitness coach. How can I help you today? You can ask me about:\n• Workout routines\n• Nutrition advice\n• Health goals\n• Exercise techniques",
      timestamp: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat", {
        userId: "guest", // For demo purposes
        message
      });
      return response.json();
    },
    onSuccess: (data) => {
      setMessages(prev => [...prev, {
        role: 'ai',
        content: data.response,
        timestamp: Date.now()
      }]);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const sendMessage = () => {
    const message = inputValue.trim();
    if (!message) return;

    // Add user message
    setMessages(prev => [...prev, {
      role: 'user',
      content: message,
      timestamp: Date.now()
    }]);

    setInputValue("");
    chatMutation.mutate(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section className="section">
      <div className="container mx-auto px-4 pt-20 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-chat-title">AI Fitness Coach</h2>
          <p className="text-muted-foreground" data-testid="text-chat-description">Get personalized advice from your AI fitness companion</p>
        </div>
        
        <Card className="rounded-2xl border border-border overflow-hidden" data-testid="card-chat-container">
          {/* Chat Header */}
          <div className="bg-primary text-primary-foreground p-4 flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
              <Bot className="text-secondary-foreground w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold" data-testid="text-coach-name">FitGenius AI Coach</h3>
              <p className="text-primary-foreground/80 text-sm" data-testid="text-coach-status">Online • Ready to help</p>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div className="h-96 p-4 overflow-y-auto bg-muted/30" data-testid="container-chat-messages">
            {messages.map((message, index) => (
              <ChatBubble key={index} message={message} />
            ))}
            {chatMutation.isPending && (
              <div className="chat-bubble ai" data-testid="indicator-typing">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about fitness and health..."
                className="flex-1 bg-input text-foreground"
                disabled={chatMutation.isPending}
                data-testid="input-chat-message"
              />
              <Button 
                onClick={sendMessage}
                disabled={chatMutation.isPending || !inputValue.trim()}
                data-testid="button-send-message"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
