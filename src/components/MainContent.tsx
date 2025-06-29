
import React from 'react';
import { cn } from '@/lib/utils';

interface MainContentProps {
  guestName: string;
}

const MainContent: React.FC<MainContentProps> = ({ guestName }) => {
  return (
    <div className="py-16 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-cormorant text-maroon text-4xl md:text-6xl font-bold mb-6">
          Welcome, {guestName}!
        </h1>
        <p className="text-gold-light/90 font-opensans text-lg md:text-xl mb-8">
          You're invited to celebrate our special day
        </p>
        <div className="w-24 h-0.5 bg-gold-gradient mx-auto"></div>
      </div>
    </div>
  );
};

export default MainContent;
