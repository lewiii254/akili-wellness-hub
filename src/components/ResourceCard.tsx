
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Clock, Tag, Star } from "lucide-react";

interface ResourceCardProps {
  title: string;
  description: string;
  category: string;
  timeToRead: string;
  image?: string;
  link: string;
  rating?: number;
  className?: string;
}

const ResourceCard = ({
  title,
  description,
  category,
  timeToRead,
  image,
  link,
  rating = 0,
  className,
}: ResourceCardProps) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-3.5 h-3.5 fill-akili-yellow text-akili-yellow" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="w-3.5 h-3.5 fill-akili-yellow text-akili-yellow" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }} />);
      } else {
        stars.push(<Star key={i} className="w-3.5 h-3.5 text-gray-300" />);
      }
    }
    
    return <div className="flex">{stars}</div>;
  };
  
  return (
    <div
      className={cn(
        "rounded-xl border overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-md bg-background flex flex-col h-full group",
        className
      )}
    >
      {image && (
        <div className="h-52 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-xs bg-akili-light-purple text-akili-dark-purple px-3 py-1 rounded-full">
            <Tag className="w-3.5 h-3.5 mr-1" />
            {category}
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5 mr-1" />
            {timeToRead}
          </div>
        </div>
        <h3 className="text-xl font-medium mb-2 group-hover:text-akili-purple transition-colors">{title}</h3>
        <p className="text-muted-foreground text-sm mb-5 flex-grow">{description}</p>
        
        {rating > 0 && (
          <div className="mb-4 flex items-center">
            {renderStars()}
            <span className="ml-2 text-sm text-muted-foreground">{rating.toFixed(1)}</span>
          </div>
        )}
        
        <div className="mt-auto">
          <Button asChild variant="ghost" className="group p-0 h-auto font-medium">
            <a href={link} className="flex items-center hover:underline text-akili-dark-purple">
              Read more
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
