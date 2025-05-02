
import React, { useState } from "react";

// Hooks
import { useAuth } from "@/hooks/useAuth";

// Supabase client
import { supabase } from "@/integrations/supabase/client";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

// Icons
import { Shield, Loader2 } from "lucide-react";


const AdminMaker = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("ngondimarklewis@gmail.com");

  const makeAdmin = async () => {
    if (!user && !email) {
      toast({
        title: "No user specified",
        description: "Please provide an email address to grant admin privileges",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Call the edge function to make the current user or specified email an admin
      const { error } = await supabase.functions.invoke('assign-admin-role', {
        body: { email }
      });

      if (error) throw error;

      toast({
        title: "Admin role assigned",
        description: `Admin privileges granted to ${email || 'you'}`,
      });
    } catch (error) {
      console.error("Error assigning admin role:", error);
      toast({
        title: "Error assigning admin role",
        description: "Could not assign admin role. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="max-w-xs"
        />
        <Button
          variant="outline"
          className="gap-2"
          onClick={makeAdmin}
          disabled={loading}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Shield className="h-4 w-4" />}
          Make Admin
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Default email: ngondimarklewis@gmail.com
      </p>
    </div>
  );
};

export default AdminMaker;
