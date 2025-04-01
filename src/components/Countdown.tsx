
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';

interface CountdownProps {
  targetDate: Date | string;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (targetDate: Date | string): TimeLeft => {
  // Convert string to Date if needed
  const targetDateObj = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  
  // Ensure we have a valid date
  if (!targetDateObj || isNaN(targetDateObj.getTime())) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  
  const difference = targetDateObj.getTime() - new Date().getTime();
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  };
};

const Countdown: React.FC<CountdownProps> = ({ targetDate, className }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(targetDate));
  const [isFlipping, setIsFlipping] = useState<{[key: string]: boolean}>({
    days: false,
    hours: false,
    minutes: false,
    seconds: false
  });
  
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetDate);
      
      // Check which units changed to trigger flip animation
      const changedUnits: {[key: string]: boolean} = {
        days: newTimeLeft.days !== timeLeft.days,
        hours: newTimeLeft.hours !== timeLeft.hours,
        minutes: newTimeLeft.minutes !== timeLeft.minutes,
        seconds: newTimeLeft.seconds !== timeLeft.seconds
      };
      
      setIsFlipping(changedUnits);
      setTimeLeft(newTimeLeft);
      
      // Reset flip animation after a short delay
      setTimeout(() => {
        setIsFlipping({
          days: false,
          hours: false,
          minutes: false,
          seconds: false
        });
      }, 700);
      
    }, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate, timeLeft]);
  
  const timeUnits = [
    { value: timeLeft.days, label: 'Days', key: 'days' },
    { value: timeLeft.hours, label: 'Hours', key: 'hours' },
    { value: timeLeft.minutes, label: 'Minutes', key: 'minutes' },
    { value: timeLeft.seconds, label: 'Seconds', key: 'seconds' }
  ];
  
  return (
    <div className={cn('text-center', className)}>
      <h3 className="font-cormorant text-xl md:text-2xl mb-6 italic gold-text flex items-center justify-center">
        <Clock className="mr-2 text-gold-light" size={20} />
        Days until forever begins...
      </h3>
      
      <div className="flex justify-center space-x-4 md:space-x-8">
        {timeUnits.map((unit) => (
          <div key={unit.key} className="flex flex-col items-center">
            <div className="relative mb-2 perspective">
              <div className="absolute -inset-1 bg-gold-gradient rounded-lg opacity-50 blur-sm"></div>
              <div 
                className={cn(
                  "relative bg-maroon py-3 px-4 md:px-6 rounded-lg gold-border",
                  isFlipping[unit.key] && "flip-card"
                )}
              >
                <span className="font-cormorant font-bold text-2xl md:text-4xl gold-text embossed">
                  {unit.value.toString().padStart(2, '0')}
                </span>
                
                {/* Gold sparkle dots at corners */}
                <span className="absolute top-1 left-1 w-1 h-1 bg-gold-light rounded-full"></span>
                <span className="absolute top-1 right-1 w-1 h-1 bg-gold-light rounded-full"></span>
                <span className="absolute bottom-1 left-1 w-1 h-1 bg-gold-light rounded-full"></span>
                <span className="absolute bottom-1 right-1 w-1 h-1 bg-gold-light rounded-full"></span>
              </div>
            </div>
            <span className="text-cream text-xs md:text-sm uppercase tracking-wider font-opensans">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
      
      <style>{`
        .perspective {
          perspective: 1000px;
        }
        .flip-card {
          animation: flip 0.7s ease-in-out;
          transform-style: preserve-3d;
        }
        @keyframes flip {
          0% { transform: rotateX(0); }
          50% { transform: rotateX(90deg); }
          100% { transform: rotateX(0); }
        }
      `}</style>
    </div>
  );
};

export default Countdown;
