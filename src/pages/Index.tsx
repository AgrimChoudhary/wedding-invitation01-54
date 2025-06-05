
import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Clock, Heart, Users, Music, Phone, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Dashboard from '@/components/Dashboard';
import EnhancedHeader from '@/components/EnhancedHeader';
import AnimatedEventCard from '@/components/AnimatedEventCard';
import EnhancedPhotoCarousel from '@/components/EnhancedPhotoCarousel';
import FamilyDetailsDialog from '@/components/FamilyDetailsDialog';
import PhoneIcon from '@/components/PhoneIcon';
import { cn } from '@/lib/utils';

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [showFamilyDialog, setShowFamilyDialog] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedName = localStorage.getItem('guestName') || 'Dear Guest';
    setGuestName(storedName);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-maroon flex items-center justify-center">
        <div className="text-gold-light text-xl font-cormorant">Loading...</div>
      </div>
    );
  }

  const events = [
    {
      title: "Mehndi Ceremony",
      date: "28th March 2025",
      time: "4:00 PM onwards",
      venue: "Family Residence",
      description: "Join us for the beautiful Mehndi ceremony filled with music, dance, and intricate henna designs.",
      icon: <Heart className="text-maroon" size={20} fill="currentColor" />
    },
    {
      title: "Sangeet Night",
      date: "28th March 2025", 
      time: "7:00 PM onwards",
      venue: "Grand Celebration Hall",
      description: "A night of music, dance, and celebration as our families come together in joy.",
      icon: <Music className="text-maroon" size={20} />
    },
    {
      title: "Haldi Ceremony",
      date: "29th March 2025",
      time: "10:00 AM onwards", 
      venue: "Family Residence",
      description: "Traditional turmeric ceremony for blessings and purification before the wedding.",
      icon: <Sparkles className="text-maroon" size={20} />
    },
    {
      title: "Wedding Ceremony",
      date: "30th March 2025",
      time: "6:00 AM onwards",
      venue: "The Royal Celebration Hall",
      description: "The sacred union ceremony where two souls become one in the presence of family and friends.",
      icon: <Heart className="text-maroon" size={20} fill="currentColor" />
    }
  ];

  return (
    <div className="min-h-screen bg-maroon text-cream relative overflow-hidden">
      {/* Enhanced background patterns */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-5">
          <div className="rangoli-pattern w-full h-full"></div>
        </div>
        {/* Floating decorative elements */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gold-light/10 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Enhanced Header */}
          <EnhancedHeader />

          {/* Welcome Message with enhanced styling */}
          <div className="text-center mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="bg-maroon/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 gold-border max-w-2xl mx-auto relative overflow-hidden">
              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-gold-light/30 rounded-tl-2xl"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-gold-light/30 rounded-br-2xl"></div>
              
              <h2 className="font-cormorant text-2xl md:text-3xl font-bold gold-text mb-4">
                Welcome, {guestName}!
              </h2>
              <p className="text-cream/90 font-opensans leading-relaxed text-base md:text-lg">
                We are honored to invite you to witness and celebrate our sacred union. 
                Your presence will make our special day even more meaningful.
              </p>
              
              {/* Decorative hearts */}
              <div className="flex justify-center mt-4 space-x-4">
                <Heart className="text-rosegold animate-heart-beat" size={20} fill="currentColor" />
                <Heart className="text-gold-light animate-heart-beat" size={16} fill="currentColor" style={{ animationDelay: '0.3s' }} />
                <Heart className="text-rosegold animate-heart-beat" size={20} fill="currentColor" style={{ animationDelay: '0.6s' }} />
              </div>
            </div>
          </div>

          {/* Enhanced Photo Carousel */}
          <EnhancedPhotoCarousel />

          {/* Events Section with enhanced cards */}
          <div className="mb-12">
            <div className="text-center mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h2 className="font-cormorant text-3xl md:text-4xl font-bold gold-text mb-4 flex items-center justify-center gap-3">
                <Calendar className="text-gold-light animate-pulse" size={32} />
                Celebration Events
                <Sparkles className="text-rosegold animate-pulse" size={32} />
              </h2>
              <p className="text-cream/80 font-opensans italic">A series of joyous celebrations leading to our union</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {events.map((event, index) => (
                <AnimatedEventCard
                  key={event.title}
                  {...event}
                  delay={0.1 * index}
                  className={index % 2 === 0 ? "md:-rotate-1" : "md:rotate-1"}
                />
              ))}
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="text-center space-y-6 mb-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
              <Button
                onClick={() => setShowFamilyDialog(true)}
                className="group bg-gold-gradient text-maroon hover:scale-105 transition-all duration-300 font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-gold relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <Users className="mr-2 group-hover:animate-bounce" size={20} />
                Meet Our Families
              </Button>
              
              <Button
                onClick={() => setShowDashboard(true)}
                className="group bg-maroon/60 text-gold-light border-2 border-gold-light hover:bg-gold-gradient hover:text-maroon hover:border-transparent transition-all duration-300 font-medium px-8 py-3 rounded-full shadow-lg relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <MapPin className="mr-2 group-hover:animate-bounce" size={20} />
                Event Details
              </Button>
            </div>

            {/* Contact Information with enhanced styling */}
            <div className="bg-maroon/40 backdrop-blur-sm rounded-2xl p-6 gold-border max-w-lg mx-auto animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <h3 className="font-cormorant text-xl font-bold gold-text mb-4 flex items-center justify-center gap-2">
                <PhoneIcon size={20} className="text-gold-light" />
                Contact Us
              </h3>
              <div className="space-y-3 text-center">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-cream/90 font-opensans">Priya's Family:</span>
                  <a 
                    href="tel:+919876543210" 
                    className="text-gold-light hover:text-gold-dark transition-colors duration-300 font-medium"
                  >
                    +91 9876 543 210
                  </a>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-cream/90 font-opensans">Vijay's Family:</span>
                  <a 
                    href="tel:+919876543211" 
                    className="text-gold-light hover:text-gold-dark transition-colors duration-300 font-medium"
                  >
                    +91 9876 543 211
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Footer Quote */}
          <div className="text-center animate-fade-in" style={{ animationDelay: '1s' }}>
            <div className="max-w-3xl mx-auto">
              <blockquote className="font-cormorant text-xl md:text-2xl italic text-cream/90 leading-relaxed mb-4">
                "Two hearts, one soul, endless love. Join us as we begin our forever journey together."
              </blockquote>
              <div className="flex justify-center space-x-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Heart 
                    key={i} 
                    className="text-rosegold animate-heart-beat" 
                    size={16} 
                    fill="currentColor"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Dialogs */}
        <Dashboard
          open={showDashboard}
          onClose={() => setShowDashboard(false)}
        />

        <FamilyDetailsDialog
          open={showFamilyDialog}
          onClose={() => setShowFamilyDialog(false)}
        />
      </div>
    </div>
  );
};

export default Index;
