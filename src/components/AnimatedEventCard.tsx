
import React from 'react';
import { Calendar, Clock, MapPin, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimatedEventCardProps {
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedEventCard: React.FC<AnimatedEventCardProps> = ({
  title,
  date,
  time,
  venue,
  description,
  icon,
  delay = 0,
  className
}) => {
  return (
    <div 
      className={cn(
        "group relative bg-maroon/40 backdrop-blur-sm rounded-2xl p-6 gold-border",
        "hover:bg-maroon/60 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-light/20",
        "animate-fade-in hover:-translate-y-2 overflow-hidden",
        className
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gold-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl"></div>
      
      {/* Floating particles on hover */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold-light rounded-full opacity-0 group-hover:animate-particles group-hover:opacity-60"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Card content */}
      <div className="relative z-10">
        {/* Icon and title */}
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h3 className="font-cormorant text-2xl md:text-3xl font-bold gold-text group-hover:text-gold-light transition-colors duration-300">
            {title}
          </h3>
        </div>

        {/* Event details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-cream/90 group-hover:text-cream transition-colors duration-300">
            <Calendar className="w-4 h-4 mr-3 text-gold-light" />
            <span className="font-opensans">{date}</span>
          </div>
          <div className="flex items-center text-cream/90 group-hover:text-cream transition-colors duration-300">
            <Clock className="w-4 h-4 mr-3 text-gold-light" />
            <span className="font-opensans">{time}</span>
          </div>
          <div className="flex items-center text-cream/90 group-hover:text-cream transition-colors duration-300">
            <MapPin className="w-4 h-4 mr-3 text-gold-light" />
            <span className="font-opensans">{venue}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-cream/80 font-opensans text-sm md:text-base leading-relaxed group-hover:text-cream/90 transition-colors duration-300">
          {description}
        </p>

        {/* Decorative bottom border */}
        <div className="mt-4 pt-4 border-t border-gold-light/20 group-hover:border-gold-light/40 transition-colors duration-300">
          <div className="flex justify-center">
            <Heart className="w-5 h-5 text-rosegold group-hover:animate-heart-beat transition-colors duration-300" fill="currentColor" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedEventCard;
