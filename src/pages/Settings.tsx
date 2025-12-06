import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff, Database, Cpu, HardDrive, Shield, Trash2, Download, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [offlineMode, setOfflineMode] = useState(false);
  const [localLLM, setLocalLLM] = useState("gemini");
  const { toast } = useToast();

  const handleClearData = () => {
    toast({
      title: "Data cleared",
      description: "All local data has been removed.",
    });
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold font-serif mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Configure your StudentDoc experience and privacy preferences.
          </p>
        </div>

        <div className="space-y-6">
          {/* Offline Mode */}
          <Card variant="elevated" className="animate-slide-up">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {offlineMode ? (
                    <WifiOff className="h-5 w-5 text-accent" />
                  ) : (
                    <Wifi className="h-5 w-5 text-success" />
                  )}
                  <div>
                    <CardTitle className="text-lg">Offline Mode</CardTitle>
                    <CardDescription>Run everything locally without internet</CardDescription>
                  </div>
                </div>
                <Switch checked={offlineMode} onCheckedChange={setOfflineMode} />
              </div>
            </CardHeader>
            {offlineMode && (
              <CardContent className="border-t pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-highlight-soft">
                    <Shield className="h-5 w-5 text-accent" />
                    <p className="text-sm">
                      <strong>Privacy Guaranteed:</strong> No data leaves your device in offline mode.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-3 rounded-lg bg-muted/50 text-center">
                      <Cpu className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">Local LLM</p>
                      <p className="text-xs text-muted-foreground">Ready</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50 text-center">
                      <Database className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">Vector DB</p>
                      <p className="text-xs text-muted-foreground">128MB</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50 text-center">
                      <HardDrive className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">Embeddings</p>
                      <p className="text-xs text-muted-foreground">Local</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* AI Model */}
          <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: "0.05s" }}>
            <CardHeader>
              <CardTitle className="text-lg">AI Model</CardTitle>
              <CardDescription>Choose the model for answering questions</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={localLLM} onValueChange={setLocalLLM}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gemini">
                    <div className="flex items-center gap-2">
                      <span>Gemini 2.5 Flash</span>
                      <Badge variant="outline" className="text-xs">Recommended</Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="gpt4">GPT-5 Mini</SelectItem>
                  <SelectItem value="local" disabled={!offlineMode}>
                    <div className="flex items-center gap-2">
                      <span>Local LLM (Llama 3)</span>
                      {!offlineMode && <Badge variant="outline" className="text-xs">Offline only</Badge>}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-2">
                {localLLM === "gemini" && "Fast and accurate for most study questions."}
                {localLLM === "gpt4" && "More capable but slower for complex reasoning."}
                {localLLM === "local" && "Runs entirely on your device. No internet required."}
              </p>
            </CardContent>
          </Card>

          {/* Embedding Model */}
          <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle className="text-lg">Embedding Model</CardTitle>
              <CardDescription>Model used for semantic search</CardDescription>
            </CardHeader>
            <CardContent>
              <Select defaultValue="minilm">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minilm">all-MiniLM-L6-v2</SelectItem>
                  <SelectItem value="bge">bge-small-en</SelectItem>
                  <SelectItem value="e5">e5-small</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: "0.15s" }}>
            <CardHeader>
              <CardTitle className="text-lg">Data Management</CardTitle>
              <CardDescription>Manage your local data and storage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">Local Storage Used</p>
                  <p className="text-sm text-muted-foreground">Documents, embeddings, and flashcards</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">256 MB</p>
                  <p className="text-xs text-muted-foreground">of 2 GB limit</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export All Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Rebuild Vector Index
                </Button>
                <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive" onClick={handleClearData}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All Data
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* About */}
          <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle className="text-lg">About StudentDoc</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Version</span>
                  <span>1.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Build</span>
                  <span>2024.12.06</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
