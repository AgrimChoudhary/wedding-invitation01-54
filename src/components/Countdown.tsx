
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CountdownProps {
  targetDate: Date;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (targetDate: Date): TimeLeft => {
  const difference = targetDate.getTime() - new Date().getTime();
  
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
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate]);
  
  const timeUnits = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' }
  ];
  
  return (
    <div className={cn('text-center mb-10', className)}>
      <h3 className="font-cormorant text-xl md:text-2xl mb-6 italic gold-text">
        Days until forever begins...
      </h3>
      
      <div className="flex justify-center space-x-4 md:space-x-8">
        {timeUnits.map((unit, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="relative mb-2">
              <div className="absolute -inset-1 bg-gold-gradient rounded-lg opacity-50 blur-sm"></div>
              <div className="relative bg-maroon py-3 px-4 md:px-6 rounded-lg gold-border">
                <span className="font-cormorant font-bold text-2xl md:text-4xl gold-text embossed">
                  {unit.value.toString().padStart(2, '0')}
                </span>
              </div>
            </div>
            <span className="text-cream text-xs md:text-sm uppercase tracking-wider font-opensans">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countdown;
