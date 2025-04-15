
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
      "relative overflow-hidden rounded-2xl shadow-sm border p-8 backdrop-blur-sm",
      "transition-all duration-300 hover:shadow-md group h-full",
      className
    )}>
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-6">
          <div className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-sm group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-3 group-hover:text-akili-purple transition-colors">{title}</h3>
        <p className="text-muted-foreground flex-grow">{description}</p>
        
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary/5 to-primary/10 rounded-full blur-2xl group-hover:scale-125 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
      </div>
    </div>
  );
};

export default FeatureCard;
