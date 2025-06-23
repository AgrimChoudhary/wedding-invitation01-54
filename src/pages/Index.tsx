
import React, { useState, useEffect } from 'react';
import { Calendar, Flower, Heart, Music, Paintbrush, Sparkles, Star, Info, Sparkle, CheckCircle, ExternalLink, MapPin, Phone } from 'lucide-react';
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
  BRIDE_NAME, 
  GROOM_NAME, 
  WEDDING_DATE, 
  COUPLE_TAGLINE,
  GUEST_NAME,
  EVENTS,
  BRIDE_FAMILY,
  GROOM_FAMILY,
  PHOTOS,
  VENUE_ADDRESS,
  VENUE_MAP_LINK,
  CONTACTS,
  getOrderedNames,
  getOrderedFamilies
} from '@/constants/placeholders';
import ContactCard from '@/components/ContactCard';
import { getDynamicData } from '@/utils/urlParams';
import { initIframeComm, iframeMessenger } from '@/utils/iframeComm';

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
  const [isInIframe, setIsInIframe] = useState(false);
  const { toast } = useToast();
  
  // Get dynamic data from URL parameters
  const dynamicData = getDynamicData();
  
  // Determine names order based on groomFirst parameter
  const firstName = dynamicData.groomFirst ? (dynamicData.groomName || GROOM_NAME) : (dynamicData.brideName || BRIDE_NAME);
  const secondName = dynamicData.groomFirst ? (dynamicData.brideName || BRIDE_NAME) : (dynamicData.groomName || GROOM_NAME);
  
  // Determine families order based on groomFirst parameter
  const firstFamilyData = dynamicData.groomFirst ? (dynamicData.groomFamily || GROOM_FAMILY) : (dynamicData.brideFamily || BRIDE_FAMILY);
  const secondFamilyData = dynamicData.groomFirst ? (dynamicData.brideFamily || BRIDE_FAMILY) : (dynamicData.groomFamily || GROOM_FAMILY);
  
  useEffect(() => {
    // Check if we're in an iframe
    setIsInIframe(window.self !== window.top);
    
    // Initialize iframe communication with guest name, guestId, and eventId
    const currentGuestName = dynamicData.guestName || GUEST_NAME;
    setGuestName(currentGuestName);
    initIframeComm(currentGuestName, dynamicData.guestId, dynamicData.eventId);
    
    // Disable animations in iframe for better performance
    const cleanup = !isInIframe && (isMobile ? initTouchGlitter() : initCursorGlitter());
    
    const preloadImages = () => {
      const imagesToPreload = dynamicData.photos && dynamicData.photos.length > 0 
        ? dynamicData.photos.slice(0, 2)
        : Object.values(PHOTOS).slice(0, 2).map(photo => Object.values(photo)[0] as string);
      
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
          loadedCount++;
          if (loadedCount === imagesToPreload.length) {
            setImagesLoaded(true);
          }
        };
        img.src = src;
      });
      
      // Fallback timeout
      setTimeout(() => setImagesLoaded(true), 3000);
    };
    
    preloadImages();
    
    // Send ready message to parent frame
    if (isInIframe) {
      window.parent.postMessage({ 
        type: 'template_ready', 
        source: 'wedding-invitation',
        data: { timestamp: new Date().toISOString() }
      }, '*');
    }
    
    return cleanup || (() => {});
  }, [isMobile, navigate, dynamicData, isInIframe]);

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
    
    // Track family viewed event
    iframeMessenger.trackFamilyViewed(family.side);
  };

  const handleAcceptInvitation = () => {
    setInvitationAccepted(true);
    if (!isInIframe) {
      createConfetti();
    }
    
    // Send RSVP_ACCEPTED postMessage to parent as specified in the guide
    iframeMessenger.trackRSVPAccepted();
    
    toast({
      title: "Invitation Accepted!",
      description: `Thank you dear ${guestName} for accepting our invitation, we are looking forward for you in our wedding celebration`,
      variant: "default",
      duration: 5000,
    });
  };

  // Prepare events data from dynamic data or fallback to constants
  const eventsData = dynamicData.events && dynamicData.events.length > 0 ? dynamicData.events : EVENTS;
  const events = eventsData.map(event => ({
    title: dynamicData.events ? event.name : event.EVENT_NAME,
    date: dynamicData.events ? event.date : event.EVENT_DATE,
    time: dynamicData.events ? event.time : event.EVENT_TIME,
    venue: dynamicData.events ? event.venue : event.EVENT_VENUE,
    icon: (dynamicData.events ? event.name : event.EVENT_NAME).includes('Mehndi') ? <Paintbrush size={24} className="text-maroon" /> :
          (dynamicData.events ? event.name : event.EVENT_NAME).includes('Sangeet') ? <Music size={24} className="text-maroon" /> :
          (dynamicData.events ? event.name : event.EVENT_NAME).includes('Haldi') ? <Sparkles size={24} className="text-maroon" /> :
          <Heart size={24} className="text-maroon" />,
    googleMapsUrl: dynamicData.events ? event.mapLink : event.EVENT_VENUE_MAP_LINK
  }));
  
  // Prepare photos data - only show if photos are provided and valid
  const photosToDisplay = dynamicData.photos && dynamicData.photos.length > 0 
    ? dynamicData.photos.map((photoUrl, index) => ({
        src: photoUrl,
        alt: `Couple photo ${index + 1}`,
        width: 600,
        height: 800
      }))
    : PHOTOS.map((photo, index) => {
        const photoKey = Object.keys(photo).find(key => key.startsWith('PHOTO_'));
        return {
          src: photo[photoKey as keyof typeof photo] as string,
          alt: `Couple photo ${index + 1}`,
          width: 600,
          height: 800
        };
      });

  // Transform family data to match FamilyDetails interface - Always show family title even if members are empty
  const firstFamily: FamilyDetails = {
    side: dynamicData.groomFirst ? "groom" : "bride",
    title: firstFamilyData.FAMILY_TITLE || firstFamilyData.title,
    description: firstFamilyData.FAMILY_DESCRIPTION || firstFamilyData.description || '',
    address: firstFamilyData.FAMILY_ADDRESS || firstFamilyData.address || '',
    members: (firstFamilyData.FAMILY_MEMBERS || firstFamilyData.members || []).map(member => ({
      name: member.MEMBER_NAME || member.name,
      relation: member.MEMBER_RELATION || member.relation,
      description: member.MEMBER_DESCRIPTION || member.description || '',
      photo: member.MEMBER_PHOTO || member.photo
    }))
  };

  const secondFamily: FamilyDetails = {
    side: dynamicData.groomFirst ? "bride" : "groom",
    title: secondFamilyData.FAMILY_TITLE || secondFamilyData.title,
    description: secondFamilyData.FAMILY_DESCRIPTION || secondFamilyData.description || '',
    address: secondFamilyData.FAMILY_ADDRESS || secondFamilyData.address || '',
    members: (secondFamilyData.FAMILY_MEMBERS || secondFamilyData.members || []).map(member => ({
      name: member.MEMBER_NAME || member.name,
      relation: member.MEMBER_RELATION || member.relation,
      description: member.MEMBER_DESCRIPTION || member.description || '',
      photo: member.MEMBER_PHOTO || member.photo
    }))
  };
  
  // Use dynamic contacts data if available - with correct field name "phone"
  const contactsToDisplay = dynamicData.contacts && dynamicData.contacts.length > 0 
    ? dynamicData.contacts 
    : CONTACTS.map(contact => ({ name: contact.CONTACT_NAME, phone: contact.CONTACT_NUMBER }));

  return (
    <div className={cn(
      "min-h-screen relative overflow-x-hidden",
      isInIframe ? "iframe-optimized" : ""
    )}>
      {/* Loading screen */}
      {!imagesLoaded && (
        <div className="fixed inset-0 bg-maroon/90 z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-gold-light border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="gold-text font-cormorant text-lg md:text-xl">Loading our love story...</p>
          </div>
        </div>
      )}
      
      {/* Guest welcome banner */}
      {guestName && (
        <div className="bg-gold-gradient text-maroon py-2 px-4 text-center animate-fade-in">
          <p className="font-cormorant text-base md:text-lg lg:text-xl">
            Welcome, <span className="font-bold">{guestName}</span>! We're delighted you could join us.
          </p>
        </div>
      )}
      
      {/* Decorative diyas */}
      {!isInIframe && (
        <>
          <Diya className="top-20" position="left" />
          <Diya className="bottom-20" position="right" delay={0.5} />
        </>
      )}
      
      {/* Header section with improved couple illustration */}
      <header className="pt-6 md:pt-10 lg:pt-12 pb-8 md:pb-10 px-4 relative text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4 md:mb-6 animate-float">
            <div className="inline-block p-1 md:p-1.5 rounded-full bg-gold-gradient">
              <div className="bg-maroon p-1.5 md:p-2 rounded-full">
                <Heart size={isInIframe ? 20 : 28} className="text-gold-light" />
              </div>
            </div>
          </div>
          
          <p className="text-gold-light/90 font-opensans tracking-widest animate-fade-in mb-2 md:mb-3 text-xs md:text-sm">
            WE ARE GETTING MARRIED
          </p>
          
          <h1 className={cn(
            "font-cormorant gold-text font-bold mb-6 md:mb-8 animate-scale-up leading-tight",
            isInIframe ? "text-3xl md:text-5xl lg:text-6xl" : "text-4xl md:text-6xl lg:text-8xl"
          )}>
            {firstName} <span className="text-gold-light font-bold mx-2 md:mx-3 lg:mx-4">&</span> {secondName}
          </h1>
          
          {/* Enhanced Premium Couple Image Frame */}
          <div className="relative mt-8 md:mt-12 mb-8 md:mb-10 flex justify-center">
            <div className="relative">
              {/* Outer luxury frame with gradient border */}
              <div className="absolute -inset-6 md:-inset-8 lg:-inset-10">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-gold-light via-gold-light/80 to-gold-light/60 p-1">
                  <div className="w-full h-full rounded-full bg-maroon"></div>
                </div>
              </div>
              
              {/* Premium ornamental corners with better spacing */}
              <div className="absolute -top-6 -left-6 md:-top-8 md:-left-8 lg:-top-10 lg:-left-10">
                <div className="relative">
                  <div className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 border-l-4 border-t-4 border-gold-light rounded-tl-3xl"></div>
                  <div className="absolute top-2 left-2 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 border-l-2 border-t-2 border-gold-light/60 rounded-tl-2xl"></div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 md:-top-8 md:-right-8 lg:-top-10 lg:-right-10">
                <div className="relative">
                  <div className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 border-r-4 border-t-4 border-gold-light rounded-tr-3xl"></div>
                  <div className="absolute top-2 right-2 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 border-r-2 border-t-2 border-gold-light/60 rounded-tr-2xl"></div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 lg:-bottom-10 lg:-left-10">
                <div className="relative">
                  <div className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 border-l-4 border-b-4 border-gold-light rounded-bl-3xl"></div>
                  <div className="absolute bottom-2 left-2 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 border-l-2 border-b-2 border-gold-light/60 rounded-bl-2xl"></div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 lg:-bottom-10 lg:-right-10">
                <div className="relative">
                  <div className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 border-r-4 border-b-4 border-gold-light rounded-br-3xl"></div>
                  <div className="absolute bottom-2 right-2 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 border-r-2 border-b-2 border-gold-light/60 rounded-br-2xl"></div>
                </div>
              </div>
              
              {/* Premium decorative elements at cardinal points */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
                <div className="w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gold-gradient rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="text-maroon w-4 h-4 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                </div>
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4">
                <div className="w-6 h-6 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gold-gradient rounded-full flex items-center justify-center shadow-lg">
                  <Flower className="text-maroon w-3 h-3 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                </div>
              </div>
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4">
                <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-gold-gradient rounded-full flex items-center justify-center shadow-lg">
                  <Star className="text-maroon w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                </div>
              </div>
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4">
                <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-gold-gradient rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="text-maroon w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                </div>
              </div>
              
              {/* Main couple illustration with enhanced luxury styling */}
              <div className="relative bg-gradient-to-br from-maroon/10 via-transparent to-maroon/10 p-3 md:p-4 lg:p-6 rounded-full">
                <CoupleIllustration className={cn(
                  "drop-shadow-2xl relative z-10",
                  isInIframe ? "w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72" : "w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
                )} />
                
                {/* Enhanced glow effect */}
                <div className="absolute inset-0 bg-gold-gradient opacity-10 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute inset-2 bg-gold-gradient opacity-5 rounded-full blur-xl"></div>
              </div>
              
              {/* Enhanced floating decorative elements */}
              <div className="absolute -top-4 left-6 md:left-10 lg:left-14 animate-float opacity-70">
                <Sparkles className="text-gold-light w-4 h-4 md:w-6 md:h-6 lg:w-7 lg:h-7" />
              </div>
              <div className="absolute -bottom-4 right-6 md:right-10 lg:right-14 animate-float opacity-70" style={{ animationDelay: '0.5s' }}>
                <Star className="text-gold-light w-4 h-4 md:w-6 md:h-6 lg:w-7 lg:h-7" />
              </div>
              <div className="absolute top-8 -right-2 md:-right-4 lg:-right-6 animate-float opacity-50" style={{ animationDelay: '1s' }}>
                <Heart className="text-gold-light w-3 h-3 md:w-5 md:h-5 lg:w-6 lg:h-6" />
              </div>
              <div className="absolute bottom-8 -left-2 md:-left-4 lg:-left-6 animate-float opacity-50" style={{ animationDelay: '1.5s' }}>
                <Flower className="text-gold-light w-3 h-3 md:w-5 md:h-5 lg:w-6 lg:h-6" />
              </div>
            </div>
          </div>
          
          <p className={cn(
            "text-cream italic font-cormorant animate-fade-in mb-6 md:mb-8",
            isInIframe ? "text-lg md:text-xl" : "text-xl md:text-2xl"
          )}>
            "{dynamicData.coupleTagline || COUPLE_TAGLINE}"
          </p>
          
          <div className="animate-fade-in flex justify-center">
            <div className="bg-maroon/50 px-4 md:px-6 py-2 md:py-3 rounded-lg gold-border inline-block">
              <Calendar className="inline-block text-gold-light mr-2 mb-1" size={isInIframe ? 16 : 20} />
              <span className={cn(
                "font-cormorant gold-text",
                isInIframe ? "text-lg md:text-xl" : "text-xl md:text-2xl"
              )}>
                {dynamicData.weddingDate || WEDDING_DATE}
              </span>
              {dynamicData.weddingTime && (
                <>
                  <span className="mx-2 text-gold-light">•</span>
                  <span className={cn(
                    "font-cormorant gold-text",
                    isInIframe ? "text-base md:text-lg" : "text-lg md:text-xl"
                  )}>
                    {dynamicData.weddingTime}
                  </span>
                </>
              )}
            </div>
          </div>
          
          <div className="mt-6 md:mt-10">
            <Countdown className="animate-fade-in" />
          </div>
          
          {/* Interactive buttons - only show outside iframe */}
          {!isInIframe && (
            <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-3 md:gap-4">
              <button 
                className={cn(
                  "relative px-4 md:px-6 py-2 md:py-3 rounded-full transition-all duration-300",
                  "bg-gold-gradient hover:shadow-gold text-maroon font-bold text-sm md:text-base",
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
                  )} size={16} />
                </span>
                <span className="absolute inset-0 bg-gold-light/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></span>
              </button>
              
              <HoverCard>
                <HoverCardTrigger asChild>
                  <button 
                    className={cn(
                      "relative px-4 md:px-6 py-2 md:py-3 rounded-full transition-all duration-300",
                      "border-2 border-gold-light text-gold-light font-bold text-sm md:text-base",
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
                      )} size={16} />
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
          )}
        </div>
      </header>
      
      {/* Mandala container */}
      {isMandalaVisible && !isInIframe && (
        <div 
          id="mandala-container"
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        ></div>
      )}
      
      {/* Family section - moved above events */}
      {((dynamicData.brideFamily && dynamicData.brideFamily.title) || (dynamicData.groomFamily && dynamicData.groomFamily.title) || 
        (!dynamicData.brideFamily && !dynamicData.groomFamily && (BRIDE_FAMILY.FAMILY_TITLE || GROOM_FAMILY.FAMILY_TITLE))) && (
        <section className="py-8 md:py-10 px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className={cn(
              "text-center font-cormorant gold-text font-bold mb-8 md:mb-10",
              isInIframe ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"
            )}>
              Our Families
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* First Family Card */}
              {firstFamily.title && (
                <div 
                  className="group relative bg-gradient-to-br from-maroon/70 via-maroon/60 to-maroon/50 rounded-xl border border-gold-light/40 hover:border-gold-light/80 transition-all duration-300 hover:shadow-lg hover:shadow-gold-light/25 hover:-translate-y-1 overflow-hidden cursor-pointer p-6 md:p-8 text-center animate-fade-in-left"
                  onClick={() => handleFamilyClick(firstFamily)}
                >
                  {/* Decorative elements */}
                  <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-gold-light/50 group-hover:border-gold-light transition-colors duration-300"></div>
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-gold-light/50 group-hover:border-gold-light transition-colors duration-300"></div>
                  
                  {/* Family icon */}
                  <div className="mb-4 flex justify-center">
                    <div className="bg-gold-gradient p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                      {firstFamily.side === "bride" ? (
                        <Flower className="text-maroon w-8 h-8" />
                      ) : (
                        <Heart className="text-maroon w-8 h-8" />
                      )}
                    </div>
                  </div>
                  
                  {/* Family title */}
                  <h3 className="font-cormorant gold-text text-2xl md:text-3xl font-bold mb-3 group-hover:text-gold-light transition-colors duration-300">
                    {firstFamily.title}
                  </h3>
                  
                  {/* Member count */}
                  <p className="text-cream/80 text-sm mb-4">
                    {firstFamily.members.length > 0 
                      ? `${firstFamily.members.length} ${firstFamily.members.length === 1 ? 'Member' : 'Members'}`
                      : 'Family Details'
                    }
                  </p>
                  
                  {/* Click indicator */}
                  <div className="bg-gold-light/20 rounded-full px-4 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 inline-block">
                    <span className="text-gold-light font-medium text-sm">Click to view details</span>
                  </div>
                </div>
              )}
              
              {/* Second Family Card */}
              {secondFamily.title && (
                <div 
                  className="group relative bg-gradient-to-br from-maroon/70 via-maroon/60 to-maroon/50 rounded-xl border border-gold-light/40 hover:border-gold-light/80 transition-all duration-300 hover:shadow-lg hover:shadow-gold-light/25 hover:-translate-y-1 overflow-hidden cursor-pointer p-6 md:p-8 text-center animate-fade-in-right"
                  onClick={() => handleFamilyClick(secondFamily)}
                  style={{ animationDelay: '0.2s' }}
                >
                  {/* Decorative elements */}
                  <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-gold-light/50 group-hover:border-gold-light transition-colors duration-300"></div>
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-gold-light/50 group-hover:border-gold-light transition-colors duration-300"></div>
                  
                  {/* Family icon */}
                  <div className="mb-4 flex justify-center">
                    <div className="bg-gold-gradient p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                      {secondFamily.side === "bride" ? (
                        <Flower className="text-maroon w-8 h-8" />
                      ) : (
                        <Heart className="text-maroon w-8 h-8" />
                      )}
                    </div>
                  </div>
                  
                  {/* Family title */}
                  <h3 className="font-cormorant gold-text text-2xl md:text-3xl font-bold mb-3 group-hover:text-gold-light transition-colors duration-300">
                    {secondFamily.title}
                  </h3>
                  
                  {/* Member count */}
                  <p className="text-cream/80 text-sm mb-4">
                    {secondFamily.members.length > 0 
                      ? `${secondFamily.members.length} ${secondFamily.members.length === 1 ? 'Member' : 'Members'}`
                      : 'Family Details'
                    }
                  </p>
                  
                  {/* Click indicator */}
                  <div className="bg-gold-light/20 rounded-full px-4 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 inline-block">
                    <span className="text-gold-light font-medium text-sm">Click to view details</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
      
      {/* Events section */}
      <section className="py-8 md:py-10 lg:py-12 px-4 relative z-10" id="events">
        <div className="max-w-5xl mx-auto">
          <h2 className={cn(
            "text-center font-cormorant gold-text font-bold mb-8 md:mb-10",
            isInIframe ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"
          )}>
            Celebration Events
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
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
                  isInIframe={isInIframe}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Conditional Photo Gallery - Only show if photos are available */}
      {((dynamicData.photos && dynamicData.photos.length > 0) || (!dynamicData.photos && PHOTOS.length > 0)) && (
        <section className="py-8 md:py-10 px-2 md:px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className={cn(
              "font-cormorant gold-text font-bold mb-6 md:mb-8",
              isInIframe ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"
            )}>
              Our Journey
            </h2>
            
            <PhotoCarousel photos={photosToDisplay} />
          </div>
        </section>
      )}
      
      {/* Accept Invitation Section */}
      <section className="py-8 md:py-10 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {!invitationAccepted ? (
            <button 
              className={cn(
                "relative rounded-full transition-all duration-300 bg-gold-gradient hover:shadow-gold text-maroon font-bold overflow-hidden group transform hover:scale-105",
                isInIframe ? "px-6 py-3 text-base" : "px-8 py-4 text-lg"
              )}
              onClick={handleAcceptInvitation}
            >
              <span className="relative z-10 flex items-center">
                Accept Invitation
                <CheckCircle className="ml-2 transition-transform duration-300 group-hover:scale-125" size={isInIframe ? 18 : 20} />
              </span>
              <span className="absolute inset-0 bg-gold-light/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></span>
            </button>
          ) : (
            <div className="max-w-2xl mx-auto">
              <div className="relative bg-maroon/60 p-6 md:p-8 rounded-2xl gold-border overflow-hidden">
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
      
      {/* Footer with venue and contacts */}
      <footer className="py-8 md:py-10 px-4 relative mt-8 md:mt-10 border-t border-gold-light/30 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4 md:mb-6 flex justify-center">
            <Heart className="text-gold-light animate-heart-beat" size={isInIframe ? 24 : 28} />
          </div>
          
          <p className={cn(
            "font-cormorant gold-text italic mb-4 md:mb-6",
            isInIframe ? "text-lg md:text-xl" : "text-xl"
          )}>
            "Your presence is the greatest blessing."
          </p>
          
          {/* Conditional Venue Information Section */}
          {(dynamicData.venueName || dynamicData.venueAddress || dynamicData.venueMapLink || VENUE_ADDRESS || VENUE_MAP_LINK) && (
            <div className="mb-6 md:mb-8 bg-maroon/40 p-4 md:p-5 rounded-lg gold-border max-w-md mx-auto">
              <h3 className={cn(
                "font-cormorant gold-text mb-3 flex items-center justify-center",
                isInIframe ? "text-lg" : "text-xl"
              )}>
                <MapPin className="mr-2" size={16} />
                {dynamicData.venueName || "Venue Location"}
              </h3>
              {(dynamicData.venueAddress || VENUE_ADDRESS) && (
                <p className="text-cream/90 mb-3 text-sm md:text-base">{dynamicData.venueAddress || VENUE_ADDRESS}</p>
              )}
              {(dynamicData.venueMapLink || VENUE_MAP_LINK) && (
                <a 
                  href={dynamicData.venueMapLink || VENUE_MAP_LINK} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 md:px-4 py-2 bg-gold-gradient text-maroon rounded-lg hover:scale-105 transition-transform text-sm font-medium"
                  onClick={() => iframeMessenger.trackMapClicked(dynamicData.venueName || "Main Venue")}
                >
                  <MapPin className="mr-2" size={14} />
                  View on Google Maps
                  <ExternalLink size={12} className="ml-2" />
                </a>
              )}
            </div>
          )}
          
          {/* Conditional Contact Information Section */}
          {contactsToDisplay.length > 0 && (
            <div className="mb-4 md:mb-6">
              <h3 className={cn(
                "font-cormorant gold-text font-bold mb-4 md:mb-6 flex items-center justify-center",
                isInIframe ? "text-xl" : "text-2xl"
              )}>
                <Phone className="mr-2 md:mr-3" size={isInIframe ? 18 : 20} />
                Contact Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-2xl mx-auto">
                {contactsToDisplay.map((contact, index) => (
                  <ContactCard
                    key={index}
                    name={contact.name}
                    phone={contact.phone}
                    index={index}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    isInIframe={isInIframe}
                  />
                ))}
              </div>
              
              <p className="text-cream/60 text-xs md:text-sm mt-3 md:mt-4 italic">
                Tap any contact card to call directly
              </p>
            </div>
          )}
        </div>
      </footer>
      
      {/* Family Details Dialog */}
      <FamilyDetailsDialog 
        open={familyDialogOpen} 
        onOpenChange={setFamilyDialogOpen} 
        familyDetails={selectedFamily} 
      />
    </div>
  );
};

export default Index;
