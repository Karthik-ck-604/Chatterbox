import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { type Message, type ChatResponse } from "@shared/schema";
import { ChatHeader } from "@/components/ChatHeader";
import { ChatInput } from "@/components/ChatInput";
import { MessageBubble } from "@/components/MessageBubble";
import { TypingIndicator } from "@/components/TypingIndicator";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import mangroveBackground from "@assets/generated_images/Mangrove_forest_background_scene_3d2a1f14.png";

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isExited, setIsExited] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const chatMutation = useMutation({
    mutationFn: async (userMessage: string) => {
      const response = await apiRequest("POST", "/api/chat", { message: userMessage });
      const data: ChatResponse = await response.json();
      return data;
    },
    onSuccess: async (data, userMessage) => {
      try {
        const botMessageId = `bot-${Date.now()}`;
        const botMessage: Message = {
          id: botMessageId,
          content: "",
          sender: data.sender,
          timestamp: Date.now(),
        };
        
        setMessages((prev) => [...prev, botMessage]);
        
        await new Promise((resolve) => setTimeout(resolve, 300));
        
        const words = data.message.split(" ");
        for (let i = 0; i < words.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 50));
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botMessageId
                ? { ...msg, content: words.slice(0, i + 1).join(" ") }
                : msg
            )
          );
        }
      } finally {
        setIsTyping(false);
      }
    },
    onError: () => {
      setIsTyping(false);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: "Sorry, I encountered an error. Please try again.",
        sender: "system",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    },
  });

  const handleSendMessage = async (userMessage: string) => {
    if (isExited) return;
    
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage === "bye" || lowerMessage === "exit" || lowerMessage === "quit") {
      const userMsg: Message = {
        id: `user-${Date.now()}`,
        content: userMessage,
        sender: "user",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, userMsg]);
      
      setTimeout(() => {
        const farewells = [
          "Goodbye! Thanks for learning about mangroves.",
          "See you later! Keep exploring mangrove forests.",
          "Bye! Hope you enjoyed learning about these amazing ecosystems.",
          "Take care! Remember to protect our precious mangrove forests.",
        ];
        const farewellMessage: Message = {
          id: `system-${Date.now()}`,
          content: farewells[Math.floor(Math.random() * farewells.length)],
          sender: "system",
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, farewellMessage]);
        setIsExited(true);
      }, 500);
      return;
    }

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      content: userMessage,
      sender: "user",
      timestamp: Date.now(),
    };
    
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    
    chatMutation.mutate(userMessage);
  };

  const handleSampleQuestion = (question: string) => {
    handleSendMessage(question);
  };

  useEffect(() => {
    const greetings = [
      "Hi! I'm MANGO, your Mangrove Forest Chatbot!",
      "Welcome! I'm MANGO, ready to answer your mangrove questions!",
      "Hello! I'm MANGO, your guide to mangrove forests!",
    ];
    
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    
    const greetingMessage: Message = {
      id: "greeting",
      content: randomGreeting,
      sender: "system",
      timestamp: Date.now(),
    };
    
    setMessages([greetingMessage]);
  }, []);

  return (
    <div className="flex flex-col h-screen relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${mangroveBackground})`,
          filter: "blur(40px) brightness(0.4)",
          transform: "scale(1.1)",
        }}
      />
      
      <div className="absolute inset-0 bg-background/60" />
      
      <div className="relative z-10 flex flex-col h-full">
        <ChatHeader />
        
        <div className="flex-1 overflow-y-auto">
          {messages.length <= 1 ? (
            <WelcomeScreen onQuestionClick={handleSampleQuestion} />
          ) : (
            <div className="max-w-4xl mx-auto px-6 py-6 space-y-2">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              
              {isTyping && (
                <div className="flex gap-3 py-2 animate-slide-in-left">
                  <div className="w-8 h-8 flex-shrink-0 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground text-xs">🌿</span>
                  </div>
                  <div className="bg-card border border-card-border px-4 py-3 rounded-lg rounded-tl-sm">
                    <TypingIndicator />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        <ChatInput 
          onSendMessage={handleSendMessage} 
          disabled={isTyping || isExited}
        />
      </div>
    </div>
  );
}
