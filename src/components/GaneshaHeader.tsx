import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
const GaneshaHeader: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isShimmer, setIsShimmer] = useState(false);
  useEffect(() => {
    // Animate entrance
    setTimeout(() => setIsLoaded(true), 500);

    // Start shimmer effect periodically
    const shimmerInterval = setInterval(() => {
      setIsShimmer(true);
      setTimeout(() => setIsShimmer(false), 2000);
    }, 7000);
    return () => clearInterval(shimmerInterval);
  }, []);
  return <div className="relative py-6 px-4 text-center max-w-4xl mx-auto">
      <div className="absolute inset-0 bg-gold-light/5 rounded-xl"></div>
      
      {/* Golden ornate border */}
      <div className="absolute inset-0 border-2 border-gold-light/20 rounded-xl"></div>
      <div className="absolute inset-x-0 top-0 h-px bg-gold-gradient"></div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gold-gradient"></div>
      <div className="absolute inset-y-0 left-0 w-px bg-gold-gradient"></div>
      <div className="absolute inset-y-0 right-0 w-px bg-gold-gradient"></div>
      
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold-light rounded-tl-xl"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold-light rounded-tr-xl"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold-light rounded-bl-xl"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold-light rounded-br-xl"></div>
      
      <div className={cn("transition-all duration-1000 transform", isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10")}>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10">
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <div className={cn("absolute inset-0 bg-gold-light/10 rounded-full transition-all duration-700", isShimmer && "bg-gold-light/30")}></div>
            
            {/* Ganesha image */}
            <img src="/lovable-uploads/ganesha.png" alt="Lord Ganesha" className={cn("w-full h-full object-contain drop-shadow-lg transition-all duration-700 transform z-10 relative", isShimmer && "scale-105")} onError={e => {
            // Fallback to SVG if image fails to load
            e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%23800000' opacity='0.2'/%3E%3Cpath d='M50,20 C60,20 65,30 65,40 C65,45 60,50 65,55 C70,60 75,60 75,70 C75,80 65,85 50,85 C35,85 25,80 25,70 C25,60 30,60 35,55 C40,50 35,45 35,40 C35,30 40,20 50,20 Z' fill='%23FFD700' stroke='%23800000' stroke-width='2'/%3E%3Ccircle cx='45' cy='40' r='3' fill='%23800000'/%3E%3Ccircle cx='55' cy='40' r='3' fill='%23800000'/%3E%3Cpath d='M43,50 C45,53 55,53 57,50' stroke='%23800000' stroke-width='2' fill='none'/%3E%3C/svg%3E";
          }} />
            
            {/* Animated lotus petals */}
            {isShimmer && [...Array(8)].map((_, i) => <div key={i} className="absolute w-full h-full top-0 left-0" style={{
            transform: `rotate(${i * 45}deg)`,
            animation: `petal-fade 2s ease-out forwards ${i * 0.1}s`
          }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-10 bg-gold-light/30 rounded-full blur-sm" style={{
              transformOrigin: 'center 80px'
            }}></div>
              </div>)}
          </div>
          
          <div className="text-center md:text-left">
            <h3 className="font-cormorant text-xl md:text-2xl gold-text mb-2">
              ॐ गणेशाय नमः
            </h3>
            
            <div className={cn("gold-text font-cormorant text-lg md:text-xl italic leading-relaxed transition-all", isShimmer && "text-gold-light")}>
              <p className="mb-1">वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।</p>
              <p>निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥</p>
            </div>
            
            
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes petal-fade {
          0% { opacity: 0; transform: rotate(${Math.random() * 45}deg) scale(0); }
          50% { opacity: 1; transform: rotate(${Math.random() * 90}deg) scale(1); }
          100% { opacity: 0; transform: rotate(${Math.random() * 180}deg) scale(1.5); }
        }
      `}</style>
    </div>;
};
export default GaneshaHeader;