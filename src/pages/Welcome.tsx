
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import GaneshaHeader from '@/components/GaneshaHeader';
import CoupleIllustration from '@/components/CoupleIllustration';
import { initCursorGlitter, initTouchGlitter } from '@/utils/animationUtils';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  BRIDE_NAME, 
  GROOM_NAME, 
  WEDDING_DATE, 
  COUPLE_TAGLINE,
  getOrderedNames
} from '@/constants/placeholders';

const Welcome = () => {
  const navigate = useNavigate();
  const [showHearts, setShowHearts] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const isMobile = useIsMobile();
  
  const orderedNames = getOrderedNames();
  
  useEffect(() => {
    const cleanup = isMobile ? initTouchGlitter() : initCursorGlitter();
    
    // Check if guest name is already stored
    const storedName = localStorage.getItem('guestName');
    if (storedName) {
      setGuestName(storedName);
      setNameSubmitted(true);
    }
    
    return cleanup;
  }, [isMobile]);

  useEffect(() => {
    if (showHearts) {
      const interval = setInterval(() => {
        createHeart();
      }, 300);
      
      return () => clearInterval(interval);
    }
  }, [showHearts]);

  const createHeart = () => {
    if (!showHearts) return;
    
    const heart = document.createElement('div');
    const size = Math.random() * 30 + 15;
    const xPos = Math.random() * window.innerWidth;
    const rotation = Math.random() * 30 - 15;
    const duration = Math.random() * 3 + 3;
    const delay = Math.random();
    
    heart.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>';
    heart.className = 'fixed z-50 pointer-events-none text-gold-light';
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = `${xPos}px`;
    heart.style.top = '-50px';
    heart.style.transform = `rotate(${rotation}deg)`;
    heart.style.animationDelay = `${delay}s`;
    heart.style.animation = `float-heart ${duration}s linear forwards`;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
      document.body.removeChild(heart);
    }, (duration + delay) * 1000);
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guestName.trim()) {
      localStorage.setItem('guestName', guestName.trim());
      setNameSubmitted(true);
    }
  };

  const handleProceedToInvitation = () => {
    setShowHearts(true);
    setTimeout(() => {
      navigate('/invitation');
    }, 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GaneshaHeader />
      
      <div className="pt-20 pb-10 px-4 relative text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-float">
            <div className="inline-block p-2 rounded-full bg-gold-gradient">
              <div className="bg-maroon p-3 rounded-full">
                <Heart size={32} className="text-gold-light" />
              </div>
            </div>
          </div>
          
          <p className="text-gold-light/90 font-opensans tracking-widest animate-fade-in mb-4 text-sm md:text-base">
            YOU ARE CORDIALLY INVITED TO THE WEDDING OF
          </p>
          
          <h1 className="font-cormorant text-4xl md:text-6xl lg:text-7xl gold-text font-bold mb-6 animate-scale-up">
            {orderedNames.firstName} <span className="inline-block mx-2">&</span> {orderedNames.secondName}
          </h1>
          
          <p className="text-cream text-lg md:text-xl italic font-cormorant animate-fade-in mb-8">
            "{COUPLE_TAGLINE}"
          </p>
          
          <div className="flex justify-center mb-8">
            <CoupleIllustration className="w-48 h-48 md:w-64 md:h-64" />
          </div>
          
          <div className="animate-fade-in flex justify-center mb-10">
            <div className="bg-maroon/50 px-6 py-3 rounded-lg gold-border inline-block">
              <Calendar className="inline-block text-gold-light mr-2 mb-1" size={20} />
              <span className="font-cormorant text-lg md:text-xl gold-text">
                {WEDDING_DATE}
              </span>
            </div>
          </div>
          
          {!nameSubmitted ? (
            <div className="max-w-md mx-auto animate-fade-in">
              <div className="bg-maroon/60 p-6 rounded-2xl gold-border">
                <h3 className="font-cormorant text-xl md:text-2xl gold-text mb-4">
                  Please tell us your name
                </h3>
                <form onSubmit={handleNameSubmit} className="space-y-4">
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Enter your name..."
                    className="w-full px-4 py-3 rounded-lg bg-cream/90 text-maroon font-medium placeholder-maroon/60 focus:outline-none focus:ring-2 focus:ring-gold-light"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gold-gradient text-maroon font-bold rounded-lg hover:shadow-gold transition-all duration-300 transform hover:scale-105"
                  >
                    Continue
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto animate-fade-in">
              <div className="bg-maroon/60 p-6 rounded-2xl gold-border">
                <h3 className="font-cormorant text-xl md:text-2xl gold-text mb-4">
                  Welcome, {guestName}!
                </h3>
                <p className="text-cream/90 mb-6 font-cormorant">
                  We are delighted to have you join our special celebration
                </p>
                <button
                  onClick={handleProceedToInvitation}
                  className={cn(
                    "w-full px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105",
                    "bg-gold-gradient text-maroon hover:shadow-gold",
                    "flex items-center justify-center"
                  )}
                >
                  <span>View Invitation</span>
                  <Sparkles className="ml-2" size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
