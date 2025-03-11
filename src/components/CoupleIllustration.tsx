
import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CoupleIllustrationProps {
  className?: string;
}

const CoupleIllustration: React.FC<CoupleIllustrationProps> = ({ className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animateHearts, setAnimateHearts] = useState(false);
  
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500);
    
    // Periodically show heart animation
    const heartInterval = setInterval(() => {
      setAnimateHearts(true);
      setTimeout(() => setAnimateHearts(false), 2000);
    }, 5000);
    
    return () => clearInterval(heartInterval);
  }, []);
  
  return (
    <div 
      className={cn(
        "relative flex justify-center items-center transition-all duration-1000",
        isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95",
        className
      )}
    >
      {/* Golden ornamental frame */}
      <div className="absolute inset-0 rounded-full border-4 border-gold-gradient opacity-20"></div>
      
      {/* Decorative corner elements */}
      {[0, 90, 180, 270].map((angle, index) => (
        <div 
          key={index}
          className="absolute w-10 h-10"
          style={{
            top: angle === 0 || angle === 90 ? '-5px' : 'auto',
            bottom: angle === 180 || angle === 270 ? '-5px' : 'auto',
            left: angle === 180 || angle === 90 ? '-5px' : 'auto',
            right: angle === 0 || angle === 270 ? '-5px' : 'auto',
          }}
        >
          <div 
            className="absolute w-full h-full bg-gold-gradient rounded-full opacity-50"
            style={{ animation: `pulse-glow 3s infinite ${index * 0.5}s` }}
          ></div>
        </div>
      ))}
      
      {/* Heart animations when triggered */}
      {animateHearts && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => {
            const size = Math.random() * 15 + 10;
            const left = Math.random() * 100;
            const delay = Math.random() * 2;
            const duration = Math.random() * 3 + 2;
            return (
              <div 
                key={i}
                className="absolute"
                style={{
                  left: `${left}%`,
                  bottom: '-20px',
                  animation: `float-up ${duration}s ease-out forwards ${delay}s`
                }}
              >
                <Heart 
                  size={size} 
                  className="text-gold-light fill-gold-light/30" 
                  style={{ transform: `rotate(${Math.random() * 40 - 20}deg)` }}
                />
              </div>
            );
          })}
        </div>
      )}
      
      {/* Main couple image */}
      <div className="relative rounded-full overflow-hidden w-64 h-64 md:w-80 md:h-80 gold-border">
        <img 
          src="/lovable-uploads/5afd7a5a-50bd-433d-8e23-7e0d3aa5b16f.png" 
          alt="Bride and Groom" 
          className="w-full h-full object-contain"
        />
        
        {/* Subtle gold overlay for warmth */}
        <div className="absolute inset-0 bg-gradient-to-b from-gold-light/5 to-gold-light/10"></div>
      </div>
      
      {/* Sparkle effects */}
      {isLoaded && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <Sparkles 
              key={i}
              className="absolute text-gold-light" 
              size={16 + i * 4}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.7,
                animation: `twinkle 2s infinite ${i * 0.4}s`
              }}
            />
          ))}
        </div>
      )}
      
      <style>{`
        @keyframes float-up {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(-100px) scale(1); opacity: 0; }
        }
        
        @keyframes twinkle {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.5); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default CoupleIllustration;
