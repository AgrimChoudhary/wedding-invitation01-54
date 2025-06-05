
import React, { useEffect, useState } from 'react';
import { Heart, Sparkles, Star, Flower } from 'lucide-react';
import { cn } from '@/lib/utils';

const FloatingElements: React.FC = () => {
  const [elements, setElements] = useState<Array<{
    id: number;
    icon: React.ReactNode;
    x: number;
    y: number;
    delay: number;
    duration: number;
    scale: number;
  }>>([]);

  useEffect(() => {
    const icons = [Heart, Sparkles, Star, Flower];
    const newElements = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      icon: React.createElement(icons[i % icons.length], {
        className: "w-full h-full text-gold-light/30",
        fill: "currentColor"
      }),
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 4 + Math.random() * 4,
      scale: 0.5 + Math.random() * 0.5
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element) => (
        <div
          key={element.id}
          className={cn(
            "absolute animate-float opacity-40",
            "transition-all duration-1000 ease-in-out"
          )}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            animationDelay: `${element.delay}s`,
            animationDuration: `${element.duration}s`,
            transform: `scale(${element.scale})`,
            width: '24px',
            height: '24px'
          }}
        >
          {element.icon}
        </div>
      ))}
    </div>
  );
};

export default FloatingElements;
