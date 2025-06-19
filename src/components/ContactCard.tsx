
import React from 'react';
import { Phone, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContactCardProps {
  name: string;
  number: string;
  index: number;
  className?: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ name, number, index, className }) => {
  const handleCall = () => {
    window.open(`tel:${number}`, '_self');
  };

  return (
    <div className={cn(
      "group relative bg-gradient-to-br from-maroon/60 via-maroon/50 to-maroon/40",
      "rounded-xl p-4 border border-gold-light/30 hover:border-gold-light/70",
      "transition-all duration-300 hover:shadow-lg hover:shadow-gold-light/20",
      "hover:-translate-y-1 overflow-hidden cursor-pointer",
      className
    )} onClick={handleCall}>
      {/* Decorative corner elements */}
      <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-gold-light/50 group-hover:border-gold-light transition-colors duration-300"></div>
      <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-gold-light/50 group-hover:border-gold-light transition-colors duration-300"></div>
      
      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-light/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      
      <div className="relative z-10">
        {/* Contact Person Label */}
        <div className="flex items-center mb-3">
          <div className="bg-gold-gradient p-2 rounded-full mr-3 group-hover:scale-110 transition-transform duration-300">
            <User className="text-maroon" size={16} />
          </div>
          <span className="text-gold-light/80 text-sm font-medium tracking-wide">
            Contact Person {index + 1}
          </span>
        </div>
        
        {/* Contact Name */}
        <h4 className="font-cormorant text-lg md:text-xl gold-text font-semibold mb-2 group-hover:text-gold-light transition-colors duration-300">
          {name}
        </h4>
        
        {/* Contact Number with Phone Icon */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Phone className="text-gold-light mr-2 group-hover:rotate-12 transition-transform duration-300" size={16} />
            <span className="text-cream font-medium tracking-wide">{number}</span>
          </div>
          <div className="bg-gold-light/20 px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <span className="text-gold-light text-xs font-bold">Tap to Call</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
