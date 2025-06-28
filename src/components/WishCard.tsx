
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
      className="flex-shrink-0 w-full max-w-sm bg-white/95 backdrop-blur-sm rounded-2xl p-6 border-2 border-gold-light/40 hover:border-gold-light/70 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-light/30 transform hover:-translate-y-3 animate-fade-in relative overflow-hidden mx-2 shadow-xl"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Enhanced decorative pattern background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream/80 via-white/90 to-cream/60 opacity-90"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-maroon/5 via-transparent to-gold-light/10"></div>
      
      {/* Classical decorative corners with enhanced styling */}
      <div className="absolute top-2 left-2 w-10 h-10 border-l-3 border-t-3 border-gold-light/60 rounded-tl-lg"></div>
      <div className="absolute top-2 right-2 w-10 h-10 border-r-3 border-t-3 border-gold-light/60 rounded-tr-lg"></div>
      <div className="absolute bottom-2 left-2 w-10 h-10 border-l-3 border-b-3 border-gold-light/60 rounded-bl-lg"></div>
      <div className="absolute bottom-2 right-2 w-10 h-10 border-r-3 border-b-3 border-gold-light/60 rounded-br-lg"></div>
      
      {/* Decorative heart with glow effect */}
      <div className="absolute top-4 right-4 w-8 h-8 opacity-30">
        <Heart className="text-gold-light w-full h-full drop-shadow-lg" />
        <div className="absolute inset-0 w-full h-full bg-gold-light/20 rounded-full blur-lg animate-pulse"></div>
      </div>
      
      {/* Enhanced traditional pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_maroon_1px,_transparent_1px)] bg-[length:20px_20px] pointer-events-none"></div>
      
      {/* Content with enhanced spacing and typography */}
      <div className="relative z-10">
        {/* Avatar section with enhanced styling */}
        <div className="flex items-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-light to-gold-light/80 flex items-center justify-center mr-4 shadow-2xl border-3 border-white/50 backdrop-blur-sm">
              {wish.avatar ? (
                <img 
                  src={wish.avatar} 
                  alt={wish.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-maroon font-bold text-xl font-cormorant drop-shadow-sm">
                  {getInitials(wish.name)}
                </span>
              )}
            </div>
            {/* Enhanced decorative ring around avatar */}
            <div className="absolute inset-0 rounded-full border-2 border-gold-light/50 scale-110 animate-pulse"></div>
            <div className="absolute inset-0 rounded-full border border-maroon/20 scale-125"></div>
          </div>
          
          <div className="flex-1">
            <h4 className="font-cormorant text-maroon font-bold text-xl mb-1 drop-shadow-sm">
              {wish.name}
            </h4>
            <div className="flex items-center text-gold-light/90 text-sm">
              <div className="w-2 h-2 bg-gold-light rounded-full mr-2 animate-pulse shadow-sm"></div>
              <span className="font-opensans font-medium">{wish.timestamp}</span>
            </div>
          </div>
        </div>

        {/* Enhanced message section */}
        <div className="relative mb-6 bg-white/30 rounded-xl p-4 backdrop-blur-sm border border-gold-light/20">
          <div className="absolute -left-1 -top-1 text-4xl text-gold-light/40 font-cormorant leading-none">"</div>
          <p className="text-maroon/95 font-opensans text-base leading-relaxed italic px-4 py-2 relative z-10 font-medium">
            {wish.message}
          </p>
          <div className="absolute -right-1 -bottom-1 text-4xl text-gold-light/40 font-cormorant leading-none rotate-180">"</div>
        </div>

        {/* Enhanced bottom section */}
        <div className="flex items-center justify-between pt-4 border-t border-gold-light/30">
          {showLikes && (
            <button 
              onClick={handleLike}
              className="flex items-center space-x-2 text-gold-light/80 hover:text-gold-light transition-colors duration-300 group bg-white/40 rounded-full px-3 py-1 backdrop-blur-sm border border-gold-light/20 hover:border-gold-light/40"
            >
              <Heart className="w-4 h-4 group-hover:scale-110 transition-transform duration-300 group-hover:fill-current" />
              <span className="text-sm font-medium">{wish.likes || 0}</span>
            </button>
          )}
          
          <div className="flex space-x-2 ml-auto">
            <div className="w-2 h-2 bg-gold-light/50 rounded-full animate-pulse shadow-sm"></div>
            <div className="w-2 h-2 bg-gold-light/50 rounded-full animate-pulse shadow-sm" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-gold-light/50 rounded-full animate-pulse shadow-sm" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishCard;
