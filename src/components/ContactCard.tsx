
import React from 'react';
import { Phone, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContactCardProps {
  name: string;
  number: string;
  index: number;
  className?: string;
  style?: React.CSSProperties;
  isInIframe?: boolean;
}

const ContactCard: React.FC<ContactCardProps> = ({ 
  name, 
  number, 
  index, 
  className, 
  style, 
  isInIframe = false 
}) => {
  const handleCall = () => {
    window.open(`tel:${number}`, '_self');
  };

  return (
    <div 
      className={cn(
        "group relative bg-gradient-to-br from-maroon/70 via-maroon/60 to-maroon/50",
        "rounded-xl border border-gold-light/40 hover:border-gold-light/80",
        "transition-all duration-300 hover:shadow-lg hover:shadow-gold-light/25",
        "hover:-translate-y-1 overflow-hidden cursor-pointer",
        "flex flex-col justify-between",
        isInIframe ? "p-3 min-h-[100px]" : "p-4 sm:p-5 min-h-[120px]",
        className
      )} 
      onClick={handleCall}
      style={style}
    >
      {/* Decorative corner elements - smaller for iframe */}
      <div className={cn(
        "absolute top-2 left-2 border-l-2 border-t-2 border-gold-light/50 group-hover:border-gold-light transition-colors duration-300",
        isInIframe ? "w-3 h-3" : "w-4 h-4 sm:w-6 sm:h-6"
      )}></div>
      <div className={cn(
        "absolute bottom-2 right-2 border-r-2 border-b-2 border-gold-light/50 group-hover:border-gold-light transition-colors duration-300",
        isInIframe ? "w-3 h-3" : "w-4 h-4 sm:w-6 sm:h-6"
      )}></div>
      
      {/* Subtle shine effect for iframe compatibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-light/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
      
      <div className="relative z-10 flex-1">
        {/* Contact Person Label */}
        <div className={cn(
          "flex items-center mb-2",
          isInIframe ? "mb-1" : "sm:mb-3"
        )}>
          <div className={cn(
            "bg-gold-gradient rounded-full mr-2 group-hover:scale-105 transition-transform duration-300 flex-shrink-0",
            isInIframe ? "p-1" : "p-1.5 sm:p-2 sm:mr-3"
          )}>
            <User className="text-maroon" size={isInIframe ? 10 : 14} />
          </div>
          <span className={cn(
            "text-gold-light/80 font-medium tracking-wide leading-tight",
            isInIframe ? "text-xs" : "text-xs sm:text-sm"
          )}>
            Contact Person {index + 1}
          </span>
        </div>
        
        {/* Contact Name */}
        <h4 className={cn(
          "font-cormorant gold-text font-semibold mb-2 group-hover:text-gold-light transition-colors duration-300 line-clamp-2",
          isInIframe ? "text-sm mb-1" : "text-base sm:text-lg md:text-xl"
        )}>
          {name}
        </h4>
        
        {/* Contact Number with Phone Icon */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center min-w-0 flex-1">
            <Phone className={cn(
              "text-gold-light mr-1 group-hover:rotate-6 transition-transform duration-300 flex-shrink-0",
              isInIframe ? "mr-1" : "sm:mr-2"
            )} size={isInIframe ? 10 : 14} />
            <span className={cn(
              "text-cream font-medium tracking-wide truncate",
              isInIframe ? "text-xs" : "text-sm sm:text-base"
            )}>{number}</span>
          </div>
          <div className={cn(
            "bg-gold-light/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 flex-shrink-0",
            isInIframe ? "px-2 py-0.5" : "px-2 sm:px-3 py-1"
          )}>
            <span className={cn(
              "text-gold-light font-bold whitespace-nowrap",
              isInIframe ? "text-xs" : "text-xs"
            )}>Tap to Call</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
