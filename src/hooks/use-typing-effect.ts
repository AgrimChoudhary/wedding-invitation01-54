
import { useState, useEffect } from 'react';

export function useTypingEffect(text: string, typingSpeed = 150, initialDelay = 500) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!text) return;
    
    setIsTyping(true);
    setDisplayText('');
    setCurrentIndex(0);
    
    const startTypingTimeout = setTimeout(() => {
      const intervalId = setInterval(() => {
        setCurrentIndex(prev => {
          if (prev >= text.length) {
            clearInterval(intervalId);
            setIsTyping(false);
            return prev;
          }
          return prev + 1;
        });
      }, typingSpeed);
      
      return () => clearInterval(intervalId);
    }, initialDelay);
    
    return () => clearTimeout(startTypingTimeout);
  }, [text, typingSpeed, initialDelay]);
  
  useEffect(() => {
    setDisplayText(text.substring(0, currentIndex));
  }, [currentIndex, text]);
  
  return { displayText, isTyping };
}
