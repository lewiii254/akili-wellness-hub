
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { isAdmin } from "@/utils/adminUtils";
import {
  Menu,
  X,
  Home,
  BookOpen,
  Headphones,
  Users,
  Calendar,
  MessageCircle,
  User,
  LogOut,
  Sparkles,
  Sun,
  Shield,
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navigation = [
  { name: "Home", href: "/", icon: Home, emoji: "🏠" },
  { name: "Resources", href: "/resources", icon: BookOpen, emoji: "📚" },
  { name: "Media", href: "/media", icon: Headphones, emoji: "🎧" },
  { name: "Community", href: "/community", icon: Users, emoji: "👥" },
  { name: "Therapy", href: "/therapy", icon: Calendar, emoji: "🧠" },
];

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user?.id) {
        const adminStatus = await isAdmin(user.id);
        setIsUserAdmin(adminStatus);
      } else {
        setIsUserAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-sm bg-background/95 backdrop-blur-sm">
      <nav className="flex items-center justify-between p-4 lg:px-8 max-w-7xl mx-auto" aria-label="Global">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-akili-purple to-akili-blue flex items-center justify-center shadow-glow-sm group-hover:shadow-glow-md transition-all duration-300">
              <span className="font-bold text-white text-lg">A</span>
            </div>
            <div className="flex flex-col">
              <span className="font-poppins font-semibold text-xl bg-clip-text text-transparent bg-gradient-to-r from-akili-purple to-akili-blue">
                AkiliSpa
              </span>
              <span className="text-xs text-muted-foreground -mt-1">Mental Wellness</span>
            </div>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-medium leading-6 text-muted-foreground hover:text-foreground flex items-center gap-1.5 py-1.5 px-3 rounded-md hover:bg-secondary transition-colors"
            >
              <span className="text-lg mr-1">{item.emoji}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
        
        {/* Desktop User Menu */}
        <div className="hidden lg:flex lg:items-center lg:gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="mr-2 rounded-full"
            title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Sparkles className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Link to="/chat">
            <Button variant="outline" size="sm" className="mr-4">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </Button>
          </Link>
          {user ? (
            <>
              {isUserAdmin && (
                <Link to="/admin">
                  <Button variant="outline" size="sm" className="mr-2">
                    <Shield className="w-4 h-4 mr-2" />
                    Admin
                  </Button>
                </Link>
              )}
              <Link to="/profile">
                <Button variant="outline" size="sm" className="mr-2">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="default" size="sm">
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Trigger - Using Shadcn Sheet Component for better mobile experience */}
        <div className="flex lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="p-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] sm:w-[385px] bg-background p-0 pt-14">
              <div className="h-full overflow-y-auto py-6 px-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-akili-purple" />
                  Navigation
                </h2>
                
                <div className="space-y-3 mb-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-primary/10 text-foreground font-medium transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xl">{item.emoji}</span>
                      </div>
                      <span className="text-lg">{item.name}</span>
                    </Link>
                  ))}
                </div>
                
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-akili-purple" />
                  Account
                </h2>
                <div className="space-y-3">
                  <Link to="/chat">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full justify-start text-foreground bg-secondary/50"
                    >
                      <MessageCircle className="w-5 h-5 mr-3" />
                      <span className="text-lg">Chat with AI 💬</span>
                    </Button>
                  </Link>
                  
                  {user ? (
                    <>
                      {isUserAdmin && (
                        <Link to="/admin">
                          <Button 
                            variant="outline" 
                            size="lg" 
                            className="w-full justify-start text-foreground bg-secondary/50"
                          >
                            <Shield className="w-5 h-5 mr-3" />
                            <span className="text-lg">Admin Dashboard 🛡️</span>
                          </Button>
                        </Link>
                      )}
                      <Link to="/profile">
                        <Button 
                          variant="outline" 
                          size="lg" 
                          className="w-full justify-start text-foreground bg-secondary/50"
                        >
                          <User className="w-5 h-5 mr-3" />
                          <span className="text-lg">Profile 👤</span>
                        </Button>
                      </Link>
                      <Button 
                        variant="default" 
                        size="lg" 
                        className="w-full justify-start"
                        onClick={handleSignOut}
                      >
                        <LogOut className="w-5 h-5 mr-3" />
                        <span className="text-lg">Sign Out 👋</span>
                      </Button>
                    </>
                  ) : (
                    <Link to="/auth">
                      <Button 
                        variant="default" 
                        size="lg" 
                        className="w-full justify-start"
                      >
                        <User className="w-5 h-5 mr-3" />
                        <span className="text-lg">Sign In 🔑</span>
                      </Button>
                    </Link>
                  )}
                  
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full justify-start bg-secondary/50"
                    onClick={toggleTheme}
                  >
                    {theme === "light" ? (
                      <>
                        <Sun className="w-5 h-5 mr-3" />
                        <span className="text-lg">Light Mode ☀️</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-3" />
                        <span className="text-lg">Dark Mode ✨</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
