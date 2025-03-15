
import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhotoCarouselProps {
  photos: Array<{
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }>;
  className?: string;
}

const PhotoCarousel: React.FC<PhotoCarouselProps> = ({ photos, className }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set());
  const [visiblePhotos, setVisiblePhotos] = useState<number[]>([0, 1]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});
  
  useEffect(() => {
    // Initial setup for lazy loading images
    const initialLoadCount = 2; // Only load first 2 images initially
    const initialVisibleIndexes = Array.from({ length: initialLoadCount }, (_, i) => i);
    setVisiblePhotos(initialVisibleIndexes);
    
    // Track image loading
    const loadedImages = {};
    initialVisibleIndexes.forEach(index => {
      loadedImages[index] = false;
    });
    setImagesLoaded(loadedImages);
    
    // Set up intersection observer for lazy loading remaining images
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (!visiblePhotos.includes(index) && index < photos.length) {
            setVisiblePhotos(prev => [...prev, index]);
            setImagesLoaded(prev => ({ ...prev, [index]: false }));
          }
        }
      });
    }, { 
      root: scrollContainerRef.current, 
      threshold: 0.1,
      rootMargin: "100px" // Start loading before it's visible
    });
    
    const container = scrollContainerRef.current;
    if (container) {
      Array.from(container.children).forEach(child => {
        observer.observe(child);
      });
    }
    
    return () => observer.disconnect();
  }, [photos.length]);

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

  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => ({ ...prev, [index]: true }));
  };

  const handleLike = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const newLiked = new Set(likedPhotos);
    if (newLiked.has(index)) {
      newLiked.delete(index);
    } else {
      newLiked.add(index);
      
      // Create heart burst effect
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      for (let i = 0; i < 6; i++) {
        const heart = document.createElement('div');
        const size = Math.random() * 15 + 8;
        const angle = Math.random() * 360;
        const distance = Math.random() * 60 + 30;
        
        heart.className = 'absolute text-gold-light';
        heart.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>';
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.transform = `rotate(${angle}deg)`;
        heart.style.opacity = '1';
        heart.style.pointerEvents = 'none';
        heart.style.transition = 'all 0.8s ease-out';
        heart.style.zIndex = '100';
        
        target.appendChild(heart);
        
        setTimeout(() => {
          heart.style.transform = `translate(${Math.cos(angle * Math.PI / 180) * distance}px, ${Math.sin(angle * Math.PI / 180) * distance}px) rotate(${angle + 20}deg)`;
          heart.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
          if (target.contains(heart)) {
            target.removeChild(heart);
          }
        }, 800);
      }
    }
    setLikedPhotos(newLiked);
  };

  return (
    <div className={cn('relative w-full', className)}>
      {/* Decorative elements */}
      <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-gold-gradient opacity-20 blur-md -z-10"></div>
      <div className="absolute right-0 bottom-0 w-24 h-24 rounded-full bg-gold-gradient opacity-20 blur-md -z-10"></div>
      
      <div className="absolute left-1/4 bottom-0 w-8 h-8 rounded-full bg-gold-light opacity-10 blur-sm -z-10"></div>
      <div className="absolute right-1/4 top-0 w-12 h-12 rounded-full bg-gold-light opacity-10 blur-sm -z-10"></div>
      
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
            data-index={index}
            className={cn(
              'flex-shrink-0 relative group',
              'perspective transform transition-all duration-500',
              'w-60 h-80 rounded-lg overflow-hidden',
              activeIndex === index 
                ? 'scale-105 rotate-0 z-10 shadow-gold-lg' 
                : 'scale-95 rotate-[-2deg] hover:rotate-0'
            )}
            onClick={() => setActiveIndex(index === activeIndex ? null : index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Photo frame with hover border glow effect */}
            <div className={cn(
              'absolute inset-0 border-4 border-transparent transition-all duration-300',
              activeIndex === index && 'border-gold-light/70',
              hoveredIndex === index && 'border-gold-light shadow-gold-lg' // Only show glow on hover
            )}></div>
            
            {visiblePhotos.includes(index) ? (
              <>
                {!imagesLoaded[index] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-maroon/50 z-10">
                    <div className="w-10 h-10 border-2 border-gold-light border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <img 
                  src={photo.src} 
                  alt={photo.alt}
                  className={cn(
                    "w-full h-full object-cover transition-transform duration-700",
                    "group-hover:scale-105",
                    !imagesLoaded[index] && "opacity-0"
                  )}
                  loading="lazy"
                  decoding="async"
                  width={photo.width || 240}
                  height={photo.height || 320}
                  onLoad={() => handleImageLoad(index)}
                  fetchPriority={index < 2 ? "high" : "low"}
                />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-maroon/50">
                <div className="w-10 h-10 border-2 border-gold-light border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            
            {/* Overlay gradient */}
            <div className={cn(
              'absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-maroon/90',
              'opacity-0 group-hover:opacity-100 transition-opacity duration-300'
            )}></div>
            
            {/* Like button */}
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
      
      <style>
        {`
        @keyframes heart-beat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }
        `}
      </style>
    </div>
  );
};

export default PhotoCarousel;
