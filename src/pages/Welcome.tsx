
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Welcome = () => {
  const navigate = useNavigate();
  const [isEntering, setIsEntering] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  
  // Set the generic guest name instead of a specific name
  const guestName = "Guest Name";

  useEffect(() => {
    // Store the generic guest name
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
    // Set the loading text as requested by the user
    setLoadingText(`${guestName}, Wait we are opening invitation...`);
    
    setTimeout(() => {
      navigate('/invitation');
    }, 1200);
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
      
      {/* Decorative moving elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-6 h-6 opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 5}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            <Heart className="text-gold-light" fill="#FFD700" />
          </div>
        ))}
      </div>
      
      {/* Decorative elements for wedding theme */}
      <div className="absolute top-10 left-10 w-20 h-20 opacity-30 hidden md:block">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50,20 C60,35 80,35 90,25 C80,45 90,65 70,70 C50,75 30,65 20,45 C10,25 30,5 50,20 Z" fill="url(#gold-gradient)" />
          <defs>
            <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#B8860B" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <div className="absolute bottom-10 right-10 w-24 h-24 opacity-30 hidden md:block">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50,20 C60,35 80,35 90,25 C80,45 90,65 70,70 C50,75 30,65 20,45 C10,25 30,5 50,20 Z" fill="url(#gold-gradient)" />
        </svg>
      </div>
      
      {/* Traditional wedding patterns */}
      <div className="absolute top-0 left-0 w-full h-12 opacity-20 wedding-pattern-top"></div>
      <div className="absolute bottom-0 left-0 w-full h-12 opacity-20 wedding-pattern-bottom"></div>
      
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
                width="128"
                height="128"
                loading="eager"
                decoding="async"
                fetchPriority="high"
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
          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-12 h-12">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gold-gradient transform origin-left"></div>
            <div className="absolute top-0 left-0 h-full w-0.5 bg-gold-gradient transform origin-top"></div>
          </div>
          
          <div className="absolute bottom-0 right-0 w-12 h-12">
            <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gold-gradient transform origin-right"></div>
            <div className="absolute bottom-0 right-0 h-full w-0.5 bg-gold-gradient transform origin-bottom"></div>
          </div>
          
          {/* Add decorative rangoli pattern */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-full h-12 opacity-15 pointer-events-none">
            <svg viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100,5 C120,20 160,20 190,5 M100,5 C80,20 40,20 10,5 M100,10 C115,25 145,25 180,15 M100,10 C85,25 55,25 20,15" stroke="url(#gold-gradient)" strokeWidth="0.8" />
            </svg>
          </div>
          
          {/* Main welcome or loading state */}
          {isEntering ? (
            <div className="flex flex-col items-center justify-center min-h-[16rem] transition-all duration-500">
              <div className="mb-6 relative">
                <div className="w-16 h-16 rounded-full border-4 border-gold-light border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Heart className="text-gold-light animate-pulse" size={20} fill="#FFD700" />
                </div>
              </div>
              <p className="gold-text text-xl font-cormorant animate-pulse">
                {loadingText}
              </p>
            </div>
          ) : (
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
                <Heart className="text-gold-light animate-heart-beat" size={40} fill="rgba(255,215,0,0.3)" />
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
          )}
        </div>
      </div>
      
      {/* Wedding themed decorative elements */}
      <div className="absolute top-0 left-0 w-full">
        <svg width="100%" height="80" viewBox="0 0 1000 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 Q250,80 500,40 Q750,0 1000,40 L1000,0 L0,0 Z" fill="url(#gold-gradient-header)" opacity="0.15" />
          <defs>
            <linearGradient id="gold-gradient-header" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#B8860B" />
              <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Footer decoration */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gold-gradient opacity-50"></div>
      
      <style>{`
        @keyframes particle-fade {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .wedding-pattern-top {
          background-image: url("data:image/svg+xml,%3Csvg width='40' height='12' viewBox='0 0 40 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0 L40,0 L40,2 C30,12 10,12 0,2 L0,0 Z' fill='%23FFD700' fill-opacity='0.2'/%3E%3C/svg%3E");
          background-repeat: repeat-x;
        }
        
        .wedding-pattern-bottom {
          background-image: url("data:image/svg+xml,%3Csvg width='40' height='12' viewBox='0 0 40 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,12 L40,12 L40,10 C30,0 10,0 0,10 L0,12 Z' fill='%23FFD700' fill-opacity='0.2'/%3E%3C/svg%3E");
          background-repeat: repeat-x;
        }
      `}</style>
    </div>
  );
};

export default Welcome;
