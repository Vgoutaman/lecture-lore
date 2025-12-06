import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RotateCcw, ChevronLeft, ChevronRight, Check, X, Shuffle, Layers, BookOpen, Clock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Flashcard {
  id: string;
  front: string;
  back: string;
  subject: string;
  mastery: number;
  lastReviewed?: string;
}

const mockFlashcards: Flashcard[] = [
  {
    id: "1",
    front: "What is the time complexity of QuickSort in the average case?",
    back: "O(n log n) - QuickSort uses a divide-and-conquer approach. On average, it partitions the array into roughly equal halves, leading to log n levels of recursion, with n comparisons at each level.",
    subject: "Algorithms",
    mastery: 75,
  },
  {
    id: "2",
    front: "Define ACID properties in database systems",
    back: "**Atomicity**: All operations complete or none do\n**Consistency**: Database remains in valid state\n**Isolation**: Concurrent transactions don't interfere\n**Durability**: Committed changes persist",
    subject: "Databases",
    mastery: 60,
  },
  {
    id: "3",
    front: "What is backpropagation in neural networks?",
    back: "An algorithm for training neural networks by computing gradients of the loss function with respect to weights using the chain rule, propagating errors backward from output to input layers.",
    subject: "Machine Learning",
    mastery: 45,
  },
];

const subjectColors: Record<string, string> = {
  Algorithms: "bg-success/20 text-success border-success/30",
  Databases: "bg-info/20 text-info border-info/30",
  "Machine Learning": "bg-accent/20 text-accent border-accent/30",
};

export default function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyMode, setStudyMode] = useState(false);

  const currentCard = mockFlashcards[currentIndex];
  const totalCards = mockFlashcards.length;
  const progress = ((currentIndex + 1) / totalCards) * 100;

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % totalCards);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
    }, 150);
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold font-serif mb-2">Flashcards</h1>
            <p className="text-muted-foreground">
              Review and master concepts with spaced repetition.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Shuffle className="h-4 w-4 mr-2" />
              Shuffle
            </Button>
            <Button variant="accent" size="sm" onClick={() => setStudyMode(!studyMode)}>
              <Sparkles className="h-4 w-4 mr-2" />
              {studyMode ? "Exit Study" : "Study Mode"}
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card variant="stat" className="animate-slide-up">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Layers className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalCards}</p>
                <p className="text-sm text-muted-foreground">Total Cards</p>
              </div>
            </div>
          </Card>
          <Card variant="stat" className="animate-slide-up" style={{ animationDelay: "0.05s" }}>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Due Today</p>
              </div>
            </div>
          </Card>
          <Card variant="stat" className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-info/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold">~15min</p>
                <p className="text-sm text-muted-foreground">Est. Time</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 animate-slide-up" style={{ animationDelay: "0.15s" }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Card {currentIndex + 1} of {totalCards}</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Flashcard */}
        <div className="perspective-1000 mb-6 animate-scale-in" style={{ animationDelay: "0.2s" }}>
          <div
            className={cn(
              "relative w-full aspect-[3/2] cursor-pointer transition-all duration-500 transform-style-preserve-3d",
              isFlipped && "rotate-y-180"
            )}
            onClick={() => setIsFlipped(!isFlipped)}
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Front */}
            <Card
              variant="elevated"
              className="absolute inset-0 backface-hidden flex flex-col"
              style={{ backfaceVisibility: "hidden" }}
            >
              <CardHeader className="flex-none">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={cn("text-xs", subjectColors[currentCard.subject])}>
                    {currentCard.subject}
                  </Badge>
                  <span className="text-sm text-muted-foreground">Click to flip</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex items-center justify-center p-8">
                <p className="text-xl font-medium text-center">{currentCard.front}</p>
              </CardContent>
            </Card>

            {/* Back */}
            <Card
              variant="elevated"
              className="absolute inset-0 backface-hidden flex flex-col bg-muted"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <CardHeader className="flex-none">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs bg-background">Answer</Badge>
                  <span className="text-sm text-muted-foreground">Click to flip back</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex items-center justify-center p-8">
                <p className="text-lg whitespace-pre-wrap text-center">{currentCard.back}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.25s" }}>
          <Button variant="outline" size="icon" onClick={prevCard}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          {studyMode && (
            <>
              <Button variant="destructive" size="lg" className="gap-2">
                <X className="h-4 w-4" />
                Forgot
              </Button>
              <Button variant="outline" size="lg" className="gap-2" onClick={() => setIsFlipped(!isFlipped)}>
                <RotateCcw className="h-4 w-4" />
                Flip
              </Button>
              <Button variant="default" size="lg" className="gap-2 bg-success hover:bg-success/90">
                <Check className="h-4 w-4" />
                Got It
              </Button>
            </>
          )}

          <Button variant="outline" size="icon" onClick={nextCard}>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Card Preview List */}
        <Card variant="elevated" className="mt-8 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <CardHeader>
            <CardTitle className="text-lg">All Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockFlashcards.map((card, index) => (
                <div
                  key={card.id}
                  className={cn(
                    "p-4 rounded-lg cursor-pointer transition-all",
                    index === currentIndex
                      ? "bg-accent/10 border border-accent/30"
                      : "bg-muted/50 hover:bg-muted"
                  )}
                  onClick={() => {
                    setIsFlipped(false);
                    setCurrentIndex(index);
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm line-clamp-2">{card.front}</p>
                    <div className="shrink-0">
                      <div className="text-xs text-muted-foreground mb-1">{card.mastery}%</div>
                      <Progress value={card.mastery} className="w-16 h-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
