import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, TrendingUp, Target, Clock, BookOpen, FileText, CheckCircle, AlertTriangle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Topic {
  id: string;
  name: string;
  frequency: number;
  questionType: "short" | "long" | "mcq";
  importance: "high" | "medium" | "low";
  mastery: number;
  lastTested: string;
}

const mockTopics: Topic[] = [
  { id: "1", name: "Backpropagation Algorithm", frequency: 85, questionType: "long", importance: "high", mastery: 60, lastTested: "2023" },
  { id: "2", name: "SQL Joins", frequency: 78, questionType: "short", importance: "high", mastery: 75, lastTested: "2024" },
  { id: "3", name: "Time Complexity Analysis", frequency: 72, questionType: "short", importance: "high", mastery: 45, lastTested: "2024" },
  { id: "4", name: "Normalization Forms", frequency: 65, questionType: "long", importance: "medium", mastery: 55, lastTested: "2023" },
  { id: "5", name: "Gradient Descent", frequency: 60, questionType: "mcq", importance: "medium", mastery: 80, lastTested: "2024" },
  { id: "6", name: "Binary Search Trees", frequency: 55, questionType: "short", importance: "medium", mastery: 70, lastTested: "2022" },
];

const importanceColors = {
  high: "bg-destructive/20 text-destructive border-destructive/30",
  medium: "bg-accent/20 text-accent border-accent/30",
  low: "bg-muted text-muted-foreground border-border",
};

const typeLabels = {
  short: "Short Answer",
  long: "Long Answer",
  mcq: "MCQ",
};

export default function ExamMode() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const highYieldCount = mockTopics.filter((t) => t.importance === "high").length;
  const avgMastery = Math.round(mockTopics.reduce((acc, t) => acc + t.mastery, 0) / mockTopics.length);

  return (
    <MainLayout>
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
            <GraduationCap className="h-5 w-5 text-accent-foreground" />
          </div>
          <h1 className="text-4xl font-bold font-serif">Exam Mode</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          AI-powered exam prep based on your documents and past papers.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card variant="stat" className="animate-slide-up">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <Target className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold">{highYieldCount}</p>
              <p className="text-sm text-muted-foreground">High-Yield Topics</p>
            </div>
          </div>
        </Card>
        <Card variant="stat" className="animate-slide-up" style={{ animationDelay: "0.05s" }}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">{avgMastery}%</p>
              <p className="text-sm text-muted-foreground">Avg Mastery</p>
            </div>
          </div>
        </Card>
        <Card variant="stat" className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Past Papers</p>
            </div>
          </div>
        </Card>
        <Card variant="stat" className="animate-slide-up" style={{ animationDelay: "0.15s" }}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-info/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-info" />
            </div>
            <div>
              <p className="text-2xl font-bold">~8h</p>
              <p className="text-sm text-muted-foreground">Est. Study Time</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Topics List */}
        <div className="lg:col-span-2">
          <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle className="text-xl">Priority Topics</CardTitle>
              <CardDescription>
                Topics ranked by exam frequency and your mastery level
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="high">High Priority</TabsTrigger>
                  <TabsTrigger value="weak">Weak Areas</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-3">
                  {mockTopics.map((topic, index) => (
                    <div
                      key={topic.id}
                      className={cn(
                        "p-4 rounded-lg border cursor-pointer transition-all animate-fade-in hover:border-accent/30",
                        selectedTopic?.id === topic.id ? "border-accent bg-accent/5" : "bg-card"
                      )}
                      style={{ animationDelay: `${index * 0.05}s` }}
                      onClick={() => setSelectedTopic(topic)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{topic.name}</h4>
                            <Badge variant="outline" className={cn("text-xs", importanceColors[topic.importance])}>
                              {topic.importance}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" />
                              {topic.frequency}% frequency
                            </span>
                            <span>{typeLabels[topic.questionType]}</span>
                            <span>Last: {topic.lastTested}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-medium mb-1">{topic.mastery}% mastery</p>
                          <Progress value={topic.mastery} className="w-20 h-1.5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="high" className="space-y-3">
                  {mockTopics.filter(t => t.importance === "high").map((topic, index) => (
                    <div
                      key={topic.id}
                      className="p-4 rounded-lg border bg-card animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{topic.name}</h4>
                        <Badge variant="outline" className={cn("text-xs", importanceColors[topic.importance])}>
                          {topic.importance}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{topic.frequency}% exam frequency</span>
                        <Progress value={topic.mastery} className="w-20 h-1.5" />
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="weak" className="space-y-3">
                  {mockTopics.filter(t => t.mastery < 60).map((topic, index) => (
                    <div
                      key={topic.id}
                      className="p-4 rounded-lg border bg-card animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                        <h4 className="font-medium">{topic.name}</h4>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Only {topic.mastery}% mastery</span>
                        <Button size="sm" variant="outline">Practice Now</Button>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Actions Panel */}
        <div className="space-y-6">
          <Card variant="highlight" className="animate-slide-up" style={{ animationDelay: "0.25s" }}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="accent" className="w-full justify-start">
                <Target className="h-4 w-4 mr-2" />
                Generate Practice Questions
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Upload Past Paper
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="h-4 w-4 mr-2" />
                Create Study Plan
              </Button>
            </CardContent>
          </Card>

          {selectedTopic && (
            <Card variant="elevated" className="animate-scale-in">
              <CardHeader>
                <CardTitle className="text-lg">{selectedTopic.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Frequency</p>
                    <p className="text-xl font-bold">{selectedTopic.frequency}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Your Mastery</p>
                    <p className="text-xl font-bold">{selectedTopic.mastery}%</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Question Type</p>
                  <Badge variant="outline">{typeLabels[selectedTopic.questionType]}</Badge>
                </div>
                <div className="pt-2 space-y-2">
                  <Button variant="accent" className="w-full">
                    Practice This Topic
                  </Button>
                  <Button variant="ghost" className="w-full">
                    View Related Flashcards
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
