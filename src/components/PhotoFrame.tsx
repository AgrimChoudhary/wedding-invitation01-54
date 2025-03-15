
import React from 'react';
import { cn } from '@/lib/utils';

interface PhotoFrameProps {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  isHovered?: boolean;
}

const PhotoFrame: React.FC<PhotoFrameProps> = ({ children, className, isActive, isHovered }) => {
  return (
    <div 
      className={cn(
        "relative overflow-hidden",
        className
      )}
    >
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-10 h-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-0.5 h-6 bg-gold-gradient"></div>
        <div className="absolute top-0 left-0 w-6 h-0.5 bg-gold-gradient"></div>
      </div>
      
      <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-0.5 h-6 bg-gold-gradient"></div>
        <div className="absolute top-0 right-0 w-6 h-0.5 bg-gold-gradient"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-10 h-10 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-0.5 h-6 bg-gold-gradient"></div>
        <div className="absolute bottom-0 left-0 w-6 h-0.5 bg-gold-gradient"></div>
      </div>
      
      <div className="absolute bottom-0 right-0 w-10 h-10 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-0.5 h-6 bg-gold-gradient"></div>
        <div className="absolute bottom-0 right-0 w-6 h-0.5 bg-gold-gradient"></div>
      </div>
      
      {/* Main content */}
      <div className="relative">
        {children}
      </div>
      
      {/* Glow effect on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 border-2 border-gold-light/70 animate-pulse-glow"></div>
        </div>
      )}
      
      {/* Active indicator */}
      {isActive && (
        <div className="absolute inset-0 border-2 border-gold-light/90 pointer-events-none"></div>
      )}
    </div>
  );
};

export default PhotoFrame;
