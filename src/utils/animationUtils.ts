
export const createGlitter = (e: MouseEvent | Touch) => {
  const glitter = document.createElement('div');
  glitter.className = 'glitter';
  
  const size = Math.random() * 10 + 5;
  glitter.style.width = `${size}px`;
  glitter.style.height = `${size}px`;
  
  // Handle both MouseEvent and Touch correctly with type guards
  let pageX: number;
  let pageY: number;
  
  if ('pageX' in e && 'pageY' in e) {
    // It's a MouseEvent
    pageX = e.pageX;
    pageY = e.pageY;
  } else if (e && typeof e === 'object' && 'clientX' in e && 'clientY' in e) {
    // It's a Touch object with clientX and clientY properties
    const touch = e as Touch;
    pageX = touch.clientX + document.documentElement.scrollLeft;
    pageY = touch.clientY + document.documentElement.scrollTop;
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

// Create floating mandala patterns for the "Show Magic" feature
export const createMandalaEffect = () => {
  const mandalaContainer = document.getElementById('mandala-container');
  if (!mandalaContainer) return;
  
  // Clear existing mandalas
  mandalaContainer.innerHTML = '';
  
  // Create multiple mandala patterns
  for (let i = 0; i < 15; i++) {
    createMandala(mandalaContainer);
  }
};

const createMandala = (container: HTMLElement) => {
  const mandala = document.createElement('div');
  
  // Random properties
  const size = Math.random() * 80 + 40;
  const posX = Math.random() * window.innerWidth;
  const posY = Math.random() * window.innerHeight;
  const rotationSpeed = Math.random() * 20 + 10;
  const opacity = Math.random() * 0.3 + 0.1;
  
  // Create mandala pattern
  mandala.className = 'mandala-pattern';
  mandala.style.width = `${size}px`;
  mandala.style.height = `${size}px`;
  mandala.style.left = `${posX}px`;
  mandala.style.top = `${posY}px`;
  mandala.style.opacity = opacity.toString();
  
  // Set animation
  mandala.style.animation = `float ${Math.random() * 10 + 20}s linear infinite, spin-slow ${rotationSpeed}s linear infinite`;
  
  // Add to container
  container.appendChild(mandala);
  
  // Create SVG pattern inside
  const svgPattern = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgPattern.setAttribute('viewBox', '0 0 100 100');
  svgPattern.style.width = '100%';
  svgPattern.style.height = '100%';
  
  // Create circular pattern
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', '50');
  circle.setAttribute('cy', '50');
  circle.setAttribute('r', '40');
  circle.setAttribute('fill', 'none');
  circle.setAttribute('stroke', 'url(#gold-grad)');
  circle.setAttribute('stroke-width', '1');
  
  // Create gradient
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
  gradient.setAttribute('id', 'gold-grad');
  
  const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
  stop1.setAttribute('offset', '0%');
  stop1.setAttribute('stop-color', '#FFD700');
  
  const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
  stop2.setAttribute('offset', '100%');
  stop2.setAttribute('stop-color', '#C5A20A');
  
  gradient.appendChild(stop1);
  gradient.appendChild(stop2);
  defs.appendChild(gradient);
  
  // Create decorative elements
  for (let i = 0; i < 8; i++) {
    const angle = i * 45;
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', '50');
    line.setAttribute('y1', '10');
    line.setAttribute('x2', '50');
    line.setAttribute('y2', '30');
    line.setAttribute('stroke', 'url(#gold-grad)');
    line.setAttribute('stroke-width', '1');
    line.setAttribute('transform', `rotate(${angle} 50 50)`);
    svgPattern.appendChild(line);
  }
  
  svgPattern.appendChild(defs);
  svgPattern.appendChild(circle);
  mandala.appendChild(svgPattern);
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
