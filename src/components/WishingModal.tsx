
import React, { useState } from 'react';
import { X, Camera, Send } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { cn } from '@/lib/utils';

interface WishingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (wishData: { message: string; photo?: string }) => void;
  guestName: string;
}

const WishingModal: React.FC<WishingModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  guestName 
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
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSubmit({ message: message.trim(), photo });
    
    // Reset form
    setMessage('');
    setPhoto(undefined);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    setMessage('');
    setPhoto(undefined);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gradient-to-br from-cream to-cream/95 border-2 border-gold-light/40 max-w-md mx-auto rounded-3xl p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="bg-gradient-to-r from-maroon/10 to-maroon/5 p-6 pb-4 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-300 flex items-center justify-center"
          >
            <X className="text-maroon w-4 h-4" />
          </button>
          
          <DialogTitle className="text-center">
            <h3 className="font-cormorant text-maroon text-2xl font-bold mb-2">
              Share Your Blessing
            </h3>
            <p className="text-gold-light/80 text-sm font-opensans">
              Leave a heartfelt wish for the happy couple
            </p>
          </DialogTitle>
        </DialogHeader>

        {/* Content */}
        <div className="p-6 pt-4">
          {/* Guest Info */}
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center mr-3 shadow-md">
              {photo ? (
                <img 
                  src={photo} 
                  alt={guestName}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-maroon font-bold text-lg">
                  {getInitials(guestName)}
                </span>
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-cormorant text-maroon font-bold text-lg">
                {guestName}
              </h4>
              <label className="text-gold-light/80 text-sm cursor-pointer flex items-center hover:text-gold-light transition-colors duration-300">
                <Camera className="w-4 h-4 mr-1" />
                Add photo (optional)
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Message Input */}
          <div className="mb-6">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your heartfelt wishes, blessings, and beautiful thoughts for the couple's journey together..."
              className="w-full h-32 p-4 bg-white/50 border-2 border-gold-light/30 rounded-xl resize-none focus:outline-none focus:border-gold-light/60 transition-colors duration-300 text-maroon placeholder-maroon/50"
              maxLength={280}
            />
            <div className="text-right mt-2">
              <span className="text-gold-light/60 text-sm">
                {message.length}/280
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={handleClose}
              className="flex-1 py-3 px-6 bg-white/50 hover:bg-white/70 text-maroon border-2 border-maroon/20 rounded-xl transition-all duration-300 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!message.trim() || isSubmitting}
              className={cn(
                "flex-1 py-3 px-6 bg-gold-gradient text-maroon rounded-xl transition-all duration-300 font-bold flex items-center justify-center space-x-2",
                (!message.trim() || isSubmitting) 
                  ? "opacity-50 cursor-not-allowed" 
                  : "hover:scale-105 shadow-lg hover:shadow-gold-light/25"
              )}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-maroon border-t-transparent rounded-full animate-spin"></div>
                  <span>Sharing...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Share Wish</span>
                </>
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WishingModal;
