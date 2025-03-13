
export const createGlitter = (e: MouseEvent | Touch) => {
  const glitter = document.createElement('div');
  glitter.className = 'glitter';
  
  const size = Math.random() * 10 + 5;
  glitter.style.width = `${size}px`;
  glitter.style.height = `${size}px`;
  
  // Handle both MouseEvent and Touch correctly with proper type guards
  let pageX: number;
  let pageY: number;
  
  if ('pageX' in e && 'pageY' in e) {
    // It's a MouseEvent
    pageX = e.pageX;
    pageY = e.pageY;
  } else if ('clientX' in e && 'clientY' in e) {
    // It's a Touch object
    pageX = e.clientX + document.documentElement.scrollLeft;
    pageY = e.clientY + document.documentElement.scrollTop;
  } else {
    // Fallback values if neither type matches
    pageX = 0;
    pageY = 0;
  }
  
  glitter.style.left = `${pageX - size / 2}px`;
  glitter.style.top = `${pageY - size / 2}px`;
  
  document.body.appendChild(glitter);
  
  setTimeout(() => {
    if (document.body.contains(glitter)) {
      document.body.removeChild(glitter);
    }
  }, 2000);
};

export const initCursorGlitter = () => {
  let throttled = false;
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!throttled) {
      createGlitter(e);
      throttled = true;
      setTimeout(() => {
        throttled = false;
      }, 50);
    }
  };
  
  document.addEventListener('mousemove', handleMouseMove);
  
  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
  };
};

export const initTouchGlitter = () => {
  const handleTouch = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      createGlitter(e.touches[0]);
    }
  };
  
  document.addEventListener('touchmove', handleTouch, { passive: true });
  
  return () => {
    document.removeEventListener('touchmove', handleTouch);
  };
};

// Helper function to optimize image loading
export const preloadImages = (srcs: string[]) => {
  srcs.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

// Create a function for lazy loading images
export const setupLazyLoading = () => {
  if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target as HTMLImageElement;
          if (lazyImage.dataset.src) {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.add('loaded');
            lazyImageObserver.unobserve(lazyImage);
          }
        }
      });
    });

    const lazyImages = document.querySelectorAll('.lazy-image');
    lazyImages.forEach(lazyImage => {
      lazyImageObserver.observe(lazyImage);
    });
  }
};
