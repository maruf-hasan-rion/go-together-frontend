import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string; // gradient
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  color = "bg-gradient-to-br from-gray-50 to-gray-100",
}: StatCardProps) => {
  return (
    <Card
      className={[
        "group relative overflow-hidden border-none",
        "transition-all duration-300",
        "hover:-translate-y-0.5 hover:shadow-xl",
        "focus-within:ring-2 focus-within:ring-white/30",
        color,
      ].join(" ")}
    >
      {/* soft highlight overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-black/10 blur-2xl" />
      </div>

      <CardHeader className="relative flex flex-row items-start justify-between gap-3 space-y-0 p-4 pb-2">
        <div className="min-w-0">
          <CardTitle className="text-sm font-medium text-white/90 leading-5">
            {title}
          </CardTitle>

          {description ? (
            <p className="mt-1 text-[11px] text-white/70 line-clamp-1">
              {description}
            </p>
          ) : (
            <p className="mt-1 text-[11px] text-white/0 select-none">.</p>
          )}
        </div>

        {/* icon badge */}
        <div className="shrink-0 rounded-xl bg-white/10 p-2 ring-1 ring-white/15">
          <Icon className="h-5 w-5 text-white/85" />
        </div>
      </CardHeader>

      <CardContent className="relative px-4 pb-4">
        <div className="flex items-end justify-between gap-3">
          <div className="text-2xl font-bold tracking-tight text-white">
            {value}
          </div>

          {trend && (
            <div
              className={[
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1",
                "text-[11px] font-medium ring-1",
                trend.isPositive
                  ? "bg-white/10 text-white ring-white/15"
                  : "bg-black/10 text-white ring-white/15",
              ].join(" ")}
            >
              {trend.isPositive ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              <span>
                {trend.isPositive ? "+" : ""}
                {trend.value}%
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
