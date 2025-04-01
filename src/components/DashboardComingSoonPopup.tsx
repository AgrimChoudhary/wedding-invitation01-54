
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Timer, Calendar, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardComingSoonPopupProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const DashboardComingSoonPopup: React.FC<DashboardComingSoonPopupProps> = ({
  open,
  onClose,
  children,
}) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="bg-maroon text-cream border-gold-light/40 sm:max-w-md">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gold-gradient/40 flex items-center justify-center">
              <Timer size={40} className="text-gold-light animate-pulse" />
            </div>
            <span className="absolute -top-1 -right-1">
              <Bell size={16} className="text-gold-light animate-bounce" />
            </span>
          </div>
        </div>
        
        <DialogTitle className="text-center gold-text text-2xl font-cormorant">
          Dashboard Coming Soon
        </DialogTitle>
        
        <DialogDescription className="text-center text-cream/90 font-opensans">
          Our event dashboard is being beautifully crafted with special features to enhance your celebration experience.
        </DialogDescription>
        
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-2 bg-maroon/50 p-3 rounded-lg border border-gold-light/20">
            <Calendar className="text-gold-light flex-shrink-0" size={20} />
            <p className="text-sm text-cream/80">
              The dashboard will allow you to view all event details, RSVP, and access exclusive content.
            </p>
          </div>
          
          <div className="flex justify-center pt-2">
            <Button
              onClick={onClose}
              className="bg-gold-gradient text-maroon hover:bg-gold-gradient/90 font-medium"
            >
              Can't Wait!
            </Button>
          </div>
        </div>
        
        {/* Render children if provided (for future implementation) */}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DashboardComingSoonPopup;
