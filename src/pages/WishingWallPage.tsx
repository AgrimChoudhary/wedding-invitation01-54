
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Crown, Trophy, Flame, Users } from 'lucide-react';
import WishingWall from '@/components/WishingWall';
import RCBViralMusic from '@/components/RCBViralMusic';
import { useToast } from '@/hooks/use-toast';

const WishingWallPage = () => {
  const navigate = useNavigate();
  const [guestName, setGuestName] = useState('RCB Haters');
  const { toast } = useToast();

  useEffect(() => {
    const storedName = localStorage.getItem('guestName');
    if (storedName) {
      setGuestName(storedName);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black relative overflow-x-hidden">
      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-20 h-20 opacity-20 animate-float">
        <Trophy className="text-yellow-400 w-full h-full" />
      </div>
      <div className="absolute bottom-20 right-10 w-16 h-16 opacity-20 animate-pulse">
        <Crown className="text-red-400 w-full h-full" />
      </div>
      <div className="absolute top-1/3 right-20 w-12 h-12 opacity-15 animate-bounce">
        <Flame className="text-yellow-500 w-full h-full" />
      </div>

      {/* RCB Viral Music Player */}
      <RCBViralMusic />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-red-900/90 to-red-800/90 backdrop-blur-sm border-b border-yellow-400/30 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/invitation')}
              className="flex items-center gap-2 px-4 py-2 bg-red-800/60 hover:bg-red-700/60 border border-yellow-400/40 rounded-lg transition-all duration-300 text-yellow-100 hover:text-yellow-200"
            >
              <ArrowLeft size={18} />
              <span className="hidden sm:inline">Back to Invitation</span>
              <span className="sm:hidden">Back</span>
            </button>

            <div className="flex items-center gap-2">
              <Crown className="text-yellow-400" size={20} />
              <span className="text-yellow-400 font-bold text-sm sm:text-base">{guestName}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <WishingWall guestName={guestName} />
      </main>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 z-40 sm:hidden">
        <div className="bg-gradient-to-r from-red-600 to-yellow-500 p-3 rounded-full shadow-lg animate-pulse">
          <Users className="text-white" size={24} />
        </div>
      </div>

      {/* Enhanced RCB themed background pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60C43.431 60 30 46.569 30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }} />
      </div>
    </div>
  );
};

export default WishingWallPage;
