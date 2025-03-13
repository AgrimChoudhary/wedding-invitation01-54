
import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CoupleIllustrationProps {
  className?: string;
}

const CoupleIllustration: React.FC<CoupleIllustrationProps> = ({ className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  const [showEffects, setShowEffects] = useState(false);
  
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500);
    
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
      {/* Golden ornamental frame */}
      <div className="absolute inset-0 rounded-full border-4 border-gold-gradient opacity-20"></div>
      
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
      
      <style>{`
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
