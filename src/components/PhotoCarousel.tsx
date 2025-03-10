
import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhotoCarouselProps {
  photos: Array<{
    src: string;
    alt: string;
  }>;
  className?: string;
}

const PhotoCarousel: React.FC<PhotoCarouselProps> = ({ photos, className }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set());

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleLike = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const newLiked = new Set(likedPhotos);
    if (newLiked.has(index)) {
      newLiked.delete(index);
    } else {
      newLiked.add(index);
    }
    setLikedPhotos(newLiked);
  };

  return (
    <div className={cn('relative w-full', className)}>
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
        <button 
          onClick={scrollLeft}
          className="bg-maroon/80 hover:bg-maroon text-gold-light p-2 rounded-full shadow-gold border border-gold-light/30"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>
      </div>
      
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
        <button 
          onClick={scrollRight}
          className="bg-maroon/80 hover:bg-maroon text-gold-light p-2 rounded-full shadow-gold border border-gold-light/30"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide py-8 px-12 space-x-4 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {photos.map((photo, index) => (
          <div 
            key={index}
            className={cn(
              'flex-shrink-0 relative group',
              'perspective transform transition-all duration-500',
              'w-60 h-80 rounded-lg overflow-hidden',
              activeIndex === index 
                ? 'scale-105 rotate-0 z-10 shadow-gold-lg' 
                : 'scale-95 rotate-[-2deg] hover:rotate-0'
            )}
            onClick={() => setActiveIndex(index === activeIndex ? null : index)}
          >
            <div className={cn(
              'absolute inset-0 border-4 border-transparent transition-all duration-300',
              activeIndex === index && 'border-gold-light/70'
            )}></div>
            
            <img 
              src={photo.src} 
              alt={photo.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            
            <div className={cn(
              'absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-maroon/90',
              'opacity-0 group-hover:opacity-100 transition-opacity duration-300'
            )}></div>
            
            <button
              className={cn(
                'absolute bottom-3 right-3 p-2 rounded-full transition-all duration-300',
                'bg-maroon/50 backdrop-blur-sm hover:bg-maroon',
                'opacity-0 group-hover:opacity-100 z-20',
                likedPhotos.has(index) && 'bg-gold-gradient'
              )}
              onClick={(e) => handleLike(index, e)}
            >
              <Heart 
                size={20} 
                className={cn(
                  'transition-transform duration-300',
                  likedPhotos.has(index) 
                    ? 'text-maroon fill-maroon animate-heart-beat' 
                    : 'text-gold-light hover:scale-125'
                )} 
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoCarousel;
