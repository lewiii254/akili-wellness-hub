
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Headphones, Calendar } from "lucide-react";

interface ProfileStatsProps {
  resourcesAccessed: number;
  mediaPlayed: number;
  daysActive: number;
}

const ProfileStats = ({ resourcesAccessed, mediaPlayed, daysActive }: ProfileStatsProps) => {
  const stats = [
    {
      label: "Resources Accessed",
      value: resourcesAccessed,
      icon: BookOpen,
      color: "text-blue-500",
    },
    {
      label: "Media Played",
      value: mediaPlayed,
      icon: Headphones,
      color: "text-purple-500",
    },
    {
      label: "Days Active",
      value: daysActive,
      icon: Calendar,
      color: "text-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProfileStats;
