
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  description: string;
  trend?: {
    value: string;
    direction: "up" | "down" | "neutral";
  };
}

const DashboardCard = ({
  title,
  value,
  icon,
  description,
  trend,
}: DashboardCardProps) => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-md bg-white/90 dark:bg-gray-800/90 border-none rounded-xl overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary/50"></div>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="rounded-full bg-primary/10 dark:bg-primary/20 p-2.5 text-primary ring-1 ring-primary/10 shadow-inner">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center justify-between mt-3">
          <CardDescription className="text-xs">{description}</CardDescription>
          {trend && (
            <div
              className={cn(
                "flex items-center text-xs font-medium rounded-full px-1.5 py-0.5",
                trend.direction === "up"
                  ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30"
                  : trend.direction === "down"
                  ? "text-rose-500 bg-rose-50 dark:bg-rose-950/30"
                  : "text-muted-foreground"
              )}
            >
              {trend.direction === "up" ? (
                <ArrowUpIcon className="mr-1 h-3 w-3" />
              ) : trend.direction === "down" ? (
                <ArrowDownIcon className="mr-1 h-3 w-3" />
              ) : null}
              {trend.value}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
