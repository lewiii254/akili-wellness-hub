import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/hooks/useTheme";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ResourcesPage from "./pages/ResourcesPage";
import MediaPage from "./pages/MediaPage";
import CommunityPage from "./pages/CommunityPage";
import TherapyPage from "./pages/TherapyPage";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import MentalHealthDashboard from "./pages/MentalHealthDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagementPage from "./pages/admin/UserManagementPage";
import ContentModerationPage from "./pages/admin/ContentModerationPage";
import CommunityManagementPage from "./pages/admin/CommunityManagementPage";
import SystemSettingsPage from "./pages/admin/SystemSettingsPage";
import MeditationPage from "./pages/MeditationPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/media" element={<MediaPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/therapy" element={<TherapyPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/mental-health" element={<MentalHealthDashboard />} />
                <Route 
                  path="/profile" 
                  element={
                    <PrivateRoute>
                      <ProfilePage />
                    </PrivateRoute>
                  } 
                />
                
                {/* Admin Routes */}
                <Route 
                  path="/admin" 
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  } 
                />
                <Route 
                  path="/admin/users" 
                  element={
                    <AdminRoute>
                      <UserManagementPage />
                    </AdminRoute>
                  } 
                />
                <Route 
                  path="/admin/content" 
                  element={
                    <AdminRoute>
                      <ContentModerationPage />
                    </AdminRoute>
                  } 
                />
                <Route 
                  path="/admin/community" 
                  element={
                    <AdminRoute>
                      <CommunityManagementPage />
                    </AdminRoute>
                  } 
                />
                <Route 
                  path="/admin/settings" 
                  element={
                    <AdminRoute>
                      <SystemSettingsPage />
                    </AdminRoute>
                  } 
                />
                
                <Route path="/meditation" element={<MeditationPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
