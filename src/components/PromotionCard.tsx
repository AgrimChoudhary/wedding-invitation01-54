
import React from 'react';
import { ExternalLink, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PromotionCardProps {
  className?: string;
}

const PromotionCard = ({ className }: PromotionCardProps) => {
  return (
    <div className={cn(
      "bg-maroon/40 p-5 rounded-lg gold-border relative overflow-hidden group",
      "transition-all duration-300 hover:shadow-gold hover:-translate-y-1",
      className
    )}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-12 h-12 opacity-30">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gold-gradient transform origin-left"></div>
        <div className="absolute top-0 left-0 h-full w-0.5 bg-gold-gradient transform origin-top"></div>
      </div>
      
      <div className="absolute bottom-0 right-0 w-12 h-12 opacity-30">
        <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gold-gradient transform origin-right"></div>
        <div className="absolute bottom-0 right-0 h-full w-0.5 bg-gold-gradient transform origin-bottom"></div>
      </div>
      
      {/* Sparkle effect elements */}
      <div className="absolute -top-2 -right-2 w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30,10 L33,25 L47,30 L33,35 L30,50 L27,35 L13,30 L27,25 L30,10 Z" fill="#FFD700" opacity="0.8" />
        </svg>
      </div>
      
      <div className="z-10 relative">
        <h3 className="font-cormorant text-xl gold-text mb-2 flex items-center justify-center">
          <span className="mr-2 text-2xl">✨</span>
          Wedding Invitation Services
        </h3>
        
        <p className="text-cream text-center mb-3">
          Want a beautiful digital invitation like this for your special day?
        </p>
        
        <div className="gold-text font-semibold text-center mb-3 flex items-center justify-center">
          <span className="animate-pulse">Team Utsavy</span>
          <Heart size={14} className="mx-2 text-gold-light animate-heart-beat" fill="rgba(255,215,0,0.3)" />
          <span>9549461861</span>
        </div>
        
        <a 
          href="tel:+919549461861"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gold-gradient text-maroon rounded-lg mx-auto w-fit hover:scale-105 transition-transform font-medium text-sm"
        >
          Contact Us
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};

export default PromotionCard;
