import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, MessageSquare, Layers, GraduationCap, Sparkles, Network } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuickAction {
  icon: React.ElementType;
  label: string;
  description: string;
  path: string;
  highlight?: boolean;
}

const actions: QuickAction[] = [
  { icon: Upload, label: "Upload Document", description: "Add new study materials", path: "/upload" },
  { icon: MessageSquare, label: "Ask a Question", description: "Get instant answers", path: "/chat", highlight: true },
  { icon: Layers, label: "Review Flashcards", description: "Study with spaced repetition", path: "/flashcards" },
  { icon: GraduationCap, label: "Exam Mode", description: "Focus on high-yield topics", path: "/exam-mode" },
  { icon: Network, label: "Explore Concepts", description: "Visual knowledge graph", path: "/graph" },
];

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
      <CardHeader>
        <CardTitle className="text-xl">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {actions.map((action, index) => (
            <Button
              key={action.label}
              variant={action.highlight ? "accent" : "outline"}
              className="h-auto p-4 justify-start animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => navigate(action.path)}
            >
              <div className="flex items-center gap-4">
                <div className={action.highlight ? "p-2 rounded-lg bg-accent-foreground/10" : "p-2 rounded-lg bg-muted"}>
                  <action.icon className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="font-medium">{action.label}</p>
                  <p className={action.highlight ? "text-xs opacity-80" : "text-xs text-muted-foreground"}>
                    {action.description}
                  </p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
