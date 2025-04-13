
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Clock, Tag } from "lucide-react";

interface ResourceCardProps {
  title: string;
  description: string;
  category: string;
  timeToRead: string;
  image?: string;
  link: string;
  className?: string;
}

const ResourceCard = ({
  title,
  description,
  category,
  timeToRead,
  image,
  link,
  className,
}: ResourceCardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl border overflow-hidden transition-all duration-300 hover:shadow-md bg-background flex flex-col h-full",
        className
      )}
    >
      {image && (
        <div className="h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center text-xs bg-akili-light-purple text-akili-dark-purple px-3 py-1 rounded-full">
            <Tag className="w-3.5 h-3.5 mr-1" />
            {category}
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5 mr-1" />
            {timeToRead}
          </div>
        </div>
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-5 flex-grow">{description}</p>
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
