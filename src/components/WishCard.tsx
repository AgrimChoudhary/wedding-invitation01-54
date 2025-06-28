
import React from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Wish {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  avatar?: string;
  likes?: number;
}

interface WishCardProps {
  wish: Wish;
  index: number;
  onLike?: (wishId: string) => void;
  showLikes?: boolean;
}

const WishCard: React.FC<WishCardProps> = ({ wish, index, onLike, showLikes = false }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleLike = () => {
    if (onLike) {
      onLike(wish.id);
    }
  };

  return (
    <div 
      className="flex-shrink-0 w-80 md:w-96 bg-gradient-to-br from-cream/95 to-cream/85 rounded-2xl p-6 border-2 border-gold-light/30 hover:border-gold-light/60 transition-all duration-500 hover:shadow-xl hover:shadow-gold-light/20 transform hover:-translate-y-2 animate-fade-in relative overflow-hidden mx-3"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Classical decorative corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-gold-light/40"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-gold-light/40"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-gold-light/40"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-gold-light/40"></div>
      
      {/* Decorative heart */}
      <div className="absolute top-4 right-4 w-8 h-8 opacity-20">
        <Heart className="text-gold-light w-full h-full" />
      </div>
      
      {/* Traditional pattern overlay */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-maroon via-transparent to-maroon pointer-events-none"></div>
      
      {/* Avatar section */}
      <div className="flex items-center mb-6 relative z-10">
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-gold-gradient flex items-center justify-center mr-4 shadow-lg border-2 border-maroon/10">
            {wish.avatar ? (
              <img 
                src={wish.avatar} 
                alt={wish.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-maroon font-bold text-xl font-cormorant">
                {getInitials(wish.name)}
              </span>
            )}
          </div>
          {/* Decorative ring around avatar */}
          <div className="absolute inset-0 rounded-full border-2 border-gold-light/30 scale-110 animate-pulse"></div>
        </div>
        
        <div className="flex-1">
          <h4 className="font-cormorant text-maroon font-bold text-xl mb-1">
            {wish.name}
          </h4>
          <div className="flex items-center text-gold-light/80 text-sm">
            <div className="w-2 h-2 bg-gold-light rounded-full mr-2 animate-pulse"></div>
            <span className="font-opensans">{wish.timestamp}</span>
          </div>
        </div>
      </div>

      {/* Message section with enhanced styling */}
      <div className="relative mb-6">
        <div className="absolute -left-2 -top-2 text-6xl text-gold-light/20 font-cormorant leading-none">"</div>
        <p className="text-maroon/90 font-opensans text-base leading-relaxed italic pl-6 pr-2 relative z-10">
          {wish.message}
        </p>
        <div className="absolute -right-2 -bottom-2 text-6xl text-gold-light/20 font-cormorant leading-none rotate-180">"</div>
      </div>

      {/* Bottom section with like button and decorative elements */}
      <div className="flex items-center justify-between pt-4 border-t border-gold-light/20">
        {showLikes && (
          <button 
            onClick={handleLike}
            className="flex items-center space-x-2 text-gold-light/70 hover:text-gold-light transition-colors duration-300 group"
          >
            <Heart className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm font-medium">{wish.likes || 0}</span>
          </button>
        )}
        
        <div className="flex space-x-2 ml-auto">
          <div className="w-2 h-2 bg-gold-light/40 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-gold-light/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-gold-light/40 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default WishCard;
