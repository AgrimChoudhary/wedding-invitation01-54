
import React, { useState, useEffect } from 'react';
import { Calendar, Flower, Heart, Music, Paintbrush, Sparkles, Star, Info } from 'lucide-react';
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
  description: "The bride's family is known for their warmth and hospitality.",
  members: [
    {
      name: "Ramesh Kumar",
      relation: "Father of the Bride",
      description: "A respected businessman who loves gardening and classical music in his free time.",
    },
    {
      name: "Rameshi Devi",
      relation: "Mother of the Bride",
      description: "A loving homemaker known for her delicious cooking and kind heart.",
    },
    {
      name: "Priya Kumar",
      relation: "The Bride",
      description: "A software engineer who loves to paint and travel. She met Vijay during a company hackathon.",
    },
    {
      name: "Rahul Kumar",
      relation: "Brother of the Bride",
      description: "Currently studying medicine and aspires to be a neurosurgeon.",
    }
  ]
};

const groomFamily: FamilyDetails = {
  side: "groom",
  title: "Harkesh & Harkeshi Family",
  description: "The groom's family has a rich cultural heritage and is known for their contributions to arts and education.",
  members: [
    {
      name: "Harkesh Singh",
      relation: "Father of the Groom",
      description: "A retired professor who now spends his time writing books on history.",
    },
    {
      name: "Harkeshi Kaur",
      relation: "Mother of the Groom",
      description: "A talented classical dancer who has taught dance to hundreds of students.",
    },
    {
      name: "Vijay Singh",
      relation: "The Groom",
      description: "A product manager who is passionate about photography and mountain climbing.",
    },
    {
      name: "Anita Singh",
      relation: "Sister of the Groom",
      description: "An architect who loves designing sustainable buildings.",
    }
  ]
};

// Sample photos for the carousel
const weddingPhotos = [
  {
    src: "/lovable-uploads/5afd7a5a-50bd-433d-8e23-7e0d3aa5b16f.png",
    alt: "Couple at engagement ceremony",
    caption: "Our Engagement Day"
  },
  {
    src: "/lovable-uploads/5d906655-818b-462e-887e-0a392db20d48.png",
    alt: "Pre-wedding photoshoot",
    caption: "Pre-wedding Photoshoot"
  },
  {
    src: "/lovable-uploads/6d392f5b-28f1-4710-9eda-8e7c1a9bfe8e.png",
    alt: "First date memory",
    caption: "Where It All Began"
  },
  {
    src: "/lovable-uploads/762354ab-cff9-4c6a-9800-94eeefc3c43c.png",
    alt: "Proposal moment",
    caption: "The Proposal"
  }
];

