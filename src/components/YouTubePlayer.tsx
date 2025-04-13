
import React from "react";
import { cn } from "@/lib/utils";

interface YouTubePlayerProps {
  videoId: string;
  title: string;
  className?: string;
}

const YouTubePlayer = ({ videoId, title, className }: YouTubePlayerProps) => {
  return (
    <div className={cn("rounded-xl overflow-hidden", className)}>
      <div className="aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
      <h3 className="font-medium mt-2 p-2">{title}</h3>
    </div>
  );
};

export default YouTubePlayer;
