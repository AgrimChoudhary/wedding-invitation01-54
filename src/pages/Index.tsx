
import React, { useState, useEffect } from 'react';
import { Calendar, Flower, Heart, Music, Paintbrush, Sparkles, Star } from 'lucide-react';
import Diya from '@/components/Diya';
import EventCard from '@/components/EventCard';
import PhotoCarousel from '@/components/PhotoCarousel';
import Dashboard from '@/components/Dashboard';
import { initCursorGlitter, initTouchGlitter } from '@/utils/animationUtils';
import { useIsMobile } from '@/hooks/use-mobile';
import PhoneIcon from '@/components/PhoneIcon';

const Index = () => {
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const cleanup = isMobile ? initTouchGlitter() : initCursorGlitter();
    return cleanup;
  }, [isMobile]);

  const events = [
    {
      title: "Mehndi Ceremony",
      date: "19 March 2025",
      time: "10:00 AM - 2:00 PM",
      description: "A beautiful celebration where the bride's hands and feet are adorned with intricate henna designs, symbolizing beauty and joy.",
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
      description: "An evening filled with music, dance, and celebration where both families come together to rejoice in the upcoming union.",
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
      description: "A golden blessing of purity where turmeric paste is applied to the bride and groom, bringing a natural glow before the wedding.",
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
      description: "The sacred union of Priya and Vijay, celebrating love, commitment, and the beginning of their journey together.",
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
  
  // Position Diyas along the sides
  const diyaPositions = [
    { position: 'left', className: 'top-20', delay: 0, blessing: "आनन्दं (Joy)" },
    { position: 'right', className: 'top-20', delay: 0.5, blessing: "प्रेम (Love)" },
    { position: 'left', className: 'top-1/3', delay: 1, blessing: "सौभाग्य (Fortune)" },
    { position: 'right', className: 'top-1/3', delay: 1.5, blessing: "समृद्धि (Prosperity)" },
    { position: 'left', className: 'top-2/3', delay: 2, blessing: "स्वास्थ्य (Health)" },
    { position: 'right', className: 'top-2/3', delay: 2.5, blessing: "शांति (Peace)" },
    { position: 'left', className: 'bottom-20', delay: 3, blessing: "विश्वास (Faith)" }
  ];
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating Diyas */}
      {diyaPositions.map((diya, index) => (
        <Diya 
          key={index} 
          position={diya.position as 'left' | 'right'} 
          className={diya.className}
          delay={diya.delay}
          blessing={diya.blessing}
        />
      ))}
      
      {/* Header Section */}
      <header className="pt-20 md:pt-24 pb-10 px-4 relative text-center">
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
          
          <div className="mt-8 animate-fade-in flex justify-center">
            <div className="bg-maroon/50 px-6 py-3 rounded-lg gold-border inline-block">
              <Calendar className="inline-block text-gold-light mr-2 mb-1" size={20} />
              <span className="font-cormorant text-xl md:text-2xl gold-text">
                21 March 2025
              </span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Parents Section */}
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
      
      {/* Event Timeline */}
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
      
      {/* Photo Carousel */}
      <section className="py-10 px-2 md:px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center font-cormorant text-3xl md:text-4xl gold-text font-bold mb-8">
            Our Journey
          </h2>
          
          <PhotoCarousel photos={photos} />
        </div>
      </section>
      
      {/* Dashboard Button */}
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
      
      {/* Footer */}
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
            <p className="flex justify-center gap-4">
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
