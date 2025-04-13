
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const FeatureCard = ({ title, description, icon, className }: FeatureCardProps) => {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl shadow-sm border p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-md",
      className
    )}>
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-4">
          <div className="p-2.5 rounded-full bg-white dark:bg-gray-800 shadow-sm">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground flex-grow">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
