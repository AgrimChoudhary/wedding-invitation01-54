
import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const EnhancedHeader = () => {
  return (
    <div className="relative text-center mb-12 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gold-light/20 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main Ganesha image with enhanced styling */}
      <div className="relative mb-8 animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gold-gradient rounded-full opacity-20 animate-pulse-glow blur-xl scale-150"></div>
            <div className="relative w-24 h-24 md:w-32 md:h-32 animate-float">
              <img 
                src="/lovable-uploads/762354ab-cff9-4c6a-9800-94eeefc3c43c.png" 
                alt="Lord Ganesha" 
                className="w-full h-full object-contain drop-shadow-2xl filter brightness-110"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>

        {/* Decorative elements around Ganesha */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
          <Sparkles className="text-gold-light animate-pulse" size={20} />
        </div>
        <div className="absolute top-8 left-1/4 transform -translate-x-1/2">
          <Heart className="text-rosegold animate-heart-beat" size={16} fill="currentColor" />
        </div>
        <div className="absolute top-8 right-1/4 transform translate-x-1/2">
          <Heart className="text-rosegold animate-heart-beat" size={16} fill="currentColor" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>

      {/* Enhanced couple names with better typography */}
      <div className="relative z-10">
        <div className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-4">
          <span className="inline-block gold-text animate-fade-in-left tracking-wider">
            Priya
          </span>
          <span className="inline-block mx-4 md:mx-8 text-rosegold animate-scale-up text-4xl md:text-6xl lg:text-7xl">
            &
          </span>
          <span className="inline-block gold-text animate-fade-in-right tracking-wider">
            Vijay
          </span>
        </div>

        {/* Decorative line with ornaments */}
        <div className="flex items-center justify-center my-6 animate-fade-in">
          <div className="w-16 h-px bg-gold-gradient"></div>
          <div className="mx-4 w-3 h-3 bg-gold-light rounded-full animate-pulse"></div>
          <div className="mx-2 w-2 h-2 bg-rosegold rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="mx-4 w-3 h-3 bg-gold-light rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          <div className="w-16 h-px bg-gold-gradient"></div>
        </div>

        {/* Wedding subtitle with elegant styling */}
        <div className="font-cormorant text-xl md:text-2xl lg:text-3xl italic gold-text mb-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Sacred Union
        </div>
        <div className="font-opensans text-cream/90 text-base md:text-lg font-light tracking-wide animate-fade-in" style={{ animationDelay: '0.5s' }}>
          30<sup className="text-sm">th</sup> March 2025
        </div>
      </div>

      {/* Enhanced decorative border patterns */}
      <div className="absolute -bottom-4 left-0 right-0 h-8 opacity-30">
        <svg width="100%" height="100%" viewBox="0 0 400 32" className="animate-fade-in">
          <pattern id="wedding-pattern" x="0" y="0" width="40" height="32" patternUnits="userSpaceOnUse">
            <path d="M20,4 Q30,16 20,28 Q10,16 20,4" fill="url(#gold-gradient)" fillOpacity="0.6" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#wedding-pattern)" />
          <defs>
            <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#B8860B" />
              <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default EnhancedHeader;
