
// Wedding Information Placeholders
export const BRIDE_NAME = "Priya";
export const GROOM_NAME = "Vijay";
export const WEDDING_DATE = "30 March 2025";
export const WEDDING_TIME = "5:00 PM - 8:00 PM";
export const COUPLE_TAGLINE = "A journey written in the stars…";

// Order Configuration - allows customization of display order
export const ORDER_CONFIG = {
  // true = Bride first, false = Groom first
  BRIDE_FIRST: true,
  // true = Bride family first, false = Groom family first  
  BRIDE_FAMILY_FIRST: true
};

// Get ordered names based on configuration
export const getOrderedNames = () => {
  return ORDER_CONFIG.BRIDE_FIRST 
    ? { firstName: BRIDE_NAME, secondName: GROOM_NAME }
    : { firstName: GROOM_NAME, secondName: BRIDE_NAME };
};

// Guest Information Placeholder
export const GUEST_NAME = "Guest Name";

// Event Details Placeholders (Array-based)
export const EVENTS = [
  {
    EVENT_NAME: "Mehndi Ceremony",
    EVENT_DATE: "28 March 2025",
    EVENT_TIME: "10:00 AM - 2:00 PM",
    EVENT_VENUE: "Garden Court, The Royal Celebration Hall, Wedding City",
    EVENT_VENUE_MAP_LINK: "https://maps.google.com/?q=Garden+Court+Royal+Celebration+Hall+Wedding+City"
  },
  {
    EVENT_NAME: "Sangeet Night", 
    EVENT_DATE: "28 March 2025",
    EVENT_TIME: "7:00 PM - 11:00 PM",
    EVENT_VENUE: "Grand Pavilion, The Royal Celebration Hall, Wedding City",
    EVENT_VENUE_MAP_LINK: "https://maps.google.com/?q=Grand+Pavilion+Royal+Celebration+Hall+Wedding+City"
  },
  {
    EVENT_NAME: "Haldi Ceremony",
    EVENT_DATE: "29 March 2025", 
    EVENT_TIME: "11:00 AM - 2:00 PM",
    EVENT_VENUE: "Courtyard, The Royal Celebration Hall, Wedding City",
    EVENT_VENUE_MAP_LINK: "https://maps.google.com/?q=Courtyard+Royal+Celebration+Hall+Wedding+City"
  },
  {
    EVENT_NAME: "Wedding Ceremony",
    EVENT_DATE: "30 March 2025",
    EVENT_TIME: "5:00 PM - 8:00 PM", 
    EVENT_VENUE: "Main Hall, The Royal Celebration Hall, Wedding City",
    EVENT_VENUE_MAP_LINK: "https://maps.google.com/?q=Main+Hall+Royal+Celebration+Hall+Wedding+City"
  }
];

// Family Details Placeholders (Array-based)
export const BRIDE_FAMILY = {
  FAMILY_SIDE: "bride",
  FAMILY_TITLE: "Ramesh & Rameshi Family",
  FAMILY_DESCRIPTION: "The bride's family is known for their warmth and hospitality. They have been residents of Wedding City for three generations and are well-respected in the community.",
  FAMILY_ADDRESS: "23 Marigold Lane, Wedding City",
  FAMILY_MEMBERS: [
    {
      MEMBER_NAME: "Ramesh Kumar",
      MEMBER_RELATION: "Father of the Bride",
      MEMBER_DESCRIPTION: "A respected businessman who loves gardening and classical music in his free time."
    },
    {
      MEMBER_NAME: "Rameshi Devi",
      MEMBER_RELATION: "Mother of the Bride", 
      MEMBER_DESCRIPTION: "A loving homemaker known for her delicious cooking and kind heart."
    },
    {
      MEMBER_NAME: "Priya Kumar",
      MEMBER_RELATION: "The Bride",
      MEMBER_DESCRIPTION: "A software engineer who loves to paint and travel. She met Vijay during a company hackathon."
    },
    {
      MEMBER_NAME: "Rahul Kumar",
      MEMBER_RELATION: "Brother of the Bride",
      MEMBER_DESCRIPTION: "Currently studying medicine and aspires to be a neurosurgeon."
    }
  ]
};

export const GROOM_FAMILY = {
  FAMILY_SIDE: "groom",
  FAMILY_TITLE: "Harkesh & Harkeshi Family",
  FAMILY_DESCRIPTION: "The groom's family has a rich cultural heritage and is known for their contributions to arts and education in the community.",
  FAMILY_ADDRESS: "45 Jasmine Road, Wedding City",
  FAMILY_MEMBERS: [
    {
      MEMBER_NAME: "Harkesh Singh",
      MEMBER_RELATION: "Father of the Groom",
      MEMBER_DESCRIPTION: "A retired professor who now spends his time writing books on history."
    },
    {
      MEMBER_NAME: "Harkeshi Kaur",
      MEMBER_RELATION: "Mother of the Groom",
      MEMBER_DESCRIPTION: "A talented classical dancer who has taught dance to hundreds of students."
    },
    {
      MEMBER_NAME: "Vijay Singh",
      MEMBER_RELATION: "The Groom",
      MEMBER_DESCRIPTION: "A product manager who is passionate about photography and mountain climbing."
    },
    {
      MEMBER_NAME: "Anita Singh", 
      MEMBER_RELATION: "Sister of the Groom",
      MEMBER_DESCRIPTION: "An architect who loves designing sustainable buildings."
    }
  ]
};

// Get ordered families based on configuration
export const getOrderedFamilies = () => {
  return ORDER_CONFIG.BRIDE_FAMILY_FIRST 
    ? { firstFamily: BRIDE_FAMILY, secondFamily: GROOM_FAMILY }
    : { firstFamily: GROOM_FAMILY, secondFamily: BRIDE_FAMILY };
};

// Photo Gallery Placeholders
export const PHOTOS = [
  {
    PHOTO_1: "/lovable-uploads/5d906655-818b-462e-887e-0a392db20d48.png",
    PHOTO_ORDER: 1
  },
  {
    PHOTO_2: "/lovable-uploads/e1d52835-2f4a-42a2-8647-66379e0cc295.png", 
    PHOTO_ORDER: 2
  },
  {
    PHOTO_3: "/lovable-uploads/6d392f5b-28f1-4710-9eda-8e7c1a9bfe8e.png",
    PHOTO_ORDER: 3
  },
  {
    PHOTO_4: "/lovable-uploads/fd7253c5-605a-4dee-ac79-cd585063976d.png",
    PHOTO_ORDER: 4
  },
  {
    PHOTO_5: "/lovable-uploads/88954d14-07a5-494c-a5ac-075e055e0223.png",
    PHOTO_ORDER: 5
  }
];

// Venue Information Placeholders
export const MAIN_VENUE_NAME = "The Royal Celebration Hall";
export const VENUE_CITY = "Wedding City";
export const VENUE_ADDRESS = "The Royal Celebration Hall, Wedding City";
export const VENUE_MAP_LINK = "https://maps.google.com/?q=Royal+Celebration+Hall+Wedding+City";

// Contact Information Placeholders (Dynamic Array)
export const CONTACTS = [
  {
    CONTACT_NAME: "Contact 1",
    CONTACT_NUMBER: "+91 98765 43210"
  },
  {
    CONTACT_NAME: "Contact 2", 
    CONTACT_NUMBER: "+91 98765 43211"
  }
];
