
import { supabase } from "@/integrations/supabase/client";

export type UserRole = 'user' | 'moderator' | 'admin';

export const checkUserRole = async (userId: string | undefined): Promise<UserRole[]> => {
  if (!userId) return [];
  
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId);
      
    if (error) throw error;
    return data.map(role => role.role as UserRole);
  } catch (error) {
    console.error('Error checking user roles:', error);
    return [];
  }
};

export const isAdmin = async (userId: string | undefined): Promise<boolean> => {
  if (!userId) return false;
  const roles = await checkUserRole(userId);
  return roles.includes('admin');
};

export const isModerator = async (userId: string | undefined): Promise<boolean> => {
  if (!userId) return false;
  const roles = await checkUserRole(userId);
  return roles.includes('moderator') || roles.includes('admin');
};

export const assignRole = async (targetUserId: string, role: UserRole): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('user_roles')
      .insert({ user_id: targetUserId, role });
      
    return !error;
  } catch (error) {
    console.error('Error assigning role:', error);
    return false;
  }
};

export const removeRole = async (targetUserId: string, role: UserRole): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('user_roles')
      .delete()
      .eq('user_id', targetUserId)
      .eq('role', role);
      
    return !error;
  } catch (error) {
    console.error('Error removing role:', error);
    return false;
  }
};
