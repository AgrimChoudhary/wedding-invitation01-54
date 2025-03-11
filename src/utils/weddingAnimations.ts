
type ParticleTypes = 'hearts' | 'sparkles' | 'flowers' | 'confetti';

interface ParticleOptions {
  count: number;
  duration: number;
  colors: string[];
  size: {
    min: number;
    max: number;
  };
  speed: {
    min: number;
    max: number;
  };
}

const defaultOptions: Record<ParticleTypes, ParticleOptions> = {
  hearts: {
    count: 40,
    duration: 3,
    colors: ['#FF5E5B', '#D81E5B', '#FFA5AB', '#F25F5C'],
    size: {
      min: 15,
      max: 35
    },
    speed: {
      min: 3,
      max: 8
    }
  },
  sparkles: {
    count: 60,
    duration: 2.5,
    colors: ['#FFD700', '#FFC107', '#FFEB3B', '#FFECB3'],
    size: {
      min: 3,
      max: 12
    },
    speed: {
      min: 2,
      max: 6
    }
  },
  flowers: {
    count: 25,
    duration: 4,
    colors: ['#FF9A8B', '#FF6B6B', '#E83151', '#FF4859'],
    size: {
      min: 20,
      max: 40
    },
    speed: {
      min: 2,
      max: 5
    }
  },
  confetti: {
    count: 100,
    duration: 3.5,
    colors: ['#FF9A8B', '#FF6B6B', '#FFD700', '#91A6FF', '#8C61FF', '#00D2FF'],
    size: {
      min: 5,
      max: 15
    },
    speed: {
      min: 3,
      max: 9
    }
  }
};

