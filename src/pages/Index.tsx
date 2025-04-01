import React, { useState, useEffect } from 'react';
import { Calendar, Flower, Heart, Music, Paintbrush, Sparkles, Star, Info, Sparkle } from 'lucide-react';
import { cn } from '@/lib/utils';
import EventCard from '@/components/EventCard';
import PhotoCarousel from '@/components/PhotoCarousel';
import Dashboard from '@/components/Dashboard';
import Countdown from '@/components/Countdown';
import GaneshaHeader from '@/components/GaneshaHeader';
import CoupleIllustration from '@/components/CoupleIllustration';
import { initCursorGlitter, initTouchGlitter, createMandalaEffect } from '@/utils/animationUtils';
import { useIsMobile } from '@/hooks/use-mobile';
import PhoneIcon from '@/components/PhoneIcon';
import { useNavigate } from 'react-router-dom';
import Diya from '@/components/Diya';
import FamilyDetailsDialog, { FamilyDetails } from '@/components/FamilyDetailsDialog';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import DashboardComingSoonPopup from '@/components/DashboardComingSoonPopup';

const brideFamily: FamilyDetails = {
  side: "bride",
  title: "Ramesh & Rameshi Family",
  description: "The bride's family is known for their warmth and hospitality.",
  members: [
    {
      name: "Ramesh Kumar",
      relation: "Father of the Bride",
      description: "A respected businessman who loves gardening and classical music in his free time.",
    },
    {
      name: "Rameshi Devi",
      relation: "Mother of the Bride",
      description: "A loving homemaker known for her delicious cooking and kind heart.",
    },
    {
      name: "Priya Kumar",
      relation: "The Bride",
      description: "A software engineer who loves to paint and travel. She met Vijay during a company hackathon.",
    },
    {
      name: "Rahul Kumar",
      relation: "Brother of the Bride",
      description: "Currently studying medicine and aspires to be a neurosurgeon.",
    }
  ]
};

const groomFamily: FamilyDetails = {
  side: "groom",
  title: "Harkesh & Harkeshi Family",
  description: "The groom's family has a rich cultural heritage and is known for their contributions to arts and education.",
  members: [
    {
      name: "Harkesh Singh",
      relation: "Father of the Groom",
      description: "A retired professor who now spends his time writing books on history.",
    },
    {
      name: "Harkeshi Kaur",
      relation: "Mother of the Groom",
      description: "A talented classical dancer who has taught dance to hundreds of students.",
    },
    {
      name: "Vijay Singh",
      relation: "The Groom",
      description: "A product manager who is passionate about photography and mountain climbing.",
    },
    {
      name: "Anita Singh",
      relation: "Sister of the Groom",
      description: "An architect who loves designing sustainable buildings.",
    }
  ]
};

// ... keep existing code (the rest of the Index component)
