import React, { useState, useEffect } from 'react';
import { Calendar, Flower, Heart, Music, Paintbrush, Sparkles, Star, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import Diya from '@/components/Diya';
import EventCard from '@/components/EventCard';
import PhotoCarousel from '@/components/PhotoCarousel';
import Dashboard from '@/components/Dashboard';
import Countdown from '@/components/Countdown';
import GaneshaHeader from '@/components/GaneshaHeader';
import CoupleIllustration from '@/components/CoupleIllustration';
import { initCursorGlitter, initTouchGlitter } from '@/utils/animationUtils';
import { useIsMobile } from '@/hooks/use-mobile';
import PhoneIcon from '@/components/PhoneIcon';
import { useNavigate } from 'react-router-dom';
import InteractiveEffects from '@/components/InteractiveEffects';

const Index = () => {
  const navigate = useNavigate();
  const [dashboardOpen, setDashboardOpen] = useState(false);
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
    { src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07", alt: "Couple photo 1" },
    { src: "https://images.unsplash.com/photo-1500673922987-e212871fec22", alt: "Couple photo 2" },
    { src: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb", alt: "Couple photo 3" },
    { src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07", alt: "Couple photo 4" },
    { src: "https://images.unsplash.com/photo-1500673922987-e212871fec22", alt: "Couple photo 5" },
    { src: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb", alt: "Couple photo 6" }
  ];
  
  const diyaPositions = [
    { position: 'left', className: 'top-24', delay: 0 },
    { position: 'right', className: 'top-24', delay: 0.5 },
    { position: 'left', className: 'top-1/3', delay: 1 },
    { position: 'right', className: 'top-1/3', delay: 1.5 },
    { position: 'left', className: 'top-2/3', delay: 2 },
    { position: 'right', className: 'top-2/3', delay: 2.5 },
    { position: 'left', className: 'bottom-20', delay: 3 }
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
      
      {diyaPositions.map((diya, index) => (
        <Diya 
          key={index} 
          position={diya.position as 'left' | 'right'} 
          className={diya.className}
          delay={diya.delay}
        />
      ))}
      
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
            Priya <span className="inline-block mx-1 md:mx-3 animate-float">&</span> Vijay
          </h1>
          
          <p className="text-cream text-xl md:text-2xl italic font-cormorant animate-fade-in">
            "A journey written in the stars…"
          </p>
          
          <div className="mt-8 flex justify-center">
            <CoupleIllustration className="w-64 h-64 md:w-80 md:h-80" interactive={true} />
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
          
          <div className="mt-8">
            <InteractiveEffects />
          </div>
        </div>
      </header>
      
      <section className="py-10 px-4">
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
      
      <section className="py-10 px-4" id="events">
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
      
      <section className="py-10 px-2 md:px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center font-cormorant text-3xl md:text-4xl gold-text font-bold mb-8">
            Our Journey
          </h2>
          
          <PhotoCarousel photos={photos} />
        </div>
      </section>
      
      <section className="py-10 px-4 relative overflow-hidden">
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
          `}</style>
        </div>
      </section>
      
      <section className="py-10 px-4 text-center">
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
      
      <footer className="py-10 px-4 relative mt-10 border-t border-gold-light/30">
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

