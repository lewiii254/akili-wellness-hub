
import React, { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface MediaPlayerProps {
  title: string;
  artist: string;
  coverImage: string;
  audioSrc?: string;
  className?: string;
}

const MediaPlayer = ({
  title,
  artist,
  coverImage,
  audioSrc,
  className,
}: MediaPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, we would control the audio element here
  };

  return (
    <div
      className={cn(
        "rounded-xl border bg-background p-4 flex flex-col w-full max-w-md",
        className
      )}
    >
      <div className="relative rounded-lg overflow-hidden mb-4 aspect-square">
        <img 
          src={coverImage} 
          alt={`${title} by ${artist}`}
          className="w-full h-full object-cover"
        />
        <div className={cn(
          "absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity",
          isPlaying ? "opacity-0" : "opacity-100"
        )}>
          <button 
            onClick={togglePlayPause}
            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center"
          >
            <Play className="w-8 h-8 text-white" />
          </button>
        </div>
      </div>
      
      <h3 className="font-medium text-lg">{title}</h3>
      <p className="text-muted-foreground text-sm">{artist}</p>
      
      <div className="mt-4">
        <Slider
          defaultValue={[progress]}
          max={100}
          step={1}
          onValueChange={(value) => setProgress(value[0])}
          className="my-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground mb-3">
          <span>{formatTime(progress * 3)}</span>
          <span>{formatTime(300)}</span> {/* 5 mins (300 seconds) placeholder duration */}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <button className="text-muted-foreground hover:text-foreground">
          <SkipBack className="w-5 h-5" />
        </button>
        <button
          onClick={togglePlayPause}
          className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>
        <button className="text-muted-foreground hover:text-foreground">
          <SkipForward className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-muted-foreground" />
          <Slider
            defaultValue={[70]}
            max={100}
            step={1}
            className="w-20"
          />
        </div>
      </div>
    </div>
  );
};

// Helper function to format seconds to MM:SS
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export default MediaPlayer;
