import { getDynamicData } from '@/utils/urlParams';
import { FAMILY_PHOTOS } from './familyPhotos';

// Get dynamic data from URL params or localStorage
const dynamicData = getDynamicData();

// Configuration for ordering - allows customization of which comes first
export const ORDER_CONFIG = {
  // Set to true if groom should be first, false if bride should be first
  GROOM_FIRST: dynamicData.groomFirst !== undefined ? dynamicData.groomFirst : true,
};

// Helper function to get ordered names based on configuration
export const getOrderedNames = () => {
  const brideName = dynamicData.brideName || "Bride Name";
  const groomName = dynamicData.groomName || "Groom Name";
  
  if (ORDER_CONFIG.GROOM_FIRST) {
    return {
      firstName: groomName,
      secondName: brideName
    };
  } else {
    return {
      firstName: brideName,
      secondName: groomName
    };
  }
};

// Helper function to get ordered families based on configuration
export const getOrderedFamilies = () => {
  if (ORDER_CONFIG.GROOM_FIRST) {
    return {
      firstFamily: GROOM_FAMILY,
      secondFamily: BRIDE_FAMILY
    };
  } else {
    return {
      firstFamily: BRIDE_FAMILY,
      secondFamily: GROOM_FAMILY
    };
  }
};

// Main couple information with dynamic data support
export const BRIDE_NAME = dynamicData.brideName || "Bride Name";
export const GROOM_NAME = dynamicData.groomName || "Groom Name";
export const WEDDING_DATE = dynamicData.weddingDate || "30 June 2025";
export const WEDDING_TIME = dynamicData.weddingTime || "5:00 PM - 8:00 PM";
export const COUPLE_TAGLINE = dynamicData.coupleTagline || "Two hearts, one soul, forever together";

// Guest information
export const GUEST_NAME = dynamicData.guestName || "Guest Name";

// Events information with dynamic data support
export const EVENTS = dynamicData.events && dynamicData.events.length > 0 ? 
  dynamicData.events.map(event => ({
    EVENT_NAME: event.name,
    EVENT_DATE: event.date,
    EVENT_TIME: event.time,
    EVENT_VENUE: event.venue,
    EVENT_VENUE_MAP_LINK: event.mapLink || "https://maps.google.com/"
  })) : [
    {
      EVENT_NAME: "Mehndi Ceremony",
      EVENT_DATE: "28 June 2025",
      EVENT_TIME: "4:00 PM - 8:00 PM",
      EVENT_VENUE: "Venue Name, Address",
      EVENT_VENUE_MAP_LINK: "https://maps.google.com/"
    },
    {
      EVENT_NAME: "Sangeet Night",
      EVENT_DATE: "29 June 2025", 
      EVENT_TIME: "7:00 PM - 11:00 PM",
      EVENT_VENUE: "Venue Name, Address",
      EVENT_VENUE_MAP_LINK: "https://maps.google.com/"
    },
    {
      EVENT_NAME: "Haldi Ceremony",
      EVENT_DATE: "30 June 2025",
      EVENT_TIME: "10:00 AM - 12:00 PM", 
      EVENT_VENUE: "Venue Name, Address",
      EVENT_VENUE_MAP_LINK: "https://maps.google.com/"
    },
    {
      EVENT_NAME: "Wedding Ceremony",
      EVENT_DATE: "30 June 2025",
      EVENT_TIME: "5:00 PM - 8:00 PM",
      EVENT_VENUE: "Venue Name, Address", 
      EVENT_VENUE_MAP_LINK: "https://maps.google.com/"
    }
  ];

// Family information with dynamic data support
export const BRIDE_FAMILY = dynamicData.brideFamily ? {
  FAMILY_SIDE: "bride" as const,
  FAMILY_TITLE: dynamicData.brideFamily.title,
  FAMILY_DESCRIPTION: dynamicData.brideFamily.description,
  FAMILY_ADDRESS: dynamicData.brideFamily.address,
  FAMILY_MEMBERS: dynamicData.brideFamily.members.map(member => ({
    MEMBER_NAME: member.name,
    MEMBER_RELATION: member.relation,
    MEMBER_DESCRIPTION: member.description,
    MEMBER_PHOTO: member.photo
  }))
} : {
  FAMILY_SIDE: "bride" as const,
  FAMILY_TITLE: "Sharma Family",
  FAMILY_DESCRIPTION: "A loving family rooted in tradition and values, welcoming everyone with open hearts.",
  FAMILY_ADDRESS: "123 Heritage Lane, Mumbai, Maharashtra 400001",
  FAMILY_MEMBERS: [
    {
      MEMBER_NAME: "Sunita Sharma",
      MEMBER_RELATION: "Mother of the Bride",
      MEMBER_DESCRIPTION: "A caring mother who has been the pillar of strength for the family.",
      MEMBER_PHOTO: FAMILY_PHOTOS.BRIDE_MOTHER
    },
    {
      MEMBER_NAME: "Rajesh Sharma",
      MEMBER_RELATION: "Father of the Bride",
      MEMBER_DESCRIPTION: "A devoted father and successful businessman who values family above all.",
      MEMBER_PHOTO: FAMILY_PHOTOS.BRIDE_FATHER
    },
    {
      MEMBER_NAME: "Rohit Sharma",
      MEMBER_RELATION: "Brother",
      MEMBER_DESCRIPTION: "The protective elder brother who has always been a friend and guide.",
      MEMBER_PHOTO: FAMILY_PHOTOS.BRIDE_BROTHER
    },
    {
      MEMBER_NAME: "Kavya Sharma",
      MEMBER_RELATION: "Sister",
      MEMBER_DESCRIPTION: "The fun-loving younger sister who brings joy and laughter to every gathering.",
      MEMBER_PHOTO: FAMILY_PHOTOS.BRIDE_SISTER
    },
    {
      MEMBER_NAME: "Kamala Devi",
      MEMBER_RELATION: "Grandmother",
      MEMBER_DESCRIPTION: "The wise matriarch whose blessings and stories have shaped the family.",
      MEMBER_PHOTO: FAMILY_PHOTOS.BRIDE_GRANDMOTHER
    },
    {
      MEMBER_NAME: "Mohan Sharma",
      MEMBER_RELATION: "Grandfather",
      MEMBER_DESCRIPTION: "The respected elder whose teachings and values guide the family.",
      MEMBER_PHOTO: FAMILY_PHOTOS.BRIDE_GRANDFATHER
    }
  ]
};

