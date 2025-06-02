
import React, { useState, useEffect } from 'react';
import { Trophy, Crown, TrendingUp, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface PollOption {
  id: string;
  team: 'rcb' | 'pbks';
  votes: number;
}

interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  total_votes: number;
  expires_at: string;
}

const RCBPoll = ({ guestName }: { guestName: string }) => {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [userVote, setUserVote] = useState<string | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate poll data - in real app this would come from database
    const mockPoll: Poll = {
      id: 'ipl-2025-final',
      question: 'Who will lift the IPL 2025 Trophy?',
      options: [
        { id: 'rcb', team: 'rcb', votes: Math.floor(Math.random() * 1000) + 500 },
        { id: 'pbks', team: 'pbks', votes: Math.floor(Math.random() * 800) + 300 }
      ],
      total_votes: 0,
      expires_at: '2025-06-03T19:30:00Z'
    };
    
    mockPoll.total_votes = mockPoll.options.reduce((sum, option) => sum + option.votes, 0);
    setPoll(mockPoll);

    // Check if user has already voted
    const savedVote = localStorage.getItem(`poll_vote_${mockPoll.id}_${guestName}`);
    if (savedVote) {
      setUserVote(savedVote);
    }
  }, [guestName]);

  const handleVote = async (teamId: string) => {
    if (!poll || userVote || isVoting) return;

    setIsVoting(true);
    
    // Simulate vote submission
    setTimeout(() => {
      setUserVote(teamId);
      localStorage.setItem(`poll_vote_${poll.id}_${guestName}`, teamId);
      
      // Update poll counts
      const updatedPoll = {
        ...poll,
        options: poll.options.map(option => 
          option.id === teamId 
            ? { ...option, votes: option.votes + 1 }
            : option
        ),
        total_votes: poll.total_votes + 1
      };
      setPoll(updatedPoll);
      
      toast({
        title: "Vote cast! 🗳️",
        description: `You voted for ${teamId.toUpperCase()}! May the best team win! 🏆`,
        variant: "default",
      });
      
      setIsVoting(false);
    }, 1000);
  };

  if (!poll) return null;

  const rcbOption = poll.options.find(o => o.team === 'rcb')!;
  const pbksOption = poll.options.find(o => o.team === 'pbks')!;
  
  const rcbPercentage = poll.total_votes > 0 ? (rcbOption.votes / poll.total_votes) * 100 : 0;
  const pbksPercentage = poll.total_votes > 0 ? (pbksOption.votes / poll.total_votes) * 100 : 0;

  return (
    <div className="bg-gradient-to-br from-red-900/60 to-yellow-800/60 backdrop-blur-sm border-2 border-yellow-400/40 rounded-xl p-6 shadow-2xl animate-fade-in">
      <div className="text-center mb-6">
        <div className="flex justify-center items-center gap-2 mb-3">
          <Trophy className="text-yellow-400 animate-bounce" size={24} />
          <h3 className="font-cormorant text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-400">
            IPL 2025 Final Prediction
          </h3>
          <Crown className="text-yellow-400 animate-pulse" size={24} />
        </div>
        <p className="text-yellow-100/80 text-lg">{poll.question}</p>
        <div className="flex items-center justify-center gap-2 mt-2 text-sm text-yellow-300/70">
          <Users size={16} />
          <span>{poll.total_votes.toLocaleString()} votes cast</span>
          <TrendingUp size={16} />
        </div>
      </div>

      <div className="space-y-4">
        {/* RCB Option */}
        <div className="relative">
          <button
            onClick={() => handleVote('rcb')}
            disabled={!!userVote || isVoting}
            className={cn(
              "w-full p-4 rounded-lg border-2 transition-all duration-300 relative overflow-hidden",
              userVote === 'rcb' 
                ? "border-yellow-400 bg-gradient-to-r from-red-600/80 to-yellow-500/80 shadow-lg"
                : userVote
                  ? "border-gray-600 bg-gray-800/60 opacity-70"
                  : "border-red-400/60 bg-red-800/60 hover:border-red-400 hover:bg-red-700/70 hover:scale-[1.02] shadow-md hover:shadow-lg",
              isVoting && "animate-pulse"
            )}
          >
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center">
                  <Crown className="text-yellow-400" size={16} />
                </div>
                <span className="font-bold text-white text-lg">Royal Challengers Bangalore</span>
              </div>
              <div className="text-right">
                <div className="text-yellow-400 font-bold text-xl">{rcbPercentage.toFixed(1)}%</div>
                <div className="text-yellow-200/70 text-sm">{rcbOption.votes.toLocaleString()} votes</div>
              </div>
            </div>
            
            {userVote && (
              <div 
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-500 to-yellow-400 transition-all duration-1000"
                style={{ width: `${rcbPercentage}%` }}
              />
            )}
          </button>
        </div>

        {/* VS Divider */}
        <div className="flex items-center justify-center">
          <div className="bg-gradient-to-r from-red-500 to-yellow-500 text-white font-bold px-4 py-2 rounded-full text-sm animate-pulse">
            VS
          </div>
        </div>

        {/* PBKS Option */}
        <div className="relative">
          <button
            onClick={() => handleVote('pbks')}
            disabled={!!userVote || isVoting}
            className={cn(
              "w-full p-4 rounded-lg border-2 transition-all duration-300 relative overflow-hidden",
              userVote === 'pbks' 
                ? "border-yellow-400 bg-gradient-to-r from-red-600/80 to-blue-600/80 shadow-lg"
                : userVote
                  ? "border-gray-600 bg-gray-800/60 opacity-70"
                  : "border-red-400/60 bg-red-800/60 hover:border-red-400 hover:bg-red-700/70 hover:scale-[1.02] shadow-md hover:shadow-lg",
              isVoting && "animate-pulse"
            )}
          >
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-blue-600 rounded-full flex items-center justify-center">
                  <Trophy className="text-yellow-400" size={16} />
                </div>
                <span className="font-bold text-white text-lg">Punjab Kings</span>
              </div>
              <div className="text-right">
                <div className="text-yellow-400 font-bold text-xl">{pbksPercentage.toFixed(1)}%</div>
                <div className="text-yellow-200/70 text-sm">{pbksOption.votes.toLocaleString()} votes</div>
              </div>
            </div>
            
            {userVote && (
              <div 
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-600 to-blue-600 transition-all duration-1000"
                style={{ width: `${pbksPercentage}%` }}
              />
            )}
          </button>
        </div>
      </div>

      {userVote && (
        <div className="mt-4 text-center">
          <div className="bg-gradient-to-r from-yellow-600/20 to-red-600/20 border border-yellow-400/30 rounded-lg p-3">
            <p className="text-yellow-200 text-sm">
              <span className="font-bold">Thank you for voting!</span> 
              {userVote === 'rcb' ? " You're backing the Red Army! 🔴" : " PBKS has your support! 💜"}
            </p>
            <p className="text-yellow-300/70 text-xs mt-1">
              Poll closes on June 3rd, 2025 at 7:30 PM
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RCBPoll;
