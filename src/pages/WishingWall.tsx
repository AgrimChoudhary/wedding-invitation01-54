
import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import GaneshaHeader from '@/components/GaneshaHeader';

// Types for our wishes data structure
interface Reply {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
}

interface Wish {
  id: string;
  author: string;
  content: string;
  likes: number;
  liked: boolean;
  timestamp: Date;
  replies: Reply[];
}

const WishingWall: React.FC = () => {
  // State for the new wish form
  const [newWish, setNewWish] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  
  // Sample wishes data (would be replaced by database data in production)
  const [wishes, setWishes] = useState<Wish[]>([
    {
      id: '1',
      author: 'Anita & Rahul',
      content: 'Wishing you both a lifetime of love and happiness! May your journey together be as beautiful as your wedding day.',
      likes: 12,
      liked: false,
      timestamp: new Date(2025, 2, 25),
      replies: [
        {
          id: '101',
          author: 'Priya',
          content: 'Thank you so much! We can\'t wait to see you at the wedding.',
          timestamp: new Date(2025, 2, 26)
        }
      ]
    },
    {
      id: '2',
      author: 'Deepak Uncle',
      content: 'बेटी की शादी का यह सुनहरा अवसर हो मंगलमय, आने वाले कल में आप दोनों का जीवन सुखमय हो। हार्दिक शुभकामनाएँ!',
      likes: 8,
      liked: false,
      timestamp: new Date(2025, 2, 24),
      replies: []
    },
    {
      id: '3',
      author: 'Meera & Family',
      content: 'Our hearts are filled with joy knowing you two wonderful souls are uniting. May your marriage be blessed with love, joy, and companionship for all the years of your lives!',
      likes: 5,
      liked: true,
      timestamp: new Date(2025, 2, 20),
      replies: []
    }
  ]);

  // Handle posting a new wish
  const handlePostWish = () => {
    if (!newWish.trim() || !authorName.trim()) return;
    
    const wish: Wish = {
      id: Math.random().toString(36).substring(7),
      author: authorName,
      content: newWish,
      likes: 0,
      liked: false,
      timestamp: new Date(),
      replies: []
    };
    
    setWishes([wish, ...wishes]);
    setNewWish('');
    setAuthorName('');
  };
  
  // Handle liking a wish
  const handleLike = (id: string) => {
    setWishes(wishes.map(wish => {
      if (wish.id === id) {
        return {
          ...wish,
          likes: wish.liked ? wish.likes - 1 : wish.likes + 1,
          liked: !wish.liked
        };
      }
      return wish;
    }));
  };
  
  // Toggle reply form visibility
  const toggleReplyForm = (id: string | null) => {
    setReplyingTo(replyingTo === id ? null : id);
    setReplyText('');
  };
  
  // Handle submitting a reply
  const handlePostReply = (wishId: string) => {
    if (!replyText.trim() || !authorName.trim()) return;
    
    const reply: Reply = {
      id: Math.random().toString(36).substring(7),
      author: authorName,
      content: replyText,
      timestamp: new Date()
    };
    
    setWishes(wishes.map(wish => {
      if (wish.id === wishId) {
        return {
          ...wish,
          replies: [...wish.replies, reply]
        };
      }
      return wish;
    }));
    
    setReplyText('');
    setReplyingTo(null);
  };
  
  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-gradient-to-b from-red-50 to-amber-50 min-h-screen pb-20">
      <GaneshaHeader />
      
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-center text-3xl md:text-4xl font-bold text-red-800 mb-2">Wishing Wall</h1>
        <h2 className="text-center text-xl text-amber-700 mb-8">Share your blessings with Priya & Vijay</h2>
        
        {/* New wish form */}
        <div className="bg-white rounded-lg shadow-lg p-5 mb-10 border-t-4 border-red-700">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Post Your Wishes</h3>
          
          <Input
            placeholder="Your Name"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="mb-3 border-amber-200 focus:border-amber-400"
          />
          
          <Textarea
            placeholder="Write your heartfelt wishes for the couple..."
            value={newWish}
            onChange={(e) => setNewWish(e.target.value)}
            className="mb-4 min-h-[100px] border-amber-200 focus:border-amber-400"
          />
          
          <div className="flex justify-end">
            <Button 
              onClick={handlePostWish}
              className="bg-red-700 hover:bg-red-800 text-white flex items-center gap-2"
            >
              <Send size={16} /> Post Wish
            </Button>
          </div>
        </div>
        
        {/* Wishes list */}
        <div className="space-y-6">
          {wishes.map((wish) => (
            <div key={wish.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-5">
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{wish.author}</h4>
                  <span className="text-sm text-gray-500">{formatDate(wish.timestamp)}</span>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">{wish.content}</p>
                
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => handleLike(wish.id)}
                    className={`flex items-center gap-1 ${wish.liked ? 'text-red-600' : 'text-gray-500'} hover:text-red-600 transition-colors`}
                  >
                    <Heart size={18} fill={wish.liked ? "currentColor" : "none"} /> 
                    <span>{wish.likes}</span>
                  </button>
                  
                  <button 
                    onClick={() => toggleReplyForm(wish.id)}
                    className="flex items-center gap-1 text-gray-500 hover:text-amber-600 transition-colors"
                  >
                    <MessageCircle size={18} /> 
                    <span>{wish.replies.length > 0 ? wish.replies.length : ''} Reply</span>
                  </button>
                </div>
              </div>
              
              {/* Replies section */}
              {wish.replies.length > 0 && (
                <div className="bg-amber-50 px-5 pt-3 pb-1">
                  <h5 className="text-sm font-medium text-amber-800 mb-2">Replies</h5>
                  {wish.replies.map((reply) => (
                    <div key={reply.id} className="mb-3 pl-3 border-l-2 border-amber-200">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-sm text-gray-800">{reply.author}</span>
                        <span className="text-xs text-gray-500">{formatDate(reply.timestamp)}</span>
                      </div>
                      <p className="text-sm text-gray-700">{reply.content}</p>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Reply form */}
              {replyingTo === wish.id && (
                <div className="bg-amber-50 p-4">
                  <Input
                    placeholder="Your Name"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="mb-3 border-amber-200 focus:border-amber-400 bg-white"
                  />
                  <Textarea
                    placeholder="Write your reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="mb-3 border-amber-200 focus:border-amber-400 bg-white"
                  />
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => toggleReplyForm(null)}
                      className="border-amber-400 text-amber-700 hover:bg-amber-100"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={() => handlePostReply(wish.id)}
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      Post Reply
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishingWall;
