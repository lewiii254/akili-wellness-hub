
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  emoji?: string;
  className?: string;
}

const QuickAction = ({ title, description, icon, to, emoji, className }: QuickActionProps) => {
  return (
    <Link to={to} className={cn(
      "block p-4 rounded-xl border bg-background hover:bg-secondary/20 transition-colors duration-200",
      "flex items-center gap-3",
      className
    )}>
      <div className="rounded-full bg-primary/10 p-3 flex-shrink-0">
        {icon}
      </div>
      <div className="flex-grow">
        <h3 className="font-medium text-foreground flex items-center gap-2">
          {title}
          {emoji && <span className="text-lg">{emoji}</span>}
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Button variant="ghost" size="icon" className="flex-shrink-0">
        <span className="sr-only">Go to {title}</span>
        <span className="text-lg">→</span>
      </Button>
    </Link>
  );
};

export default QuickAction;
