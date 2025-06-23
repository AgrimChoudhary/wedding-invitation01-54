
export interface WeddingData {
  // Couple Information
  brideName?: string;
  groomName?: string;
  weddingDate?: string;
  weddingTime?: string;
  coupleTagline?: string;
  groomFirst?: boolean;
  
  // Guest Information
  guestName?: string;
  
  // Venue Information
  venueName?: string;
  venueAddress?: string;
  venueMapLink?: string;
  
  // Event and Guest IDs
  eventId?: string;
  guestId?: string;
  
  // Contact Information
  contacts?: Array<{
    name: string;
    phone: string;
  }>;
  
  // Photos
  photos?: string[];
  
  // Events
  events?: Array<{
    name: string;
    date: string;
    time: string;
    venue: string;
    mapLink?: string;
  }>;
  
  // Family Members
  brideFamily?: {
    title: string;
    members: Array<{
      name: string;
      relation: string;
      photo?: string;
    }>;
  };
  
  groomFamily?: {
    title: string;
    members: Array<{
      name: string;
      relation: string;
      photo?: string;
    }>;
  };
}

// Sanitize string input to prevent XSS
export const sanitizeString = (input: string): string => {
  if (!input) return '';
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

// Validate URL format
export const isValidUrl = (url: string): boolean => {
  if (!url) return false;
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

// Validate phone number format
export const isValidPhoneNumber = (phone: string): boolean => {
  if (!phone) return false;
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

// Parse URL parameters and return wedding data
export const parseUrlParams = (): WeddingData => {
  const urlParams = new URLSearchParams(window.location.search);
  const data: WeddingData = {};
  
  // Basic couple information
  if (urlParams.get('brideName')) {
    data.brideName = sanitizeString(urlParams.get('brideName')!);
  }
  if (urlParams.get('groomName')) {
    data.groomName = sanitizeString(urlParams.get('groomName')!);
  }
  if (urlParams.get('weddingDate')) {
    data.weddingDate = sanitizeString(urlParams.get('weddingDate')!);
  }
  if (urlParams.get('weddingTime')) {
    data.weddingTime = sanitizeString(urlParams.get('weddingTime')!);
  }
  if (urlParams.get('coupleTagline')) {
    data.coupleTagline = sanitizeString(urlParams.get('coupleTagline')!);
  }
  if (urlParams.get('groomFirst')) {
    data.groomFirst = urlParams.get('groomFirst') === 'true';
  }
  
  // Guest information
  if (urlParams.get('guestName')) {
    data.guestName = sanitizeString(urlParams.get('guestName')!);
  }
  
  // Event and Guest IDs
  if (urlParams.get('eventId')) {
    data.eventId = sanitizeString(urlParams.get('eventId')!);
  }
  if (urlParams.get('guestId')) {
    data.guestId = sanitizeString(urlParams.get('guestId')!);
  }
  
  // Venue information
  if (urlParams.get('venueName')) {
    data.venueName = sanitizeString(urlParams.get('venueName')!);
  }
  if (urlParams.get('venueAddress')) {
    data.venueAddress = sanitizeString(urlParams.get('venueAddress')!);
  }
  if (urlParams.get('venueMapLink')) {
    const mapLink = urlParams.get('venueMapLink')!;
    if (isValidUrl(mapLink)) {
      data.venueMapLink = mapLink;
    }
  }
  
  // Parse contacts (JSON format expected)
  if (urlParams.get('contacts')) {
    try {
      const contactsData = JSON.parse(decodeURIComponent(urlParams.get('contacts')!));
      if (Array.isArray(contactsData)) {
        data.contacts = contactsData.map(contact => ({
          name: sanitizeString(contact.name || ''),
          phone: sanitizeString(contact.phone || contact.number || '')
        })).filter(contact => contact.name && isValidPhoneNumber(contact.phone));
      }
    } catch (error) {
      console.warn('Invalid contacts JSON format');
    }
  }
  
  // Parse photos (JSON array of URLs)
  if (urlParams.get('photos')) {
    try {
      const photosData = JSON.parse(decodeURIComponent(urlParams.get('photos')!));
      if (Array.isArray(photosData)) {
        data.photos = photosData.filter(url => isValidUrl(url));
      }
    } catch (error) {
      // Fallback: try comma-separated URLs
      const photosParam = urlParams.get('photos')!;
      data.photos = photosParam.split(',')
        .map(url => url.trim())
        .filter(url => isValidUrl(url));
    }
  }
  
  // Parse events (JSON format expected)
  if (urlParams.get('events')) {
    try {
      const eventsData = JSON.parse(decodeURIComponent(urlParams.get('events')!));
      if (Array.isArray(eventsData)) {
        data.events = eventsData.map(event => ({
          name: sanitizeString(event.name || event.EVENT_NAME || ''),
          date: sanitizeString(event.date || event.EVENT_DATE || ''),
          time: sanitizeString(event.time || event.EVENT_TIME || ''),
          venue: sanitizeString(event.venue || event.EVENT_VENUE || ''),
          mapLink: isValidUrl(event.mapLink || event.EVENT_VENUE_MAP_LINK) 
            ? (event.mapLink || event.EVENT_VENUE_MAP_LINK) 
            : undefined
        })).filter(event => event.name && event.date);
      }
    } catch (error) {
      console.warn('Invalid events JSON format');
    }
  }
  
  // Parse family data (JSON format expected)
  if (urlParams.get('brideFamily')) {
    try {
      const brideFamilyData = JSON.parse(decodeURIComponent(urlParams.get('brideFamily')!));
      data.brideFamily = {
        title: sanitizeString(brideFamilyData.title || ''),
        members: (brideFamilyData.members || []).map((member: any) => ({
          name: sanitizeString(member.name || ''),
          relation: sanitizeString(member.relation || ''),
          photo: isValidUrl(member.photo) ? member.photo : undefined
        })).filter((member: any) => member.name)
      };
    } catch (error) {
      console.warn('Invalid bride family JSON format');
    }
  }
  
  if (urlParams.get('groomFamily')) {
    try {
      const groomFamilyData = JSON.parse(decodeURIComponent(urlParams.get('groomFamily')!));
      data.groomFamily = {
        title: sanitizeString(groomFamilyData.title || ''),
        members: (groomFamilyData.members || []).map((member: any) => ({
          name: sanitizeString(member.name || ''),
          relation: sanitizeString(member.relation || ''),
          photo: isValidUrl(member.photo) ? member.photo : undefined
        })).filter((member: any) => member.name)
      };
    } catch (error) {
      console.warn('Invalid groom family JSON format');
    }
  }
  
  return data;
};

// Get dynamic data with fallbacks to defaults
export const getDynamicData = () => {
  const urlData = parseUrlParams();
  
  // Store in localStorage for persistence across navigation
  if (Object.keys(urlData).length > 0) {
    localStorage.setItem('weddingData', JSON.stringify(urlData));
  }
  
  // Try to get from localStorage if no URL params
  const storedData = localStorage.getItem('weddingData');
  const parsedStoredData = storedData ? JSON.parse(storedData) : {};
  
  return { ...parsedStoredData, ...urlData };
};
