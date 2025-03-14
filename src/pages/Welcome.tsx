import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Welcome = () => {
  const navigate = useNavigate();
  const [isEntering, setIsEntering] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Set the guest name directly instead of asking for input
  const guestName = "Agrim";

  useEffect(() => {
    // Store the predefined guest name
    localStorage.setItem('guestName', guestName);
    
    // Animation sequence
    setTimeout(() => setIsLoaded(true), 300);
    setTimeout(() => setShowParticles(true), 1000);
    
    // Create particle effect
    if (showParticles) {
      const interval = setInterval(() => {
        createParticle();
      }, 300);
      
      return () => clearInterval(interval);
    }
  }, [showParticles, guestName]);

  const handleEnterClick = () => {
    setIsEntering(true);
    setTimeout(() => {
      navigate('/invitation');
    }, 800);
  };

  // Create decorative particle effect
  const createParticle = () => {
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    const particle = document.createElement('div');
    const size = Math.random() * 15 + 5;
    const x = Math.random() * container.offsetWidth;
    const y = Math.random() * container.offsetHeight;
    
    particle.className = 'absolute rounded-full';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.background = `radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(255,215,0,0) 70%)`;
    particle.style.animation = 'particle-fade 3s ease-out forwards';
    
    container.appendChild(particle);
    
    setTimeout(() => {
      if (container.contains(particle)) {
        container.removeChild(particle);
      }
    }, 3000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-maroon">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627,10.361Q51.92,7.648 48.064,7.648Q44.208,7.648 41.445,10.361Q38.688,13.051 38.688,16.861Q38.688,20.671 41.445,23.353Q44.208,26.04 48.064,26.04Q51.92,26.04 54.627,23.353Q57.34,20.671 57.34,16.861Q57.34,13.051 54.627,10.361M54.627,10.361Z' fill='%23ffd700' fill-opacity='0.2'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>
      
      {/* Particles container */}
      <div id="particles-container" className="absolute inset-0 pointer-events-none z-10"></div>
      
      {/* Main content */}
      <div className={cn(
        "relative z-20 w-full max-w-md px-6 transition-all duration-1000",
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32 animate-float">
              <div className="absolute inset-0 bg-gold-gradient rounded-full opacity-20 animate-pulse"></div>
              <img 
                src="/lovable-uploads/762354ab-cff9-4c6a-9800-94eeefc3c43c.png" 
                alt="Lord Ganesha" 
                className="w-full h-full object-contain drop-shadow-gold"
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
        
        <div className="bg-maroon/50 p-6 rounded-xl gold-border relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-12 h-12">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gold-gradient transform origin-left"></div>
            <div className="absolute top-0 left-0 h-full w-0.5 bg-gold-gradient transform origin-top"></div>
          </div>
          
          <div className="absolute bottom-0 right-0 w-12 h-12">
            <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gold-gradient transform origin-right"></div>
            <div className="absolute bottom-0 right-0 h-full w-0.5 bg-gold-gradient transform origin-bottom"></div>
          </div>
          
          {/* Personalized welcome - always show this now */}
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
              className="group bg-gold-gradient text-maroon px-8 py-3 rounded-full font-medium transition-all hover:shadow-gold hover:scale-105 flex items-center justify-center mx-auto"
            >
              Enter Invitation
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer decoration */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gold-gradient opacity-50"></div>
      
      <style>{`
        @keyframes particle-fade {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Welcome;
