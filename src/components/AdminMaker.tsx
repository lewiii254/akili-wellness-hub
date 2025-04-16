
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Shield, Loader2 } from "lucide-react";

const AdminMaker = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const makeAdmin = async () => {
    if (!user) {
      toast({
        title: "Not logged in",
        description: "You need to be logged in to use this feature",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Call the edge function to make the current user an admin
      const { error } = await supabase.functions.invoke('assign-admin-role', {
        body: {}
      });

      if (error) throw error;

      toast({
        title: "Admin role assigned",
        description: "You now have administrator privileges",
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
    <Button
      variant="outline"
      className="gap-2"
      onClick={makeAdmin}
      disabled={loading || !user}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Shield className="h-4 w-4" />}
      Make Me Admin
    </Button>
  );
};

export default AdminMaker;
