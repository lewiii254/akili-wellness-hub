
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
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
import ChatBot from "./components/ChatBot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
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
              <Route 
                path="/profile" 
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ChatBot />
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
