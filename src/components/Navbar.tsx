
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
    <header className="fixed top-0 left-0 right-0 z-50 shadow-sm glass-effect bg-background/80">
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
      {/* Improved Mobile menu with solid background */}
      <div
        className={cn(
          "fixed inset-0 top-16 bg-background lg:hidden z-50 transition-all duration-300 ease-in-out transform",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="fixed inset-0 top-16 flex flex-col px-4 py-6 overflow-y-auto bg-white dark:bg-gray-900 shadow-xl">
          <div className="flex flex-col gap-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-base font-medium leading-7 text-foreground flex items-center gap-2 p-3 rounded-md bg-secondary/50 hover:bg-secondary shadow-sm border border-secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="w-5 h-5 text-primary" />
                {item.name}
              </Link>
            ))}
            <div className="border-t mt-4 pt-4 flex flex-col gap-3">
              <Link to="/chat" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="lg" className="w-full bg-white dark:bg-gray-800 text-foreground shadow-sm border">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat with AI
                </Button>
              </Link>
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" size="lg" className="w-full bg-white dark:bg-gray-800 text-foreground shadow-sm border">
                      <User className="w-5 h-5 mr-2" />
                      Profile
                    </Button>
                  </Link>
                  <Button variant="default" size="lg" className="w-full" onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}>
                    <LogOut className="w-5 h-5 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="default" size="lg" className="w-full">
                    <User className="w-5 h-5 mr-2" />
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
