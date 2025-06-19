
import React from 'react';
import { Phone, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContactCardProps {
  name: string;
  number: string;
  index: number;
  className?: string;
  style?: React.CSSProperties;
}

const ContactCard: React.FC<ContactCardProps> = ({ name, number, index, className, style }) => {
  const handleCall = () => {
    window.open(`tel:${number}`, '_self');
  };

  return (
    <div 
      className={cn(
        "group relative bg-gradient-to-br from-maroon/70 via-maroon/60 to-maroon/50",
        "rounded-xl p-4 sm:p-5 border border-gold-light/40 hover:border-gold-light/80",
        "transition-all duration-300 hover:shadow-lg hover:shadow-gold-light/25",
        "hover:-translate-y-1 overflow-hidden cursor-pointer",
        "min-h-[120px] flex flex-col justify-between",
        className
      )} 
      onClick={handleCall}
      style={style}
    >
      {/* Decorative corner elements - smaller for iframe */}
      <div className="absolute top-2 left-2 w-4 h-4 sm:w-6 sm:h-6 border-l-2 border-t-2 border-gold-light/50 group-hover:border-gold-light transition-colors duration-300"></div>
      <div className="absolute bottom-2 right-2 w-4 h-4 sm:w-6 sm:h-6 border-r-2 border-b-2 border-gold-light/50 group-hover:border-gold-light transition-colors duration-300"></div>
      
      {/* Subtle shine effect for iframe compatibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-light/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
      
      <div className="relative z-10 flex-1">
        {/* Contact Person Label */}
        <div className="flex items-center mb-2 sm:mb-3">
          <div className="bg-gold-gradient p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3 group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
            <User className="text-maroon" size={14} />
          </div>
          <span className="text-gold-light/80 text-xs sm:text-sm font-medium tracking-wide leading-tight">
            Contact Person {index + 1}
          </span>
        </div>
        
        {/* Contact Name */}
        <h4 className="font-cormorant text-base sm:text-lg md:text-xl gold-text font-semibold mb-2 group-hover:text-gold-light transition-colors duration-300 line-clamp-2">
          {name}
        </h4>
        
        {/* Contact Number with Phone Icon */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center min-w-0 flex-1">
            <Phone className="text-gold-light mr-1 sm:mr-2 group-hover:rotate-6 transition-transform duration-300 flex-shrink-0" size={14} />
            <span className="text-cream font-medium tracking-wide text-sm sm:text-base truncate">{number}</span>
          </div>
          <div className="bg-gold-light/20 px-2 sm:px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 flex-shrink-0">
            <span className="text-gold-light text-xs font-bold whitespace-nowrap">Tap to Call</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
