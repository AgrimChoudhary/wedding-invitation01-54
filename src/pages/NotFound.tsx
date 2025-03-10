
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Heart } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-maroon px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-gold-gradient p-2 rounded-full animate-float">
            <Heart className="text-maroon" size={32} />
          </div>
        </div>
        <h1 className="text-4xl font-cormorant gold-text font-bold mb-4">404</h1>
        <p className="text-xl text-cream mb-6 font-cormorant">
          Oops! The page you're looking for seems to have wandered off
        </p>
        <a 
          href="/" 
          className="inline-block px-6 py-3 bg-gold-gradient text-maroon rounded-lg transition-transform duration-300 hover:scale-105 font-medium"
        >
          Return to Celebration
        </a>
      </div>
    </div>
  );
};

export default NotFound;
