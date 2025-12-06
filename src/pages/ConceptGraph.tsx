import { useEffect, useRef, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ZoomIn, ZoomOut, Maximize2, Search, Filter, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConceptNode {
  id: string;
  label: string;
  category: string;
  importance: number;
  x: number;
  y: number;
}

interface ConceptEdge {
  source: string;
  target: string;
  strength: number;
}

const mockNodes: ConceptNode[] = [
  { id: "1", label: "Neural Networks", category: "ML", importance: 0.9, x: 400, y: 300 },
  { id: "2", label: "Backpropagation", category: "ML", importance: 0.85, x: 550, y: 200 },
  { id: "3", label: "Gradient Descent", category: "ML", importance: 0.8, x: 600, y: 350 },
  { id: "4", label: "Loss Functions", category: "ML", importance: 0.75, x: 450, y: 450 },
  { id: "5", label: "Activation Functions", category: "ML", importance: 0.7, x: 250, y: 200 },
  { id: "6", label: "SQL", category: "DB", importance: 0.85, x: 150, y: 400 },
  { id: "7", label: "Normalization", category: "DB", importance: 0.7, x: 100, y: 300 },
  { id: "8", label: "Indexing", category: "DB", importance: 0.65, x: 200, y: 500 },
  { id: "9", label: "Sorting Algorithms", category: "Algo", importance: 0.8, x: 700, y: 150 },
  { id: "10", label: "Time Complexity", category: "Algo", importance: 0.9, x: 750, y: 300 },
];

const mockEdges: ConceptEdge[] = [
  { source: "1", target: "2", strength: 0.9 },
  { source: "1", target: "3", strength: 0.85 },
  { source: "1", target: "4", strength: 0.8 },
  { source: "1", target: "5", strength: 0.75 },
  { source: "2", target: "3", strength: 0.95 },
  { source: "3", target: "4", strength: 0.7 },
  { source: "6", target: "7", strength: 0.8 },
  { source: "6", target: "8", strength: 0.75 },
  { source: "9", target: "10", strength: 0.9 },
];

const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
  ML: { bg: "hsl(38, 92%, 50%)", border: "hsl(38, 92%, 40%)", text: "hsl(38, 92%, 20%)" },
  DB: { bg: "hsl(199, 89%, 48%)", border: "hsl(199, 89%, 38%)", text: "hsl(199, 89%, 20%)" },
  Algo: { bg: "hsl(142, 71%, 45%)", border: "hsl(142, 71%, 35%)", text: "hsl(142, 71%, 20%)" },
};

export default function ConceptGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);
  const [selectedNode, setSelectedNode] = useState<ConceptNode | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    // Clear canvas
    ctx.fillStyle = "hsl(210, 20%, 98%)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Apply zoom
    ctx.save();
    ctx.scale(zoom, zoom);

    // Draw edges
    mockEdges.forEach((edge) => {
      const source = mockNodes.find((n) => n.id === edge.source);
      const target = mockNodes.find((n) => n.id === edge.target);
      if (!source || !target) return;

      ctx.beginPath();
      ctx.moveTo(source.x, source.y);
      ctx.lineTo(target.x, target.y);
      ctx.strokeStyle = `hsla(222, 47%, 20%, ${edge.strength * 0.3})`;
      ctx.lineWidth = edge.strength * 3;
      ctx.stroke();
    });

    // Draw nodes
    mockNodes.forEach((node) => {
      const colors = categoryColors[node.category] || categoryColors.ML;
      const radius = 20 + node.importance * 20;
      const isSelected = selectedNode?.id === node.id;
      const matchesSearch = search && node.label.toLowerCase().includes(search.toLowerCase());

      // Glow effect for selected/searched
      if (isSelected || matchesSearch) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius + 8, 0, Math.PI * 2);
        ctx.fillStyle = `${colors.bg}40`;
        ctx.fill();
      }

      // Node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = colors.bg;
      ctx.fill();
      ctx.strokeStyle = colors.border;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Label
      ctx.fillStyle = "hsl(222, 47%, 11%)";
      ctx.font = "600 12px IBM Plex Sans";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      // Wrap text if needed
      const words = node.label.split(" ");
      if (words.length > 1 && ctx.measureText(node.label).width > radius * 1.5) {
        ctx.fillText(words[0], node.x, node.y - 6);
        ctx.fillText(words.slice(1).join(" "), node.x, node.y + 8);
      } else {
        ctx.fillText(node.label, node.x, node.y);
      }
    });

    ctx.restore();
  }, [zoom, selectedNode, search]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;

    const clicked = mockNodes.find((node) => {
      const radius = 20 + node.importance * 20;
      const distance = Math.sqrt((node.x - x) ** 2 + (node.y - y) ** 2);
      return distance <= radius;
    });

    setSelectedNode(clicked || null);
  };

  return (
    <MainLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold font-serif mb-2">Concept Graph</h1>
            <p className="text-muted-foreground">
              Explore connections between concepts across your documents.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search concepts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 w-48"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Rebuild
            </Button>
          </div>
        </div>

        <div className="flex-1 flex gap-6">
          {/* Graph Canvas */}
          <Card variant="elevated" className="flex-1 animate-slide-up relative overflow-hidden">
            <canvas
              ref={canvasRef}
              className="w-full h-full cursor-pointer"
              onClick={handleCanvasClick}
            />
            
            {/* Zoom Controls */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <Button
                variant="secondary"
                size="icon-sm"
                onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium w-12 text-center">{Math.round(zoom * 100)}%</span>
              <Button
                variant="secondary"
                size="icon-sm"
                onClick={() => setZoom((z) => Math.min(2, z + 0.1))}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon-sm" onClick={() => setZoom(1)}>
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Legend */}
            <div className="absolute top-4 left-4 flex items-center gap-4">
              {Object.entries(categoryColors).map(([category, colors]) => (
                <div key={category} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: colors.bg }}
                  />
                  <span className="text-sm">{category}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Details Panel */}
          <Card variant="elevated" className="w-80 animate-slide-in-right shrink-0">
            <CardHeader>
              <CardTitle className="text-lg">
                {selectedNode ? selectedNode.label : "Select a Concept"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedNode ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Category</p>
                    <Badge
                      style={{
                        backgroundColor: `${categoryColors[selectedNode.category].bg}20`,
                        color: categoryColors[selectedNode.category].bg,
                        borderColor: `${categoryColors[selectedNode.category].bg}40`,
                      }}
                    >
                      {selectedNode.category}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Importance</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent rounded-full"
                          style={{ width: `${selectedNode.importance * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {Math.round(selectedNode.importance * 100)}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Connected Concepts</p>
                    <div className="space-y-2">
                      {mockEdges
                        .filter((e) => e.source === selectedNode.id || e.target === selectedNode.id)
                        .map((edge) => {
                          const otherId = edge.source === selectedNode.id ? edge.target : edge.source;
                          const other = mockNodes.find((n) => n.id === otherId);
                          if (!other) return null;
                          return (
                            <div
                              key={edge.source + edge.target}
                              className="flex items-center justify-between p-2 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted transition-colors"
                              onClick={() => setSelectedNode(other)}
                            >
                              <span className="text-sm">{other.label}</span>
                              <span className="text-xs text-muted-foreground">
                                {Math.round(edge.strength * 100)}%
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <Button variant="accent" className="w-full mt-4">
                    Ask about this concept
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Click on a node in the graph to see details about that concept and its connections.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
