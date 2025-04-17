import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { 
  Flag, 
  Loader2, 
  AlertTriangle, 
  Check, 
  X, 
  RefreshCw, 
  Search,
  Filter 
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface ContentFlag {
  id: string;
  content_type: string;
  content_id: string;
  reporter_id: string | null;
  reason: string;
  status: string;
  created_at: string;
  resolved_by: string | null;
  resolution_notes: string | null;
  reporter_email?: string;
  content_title?: string;
  content_preview?: string;
}

const ContentModeration = () => {
  const { user } = useAuth();
  const [flags, setFlags] = useState<ContentFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("pending");
  const [currentFlag, setCurrentFlag] = useState<ContentFlag | null>(null);
  const [resolutionNotes, setResolutionNotes] = useState("");
  const [resolutionStatus, setResolutionStatus] = useState("resolved");
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [contentTypeFilter, setContentTypeFilter] = useState<string>("all");
  const [displayFlags, setDisplayFlags] = useState<ContentFlag[]>([]);

  useEffect(() => {
    fetchFlags();
  }, [statusFilter]);

  useEffect(() => {
    // Filter flags based on search query and content type
    let filtered = [...flags];
    
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(flag => 
        (flag.content_title && flag.content_title.toLowerCase().includes(query)) || 
        (flag.reason && flag.reason.toLowerCase().includes(query)) ||
        (flag.reporter_email && flag.reporter_email.toLowerCase().includes(query))
      );
    }
    
    if (contentTypeFilter !== "all") {
      filtered = filtered.filter(flag => flag.content_type === contentTypeFilter);
    }
    
    setDisplayFlags(filtered);
  }, [flags, searchQuery, contentTypeFilter]);

  const fetchFlags = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('content_flags')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching flags:", error);
        throw error;
      }
      
      // Filter by status if needed
      const filteredFlags = statusFilter === "all" 
        ? data || [] 
        : (data || []).filter(flag => flag.status === statusFilter);

      // Debug logging
      console.log("Fetched flags:", filteredFlags);

      // Enhance the flags with additional data
      const enhancedFlags = await Promise.all(
        filteredFlags.map(async (flag) => {
          // Get reporter information
          let reporterEmail = "Anonymous";
          if (flag.reporter_id) {
            // Modified: Check if profiles table has the necessary fields
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('first_name, last_name')
              .eq('id', flag.reporter_id)
              .single();
              
            if (profileError) {
              console.error("Error fetching profile:", profileError);
            } else if (profileData) {
              // Safely access the fields
              const firstName = profileData.first_name || '';
              const lastName = profileData.last_name || '';
              
              const fullName = `${firstName} ${lastName}`.trim();
              reporterEmail = fullName || "Anonymous User";
            }
          }
          
          // Get content information based on content_type
          let contentTitle = "Unknown Content";
          let contentPreview = "";
          
          if (flag.content_type === 'discussion' || flag.content_type === 'post') {
            const { data: discussionData } = await supabase
              .from('community_discussions')
              .select('title, content')
              .eq('id', flag.content_id)
              .single();
              
            if (discussionData) {
              contentTitle = discussionData.title;
              contentPreview = discussionData.content?.substring(0, 100) + (discussionData.content?.length > 100 ? '...' : '');
            }
          } else if (flag.content_type === 'journal') {
            const { data: journalData } = await supabase
              .from('mood_journal_entries')
              .select('content')
              .eq('id', flag.content_id)
              .single();
              
            if (journalData) {
              contentTitle = "Journal Entry";
              contentPreview = journalData.content.substring(0, 100) + (journalData.content.length > 100 ? '...' : '');
            }
          }
          
          return {
            ...flag,
            reporter_email: reporterEmail,
            content_title: contentTitle,
            content_preview: contentPreview
          };
        })
      );
      
      console.log("Enhanced flags:", enhancedFlags);
      setFlags(enhancedFlags);
      setDisplayFlags(enhancedFlags);
      
      toast({
        title: "Reports loaded",
        description: `${enhancedFlags.length} reports found`,
      });
    } catch (error) {
      console.error("Error fetching flags:", error);
      toast({
        title: "Error loading reports",
        description: "Could not load content flags",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResolveFlag = async () => {
    if (!currentFlag || !user?.id) return;
    
    setSubmitting(true);
    try {
      // Update flag status
      const { error: flagError } = await supabase
        .from('content_flags')
        .update({
          status: resolutionStatus,
          resolved_by: user.id,
          resolution_notes: resolutionNotes
        })
        .eq('id', currentFlag.id);
        
      if (flagError) throw flagError;
      
      // If content is to be removed/hidden
      if (resolutionStatus === 'content_removed') {
        if (currentFlag.content_type === 'discussion' || currentFlag.content_type === 'post') {
          const { error: contentError } = await supabase
            .from('community_discussions')
            .update({ is_hidden: true })
            .eq('id', currentFlag.content_id);
            
          if (contentError) throw contentError;
        } else if (currentFlag.content_type === 'journal') {
          // Use the correct update object with is_hidden
          const { error: journalError } = await supabase
            .from('mood_journal_entries')
            .update({ is_hidden: true })
            .eq('id', currentFlag.content_id);
            
          if (journalError) throw journalError;
        }
      }
      
      toast({
        title: "Report resolved",
        description: `The report has been marked as ${resolutionStatus.replace('_', ' ')}`,
      });
      
      // Refresh data and close dialog
      fetchFlags();
      setCurrentFlag(null);
      setResolutionNotes("");
      setResolutionStatus("resolved");
    } catch (error) {
      console.error("Error resolving flag:", error);
      toast({
        title: "Error resolving report",
        description: "Could not update the content flag",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getContentTypeOptions = () => {
    const types = Array.from(new Set(flags.map(flag => flag.content_type)));
    return [
      { value: "all", label: "All Types" },
      ...types.map(type => ({ 
        value: type, 
        label: type.charAt(0).toUpperCase() + type.slice(1) 
      }))
    ];
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">Pending</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Resolved</Badge>;
      case 'content_removed':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Content Removed</Badge>;
      case 'dismissed':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">Dismissed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center">
        <Flag className="mr-2 h-6 w-6" />
        Content Moderation
      </h2>
      <p className="text-muted-foreground">
        Review and address reported content across the platform
      </p>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reports</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="content_removed">Content Removed</SelectItem>
              <SelectItem value="dismissed">Dismissed</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={contentTypeFilter}
            onValueChange={setContentTypeFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Content type" />
            </SelectTrigger>
            <SelectContent>
              {getContentTypeOptions().map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reports..."
              className="pl-10 w-full md:w-[220px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Button
          onClick={fetchFlags}
          disabled={loading}
          className="whitespace-nowrap"
        >
          {loading ? 
            <Loader2 className="h-4 w-4 animate-spin mr-2" /> : 
            <RefreshCw className="h-4 w-4 mr-2" />
          }
          {loading ? "Loading..." : "Refresh"}
        </Button>
      </div>

      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Content Type</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reported</TableHead>
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
            ) : displayFlags.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-muted-foreground">No reports found matching your criteria</p>
                    {(searchQuery || contentTypeFilter !== "all") && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSearchQuery("");
                          setContentTypeFilter("all");
                        }}
                      >
                        Clear filters
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              displayFlags.map((flag) => (
                <TableRow key={flag.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{flag.content_type.charAt(0).toUpperCase() + flag.content_type.slice(1)}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">{flag.content_title}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="line-clamp-2">{flag.reason}</span>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(flag.status)}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(flag.created_at).toLocaleDateString()}</div>
                      <div className="text-muted-foreground">{flag.reporter_email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentFlag(flag)}
                    >
                      {flag.status === 'pending' ? 'Review' : 'View Details'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Content Review Dialog */}
      <Dialog open={!!currentFlag} onOpenChange={(open) => !open && setCurrentFlag(null)}>
        <DialogContent className="max-w-md md:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Flag className="h-5 w-5" />
              Review Reported Content
            </DialogTitle>
            <DialogDescription>
              Review the reported content and take appropriate action
            </DialogDescription>
          </DialogHeader>
          
          {currentFlag && (
            <>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Content Type</h4>
                    <p>{currentFlag.content_type.charAt(0).toUpperCase() + currentFlag.content_type.slice(1)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Reported By</h4>
                    <p>{currentFlag.reporter_email}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-1">Report Reason</h4>
                  <p className="p-3 bg-secondary/50 rounded-md text-sm">{currentFlag.reason}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-1">Content Preview</h4>
                  <div className="p-3 bg-secondary/30 rounded-md text-sm max-h-40 overflow-y-auto break-words">
                    <p className="font-medium mb-1">{currentFlag.content_title}</p>
                    <p>{currentFlag.content_preview}</p>
                  </div>
                </div>

                {currentFlag.status === 'pending' && (
                  <>
                    <div>
                      <h4 className="text-sm font-semibold mb-1">Resolution</h4>
                      <Select
                        value={resolutionStatus}
                        onValueChange={setResolutionStatus}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select resolution" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="resolved">
                            <div className="flex items-center">
                              <Check className="w-4 h-4 mr-2 text-green-500" />
                              Resolve (No Action Needed)
                            </div>
                          </SelectItem>
                          <SelectItem value="dismissed">
                            <div className="flex items-center">
                              <X className="w-4 h-4 mr-2 text-gray-500" />
                              Dismiss Report
                            </div>
                          </SelectItem>
                          <SelectItem value="content_removed">
                            <div className="flex items-center">
                              <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
                              Remove Content
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-1">Notes</h4>
                      <Textarea
                        placeholder="Add resolution notes..."
                        value={resolutionNotes}
                        onChange={(e) => setResolutionNotes(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </>
                )}

                {currentFlag.status !== 'pending' && (
                  <>
                    <div>
                      <h4 className="text-sm font-semibold mb-1">Resolution</h4>
                      <p>{getStatusBadge(currentFlag.status)}</p>
                    </div>
                    
                    {currentFlag.resolution_notes && (
                      <div>
                        <h4 className="text-sm font-semibold mb-1">Resolution Notes</h4>
                        <p className="p-3 bg-secondary/30 rounded-md text-sm">
                          {currentFlag.resolution_notes}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>

              <DialogFooter>
                {currentFlag.status === 'pending' ? (
                  <Button 
                    onClick={handleResolveFlag} 
                    disabled={submitting}
                    className="w-full sm:w-auto"
                  >
                    {submitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                    Submit Resolution
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentFlag(null)}
                    className="w-full sm:w-auto"
                  >
                    Close
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentModeration;
