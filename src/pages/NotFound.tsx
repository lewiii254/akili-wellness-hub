
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gradient-bg px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 rounded-full bg-akili-light-purple mx-auto flex items-center justify-center mb-6">
          <span className="text-5xl font-bold text-akili-purple">404</span>
        </div>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-lg text-muted-foreground mb-8">
          We couldn't find the page you were looking for. Let's get you back on track.
        </p>
        <Link to="/">
          <Button size="lg" className="rounded-full px-8">
            <Home className="mr-2 h-5 w-5" />
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
