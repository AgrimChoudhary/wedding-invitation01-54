import React, { useState, useEffect } from 'react';
import { Calendar, Flower, Heart, Music, Paintbrush, Sparkles, Star, Info, Sparkle, CheckCircle, ExternalLink, MapPin, Trophy, Crown, Zap, MessageSquare, Users } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';
import PromotionCard from '@/components/PromotionCard';
import TypingText from '@/components/TypingText';

const brideFamily: FamilyDetails = {
  side: "bride",
  title: "IPL Trophy Family",
  description: "The IPL Trophy family represents the pinnacle of T20 cricket excellence, bringing together the best of cricket talent from around the world.",
  address: "BCCI Headquarters, Mumbai",
  members: [
    {
      name: "IPL Chairman",
      relation: "Father of the Bride",
      description: "A visionary leader who has transformed cricket with the IPL.",
      phone: "+91 98765 43215",
      email: "iplchairman@example.com",
      birthdate: "October 7, 1968",
      location: "Mumbai"
    },
    {
      name: "IPL Trophy",
      relation: "The Bride",
      description: "The most coveted prize in T20 cricket, symbolizing excellence and achievement.",
      phone: "+91 98765 43217",
      email: "ipltrophy@example.com",
      birthdate: "July 18, 1993",
      location: "Mumbai"
    }
  ]
};

const groomFamily: FamilyDetails = {
  side: "groom",
  title: "RCB Family",
  description: "The Royal Challengers Bangalore family, known for their passionate fan base and never-give-up spirit. Led by Faf du Plessis, they are ready to lift their first IPL trophy.",
  address: "M. Chinnaswamy Stadium, Bangalore",
  members: [
    {
      name: "Faf du Plessis",
      relation: "Father of the Groom (Captain)",
      description: "The charismatic leader who has transformed RCB's fortunes with his calm leadership and explosive batting.",
      phone: "+91 98765 43210",
      email: "faf@rcb.com",
      birthdate: "July 13, 1984",
      location: "Bangalore"
    },
    {
      name: "Andy Flower",
      relation: "Mother of the Groom (Head Coach)",
      description: "The strategic mastermind behind RCB's resurgence, bringing his wealth of experience to guide the team.",
      phone: "+91 98765 43211",
      email: "andy@rcb.com",
      birthdate: "April 28, 1968",
      location: "Bangalore"
    },
    {
      name: "Virat Kohli",
      relation: "Brother of the Groom",
      description: "The heart and soul of RCB, bringing passion and determination to every match.",
      phone: "+91 98765 43212",
      email: "virat@rcb.com",
      birthdate: "November 5, 1988",
      location: "Bangalore"
    },
    {
      name: "Glenn Maxwell",
      relation: "Brother of the Groom",
      description: "The explosive all-rounder who can change the game in a matter of overs.",
      phone: "+91 98765 43213",
      email: "maxwell@rcb.com",
      birthdate: "October 14, 1988",
      location: "Bangalore"
    },
    {
      name: "Mohammed Siraj",
      relation: "Brother of the Groom",
      description: "The pace spearhead who leads RCB's bowling attack with skill and determination.",
      phone: "+91 98765 43214",
      email: "siraj@rcb.com",
      birthdate: "March 13, 1994",
      location: "Bangalore"
    }
  ]
};

