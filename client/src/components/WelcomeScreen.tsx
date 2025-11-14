import { Leaf, Trees, Fish, DollarSign, Camera, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onQuestionClick: (question: string) => void;
}

const sampleQuestions = [
  { icon: Trees, text: "What plants grow in mangrove forests?", category: "Flora" },
  { icon: Fish, text: "Tell me about mangrove animals", category: "Fauna" },
  { icon: Sprout, text: "Why are mangroves vital?", category: "Ecology" },
  { icon: DollarSign, text: "Why are mangroves valuable?", category: "Economy" },
  { icon: Camera, text: "Can I visit mangrove forests?", category: "Tourism" },
  { icon: Leaf, text: "Why do mangroves float?", category: "Adaptations" },
];

export function WelcomeScreen({ onQuestionClick }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-12 animate-fade-in-up">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <Leaf className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Welcome to MANGO
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Your Mangrove Forest Guide
          </p>
          <p className="text-base text-muted-foreground/80 max-w-lg mx-auto">
            Ask me anything about mangrove forests - their plants, animals, ecological benefits, economic importance, and much more!
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-center text-muted-foreground">
            Try asking:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sampleQuestions.map((question, index) => {
              const Icon = question.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start text-left h-auto py-3 px-4 hover-elevate active-elevate-2"
                  onClick={() => onQuestionClick(question.text)}
                  data-testid={`sample-question-${index}`}
                >
                  <Icon className="w-4 h-4 mr-3 flex-shrink-0 text-primary" />
                  <span className="text-sm">{question.text}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