export const createParticleAnimation = (
  type: ParticleTypes,
  container: HTMLElement,
  customOptions?: Partial<ParticleOptions>
) => {
  const options = {
    ...defaultOptions[type],
    ...customOptions
  };
  
  const createParticle = () => {
    for (let i = 0; i < options.count; i++) {
      setTimeout(() => {
        const particle = document.createElement('div');
        
        // Random properties
        const size = Math.random() * (options.size.max - options.size.min) + options.size.min;
        const colorIndex = Math.floor(Math.random() * options.colors.length);
        const left = Math.random() * container.offsetWidth;
        const speed = Math.random() * (options.speed.max - options.speed.min) + options.speed.min;
        const delay = Math.random() * 2;
        const rotation = Math.random() * 360;
        
        // Set CSS properties
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}px`;
        particle.style.top = '-50px';
        particle.style.zIndex = '10';
        particle.style.opacity = '0';
        particle.style.pointerEvents = 'none';
        
        if (type === 'hearts') {
          particle.style.backgroundColor = 'transparent';
          particle.style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${encodeURIComponent(options.colors[colorIndex])}' stroke='none'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E")`;
          particle.style.backgroundSize = 'contain';
          particle.style.backgroundRepeat = 'no-repeat';
        } else if (type === 'flowers') {
          particle.style.backgroundColor = 'transparent';
          particle.style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${encodeURIComponent(options.colors[colorIndex])}' stroke='none'%3E%3Cpath d='M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7Z'/%3E%3C/svg%3E")`;
          particle.style.backgroundSize = 'contain';
          particle.style.backgroundRepeat = 'no-repeat';
        } else if (type === 'sparkles') {
          particle.style.backgroundColor = options.colors[colorIndex];
          particle.style.borderRadius = '50%';
          particle.style.boxShadow = `0 0 ${size/2}px ${options.colors[colorIndex]}`;
        } else if (type === 'confetti') {
          particle.style.backgroundColor = options.colors[colorIndex];
          particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        }
        
        particle.style.transform = `rotate(${rotation}deg)`;
        particle.style.animation = `fall ${speed}s linear ${delay}s forwards, fade-in-out ${options.duration}s ease-in-out ${delay}s forwards`;
        
        container.appendChild(particle);
        
        setTimeout(() => {
          if (container.contains(particle)) {
            container.removeChild(particle);
          }
        }, (options.duration + delay) * 1000);
      }, Math.random() * 500); // Staggered creation
    }
  };
  
  createParticle();
  
  // Add keyframe animation to document if not already present
  if (!document.getElementById('wedding-animation-keyframes')) {
    const style = document.createElement('style');
    style.id = 'wedding-animation-keyframes';
    style.innerHTML = `
      @keyframes fall {
        0% { top: -50px; }
        100% { top: 100%; }
      }
      @keyframes fade-in-out {
        0% { opacity: 0; }
        15% { opacity: 1; }
        80% { opacity: 1; }
        100% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
  
  return {
    stop: () => {
      // Clear all particles
      const particles = container.querySelectorAll('div');
      particles.forEach(particle => {
        if (container.contains(particle)) {
          container.removeChild(particle);
        }
      });
    }
  };
};

export const createHaloEffect = (element: HTMLElement) => {
  // Create halo effect around an element
  const halo = document.createElement('div');
  halo.className = 'halo-effect';
  
  const size = Math.max(element.offsetWidth, element.offsetHeight) * 1.2;
  
  halo.style.position = 'absolute';
  halo.style.width = `${size}px`;
  halo.style.height = `${size}px`;
  halo.style.borderRadius = '50%';
  halo.style.background = 'radial-gradient(circle, rgba(255,215,0,0.3) 0%, rgba(255,215,0,0) 70%)';
  halo.style.left = '50%';
  halo.style.top = '50%';
  halo.style.transform = 'translate(-50%, -50%)';
  halo.style.pointerEvents = 'none';
  halo.style.zIndex = '-1';
  halo.style.animation = 'pulse-halo 3s infinite ease-in-out';
  
  if (!document.getElementById('halo-animation-keyframes')) {
    const style = document.createElement('style');
    style.id = 'halo-animation-keyframes';
    style.innerHTML = `
      @keyframes pulse-halo {
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
        50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.5; }
      }
    `;
    document.head.appendChild(style);
  }
  
  element.style.position = 'relative';
  element.appendChild(halo);
  
  return {
    remove: () => {
      if (element.contains(halo)) {
        element.removeChild(halo);
      }
    }
  };
};

export const addFloatingElements = (
  container: HTMLElement, 
  elementCount: number = 8, 
  imageUrls: string[] = []
) => {
  const elements: HTMLElement[] = [];
  
  if (!document.getElementById('floating-animation-keyframes')) {
    const style = document.createElement('style');
    style.id = 'floating-animation-keyframes';
    style.innerHTML = `
      @keyframes float-around {
        0% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(10px, -15px) rotate(5deg); }
        50% { transform: translate(-5px, 8px) rotate(-3deg); }
        75% { transform: translate(-10px, -10px) rotate(2deg); }
        100% { transform: translate(0, 0) rotate(0deg); }
      }
    `;
    document.head.appendChild(style);
  }
  
  for (let i = 0; i < elementCount; i++) {
    const element = document.createElement('div');
    element.className = 'floating-element';
    
    // Random properties
    const size = Math.random() * 20 + 15;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const duration = Math.random() * 5 + 10;
    const delay = Math.random() * -10;
    
    element.style.position = 'absolute';
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.top = `${top}%`;
    element.style.left = `${left}%`;
    element.style.zIndex = '5';
    element.style.opacity = '0.7';
    element.style.pointerEvents = 'none';
    element.style.animation = `float-around ${duration}s infinite ease-in-out ${delay}s`;
    
    if (imageUrls.length > 0 && Math.random() > 0.3) {
      // Use image if available
      const imageIndex = Math.floor(Math.random() * imageUrls.length);
      element.style.backgroundImage = `url("${imageUrls[imageIndex]}")`;
      element.style.backgroundSize = 'contain';
      element.style.backgroundRepeat = 'no-repeat';
    } else {
      // Default to a simple shape
      element.style.backgroundColor = 'transparent';
      element.style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FFD700' stroke='none'%3E%3Cpath d='M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z'/%3E%3C/svg%3E")`;
    }
    
    container.appendChild(element);
    elements.push(element);
  }
  
  return {
    remove: () => {
      elements.forEach(element => {
        if (container.contains(element)) {
          container.removeChild(element);
        }
      });
    }
  };
};

