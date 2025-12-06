import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentDocuments } from "@/components/dashboard/RecentDocuments";
import { StudyProgress } from "@/components/dashboard/StudyProgress";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { FileText, MessageSquare, Layers, Clock } from "lucide-react";

export default function Dashboard() {
  return (
    <MainLayout>
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold font-serif mb-2">Welcome back, Student</h1>
        <p className="text-muted-foreground text-lg">
          Your document-grounded learning assistant is ready to help.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Documents"
          value={12}
          description="4 added this week"
          icon={FileText}
          trend={{ value: 15, positive: true }}
        />
        <StatCard
          title="Questions Asked"
          value={48}
          description="12 today"
          icon={MessageSquare}
          trend={{ value: 23, positive: true }}
        />
        <StatCard
          title="Flashcards"
          value={156}
          description="32 due for review"
          icon={Layers}
        />
        <StatCard
          title="Study Time"
          value="24h"
          description="This week"
          icon={Clock}
          trend={{ value: 8, positive: true }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RecentDocuments />
          <StudyProgress />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </MainLayout>
  );
}
