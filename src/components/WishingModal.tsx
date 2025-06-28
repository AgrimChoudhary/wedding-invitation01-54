
import React, { useState } from 'react';
import { X, Camera, Send, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { cn } from '@/lib/utils';

interface WishingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (wishData: { message: string; photo?: string }) => void;
  guestName: string;
  maxWishLength?: number;
}

const WishingModal: React.FC<WishingModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  guestName,
  maxWishLength = 280
}) => {
  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Photo size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!message.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSubmit({ 
        message: message.trim(), 
        photo: photo 
      });
      
      // Reset form
      setMessage('');
      setPhoto(undefined);
    } catch (error) {
      console.error('Failed to submit wish:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setMessage('');
      setPhoto(undefined);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gradient-to-br from-cream to-cream/95 border-2 border-gold-light/40 max-w-lg mx-auto rounded-3xl p-0 overflow-hidden shadow-2xl">
        {/* Enhanced Header with decorative elements */}
        <DialogHeader className="relative bg-gradient-to-r from-maroon/10 via-maroon/5 to-maroon/10 p-6 pb-4">
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-gold-light/50"></div>
          <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-gold-light/50"></div>
          
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-300 flex items-center justify-center disabled:opacity-50"
          >
            <X className="text-maroon w-4 h-4" />
          </button>
          
          <DialogTitle className="text-center">
            <h3 className="font-cormorant text-maroon text-3xl font-bold mb-2">
              Share Your Blessing
            </h3>
            <div className="w-16 h-0.5 bg-gold-gradient mx-auto mb-3"></div>
            <p className="text-gold-light/80 text-sm font-opensans">
              Leave a heartfelt wish for the happy couple
            </p>
          </DialogTitle>
        </DialogHeader>

        {/* Enhanced Content */}
        <div className="p-6 pt-4">
          {/* Guest Info with enhanced styling */}
          <div className="flex items-center mb-6 bg-gold-light/10 rounded-xl p-4 border border-gold-light/20">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gold-gradient flex items-center justify-center mr-4 shadow-lg border-2 border-maroon/10">
                {photo ? (
                  <img 
                    src={photo} 
                    alt={guestName}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-maroon font-bold text-lg font-cormorant">
                    {getInitials(guestName)}
                  </span>
                )}
              </div>
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border-2 border-gold-light/30 scale-110"></div>
            </div>
            
            <div className="flex-1">
              <h4 className="font-cormorant text-maroon font-bold text-lg mb-1">
                {guestName}
              </h4>
              <label className="text-gold-light/80 text-sm cursor-pointer flex items-center hover:text-gold-light transition-colors duration-300 group">
                <Camera className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                {photo ? 'Change photo' : 'Add photo (optional)'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  disabled={isSubmitting}
                />
              </label>
            </div>
          </div>

          {/* Enhanced Message Input */}
          <div className="mb-6">
            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your heartfelt wishes, blessings, and beautiful thoughts for the couple's journey together..."
                className="w-full h-36 p-5 bg-white/60 border-2 border-gold-light/30 rounded-xl resize-none focus:outline-none focus:border-gold-light/70 focus:bg-white/70 transition-all duration-300 text-maroon placeholder-maroon/50 font-opensans leading-relaxed shadow-inner"
                maxLength={maxWishLength}
                disabled={isSubmitting}
              />
              {/* Decorative quote marks */}
              <div className="absolute top-3 left-3 text-2xl text-gold-light/30 pointer-events-none">"</div>
            </div>
            
            <div className="flex justify-between items-center mt-3">
              <div className="text-gold-light/60 text-sm font-opensans">
                <span className={cn(
                  "transition-colors duration-300",
                  message.length > maxWishLength * 0.8 ? "text-maroon/70" : ""
                )}>
                  {message.length}
                </span>
                <span className="text-gold-light/40">/{maxWishLength}</span>
              </div>
              
              {message.length > maxWishLength * 0.8 && (
                <div className="text-xs text-maroon/60 font-opensans">
                  {maxWishLength - message.length} characters remaining
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 py-3 px-6 bg-white/60 hover:bg-white/80 text-maroon border-2 border-maroon/20 hover:border-maroon/40 rounded-xl transition-all duration-300 font-medium font-opensans disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!message.trim() || isSubmitting || message.length > maxWishLength}
              className={cn(
                "flex-1 py-3 px-6 bg-gold-gradient text-maroon rounded-xl transition-all duration-300 font-bold font-cormorant flex items-center justify-center space-x-2 relative overflow-hidden",
                (!message.trim() || isSubmitting || message.length > maxWishLength)
                  ? "opacity-50 cursor-not-allowed" 
                  : "hover:scale-105 shadow-lg hover:shadow-gold-light/30 active:scale-95"
              )}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-maroon border-t-transparent rounded-full animate-spin"></div>
                  <span>Sharing...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Share Wish</span>
                </>
              )}
              
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gold-light/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-xl"></div>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WishingModal;
