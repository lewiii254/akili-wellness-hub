import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { assignRole, removeRole, UserRole } from "@/utils/adminUtils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  Search,
  MoreHorizontal,
  Shield,
  User,
  UserCog,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";

interface UserWithRoles {
  id: string;
  email?: string;
  created_at: string;
  first_name: string | null;
  last_name: string | null;
  roles: UserRole[];
}

const UserManagement = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Get all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) throw profilesError;

      // Get all roles
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Get user auth data
      const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        console.error("Error fetching auth users:", authError);
        // Continue with just profiles data
      }

      // Map roles to users
      const usersWithRoles: UserWithRoles[] = profiles.map((profile: any) => {
        const userRoles = roles
          .filter((role: any) => role.user_id === profile.id)
          .map((role: any) => role.role as UserRole);
          
        const authUser = authData?.users?.find((u: any) => u.id === profile.id);
        
        return {
          ...profile,
          email: authUser?.email,
          roles: userRoles,
        };
      });

      setUsers(usersWithRoles);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error loading users",
        description: "Could not load user data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, role: UserRole, add: boolean) => {
    if (userId === currentUser?.id && role === 'admin' && !add) {
      toast({
        title: "Cannot remove own admin role",
        description: "You cannot remove your own admin privileges",
        variant: "destructive",
      });
      return;
    }

    setProcessing(userId);
    try {
      let success;
      if (add) {
        success = await assignRole(userId, role);
      } else {
        success = await removeRole(userId, role);
      }

      if (success) {
        toast({
          title: "Role updated",
          description: `User role has been ${add ? "assigned" : "removed"} successfully`,
        });
        // Update the local state
        setUsers((prevUsers) =>
          prevUsers.map((u) => {
            if (u.id === userId) {
              return {
                ...u,
                roles: add
                  ? [...u.roles, role]
                  : u.roles.filter((r) => r !== role),
              };
            }
            return u;
          })
        );
      } else {
        throw new Error("Failed to update role");
      }
    } catch (error) {
      console.error("Error updating role:", error);
      toast({
        title: "Error updating role",
        description: "Could not update user role",
        variant: "destructive",
      });
    } finally {
      setProcessing(null);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getUserDisplayName = (user: UserWithRoles) => {
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    } else if (user.first_name) {
      return user.first_name;
    } else if (user.email) {
      return user.email;
    } else {
      return user.id.substring(0, 8) + "...";
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center">
        <UserCog className="mr-2 h-6 w-6" />
        User Management
      </h2>
      <p className="text-muted-foreground">
        Manage users and assign roles for system access
      </p>

      <div className="flex items-center mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button
          variant="outline"
          onClick={fetchUsers}
          className="ml-2"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Refresh"
          )}
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Roles</TableHead>
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
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {getUserDisplayName(user)}
                  </TableCell>
                  <TableCell>{user.email || "N/A"}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {user.roles.length > 0 ? (
                        user.roles.map((role) => (
                          <span
                            key={role}
                            className={`px-2 py-1 rounded-full text-xs ${
                              role === "admin"
                                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                : role === "moderator"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                            }`}
                          >
                            {role}
                          </span>
                        ))
                      ) : (
                        <span className="text-muted-foreground text-xs">
                          No roles
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            if (user.roles.includes("admin")) {
                              handleRoleChange(user.id, "admin", false);
                            } else {
                              handleRoleChange(user.id, "admin", true);
                            }
                          }}
                          disabled={processing === user.id}
                        >
                          {processing === user.id ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : user.roles.includes("admin") ? (
                            <XCircle className="h-4 w-4 mr-2" />
                          ) : (
                            <CheckCircle className="h-4 w-4 mr-2" />
                          )}
                          {user.roles.includes("admin")
                            ? "Remove Admin Role"
                            : "Make Admin"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            if (user.roles.includes("moderator")) {
                              handleRoleChange(user.id, "moderator", false);
                            } else {
                              handleRoleChange(user.id, "moderator", true);
                            }
                          }}
                          disabled={processing === user.id}
                        >
                          {processing === user.id ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : user.roles.includes("moderator") ? (
                            <XCircle className="h-4 w-4 mr-2" />
                          ) : (
                            <Shield className="h-4 w-4 mr-2" />
                          )}
                          {user.roles.includes("moderator")
                            ? "Remove Moderator Role"
                            : "Make Moderator"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user account
              and remove their data from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground"
              onClick={() => {
                // We'd implement user deletion here if needed
                toast({
                  title: "This action requires further implementation",
                  description: "User deletion is not fully implemented yet.",
                });
                setUserToDelete(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserManagement;
