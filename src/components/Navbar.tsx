
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
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
} from "lucide-react";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Resources", href: "/resources", icon: BookOpen },
  { name: "Media", href: "/media", icon: Headphones },
  { name: "Community", href: "/community", icon: Users },
  { name: "Therapy", href: "/therapy", icon: Calendar },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-sm bg-background">
      <nav className="flex items-center justify-between p-4 lg:px-8 max-w-7xl mx-auto" aria-label="Global">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-akili-purple to-akili-blue flex items-center justify-center">
              <span className="font-bold text-white text-lg">A</span>
            </div>
            <span className="font-poppins font-semibold text-xl bg-clip-text text-transparent bg-gradient-to-r from-akili-purple to-akili-blue">
              AkiliSpa
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">
              {mobileMenuOpen ? "Close main menu" : "Open main menu"}
            </span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-medium leading-6 text-muted-foreground hover:text-foreground flex items-center gap-1.5 py-1.5 px-2 rounded-md hover:bg-secondary transition-colors"
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:items-center">
          <Link to="/chat">
            <Button variant="outline" size="sm" className="mr-4">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </Button>
          </Link>
          {user ? (
            <>
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
      </nav>
      
      {/* Fixed Mobile Menu - Completely Redesigned for Maximum Visibility */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full sm:max-w-sm bg-white dark:bg-gray-900 shadow-xl",
          "transition-transform duration-300 ease-in-out transform",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full pt-16 pb-6 px-4 overflow-y-auto">
          {/* Close button positioned at the top right */}
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="py-6">
            <h2 className="text-xl font-bold text-foreground px-2 mb-4">
              Navigation
            </h2>
            
            {/* Navigation Links - Bigger and more visible */}
            <div className="space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-primary/10 text-foreground font-medium transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-lg">{item.name}</span>
                </Link>
              ))}
            </div>
            
            {/* Account Section */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-foreground px-2 mb-4">
                Account
              </h2>
              <div className="space-y-3">
                <Link to="/chat" onClick={() => setMobileMenuOpen(false)}>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full justify-start text-foreground bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  >
                    <MessageCircle className="w-5 h-5 mr-3" />
                    <span className="text-lg">Chat with AI</span>
                  </Button>
                </Link>
                
                {user ? (
                  <>
                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full justify-start text-foreground bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      >
                        <User className="w-5 h-5 mr-3" />
                        <span className="text-lg">Profile</span>
                      </Button>
                    </Link>
                    <Button 
                      variant="default" 
                      size="lg" 
                      className="w-full justify-start"
                      onClick={() => {
                        handleSignOut();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      <span className="text-lg">Sign Out</span>
                    </Button>
                  </>
                ) : (
                  <Link 
                    to="/auth" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button 
                      variant="default" 
                      size="lg" 
                      className="w-full justify-start"
                    >
                      <User className="w-5 h-5 mr-3" />
                      <span className="text-lg">Sign In</span>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dark overlay when mobile menu is open */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Navbar;
