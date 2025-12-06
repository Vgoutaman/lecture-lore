import { useState, useCallback } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload as UploadIcon, FileText, FileImage, Presentation, X, CheckCircle, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface UploadedFile {
  id: string;
  file: File;
  status: "uploading" | "processing" | "complete" | "error";
  progress: number;
  pages?: number;
}

const acceptedTypes = {
  "application/pdf": { icon: FileText, label: "PDF", color: "text-destructive" },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { icon: FileText, label: "DOCX", color: "text-info" },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": { icon: Presentation, label: "PPTX", color: "text-accent" },
  "image/jpeg": { icon: FileImage, label: "JPEG", color: "text-success" },
  "image/png": { icon: FileImage, label: "PNG", color: "text-success" },
};

export default function Upload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const processFile = useCallback((file: File) => {
    const id = Math.random().toString(36).substring(7);
    const uploadedFile: UploadedFile = {
      id,
      file,
      status: "uploading",
      progress: 0,
    };

    setFiles((prev) => [...prev, uploadedFile]);

    // Simulate upload and processing
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === id ? { ...f, status: "processing", progress: 100 } : f
          )
        );

        // Simulate processing
        setTimeout(() => {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === id ? { ...f, status: "complete", pages: Math.floor(Math.random() * 50) + 5 } : f
            )
          );
          toast({
            title: "Document processed",
            description: `${file.name} is ready for Q&A`,
          });
        }, 1500);
      } else {
        setFiles((prev) =>
          prev.map((f) => (f.id === id ? { ...f, progress } : f))
        );
      }
    }, 100);
  }, [toast]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const droppedFiles = Array.from(e.dataTransfer.files);
      droppedFiles.forEach(processFile);
    },
    [processFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        Array.from(e.target.files).forEach(processFile);
      }
    },
    [processFile]
  );

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const getFileIcon = (file: File) => {
    const config = acceptedTypes[file.type as keyof typeof acceptedTypes];
    return config || { icon: FileText, label: "File", color: "text-muted-foreground" };
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold font-serif mb-2">Upload Documents</h1>
          <p className="text-muted-foreground text-lg">
            Add your study materials to get document-grounded answers.
          </p>
        </div>

        {/* Drop Zone */}
        <Card
          variant="interactive"
          className={cn(
            "mb-8 animate-slide-up transition-all duration-300",
            isDragging && "border-accent border-2 bg-accent/5 shadow-glow"
          )}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <CardContent className="p-12">
            <div className="flex flex-col items-center justify-center text-center">
              <div className={cn(
                "h-16 w-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300",
                isDragging ? "bg-accent text-accent-foreground scale-110" : "bg-muted"
              )}>
                <UploadIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isDragging ? "Drop your files here" : "Drag and drop your documents"}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Support for PDF, DOCX, PPTX, and images (JPEG, PNG). We'll extract text and create embeddings for accurate Q&A.
              </p>
              <div className="flex items-center gap-4">
                <Button variant="accent" size="lg" asChild>
                  <label className="cursor-pointer">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Browse Files
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      accept=".pdf,.docx,.pptx,.jpg,.jpeg,.png"
                      onChange={handleFileInput}
                    />
                  </label>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* File List */}
        {files.length > 0 && (
          <Card variant="elevated" className="animate-slide-up">
            <CardHeader>
              <CardTitle className="text-xl">Uploaded Files</CardTitle>
              <CardDescription>{files.length} file(s) added</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {files.map((uploadedFile, index) => {
                const { icon: Icon, label, color } = getFileIcon(uploadedFile.file);
                return (
                  <div
                    key={uploadedFile.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className={cn("h-10 w-10 rounded-lg bg-background flex items-center justify-center", color)}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{uploadedFile.file.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{label}</span>
                        <span>·</span>
                        <span>{(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB</span>
                        {uploadedFile.pages && (
                          <>
                            <span>·</span>
                            <span>{uploadedFile.pages} pages</span>
                          </>
                        )}
                      </div>
                      {uploadedFile.status === "uploading" && (
                        <Progress value={uploadedFile.progress} className="h-1 mt-2" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {uploadedFile.status === "uploading" && (
                        <span className="text-sm text-muted-foreground">Uploading...</span>
                      )}
                      {uploadedFile.status === "processing" && (
                        <div className="flex items-center gap-2 text-sm text-accent">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Processing
                        </div>
                      )}
                      {uploadedFile.status === "complete" && (
                        <div className="flex items-center gap-2 text-sm text-success">
                          <CheckCircle className="h-4 w-4" />
                          Ready
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removeFile(uploadedFile.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
