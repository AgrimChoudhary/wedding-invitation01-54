import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Send, Trophy, Crown, Flame, Zap, Star, Users, TrendingUp, Camera, X, ThumbsUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface Wish {
  id: string;
  guest_name: string;
  wish_text: string;
  wish_type: 'support' | 'banter' | 'prediction';
  team_preference: 'rcb' | 'other' | 'neutral';
  created_at: string;
  likes_count: number;
  replies_count: number;
  image_url?: string;
}

interface WishReply {
  id: string;
  wish_id: string;
  guest_name: string;
  reply_text: string;
  created_at: string;
  likes_count: number;
}

interface ReplyLike {
  id: string;
  reply_id: string;
  guest_name: string;
}

const WishingWall = ({ guestName }: { guestName: string }) => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [newWish, setNewWish] = useState('');
  const [wishType, setWishType] = useState<'support' | 'banter' | 'prediction'>('support');
  const [teamPreference, setTeamPreference] = useState<'rcb' | 'other' | 'neutral'>('rcb');
  const [expandedWish, setExpandedWish] = useState<string | null>(null);
  const [replies, setReplies] = useState<{ [key: string]: WishReply[] }>({});
  const [newReply, setNewReply] = useState<{ [key: string]: string }>({});
  const [likedWishes, setLikedWishes] = useState<Set<string>>(new Set());
  const [likedReplies, setLikedReplies] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchWishes();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('wishes-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'wishes'
      }, () => {
        fetchWishes();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchWishes = async () => {
    const { data, error } = await supabase
      .from('wishes')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching wishes:', error);
      return;
    }

    setWishes(data || []);
  };

  const fetchReplies = async (wishId: string) => {
    const { data, error } = await supabase
      .from('wish_replies')
      .select('*')
      .eq('wish_id', wishId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching replies:', error);
      return;
    }

    setReplies(prev => ({ ...prev, [wishId]: data || [] }));
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "Image too large 📸",
          description: "Please select an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const submitWish = async () => {
    if (!newWish.trim() || isSubmitting) return;

    setIsSubmitting(true);
    
    // For now, we'll simulate image upload and just store the preview
    // In a real app, you'd upload to Supabase storage first
    const imageUrl = imagePreview || undefined;

    const { error } = await supabase
      .from('wishes')
      .insert({
        guest_name: guestName,
        wish_text: newWish.trim(),
        wish_type: wishType,
        team_preference: teamPreference,
        image_url: imageUrl
      });

    if (error) {
      toast({
        title: "Error posting wish 😞",
        description: "Please try again!",
        variant: "destructive",
      });
    } else {
      setNewWish('');
      setSelectedImage(null);
      setImagePreview(null);
      toast({
        title: "Wish posted! 🔥",
        description: "Your message is now live on the RCB wall!",
        variant: "default",
      });
    }
    setIsSubmitting(false);
  };

  const toggleLike = async (wishId: string) => {
    if (likedWishes.has(wishId)) {
      // Unlike
      await supabase
        .from('wish_likes')
        .delete()
        .eq('wish_id', wishId)
        .eq('guest_name', guestName);
      
      setLikedWishes(prev => {
        const newSet = new Set(prev);
        newSet.delete(wishId);
        return newSet;
      });
    } else {
      // Like
      await supabase
        .from('wish_likes')
        .insert({
          wish_id: wishId,
          guest_name: guestName
        });
      
      setLikedWishes(prev => new Set(prev).add(wishId));
    }
    fetchWishes();
  };

  const toggleReplyLike = async (replyId: string, wishId: string) => {
    // Simulate reply like functionality
    if (likedReplies.has(replyId)) {
      setLikedReplies(prev => {
        const newSet = new Set(prev);
        newSet.delete(replyId);
        return newSet;
      });
      toast({
        title: "Like removed! 👍",
        description: "Reply unliked successfully",
        variant: "default",
      });
    } else {
      setLikedReplies(prev => new Set(prev).add(replyId));
      toast({
        title: "Reply liked! 🚀",
        description: "Show some love for great comments!",
        variant: "default",
      });
    }
  };

  const submitReply = async (wishId: string) => {
    const replyText = newReply[wishId]?.trim();
    if (!replyText) return;

    const { error } = await supabase
      .from('wish_replies')
      .insert({
        wish_id: wishId,
        guest_name: guestName,
        reply_text: replyText
      });

    if (error) {
      toast({
        title: "Error posting reply 😞",
        description: "Please try again!",
        variant: "destructive",
      });
    } else {
      setNewReply(prev => ({ ...prev, [wishId]: '' }));
      fetchReplies(wishId);
      toast({
        title: "Reply posted! 🚀",
        description: "Join the conversation!",
        variant: "default",
      });
    }
  };

  const toggleReplies = (wishId: string) => {
    if (expandedWish === wishId) {
      setExpandedWish(null);
    } else {
      setExpandedWish(wishId);
      if (!replies[wishId]) {
        fetchReplies(wishId);
      }
    }
  };

  const getWishIcon = (type: string) => {
    switch (type) {
      case 'support': return <Trophy className="text-yellow-400" size={16} />;
      case 'banter': return <Flame className="text-red-400" size={16} />;
      case 'prediction': return <Star className="text-blue-400" size={16} />;
      default: return <Heart className="text-pink-400" size={16} />;
    }
  };

  const getTeamBadge = (preference: string) => {
    switch (preference) {
      case 'rcb': return '🔴 RCB Army';
      case 'other': return '⚡ Opposition';
      case 'neutral': return '🏏 Cricket Fan';
      default: return '🏏 Fan';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-3 mb-4">
          <Crown className="text-yellow-400 animate-bounce" size={32} />
          <h2 className="font-cormorant text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-400">
            RCB Wishing Wall
          </h2>
          <Trophy className="text-yellow-400 animate-bounce" size={32} />
        </div>
        <p className="text-yellow-100/80 text-lg">
          💬 Share your wishes, banter, and predictions! Let the cricket fever spread! 🏏
        </p>
        <div className="flex justify-center items-center gap-4 mt-4 text-sm text-yellow-300/70">
          <span className="flex items-center gap-1">
            <Users size={16} />
            {wishes.length} Messages
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp size={16} />
            Going Viral!
          </span>
        </div>
      </div>

      {/* Post New Wish */}
      <div className="bg-gradient-to-br from-red-900/40 to-yellow-800/40 backdrop-blur-sm border-2 border-yellow-400/30 rounded-xl p-6 mb-8 shadow-2xl">
        <div className="flex items-center gap-2 mb-4">
          <Crown className="text-yellow-400" size={20} />
          <span className="text-yellow-400 font-bold">{guestName}</span>
        </div>
        
        <textarea
          value={newWish}
          onChange={(e) => setNewWish(e.target.value)}
          placeholder="Share your RCB wish, banter, or match prediction! 🔥"
          className="w-full h-24 p-3 bg-red-900/60 border border-yellow-400/40 rounded-lg text-yellow-100 placeholder-yellow-300/50 focus:outline-none focus:border-yellow-400 resize-none"
          maxLength={300}
        />

        {/* Image Upload Section */}
        <div className="mt-4">
          {!imagePreview ? (
            <label className="flex items-center gap-2 px-4 py-2 bg-red-800/60 border border-yellow-400/40 rounded-lg text-yellow-300 hover:bg-red-700/60 transition-all cursor-pointer w-fit">
              <Camera size={18} />
              <span>Add Image (Max 5MB)</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative inline-block">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="max-h-32 rounded-lg border-2 border-yellow-400/40"
              />
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4 mb-4">
          <select
            value={wishType}
            onChange={(e) => setWishType(e.target.value as any)}
            className="px-3 py-1 bg-red-800/60 border border-yellow-400/40 rounded-lg text-yellow-100 text-sm focus:outline-none focus:border-yellow-400"
          >
            <option value="support">🏆 Support</option>
            <option value="banter">🔥 Banter</option>
            <option value="prediction">⭐ Prediction</option>
          </select>
          
          <select
            value={teamPreference}
            onChange={(e) => setTeamPreference(e.target.value as any)}
            className="px-3 py-1 bg-red-800/60 border border-yellow-400/40 rounded-lg text-yellow-100 text-sm focus:outline-none focus:border-yellow-400"
          >
            <option value="rcb">🔴 RCB Army</option>
            <option value="other">⚡ Opposition</option>
            <option value="neutral">🏏 Neutral</option>
          </select>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs text-yellow-300/60">{newWish.length}/300</span>
          <button
            onClick={submitWish}
            disabled={!newWish.trim() || isSubmitting}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all duration-300",
              newWish.trim() && !isSubmitting
                ? "bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-500 hover:to-yellow-400 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                : "bg-gray-600/50 text-gray-400 cursor-not-allowed"
            )}
          >
            <Send size={16} />
            {isSubmitting ? 'Posting...' : 'Post Wish'}
          </button>
        </div>
      </div>

      {/* Wishes Feed */}
      <div className="space-y-4">
        {wishes.map((wish) => (
          <div
            key={wish.id}
            className="bg-gradient-to-br from-red-900/30 to-yellow-800/30 backdrop-blur-sm border border-yellow-400/20 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-yellow-400/40"
          >
            {/* Wish Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {getWishIcon(wish.wish_type)}
                  <span className="font-bold text-yellow-400">{wish.guest_name}</span>
                </div>
                <span className="text-xs px-2 py-1 bg-red-800/40 rounded-full text-yellow-300/80">
                  {getTeamBadge(wish.team_preference)}
                </span>
              </div>
              <span className="text-xs text-yellow-300/60">
                {formatDistanceToNow(new Date(wish.created_at), { addSuffix: true })}
              </span>
            </div>

            {/* Wish Content */}
            <p className="text-yellow-100 mb-3 leading-relaxed">{wish.wish_text}</p>

            {/* Wish Image */}
            {wish.image_url && (
              <div className="mb-3">
                <img 
                  src={wish.image_url} 
                  alt="Wish attachment" 
                  className="max-h-64 rounded-lg border border-yellow-400/30 hover:border-yellow-400/60 transition-all cursor-pointer"
                  onClick={() => window.open(wish.image_url, '_blank')}
                />
              </div>
            )}

            {/* Wish Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => toggleLike(wish.id)}
                className={cn(
                  "flex items-center gap-1 px-3 py-1 rounded-full transition-all duration-300",
                  likedWishes.has(wish.id)
                    ? "bg-red-600/60 text-red-200"
                    : "bg-red-800/40 text-yellow-300/80 hover:bg-red-700/60"
                )}
              >
                <Heart size={14} className={likedWishes.has(wish.id) ? "fill-current" : ""} />
                {wish.likes_count}
              </button>

              <button
                onClick={() => toggleReplies(wish.id)}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-800/40 text-yellow-300/80 hover:bg-yellow-700/60 transition-all duration-300"
              >
                <MessageCircle size={14} />
                {wish.replies_count}
              </button>
            </div>

            {/* Replies Section */}
            {expandedWish === wish.id && (
              <div className="mt-4 pt-4 border-t border-yellow-400/20">
                {/* Replies List */}
                {replies[wish.id]?.map((reply) => (
                  <div key={reply.id} className="mb-3 p-3 bg-red-900/30 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-yellow-400">{reply.guest_name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-yellow-300/60">
                          {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}
                        </span>
                        <button
                          onClick={() => toggleReplyLike(reply.id, wish.id)}
                          className={cn(
                            "flex items-center gap-1 px-2 py-1 rounded-full transition-all text-xs",
                            likedReplies.has(reply.id)
                              ? "bg-red-600/60 text-red-200"
                              : "bg-red-800/40 text-yellow-300/80 hover:bg-red-700/60"
                          )}
                        >
                          <ThumbsUp size={10} className={likedReplies.has(reply.id) ? "fill-current" : ""} />
                          {likedReplies.has(reply.id) ? "Liked" : "Like"}
                        </button>
                      </div>
                    </div>
                    <p className="text-yellow-100/90 text-sm">{reply.reply_text}</p>
                  </div>
                ))}

                {/* Reply Input */}
                <div className="flex gap-2 mt-3">
                  <input
                    type="text"
                    value={newReply[wish.id] || ''}
                    onChange={(e) => setNewReply(prev => ({ ...prev, [wish.id]: e.target.value }))}
                    placeholder="Add your reply..."
                    className="flex-1 px-3 py-2 bg-red-900/60 border border-yellow-400/40 rounded-lg text-yellow-100 placeholder-yellow-300/50 focus:outline-none focus:border-yellow-400 text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && submitReply(wish.id)}
                  />
                  <button
                    onClick={() => submitReply(wish.id)}
                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-yellow-500 text-white rounded-lg hover:from-red-500 hover:to-yellow-400 transition-all duration-300 text-sm font-bold"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {wishes.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="text-yellow-400/50 mx-auto mb-4" size={48} />
            <p className="text-yellow-100/60 text-lg">No wishes yet! Be the first to start the conversation! 🔥</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishingWall;
