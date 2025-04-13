
import React from "react";
import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

interface TestimonialProps {
  quote: string;
  author: string;
  role?: string;
  image?: string;
  className?: string;
}

const Testimonial = ({ quote, author, role, image, className }: TestimonialProps) => {
  return (
    <div className={cn(
      "p-6 rounded-2xl relative overflow-hidden",
      "bg-background/50 backdrop-blur-sm border shadow-sm",
      "flex flex-col",
      className
    )}>
      <Quote className="h-8 w-8 text-akili-purple opacity-30 mb-4" />
      <p className="text-lg italic mb-6 text-foreground/90">{quote}</p>
      <div className="mt-auto flex items-center gap-3">
        {image ? (
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img src={image} alt={author} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-akili-purple to-akili-blue flex items-center justify-center text-white font-medium text-lg">
            {author.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-medium">{author}</p>
          {role && <p className="text-sm text-muted-foreground">{role}</p>}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
