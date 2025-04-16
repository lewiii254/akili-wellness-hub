
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.11.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Auth context of the logged in user
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );
    
    // Get the current user
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    // Create a supabase admin client with the service role
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Parse request body
    const { userId, email } = await req.json();

    let targetUserId = userId;
    
    // If email is provided, find the user by email
    if (email) {
      const { data: userData, error: userError } = await supabaseAdmin.auth.admin.listUsers();
      
      if (userError) throw userError;
      
      const foundUser = userData.users.find(u => u.email === email);
      
      if (!foundUser) {
        return new Response(
          JSON.stringify({ error: "User not found", message: `No user found with email ${email}` }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
        );
      }
      
      targetUserId = foundUser.id;
    }
    
    // If no userId or email is provided, use the current user's ID
    if (!targetUserId && !email) {
      if (!user) {
        return new Response(
          JSON.stringify({ error: 'Unauthorized', message: 'User not authenticated' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
        );
      }
      targetUserId = user.id;
    }

    // Check if the role already exists to avoid duplicates
    const { data: existingRole, error: roleCheckError } = await supabaseAdmin
      .from('user_roles')
      .select('*')
      .eq('user_id', targetUserId)
      .eq('role', 'admin');
      
    if (roleCheckError) throw roleCheckError;
    
    if (existingRole && existingRole.length > 0) {
      return new Response(
        JSON.stringify({ success: true, message: 'User already has admin role', userId: targetUserId }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Assign admin role
    const { error } = await supabaseAdmin
      .from('user_roles')
      .insert({ user_id: targetUserId, role: 'admin' });
      
    if (error) throw error;
    
    return new Response(
      JSON.stringify({ success: true, message: 'Admin role assigned successfully', userId: targetUserId }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error assigning admin role:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});
