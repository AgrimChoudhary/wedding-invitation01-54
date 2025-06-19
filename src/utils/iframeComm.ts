
// Iframe communication utilities for parent-child messaging

export interface IframeMessage {
  type: string;
  data?: any;
  timestamp?: number;
  source?: string;
}

// Send message to parent iframe
export const sendToParent = (type: string, data?: any) => {
  if (window.parent && window.parent !== window) {
    const message: IframeMessage = {
      type,
      data,
      timestamp: Date.now(),
      source: 'wedding-invitation'
    };
    
    try {
      window.parent.postMessage(message, '*');
      console.log('Message sent to parent:', message);
    } catch (error) {
      console.error('Failed to send message to parent:', error);
    }
  }
};

// Track invitation viewed event
export const trackInvitationViewed = (guestId?: string) => {
  sendToParent('invitation_viewed', {
    guestId,
    url: window.location.href,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString()
  });
};

// Track invitation accepted event
export const trackInvitationAccepted = (guestId?: string, guestName?: string) => {
  sendToParent('invitation_accepted', {
    guestId,
    guestName,
    url: window.location.href,
    timestamp: new Date().toISOString()
  });
};

// Track RSVP response
export const trackRSVPResponse = (response: 'yes' | 'no' | 'maybe', guestId?: string, guestName?: string) => {
  sendToParent('rsvp_response', {
    response,
    guestId,
    guestName,
    url: window.location.href,
    timestamp: new Date().toISOString()
  });
};

// Track page interaction
export const trackPageInteraction = (action: string, details?: any) => {
  sendToParent('page_interaction', {
    action,
    details,
    url: window.location.href,
    timestamp: new Date().toISOString()
  });
};

// Track error events
export const trackError = (error: string, details?: any) => {
  sendToParent('error', {
    error,
    details,
    url: window.location.href,
    timestamp: new Date().toISOString()
  });
};

// Listen for messages from parent
export const listenToParent = (callback: (message: IframeMessage) => void) => {
  const handleMessage = (event: MessageEvent) => {
    try {
      if (event.data && typeof event.data === 'object') {
        callback(event.data);
      }
    } catch (error) {
      console.error('Error handling parent message:', error);
    }
  };

  window.addEventListener('message', handleMessage);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('message', handleMessage);
  };
};
