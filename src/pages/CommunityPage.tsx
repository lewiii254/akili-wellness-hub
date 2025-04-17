import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Shield, 
  Lock, 
  Mail,
  Calendar,
  MessageSquare,
  Flag,
  ThumbsUp,
  Clock,
  User,
  Loader2
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useAuth } from "@/hooks/useAuth";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";

interface Discussion {
  id: string | number;
  title: string;
  content?: string;
  author_id?: string;
  author_name?: string;
  author_avatar?: string;
  created_at?: string;
  updated_at?: string;
  is_approved?: boolean;
  is_hidden?: boolean;
  tags?: string[];
  reply_count?: number;
  like_count?: number;
  author?: string;
  date?: string;
  replies?: number;
  likes?: number;
  authorAvatar?: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  attendees: number;
  host: string;
  type: string;
}

interface SupportGroup {
  id: number;
  name: string;
  members: number;
  description: string;
  topics: string[];
}

const CommunityPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postTags, setPostTags] = useState("");
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [currentDiscussionId, setCurrentDiscussionId] = useState<number | string | null>(null);
  const [reportReason, setReportReason] = useState("");
  const [submittingReport, setSubmittingReport] = useState(false);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [isLoadingDiscussions, setIsLoadingDiscussions] = useState(true);
  const { user } = useAuth();

  const defaultDiscussions = [
    {
      id: "sample-1",
      title: "Dealing with daily anxiety",
      author: "Sarah J.",
      date: "3 days ago",
      replies: 12,
      likes: 24,
      tags: ["Anxiety", "Self-care"],
      authorAvatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: "sample-2",
      title: "Mindfulness practice techniques",
      author: "Michael T.",
      date: "1 week ago",
      replies: 28,
      likes: 56,
      tags: ["Mindfulness", "Meditation"],
      authorAvatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: "sample-3",
      title: "Sleep improvement strategies",
      author: "Elena D.",
      date: "2 days ago",
      replies: 17,
      likes: 31,
      tags: ["Sleep", "Wellness"],
      authorAvatar: "https://i.pravatar.cc/150?img=3",
    },
  ];

  const events = [
    {
      id: 1,
      title: "Group Meditation Session",
      date: "May 1, 2025",
      time: "6:00 PM - 7:00 PM",
      attendees: 12,
      host: "Dr. Lisa Chen",
      type: "Virtual",
    },
    {
      id: 2,
      title: "Stress Management Workshop",
      date: "May 5, 2025",
      time: "4:00 PM - 5:30 PM",
      attendees: 24,
      host: "Mark Wilson, LCSW",
      type: "In-person",
    },
  ];

  const supportGroups = [
    {
      id: 1,
      name: "Anxiety Support Circle",
      members: 145,
      description: "A supportive community for sharing anxiety experiences and coping strategies.",
      topics: ["General Anxiety", "Social Anxiety", "Panic Attacks"],
    },
    {
      id: 2,
      name: "Mindfulness Practitioners",
      members: 92,
      description: "For those practicing mindfulness and meditation in daily life.",
      topics: ["Meditation", "Present Awareness", "Mindful Living"],
    },
  ];

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = async () => {
    setIsLoadingDiscussions(true);
    try {
      const { data: tableExists, error: tableCheckError } = await supabase
        .from('community_discussions')
        .select('id')
        .limit(1);
      
      if (tableCheckError) {
        console.error("Error checking discussions table:", tableCheckError);
        setDiscussions(defaultDiscussions);
        return;
      }

      const { data, error } = await supabase
        .from('community_discussions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        const formattedDiscussions: Discussion[] = data.map(item => {
          let tags: string[] = [];
          try {
            if (item.tags === null) {
              tags = [];
            } else if (typeof item.tags === 'string') {
              tags = JSON.parse(item.tags);
            } else if (Array.isArray(item.tags)) {
              tags = item.tags;
            }
          } catch (e) {
            console.error("Failed to parse tags", e);
            tags = [];
          }

          const date = new Date(item.created_at);
          const now = new Date();
          const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
          let dateString = "";
          
          if (diffInDays === 0) {
            dateString = "Today";
          } else if (diffInDays === 1) {
            dateString = "Yesterday";
          } else if (diffInDays < 7) {
            dateString = `${diffInDays} days ago`;
          } else {
            dateString = date.toLocaleDateString();
          }

          return {
            id: item.id,
            title: item.title,
            content: item.content,
            author: item.author_name || "Anonymous User",
            date: dateString,
            replies: item.reply_count || 0,
            likes: item.like_count || 0,
            tags: tags || [],
            authorAvatar: item.author_avatar || `https://i.pravatar.cc/150?u=${item.id}`,
            author_id: item.author_id,
            author_name: item.author_name,
            author_avatar: item.author_avatar,
            created_at: item.created_at,
            updated_at: item.updated_at,
            is_approved: item.is_approved,
            is_hidden: item.is_hidden,
            reply_count: item.reply_count,
            like_count: item.like_count
          };
        });

        setDiscussions(formattedDiscussions.length > 0 ? formattedDiscussions : defaultDiscussions);
      } else {
        setDiscussions(defaultDiscussions);
      }
    } catch (error) {
      console.error("Error fetching discussions:", error);
      setDiscussions(defaultDiscussions);
      toast({
        title: "Error loading discussions",
        description: "We encountered an issue loading the community discussions. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingDiscussions(false);
    }
  };

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email is required",
        description: "Please enter your email address to get notified.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast({
        title: "Thank you for signing up!",
        description: "We'll notify you when our community features go live.",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1500);
  };

  const handleNewPost = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to post in the community.",
        variant: "destructive",
      });
      return;
    }
    
    if (!postTitle.trim()) {
      toast({
        title: "Post title required",
        description: "Please provide a title for your post.",
        variant: "destructive",
      });
      return;
    }
    
    if (!postContent.trim()) {
      toast({
        title: "Post content required",
        description: "Please write something to post.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const tags = postTags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      const { data: discussionData, error: discussionError } = await supabase
        .from('community_discussions')
        .insert({
          title: postTitle,
          content: postContent,
          tags: tags,
          author_id: user.id,
          author_name: user.email?.split('@')[0] || "User",
          is_approved: false
        })
        .select('id')
        .single();
      
      if (discussionError) {
        console.error("Error creating discussion post:", discussionError);
        throw discussionError;
      }

      if (discussionData && discussionData.id) {
        const { error: flagError } = await supabase
          .from('content_flags')
          .insert({
            content_type: 'discussion',
            content_id: discussionData.id,
            reporter_id: user.id,
            reason: "New post pending approval",
            status: "pending"
          });

        if (flagError) {
          console.error("Error creating moderation flag:", flagError);
        }
      }
      
      toast({
        title: "Post submitted",
        description: "Your post will be reviewed by moderators before appearing in the community.",
      });
      
      setPostTitle("");
      setPostContent("");
      setPostTags("");
      
      fetchDiscussions();
    } catch (error) {
      console.error("Error submitting post:", error);
      toast({
        title: "Error submitting post",
        description: "We encountered an issue submitting your post. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleJoinGroup = (groupName: string) => {
    toast({
      title: `Joined ${groupName}`,
      description: "You've successfully joined the group.",
    });
  };

  const handleRegisterForEvent = (eventTitle: string) => {
    toast({
      title: "Registration successful",
      description: `You've registered for "${eventTitle}"`,
    });
  };

  const openReportDialog = (discussionId: number | string) => {
    setCurrentDiscussionId(discussionId);
    setReportDialogOpen(true);
  };

  const handleSubmitReport = async () => {
    if (!reportReason.trim() || currentDiscussionId === null) {
      toast({
        title: "Report reason required",
        description: "Please provide a reason for your report.",
        variant: "destructive",
      });
      return;
    }

    setSubmittingReport(true);
    try {
      const { error } = await supabase
        .from('content_flags')
        .insert({
          content_type: 'discussion',
          content_id: String(currentDiscussionId),
          reporter_id: user?.id,
          reason: reportReason,
          status: "pending"
        });

      if (error) throw error;

      toast({
        title: "Report submitted",
        description: "Thank you for helping to keep our community safe.",
      });
      setReportReason("");
      setCurrentDiscussionId(null);
      setReportDialogOpen(false);
    } catch (error) {
      console.error("Error submitting report:", error);
      toast({
        title: "Error submitting report",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSubmittingReport(false);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 gradient-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AkiliSpa Community</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Connect with others on similar mental wellness journeys, share experiences, and find support in our safe and moderated spaces.
          </p>
        </div>

        {user ? (
          <Tabs defaultValue="discussions" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
              <TabsTrigger value="groups">Support Groups</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>
            
            <TabsContent value="discussions" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Start a Discussion</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="post-title" className="block text-sm font-medium mb-1">Title</label>
                    <Input 
                      id="post-title"
                      placeholder="Title for your discussion" 
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="post-content" className="block text-sm font-medium mb-1">Content</label>
                    <Textarea 
                      id="post-content"
                      placeholder="What's on your mind?" 
                      className="min-h-[100px]"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="post-tags" className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                    <Input 
                      id="post-tags"
                      placeholder="anxiety, wellness, mindfulness" 
                      value={postTags}
                      onChange={(e) => setPostTags(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button onClick={handleNewPost} disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Post Discussion
                  </Button>
                </div>
              </Card>
              
              <h3 className="text-xl font-semibold mb-2">Recent Discussions</h3>
              
              <div className="space-y-4">
                {isLoadingDiscussions ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : discussions.length > 0 ? (
                  discussions.map((discussion) => (
                    <Sheet key={discussion.id}>
                      <SheetTrigger asChild>
                        <Card className="p-5 hover:shadow-md cursor-pointer transition-shadow">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-10 w-10">
                              <img src={discussion.authorAvatar} alt={discussion.author} />
                            </Avatar>
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg mb-1">{discussion.title}</h4>
                              <div className="flex flex-wrap gap-2 mb-2">
                                {discussion.tags && discussion.tags.map((tag, index) => (
                                  <Badge key={`${discussion.id}-tag-${index}`} variant="outline" className="bg-secondary/30">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <span className="mr-4">By {discussion.author}</span>
                                <Clock className="h-3 w-3 mr-1" />
                                <span className="mr-4">{discussion.date}</span>
                                <MessageSquare className="h-3 w-3 mr-1" />
                                <span className="mr-4">{discussion.replies} replies</span>
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                <span>{discussion.likes}</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </SheetTrigger>
                      <SheetContent className="w-full sm:max-w-md">
                        <SheetHeader>
                          <SheetTitle>{discussion.title}</SheetTitle>
                          <SheetDescription>
                            Started by {discussion.author} · {discussion.date}
                          </SheetDescription>
                        </SheetHeader>
                        <div className="py-6">
                          <p className="mb-6">
                            {discussion.content || "This is a placeholder for the discussion content. In the full version, this would contain the actual post content and comments."}
                          </p>
                          <div className="space-y-4">
                            <div className="border-t pt-4">
                              <h4 className="font-medium mb-2">Comments</h4>
                              <Textarea placeholder="Add your comment..." className="mb-2" />
                              <div className="flex justify-between">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => openReportDialog(discussion.id)}
                                >
                                  <Flag className="h-4 w-4 mr-2" /> Report
                                </Button>
                                <Button size="sm">Comment</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No discussions yet. Be the first to start a conversation!</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="groups" className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Support Groups</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {supportGroups.map((group) => (
                  <Card key={group.id} className="p-6">
                    <h4 className="text-lg font-semibold mb-2">{group.name}</h4>
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{group.members} members</span>
                    </div>
                    <p className="mb-4">{group.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {group.topics.map((topic) => (
                        <Badge key={topic} variant="outline" className="bg-secondary/30">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    <Button 
                      onClick={() => handleJoinGroup(group.name)}
                      className="w-full"
                    >
                      Join Group
                    </Button>
                  </Card>
                ))}
              </div>
              
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" className="w-full">Create New Group</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Create Support Group</DrawerTitle>
                    <DrawerDescription>
                      Create a new support group for the community.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Group Name</label>
                      <Input placeholder="Name your group" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <Textarea placeholder="Describe what your group is about" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Topics (comma separated)</label>
                      <Input placeholder="e.g., Anxiety, Depression, Mindfulness" />
                    </div>
                  </div>
                  <DrawerFooter>
                    <Button onClick={() => {
                      toast({
                        title: "Group created",
                        description: "Your group will be reviewed by moderators.",
                      });
                    }}>Create Group</Button>
                    <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </TabsContent>
            
            <TabsContent value="events" className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
              
              <div className="space-y-4">
                {events.map((event) => (
                  <Card key={event.id} className="p-5">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h4 className="font-semibold text-lg mb-1">{event.title}</h4>
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="mr-3">{event.date}</span>
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-sm mb-3">
                          <User className="h-4 w-4 mr-1" />
                          <span className="mr-3">Host: {event.host}</span>
                          <Badge variant="outline">{event.type}</Badge>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{event.attendees} attending</span>
                        </div>
                      </div>
                      <Button 
                        className="mt-4 md:mt-0"
                        onClick={() => handleRegisterForEvent(event.title)}
                      >
                        Register
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="flex justify-center mt-8">
                <Button variant="outline">View All Events</Button>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <Card className="p-8 text-center bg-akili-light-orange/30 border-2 border-akili-orange/20">
            <div className="w-20 h-20 rounded-full bg-akili-orange/20 flex items-center justify-center mx-auto mb-6">
              <Users className="h-10 w-10 text-akili-orange" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg mb-6">
              Sign in or create an account to access our community features, join discussions, and connect with others.
            </p>
            <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-grow">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button 
                type="submit" 
                className="rounded-full px-8"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Get Notified"}
              </Button>
            </form>
          </Card>
        )}

        <div className="mt-20 bg-secondary/70 p-8 rounded-2xl">
          <div className="flex items-start gap-6">
            <div className="hidden md:flex mt-2">
              <Shield className="h-12 w-12 text-akili-purple" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Shield className="h-6 w-6 text-akili-purple mr-2 md:hidden" />
                Community Guidelines
              </h2>
              <p className="text-muted-foreground mb-6">
                Our community is governed by these core principles to ensure everyone feels safe and respected:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-akili-purple/20 flex items-center justify-center mr-3 mt-1">
                    <span className="text-akili-purple text-sm font-medium">1</span>
                  </div>
                  <p><strong>Respect:</strong> Treat all community members with kindness and respect, even in disagreement.</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-akili-purple/20 flex items-center justify-center mr-3 mt-1">
                    <span className="text-akili-purple text-sm font-medium">2</span>
                  </div>
                  <p><strong>Privacy:</strong> Respect others' privacy and maintain confidentiality of personal information shared in the community.</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-akili-purple/20 flex items-center justify-center mr-3 mt-1">
                    <span className="text-akili-purple text-sm font-medium">3</span>
                  </div>
                  <p><strong>Support:</strong> Focus on providing supportive and constructive interactions.</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-akili-purple/20 flex items-center justify-center mr-3 mt-1">
                    <span className="text-akili-purple text-sm font-medium">4</span>
                  </div>
                  <p><strong>Safety:</strong> No harassment, hate speech, or disrespectful content will be tolerated.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {!user && (
          <div className="mt-12 text-center">
            <Button size="lg" className="rounded-full px-8" onClick={() => {
              window.location.href = "/auth";
            }}>
              <User className="w-5 h-5 mr-2" />
              Sign Up Now
            </Button>
          </div>
        )}
      </div>

      <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Report Content</DialogTitle>
            <DialogDescription>
              Help us maintain a safe community by reporting content that violates our guidelines.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="reason" className="text-sm font-medium">
                Reason for report
              </label>
              <Textarea
                id="reason"
                placeholder="Please explain why this content should be reviewed by moderators..."
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReportDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitReport} 
              disabled={submittingReport || !reportReason.trim()}
            >
              {submittingReport ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Flag className="h-4 w-4 mr-2" />
              )}
              Submit Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommunityPage;
