
import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createHaloEffect } from '@/utils/weddingAnimations';

interface CoupleIllustrationProps {
  className?: string;
  interactive?: boolean;
}

const CoupleIllustration: React.FC<CoupleIllustrationProps> = ({ 
  className,
  interactive = true 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<{ remove: () => void } | null>(null);
  
  useEffect(() => {
    // Set loaded state with slight delay for animation
    setTimeout(() => setIsLoaded(true), 500);
    
    return () => {
      if (haloRef.current) {
        haloRef.current.remove();
      }
    };
  }, []);
  
  const handleClick = () => {
    if (!interactive) return;
    
    setIsClicked(true);
    
    // Toggle halo effect on click
    if (imageRef.current) {
      if (haloRef.current) {
        haloRef.current.remove();
        haloRef.current = null;
      } else {
        haloRef.current = createHaloEffect(imageRef.current);
      }
    }
    
    // Show subtle heart animation
    if (imageRef.current && !haloRef.current) {
      const createSubtleHeartEffect = () => {
        const heart = document.createElement('div');
        heart.className = 'absolute opacity-0';
        heart.style.top = '50%';
        heart.style.left = '50%';
        heart.style.transform = 'translate(-50%, -50%)';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '20';
        heart.innerHTML = `<svg width="40" height="40" viewBox="0 0 24 24" fill="#FFD700" stroke="none">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
        </svg>`;
        
        // Animate the heart growing and fading
        heart.animate([
          { opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' },
          { opacity: 1, transform: 'translate(-50%, -50%) scale(1.5)' },
          { opacity: 0, transform: 'translate(-50%, -50%) scale(2)' }
        ], {
          duration: 1500,
          easing: 'ease-out'
        });
        
        imageRef.current?.appendChild(heart);
        
        setTimeout(() => {
          if (imageRef.current?.contains(heart)) {
            imageRef.current.removeChild(heart);
          }
        }, 1500);
      };
      
      createSubtleHeartEffect();
    }
    
    // Reset the clicked state after animation
    setTimeout(() => setIsClicked(false), 300);
  };
  
  return (
    <div 
      className={cn(
        "relative flex justify-center items-center transition-all duration-1000",
        isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95",
        className
      )}
    >
      {/* Ornamental frame with improved aesthetics */}
      <div className="absolute inset-[-8px] rounded-full border-4 border-gold-gradient opacity-20"></div>
      
      {/* Subtle corner accents */}
      {[0, 90, 180, 270].map((angle, index) => (
        <div 
          key={index}
          className="absolute w-6 h-6"
          style={{
            top: angle === 0 || angle === 90 ? '-3px' : 'auto',
            bottom: angle === 180 || angle === 270 ? '-3px' : 'auto',
            left: angle === 180 || angle === 90 ? '-3px' : 'auto',
            right: angle === 0 || angle === 270 ? '-3px' : 'auto',
          }}
        >
          <div 
            className="absolute w-full h-full bg-gold-gradient rounded-full opacity-40"
            style={{ animation: `pulse-glow 4s infinite ${index * 0.5}s` }}
          ></div>
        </div>
      ))}
      
      {/* Main couple image */}
      <div 
        ref={imageRef}
        className={cn(
          "relative rounded-full overflow-hidden w-64 h-64 md:w-80 md:h-80 gold-border",
          interactive && "cursor-pointer transition-transform duration-300",
          isHovered && interactive && "scale-105",
          isClicked && "animate-wiggle"
        )}
        onMouseEnter={() => interactive && setIsHovered(true)}
        onMouseLeave={() => interactive && setIsHovered(false)}
        onClick={handleClick}
      >
        <img 
          src="/lovable-uploads/5afd7a5a-50bd-433d-8e23-7e0d3aa5b16f.png" 
          alt="Bride and Groom" 
          className={cn(
            "w-full h-full object-contain transition-all duration-300",
            isHovered && interactive && "filter brightness-110"
          )}
        />
        
        {/* Subtle gold overlay for warmth */}
        <div className="absolute inset-0 bg-gradient-to-b from-gold-light/5 to-gold-light/10"></div>
        
        {/* Interactive overlay effect */}
        {interactive && isHovered && (
          <div className="absolute inset-0 bg-gold-gradient opacity-10"></div>
        )}
        
        {/* Click hint */}
        {interactive && isHovered && (
          <div className="absolute bottom-4 left-0 right-0 text-center text-gold-light/80 text-sm font-cormorant">
            Click for blessing
          </div>
        )}
      </div>
      
      {/* Subtle sparkle accents */}
      {isLoaded && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <Sparkles 
              key={i}
              className="absolute text-gold-light" 
              size={12 + i * 2}
              style={{
                top: `${10 + Math.random() * 80}%`,
                left: `${10 + Math.random() * 80}%`,
                opacity: 0.6,
                animation: `twinkle 3s infinite ${i * 0.8}s`
              }}
            />
          ))}
        </div>
      )}
      
      <style>{`
        @keyframes twinkle {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.3); opacity: 0.9; }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0); }
          25% { transform: rotate(3deg); }
          75% { transform: rotate(-3deg); }
        }
        
        .animate-wiggle {
          animation: wiggle 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default CoupleIllustration;
