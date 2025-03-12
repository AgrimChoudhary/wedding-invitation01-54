
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const GaneshaHeader: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isShimmer, setIsShimmer] = useState(false);

  useEffect(() => {
    // Animate entrance
    setTimeout(() => setIsLoaded(true), 500);

    // Start shimmer effect periodically
    const shimmerInterval = setInterval(() => {
      setIsShimmer(true);
      setTimeout(() => setIsShimmer(false), 2000);
    }, 10000);
    
    return () => clearInterval(shimmerInterval);
  }, []);

  return (
    <div className="relative py-6 px-4 text-center max-w-4xl mx-auto z-10">
      <div className="absolute inset-0 bg-gold-light/5 rounded-xl pointer-events-none"></div>
      
      {/* Golden ornate border */}
      <div className="absolute inset-0 border border-gold-light/20 rounded-xl pointer-events-none"></div>
      <div className="absolute inset-x-0 top-0 h-px bg-gold-gradient pointer-events-none"></div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gold-gradient pointer-events-none"></div>
      <div className="absolute inset-y-0 left-0 w-px bg-gold-gradient pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-px bg-gold-gradient pointer-events-none"></div>
      
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold-light rounded-tl-xl pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold-light rounded-tr-xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold-light rounded-bl-xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold-light rounded-br-xl pointer-events-none"></div>
      
      <div className={cn("transition-all duration-1000 transform relative z-10", isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10")}>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10">
          <div className="relative w-28 h-28 md:w-32 md:h-32">
            <div className={cn("absolute inset-0 bg-gold-light/10 rounded-full transition-all duration-700", isShimmer && "bg-gold-light/20")}></div>
            
            {/* Ganesha image */}
            <img 
              src="/lovable-uploads/762354ab-cff9-4c6a-9800-94eeefc3c43c.png" 
              alt="Lord Ganesha" 
              className={cn(
                "w-full h-full object-contain drop-shadow-lg transition-all duration-700 transform", 
                isShimmer && "scale-105"
              )} 
            />
            
            {/* Subtle glow effect */}
            {isShimmer && (
              <div className="absolute inset-0 rounded-full bg-gold-light/10 animate-pulse filter blur-md"></div>
            )}
          </div>
          
          <div className="text-center md:text-left">
            <h3 className="font-cormorant text-xl md:text-2xl gold-text mb-2">
              Wedding Invitation
            </h3>
            
            <div className={cn("gold-text font-cormorant text-lg md:text-xl italic leading-relaxed transition-all", isShimmer && "text-gold-light")}>
              <p>"May our union be blessed with love and happiness"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GaneshaHeader;
