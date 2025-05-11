
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
    <Card className="shadow-soft hover:shadow-card transition-all duration-300 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-none overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary/50"></div>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="rounded-full bg-primary/10 dark:bg-primary/20 p-2 text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center justify-between mt-2">
          <CardDescription>{description}</CardDescription>
          {trend && (
            <div
              className={cn(
                "flex items-center text-xs font-medium",
                trend.direction === "up"
                  ? "text-emerald-500"
                  : trend.direction === "down"
                  ? "text-rose-500"
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
