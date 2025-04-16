
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import {
  Plus,
  MessageSquare,
  Loader2,
  Tag,
  Trash2,
  Eye,
  Check,
  X,
} from "lucide-react";

interface DiscussionTag {
  id: string;
  name: string;
}

interface Discussion {
  id: string;
  title: string;
  content: string;
  author_id: string;
  author_name?: string;
  created_at: string;
  is_approved: boolean;
  is_hidden: boolean;
  tags?: string[];
}

const CommunityManagement = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [tags, setTags] = useState<DiscussionTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTagName, setNewTagName] = useState("");
  const [addingTag, setAddingTag] = useState(false);
  const [showTagDialog, setShowTagDialog] = useState(false);
  const [currentDiscussion, setCurrentDiscussion] = useState<Discussion | null>(null);
  const [showDiscussionDialog, setShowDiscussionDialog] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch tags
      const { data: tagsData, error: tagsError } = await supabase
        .from('discussion_tags')
        .select('*')
        .order('name');
        
      if (tagsError) throw tagsError;
      setTags(tagsData);
      
      // Fetch discussions
      const { data: discussionsData, error: discussionsError } = await supabase
        .from('community_discussions')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (discussionsError) throw discussionsError;
      
      // Get profile information for authors
      const enhancedDiscussions = await Promise.all(
        discussionsData.map(async (discussion) => {
          // Get author profile
          const { data: profileData } = await supabase
            .from('profiles')
            .select('first_name, last_name')
            .eq('id', discussion.author_id)
            .single();
            
          let authorName = 'Unknown User';
          if (profileData) {
            authorName = `${profileData.first_name || ''} ${profileData.last_name || ''}`.trim();
            if (!authorName) authorName = 'User';
          }
          
          // Get discussion tags
          const { data: tagMappings } = await supabase
            .from('discussion_to_tags')
            .select('tag_id')
            .eq('discussion_id', discussion.id);
            
          let discussionTags: string[] = [];
          if (tagMappings && tagMappings.length > 0) {
            const tagIds = tagMappings.map(tm => tm.tag_id);
            const { data: tagNames } = await supabase
              .from('discussion_tags')
              .select('name')
              .in('id', tagIds);
              
            if (tagNames) {
              discussionTags = tagNames.map(t => t.name);
            }
          }
          
          return {
            ...discussion,
            author_name: authorName,
            tags: discussionTags
          };
        })
      );
      
      setDiscussions(enhancedDiscussions);
    } catch (error) {
      console.error("Error fetching community data:", error);
      toast({
        title: "Error loading community data",
        description: "Could not load discussions and tags",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = async () => {
    if (!newTagName.trim()) return;
    
    setAddingTag(true);
    try {
      const { data, error } = await supabase
        .from('discussion_tags')
        .insert({ name: newTagName.trim() })
        .select()
        .single();
        
      if (error) throw error;
      
      setTags([...tags, data]);
      setNewTagName("");
      toast({
        title: "Tag added",
        description: `Tag "${newTagName.trim()}" has been added successfully`,
      });
    } catch (error) {
      console.error("Error adding tag:", error);
      toast({
        title: "Error adding tag",
        description: "Could not add the new tag",
        variant: "destructive",
      });
    } finally {
      setAddingTag(false);
    }
  };

  const handleDeleteTag = async (tagId: string) => {
    setProcessingId(tagId);
    try {
      const { error } = await supabase
        .from('discussion_tags')
        .delete()
        .eq('id', tagId);
        
      if (error) throw error;
      
      setTags(tags.filter(tag => tag.id !== tagId));
      toast({
        title: "Tag deleted",
        description: "The tag has been deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting tag:", error);
      toast({
        title: "Error deleting tag",
        description: "Could not delete the tag",
        variant: "destructive",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleToggleDiscussionApproval = async (discussion: Discussion) => {
    setProcessingId(discussion.id);
    try {
      const { error } = await supabase
        .from('community_discussions')
        .update({ is_approved: !discussion.is_approved })
        .eq('id', discussion.id);
        
      if (error) throw error;
      
      setDiscussions(discussions.map(d => 
        d.id === discussion.id 
          ? { ...d, is_approved: !d.is_approved } 
          : d
      ));
      
      toast({
        title: discussion.is_approved ? "Discussion unapproved" : "Discussion approved",
        description: `The discussion has been ${discussion.is_approved ? 'unapproved' : 'approved'}`,
      });
    } catch (error) {
      console.error("Error toggling discussion approval:", error);
      toast({
        title: "Error updating discussion",
        description: "Could not update discussion approval status",
        variant: "destructive",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleToggleDiscussionVisibility = async (discussion: Discussion) => {
    setProcessingId(discussion.id);
    try {
      const { error } = await supabase
        .from('community_discussions')
        .update({ is_hidden: !discussion.is_hidden })
        .eq('id', discussion.id);
        
      if (error) throw error;
      
      setDiscussions(discussions.map(d => 
        d.id === discussion.id 
          ? { ...d, is_hidden: !d.is_hidden } 
          : d
      ));
      
      toast({
        title: discussion.is_hidden ? "Discussion unhidden" : "Discussion hidden",
        description: `The discussion has been ${discussion.is_hidden ? 'made visible' : 'hidden'}`,
      });
    } catch (error) {
      console.error("Error toggling discussion visibility:", error);
      toast({
        title: "Error updating discussion",
        description: "Could not update discussion visibility",
        variant: "destructive",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleDeleteDiscussion = async (discussionId: string) => {
    setProcessingId(discussionId);
    try {
      const { error } = await supabase
        .from('community_discussions')
        .delete()
        .eq('id', discussionId);
        
      if (error) throw error;
      
      setDiscussions(discussions.filter(d => d.id !== discussionId));
      setCurrentDiscussion(null);
      setShowDiscussionDialog(false);
      
      toast({
        title: "Discussion deleted",
        description: "The discussion has been permanently deleted",
      });
    } catch (error) {
      console.error("Error deleting discussion:", error);
      toast({
        title: "Error deleting discussion",
        description: "Could not delete the discussion",
        variant: "destructive",
      });
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold flex items-center">
        <MessageSquare className="mr-2 h-6 w-6" />
        Community Management
      </h2>
      <p className="text-muted-foreground">
        Manage community discussions and tags for content organization
      </p>

      {/* Tags Management */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold flex items-center">
            <Tag className="mr-2 h-5 w-5" />
            Discussion Tags
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTagDialog(true)}
            className="flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Tag
          </Button>
        </div>

        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tag Name</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={2} className="h-24 text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                  </TableCell>
                </TableRow>
              ) : tags.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className="h-24 text-center">
                    No tags found
                  </TableCell>
                </TableRow>
              ) : (
                tags.map((tag) => (
                  <TableRow key={tag.id}>
                    <TableCell>{tag.name}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteTag(tag.id)}
                        disabled={processingId === tag.id}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        {processingId === tag.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Discussions Management */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            Community Discussions
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchData}
            disabled={loading}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
          </Button>
        </div>

        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                  </TableCell>
                </TableRow>
              ) : discussions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No discussions found
                  </TableCell>
                </TableRow>
              ) : (
                discussions.map((discussion) => (
                  <TableRow key={discussion.id}>
                    <TableCell className="font-medium">
                      <div className="line-clamp-2">{discussion.title}</div>
                      {discussion.tags && discussion.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {discussion.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{discussion.author_name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {discussion.is_approved ? (
                          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 w-fit">
                            Approved
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 w-fit">
                            Pending
                          </Badge>
                        )}
                        
                        {discussion.is_hidden && (
                          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 w-fit">
                            Hidden
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(discussion.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setCurrentDiscussion(discussion);
                            setShowDiscussionDialog(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={discussion.is_approved ? "ghost" : "outline"}
                          size="sm"
                          onClick={() => handleToggleDiscussionApproval(discussion)}
                          disabled={processingId === discussion.id}
                          className={discussion.is_approved ? "text-destructive" : "text-green-600"}
                        >
                          {processingId === discussion.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : discussion.is_approved ? (
                            <X className="h-4 w-4" />
                          ) : (
                            <Check className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleDiscussionVisibility(discussion)}
                          disabled={processingId === discussion.id}
                          className={discussion.is_hidden ? "text-green-600" : "text-red-600"}
                        >
                          {processingId === discussion.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : discussion.is_hidden ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add Tag Dialog */}
      <Dialog open={showTagDialog} onOpenChange={setShowTagDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Tag</DialogTitle>
            <DialogDescription>
              Create a new tag for organizing discussions
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Input
                placeholder="Enter tag name..."
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowTagDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddTag} 
              disabled={!newTagName.trim() || addingTag}
            >
              {addingTag ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              Add Tag
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Discussion Dialog */}
      <Dialog 
        open={showDiscussionDialog} 
        onOpenChange={(open) => {
          if (!open) {
            setCurrentDiscussion(null);
          }
          setShowDiscussionDialog(open);
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          {currentDiscussion && (
            <>
              <DialogHeader>
                <DialogTitle>{currentDiscussion.title}</DialogTitle>
                <DialogDescription>
                  Posted by {currentDiscussion.author_name} on {new Date(currentDiscussion.created_at).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>
              <div className="my-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {currentDiscussion.tags?.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="p-4 bg-secondary/20 rounded-md max-h-80 overflow-y-auto">
                  {currentDiscussion.content}
                </div>
              </div>
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button 
                  variant="outline"
                  onClick={() => handleToggleDiscussionApproval(currentDiscussion)}
                  disabled={processingId === currentDiscussion.id}
                  className="w-full sm:w-auto"
                >
                  {processingId === currentDiscussion.id ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : currentDiscussion.is_approved ? (
                    <>
                      <X className="h-4 w-4 mr-2" />
                      Unapprove
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Approve
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleToggleDiscussionVisibility(currentDiscussion)}
                  disabled={processingId === currentDiscussion.id}
                  className="w-full sm:w-auto"
                >
                  {processingId === currentDiscussion.id ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : currentDiscussion.is_hidden ? (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      Show
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      Hide
                    </>
                  )}
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => handleDeleteDiscussion(currentDiscussion.id)}
                  disabled={processingId === currentDiscussion.id}
                  className="w-full sm:w-auto"
                >
                  {processingId === currentDiscussion.id ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </>
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommunityManagement;
