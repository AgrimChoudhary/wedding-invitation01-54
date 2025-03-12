
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Welcome = () => {
  const navigate = useNavigate();
  const [guestName, setGuestName] = useState('');
  const [isEntering, setIsEntering] = useState(false);
  const [nameEntered, setNameEntered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if guest name exists in localStorage
    const savedName = localStorage.getItem('guestName');
    if (savedName) {
      setGuestName(savedName);
      setNameEntered(true);
    }
    
    // Animation sequence
    setTimeout(() => setIsLoaded(true), 300);
    
    // Subtle parallax effect on mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX / width - 0.5) * 20; // Move by 20px max
      const y = (e.clientY / height - 0.5) * 20; // Move by 20px max
      
      setBackgroundPosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuestName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guestName.trim()) {
      localStorage.setItem('guestName', guestName);
      setNameEntered(true);
    }
  };

  const handleEnterClick = () => {
    setIsEntering(true);
    setTimeout(() => {
      navigate('/invitation');
    }, 800);
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-maroon"
    >
      {/* Background patterns with parallax effect */}
      <div 
        className="absolute inset-0 opacity-10 transition-transform duration-200 ease-out"
        style={{ 
          transform: `translate(${backgroundPosition.x}px, ${backgroundPosition.y}px)`,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627,10.361Q51.92,7.648 48.064,7.648Q44.208,7.648 41.445,10.361Q38.688,13.051 38.688,16.861Q38.688,20.671 41.445,23.353Q44.208,26.04 48.064,26.04Q51.92,26.04 54.627,23.353Q57.34,20.671 57.34,16.861Q57.34,13.051 54.627,10.361M54.627,10.361Z' fill='%23ffd700' fill-opacity='0.2'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}
      ></div>
      
      {/* Main content */}
      <div className={cn(
        "relative z-20 w-full max-w-md px-6 transition-all duration-1000",
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative w-28 h-28 md:w-32 md:h-32 transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gold-gradient rounded-full opacity-20 animate-pulse-slow"></div>
              <img 
                src="/lovable-uploads/762354ab-cff9-4c6a-9800-94eeefc3c43c.png" 
                alt="Lord Ganesha" 
                className="w-full h-full object-contain drop-shadow-xl"
              />
            </div>
          </div>
          
          <h1 className="font-cormorant text-4xl md:text-5xl gold-text font-bold mb-4 animate-scale-up">
            Priya <span className="inline-block mx-1 md:mx-3">&</span> Vijay
          </h1>
          
          <div className="gold-text font-cormorant text-lg md:text-xl italic mb-6">
            <p className="mb-1">Welcome to our Wedding Celebration</p>
            <p>21st March 2025</p>
          </div>
        </div>
        
        <div className="bg-maroon/40 p-6 rounded-xl gold-border relative overflow-hidden shadow-gold">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gold-gradient transform origin-left"></div>
            <div className="absolute top-0 left-0 h-full w-0.5 bg-gold-gradient transform origin-top"></div>
          </div>
          
          <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none">
            <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gold-gradient transform origin-right"></div>
            <div className="absolute bottom-0 right-0 h-full w-0.5 bg-gold-gradient transform origin-bottom"></div>
          </div>
          
          {!nameEntered ? (
            // Name input form
            <form onSubmit={handleSubmit} className="text-center">
              <p className="text-cream mb-6 font-opensans">
                Please enter your name to view our wedding invitation
              </p>
              
              <div className="relative mb-6">
                <input
                  type="text"
                  value={guestName}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="w-full bg-maroon/70 text-cream border-b-2 border-gold-light/70 px-4 py-3 rounded-lg focus:outline-none focus:border-gold-light"
                  required
                />
                <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 text-gold-light/70" size={18} />
              </div>
              
              <button
                type="submit"
                className="bg-gold-gradient text-maroon px-8 py-3 rounded-full font-medium transition-all hover:shadow-gold hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold-light/50"
              >
                Continue
              </button>
            </form>
          ) : (
            // Personalized welcome
            <div className={cn(
              "text-center transition-all duration-500",
              isEntering ? "opacity-0 transform -translate-y-10" : "opacity-100"
            )}>
              <p className="font-cormorant text-2xl gold-text mb-2">
                Namaste, <span className="font-bold">{guestName}</span>!
              </p>
              
              <p className="text-cream mb-6 font-opensans">
                We are honored to invite you to witness the divine union of our hearts
              </p>
              
              <div className="flex justify-center mb-6">
                <Heart className="text-gold-light animate-heart-beat" size={40} />
              </div>
              
              <p className="text-cream/80 italic mb-8 font-cormorant text-lg">
                "In the garden of love, two souls have found their blooming season"
              </p>
              
              <button
                onClick={handleEnterClick}
                className="group bg-gold-gradient text-maroon px-8 py-3 rounded-full font-medium transition-all hover:shadow-gold hover:scale-105 flex items-center justify-center mx-auto focus:outline-none focus:ring-2 focus:ring-gold-light/50"
              >
                Enter Invitation
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer decoration */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gold-gradient opacity-50"></div>
    </div>
  );
};

export default Welcome;
