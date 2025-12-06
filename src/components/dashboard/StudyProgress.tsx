import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Subject {
  name: string;
  progress: number;
  color: string;
}

const subjects: Subject[] = [
  { name: "Machine Learning", progress: 75, color: "bg-accent" },
  { name: "Database Systems", progress: 60, color: "bg-info" },
  { name: "Algorithms", progress: 45, color: "bg-success" },
  { name: "Operating Systems", progress: 30, color: "bg-destructive" },
];

export function StudyProgress() {
  return (
    <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
      <CardHeader>
        <CardTitle className="text-xl">Study Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {subjects.map((subject, index) => (
          <div key={subject.name} className="space-y-2 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{subject.name}</span>
              <span className="text-muted-foreground">{subject.progress}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={cn("h-full rounded-full transition-all duration-500", subject.color)}
                style={{ width: `${subject.progress}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
