
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface EnhancedPhotoCarouselProps {
  photos: Photo[];
}

const EnhancedPhotoCarousel: React.FC<EnhancedPhotoCarouselProps> = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Preload first few images
    photos.slice(0, 3).forEach((photo, index) => {
      const img = new Image();
      img.onload = () => {
        setLoadedImages(prev => new Set([...prev, index]));
        if (index === 0) setIsLoading(false);
      };
      img.src = photo.src;
    });
  }, [photos]);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const goToPhoto = (index: number) => {
    setCurrentIndex(index);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96 bg-maroon/30 rounded-2xl">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold-light border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gold-light font-cormorant">Loading memories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Main carousel container */}
      <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-maroon/60 to-maroon/80 shadow-2xl">
        {/* Photo display */}
        <div className="relative w-full h-full">
          {photos.map((photo, index) => (
            <div
              key={index}
              className={cn(
                "absolute inset-0 transition-all duration-700 ease-out",
                index === currentIndex 
                  ? "opacity-100 scale-100 translate-x-0" 
                  : index < currentIndex 
                    ? "opacity-0 scale-95 -translate-x-full"
                    : "opacity-0 scale-95 translate-x-full"
              )}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
                loading={index < 3 ? "eager" : "lazy"}
              />
              
              {/* Overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              
              {/* Floating hearts on current image */}
              {index === currentIndex && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <Heart
                      key={i}
                      className={cn(
                        "absolute text-gold-light/60 animate-float",
                        i === 0 && "top-10 left-10 w-4 h-4",
                        i === 1 && "top-20 right-16 w-5 h-5 animation-delay-500",
                        i === 2 && "bottom-20 left-20 w-3 h-3 animation-delay-1000"
                      )}
                      fill="currentColor"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevPhoto}
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 z-10",
            "w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm",
            "flex items-center justify-center text-white",
            "opacity-0 group-hover:opacity-100 transition-all duration-300",
            "hover:bg-black/60 hover:scale-110 transform"
          )}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextPhoto}
          className={cn(
            "absolute right-4 top-1/2 -translate-y-1/2 z-10",
            "w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm",
            "flex items-center justify-center text-white",
            "opacity-0 group-hover:opacity-100 transition-all duration-300",
            "hover:bg-black/60 hover:scale-110 transform"
          )}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Photo counter */}
        <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-sm font-medium">
          {currentIndex + 1} / {photos.length}
        </div>
      </div>

      {/* Thumbnail navigation */}
      <div className="flex justify-center mt-6 space-x-2 overflow-x-auto pb-2">
        {photos.map((photo, index) => (
          <button
            key={index}
            onClick={() => goToPhoto(index)}
            className={cn(
              "flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden",
              "border-2 transition-all duration-300",
              "hover:scale-105 transform",
              index === currentIndex 
                ? "border-gold-light shadow-lg shadow-gold-light/30" 
                : "border-gold-light/30 hover:border-gold-light/60"
            )}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-2 -left-2 text-gold-light/40">
        <Sparkles className="w-6 h-6 animate-pulse" />
      </div>
      <div className="absolute -bottom-2 -right-2 text-gold-light/40">
        <Sparkles className="w-6 h-6 animate-pulse animation-delay-1000" />
      </div>
    </div>
  );
};

export default EnhancedPhotoCarousel;