export const GROOM_FAMILY = dynamicData.groomFamily ? {
  FAMILY_SIDE: "groom" as const,
  FAMILY_TITLE: dynamicData.groomFamily.title,
  FAMILY_DESCRIPTION: dynamicData.groomFamily.description,
  FAMILY_ADDRESS: dynamicData.groomFamily.address,
  FAMILY_MEMBERS: dynamicData.groomFamily.members.map(member => ({
    MEMBER_NAME: member.name,
    MEMBER_RELATION: member.relation,
    MEMBER_DESCRIPTION: member.description,
    MEMBER_PHOTO: member.photo
  }))
} : {
  FAMILY_SIDE: "groom" as const,
  FAMILY_TITLE: "Gupta Family",
  FAMILY_DESCRIPTION: "A warm and welcoming family that believes in love, unity, and celebrating life together.",
  FAMILY_ADDRESS: "456 Garden Street, Delhi, Delhi 110001",
  FAMILY_MEMBERS: [
    {
      MEMBER_NAME: "Meera Gupta",
      MEMBER_RELATION: "Mother of the Groom",
      MEMBER_DESCRIPTION: "A loving mother known for her culinary skills and warm hospitality.",
      MEMBER_PHOTO: FAMILY_PHOTOS.GROOM_MOTHER
    },
    {
      MEMBER_NAME: "Vikram Gupta",
      MEMBER_RELATION: "Father of the Groom",
      MEMBER_DESCRIPTION: "A wise father and respected teacher who has instilled strong values.",
      MEMBER_PHOTO: FAMILY_PHOTOS.GROOM_FATHER
    },
    {
      MEMBER_NAME: "Arjun Gupta",
      MEMBER_RELATION: "Brother",
      MEMBER_DESCRIPTION: "The supportive younger brother who is always ready with a helping hand.",
      MEMBER_PHOTO: FAMILY_PHOTOS.GROOM_BROTHER
    },
    {
      MEMBER_NAME: "Riya Gupta",
      MEMBER_RELATION: "Sister",
      MEMBER_DESCRIPTION: "The artistic sister who adds creativity and beauty to every celebration.",
      MEMBER_PHOTO: FAMILY_PHOTOS.GROOM_SISTER
    },
    {
      MEMBER_NAME: "Lakshmi Devi",
      MEMBER_RELATION: "Grandmother",
      MEMBER_DESCRIPTION: "The beloved grandmother whose prayers and love bless the entire family.",
      MEMBER_PHOTO: FAMILY_PHOTOS.GROOM_GRANDMOTHER
    },
    {
      MEMBER_NAME: "Ram Gupta",
      MEMBER_RELATION: "Grandfather",
      MEMBER_DESCRIPTION: "The gentle grandfather who shares wisdom and stories from the past.",
      MEMBER_PHOTO: FAMILY_PHOTOS.GROOM_GRANDFATHER
    }
  ]
};

// Photos with dynamic data support
export const PHOTOS = dynamicData.photos && dynamicData.photos.length > 0 ?
  dynamicData.photos.map((photo, index) => ({
    [`PHOTO_${index + 1}`]: photo
  })) : [
    {
      PHOTO_1: "/lovable-uploads/5d906655-818b-462e-887e-0a392db20d48.png"
    },
    {
      PHOTO_2: "/lovable-uploads/e1d52835-2f4a-42a2-8647-66379e0cc295.png"
    },
    {
      PHOTO_3: "/lovable-uploads/6d392f5b-28f1-4710-9eda-8e7c1a9bfe8e.png"
    },
    {
      PHOTO_4: "/lovable-uploads/fd7253c5-605a-4dee-ac79-cd585063976d.png"
    }
  ];

// Venue information with dynamic data support
export const VENUE_ADDRESS = dynamicData.venueAddress || "Wedding Venue Name, Complete Address, City, State";
export const VENUE_MAP_LINK = dynamicData.venueMapLink || "https://maps.google.com/";

// Contact Information with proper structure
export const CONTACTS = [
  {
    CONTACT_NAME: "Rajesh Kumar",
    CONTACT_NUMBER: "+91 98765 43210"
  },
  {
    CONTACT_NAME: "Priya Sharma", 
    CONTACT_NUMBER: "+91 87654 32109"
  }
];
