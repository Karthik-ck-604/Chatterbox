import { type Message } from "@shared/schema";
import { Leaf } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface MessageBubbleProps {
  message: Message;
  isTyping?: boolean;
  showTimestamp?: boolean;
}

export function MessageBubble({ message, isTyping = false, showTimestamp = true }: MessageBubbleProps) {
  const isUser = message.sender === "user";
  const isSystem = message.sender === "system";

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isSystem) {
    return (
      <div className="flex justify-center py-4 animate-fade-in-up" data-testid={`message-${message.id}`}>
        <div className="px-4 py-2 bg-muted/50 rounded-full text-sm text-muted-foreground max-w-md text-center">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`flex flex-col gap-1 py-1 ${isUser ? "items-end animate-slide-in-right" : "items-start animate-slide-in-left"}`}
      data-testid={`message-${message.id}`}
    >
      <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
        {!isUser && (
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarFallback className="bg-primary text-primary-foreground">
              <Leaf className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
        )}
        
        <div 
          className={`
            max-w-[75%] px-4 py-3 rounded-lg
            ${isUser 
              ? "bg-primary text-primary-foreground rounded-tr-sm" 
              : "bg-card border border-card-border rounded-tl-sm"
            }
            ${isTyping ? "min-h-[52px] flex items-center" : ""}
          `}
          data-testid={isUser ? "message-user" : "message-bot"}
        >
          <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </p>
        </div>

        {isUser && <div className="w-8 flex-shrink-0" />}
      </div>
      
      {showTimestamp && message.content && (
        <div className={`text-xs text-muted-foreground/60 px-1 ${isUser ? "mr-11" : "ml-11"}`}>
          {formatTime(message.timestamp)}
        </div>
      )}
    </div>
  );
}
