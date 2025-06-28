
import React from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Wish {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  avatar?: string;
}

interface WishCardProps {
  wish: Wish;
  index: number;
}

const WishCard: React.FC<WishCardProps> = ({ wish, index }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div 
      className="bg-gradient-to-br from-cream/95 to-cream/85 rounded-2xl p-6 border-2 border-gold-light/40 hover:border-gold-light/70 transition-all duration-300 hover:shadow-lg hover:shadow-gold-light/20 transform hover:-translate-y-1 animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Decorative elements */}
      <div className="absolute top-3 right-3 w-6 h-6 opacity-20">
        <Heart className="text-gold-light w-full h-full" />
      </div>
      
      {/* Avatar */}
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center mr-3 shadow-md">
          {wish.avatar ? (
            <img 
              src={wish.avatar} 
              alt={wish.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-maroon font-bold text-lg">
              {getInitials(wish.name)}
            </span>
          )}
        </div>
        <div>
          <h4 className="font-cormorant text-maroon font-bold text-xl">
            {wish.name}
          </h4>
          <p className="text-gold-light/80 text-sm flex items-center">
            <span className="w-2 h-2 bg-gold-light rounded-full mr-2"></span>
            {wish.timestamp}
          </p>
        </div>
      </div>

      {/* Message */}
      <p className="text-maroon/90 font-opensans text-base leading-relaxed italic mb-4">
        "{wish.message}"
      </p>

      {/* Like button */}
      <div className="flex items-center justify-between">
        <button className="flex items-center space-x-2 text-gold-light/70 hover:text-gold-light transition-colors duration-300">
          <Heart className="w-4 h-4" />
          <span className="text-sm">1</span>
        </button>
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-gold-light/40 rounded-full"></div>
          <div className="w-1 h-1 bg-gold-light/40 rounded-full"></div>
          <div className="w-1 h-1 bg-gold-light/40 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default WishCard;
