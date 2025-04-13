
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MediaPlayer from "@/components/MediaPlayer";
import YouTubePlayer from "@/components/YouTubePlayer";

// Mock data for music tracks with real audio sources
const musicTracks = [
  {
    id: 1,
    title: "Calm Waters",
    artist: "Serenity Sounds",
    coverImage: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=1974&auto=format&fit=crop",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    category: "meditation",
  },
  {
    id: 2,
    title: "Forest Journey",
    artist: "Nature Harmony",
    coverImage: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    category: "sleep",
  },
  {
    id: 3,
    title: "Gentle Rain",
    artist: "Water Elements",
    coverImage: "https://images.unsplash.com/photo-1525824236856-8c0a31dfe3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    category: "meditation",
  },
  {
    id: 4,
    title: "Mountain Breeze",
    artist: "Calm Collective",
    coverImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    category: "focus",
  },
  {
    id: 5,
    title: "Starry Night",
    artist: "Dream Weavers",
    coverImage: "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    category: "sleep",
  },
  {
    id: 6,
    title: "Ocean Waves",
    artist: "Nature Sounds",
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    category: "focus",
  },
];

// Mock data for YouTube videos
const videos = [
  {
    id: 1,
    videoId: "inpok4MKVLM",
    title: "5-Minute Meditation You Can Do Anywhere",
    category: "meditation",
  },
  {
    id: 2,
    videoId: "aEqASBdFpr8",
    title: "Calming Sleep Music for Deep Sleep",
    category: "sleep",
  },
  {
    id: 3,
    videoId: "O-6f5wQXSu8",
    title: "Deep Focus Music for Studying and Concentration",
    category: "focus",
  },
  {
    id: 4,
    videoId: "W19PdslW7iw",
    title: "Relaxing Nature Sounds - Forest Birds Singing",
    category: "meditation",
  },
  {
    id: 5,
    videoId: "1ZYbU82GVz4",
    title: "30 Minute Deep Sleep Music",
    category: "sleep",
  },
  {
    id: 6,
    videoId: "9wdYlYOjkdo",
    title: "Mozart for Brain Power - Classical Music for Studying",
    category: "focus",
  },
];

const MediaPage = () => {
  const [activeTab, setActiveTab] = useState("music");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeAudio, setActiveAudio] = useState<number | null>(null);

  // Filter music tracks by category
  const filteredMusic = activeCategory === "all"
    ? musicTracks
    : musicTracks.filter(track => track.category === activeCategory);

  // Filter videos by category
  const filteredVideos = activeCategory === "all"
    ? videos
    : videos.filter(video => video.category === activeCategory);

  // Handle audio playing to ensure only one plays at a time
  const handleAudioPlay = (trackId: number) => {
    setActiveAudio(trackId === activeAudio ? null : trackId);
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 gradient-bg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Wellness Media</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore our curated collection of music and videos designed to help you
            relax, focus, and improve your mental wellbeing.
          </p>
        </div>

        {/* Media Tabs */}
        <Tabs defaultValue="music" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <TabsList>
              <TabsTrigger value="music">Music</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
            </TabsList>
            
            <div className="mt-4 md:mt-0 flex gap-2">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-4 py-1.5 text-sm rounded-full ${
                  activeCategory === "all"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveCategory("meditation")}
                className={`px-4 py-1.5 text-sm rounded-full ${
                  activeCategory === "meditation"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                Meditation
              </button>
              <button
                onClick={() => setActiveCategory("sleep")}
                className={`px-4 py-1.5 text-sm rounded-full ${
                  activeCategory === "sleep"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                Sleep
              </button>
              <button
                onClick={() => setActiveCategory("focus")}
                className={`px-4 py-1.5 text-sm rounded-full ${
                  activeCategory === "focus"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                Focus
              </button>
            </div>
          </div>

          <TabsContent value="music">
            {filteredMusic.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMusic.map((track) => (
                  <MediaPlayer
                    key={track.id}
                    title={track.title}
                    artist={track.artist}
                    coverImage={track.coverImage}
                    audioSrc={track.audioSrc}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">
                  No tracks found in this category
                </h3>
                <p className="text-muted-foreground">
                  Try selecting a different category.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="videos">
            {filteredVideos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredVideos.map((video) => (
                  <YouTubePlayer
                    key={video.id}
                    videoId={video.videoId}
                    title={video.title}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">
                  No videos found in this category
                </h3>
                <p className="text-muted-foreground">
                  Try selecting a different category.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Benefits Section */}
        <div className="mt-20 bg-secondary rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Benefits of Sound and Visual Therapy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-xl">
              <h3 className="text-xl font-medium mb-2">Stress Reduction</h3>
              <p className="text-muted-foreground">
                Calming sounds and visuals can lower cortisol levels and help your
                body enter a relaxed state, reducing the physical effects of stress.
              </p>
            </div>
            <div className="bg-background p-6 rounded-xl">
              <h3 className="text-xl font-medium mb-2">Improved Sleep</h3>
              <p className="text-muted-foreground">
                Sleep-focused audio and visual content can help quiet the mind and
                prepare your body for restful sleep, improving sleep quality.
              </p>
            </div>
            <div className="bg-background p-6 rounded-xl">
              <h3 className="text-xl font-medium mb-2">Enhanced Focus</h3>
              <p className="text-muted-foreground">
                Certain types of music and visual stimuli can improve concentration
                and productivity by creating an optimal environment for focus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPage;
