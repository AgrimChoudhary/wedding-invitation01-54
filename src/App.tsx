
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Index from "./pages/Index";
import Welcome from "./pages/Welcome";
import WishingWallPage from "./pages/WishingWallPage";
import NotFound from "./pages/NotFound";
import AudioPlayer from "./components/AudioPlayer";

// Add font imports to improve the visual design
const fontLinks = [
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap",
  "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap"
];

const queryClient = new QueryClient();

const App = () => {
  // Add fonts to document head
  useEffect(() => {
    fontLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    });
    
    return () => {
      fontLinks.forEach(href => {
        const links = document.head.querySelectorAll(`link[href="${href}"]`);
        links.forEach(link => document.head.removeChild(link));
      });
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Audio player for the entire app - loaded with priority */}
          <AudioPlayer />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/invitation" element={<Index />} />
            <Route path="/wishing-wall" element={<WishingWallPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