// The actual Index component
const Index = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [familyDialogOpen, setFamilyDialogOpen] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState<FamilyDetails | null>(null);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    initCursorGlitter();
    initTouchGlitter();
    createMandalaEffect();

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const handleFamilyOpen = (family: FamilyDetails) => {
    setSelectedFamily(family);
    setFamilyDialogOpen(true);
  };

  const handleFamilyClose = () => {
    setFamilyDialogOpen(false);
    setSelectedFamily(null);
  };

  return (
    <div className="font-cormorant relative overflow-hidden">

      <FamilyDetailsDialog 
        open={familyDialogOpen}
        onOpenChange={setFamilyDialogOpen}
        familyDetails={selectedFamily}
      />

      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0" style={{ backgroundImage: "url('/bg-flower.svg')" }}></div>
      <div id="glitter-container" className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"></div>

      {/* Header Section */}
      <header className="pt-6 pb-4 px-4 text-center relative z-10">
        <GaneshaHeader />
        <h1 className="text-3xl sm:text-5xl text-maroon font-bold mt-4">Priya & Vijay</h1>
        <p className="text-xl sm:text-2xl text-gold-light mt-2">
          <Calendar className="inline-block mr-1 mb-1 h-5 w-5 text-gold-light" />
          30th March 2025
        </p>
      </header>

      {/* Couple Illustration */}
      <section className="px-4 relative z-10">
        <CoupleIllustration />
      </section>

      {/* Countdown Section */}
      <section className="py-8 px-4 text-center relative z-10">
        <h2 className="text-2xl sm:text-3xl text-maroon font-semibold mb-4">Countdown to Our Special Day</h2>
        <Countdown targetDate="2025-03-30T00:00:00" />
      </section>

      {/* Event Details Section */}
      <section className="py-8 px-4 relative z-10">
        <h2 className="text-2xl sm:text-3xl text-maroon font-semibold text-center mb-6">Event Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EventCard
            icon={<Flower className="text-gold-light h-6 w-6" />}
            title="Haldi Ceremony"
            date="29th March 2025"
            time="10:00 AM"
            venue="Bride's Residence"
            description="A traditional ceremony where the bride and groom are blessed with turmeric paste."
          />
          <EventCard
            icon={<Heart className="text-gold-light h-6 w-6" />}
            title="Wedding Ceremony"
            date="30th March 2025"
            time="11:00 AM"
            venue="The Grand Venue, City Center"
            description="The main event where Priya and Vijay will exchange vows and begin their journey as one."
          />
          <EventCard
            icon={<Music className="text-gold-light h-6 w-6" />}
            title="Sangeet Night"
            date="29th March 2025"
            time="7:00 PM"
            venue="The Grand Venue, City Center"
            description="A night filled with music, dance, and celebration as we rejoice in the union of Priya and Vijay."
          />
          <EventCard
            icon={<Paintbrush className="text-gold-light h-6 w-6" />}
            title="Reception"
            date="30th March 2025"
            time="7:00 PM"
            venue="The Grand Venue, City Center"
            description="A grand reception to celebrate the newlyweds with friends, family, and well-wishers."
          />
        </div>
      </section>

      {/* Photo Carousel Section */}
      <section className="py-8 px-4 relative z-10">
        <h2 className="text-2xl sm:text-3xl text-maroon font-semibold text-center mb-6">Our Memories</h2>
        <PhotoCarousel photos={weddingPhotos} />
      </section>

      {/* Family Details Section */}
      <section className="py-8 px-4 relative z-10">
        <h2 className="text-2xl sm:text-3xl text-maroon font-semibold text-center mb-6">Our Families</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <button 
              onClick={() => handleFamilyOpen(brideFamily)}
              className="bg-gold-light text-maroon py-3 px-6 rounded-full font-semibold hover:bg-gold-light/80 transition-colors"
            >
              Meet the Bride's Family
            </button>
          </div>
          <div className="text-center">
            <button 
              onClick={() => handleFamilyOpen(groomFamily)}
              className="bg-gold-light text-maroon py-3 px-6 rounded-full font-semibold hover:bg-gold-light/80 transition-colors"
            >
              Meet the Groom's Family
            </button>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="py-8 px-4 relative z-10">
        <h2 className="text-2xl sm:text-3xl text-maroon font-semibold text-center mb-6">Dashboard</h2>
        <DashboardComingSoonPopup open={dashboardOpen} onClose={() => setDashboardOpen(false)}>
          <Dashboard open={dashboardOpen} onClose={() => setDashboardOpen(false)} />
        </DashboardComingSoonPopup>
        <div className="text-center mt-4">
          <button 
            onClick={() => setDashboardOpen(true)}
            className="bg-gold-light text-maroon py-3 px-6 rounded-full font-semibold hover:bg-gold-light/80 transition-colors"
          >
            Open Wedding Dashboard
          </button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-6 px-4 text-center text-cream relative z-10">
        <p className="text-base">
          <Sparkles className="inline-block mr-1 mb-1 h-4 w-4 text-gold-light" />
          Made with Love <Heart className="inline-block mx-1 h-4 w-4 text-red-500" /> by Priya & Vijay
        </p>
        <p className="text-sm mt-2">
          <Info className="inline-block mr-1 mb-1 h-4 w-4 text-gold-light" />
          For any queries, contact us at: <PhoneIcon className="inline-block mx-1 h-4 w-4 text-gold-light" /> +91-9999999999
        </p>
      </footer>
    </div>
  );
};

export default Index;
