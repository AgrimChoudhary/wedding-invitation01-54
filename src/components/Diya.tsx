import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
interface DiyaProps {
  className?: string;
  position?: 'left' | 'right';
  blessing?: string;
  delay?: number;
}
const Diya: React.FC<DiyaProps> = ({
  className,
  position = 'left',
  blessing = "आनन्दं (Joy)",
  delay = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const handleClick = () => {
    setIsClicked(true);
    setClickCount(prev => prev + 1);
    setTimeout(() => setIsClicked(false), 2000);
  };
  return <div className={cn('absolute transition-all duration-300 z-10', position === 'left' ? 'left-4' : 'right-4', className)} style={{
    animationDelay: `${delay}s`
  }}>
      
      
      <style jsx>{`
        @keyframes ring-expand {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
      `}</style>
    </div>;
};
export default Diya;