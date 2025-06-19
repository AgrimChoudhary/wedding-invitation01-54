import React, { useState, useEffect } from 'react';
import { Calendar, Flower, Heart, Music, Paintbrush, Sparkles, Star, Info, Sparkle, CheckCircle, ExternalLink, MapPin, Phone, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import EventCard from '@/components/EventCard';
import PhotoCarousel from '@/components/PhotoCarousel';
import Countdown from '@/components/Countdown';
import GaneshaHeader from '@/components/GaneshaHeader';
import CoupleIllustration from '@/components/CoupleIllustration';
import { initCursorGlitter, initTouchGlitter, createMandalaEffect } from '@/utils/animationUtils';
import { createConfetti } from '@/utils/confettiUtils';
import { useIsMobile } from '@/hooks/use-mobile';
import PhoneIcon from '@/components/PhoneIcon';
import { useNavigate } from 'react-router-dom';
import Diya from '@/components/Diya';
import FamilyDetailsDialog, { FamilyDetails } from '@/components/FamilyDetailsDialog';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { useToast } from '@/hooks/use-toast';
import { 
  trackInvitationViewed, 
  trackInvitationAccepted, 
  trackPageInteraction,
  trackError
} from '@/utils/iframeComm';
import { 
  BRIDE_NAME, 
  GROOM_NAME, 
  WEDDING_DATE, 
  COUPLE_TAGLINE,
  GUEST_NAME,
  EVENTS,
  BRIDE_FAMILY,
  GROOM_FAMILY,
  PHOTOS,
  VENUE_NAME,
  VENUE_ADDRESS,
  VENUE_MAP_LINK,
  CONTACTS,
  SHOW_PHOTO_GALLERY,
  SHOW_VENUE_DETAILS,
  SHOW_CONTACT_DETAILS,
  getOrderedNames,
  getOrderedFamilies
} from '@/constants/placeholders';

const Index = () => {
  const navigate = useNavigate();
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [isMandalaVisible, setIsMandalaVisible] = useState(false);
  const isMobile = useIsMobile();
  const [guestName, setGuestName] = useState(GUEST_NAME);
  const [selectedFamily, setSelectedFamily] = useState<FamilyDetails | null>(null);
  const [familyDialogOpen, setFamilyDialogOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [invitationAccepted, setInvitationAccepted] = useState(false);
  const [invitationViewed, setInvitationViewed] = useState(false);
  const { toast } = useToast();
  
  const orderedNames = getOrderedNames();
  const orderedFamilies = getOrderedFamilies();
  
  useEffect(() => {
    const storedName = localStorage.getItem('guestName');
    if (storedName) {
      setGuestName(storedName);
    }
    
    const cleanup = isMobile ? initTouchGlitter() : initCursorGlitter();
    
    const preloadImages = () => {
      if (SHOW_PHOTO_GALLERY && PHOTOS.length > 0) {
        const imagesToPreload = PHOTOS.slice(0, 2).map(photo => Object.values(photo)[0]);
        let loadedCount = 0;
        
        imagesToPreload.forEach(src => {
          const img = new Image();
          img.onload = () => {
            loadedCount++;
            if (loadedCount === imagesToPreload.length) {
              setImagesLoaded(true);
            }
          };
          img.onerror = () => {
            trackError('Image loading failed', { src });
            loadedCount++;
            if (loadedCount === imagesToPreload.length) {
              setImagesLoaded(true);
            }
          };
          img.src = src as string;
        });
      } else {
        setImagesLoaded(true);
      }
    };
    
    preloadImages();
    
    return cleanup;
  }, [isMobile, navigate]);

  // Track invitation viewed when component mounts and content is loaded
  useEffect(() => {
    if (imagesLoaded && !invitationViewed) {
      const timer = setTimeout(() => {
        trackInvitationViewed(GUEST_NAME);
        setInvitationViewed(true);
        console.log('Invitation viewed event tracked');
      }, 1000); // Wait 1 second to ensure full load
      
      return () => clearTimeout(timer);
    }
  }, [imagesLoaded, invitationViewed]);

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
    trackPageInteraction('family_details_viewed', { familySide: family.side });
    setSelectedFamily(family);
    setFamilyDialogOpen(true);
  };

  const handleAcceptInvitation = () => {
    setInvitationAccepted(true);
    createConfetti();
    trackInvitationAccepted(GUEST_NAME, guestName);
    toast({
      title: "Invitation Accepted!",
      description: `Thank you dear ${guestName} for accepting our invitation, we are looking forward for you in our wedding celebration`,
      variant: "default",
      duration: 5000,
    });
  };

  const events = EVENTS.map(event => ({
    title: event.EVENT_NAME,
    date: event.EVENT_DATE,
    time: event.EVENT_TIME,
    venue: event.EVENT_VENUE,
    icon: event.EVENT_NAME.includes('Mehndi') ? <Paintbrush size={24} className="text-maroon" /> :
          event.EVENT_NAME.includes('Sangeet') ? <Music size={24} className="text-maroon" /> :
          event.EVENT_NAME.includes('Haldi') ? <Sparkles size={24} className="text-maroon" /> :
          <Heart size={24} className="text-maroon" />,
    googleMapsUrl: event.EVENT_VENUE_MAP_LINK
  }));
  
  const photos = SHOW_PHOTO_GALLERY ? PHOTOS.map((photo, index) => {
    const photoKey = Object.keys(photo).find(key => key.startsWith('PHOTO_'));
    return {
      src: photo[photoKey as keyof typeof photo] as string,
      alt: `Couple photo ${index + 1}`,
      width: 600,
      height: 800
    };
  }) : [];

  // Transform family data to match FamilyDetails interface using ordered families
  const firstFamily: FamilyDetails = {
    side: orderedFamilies.firstFamily.FAMILY_SIDE as "bride" | "groom",
    title: orderedFamilies.firstFamily.FAMILY_TITLE,
    description: orderedFamilies.firstFamily.FAMILY_DESCRIPTION,
    address: orderedFamilies.firstFamily.FAMILY_ADDRESS,
    members: orderedFamilies.firstFamily.FAMILY_MEMBERS.map(member => ({
      name: member.MEMBER_NAME,
      relation: member.MEMBER_RELATION,
      description: member.MEMBER_DESCRIPTION,
      photo: member.MEMBER_PHOTO
    }))
  };

  const secondFamily: FamilyDetails = {
    side: orderedFamilies.secondFamily.FAMILY_SIDE as "bride" | "groom",
    title: orderedFamilies.secondFamily.FAMILY_TITLE,
    description: orderedFamilies.secondFamily.FAMILY_DESCRIPTION,
    address: orderedFamilies.secondFamily.FAMILY_ADDRESS,
    members: orderedFamilies.secondFamily.FAMILY_MEMBERS.map(member => ({
      name: member.MEMBER_NAME,
      relation: member.MEMBER_RELATION,
      description: member.MEMBER_DESCRIPTION,
      photo: member.MEMBER_PHOTO
    }))
  };
  
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
            {orderedNames.firstName} <span className="inline-block mx-1 md:mx-3">&</span> {orderedNames.secondName}
          </h1>
          
          <p className="text-cream text-xl md:text-2xl italic font-cormorant animate-fade-in">
            "{COUPLE_TAGLINE}"
          </p>
          
          <div className="mt-8 flex justify-center">
            <CoupleIllustration className="w-64 h-64 md:w-80 md:h-80" />
          </div>
          
          <div className="mt-8 animate-fade-in flex justify-center">
            <div className="bg-maroon/50 px-6 py-3 rounded-lg gold-border inline-block">
              <Calendar className="inline-block text-gold-light mr-2 mb-1" size={20} />
              <span className="font-cormorant text-xl md:text-2xl gold-text">
                {WEDDING_DATE}
              </span>
            </div>
          </div>
          
          <div className="mt-10">
            <Countdown className="animate-fade-in" />
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button 
              className={cn(
                "relative px-6 py-3 rounded-full transition-all duration-300",
                "bg-gold-gradient hover:shadow-gold text-maroon font-bold",
                "overflow-hidden group",
                showHearts && "bg-opacity-100"
              )}
              onClick={() => {
                setShowHearts(!showHearts);
                trackPageInteraction('hearts_toggled', { enabled: !showHearts });
              }}
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
                  onClick={() => {
                    setIsMandalaVisible(!isMandalaVisible);
                    trackPageInteraction('mandala_toggled', { enabled: !isMandalaVisible });
                  }}
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
      
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-cormorant text-3xl md:text-4xl gold-text font-bold mb-4">
              Meet Our Families
            </h2>
            <p className="text-cream/80 text-lg font-cormorant italic">
              Click to discover our loving families
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div 
              className="group relative bg-gradient-to-br from-maroon/80 via-maroon/70 to-maroon/60 rounded-2xl p-6 border-2 border-gold-light/50 hover:border-gold-light/90 animate-fade-in-left cursor-pointer transform transition-all duration-500 hover:shadow-2xl hover:shadow-gold-light/30 hover:-translate-y-3 overflow-hidden"
              onClick={() => handleFamilyClick(firstFamily)}
            >
              <div className="absolute top-3 right-3 bg-gold-gradient text-maroon px-3 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                Click to View
              </div>
              
              <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-gold-light/70 group-hover:border-gold-light transition-colors duration-300"></div>
              <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-gold-light/70 group-hover:border-gold-light transition-colors duration-300"></div>
              
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-light/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-5">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gold-gradient rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative bg-gradient-to-br from-gold-light to-gold-dark p-4 rounded-full shadow-xl ring-4 ring-gold-light/20 group-hover:ring-gold-light/50 transition-all duration-300 group-hover:scale-110">
                      {firstFamily.side === "bride" ? (
                        <Flower className="text-maroon h-8 w-8" />
                      ) : (
                        <Star className="text-maroon h-8 w-8" />
                      )}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-center font-cormorant text-xl md:text-2xl gold-text mb-3 group-hover:text-gold-light transition-colors duration-300">
                  {firstFamily.side === "bride" ? "Bride's Family" : "Groom's Family"}
                </h3>
                
                <div className="w-24 h-0.5 bg-gold-gradient mx-auto mb-4 rounded-full group-hover:w-32 transition-all duration-300"></div>
                
                <p className="text-center text-cream text-lg font-cormorant font-medium tracking-wide mb-4">
                  {firstFamily.title}
                </p>
                
                <div className="flex justify-center">
                  <div className="bg-gradient-to-r from-gold-light/20 to-gold-dark/20 backdrop-blur-sm border border-gold-light/30 rounded-full px-3 py-1">
                    <p className="text-gold-light text-sm font-medium">
                      {firstFamily.members.length} Members
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div 
              className="group relative bg-gradient-to-br from-maroon/80 via-maroon/70 to-maroon/60 rounded-2xl p-6 border-2 border-gold-light/50 hover:border-gold-light/90 animate-fade-in-right cursor-pointer transform transition-all duration-500 hover:shadow-2xl hover:shadow-gold-light/30 hover:-translate-y-3 overflow-hidden"
              onClick={() => handleFamilyClick(secondFamily)}
            >
              <div className="absolute top-3 right-3 bg-gold-gradient text-maroon px-3 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                Click to View
              </div>
              
              <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-gold-light/70 group-hover:border-gold-light transition-colors duration-300"></div>
              <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-gold-light/70 group-hover:border-gold-light transition-colors duration-300"></div>
              
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-light/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-5">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gold-gradient rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative bg-gradient-to-br from-gold-light to-gold-dark p-4 rounded-full shadow-xl ring-4 ring-gold-light/20 group-hover:ring-gold-light/50 transition-all duration-300 group-hover:scale-110">
                      {secondFamily.side === "bride" ? (
                        <Flower className="text-maroon h-8 w-8" />
                      ) : (
                        <Star className="text-maroon h-8 w-8" />
                      )}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-center font-cormorant text-xl md:text-2xl gold-text mb-3 group-hover:text-gold-light transition-colors duration-300">
                  {secondFamily.side === "bride" ? "Bride's Family" : "Groom's Family"}
                </h3>
                
                <div className="w-24 h-0.5 bg-gold-gradient mx-auto mb-4 rounded-full group-hover:w-32 transition-all duration-300"></div>
                
                <p className="text-center text-cream text-lg font-cormorant font-medium tracking-wide mb-4">
                  {secondFamily.title}
                </p>
                
                <div className="flex justify-center">
                  <div className="bg-gradient-to-r from-gold-light/20 to-gold-dark/20 backdrop-blur-sm border border-gold-light/30 rounded-full px-3 py-1">
                    <p className="text-gold-light text-sm font-medium">
                      {secondFamily.members.length} Members
                    </p>
                  </div>
                </div>
              </div>
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
      
      {/* Conditional Photo Gallery Section */}
      {SHOW_PHOTO_GALLERY && (
        <section className="py-10 px-2 md:px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-cormorant text-3xl md:text-4xl gold-text font-bold mb-8">
              Our Journey
            </h2>
            
            <PhotoCarousel photos={photos} />
          </div>
        </section>
      )}
      
      {/* Accept Invitation Section - Enhanced with better design */}
      <section className="py-10 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {!invitationAccepted ? (
            <button 
              className="relative px-8 py-4 rounded-full transition-all duration-300 bg-gold-gradient hover:shadow-gold text-maroon font-bold text-lg overflow-hidden group transform hover:scale-105"
              onClick={handleAcceptInvitation}
            >
              <span className="relative z-10 flex items-center">
                Accept Invitation
                <CheckCircle className="ml-2 transition-transform duration-300 group-hover:scale-125" size={20} />
              </span>
              <span className="absolute inset-0 bg-gold-light/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></span>
            </button>
          ) : (
            <div className="max-w-2xl mx-auto">
              <div className="relative bg-maroon/60 p-8 rounded-2xl gold-border overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-8 h-8 border-2 border-gold-light rounded-full"></div>
                  <div className="absolute top-4 right-4 w-6 h-6 border-2 border-gold-light rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-2 border-gold-light rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-2 border-gold-light rounded-full"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="mb-4">
                    <CheckCircle className="mx-auto text-green-400 animate-pulse" size={48} />
                  </div>
                  
                  <h3 className="font-cormorant text-2xl md:text-3xl gold-text font-bold mb-4">
                    Invitation Accepted!
                  </h3>
                  
                  <div className="bg-gold-gradient/20 p-6 rounded-xl border border-gold-light/30">
                    <p className="text-cream text-lg md:text-xl font-cormorant leading-relaxed">
                      "Thank you dear <span className="gold-text font-bold">{guestName}</span> for accepting our invitation, we are looking forward for you in our wedding celebration"
                    </p>
                  </div>
                  
                  <div className="mt-6 flex justify-center space-x-2">
                    <Heart className="text-gold-light animate-heart-beat" size={20} />
                    <Heart className="text-gold-light animate-heart-beat" size={20} style={{ animationDelay: '0.2s' }} />
                    <Heart className="text-gold-light animate-heart-beat" size={20} style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Enhanced Footer Section with Improved Design */}
      <footer className="py-12 px-4 relative mt-10 border-t border-gold-light/30 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex justify-center">
            <Heart className="text-gold-light animate-heart-beat" size={32} />
          </div>
          
          <p className="font-cormorant text-2xl gold-text italic mb-10 text-center">
            "Your presence is the greatest blessing."
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Main Venue Section - Only show if venue data exists */}
            {SHOW_VENUE_DETAILS && (
              <div className="bg-gradient-to-br from-maroon/60 via-maroon/50 to-maroon/40 p-6 rounded-2xl gold-border hover:shadow-2xl hover:shadow-gold-light/20 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-gold-gradient p-3 rounded-full mr-4">
                    <MapPin className="text-maroon" size={24} />
                  </div>
                  <h3 className="font-cormorant text-2xl gold-text font-bold">
                    {VENUE_NAME || "Venue Location"}
                  </h3>
                </div>
                
                {VENUE_ADDRESS && (
                  <p className="text-cream/90 mb-4 text-lg leading-relaxed">
                    {VENUE_ADDRESS}
                  </p>
                )}
                
                {VENUE_MAP_LINK && (
                  <a 
                    href={VENUE_MAP_LINK} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => trackPageInteraction('venue_map_clicked')}
                    className="inline-flex items-center justify-center px-6 py-3 bg-gold-gradient text-maroon rounded-xl hover:scale-105 transition-transform text-base font-medium shadow-lg hover:shadow-gold"
                  >
                    <MapPin className="mr-2" size={18} />
                    View on Google Maps
                    <ExternalLink size={16} className="ml-2" />
                  </a>
                )}
              </div>
            )}
            
            {/* Contact Section - Only show if contact data exists */}
            {SHOW_CONTACT_DETAILS && (
              <div className="bg-gradient-to-br from-maroon/60 via-maroon/50 to-maroon/40 p-6 rounded-2xl gold-border hover:shadow-2xl hover:shadow-gold-light/20 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-gold-gradient p-3 rounded-full mr-4">
                    <Users className="text-maroon" size={24} />
                  </div>
                  <h3 className="font-cormorant text-2xl gold-text font-bold">
                    Contact Details
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {CONTACTS.map((contact, index) => (
                    <div key={index} className="flex items-center p-3 bg-gold-gradient/10 rounded-xl border border-gold-light/20 hover:bg-gold-gradient/20 transition-colors duration-300">
                      <div className="bg-gold-light/20 p-2 rounded-full mr-3">
                        <Phone className="text-gold-light" size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="gold-text font-medium text-lg">{contact.CONTACT_NAME}</p>
                        <a 
                          href={`tel:${contact.CONTACT_NUMBER}`} 
                          onClick={() => trackPageInteraction('contact_called', { contact: contact.CONTACT_NAME })}
                          className="text-cream/80 hover:text-gold-light transition-colors duration-300 text-base"
                        >
                          {contact.CONTACT_NUMBER}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Fallback message if no venue or contact details */}
          {!SHOW_VENUE_DETAILS && !SHOW_CONTACT_DETAILS && (
            <div className="text-center py-8">
              <div className="bg-maroon/40 p-6 rounded-xl gold-border max-w-md mx-auto">
                <Heart className="mx-auto text-gold-light mb-3" size={32} />
                <p className="text-cream/80 font-cormorant text-lg">
                  Contact details will be shared soon
                </p>
              </div>
            </div>
          )}
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
