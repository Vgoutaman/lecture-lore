import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, FileImage, Presentation, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface Document {
  id: string;
  name: string;
  type: "pdf" | "docx" | "pptx" | "image";
  pages: number;
  uploadedAt: string;
}

const mockDocuments: Document[] = [
  { id: "1", name: "Machine Learning Notes.pdf", type: "pdf", pages: 42, uploadedAt: "2 hours ago" },
  { id: "2", name: "Database Systems.docx", type: "docx", pages: 28, uploadedAt: "5 hours ago" },
  { id: "3", name: "Algorithm Slides.pptx", type: "pptx", pages: 56, uploadedAt: "1 day ago" },
  { id: "4", name: "Handwritten Notes.png", type: "image", pages: 1, uploadedAt: "2 days ago" },
];

const iconMap = {
  pdf: FileText,
  docx: FileText,
  pptx: Presentation,
  image: FileImage,
};

const colorMap = {
  pdf: "text-destructive bg-destructive/10",
  docx: "text-info bg-info/10",
  pptx: "text-accent bg-accent/10",
  image: "text-success bg-success/10",
};

export function RecentDocuments() {
  return (
    <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Recent Documents</CardTitle>
        <Button variant="ghost" size="sm">View All</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockDocuments.map((doc, index) => {
            const Icon = iconMap[doc.type];
            return (
              <div
                key={doc.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", colorMap[doc.type])}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{doc.name}</p>
                  <p className="text-sm text-muted-foreground">{doc.pages} pages · {doc.uploadedAt}</p>
                </div>
                <Button variant="ghost" size="icon-sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
