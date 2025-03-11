
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
  const [animateHearts, setAnimateHearts] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500);
    
    // Periodically show heart animation
    const heartInterval = setInterval(() => {
      setAnimateHearts(true);
      setTimeout(() => setAnimateHearts(false), 2000);
    }, 8000);
    
    // Add halo effect to the couple image
    let haloEffect: { remove: () => void } | null = null;
    
    if (imageRef.current && interactive) {
      haloEffect = createHaloEffect(imageRef.current);
    }
    
    return () => {
      clearInterval(heartInterval);
      if (haloEffect) haloEffect.remove();
    };
  }, [interactive]);
  
  const handleClick = () => {
    if (!interactive) return;
    
    setIsClicked(true);
    
    // Create larger heart burst animation on click
    if (imageRef.current) {
      const heartBurst = () => {
        const burst = document.createElement('div');
        burst.className = 'heart-burst';
        burst.style.position = 'absolute';
        burst.style.inset = '0';
        burst.style.zIndex = '20';
        burst.style.pointerEvents = 'none';
        
        for (let i = 0; i < 20; i++) {
          const heart = document.createElement('div');
          const size = Math.random() * 25 + 15;
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 120 + 50;
          const duration = Math.random() * 1.5 + 1;
          const delay = Math.random() * 0.3;
          
          heart.style.position = 'absolute';
          heart.style.width = `${size}px`;
          heart.style.height = `${size}px`;
          heart.style.backgroundColor = 'transparent';
          heart.style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FFD700' stroke='none'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E")`;
          heart.style.backgroundSize = 'contain';
          heart.style.backgroundRepeat = 'no-repeat';
          heart.style.left = '50%';
          heart.style.top = '50%';
          heart.style.transform = 'translate(-50%, -50%)';
          heart.style.opacity = '0';
          
          heart.style.animation = `
            heart-burst ${duration}s ease-out ${delay}s forwards
          `;
          
          const keyframes = `
            @keyframes heart-burst {
              0% {
                transform: translate(-50%, -50%) scale(0.2) rotate(0deg);
                opacity: 0;
              }
              20% {
                opacity: 1;
              }
              100% {
                transform: 
                  translate(
                    calc(-50% + ${Math.cos(angle) * distance}px), 
                    calc(-50% + ${Math.sin(angle) * distance}px)
                  )
                  scale(0.8)
                  rotate(${Math.random() * 180 - 90}deg);
                opacity: 0;
              }
            }
          `;
          
          if (!document.getElementById('heart-burst-animation')) {
            const style = document.createElement('style');
            style.id = 'heart-burst-animation';
            style.innerHTML = keyframes;
            document.head.appendChild(style);
          }
          
          burst.appendChild(heart);
        }
        
        imageRef.current?.appendChild(burst);
        
        setTimeout(() => {
          if (imageRef.current?.contains(burst)) {
            imageRef.current.removeChild(burst);
          }
        }, 3000);
      };
      
      heartBurst();
    }
    
    // Reset the clicked state after animation
    setTimeout(() => setIsClicked(false), 3000);
  };
  
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
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0); }
          25% { transform: rotate(5deg); }
          50% { transform: rotate(-5deg); }
          75% { transform: rotate(3deg); }
        }
        
        .animate-wiggle {
          animation: wiggle 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default CoupleIllustration;
