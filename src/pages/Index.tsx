import React, { useState, useEffect } from 'react';
import { Calendar, Flower, Heart, Music, Paintbrush, Sparkles, Star, Info, Sparkle } from 'lucide-react';
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
import FamilyDetailsDialog, { FamilyDetails } from '@/components/FamilyDetailsDialog';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import DashboardComingSoonPopup from '@/components/DashboardComingSoonPopup';

const brideFamily: FamilyDetails = {
  side: "bride",
  title: "Ramesh & Rameshi Family",
  description: "The bride's family is known for their warmth and hospitality. They have been residents of Wedding City for three generations and are well-respected in the community.",
  address: "23 Marigold Lane, Wedding City",
  members: [
    {
      name: "Ramesh Kumar",
      relation: "Father of the Bride",
      description: "A respected businessman who loves gardening and classical music in his free time.",
      phone: "+91 98765 43210",
      email: "ramesh@example.com",
      birthdate: "April 15, 1970",
      location: "Wedding City"
    },
    {
      name: "Rameshi Devi",
      relation: "Mother of the Bride",
      description: "A loving homemaker known for her delicious cooking and kind heart.",
      phone: "+91 98765 43211",
      email: "rameshi@example.com",
      birthdate: "June 22, 1972",
      location: "Wedding City"
    },
    {
      name: "Priya Kumar",
      relation: "The Bride",
      description: "A software engineer who loves to paint and travel. She met Vijay during a company hackathon.",
      phone: "+91 98765 43212",
      email: "priya@example.com",
      birthdate: "May 5, 1995",
      location: "Bangalore"
    },
    {
      name: "Rahul Kumar",
      relation: "Brother of the Bride",
      description: "Currently studying medicine and aspires to be a neurosurgeon.",
      phone: "+91 98765 43213",
      email: "rahul@example.com",
      birthdate: "November 12, 1998",
      location: "Delhi"
    }
  ]
};

const groomFamily: FamilyDetails = {
  side: "groom",
  title: "Harkesh & Harkeshi Family",
  description: "The groom's family has a rich cultural heritage and is known for their contributions to arts and education in the community.",
  address: "45 Jasmine Road, Wedding City",
  members: [
    {
      name: "Harkesh Singh",
      relation: "Father of the Groom",
      description: "A retired professor who now spends his time writing books on history.",
      phone: "+91 98765 43215",
      email: "harkesh@example.com",
      birthdate: "October 7, 1968",
      location: "Wedding City"
    },
    {
      name: "Harkeshi Kaur",
      relation: "Mother of the Groom",
      description: "A talented classical dancer who has taught dance to hundreds of students.",
      phone: "+91 98765 43216",
      email: "harkeshi@example.com",
      birthdate: "January 3, 1970",
      location: "Wedding City"
    },
    {
      name: "Vijay Singh",
      relation: "The Groom",
      description: "A product manager who is passionate about photography and mountain climbing.",
      phone: "+91 98765 43217",
      email: "vijay@example.com",
      birthdate: "July 18, 1993",
      location: "Bangalore"
    },
    {
      name: "Anita Singh",
      relation: "Sister of the Groom",
      description: "An architect who loves designing sustainable buildings.",
      phone: "+91 98765 43218",
      email: "anita@example.com",
      birthdate: "February 25, 1996",
      location: "Mumbai"
    }
  ]
};

