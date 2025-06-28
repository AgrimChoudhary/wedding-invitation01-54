
import React, { useState } from 'react';
import { Heart, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import WishCard from './WishCard';
import WishingModal from './WishingModal';

interface Wish {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  avatar?: string;
}

interface WishingWallProps {
  guestName: string;
  isInIframe?: boolean;
}

const WishingWall: React.FC<WishingWallProps> = ({ guestName, isInIframe = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wishes, setWishes] = useState<Wish[]>([
    {
      id: '1',
      name: 'Agrim',
      message: 'happy marriage siddharth bhai',
      timestamp: '13 days ago',
      avatar: undefined
    },
    {
      id: '2',
      name: 'Agrim',
      message: 'coool',
      timestamp: '13 days ago',
      avatar: undefined
    },
    {
      id: '3',
      name: 'Agrim',
      message: 'happy marriage',
      timestamp: '13 days ago',
      avatar: undefined
    }
  ]);

  const wishesPerPage = isInIframe ? 1 : 3;
  const totalPages = Math.ceil(wishes.length / wishesPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getCurrentWishes = () => {
    const start = currentIndex * wishesPerPage;
    const end = start + wishesPerPage;
    return wishes.slice(start, end);
  };

  const handlePostWish = (wishData: { message: string; photo?: string }) => {
    const newWish: Wish = {
      id: Date.now().toString(),
      name: guestName,
      message: wishData.message,
      timestamp: 'Just now',
      avatar: wishData.photo
    };
    
    setWishes(prev => [newWish, ...prev]);
    setIsModalOpen(false);
  };

  return (
    <div className="py-8 md:py-10 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className={cn(
            "font-cormorant text-maroon font-bold mb-3 md:mb-4",
            isInIframe ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"
          )}>
            Wedding Wishes
          </h2>
          <div className="w-16 h-0.5 bg-gold-gradient mx-auto mb-4"></div>
          <p className="text-gold-light/90 font-opensans text-sm md:text-base">
            Share your heartfelt blessings
          </p>
          <p className="text-maroon/80 font-cormorant text-lg md:text-xl mt-2">
            {wishes.length} beautiful wishes shared
          </p>
        </div>

        {/* Wish Cards Carousel */}
        <div className="relative mb-8 md:mb-10">
          {wishes.length > 0 ? (
            <>
              <div className="flex justify-center items-center space-x-4 md:space-x-6 lg:space-x-8">
                {/* Previous button */}
                {totalPages > 1 && (
                  <button
                    onClick={prevSlide}
                    className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gold-gradient rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-lg"
                  >
                    <ChevronLeft className="text-maroon w-5 h-5 md:w-6 md:h-6" />
                  </button>
                )}

                {/* Wish Cards */}
                <div className="flex-1 max-w-4xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {getCurrentWishes().map((wish, index) => (
                      <WishCard key={wish.id} wish={wish} index={index} />
                    ))}
                  </div>
                </div>

                {/* Next button */}
                {totalPages > 1 && (
                  <button
                    onClick={nextSlide}
                    className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gold-gradient rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-lg"
                  >
                    <ChevronRight className="text-maroon w-5 h-5 md:w-6 md:h-6" />
                  </button>
                )}
              </div>

              {/* Pagination dots */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        index === currentIndex 
                          ? "bg-gold-light w-6" 
                          : "bg-gold-light/40 hover:bg-gold-light/60"
                      )}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <Heart className="text-gold-light/50 w-16 h-16 mx-auto mb-4" />
              <p className="text-cream/80 font-cormorant text-lg">
                Be the first to share your wishes!
              </p>
            </div>
          )}
        </div>

        {/* Post Your Wish Button */}
        <div className="text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className={cn(
              "bg-gold-gradient text-maroon font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-gold-light/25 inline-flex items-center",
              isInIframe ? "px-6 py-3 text-base" : "px-8 py-4 text-lg"
            )}
          >
            <Plus className="mr-2" size={isInIframe ? 18 : 20} />
            Post Your Wish
          </button>
        </div>

        {/* Wishing Modal */}
        <WishingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handlePostWish}
          guestName={guestName}
        />
      </div>
    </div>
  );
};

export default WishingWall;
