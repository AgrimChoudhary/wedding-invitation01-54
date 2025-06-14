
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, Users, Plus } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-maroon flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8 animate-float">
          <div className="inline-block p-3 rounded-full bg-gold-gradient">
            <div className="bg-maroon p-3 rounded-full">
              <Heart size={40} className="text-gold-light" />
            </div>
          </div>
        </div>
        
        <h1 className="font-cormorant text-5xl md:text-6xl gold-text font-bold mb-6 animate-scale-up">
          Wedding Invitation
        </h1>
        
        <p className="text-cream text-xl md:text-2xl mb-8 font-cormorant italic">
          Create beautiful, personalized wedding invitations for your special day
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-maroon/60 backdrop-blur-sm rounded-xl p-6 gold-border">
            <Sparkles className="text-gold-light mx-auto mb-4" size={32} />
            <h3 className="font-cormorant text-xl gold-text font-bold mb-2">
              Beautiful Designs
            </h3>
            <p className="text-cream/80">
              Elegant and customizable wedding invitation templates
            </p>
          </div>
          
          <div className="bg-maroon/60 backdrop-blur-sm rounded-xl p-6 gold-border">
            <Users className="text-gold-light mx-auto mb-4" size={32} />
            <h3 className="font-cormorant text-xl gold-text font-bold mb-2">
              Guest Management
            </h3>
            <p className="text-cream/80">
              Easy guest list management with personalized links
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={() => navigate('/customize')}
            className="w-full md:w-auto bg-gold-gradient text-maroon font-bold py-3 px-8 hover:scale-105 transition-transform text-lg"
          >
            <Plus className="mr-2" size={20} />
            Create New Invitation
          </Button>
          
          <div className="text-center">
            <Button 
              onClick={() => navigate('/invitation')}
              variant="outline"
              className="border-gold-light text-gold-light hover:bg-gold-light hover:text-maroon"
            >
              View Sample Invitation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
