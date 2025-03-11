
import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createParticleAnimation, createHaloEffect } from '@/utils/weddingAnimations';

interface InteractiveEffectsProps {
  className?: string;
}

const InteractiveEffects: React.FC<InteractiveEffectsProps> = ({ className }) => {
  const [activeEffect, setActiveEffect] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isGlowing, setIsGlowing] = useState(false);
  
  // Clear any active effect when component unmounts
  useEffect(() => {
    return () => {
      if (activeEffect && containerRef.current) {
        setActiveEffect(null);
      }
    };
  }, [activeEffect]);
  
  const toggleEffect = (effectType: string) => {
    if (containerRef.current) {
      // Clear previous effect if any
      if (activeEffect) {
        setActiveEffect(null);
      }
      
      // If toggling the same effect off, just return
      if (activeEffect === effectType) {
        return;
      }
      
      // Set new effect
      setActiveEffect(effectType);
      
      // Trigger the actual animation effect
      switch (effectType) {
        case 'sparkles':
          createParticleAnimation('sparkles', containerRef.current, {
            count: 30,
            duration: 3
          });
          break;
        case 'blessing':
          createHaloEffect(containerRef.current);
          break;
        default:
          break;
      }
    }
  };
  
  const toggleGlow = () => {
    setIsGlowing(!isGlowing);
  };
  
  return (
    <div className={cn("relative", className)}>
      <div 
        ref={containerRef} 
        className="absolute inset-0 pointer-events-none overflow-hidden z-10"
      ></div>
      
      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        <button
          className={cn(
            "relative px-5 py-2 rounded-full transition-all duration-300",
            "overflow-hidden transform hover:scale-105",
            activeEffect === 'sparkles' 
              ? "bg-[#FFD700] text-maroon" 
              : "bg-maroon/60 border border-gold-light/70 text-gold-light"
          )}
          onClick={() => toggleEffect('sparkles')}
        >
          <span className="relative z-10 flex items-center">
            Auspicious Blessings <Sparkles className="ml-1.5" size={16} />
          </span>
        </button>
        
        <button
          className={cn(
            "relative px-5 py-2 rounded-full transition-all duration-300",
            "overflow-hidden transform hover:scale-105",
            isGlowing
              ? "bg-[#FFD700] text-maroon" 
              : "bg-maroon/60 border border-gold-light/70 text-gold-light"
          )}
          onClick={toggleGlow}
        >
          <span className="relative z-10 flex items-center">
            {isGlowing ? "Dim" : "Illuminate"} Celebrations <Sparkles className="ml-1.5" size={16} />
          </span>
        </button>
      </div>
      
      {isGlowing && (
        <div className="fixed inset-0 pointer-events-none z-0 bg-gold-light/5 animate-pulse-slow">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-light/10 via-transparent to-transparent"></div>
        </div>
      )}
    </div>
  );
};

export default InteractiveEffects;
