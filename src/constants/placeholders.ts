
// Configuration for ordering - allows customization of which comes first
export const ORDER_CONFIG = {
  // Set to true if groom should be first, false if bride should be first
  GROOM_FIRST: true, // Change this to false to put bride first
};

// Helper function to get ordered names based on configuration
export const getOrderedNames = () => {
  if (ORDER_CONFIG.GROOM_FIRST) {
    return {
      firstName: GROOM_NAME,
      secondName: BRIDE_NAME
    };
  } else {
    return {
      firstName: BRIDE_NAME,
      secondName: GROOM_NAME
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

// Main couple information
export const BRIDE_NAME = "Bride Name";
export const GROOM_NAME = "Groom Name";
export const WEDDING_DATE = "30 June 2025";
export const WEDDING_TIME = "5:00 PM - 8:00 PM";
export const COUPLE_TAGLINE = "Two hearts, one soul, forever together";

// Guest information
export const GUEST_NAME = "Guest Name";

// Events information
export const EVENTS = [
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

// Family information
export const BRIDE_FAMILY = {
  FAMILY_SIDE: "bride",
  FAMILY_TITLE: "Parents of the Bride",
  FAMILY_DESCRIPTION: "With great joy and pleasure, we invite you to celebrate",
  FAMILY_ADDRESS: "Family Address Here",
  FAMILY_MEMBERS: [
    {
      MEMBER_NAME: "Father Name",
      MEMBER_RELATION: "Father",
      MEMBER_DESCRIPTION: "Father of the bride"
    },
    {
      MEMBER_NAME: "Mother Name", 
      MEMBER_RELATION: "Mother",
      MEMBER_DESCRIPTION: "Mother of the bride"
    }
  ]
};

export const GROOM_FAMILY = {
  FAMILY_SIDE: "groom",
  FAMILY_TITLE: "Parents of the Groom",
  FAMILY_DESCRIPTION: "With great joy and pleasure, we invite you to celebrate",
  FAMILY_ADDRESS: "Family Address Here", 
  FAMILY_MEMBERS: [
    {
      MEMBER_NAME: "Father Name",
      MEMBER_RELATION: "Father", 
      MEMBER_DESCRIPTION: "Father of the groom"
    },
    {
      MEMBER_NAME: "Mother Name",
      MEMBER_RELATION: "Mother",
      MEMBER_DESCRIPTION: "Mother of the groom"
    }
  ]
};

// Photos
export const PHOTOS = [
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

// Venue information
export const VENUE_ADDRESS = "Wedding Venue Name, Complete Address, City, State";
export const VENUE_MAP_LINK = "https://maps.google.com/";

// Contact information
export const CONTACTS = [
  {
    CONTACT_NAME: "Contact Person 1",
    CONTACT_NUMBER: "+1234567890"
  },
  {
    CONTACT_NAME: "Contact Person 2", 
    CONTACT_NUMBER: "+1234567890"
  }
];
