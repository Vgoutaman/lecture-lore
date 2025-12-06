import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  MessageSquare,
  Upload,
  FileText,
  Network,
  Layers,
  GraduationCap,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  to: string;
  icon: React.ElementType;
  label: string;
  badge?: string;
}

const mainNavItems: NavItem[] = [
  { to: "/", icon: BookOpen, label: "Dashboard" },
  { to: "/upload", icon: Upload, label: "Upload" },
  { to: "/chat", icon: MessageSquare, label: "Q&A Chat" },
  { to: "/documents", icon: FileText, label: "Documents" },
  { to: "/graph", icon: Network, label: "Concept Graph" },
  { to: "/flashcards", icon: Layers, label: "Flashcards" },
  { to: "/exam-mode", icon: GraduationCap, label: "Exam Mode", badge: "Pro" },
];

const bottomNavItems: NavItem[] = [
  { to: "/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 p-4 border-b border-sidebar-border">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground shrink-0">
          <Sparkles className="h-5 w-5" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <h1 className="font-serif text-lg font-semibold text-sidebar-foreground">
              StudentDoc
            </h1>
            <p className="text-xs text-sidebar-foreground/60">Q&A Assistant</p>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {mainNavItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink key={item.to} to={item.to}>
              <Button
                variant={isActive ? "sidebar-active" : "sidebar"}
                size={collapsed ? "icon" : "default"}
                className={cn(
                  "w-full",
                  collapsed && "justify-center"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-sidebar-primary text-sidebar-primary-foreground font-medium">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Button>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        {bottomNavItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink key={item.to} to={item.to}>
              <Button
                variant={isActive ? "sidebar-active" : "sidebar"}
                size={collapsed ? "icon" : "default"}
                className={cn(
                  "w-full",
                  collapsed && "justify-center"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
              </Button>
            </NavLink>
          );
        })}

        {/* Collapse Toggle */}
        <Button
          variant="ghost"
          size={collapsed ? "icon" : "default"}
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "w-full text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent",
            collapsed && "justify-center"
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span className="flex-1 text-left">Collapse</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}