const Index = () => {
  const navigate = useNavigate();
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [isMandalaVisible, setIsMandalaVisible] = useState(false);
  const isMobile = useIsMobile();
  const [guestName, setGuestName] = useState('Guest Name');
  const [selectedFamily, setSelectedFamily] = useState<FamilyDetails | null>(null);
  const [familyDialogOpen, setFamilyDialogOpen] = useState(false);
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  useEffect(() => {
    const storedName = localStorage.getItem('guestName');
    if (storedName) {
      setGuestName(storedName);
    }
    
    const cleanup = isMobile ? initTouchGlitter() : initCursorGlitter();
    
    const preloadImages = () => {
      const imagesToPreload = photos.slice(0, 2).map(photo => photo.src);
      let loadedCount = 0;
      
      imagesToPreload.forEach(src => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          if (loadedCount === imagesToPreload.length) {
            setImagesLoaded(true);
          }
        };
        img.src = src;
      });
    };
    
    preloadImages();
    
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

  const handleFamilyClick = (family: FamilyDetails) => {
    setSelectedFamily(family);
    setFamilyDialogOpen(true);
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
    { 
      src: "/lovable-uploads/5d906655-818b-462e-887e-0a392db20d48.png", 
      alt: "Couple photo 1",
      width: 600,
      height: 800
    },
    { 
      src: "/lovable-uploads/e1d52835-2f4a-42a2-8647-66379e0cc295.png", 
      alt: "Couple photo 2",
      width: 600,
      height: 800
    },
    { 
      src: "/lovable-uploads/6d392f5b-28f1-4710-9eda-8e7c1a9bfe8e.png", 
      alt: "Couple photo 3",
      width: 600,
      height: 800
    },
    { 
      src: "/lovable-uploads/fd7253c5-605a-4dee-ac79-cd585063976d.png", 
      alt: "Couple photo 4",
      width: 600,
      height: 800
    },
    { 
      src: "/lovable-uploads/88954d14-07a5-494c-a5ac-075e055e0223.png", 
      alt: "Bride and Groom Illustration",
      width: 600,
      height: 800
    }
  ];
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {!imagesLoaded && (
        <div className="fixed inset-0 bg-maroon/90 z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-gold-light border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="gold-text font-cormorant text-xl">Loading our love story...</p>
          </div>
        </div>
      )}
      
      {guestName && (
        <div className="bg-gold-gradient text-maroon py-2 px-4 text-center animate-fade-in">
          <p className="font-cormorant text-lg md:text-xl">
            Welcome, <span className="font-bold">{guestName}</span>! We're delighted you could join us.
          </p>
        </div>
      )}
      
      <Diya className="top-20" position="left" />
      <Diya className="bottom-20" position="right" delay={0.5} />
      
      <div className="absolute left-0 top-0 w-full overflow-hidden opacity-20 pointer-events-none h-20 md:h-40">
        <svg viewBox="0 0 1200 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,100 C300,20 500,180 800,50 C1000,0 1200,100 1200,100 L1200,0 L0,0 Z" fill="url(#gold-gradient-top)" />
          <defs>
            <linearGradient id="gold-gradient-top" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#B8860B" />
              <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <div className="pt-6 px-4">
        <GaneshaHeader />
      </div>
      
      <div className="absolute top-1/3 left-0 w-16 h-32 md:w-24 md:h-40 opacity-20 pointer-events-none">
        <svg viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M50,0 Q70,50 50,100 Q30,150 50,200" stroke="#FFD700" strokeWidth="2" fill="none" />
          <g transform="translate(45, 40)">
            <path d="M0,0 Q10,10 0,20 Q-10,10 0,0" fill="#FFD700" />
          </g>
          <g transform="translate(45, 90)">
            <path d="M0,0 Q10,10 0,20 Q-10,10 0,0" fill="#FFD700" />
          </g>
          <g transform="translate(45, 140)">
            <path d="M0,0 Q10,10 0,20 Q-10,10 0,0" fill="#FFD700" />
          </g>
        </svg>
      </div>
      
      <div className="absolute top-1/4 right-0 w-16 h-32 md:w-24 md:h-40 opacity-20 pointer-events-none">
        <svg viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M50,0 Q30,50 50,100 Q70,150 50,200" stroke="#FFD700" strokeWidth="2" fill="none" />
          <g transform="translate(55, 40)">
            <path d="M0,0 Q-10,10 0,20 Q10,10 0,0" fill="#FFD700" />
          </g>
          <g transform="translate(55, 90)">
            <path d="M0,0 Q-10,10 0,20 Q10,10 0,0" fill="#FFD700" />
          </g>
          <g transform="translate(55, 140)">
            <path d="M0,0 Q-10,10 0,20 Q10,10 0,0" fill="#FFD700" />
          </g>
        </svg>
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
            
            <HoverCard>
              <HoverCardTrigger asChild>
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
                    <Sparkle className={cn(
                      "ml-2 transition-transform duration-300",
                      "group-hover:rotate-12 animate-pulse"
                    )} size={18} />
                  </span>
                  <span className="absolute inset-0 bg-gold-light/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></span>
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="bg-maroon/90 border-gold-light/30 text-cream p-4 w-80">
                <div className="flex justify-between space-x-4">
                  <div className="space-y-1">
                    <h4 className="gold-text text-lg font-cormorant">Experience the Magic</h4>
                    <p className="text-sm text-cream/80">
                      Click to reveal a mesmerizing display of sacred symbols and lotus flowers that bring blessings to our union.
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </header>
      
      {isMandalaVisible && (
        <div 
          id="mandala-container"
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        ></div>
      )}
      
      <div className="relative py-4 overflow-hidden">
        <div className="absolute left-0 w-full h-px bg-gold-light/30"></div>
        <div className="flex justify-center gap-2 sm:gap-4 md:gap-6 opacity-60">
          {[...Array(isMobile ? 5 : 10)].map((_, i) => (
            <div key={i} className="w-4 h-4 md:w-6 md:h-6 relative">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12,2 C14,5 17,7 21,7 C17,7 14,9 12,12 C10,9 7,7 3,7 C7,7 10,5 12,2 Z" fill="#FFD700" opacity="0.8" />
                <path d="M12,12 C14,15 17,17 21,17 C17,17 14,19 12,22 C10,19 7,17 3,17 C7,17 10,15 12,12 Z" fill="#FFD700" opacity="0.8" />
              </svg>
            </div>
          ))}
        </div>
        <div className="absolute right-0 w-full h-px bg-gold-light/30"></div>
      </div>
      
      <section className="py-10 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <div 
              className="bg-maroon/40 rounded-xl p-6 gold-border animate-fade-in-left cursor-pointer transform transition-all duration-300 hover:shadow-gold-lg hover:-translate-y-1"
              onClick={() => handleFamilyClick(brideFamily)}
            >
              <div className="flex justify-center mb-4">
                <Flower className="text-gold-light" size={28} />
              </div>
              <h3 className="text-center font-cormorant text-xl gold-text mb-2 flex items-center justify-center">
                Bride's Parents
                <Info size={16} className="ml-2 text-gold-light/70" />
              </h3>
              <p className="text-center text-cream text-lg font-cormorant">Ramesh & Rameshi</p>
            </div>
            
            <div 
              className="bg-maroon/40 rounded-xl p-6 gold-border animate-fade-in-right cursor-pointer transform transition-all duration-300 hover:shadow-gold-lg hover:-translate-y-1"
              onClick={() => handleFamilyClick(groomFamily)}
            >
              <div className="flex justify-center mb-4">
                <Star className="text-gold-light" size={28} />
              </div>
              <h3 className="text-center font-cormorant text-xl gold-text mb-2 flex items-center justify-center">
                Groom's Parents
                <Info size={16} className="ml-2 text-gold-light/70" />
              </h3>
              <p className="text-center text-cream text-lg font-cormorant">Harkesh & Harkeshi</p>
            </div>
          </div>
        </div>
      </section>
      
      <div className="flex justify-center my-8">
        <div className="relative px-16">
          <div className="absolute inset-y-0 left-0 w-12 h-0.5 bg-gold-gradient my-auto"></div>
          <Heart size={24} className="text-gold-light" />
          <div className="absolute inset-y-0 right-0 w-12 h-0.5 bg-gold-gradient my-auto"></div>
        </div>
      </div>
      
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
                <EventCard 
                  title={event.title}
                  date={event.date}
                  time={event.time}
                  venue={event.venue}
                  icon={event.icon}
                  images={event.images}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <div className="flex justify-center my-8 overflow-hidden">
        <div className="relative">
          <div className="flex items-center gap-2">
            <div className="w-32 h-px bg-gold-gradient"></div>
            <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M50,10 C60,30 80,40 90,30 C80,50 90,70 70,75 C50,80 30,70 20,50 C10,30 30,10 50,10 Z" fill="url(#gold-gradient)" opacity="0.7" />
              <defs>
                <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#B8860B" />
                </linearGradient>
              </defs>
            </svg>
            <div className="w-32 h-px bg-gold-gradient"></div>
          </div>
        </div>
      </div>
      
      <section className="py-10 px-2 md:px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-cormorant text-3xl md:text-4xl gold-text font-bold mb-8">
            Our Journey
          </h2>
          
          <style>
            {`
            .photo-item {
              transition: all 0.3s ease;
              position: relative;
            }
            
            .photo-item::before {
              content: '';
              position: absolute;
              inset: 0;
              border-radius: 0.75rem;
              padding: 3px;
              background: linear-gradient(to right, #FFD700, #C5A20A);
              -webkit-mask: 
                linear-gradient(#fff 0 0) content-box, 
                linear-gradient(#fff 0 0);
              -webkit-mask-composite: xor;
              mask-composite: exclude;
              opacity: 0;
              transition: opacity 0.3s ease;
            }
            
            .photo-item:hover {
              transform: translateY(-5px);
              box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
            }
            
            .photo-item:hover::before {
              opacity: 1;
            }
            `}
          </style>
          
          <PhotoCarousel photos={photos} />
        </div>
      </section>
      
      <section className="py-10 px-4 relative overflow-hidden z-10">
        <div className="max-w-4xl mx-auto">
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
          
          <style>
            {`
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
            .lotus-flower {
              position: absolute;
              pointer-events: none;
              animation: float 20s linear infinite, spin-slow 40s linear infinite;
            }
            `}
          </style>
        </div>
      </section>
      
      <section className="py-10 px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => setComingSoonOpen(true)}
            className="group relative overflow-hidden inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gold-gradient text-maroon font-bold text-lg transition-transform duration-300 hover:scale-105 animate-pulse-glow"
          >
            <span className="relative z-10 font-cormorant font-bold">Enter Event Dashboard</span>
            <span className="absolute inset-0 bg-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          </button>
          
          <DashboardComingSoonPopup open={comingSoonOpen} onClose={() => setComingSoonOpen(false)} />
        </div>
      </section>
      
      <footer className="py-10 px-4 relative mt-10 border-t border-gold-light/30 z-10">
        <div className="absolute top-0 left-0 w-full h-px bg-gold-gradient"></div>
        
        <div className="absolute top-10 left-10 w-12 h-12 opacity-20 hidden md:block">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="30" stroke="#FFD700" strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="20" stroke="#FFD700" strokeWidth="1" fill="none" />
            <circle cx="50" cy="50" r="10" fill="#FFD700" opacity="0.5" />
          </svg>
        </div>
        
        <div className="absolute bottom-10 right-10 w-16 h-16 opacity-20 hidden md:block">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,10 C65,10 80,25 80,40 C80,55 65,70 50,70 C35,70 20,55 20,40 C20,25 35,10 50,10 Z" stroke="#FFD700" strokeWidth="2" fill="none" />
            <path d="M50,20 C60,20 70,30 70,40 C70,50 60,60 50,60 C40,60 30,50 30,40 C30,30 40,20 50,20 Z" stroke="#FFD700" strokeWidth="1" fill="none" />
          </svg>
        </div>
        
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
      
      <FamilyDetailsDialog 
        open={familyDialogOpen} 
        onOpenChange={setFamilyDialogOpen} 
        familyDetails={selectedFamily} 
      />
    </div>
  );
};

export default Index;
