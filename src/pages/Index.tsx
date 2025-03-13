import React, { useState, useEffect } from 'react';
import { Calendar, Flower, Heart, Music, Paintbrush, Sparkles, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import EventCard from '@/components/EventCard';
import PhotoCarousel from '@/components/PhotoCarousel';
import Dashboard from '@/components/Dashboard';
import Countdown from '@/components/Countdown';
import GaneshaHeader from '@/components/GaneshaHeader';
import CoupleIllustration from '@/components/CoupleIllustration';
import { initCursorGlitter, initTouchGlitter, createMandalaEffect } from '@/utils/animationUtils';
import { useIsMobile } from '@/hooks/use-mobile';
import PhoneIcon from '@/components/PhoneIcon';
import { useNavigate } from 'react-router-dom';
import Diya from '@/components/Diya';

const Index = () => {
  const navigate = useNavigate();
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [isMandalaVisible, setIsMandalaVisible] = useState(false);
  const isMobile = useIsMobile();
  const [guestName, setGuestName] = useState('');
  
  useEffect(() => {
    const savedName = localStorage.getItem('guestName');
    if (savedName) {
      setGuestName(savedName);
    } else {
      navigate('/');
    }
    
    const cleanup = isMobile ? initTouchGlitter() : initCursorGlitter();
    return cleanup;
  }, [isMobile, navigate]);

  useEffect(() => {
    if (showHearts) {
      const interval = setInterval(() => {
        createHeart();
      }, 300);
      
      return () => clearInterval(interval);
    }
  }, [showHearts]);

  useEffect(() => {
    if (isMandalaVisible) {
      createMandalaEffect();
      
      const interval = setInterval(() => {
        createMandalaEffect();
      }, 10000);
      
      return () => clearInterval(interval);
    }
  }, [isMandalaVisible]);

  const createHeart = () => {
    if (!showHearts) return;
    
    const heart = document.createElement('div');
    const size = Math.random() * 30 + 15;
    const xPos = Math.random() * window.innerWidth;
    const rotation = Math.random() * 30 - 15;
    const duration = Math.random() * 3 + 3;
    const delay = Math.random();
    
    heart.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>';
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

  const weddingDate = new Date("2025-03-21T17:00:00");

  const events = [
    {
      title: "Mehndi Ceremony",
      date: "19 March 2025",
      time: "10:00 AM - 2:00 PM",
      venue: "Garden Court, The Royal Celebration Hall, Wedding City",
      icon: <Paintbrush size={24} className="text-maroon" />,
      images: [
        "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
        "https://images.unsplash.com/photo-1500673922987-e212871fec22",
        "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"
      ]
    },
    {
      title: "Sangeet Night",
      date: "19 March 2025",
      time: "7:00 PM - 11:00 PM",
      venue: "Grand Pavilion, The Royal Celebration Hall, Wedding City",
      icon: <Music size={24} className="text-maroon" />,
      images: [
        "https://images.unsplash.com/photo-1500673922987-e212871fec22",
        "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
        "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07"
      ]
    },
    {
      title: "Haldi Ceremony",
      date: "20 March 2025",
      time: "11:00 AM - 2:00 PM",
      venue: "Courtyard, The Royal Celebration Hall, Wedding City",
      icon: <Sparkles size={24} className="text-maroon" />,
      images: [
        "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
        "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
        "https://images.unsplash.com/photo-1500673922987-e212871fec22"
      ]
    },
    {
      title: "Wedding Ceremony",
      date: "21 March 2025",
      time: "5:00 PM - 8:00 PM",
      venue: "Main Hall, The Royal Celebration Hall, Wedding City",
      icon: <Heart size={24} className="text-maroon" />,
      images: [
        "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
        "https://images.unsplash.com/photo-1500673922987-e212871fec22",
        "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"
      ]
    }
  ];
  
  const photos = [
    { src: "/lovable-uploads/5d906655-818b-462e-887e-0a392db20d48.png", alt: "Couple photo 1" },
    { src: "/lovable-uploads/e1d52835-2f4a-42a2-8647-66379e0cc295.png", alt: "Couple photo 2" },
    { src: "/lovable-uploads/6d392f5b-28f1-4710-9eda-8e7c1a9bfe8e.png", alt: "Couple photo 3" },
    { src: "/lovable-uploads/fd7253c5-605a-4dee-ac79-cd585063976d.png", alt: "Couple photo 4" },
    { src: "/lovable-uploads/88954d14-07a5-494c-a5ac-075e055e0223.png", alt: "Bride and Groom Illustration" }
  ];
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {guestName && (
        <div className="bg-gold-gradient text-maroon py-2 px-4 text-center animate-fade-in">
          <p className="font-cormorant text-lg">
            Welcome, <span className="font-bold">{guestName}</span>! We're delighted you could join us.
          </p>
        </div>
      )}
      
      <Diya className="top-20" position="left" />
      <Diya className="bottom-20" position="right" delay={0.5} />
      
      <div className="pt-6 px-4">
        <GaneshaHeader />
      </div>
      
      <header className="pt-10 md:pt-12 pb-10 px-4 relative text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 animate-float">
            <div className="inline-block p-1.5 rounded-full bg-gold-gradient">
              <div className="bg-maroon p-2 rounded-full">
                <Heart size={28} className="text-gold-light" />
              </div>
            </div>
          </div>
          
          <p className="text-gold-light/90 font-opensans tracking-widest animate-fade-in mb-3">
            WE ARE GETTING MARRIED
          </p>
          
          <h1 className="font-cormorant text-5xl md:text-7xl lg:text-8xl gold-text font-bold mb-4 animate-scale-up">
            Priya <span className="inline-block mx-1 md:mx-3">&</span> Vijay
          </h1>
          
          <p className="text-cream text-xl md:text-2xl italic font-cormorant animate-fade-in">
            "A journey written in the stars…"
          </p>
          
          <div className="mt-8 flex justify-center">
            <CoupleIllustration className="w-64 h-64 md:w-80 md:h-80" />
          </div>
          
          <div className="mt-8 animate-fade-in flex justify-center">
            <div className="bg-maroon/50 px-6 py-3 rounded-lg gold-border inline-block">
              <Calendar className="inline-block text-gold-light mr-2 mb-1" size={20} />
              <span className="font-cormorant text-xl md:text-2xl gold-text">
                21 March 2025
              </span>
            </div>
          </div>
          
          <div className="mt-10">
            <Countdown targetDate={weddingDate} className="animate-fade-in" />
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button 
              className={cn(
                "relative px-6 py-3 rounded-full transition-all duration-300",
                "bg-gold-gradient hover:shadow-gold text-maroon font-bold",
                "overflow-hidden group",
                showHearts && "bg-opacity-100"
              )}
              onClick={() => setShowHearts(!showHearts)}
            >
              <span className="relative z-10 flex items-center">
                {showHearts ? "Stop Hearts" : "Shower Love"} 
                <Heart className={cn(
                  "ml-2 transition-transform duration-300",
                  showHearts ? "animate-heart-beat" : "group-hover:scale-125"
                )} size={18} />
              </span>
              <span className="absolute inset-0 bg-gold-light/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></span>
            </button>
            
            <button 
              className={cn(
                "relative px-6 py-3 rounded-full transition-all duration-300",
                "border-2 border-gold-light text-gold-light font-bold",
                "overflow-hidden hover:bg-gold-light/10 group",
                isMandalaVisible && "bg-gold-light/10"
              )}
              onClick={() => setIsMandalaVisible(!isMandalaVisible)}
            >
              <span className="relative z-10 flex items-center">
                {isMandalaVisible ? "Hide Magic" : "Show Magic"} 
                <Sparkles className={cn(
                  "ml-2 transition-transform duration-300",
                  "group-hover:rotate-12"
                )} size={18} />
              </span>
              <span className="absolute inset-0 bg-gold-light/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </header>
      
      {isMandalaVisible && (
        <div 
          id="mandala-container"
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        ></div>
      )}
      
      <section className="py-10 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <div className="bg-maroon/40 rounded-xl p-6 gold-border animate-fade-in-left">
              <div className="flex justify-center mb-4">
                <Flower className="text-gold-light" size={28} />
              </div>
              <h3 className="text-center font-cormorant text-xl gold-text mb-2">Bride's Parents</h3>
              <p className="text-center text-cream text-lg font-cormorant">Ramesh & Rameshi</p>
            </div>
            
            <div className="bg-maroon/40 rounded-xl p-6 gold-border animate-fade-in-right">
              <div className="flex justify-center mb-4">
                <Star className="text-gold-light" size={28} />
              </div>
              <h3 className="text-center font-cormorant text-xl gold-text mb-2">Groom's Parents</h3>
              <p className="text-center text-cream text-lg font-cormorant">Harkesh & Harkeshi</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-10 px-4 relative z-10" id="events">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center font-cormorant text-3xl md:text-4xl gold-text font-bold mb-10">
            Celebration Events
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {events.map((event, index) => (
              <div 
                key={index}
                className={`transform transition-all duration-500 ${
                  index % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <EventCard {...event} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-10 px-2 md:px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center font-cormorant text-3xl md:text-4xl gold-text font-bold mb-8">
            Our Journey
          </h2>
          
          <PhotoCarousel photos={photos} />
        </div>
      </section>
      
      <section className="py-10 px-4 relative overflow-hidden z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-cormorant text-3xl md:text-4xl gold-text font-bold mb-8">
            Join Our Celebration
          </h2>
          
          <div className="relative h-40 md:h-60">
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex items-end justify-center gap-4 md:gap-10">
              <div className="w-10 h-20 md:w-16 md:h-32 bg-gold-gradient rounded-t-full animate-dance-slow">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-maroon rounded-full mx-auto -mt-4 relative">
                  <div className="absolute inset-2 rounded-full bg-gold-light/30"></div>
                </div>
              </div>
              
              <div className="w-10 h-24 md:w-16 md:h-40 bg-gold-gradient rounded-t-full animate-dance-medium">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-maroon rounded-full mx-auto -mt-4 relative">
                  <div className="absolute inset-2 rounded-full bg-gold-light/30"></div>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-cream/80 mt-8 font-cormorant text-xl italic">
            "Dance with us as two hearts become one"
          </p>
          
          <style>{`
            @keyframes dance-slow {
              0%, 100% { transform: rotate(-5deg); }
              50% { transform: rotate(5deg); }
            }
            @keyframes dance-medium {
              0%, 100% { transform: rotate(5deg); }
              50% { transform: rotate(-5deg); }
            }
            .animate-dance-slow {
              animation: dance-slow 2s ease-in-out infinite;
              transform-origin: bottom center;
            }
            .animate-dance-medium {
              animation: dance-medium 1.8s ease-in-out infinite;
              transform-origin: bottom center;
            }
            @keyframes float-heart {
              0% { 
                transform: translateY(0) rotate(var(--rotation, 0deg)) scale(0); 
                opacity: 0; 
              }
              10% { 
                opacity: 0.8; 
                transform: translateY(10px) rotate(var(--rotation, 0deg)) scale(1); 
              }
              100% { 
                transform: translateY(100vh) rotate(var(--rotation, 0deg)) scale(0.5); 
                opacity: 0; 
              }
            }
          `}</style>
        </div>
      </section>
      
      <section className="py-10 px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => setDashboardOpen(true)}
            className="group relative overflow-hidden inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gold-gradient text-maroon font-bold text-lg transition-transform duration-300 hover:scale-105 animate-pulse-glow"
          >
            <span className="relative z-10 font-cormorant font-bold">Enter Event Dashboard</span>
            <span className="absolute inset-0 bg-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          </button>
          
          <Dashboard open={dashboardOpen} onClose={() => setDashboardOpen(false)} />
        </div>
      </section>
      
      <footer className="py-10 px-4 relative mt-10 border-t border-gold-light/30 z-10">
        <div className="absolute top-0 left-0 w-full h-px bg-gold-gradient"></div>
        
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <Heart className="text-gold-light animate-heart-beat" size={28} />
          </div>
          
          <p className="font-cormorant text-xl gold-text italic mb-8">
            "Your presence is the greatest blessing."
          </p>
          
          <div className="text-cream/80">
            <p className="mb-2">The Royal Celebration Hall, Wedding City</p>
            <p className="flex flex-wrap justify-center gap-4">
              <a href="tel:+919876543210" className="text-gold-light hover:underline flex items-center">
                <PhoneIcon className="mr-1" />
                Priya's Family
              </a>
              <a href="tel:+919876543211" className="text-gold-light hover:underline flex items-center">
                <PhoneIcon className="mr-1" />
                Vijay's Family
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
