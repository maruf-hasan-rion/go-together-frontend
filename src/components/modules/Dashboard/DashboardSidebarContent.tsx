"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { getIconComponent } from "@/lib/icon-mapper";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/stores/use-ui-store";
import { NavSection } from "@/types/dashboard.interface";
import { UserInfo } from "@/types/user.interface";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

interface DashboardSidebarContentProps {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}

const DashboardSidebarContent = ({
  userInfo,
  navItems,
}: DashboardSidebarContentProps) => {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useUiStore();

  // The store is hydrated from localStorage on the client. Render the default
  // state on the server / first paint to avoid a hydration mismatch.
  const hydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const collapsed = hydrated && sidebarCollapsed;

  return (
    <div
      className={cn(
        "hidden md:flex h-full flex-col border-r bg-card transition-all duration-300",
        collapsed ? "w-20" : "w-64",
      )}
    >
      {/* Logo/Brand */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!collapsed && (
          <Link href={"/"}>
            <span className="text-xl font-bold text-primary">GoTogether</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-6">
          {navItems.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              {section.title && !collapsed && (
                <h4 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {section.title}
                </h4>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = getIconComponent(item.icon);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      title={item.title}
                      className={cn(
                        "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all",
                        collapsed ? "justify-center" : "gap-3",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span className="flex-1">{item.title}</span>}
                      {item.badge && !collapsed && (
                        <Badge
                          variant={isActive ? "secondary" : "default"}
                          className="ml-auto"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </div>
              {sectionIdx < navItems.length - 1 && (
                <Separator className="my-4" />
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* User Info at Bottom */}
      <div className="border-t p-4">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">
              {userInfo.fullName.charAt(0).toUpperCase()}
            </span>
          </div>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">{userInfo.fullName}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {userInfo.role.toLowerCase()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebarContent;
