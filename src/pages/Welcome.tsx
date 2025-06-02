
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Heart, ArrowRight, Crown, Trophy, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import AudioPlayer from '@/components/AudioPlayer';
import TypingText from '@/components/TypingText';

const Welcome = () => {
  const navigate = useNavigate();
  const [isEntering, setIsEntering] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  
  // Set the guest name as requested
  const guestName = "RCB Haters";

  useEffect(() => {
    // Store the guest name
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
    setLoadingText(`${guestName}, Wait! We're opening the royal invitation... 🏆`);
    
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
    
    const icons = ['🏆', '👑', '🔥', '⚡', '🎯'];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    
    particle.innerHTML = randomIcon;
    particle.className = 'absolute text-yellow-400 pointer-events-none';
    particle.style.fontSize = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.animation = 'particle-fade 3s ease-out forwards';
    
    container.appendChild(particle);
    
    setTimeout(() => {
      if (container.contains(particle)) {
        container.removeChild(particle);
      }
    }, 3000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-900 via-red-800 to-black">
      {/* Enhanced background patterns */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627,10.361Q51.92,7.648 48.064,7.648Q44.208,7.648 41.445,10.361Q38.688,13.051 38.688,16.861Q38.688,20.671 41.445,23.353Q44.208,26.04 48.064,26.04Q51.92,26.04 54.627,23.353Q57.34,20.671 57.34,16.861Q57.34,13.051 54.627,10.361M54.627,10.361Z' fill='%23ffd700' fill-opacity='0.2'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>
      
      {/* RCB themed decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-8 h-8 opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 5}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            {i % 4 === 0 ? (
              <Crown className="text-yellow-400" fill="currentColor" />
            ) : i % 4 === 1 ? (
              <Trophy className="text-yellow-400" fill="currentColor" />
            ) : i % 4 === 2 ? (
              <Zap className="text-red-400" fill="currentColor" />
            ) : (
              <Heart className="text-red-400" fill="currentColor" />
            )}
          </div>
        ))}
      </div>
      
      {/* Enhanced decorative elements */}
      <div className="absolute top-10 left-10 w-24 h-24 opacity-40 animate-pulse">
        <div className="w-full h-full bg-gradient-to-br from-red-500 to-yellow-400 rounded-full flex items-center justify-center shadow-2xl">
          <Crown className="text-white" size={40} />
        </div>
      </div>
      
      <div className="absolute bottom-10 right-10 w-28 h-28 opacity-40 animate-bounce">
        <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl">
          <Trophy className="text-white" size={44} />
        </div>
      </div>
      
      {/* Particles container */}
      <div id="particles-container" className="absolute inset-0 pointer-events-none z-10"></div>
      
      {/* Main content */}
      <div className={cn(
        "relative z-20 w-full max-w-lg px-6 transition-all duration-1000",
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative w-36 h-36 animate-float">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full opacity-30 animate-pulse"></div>
              <img 
                src="/lovable-uploads/762354ab-cff9-4c6a-9800-94eeefc3c43c.png" 
                alt="Lord Ganesha" 
                className="w-full h-full object-contain drop-shadow-2xl"
                width="144"
                height="144"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>
          
          <h1 className="font-cormorant text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-300 to-red-400 font-bold mb-4 animate-scale-up">
            RCB <span className="inline-block mx-1 md:mx-3 text-yellow-400">&</span> IPL Trophy
          </h1>
          
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-100 font-cormorant text-lg md:text-xl italic mb-6">
            <p className="mb-1">🏆 Historic Victory Celebration 🏆</p>
            <p className="text-yellow-400">3rd June 2025 - Ee Sala Cup Namde!</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-800/60 to-black/60 backdrop-blur-sm p-6 rounded-xl border-2 border-yellow-400/40 relative overflow-hidden shadow-2xl">
          {/* Enhanced decorative corner elements */}
          <div className="absolute top-0 left-0 w-16 h-16">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-red-400"></div>
            <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-yellow-400 to-red-400"></div>
            <Crown className="absolute top-1 left-1 text-yellow-400" size={12} />
          </div>
          
          <div className="absolute bottom-0 right-0 w-16 h-16">
            <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-yellow-400 to-red-400"></div>
            <div className="absolute bottom-0 right-0 h-full w-1 bg-gradient-to-t from-yellow-400 to-red-400"></div>
            <Trophy className="absolute bottom-1 right-1 text-yellow-400" size={12} />
          </div>
          
          {/* Main welcome or loading state */}
          {isEntering ? (
            <div className="flex flex-col items-center justify-center min-h-[16rem] transition-all duration-500">
              <div className="mb-6 relative">
                <div className="w-16 h-16 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Crown className="text-yellow-400 animate-pulse" size={24} fill="currentColor" />
                </div>
              </div>
              <p className="text-yellow-400 text-xl font-cormorant animate-pulse text-center">
                <TypingText text={loadingText} typingSpeed={50} />
              </p>
            </div>
          ) : (
            <div className={cn(
              "text-center transition-all duration-500",
              isEntering ? "opacity-0 transform -translate-y-10" : "opacity-100"
            )}>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Crown className="text-yellow-400" size={24} />
                <p className="font-cormorant text-2xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-100">
                  Namaste, <TypingText text={guestName} className="font-bold text-yellow-400" />!
                </p>
                <Crown className="text-yellow-400" size={24} />
              </div>
              
              <p className="text-yellow-100 mb-6 font-opensans leading-relaxed">
                You're cordially invited to witness the <span className="text-yellow-400 font-bold">HISTORIC MOMENT</span> when RCB finally lifts their first IPL trophy! 🏆
              </p>
              
              <div className="flex justify-center mb-6">
                <div className="flex items-center gap-2">
                  <Trophy className="text-yellow-400 animate-bounce" size={32} fill="rgba(255,215,0,0.3)" />
                  <Zap className="text-red-400 animate-pulse" size={28} fill="rgba(255,0,0,0.3)" />
                  <Crown className="text-yellow-400 animate-bounce" size={32} fill="rgba(255,215,0,0.3)" />
                </div>
              </div>
              
              <p className="text-yellow-100/90 italic mb-8 font-cormorant text-lg bg-gradient-to-r from-red-700/50 to-yellow-600/50 p-3 rounded-lg">
                "18 years of wait, 18 years of faith... This is OUR moment! 🔥"
              </p>
              
              <button
                onClick={handleEnterClick}
                className="group bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-500 hover:to-yellow-400 text-white px-8 py-3 rounded-full font-bold transition-all hover:shadow-2xl hover:scale-105 flex items-center justify-center mx-auto transform"
              >
                <Crown className="mr-2" size={18} />
                Enter the Royal Invitation
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Enhanced header decoration */}
      <div className="absolute top-0 left-0 w-full">
        <svg width="100%" height="100" viewBox="0 0 1000 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="rcb-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
          </defs>
          <path d="M0,0 Q250,100 500,50 Q750,0 1000,50 L1000,0 L0,0 Z" fill="url(#rcb-gradient)" opacity="0.3" />
        </svg>
      </div>
      
      {/* Footer decoration */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 opacity-70"></div>
      
      <style>{`
        @keyframes particle-fade {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
          100% { transform: scale(1.5) rotate(360deg); opacity: 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
};

export default Welcome;
