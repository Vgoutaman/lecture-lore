import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileText, FileImage, Presentation, Search, Grid, List, MoreHorizontal, Eye, Trash2, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Document {
  id: string;
  name: string;
  type: "pdf" | "docx" | "pptx" | "image";
  pages: number;
  uploadedAt: string;
  subject: string;
  chunks: number;
}

const mockDocuments: Document[] = [
  { id: "1", name: "Machine Learning Fundamentals.pdf", type: "pdf", pages: 142, uploadedAt: "Dec 2, 2024", subject: "ML", chunks: 284 },
  { id: "2", name: "Database Systems Complete.docx", type: "docx", pages: 98, uploadedAt: "Dec 1, 2024", subject: "DB", chunks: 196 },
  { id: "3", name: "Algorithm Design Lecture.pptx", type: "pptx", pages: 56, uploadedAt: "Nov 30, 2024", subject: "Algo", chunks: 112 },
  { id: "4", name: "Neural Networks Chapter 5.pdf", type: "pdf", pages: 32, uploadedAt: "Nov 28, 2024", subject: "ML", chunks: 64 },
  { id: "5", name: "Handwritten Notes Scan.png", type: "image", pages: 1, uploadedAt: "Nov 25, 2024", subject: "General", chunks: 8 },
  { id: "6", name: "Operating Systems Notes.pdf", type: "pdf", pages: 78, uploadedAt: "Nov 20, 2024", subject: "OS", chunks: 156 },
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

const subjectColors: Record<string, string> = {
  ML: "bg-accent/20 text-accent border-accent/30",
  DB: "bg-info/20 text-info border-info/30",
  Algo: "bg-success/20 text-success border-success/30",
  OS: "bg-destructive/20 text-destructive border-destructive/30",
  General: "bg-muted text-muted-foreground border-border",
};

export default function Documents() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");

  const filteredDocs = mockDocuments.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold font-serif mb-2">Documents</h1>
          <p className="text-muted-foreground">
            {mockDocuments.length} documents · {mockDocuments.reduce((acc, d) => acc + d.chunks, 0)} chunks indexed
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <div className="flex items-center rounded-lg border p-1">
            <Button
              variant={view === "grid" ? "secondary" : "ghost"}
              size="icon-sm"
              onClick={() => setView("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "list" ? "secondary" : "ghost"}
              size="icon-sm"
              onClick={() => setView("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Documents Grid/List */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc, index) => {
            const Icon = iconMap[doc.type];
            return (
              <Card
                key={doc.id}
                variant="interactive"
                className="animate-slide-up group"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center", colorMap[doc.type])}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Document
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Ask Questions
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <h3 className="font-semibold mb-2 line-clamp-2">{doc.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <span>{doc.pages} pages</span>
                    <span>·</span>
                    <span>{doc.chunks} chunks</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={cn("text-xs", subjectColors[doc.subject])}>
                      {doc.subject}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{doc.uploadedAt}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card variant="elevated" className="animate-slide-up">
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredDocs.map((doc, index) => {
                const Icon = iconMap[doc.type];
                return (
                  <div
                    key={doc.id}
                    className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors group animate-fade-in"
                    style={{ animationDelay: `${index * 0.03}s` }}
                  >
                    <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", colorMap[doc.type])}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {doc.pages} pages · {doc.chunks} chunks · {doc.uploadedAt}
                      </p>
                    </div>
                    <Badge variant="outline" className={cn("text-xs", subjectColors[doc.subject])}>
                      {doc.subject}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Ask Questions
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </MainLayout>
  );
}
