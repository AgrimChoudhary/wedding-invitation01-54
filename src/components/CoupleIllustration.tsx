
import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Star, Flower } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CoupleIllustrationProps {
  className?: string;
}

const CoupleIllustration: React.FC<CoupleIllustrationProps> = ({ className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  const [showEffects, setShowEffects] = useState(false);
  const [showDecorations, setShowDecorations] = useState(false);
  
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500);
    setTimeout(() => setShowDecorations(true), 1000);
    
    // Periodically show glow animation
    const glowInterval = setInterval(() => {
      setIsGlowing(true);
      setTimeout(() => setIsGlowing(false), 2000);
    }, 5000);
    
    return () => clearInterval(glowInterval);
  }, []);
  
  const handleClick = () => {
    setShowEffects(true);
    setTimeout(() => setShowEffects(false), 3000);
  };
  
  return (
    <div 
      className={cn(
        "relative flex justify-center items-center transition-all duration-1000 cursor-pointer",
        isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95",
        className
      )}
      onClick={handleClick}
    >
      {/* Decorative elements */}
      {showDecorations && (
        <>
          <div className="absolute -top-10 -left-10 w-20 h-20 opacity-20">
            <Flower className="text-gold-light absolute top-0 left-0 animate-float" style={{ animationDelay: "0.2s" }} />
            <Star className="text-gold-light absolute top-8 left-12 w-4 h-4 animate-float" style={{ animationDelay: "0.8s" }} />
          </div>
          
          <div className="absolute -bottom-10 -right-10 w-20 h-20 opacity-20">
            <Star className="text-gold-light absolute bottom-0 right-0 animate-float" style={{ animationDelay: "0.5s" }} />
            <Flower className="text-gold-light absolute bottom-10 right-14 w-4 h-4 animate-float" style={{ animationDelay: "1.2s" }} />
          </div>
          
          <div className="absolute -top-5 -right-5 opacity-30">
            <Heart className="text-gold-light w-5 h-5 animate-float" style={{ animationDelay: "0.3s" }} />
          </div>
          
          <div className="absolute -bottom-5 -left-5 opacity-30">
            <Heart className="text-gold-light w-5 h-5 animate-float" style={{ animationDelay: "0.9s" }} />
          </div>
        </>
      )}
      
      {/* Golden ornamental frame */}
      <div className="absolute inset-0 rounded-full border-4 border-gold-gradient opacity-20"></div>
      
      {/* Decorative rings */}
      <div className="absolute inset-0 rounded-full border border-gold-light/30 animate-spin-slow"></div>
      <div className="absolute inset-2 rounded-full border border-gold-light/20 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '12s' }}></div>
      <div className="absolute inset-4 rounded-full border border-gold-light/10 animate-spin-slow" style={{ animationDuration: '15s' }}></div>
      
      {/* Main couple image with interactive effects */}
      <div className="relative rounded-full overflow-hidden w-64 h-64 md:w-80 md:h-80 gold-border">
        <img 
          src="/lovable-uploads/88954d14-07a5-494c-a5ac-075e055e0223.png" 
          alt="Bride and Groom" 
          width="320"
          height="320"
          loading="eager"
          fetchPriority="high"
          className={cn(
            "w-full h-full object-contain transition-all duration-700",
            (isGlowing || showEffects) && "scale-105"
          )}
        />
        
        {/* Subtle gold overlay for warmth */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-b from-gold-light/5 to-gold-light/10 transition-opacity duration-500",
          isGlowing && "opacity-70",
          !isGlowing && "opacity-30"
        )}></div>
        
        {/* Animated effects on click */}
        {showEffects && (
          <>
            {/* Radial gold rays */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute h-full w-2 bg-gold-gradient opacity-40"
                  style={{ 
                    transform: `rotate(${i * 30}deg)`, 
                    animation: `ray-expand 2s ease-out forwards`,
                    transformOrigin: 'center bottom'
                  }}
                ></div>
              ))}
            </div>
            
            {/* Circular ripple */}
            {[...Array(3)].map((_, i) => (
              <div 
                key={i}
                className="absolute inset-0 border-4 border-gold-light/40 rounded-full"
                style={{
                  animation: `circle-expand 2s ease-out forwards ${i * 0.3}s`
                }}
              ></div>
            ))}
            
            {/* Sparkles */}
            {[...Array(8)].map((_, i) => (
              <Sparkles 
                key={i}
                className="absolute text-gold-light" 
                size={20}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `sparkle-fade 1.5s ease-out forwards ${i * 0.1}s`
                }}
              />
            ))}
          </>
        )}
      </div>
      
      <style jsx>{`
        @keyframes ray-expand {
          0% { height: 0%; opacity: 0.8; }
          100% { height: 150%; opacity: 0; }
        }
        
        @keyframes circle-expand {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        
        @keyframes sparkle-fade {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.5) rotate(180deg); opacity: 1; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default CoupleIllustration;
