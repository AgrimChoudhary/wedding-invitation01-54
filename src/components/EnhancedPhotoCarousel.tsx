
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const photos = [
  { 
    id: 1, 
    src: '/lovable-uploads/5d906655-818b-462e-887e-0a392db20d48.png', 
    alt: 'Couple Photo 1',
    caption: 'Our Beautiful Journey Begins'
  },
  { 
    id: 2, 
    src: '/lovable-uploads/e1d52835-2f4a-42a2-8647-66379e0cc295.png', 
    alt: 'Couple Photo 2',
    caption: 'Love in Every Moment'
  },
  { 
    id: 3, 
    src: '/lovable-uploads/6d392f5b-28f1-4710-9eda-8e7c1a9bfe8e.png', 
    alt: 'Couple Photo 3',
    caption: 'Together Forever'
  }
];

const EnhancedPhotoCarousel = () => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
    setIsAutoPlaying(false);
  };

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
    setIsAutoPlaying(false);
  };

  return (
    <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
      <div className="text-center mb-8">
        <h2 className="font-cormorant text-3xl md:text-4xl font-bold gold-text mb-4 flex items-center justify-center gap-3">
          <Heart className="text-rosegold animate-heart-beat" size={32} fill="currentColor" />
          Our Love Story
          <Sparkles className="text-gold-light animate-pulse" size={32} />
        </h2>
        <p className="text-cream/80 font-opensans italic">Captured moments of our journey together</p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Main photo container */}
        <div className="relative rounded-3xl overflow-hidden gold-border shadow-2xl group">
          <div className="aspect-video md:aspect-[16/10] relative overflow-hidden">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className={cn(
                  "absolute inset-0 transition-all duration-700 ease-in-out",
                  index === currentPhoto 
                    ? "opacity-100 scale-100" 
                    : "opacity-0 scale-105"
                )}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover filter brightness-110 group-hover:brightness-125 transition-all duration-500"
                  loading="lazy"
                />
                {/* Photo overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-maroon/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Caption overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="font-cormorant text-xl md:text-2xl text-gold-light font-semibold drop-shadow-lg">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-maroon/80 hover:bg-maroon text-gold-light rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-maroon/80 hover:bg-maroon text-gold-light rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={24} />
          </button>

          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 rounded-3xl border-2 border-gold-light/50 animate-pulse-glow"></div>
          </div>
        </div>

        {/* Photo indicators */}
        <div className="flex justify-center mt-6 space-x-3">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentPhoto(index);
                setIsAutoPlaying(false);
              }}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === currentPhoto 
                  ? "bg-gold-light scale-125 shadow-gold" 
                  : "bg-cream/30 hover:bg-cream/50"
              )}
            />
          ))}
        </div>
      </div>

      {/* Floating hearts animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <Heart
            key={i}
            className="absolute text-rosegold/30 animate-float"
            size={16}
            fill="currentColor"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default EnhancedPhotoCarousel;
