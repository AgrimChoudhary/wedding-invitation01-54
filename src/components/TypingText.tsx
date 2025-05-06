
import React from 'react';
import { useTypingEffect } from '@/hooks/use-typing-effect';
import { cn } from '@/lib/utils';

interface TypingTextProps {
  text: string;
  className?: string;
  typingSpeed?: number;
  initialDelay?: number;
  showCursor?: boolean;
}

const TypingText = ({
  text,
  className,
  typingSpeed = 100,
  initialDelay = 300,
  showCursor = true
}: TypingTextProps) => {
  const { displayText, isTyping } = useTypingEffect(text, typingSpeed, initialDelay);
  
  return (
    <span className={cn("relative inline-block", className)}>
      {displayText}
      {showCursor && isTyping && (
        <span className="ml-0.5 inline-block w-0.5 h-5 bg-gold-light animate-blink" />
      )}
    </span>
  );
};

export default TypingText;
