
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ResourceCard from "@/components/ResourceCard";
import { Search } from "lucide-react";

// Mock data for resources
const resourcesData = [
  {
    id: 1,
    title: "Understanding Anxiety: A Comprehensive Guide",
    description:
      "Learn about the different types of anxiety disorders, their symptoms, and effective coping strategies.",
    category: "Anxiety",
    timeToRead: "15 min read",
    image: "https://images.unsplash.com/photo-1490131784822-b4626a8ec96a?q=80&w=2070&auto=format&fit=crop",
    link: "#",
  },
  {
    id: 2,
    title: "Mindfulness Techniques for Daily Stress",
    description:
      "Discover simple mindfulness practices that you can incorporate into your daily routine to manage stress.",
    category: "Stress Management",
    timeToRead: "10 min read",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2022&auto=format&fit=crop",
    link: "#",
  },
  {
    id: 3,
    title: "Recognizing the Signs of Depression",
    description:
      "Learn how to identify the symptoms of depression in yourself and others, and when to seek professional help.",
    category: "Depression",
    timeToRead: "12 min read",
    image: "https://images.unsplash.com/photo-1514845505178-849cebf1a91d?q=80&w=1974&auto=format&fit=crop",
    link: "#",
  },
  {
    id: 4,
    title: "Building Resilience in Difficult Times",
    description:
      "Strategies to develop emotional resilience and maintain mental wellness during challenging life periods.",
    category: "Resilience",
    timeToRead: "8 min read",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2070&auto=format&fit=crop",
    link: "#",
  },
  {
    id: 5,
    title: "Sleep Hygiene: Improving Your Mental Health Through Better Sleep",
    description:
      "Understand the connection between quality sleep and mental health, with practical tips for better sleep habits.",
    category: "Sleep",
    timeToRead: "10 min read",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=2060&auto=format&fit=crop",
    link: "#",
  },
  {
    id: 6,
    title: "Communication Skills for Healthy Relationships",
    description:
      "Learn effective communication techniques to improve your relationships and support your mental wellness.",
    category: "Relationships",
    timeToRead: "14 min read",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop",
    link: "#",
  },
];

// Categories for filtering
const categories = [
  "All Categories",
  "Anxiety",
  "Depression",
  "Stress Management",
  "Resilience",
  "Sleep",
  "Relationships",
];

const ResourcesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Filter resources based on search query and selected category
  const filteredResources = resourcesData.filter((resource) => {
    const matchesSearch = resource.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) || 
      resource.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "All Categories" || 
      resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 gradient-bg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Mental Health Resources</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore our collection of articles, guides, and tools designed to
            help you understand and manage various aspects of mental health.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                title={resource.title}
                description={resource.description}
                category={resource.category}
                timeToRead={resource.timeToRead}
                image={resource.image}
                link={resource.link}
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <h3 className="text-xl font-medium mb-2">No resources found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-medium mb-4">Need Immediate Support?</h3>
          <p className="text-muted-foreground mb-4">
            If you're in crisis or need urgent help, please contact one of these
            support services:
          </p>
          <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 bg-background">
              <h4 className="font-medium">National Suicide Prevention Lifeline</h4>
              <p className="text-akili-purple text-lg font-semibold">1-800-273-8255</p>
              <p className="text-sm text-muted-foreground">Available 24/7</p>
            </div>
            <div className="border rounded-lg p-4 bg-background">
              <h4 className="font-medium">Crisis Text Line</h4>
              <p className="text-akili-purple text-lg font-semibold">Text HOME to 741741</p>
              <p className="text-sm text-muted-foreground">Available 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