const Index = () => {
  const navigate = useNavigate();
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [isMandalaVisible, setIsMandalaVisible] = useState(false);
  const isMobile = useIsMobile();
  const [guestName, setGuestName] = useState('RCB Haters');
  const [selectedFamily, setSelectedFamily] = useState<FamilyDetails | null>(null);
  const [familyDialogOpen, setFamilyDialogOpen] = useState(false);
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [invitationAccepted, setInvitationAccepted] = useState(false);
  const [showGuestInput, setShowGuestInput] = useState(false);
  const [tempGuestName, setTempGuestName] = useState('');
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
    setShowGuestInput(true);
    toast({
      title: "Invitation Accepted! 🏆",
      description: "Welcome to the RCB family! Please enter your name to personalize your experience.",
      variant: "default",
      duration: 5000,
    });
  };

  const handleGuestNameSubmit = () => {
    if (tempGuestName.trim()) {
      setGuestName(tempGuestName.trim());
      localStorage.setItem('guestName', tempGuestName.trim());
      setShowGuestInput(false);
      toast({
        title: "Welcome to the RCB Army! 🔥",
        description: `Hello ${tempGuestName}! You're now part of the 12th man brigade!`,
        variant: "default",
        duration: 5000,
      });
    }
  };

  const weddingDate = new Date("2025-06-03T00:00:00+05:30");

  const events = [
    {
      title: "Playoff 2 - MI vs PBKS",
      date: "1 June 2025",
      time: "7:30 PM - 11:30 PM",
      venue: "Narendra Modi Stadium, Ahmedabad",
      icon: <Paintbrush size={24} className="text-red-600" />,
      googleMapsUrl: "https://g.co/kgs/45CVZL5"
    },
    {
      title: "Final Toss RCB vs PBKS",
      date: "3 June 2025",
      time: "7:00 PM",
      venue: "Narendra Modi Stadium, Ahmedabad",
      icon: <Trophy size={24} className="text-yellow-500" />,
      googleMapsUrl: "https://g.co/kgs/45CVZL5"
    },
    {
      title: "Final Mukabla - The Ultimate Battle",
      date: "3 June 2025",
      time: "7:30 PM - 11:30 PM",
      venue: "Narendra Modi Stadium, Ahmedabad",
      icon: <Zap size={24} className="text-red-500" />,
      googleMapsUrl: "https://g.co/kgs/45CVZL5"
    },
    {
      title: "Trophy Lifting - RCB's Glory",
      date: "3 June 2025",
      time: "12:00 AM",
      venue: "Narendra Modi Stadium, Ahmedabad",
      icon: <Crown size={24} className="text-yellow-400" />,
      googleMapsUrl: "https://g.co/kgs/45CVZL5"
    }
  ];
  
  const photos = [
    { 
      src: "https://img.etimg.com/thumb/width-1200,height-1200,imgsize-57006,resizemode-75,msid-119687196/news/new-updates/dosa-idly-sambar-chutney-rcbs-win-over-csk-in-ipl-ignites-meme-fest-watch-viral-video-of-virat-kohli-teasing-jadeja.jpg", 
      alt: "RCB vs CSK Match Moment",
      width: 1200,
      height: 1200
    },
    { 
      src: "https://images.moneycontrol.com/static-mcnews/2025/04/20250420131610_Kohli-BCCI.jpg?impolicy=website&width=770&height=431", 
      alt: "Virat Kohli in Action",
      width: 770,
      height: 431
    },
    { 
      src: "https://i.pinimg.com/236x/27/8d/84/278d84aa87b920c2a73fef777459a735.jpg", 
      alt: "RCB Team Celebration",
      width: 236,
      height: 236
    },
    { 
      src: "https://images.bhaskarassets.com/thumb/1200x900/web2images/1884/2025/04/20/go-z4ohxuaacvlt_1745172634.jpg", 
      alt: "RCB Match Moment",
      width: 1200,
      height: 900
    },
    { 
      src: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_960,q_50/lsci/db/PICTURES/CMS/261700/261725.jpg", 
      alt: "RCB Team Photo",
      width: 960,
      height: 640
    },
    { 
      src: "/lovable-uploads/5afd7a5a-50bd-433d-8e23-7e0d3aa5b16f", 
      alt: "RCB Special Moment",
      width: 600,
      height: 800
    }
  ];
  
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-red-900 via-red-800 to-black">
      {!imagesLoaded && (
        <div className="fixed inset-0 bg-gradient-to-br from-red-900 to-black z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-yellow-400 font-cormorant text-xl animate-pulse">Loading RCB's journey to glory...</p>
          </div>
        </div>
      )}
      
      {/* RCB themed welcome banner */}
      {guestName && (
        <div className="bg-gradient-to-r from-red-600 to-yellow-500 text-white py-3 px-4 text-center animate-fade-in shadow-lg">
          <p className="font-cormorant text-lg md:text-xl flex items-center justify-center gap-2">
            <Crown className="text-yellow-300" size={20} />
            Welcome to the RCB Army, <span className="font-bold">
              <TypingText text={guestName} className="text-yellow-200" />
            </span>! 
            <Trophy className="text-yellow-300" size={20} />
          </p>
        </div>
      )}
      
      {/* Enhanced RCB themed decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 opacity-30 animate-pulse">
        <div className="w-full h-full bg-gradient-to-br from-red-500 to-yellow-400 rounded-full flex items-center justify-center">
          <Crown className="text-white" size={32} />
        </div>
      </div>
      
      <div className="absolute bottom-10 right-10 w-24 h-24 opacity-30 animate-bounce">
        <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-red-500 rounded-full flex items-center justify-center">
          <Trophy className="text-white" size={36} />
        </div>
      </div>
      
      <Diya className="top-20" position="left" />
      <Diya className="bottom-20" position="right" delay={0.5} />
      
      {/* Enhanced header section */}
      <header className="pt-10 md:pt-12 pb-10 px-4 relative text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 animate-float">
            <div className="inline-block p-2 rounded-full bg-gradient-to-r from-red-500 to-yellow-400 shadow-2xl">
              <div className="bg-gradient-to-br from-red-900 to-black p-3 rounded-full">
                <Heart size={32} className="text-yellow-400 animate-pulse" />
              </div>
            </div>
          </div>
          
          <p className="text-yellow-400 font-opensans tracking-widest animate-fade-in mb-3 text-sm md:text-base">
            🏆 THE ULTIMATE CRICKET WEDDING 🏆
          </p>
          
          <h1 className="font-cormorant text-4xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-300 to-red-400 font-bold mb-4 animate-scale-up">
            RCB <span className="inline-block mx-1 md:mx-3 text-yellow-400">&</span> IPL Trophy
          </h1>
          
          <p className="text-yellow-100 text-lg md:text-xl italic font-cormorant animate-fade-in mb-4">
            "Finally, the wait ends... Ee Sala Cup Namde! 🔥"
          </p>
          
          <div className="mb-6 bg-gradient-to-r from-red-800/80 to-yellow-600/80 backdrop-blur-sm px-4 py-2 rounded-full inline-block">
            <p className="text-white font-bold">12th Man Army Member: <TypingText text={guestName} className="text-yellow-300" /></p>
          </div>
          
          <div className="mt-8 flex justify-center">
            <CoupleIllustration className="w-64 h-64 md:w-80 md:h-80" />
          </div>
          
          <div className="mt-8 animate-fade-in flex justify-center">
            <div className="bg-gradient-to-r from-red-700/70 to-yellow-600/70 backdrop-blur-sm px-6 py-4 rounded-xl border-2 border-yellow-400/50 shadow-2xl">
              <Calendar className="inline-block text-yellow-400 mr-2 mb-1" size={20} />
              <span className="font-cormorant text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-100">
                3 June 2025 - Victory Day
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
                "bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-500 hover:to-yellow-400",
                "text-white font-bold shadow-lg hover:shadow-2xl",
                "overflow-hidden group transform hover:scale-105",
                showHearts && "animate-pulse"
              )}
              onClick={() => setShowHearts(!showHearts)}
            >
              <span className="relative z-10 flex items-center">
                {showHearts ? "Stop the Fire 🔥" : "RCB Fire 🔥"} 
                <Heart className={cn(
                  "ml-2 transition-transform duration-300",
                  showHearts ? "animate-heart-beat" : "group-hover:scale-125"
                )} size={18} />
              </span>
            </button>
            
            <HoverCard>
              <HoverCardTrigger asChild>
                <button 
                  className={cn(
                    "relative px-6 py-3 rounded-full transition-all duration-300",
                    "border-2 border-yellow-400 text-yellow-400 font-bold",
                    "overflow-hidden hover:bg-yellow-400/10 group transform hover:scale-105",
                    isMandalaVisible && "bg-yellow-400/10"
                  )}
                  onClick={() => setIsMandalaVisible(!isMandalaVisible)}
                >
                  <span className="relative z-10 flex items-center">
                    {isMandalaVisible ? "Hide Magic ✨" : "Show Magic ✨"} 
                    <Sparkle className={cn(
                      "ml-2 transition-transform duration-300",
                      "group-hover:rotate-12 animate-pulse"
                    )} size={18} />
                  </span>
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="bg-red-900/90 border-yellow-400/30 text-yellow-100 p-4 w-80">
                <div className="flex justify-between space-x-4">
                  <div className="space-y-1">
                    <h4 className="text-yellow-400 text-lg font-cormorant">Experience RCB Magic</h4>
                    <p className="text-sm text-yellow-100/80">
                      Unleash the power of Royal Challengers with sacred symbols and blessings for our historic victory!
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
      
      {/* Enhanced divider */}
      <div className="relative py-4 overflow-hidden">
        <div className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
        <div className="flex justify-center gap-2 sm:gap-4 md:gap-6 opacity-80">
          {[...Array(isMobile ? 5 : 10)].map((_, i) => (
            <div key={i} className="w-4 h-4 md:w-6 md:h-6 relative animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
              <Trophy className="text-yellow-400" fill="currentColor" />
            </div>
          ))}
        </div>
      </div>
      
      {/* NEW: Wishing Wall CTA Section */}
      <section className="py-8 px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-red-800/40 to-yellow-700/40 backdrop-blur-sm border-2 border-yellow-400/40 rounded-xl p-6 shadow-2xl animate-scale-up hover:shadow-gold-lg transition-all duration-300">
            <div className="flex justify-center items-center gap-3 mb-4">
              <MessageSquare className="text-yellow-400 animate-bounce" size={28} />
              <h3 className="font-cormorant text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-400">
                Join the RCB Wishing Wall! 🔥
              </h3>
              <Users className="text-red-400 animate-pulse" size={28} />
            </div>
            
            <p className="text-yellow-100/90 text-lg mb-6">
              Share your wishes, engage in cricket banter, and make predictions with fellow fans! 
              <br />
              <span className="text-yellow-400 font-bold">Let's make this viral! 🚀</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/wishing-wall')}
                className="group relative overflow-hidden px-6 py-3 bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-500 hover:to-yellow-400 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <MessageSquare size={18} />
                  Open Wishing Wall
                  <Sparkle size={16} className="group-hover:rotate-12 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
              
              <div className="text-sm text-yellow-300/80 flex items-center gap-2">
                <Heart className="text-red-400" size={14} />
                <span>Be part of the 12th man army!</span>
                <Trophy className="text-yellow-400" size={14} />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Enhanced family section */}
      <section className="py-10 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <div 
              className="bg-gradient-to-br from-red-800/60 to-red-900/60 backdrop-blur-sm rounded-xl p-6 border-2 border-yellow-400/30 animate-fade-in-left cursor-pointer transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-yellow-400/60"
              onClick={() => handleFamilyClick(brideFamily)}
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full">
                  <Trophy className="text-red-900" size={28} />
                </div>
              </div>
              <h3 className="text-center font-cormorant text-xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-100 mb-2 flex items-center justify-center">
                Trophy's Legacy
                <Info size={16} className="ml-2 text-yellow-400/70" />
              </h3>
              <p className="text-center text-yellow-100 text-lg font-cormorant">IPL Trophy Family 🏆</p>
            </div>
            
            <div 
              className="bg-gradient-to-br from-red-800/60 to-red-900/60 backdrop-blur-sm rounded-xl p-6 border-2 border-yellow-400/30 animate-fade-in-right cursor-pointer transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-yellow-400/60"
              onClick={() => handleFamilyClick(groomFamily)}
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-br from-red-500 to-red-700 rounded-full">
                  <Crown className="text-yellow-400" size={28} />
                </div>
              </div>
              <h3 className="text-center font-cormorant text-xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-100 mb-2 flex items-center justify-center">
                Royal Challengers
                <Info size={16} className="ml-2 text-yellow-400/70" />
              </h3>
              <p className="text-center text-yellow-100 text-lg font-cormorant">RCB Family 👑</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Enhanced events section */}
      <section className="py-10 px-4 relative z-10" id="events">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center font-cormorant text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-red-300 to-yellow-300 font-bold mb-10">
            🏆 Road to Glory - Match Schedule 🏆
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
                  googleMapsUrl={event.googleMapsUrl}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-10 px-2 md:px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-cormorant text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-red-300 to-yellow-300 font-bold mb-8">
            🔥 RCB's Journey to Victory 🔥
          </h2>
          
          <PhotoCarousel photos={photos} />
        </div>
      </section>
      
      {/* Enhanced invitation section */}
      <section className="py-10 px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          {!invitationAccepted ? (
            <button
              onClick={handleAcceptInvitation}
              className="group relative overflow-hidden inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gradient-to-r from-red-600 to-yellow-500 text-white font-bold text-lg transition-transform duration-300 hover:scale-105 shadow-2xl animate-pulse"
            >
              <span className="relative z-10 font-cormorant font-bold flex items-center">
                <CheckCircle className="mr-2" size={20} />
                Join the RCB Army! 🔥
              </span>
            </button>
          ) : showGuestInput ? (
            <div className="bg-gradient-to-br from-red-800/60 to-yellow-600/60 backdrop-blur-sm border-2 border-yellow-400/40 rounded-lg p-6 animate-fade-in">
              <Crown className="text-yellow-400 mx-auto mb-4" size={32} />
              <h3 className="font-cormorant text-yellow-400 text-2xl font-bold mb-4">Welcome to the 12th Man Army!</h3>
              <p className="text-yellow-100 mb-4">Enter your name to join the RCB family:</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="text"
                  value={tempGuestName}
                  onChange={(e) => setTempGuestName(e.target.value)}
                  placeholder="Your name..."
                  className="flex-1 px-4 py-2 rounded-lg bg-red-900/80 border border-yellow-400/50 text-yellow-100 placeholder-yellow-300/70 focus:outline-none focus:border-yellow-400"
                  onKeyPress={(e) => e.key === 'Enter' && handleGuestNameSubmit()}
                />
                <button
                  onClick={handleGuestNameSubmit}
                  className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-red-500 text-white font-bold rounded-lg hover:scale-105 transition-transform"
                >
                  Join! 🚀
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-red-800/60 to-yellow-600/60 backdrop-blur-sm border-2 border-yellow-400/40 rounded-lg p-6 animate-fade-in">
              <Crown className="text-yellow-400 mx-auto mb-3" size={32} />
              <h3 className="font-cormorant text-yellow-400 text-2xl font-bold mb-2">Welcome to the RCB Army!</h3>
              <p className="text-yellow-100">
                <TypingText text={`Thank you ${guestName}! See you at the stadium when RCB lifts their first IPL trophy! 🏆`} />
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* Enhanced footer */}
      <footer className="py-10 px-4 relative mt-10 border-t-2 border-yellow-400/30 z-10 bg-gradient-to-br from-red-900/80 to-black/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <PromotionCard />
          </div>
          
          <div className="mb-6 flex justify-center">
            <div className="p-3 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full animate-pulse">
              <Heart className="text-white" size={28} />
            </div>
          </div>
          
          <p className="font-cormorant text-xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-100 italic mb-6">
            "Your presence will make our victory even sweeter! 🏆"
          </p>
          
          <div className="mb-6 bg-gradient-to-br from-red-800/60 to-yellow-600/60 backdrop-blur-sm p-5 rounded-lg border border-yellow-400/30 max-w-md mx-auto">
            <h3 className="font-cormorant text-xl text-yellow-400 mb-3 flex items-center justify-center">
              <MapPin className="mr-2" size={18} />
              Victory Stadium
            </h3>
            <p className="text-yellow-100/90 mb-3">Narendra Modi Stadium, Ahmedabad</p>
            <a 
              href="https://g.co/kgs/45CVZL5" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-yellow-500 to-red-500 text-white rounded-lg hover:scale-105 transition-transform text-sm font-medium"
            >
              <MapPin className="mr-2" size={14} />
              Navigate to Victory
              <ExternalLink size={12} className="ml-2" />
            </a>
          </div>
          
          <div className="text-yellow-100/80 mb-6">
            <p className="flex flex-wrap justify-center gap-4">
              <a href="tel:+919876543210" className="text-yellow-400 hover:text-yellow-300 flex items-center hover:underline">
                <PhoneIcon className="mr-1" />
                RCB Family
              </a>
              <a href="tel:+919876543211" className="text-yellow-400 hover:text-yellow-300 flex items-center hover:underline">
                <PhoneIcon className="mr-1" />
                Trophy Family
              </a>
            </p>
          </div>
          
          <div className="border-t border-yellow-400/20 pt-6">
            <p className="text-yellow-300 font-cormorant text-lg">
              Made with ❤️ by <span className="font-bold text-yellow-400">Team Utsavy</span>
            </p>
            <p className="text-yellow-100/70 text-sm mt-2">
              For custom wedding invitations like this: <span className="text-yellow-400 font-bold">9549461861</span>
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
