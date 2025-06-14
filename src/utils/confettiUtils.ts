
export const createConfetti = () => {
  const colors = ['#FFD700', '#FFC107', '#FFB74D', '#FF6B6B', '#4ECDC4', '#45B7D1'];
  const confettiCount = 50;
  
  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => {
      createConfettiPiece(colors);
    }, i * 10);
  }
};

const createConfettiPiece = (colors: string[]) => {
  const confetti = document.createElement('div');
  const size = Math.random() * 8 + 4;
  const color = colors[Math.floor(Math.random() * colors.length)];
  const startX = Math.random() * window.innerWidth;
  const duration = Math.random() * 3 + 2;
  const rotation = Math.random() * 360;
  const drift = (Math.random() - 0.5) * 200;
  
  confetti.style.position = 'fixed';
  confetti.style.width = `${size}px`;
  confetti.style.height = `${size}px`;
  confetti.style.backgroundColor = color;
  confetti.style.left = `${startX}px`;
  confetti.style.top = '-10px';
  confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
  confetti.style.pointerEvents = 'none';
  confetti.style.zIndex = '9999';
  confetti.style.transform = `rotate(${rotation}deg)`;
  confetti.style.animation = `confetti-fall ${duration}s linear forwards`;
  
  // Add CSS animation dynamically
  if (!document.getElementById('confetti-styles')) {
    const style = document.createElement('style');
    style.id = 'confetti-styles';
    style.textContent = `
      @keyframes confetti-fall {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) translateX(${drift}px) rotate(720deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(confetti);
  
  setTimeout(() => {
    if (document.body.contains(confetti)) {
      document.body.removeChild(confetti);
    }
  }, duration * 1000);
};
