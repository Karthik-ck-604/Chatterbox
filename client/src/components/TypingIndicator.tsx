export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1" data-testid="typing-indicator">
      <div 
        className="w-2 h-2 rounded-full bg-primary animate-typing-bounce" 
        style={{ animationDelay: "0ms" }}
      />
      <div 
        className="w-2 h-2 rounded-full bg-primary animate-typing-bounce" 
        style={{ animationDelay: "200ms" }}
      />
      <div 
        className="w-2 h-2 rounded-full bg-primary animate-typing-bounce" 
        style={{ animationDelay: "400ms" }}
      />
    </div>
  );
}
