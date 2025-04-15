
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Calendar as CalendarIcon, Clock, Star, MapPin, Globe, PhoneCall, Clock3 } from "lucide-react";
import { format } from "date-fns";

interface Therapist {
  id: number;
  name: string;
  title: string;
  specialties: string[];
  rating: number;
  sessions: number;
  experience: string;
  imageUrl: string;
  availability: string[];
  bio: string;
  rate: string;
}

const therapists: Therapist[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Clinical Psychologist",
    specialties: ["Anxiety", "Depression", "Trauma"],
    rating: 4.9,
    sessions: 850,
    experience: "10+ years",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    availability: ["Monday", "Wednesday", "Friday"],
    bio: "Dr. Johnson specializes in Cognitive Behavioral Therapy with a focus on anxiety disorders and depression. She creates a safe, compassionate environment where clients can work through challenges and develop practical coping strategies.",
    rate: "$120/session"
  },
  {
    id: 2,
    name: "Michael Chen, LMFT",
    title: "Licensed Marriage & Family Therapist",
    specialties: ["Relationships", "Family Conflict", "Stress Management"],
    rating: 4.8,
    sessions: 620,
    experience: "8 years",
    imageUrl: "https://images.unsplash.com/photo-1562788869-4ed32648eb72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80",
    availability: ["Tuesday", "Thursday", "Saturday"],
    bio: "Michael specializes in helping individuals, couples, and families navigate relationship challenges using a solution-focused approach. He's passionate about creating healthier communication patterns and fostering deeper connections.",
    rate: "$95/session"
  },
  {
    id: 3,
    name: "Dr. Amara Okafor",
    title: "Psychiatrist",
    specialties: ["Medication Management", "Anxiety Disorders", "ADHD"],
    rating: 4.9,
    sessions: 1240,
    experience: "12+ years",
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    availability: ["Monday", "Tuesday", "Thursday", "Friday"],
    bio: "Dr. Okafor combines medication management with a holistic approach to mental health. She believes in treating the whole person and works collaboratively with her clients to develop comprehensive treatment plans.",
    rate: "$175/session"
  },
  {
    id: 4,
    name: "James Wilson, LCSW",
    title: "Licensed Clinical Social Worker",
    specialties: ["Grief & Loss", "Life Transitions", "LGBTQ+ Issues"],
    rating: 4.7,
    sessions: 490,
    experience: "6 years",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    availability: ["Wednesday", "Thursday", "Saturday"],
    bio: "James creates a supportive space for clients to process grief, navigate major life changes, and explore identity. His approach is warm, client-centered, and affirming of all identities and backgrounds.",
    rate: "$90/session"
  },
];

const TherapyPage = () => {
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [filterSpecialty, setFilterSpecialty] = useState<string>("all");
  const { toast } = useToast();
  const navigate = useNavigate();

  const availableTimes = ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"];

  const handleBookNow = (therapist: Therapist) => {
    setSelectedTherapist(therapist);
    setSelectedDate(undefined);
    setSelectedTime(undefined);
    setBookingDialogOpen(true);
  };

  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Incomplete booking",
        description: "Please select both a date and time for your appointment",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Appointment booked!",
      description: `Your session with ${selectedTherapist?.name} is scheduled for ${format(selectedDate, "MMMM d, yyyy")} at ${selectedTime}.`,
    });
    
    setBookingDialogOpen(false);
    
    // Redirect to chat after short delay
    setTimeout(() => {
      navigate("/chat");
    }, 2000);
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ));
  };

  const filteredTherapists = filterSpecialty === "all" 
    ? therapists 
    : therapists.filter(t => t.specialties.includes(filterSpecialty));

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 gradient-bg">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Mental Health Professionals</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with licensed therapists, counselors, and psychiatrists who can provide personalized support for your mental health journey.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all" onClick={() => setFilterSpecialty("all")}>All Professionals</TabsTrigger>
                <TabsTrigger value="anxiety" onClick={() => setFilterSpecialty("Anxiety")}>Anxiety</TabsTrigger>
                <TabsTrigger value="depression" onClick={() => setFilterSpecialty("Depression")}>Depression</TabsTrigger>
                <TabsTrigger value="relationships" onClick={() => setFilterSpecialty("Relationships")}>Relationships</TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </div>

        {/* Therapists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTherapists.map((therapist) => (
            <Card key={therapist.id} className="overflow-hidden transition-all hover:shadow-lg">
              <div className="aspect-[3/2] relative">
                <img 
                  src={therapist.imageUrl} 
                  alt={therapist.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="flex items-center text-white">
                    <div className="flex">{renderStars(therapist.rating)}</div>
                    <span className="ml-2 text-sm font-medium">{therapist.rating}</span>
                    <span className="ml-2 text-xs">({therapist.sessions} sessions)</span>
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle>{therapist.name}</CardTitle>
                <CardDescription>{therapist.title}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-1 mb-2">
                  {therapist.specialties.map((specialty) => (
                    <span 
                      key={specialty} 
                      className="px-2 py-1 bg-secondary text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock3 className="w-4 h-4 mr-2" />
                  <span>{therapist.experience} experience</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <PhoneCall className="w-4 h-4 mr-2" />
                  <span>Online & in-person sessions</span>
                </div>
                <div className="flex items-center text-sm font-medium">
                  <span>{therapist.rate}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleBookNow(therapist)}>
                  Book Consultation
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Book appointment dialog */}
        <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Book a session with {selectedTherapist?.name}</DialogTitle>
              <DialogDescription>
                Select a date and time that works for you. Initial consultations are 50 minutes.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Select Date</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="border rounded-md p-3"
                    disabled={(date) => {
                      // Disable past dates
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      
                      // Disable weekends if the therapist doesn't work on those days
                      const day = date.getDay();
                      const isWeekend = day === 0 || day === 6;
                      const isAvailable = selectedTherapist?.availability.includes(
                        ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day]
                      );
                      
                      return date < today || isWeekend || !isAvailable;
                    }}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time">Select Time</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTimes.map((time) => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setBookingDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleConfirmBooking}>
                Confirm Booking
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Additional Information */}
        <div className="mt-16 p-6 bg-background/50 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Why Choose AkiliSpa Therapy✨</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Qualified Professionals</h3>
              <p className="text-muted-foreground">All our therapists are licensed and have extensive experience in their areas of expertise.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Online & In-Person</h3>
              <p className="text-muted-foreground">Choose between virtual sessions from anywhere or face-to-face meetings at our wellness centers.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Flexible Scheduling</h3>
              <p className="text-muted-foreground">Book sessions at times that work for you, with evening and weekend options available.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapyPage;
