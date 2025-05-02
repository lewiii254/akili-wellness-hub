
import React, { useState, useRef, useEffect } from "react";
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
  audioSrc = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Default audio source
  className,
}: MediaPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current && duration) {
      const newTime = (value[0] / 100) * duration;
      audioRef.current.currentTime = newTime;
      setProgress(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (audioRef.current) {
      const newVolume = value[0] / 100;
      audioRef.current.volume = newVolume;
      setVolume(value[0]);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      
      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };

      const handleEnded = () => {
        setIsPlaying(false);
        setProgress(0);
      };

      // Setup audio event listeners
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('ended', handleEnded);
      
      // Set initial volume
      audio.volume = volume / 100;

      // Cleanup
      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [volume]);

  return (
      <>
          <div
      className={cn(
        "rounded-xl border bg-background p-4 flex flex-col w-full max-w-md",
        className
      )}
    >
      <audio ref={audioRef} src={audioSrc} preload="metadata" />
      
      <div className="relative rounded-lg overflow-hidden mb-4 aspect-square">
        <img 
          src={coverImage} 
          alt={`${title} by ${artist}`}
          className="w-full h-full object-cover"
        />
        <div className={cn(
          "absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity",
          isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
        )}>
          <button 
            onClick={togglePlayPause}
            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center"
          >
            {isPlaying ? 
              <Pause className="w-8 h-8 text-white" /> : 
              <Play className="w-8 h-8 text-white ml-1" />
            }
          </button>
        </div>
      </div>
      
      <h3 className="font-medium text-lg">{title}</h3>
      <p className="text-muted-foreground text-sm">{artist}</p>
      
      <div className="mt-4">
        <Slider
          value={[progress]}
          max={100}
          step={1}
          onValueChange={handleProgressChange}
          className="my-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground mb-3">
          <span>{formatTime(progress * duration / 100)}</span>
          <span>{formatTime(duration)}</span>
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
            <Play className="w-5 h-5 ml-0.5" />
          )}
        </button>
        <button className="text-muted-foreground hover:text-foreground">
          <SkipForward className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-muted-foreground" />
          <Slider
            value={[volume]}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
            className="w-20"
          />
        </div>
      </div>
    </div>
      </>
  );
};

// Helper function to format seconds to MM:SS
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export default MediaPlayer;
