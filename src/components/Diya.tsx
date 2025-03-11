
import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DiyaProps {
  className?: string;
  position?: 'left' | 'right';
  blessing?: string;
  delay?: number;
}

const Diya: React.FC<DiyaProps> = ({
  className,
  position = 'left',
  blessing = "आनन्दं (Joy)",
  delay = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  
  const handleClick = () => {
    setIsClicked(true);
    setClickCount(prev => prev + 1);
    setTimeout(() => setIsClicked(false), 2000);
  };
  
  return (
    <div 
      className={cn(
        'absolute transition-all duration-300 z-10',
        position === 'left' ? 'left-4' : 'right-4',
        className
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <div className={cn(
          "relative cursor-pointer transition-all duration-300",
          isClicked && "transform rotate-[15deg]",
          "animate-float"
        )}>
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="absolute inset-0 bg-gold-gradient rounded-full opacity-20"></div>
            <Heart 
              className={cn(
                "text-gold-light fill-gold-light transition-all duration-300",
                isHovered && "scale-110"
              )} 
              size={42}
            />
            
            <div className={cn(
              "absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-4 transition-all duration-300",
              "bg-gradient-to-t from-gold-light via-[#FFA500] to-[#FF4500]",
              "rounded-full blur-[1px]",
              isHovered && "h-6 blur-[2px]"
            )}></div>
            
            {isClicked && (
              <Sparkles 
                className="absolute text-gold-light animate-spin-slow" 
                size={64}
              />
            )}
            
            {/* Radiating rings on click */}
            {isClicked && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute inset-0 rounded-full border border-gold-light"
                    style={{
                      animation: `ring-expand 1.5s ease-out forwards ${i * 0.3}s`
                    }}
                  ></div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {isClicked && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full">
            <div className="relative gold-text font-cormorant font-bold text-xl animate-fade-in py-1 px-3 rounded-lg bg-maroon/90 border border-gold-light/40">
              {blessing}
            </div>
          </div>
        )}
        
        {/* Blessing count */}
        {clickCount > 0 && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs text-gold-light/80 bg-maroon/80 px-2 py-0.5 rounded-full gold-border">
            {clickCount}
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes ring-expand {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Diya;
