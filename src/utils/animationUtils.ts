
export const createGlitter = (e: MouseEvent) => {
  const glitter = document.createElement('div');
  glitter.className = 'glitter';
  
  const size = Math.random() * 10 + 5;
  glitter.style.width = `${size}px`;
  glitter.style.height = `${size}px`;
  
  glitter.style.left = `${e.pageX - size / 2}px`;
  glitter.style.top = `${e.pageY - size / 2}px`;
  
  document.body.appendChild(glitter);
  
  setTimeout(() => {
    document.body.removeChild(glitter);
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
    const touch = e.touches[0];
    createGlitter(touch as unknown as MouseEvent);
  };
  
  document.addEventListener('touchmove', handleTouch);
  
  return () => {
    document.removeEventListener('touchmove', handleTouch);
  };
};
