
import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, Flower, PartyPopper } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createParticleAnimation, addFloatingElements } from '@/utils/weddingAnimations';

interface InteractiveEffectsProps {
  className?: string;
}

const InteractiveEffects: React.FC<InteractiveEffectsProps> = ({ className }) => {
  const [activeEffect, setActiveEffect] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [floatingElements, setFloatingElements] = useState<{
    remove: () => void;
  } | null>(null);
  
  // Clear any active effect when component unmounts
  useEffect(() => {
    return () => {
      if (activeEffect && containerRef.current) {
        setActiveEffect(null);
      }
      if (floatingElements) {
        floatingElements.remove();
      }
    };
  }, [activeEffect, floatingElements]);
  
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
        case 'hearts':
          createParticleAnimation('hearts', containerRef.current);
          break;
        case 'sparkles':
          createParticleAnimation('sparkles', containerRef.current);
          break;
        case 'flowers':
          createParticleAnimation('flowers', containerRef.current);
          break;
        case 'confetti':
          createParticleAnimation('confetti', containerRef.current);
          break;
        default:
          break;
      }
    }
  };
  
  const toggleFloatingElements = () => {
    if (containerRef.current) {
      if (floatingElements) {
        floatingElements.remove();
        setFloatingElements(null);
      } else {
        // Add floating elements
        const elements = addFloatingElements(containerRef.current, 15);
        setFloatingElements(elements);
      }
    }
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
            activeEffect === 'hearts' 
              ? "bg-[#FF5E5B] text-white" 
              : "bg-maroon/60 border border-gold-light/70 text-gold-light"
          )}
          onClick={() => toggleEffect('hearts')}
        >
          <span className="relative z-10 flex items-center">
            Shower Hearts <Heart className="ml-1.5" size={16} />
          </span>
        </button>
        
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
            Gold Sparkles <Sparkles className="ml-1.5" size={16} />
          </span>
        </button>
        
        <button
          className={cn(
            "relative px-5 py-2 rounded-full transition-all duration-300",
            "overflow-hidden transform hover:scale-105",
            activeEffect === 'flowers' 
              ? "bg-[#FF6B6B] text-white" 
              : "bg-maroon/60 border border-gold-light/70 text-gold-light"
          )}
          onClick={() => toggleEffect('flowers')}
        >
          <span className="relative z-10 flex items-center">
            Rose Petals <Flower className="ml-1.5" size={16} />
          </span>
        </button>
        
        <button
          className={cn(
            "relative px-5 py-2 rounded-full transition-all duration-300",
            "overflow-hidden transform hover:scale-105",
            activeEffect === 'confetti' 
              ? "bg-gradient-to-r from-[#FF6B6B] to-[#FFD700] text-maroon" 
              : "bg-maroon/60 border border-gold-light/70 text-gold-light"
          )}
          onClick={() => toggleEffect('confetti')}
        >
          <span className="relative z-10 flex items-center">
            Celebration Confetti <PartyPopper className="ml-1.5" size={16} />
          </span>
        </button>
        
        <button
          className={cn(
            "relative px-5 py-2 rounded-full transition-all duration-300",
            "overflow-hidden transform hover:scale-105",
            floatingElements 
              ? "bg-[#91A6FF] text-maroon" 
              : "bg-maroon/60 border border-gold-light/70 text-gold-light"
          )}
          onClick={toggleFloatingElements}
        >
          <span className="relative z-10 flex items-center">
            {floatingElements ? "Hide" : "Show"} Floating Elements <Sparkles className="ml-1.5" size={16} />
          </span>
        </button>
      </div>
    </div>
  );
};

export default InteractiveEffects;
