
type ParticleTypes = 'sparkles' | 'blessing';

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
  sparkles: {
    count: 30,
    duration: 2.5,
    colors: ['#FFD700', '#FFC107', '#FFEB3B', '#FFECB3'],
    size: {
      min: 3,
      max: 8
    },
    speed: {
      min: 2,
      max: 5
    }
  },
  blessing: {
    count: 20,
    duration: 3,
    colors: ['#FFD700', '#FFC107'],
    size: {
      min: 5,
      max: 10
    },
    speed: {
      min: 1,
      max: 3
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
        const delay = Math.random() * 1;
        const rotation = Math.random() * 360;
        
        // Set CSS properties
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}px`;
        particle.style.top = '-20px';
        particle.style.zIndex = '10';
        particle.style.opacity = '0';
        particle.style.pointerEvents = 'none';
        
        if (type === 'sparkles') {
          particle.style.backgroundColor = options.colors[colorIndex];
          particle.style.borderRadius = '50%';
          particle.style.boxShadow = `0 0 ${size/2}px ${options.colors[colorIndex]}`;
        } else if (type === 'blessing') {
          particle.style.backgroundColor = 'transparent';
          particle.style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${encodeURIComponent(options.colors[colorIndex])}' stroke='none'%3E%3Cpath d='M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z'/%3E%3C/svg%3E")`;
          particle.style.backgroundSize = 'contain';
          particle.style.backgroundRepeat = 'no-repeat';
        }
        
        particle.style.transform = `rotate(${rotation}deg)`;
        particle.style.animation = `fall ${speed}s linear ${delay}s forwards, fade-in-out ${options.duration}s ease-in-out ${delay}s forwards`;
        
        container.appendChild(particle);
        
        setTimeout(() => {
          if (container.contains(particle)) {
            container.removeChild(particle);
          }
        }, (options.duration + delay) * 1000);
      }, Math.random() * 300); // Staggered creation
    }
  };
  
  createParticle();
  
  // Add keyframe animation to document if not already present
  if (!document.getElementById('wedding-animation-keyframes')) {
    const style = document.createElement('style');
    style.id = 'wedding-animation-keyframes';
    style.innerHTML = `
      @keyframes fall {
        0% { top: -20px; }
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
  halo.style.background = 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, rgba(255,215,0,0) 70%)';
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
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.2; }
        50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.3; }
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
