import React, { useState, useEffect } from 'react';
import { Calendar, Flower, Heart, Music, Paintbrush, Sparkles, Star, Info, Sparkle, CheckCircle, ExternalLink, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import EnhancedEventCard from '@/components/EnhancedEventCard';
import EnhancedPhotoCarousel from '@/components/EnhancedPhotoCarousel';
import FloatingElements from '@/components/FloatingElements';
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
import { useToast } from '@/hooks/use-toast';

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
  const [invitationAccepted, setInvitationAccepted] = useState(false);
  const { toast } = useToast();
  
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

  const handleAcceptInvitation = () => {
    setInvitationAccepted(true);
    toast({
      title: "Invitation Accepted!",
      description: "Thank you for accepting our invitation. We look forward to celebrating with you!",
      variant: "default",
      duration: 5000,
    });
  };

  const weddingDate = new Date("2025-03-30T17:00:00");

  const events = [
    {
      title: "Mehndi Ceremony",
      date: "28 March 2025",
      time: "10:00 AM - 2:00 PM",
      venue: "Garden Court, The Royal Celebration Hall, Wedding City",
      icon: <Paintbrush size={24} className="text-maroon" />,
      googleMapsUrl: "https://maps.google.com/?q=Garden+Court+Royal+Celebration+Hall+Wedding+City"
    },
    {
      title: "Sangeet Night",
      date: "28 March 2025",
      time: "7:00 PM - 11:00 PM",
      venue: "Grand Pavilion, The Royal Celebration Hall, Wedding City",
      icon: <Music size={24} className="text-maroon" />,
      googleMapsUrl: "https://maps.google.com/?q=Grand+Pavilion+Royal+Celebration+Hall+Wedding+City"
    },
    {
      title: "Haldi Ceremony",
      date: "29 March 2025",
      time: "11:00 AM - 2:00 PM",
      venue: "Courtyard, The Royal Celebration Hall, Wedding City",
      icon: <Sparkles size={24} className="text-maroon" />,
      googleMapsUrl: "https://maps.google.com/?q=Courtyard+Royal+Celebration+Hall+Wedding+City"
    },
    {
      title: "Wedding Ceremony",
      date: "30 March 2025",
      time: "5:00 PM - 8:00 PM",
      venue: "Main Hall, The Royal Celebration Hall, Wedding City",
      icon: <Heart size={24} className="text-maroon" />,
      googleMapsUrl: "https://maps.google.com/?q=Main+Hall+Royal+Celebration+Hall+Wedding+City"
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
      {/* Floating background elements */}
      <FloatingElements />
      
      {/* Loading screen */}
      {!imagesLoaded && (
        <div className="fixed inset-0 bg-gradient-to-br from-maroon via-maroon/90 to-maroon z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-gold-light border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <Heart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gold-light w-6 h-6 animate-pulse" />
            </div>
            <p className="text-gold-light font-cormorant text-2xl animate-pulse">Loading our love story...</p>
            <div className="flex justify-center mt-4 space-x-1">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className="w-2 h-2 bg-gold-light rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Welcome banner with enhanced styling */}
      {guestName && (
        <div className="bg-gradient-to-r from-gold-light via-[#FFE55C] to-gold-light text-maroon py-3 px-4 text-center animate-fade-in relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full animate-shimmer"></div>
          <p className="font-cormorant text-lg md:text-xl font-semibold relative z-10">
            Welcome, <span className="font-bold text-maroon/90">{guestName}</span>! We're delighted you could join us.
          </p>
        </div>
      )}
      
      {/* Enhanced Diyas with better positioning */}
      <Diya className="top-20 animate-fade-in" position="left" />
      <Diya className="bottom-20 animate-fade-in" position="right" delay={0.5} />
      
      {/* Enhanced decorative borders */}
      <div className="absolute left-0 top-0 w-full overflow-hidden opacity-30 pointer-events-none h-24 md:h-40">
        <svg viewBox="0 0 1200 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,100 C300,20 500,180 800,50 C1000,0 1200,100 1200,100 L1200,0 L0,0 Z" fill="url(#enhanced-gold-gradient-top)" />
          <defs>
            <linearGradient id="enhanced-gold-gradient-top" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="25%" stopColor="#FFE55C" />
              <stop offset="50%" stopColor="#B8860B" />
              <stop offset="75%" stopColor="#FFE55C" />
              <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Enhanced side decorations */}
      <div className="absolute top-1/3 left-0 w-20 h-40 md:w-28 md:h-48 opacity-25 pointer-events-none animate-float">
        <svg viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M50,0 Q70,50 50,100 Q30,150 50,200" stroke="url(#side-gradient)" strokeWidth="3" fill="none" />
          <g transform="translate(45, 40)">
            <circle cx="5" cy="10" r="3" fill="#FFD700" opacity="0.8" />
          </g>
          <g transform="translate(45, 90)">
            <circle cx="5" cy="10" r="4" fill="#FFE55C" opacity="0.6" />
          </g>
          <g transform="translate(45, 140)">
            <circle cx="5" cy="10" r="3" fill="#FFD700" opacity="0.8" />
          </g>
          <defs>
            <linearGradient id="side-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#FFE55C" />
              <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Enhanced header section */}
      <header className="pt-12 md:pt-16 pb-12 px-4 relative text-center">
        <div className="max-w-4xl mx-auto">
          {/* Enhanced floating heart icon */}
          <div className="mb-8 animate-float">
            <div className="inline-block p-2 rounded-full bg-gradient-to-r from-gold-light via-[#FFE55C] to-gold-light shadow-lg shadow-gold-light/30">
              <div className="bg-maroon p-3 rounded-full">
                <Heart size={32} className="text-gold-light" fill="currentColor" />
              </div>
            </div>
          </div>
          
          <p className="text-gold-light/90 font-opensans tracking-[0.3em] animate-fade-in mb-4 text-sm md:text-base">
            WE ARE GETTING MARRIED
          </p>
          
          {/* Enhanced couple names with better typography */}
          <div className="relative mb-6">
            <h1 className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-bold mb-4 animate-scale-up">
              <span className="bg-gradient-to-r from-gold-light via-[#FFE55C] to-gold-light bg-clip-text text-transparent">
                Priya
              </span>
              <span className="inline-block mx-2 md:mx-4 text-gold-light/80 animate-pulse">
                &
              </span>
              <span className="bg-gradient-to-r from-gold-light via-[#FFE55C] to-gold-light bg-clip-text text-transparent">
                Vijay
              </span>
            </h1>
            
            {/* Decorative underline */}
            <div className="flex justify-center mt-4">
              <div className="w-32 md:w-48 h-1 bg-gradient-to-r from-transparent via-gold-light to-transparent rounded-full"></div>
            </div>
          </div>
          
          <p className="text-cream text-xl md:text-2xl italic font-cormorant animate-fade-in mb-8">
            "A journey written in the stars…"
          </p>
          
          {/* Enhanced couple illustration */}
          <div className="mt-10 flex justify-center">
            <div className="relative">
              <CoupleIllustration className="w-72 h-72 md:w-96 md:h-96 animate-float" />
              <div className="absolute inset-0 bg-gradient-to-r from-gold-light/10 via-transparent to-gold-light/10 rounded-full blur-3xl"></div>
            </div>
          </div>
          
          {/* Enhanced wedding date */}
          <div className="mt-10 animate-fade-in flex justify-center">
            <div className="relative bg-gradient-to-r from-maroon/60 via-maroon/40 to-maroon/60 px-8 py-4 rounded-xl border border-gold-light/40 backdrop-blur-sm shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-gold-light/5 via-gold-light/10 to-gold-light/5 rounded-xl"></div>
              <Calendar className="inline-block text-gold-light mr-3 mb-1" size={24} />
              <span className="font-cormorant text-2xl md:text-3xl font-bold bg-gradient-to-r from-gold-light to-[#FFE55C] bg-clip-text text-transparent">
                30 March 2025
              </span>
            </div>
          </div>
          
          {/* Enhanced countdown */}
          <div className="mt-12">
            <Countdown targetDate={weddingDate} className="animate-fade-in" />
          </div>
          
          {/* Enhanced action buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button 
              className={cn(
                "group relative px-8 py-4 rounded-full transition-all duration-500",
                "bg-gradient-to-r from-gold-light via-[#FFE55C] to-gold-light",
                "hover:shadow-2xl hover:shadow-gold-light/40 text-maroon font-bold",
                "overflow-hidden transform hover:scale-105",
                showHearts && "animate-pulse"
              )}
              onClick={() => setShowHearts(!showHearts)}
            >
              <span className="relative z-10 flex items-center font-cormorant text-lg">
                {showHearts ? "Stop Hearts" : "Shower Love"} 
                <Heart className={cn(
                  "ml-3 transition-transform duration-300",
                  showHearts ? "animate-heart-beat scale-110" : "group-hover:scale-125"
                )} size={20} fill="currentColor" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFE55C] to-gold-light opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
            
            <HoverCard>
              <HoverCardTrigger asChild>
                <button 
                  className={cn(
                    "group relative px-8 py-4 rounded-full transition-all duration-500",
                    "border-2 border-gold-light text-gold-light font-bold",
                    "overflow-hidden hover:bg-gold-light/10 transform hover:scale-105",
                    isMandalaVisible && "bg-gold-light/10 border-[#FFE55C]"
                  )}
                  onClick={() => setIsMandalaVisible(!isMandalaVisible)}
                >
                  <span className="relative z-10 flex items-center font-cormorant text-lg">
                    {isMandalaVisible ? "Hide Magic" : "Show Magic"} 
                    <Sparkle className={cn(
                      "ml-3 transition-transform duration-300",
                      "group-hover:rotate-12 animate-pulse"
                    )} size={20} />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-light/10 to-[#FFE55C]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="bg-maroon/95 border-gold-light/40 text-cream p-6 w-80 backdrop-blur-sm">
                <div className="space-y-3">
                  <h4 className="text-gold-light text-xl font-cormorant font-bold">Experience the Magic</h4>
                  <p className="text-cream/90 leading-relaxed">
                    Click to reveal a mesmerizing display of sacred symbols and lotus flowers that bring blessings to our union.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </header>
      
      {/* ... keep existing code (mandala container, decorative divider) */}
      
      {/* Enhanced family section */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div 
              className="group relative bg-gradient-to-br from-maroon/50 via-maroon/30 to-maroon/50 rounded-2xl p-8 border border-gold-light/30 cursor-pointer transform transition-all duration-500 hover:shadow-2xl hover:shadow-gold-light/20 hover:-translate-y-2 animate-fade-in-left"
              onClick={() => handleFamilyClick(brideFamily)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gold-light/5 via-transparent to-gold-light/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-gold-light/20 to-[#FFE55C]/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Flower className="text-gold-light w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-center font-cormorant text-2xl font-bold mb-3 flex items-center justify-center">
                  <span className="bg-gradient-to-r from-gold-light to-[#FFE55C] bg-clip-text text-transparent">
                    Bride's Parents
                  </span>
                  <Info size={18} className="ml-3 text-gold-light/70 group-hover:text-gold-light transition-colors" />
                </h3>
                <p className="text-center text-cream text-xl font-cormorant">Ramesh & Rameshi</p>
              </div>
            </div>
            
            <div 
              className="group relative bg-gradient-to-br from-maroon/50 via-maroon/30 to-maroon/50 rounded-2xl p-8 border border-gold-light/30 cursor-pointer transform transition-all duration-500 hover:shadow-2xl hover:shadow-gold-light/20 hover:-translate-y-2 animate-fade-in-right"
              onClick={() => handleFamilyClick(groomFamily)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gold-light/5 via-transparent to-gold-light/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-gold-light/20 to-[#FFE55C]/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Star className="text-gold-light w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-center font-cormorant text-2xl font-bold mb-3 flex items-center justify-center">
                  <span className="bg-gradient-to-r from-gold-light to-[#FFE55C] bg-clip-text text-transparent">
                    Groom's Parents
                  </span>
                  <Info size={18} className="ml-3 text-gold-light/70 group-hover:text-gold-light transition-colors" />
                </h3>
                <p className="text-center text-cream text-xl font-cormorant">Harkesh & Harkeshi</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* ... keep existing code (heart divider) */}
      
      {/* Enhanced events section */}
      <section className="py-12 px-4 relative z-10" id="events">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-cormorant text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gold-light via-[#FFE55C] to-gold-light bg-clip-text text-transparent">
                Celebration Events
              </span>
            </h2>
            <div className="flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-light to-transparent rounded-full"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {events.map((event, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.15}s` }}>
                <EnhancedEventCard 
                  title={event.title}
                  date={event.date}
                  time={event.time}
                  venue={event.venue}
                  icon={event.icon}
                  googleMapsUrl={event.googleMapsUrl}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* ... keep existing code (decorative divider) */}
      
      {/* Enhanced photo section */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-cormorant text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gold-light via-[#FFE55C] to-gold-light bg-clip-text text-transparent">
                Our Journey
              </span>
            </h2>
            <div className="flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-light to-transparent rounded-full"></div>
            </div>
          </div>
          
          <EnhancedPhotoCarousel photos={photos} />
        </div>
      </section>
      
      {/* ... keep existing code (dance section, invitation acceptance, footer) */}
      
      <FamilyDetailsDialog 
        open={familyDialogOpen} 
        onOpenChange={setFamilyDialogOpen} 
        familyDetails={selectedFamily} 
      />
    </div>
  );
};

export default Index;
