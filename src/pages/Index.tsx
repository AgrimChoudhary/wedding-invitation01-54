import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import AudioPlayer from '@/components/AudioPlayer';
import MainContent from '@/components/MainContent';
import WishingWall from '@/components/WishingWall';
import Countdown from '@/components/Countdown';

interface Wish {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  avatar?: string;
  likes?: number;
  guestId?: string;
  createdAt?: string;
}

const Index = () => {
  const searchParams = useSearchParams();

  const urlParams = new URLSearchParams(searchParams);

  const eventId = urlParams.get('eventId') || '659749c98f69c901b4997941';
  const guestId = urlParams.get('guestId') || '659749c98f69c901b4997942';
  const guestName = urlParams.get('guestName') || 'Guest';
  const enableAudio = urlParams.get('enableAudio') !== 'false';
  const enableWishingWall = true; // Force enable for preview
  const allowWishPosting = urlParams.get('allowWishPosting') !== 'false';
  const showWishLikes = urlParams.get('showWishLikes') !== 'false';
  const maxWishLength = parseInt(urlParams.get('maxWishLength') || '280');

  // Dummy wishes data for preview
  const dummyWishes = [
    {
      id: '1',
      name: 'Priya Sharma',
      message: 'Wishing you both a lifetime filled with endless love, joy, and beautiful memories. May your journey together be blessed with happiness, prosperity, and all the wonderful things life has to offer. Congratulations on finding your soulmate!',
      timestamp: '2 hours ago',
      likes: 24,
      guestId: 'guest1',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2', 
      name: 'Rahul Kumar',
      message: 'Such a beautiful couple! May your love story continue to inspire others and may you find strength in each other through all of life\'s adventures. Here\'s to a future filled with laughter, love, and endless happiness.',
      timestamp: '5 hours ago',
      likes: 18,
      guestId: 'guest2',
      createdAt: '2024-01-15T07:30:00Z'
    },
    {
      id: '3',
      name: 'Anjali Patel',
      message: 'Congratulations on your special day! Wishing you both all the happiness in the world as you begin this wonderful journey together. May your marriage be everything you\'ve dreamed of and more.',
      timestamp: '1 day ago',
      likes: 32,
      guestId: 'guest3',
      createdAt: '2024-01-14T15:20:00Z'
    },
    {
      id: '4',
      name: 'Arjun Singh',
      message: 'Best wishes to the happy couple! May your love grow stronger with each passing day and may you always find reasons to smile together. Congratulations on finding your perfect match!',
      timestamp: '1 day ago',
      likes: 15,
      guestId: 'guest4',
      createdAt: '2024-01-14T12:45:00Z'
    }
  ];

  useEffect(() => {
    // Send a message to the parent window to indicate that the iframe has loaded
    window.parent.postMessage({ type: 'IFRAME_LOADED', data: { eventId, guestId } }, '*');

    // Event listener for receiving messages from the parent
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'RELOAD_IFRAME') {
        // Reload the iframe by changing the src
        window.location.reload();
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [eventId, guestId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-cream/50">
      {enableAudio && (
        <AudioPlayer />
      )}

      <MainContent guestName={guestName} />

      <Countdown />

      {/* Wishing Wall Section - Always show for preview */}
      {enableWishingWall && (
        <WishingWall
          guestName={guestName}
          eventId={eventId}
          guestId={guestId}
          allowWishPosting={allowWishPosting}
          showWishLikes={showWishLikes}
          maxWishLength={maxWishLength}
          wishes={dummyWishes}
          userLikes={['1', '3']} // Dummy user likes for guest1 and guest3
        />
      )}
    </div>
  );
};

export default Index;
