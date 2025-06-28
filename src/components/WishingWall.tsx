
import React, { useState, useRef, useEffect } from 'react';
import { Heart, ChevronLeft, ChevronRight, Plus, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import WishCard from './WishCard';
import WishingModal from './WishingModal';
import { iframeMessenger } from '@/utils/iframeComm';

interface Wish {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  avatar?: string;
  likes?: number;
  guestId?: string;
  createdAt?: string;
}

interface WishingWallProps {
  guestName: string;
  isInIframe?: boolean;
  initialWishes?: Wish[];
  allowWishPosting?: boolean;
  showWishLikes?: boolean;
  maxWishLength?: number;
}

const WishingWall: React.FC<WishingWallProps> = ({ 
  guestName, 
  isInIframe = false,
  initialWishes = [],
  allowWishPosting = true,
  showWishLikes = false,
  maxWishLength = 280
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wishes, setWishes] = useState<Wish[]>(initialWishes.length > 0 ? initialWishes : [
    {
      id: '1',
      name: 'Agrim',
      message: 'Wishing you both a lifetime filled with love, laughter, and endless happiness. May your journey together be blessed with joy and prosperity.',
      timestamp: '13 days ago',
      likes: 12
    },
    {
      id: '2',
      name: 'Priya Sharma',
      message: 'Such a beautiful couple! May your love story continue to inspire others and may you find joy in every moment together.',
      timestamp: '12 days ago',
      likes: 8
    },
    {
      id: '3',
      name: 'Rahul Kumar',
      message: 'Congratulations on finding your perfect match! Wishing you both all the happiness in the world.',
      timestamp: '11 days ago',
      likes: 15
    }
  ]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const wishesPerPage = isInIframe ? 1 : 2;
  const totalPages = Math.ceil(wishes.length / wishesPerPage);
  const canSlideLeft = currentIndex > 0;
  const canSlideRight = currentIndex < totalPages - 1;

  // Touch handlers for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && canSlideRight) {
      nextSlide();
    }
    if (isRightSwipe && canSlideLeft) {
      prevSlide();
    }
  };

  const nextSlide = () => {
    if (!canSlideRight || isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
    
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevSlide = () => {
    if (!canSlideLeft || isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);
    
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToSlide = (index: number) => {
    if (index === currentIndex || isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handlePostWish = (wishData: { message: string; photo?: string }) => {
    const newWish: Wish = {
      id: Date.now().toString(),
      name: guestName,
      message: wishData.message,
      timestamp: 'Just now',
      avatar: wishData.photo,
      likes: 0
    };
    
    setWishes(prev => [newWish, ...prev]);
    setIsModalOpen(false);
    
    // Send wish to parent platform
    iframeMessenger.sendMessage('WISH_SUBMITTED', {
      eventId: '', // Will be set by iframeMessenger based on initialization
      guestId: '', // Will be set by iframeMessenger based on initialization
      wishData: {
        message: wishData.message,
        photo: wishData.photo,
        timestamp: new Date().toISOString(),
        guestName: guestName
      }
    });

    // Reset to first slide to show new wish
    setCurrentIndex(0);
  };

  const handleLikeWish = (wishId: string) => {
    setWishes(prev => prev.map(wish => 
      wish.id === wishId 
        ? { ...wish, likes: (wish.likes || 0) + 1 }
        : wish
    ));

    // Send like event to parent platform
    iframeMessenger.sendMessage('WISH_LIKED', {
      eventId: '', // Will be set by iframeMessenger
      guestId: '', // Will be set by iframeMessenger
      wishId: wishId
    });
  };

  // Track wishes viewed
  useEffect(() => {
    if (wishes.length > 0) {
      iframeMessenger.sendMessage('WISHES_VIEWED', {
        eventId: '', // Will be set by iframeMessenger
        guestId: '', // Will be set by iframeMessenger
        totalWishes: wishes.length
      });
    }
  }, [wishes.length]);

  return (
    <div className="py-10 md:py-12 px-4 relative z-10 bg-gradient-to-b from-transparent via-maroon/5 to-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="flex justify-center items-center mb-4">
            <div className="w-12 h-0.5 bg-gold-gradient"></div>
            <Sparkles className="mx-4 text-gold-light" size={24} />
            <div className="w-12 h-0.5 bg-gold-gradient"></div>
          </div>
          
          <h2 className={cn(
            "font-cormorant text-maroon font-bold mb-4",
            isInIframe ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl"
          )}>
            Wedding Wishes
          </h2>
          
          <p className="text-gold-light/90 font-opensans text-base md:text-lg mb-2">
            Heartfelt blessings from our loved ones
          </p>
          <p className="text-maroon/80 font-cormorant text-xl md:text-2xl">
            {wishes.length} beautiful {wishes.length === 1 ? 'wish' : 'wishes'} shared
          </p>
        </div>

        {/* Enhanced Carousel */}
        <div className="relative mb-10 md:mb-12">
          {wishes.length > 0 ? (
            <>
              {/* Carousel Container */}
              <div 
                className="relative overflow-hidden rounded-2xl"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div 
                  ref={carouselRef}
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ 
                    transform: `translateX(-${currentIndex * 100}%)`,
                    width: `${totalPages * 100}%`
                  }}
                >
                  {Array.from({ length: totalPages }).map((_, pageIndex) => (
                    <div 
                      key={pageIndex}
                      className="flex justify-center items-stretch space-x-6 px-4"
                      style={{ width: `${100 / totalPages}%` }}
                    >
                      {wishes
                        .slice(pageIndex * wishesPerPage, (pageIndex + 1) * wishesPerPage)
                        .map((wish, index) => (
                          <WishCard 
                            key={wish.id} 
                            wish={wish} 
                            index={index}
                            onLike={showWishLikes ? handleLikeWish : undefined}
                            showLikes={showWishLikes}
                          />
                        ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Navigation */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center mt-8 space-x-6">
                  <button
                    onClick={prevSlide}
                    disabled={!canSlideLeft || isTransitioning}
                    className={cn(
                      "w-12 h-12 bg-gold-gradient rounded-full flex items-center justify-center transition-all duration-300 shadow-lg",
                      canSlideLeft && !isTransitioning
                        ? "hover:scale-110 hover:shadow-gold-light/30 active:scale-95"
                        : "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <ChevronLeft className="text-maroon w-6 h-6" />
                  </button>

                  {/* Enhanced Pagination Dots */}
                  <div className="flex space-x-3">
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={cn(
                          "transition-all duration-300 rounded-full",
                          index === currentIndex 
                            ? "bg-gold-light w-8 h-3 shadow-lg" 
                            : "bg-gold-light/40 hover:bg-gold-light/60 w-3 h-3"
                        )}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextSlide}
                    disabled={!canSlideRight || isTransitioning}
                    className={cn(
                      "w-12 h-12 bg-gold-gradient rounded-full flex items-center justify-center transition-all duration-300 shadow-lg",
                      canSlideRight && !isTransitioning
                        ? "hover:scale-110 hover:shadow-gold-light/30 active:scale-95"
                        : "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <ChevronRight className="text-maroon w-6 h-6" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 bg-gradient-to-br from-maroon/10 to-maroon/5 rounded-2xl border border-gold-light/20">
              <Heart className="text-gold-light/50 w-16 h-16 mx-auto mb-6 animate-pulse" />
              <p className="text-maroon/70 font-cormorant text-2xl mb-2">
                No wishes yet
              </p>
              <p className="text-gold-light/80 font-opensans">
                Be the first to share your heartfelt blessings!
              </p>
            </div>
          )}
        </div>

        {/* Enhanced Post Wish Button */}
        {allowWishPosting && (
          <div className="text-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className={cn(
                "bg-gold-gradient text-maroon font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-gold-light/30 inline-flex items-center relative overflow-hidden group",
                isInIframe ? "px-6 py-3 text-base" : "px-8 py-4 text-lg"
              )}
            >
              <Plus className="mr-2 group-hover:rotate-90 transition-transform duration-300" size={isInIframe ? 18 : 20} />
              <span className="relative z-10">Post Your Wish</span>
              
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gold-light/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></div>
            </button>
          </div>
        )}

        {/* Enhanced Wishing Modal */}
        <WishingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handlePostWish}
          guestName={guestName}
          maxWishLength={maxWishLength}
        />
      </div>
    </div>
  );
};

export default WishingWall;
