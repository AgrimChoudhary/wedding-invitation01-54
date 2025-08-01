
export interface IframeMessage {
  type: string;
  data?: any;
  source: 'wedding-invitation';
}

export interface InvitationEvents {
  INVITATION_VIEWED: {
    guestName: string;
    timestamp: string;
    guestId?: string;
    eventId?: string;
  };
  RSVP_ACCEPTED: {
    guestName: string;
    guestId: string;
    eventId: string;
    timestamp: string;
  };
  RSVP_SUBMITTED: {
    rsvpData: Record<string, any>;
    guestName: string;
    guestId: string;
    eventId: string;
    timestamp: string;
  };
  RSVP_UPDATED: {
    rsvpData: Record<string, any>;
    guestName: string;
    guestId: string;
    eventId: string;
    timestamp: string;
  };
  WISH_SUBMITTED: {
    eventId: string;
    guestId: string;
    wishData: {
      message: string;
      photo?: string;
      timestamp: string;
      guestName: string;
    };
  };
  WISHES_VIEWED: {
    eventId: string;
    guestId: string;
    totalWishes: number;
  };
  WISH_LIKED: {
    eventId: string;
    guestId: string;
    wishId: string;
  };
  invitationViewed: {
    guestName: string;
    timestamp: string;
    section?: string;
  };
  eventClicked: {
    eventName: string;
    guestName: string;
    timestamp: string;
  };
  familyViewed: {
    familySide: 'bride' | 'groom';
    guestName: string;
    timestamp: string;
  };
  photoViewed: {
    photoIndex: number;
    guestName: string;
    timestamp: string;
  };
  contactClicked: {
    contactName: string;
    contactNumber: string;
    guestName: string;
    timestamp: string;
  };
  mapClicked: {
    venue: string;
    guestName: string;
    timestamp: string;
  };
  error: {
    message: string;
    timestamp: string;
  };
}

// Platform RSVP payload interface
export interface PlatformRSVPPayload {
  eventId: string;
  guestId: string;
  status: null | 'accepted' | 'submitted';
  showAcceptButton: boolean;
  showSubmitButton: boolean;
  showEditButton: boolean;
  rsvpFields: RSVPField[];
  existingRsvpData?: Record<string, any>;
  confirmationText?: string;
}

export interface RSVPField {
  name: string;
  label: string;
  type: string;
  options?: string[];
  required?: boolean;
}

// Platform to invitation message types
export interface PlatformMessages {
  INVITATION_LOADED: PlatformRSVPPayload;
  INVITATION_PAYLOAD_UPDATE: PlatformRSVPPayload;
  RSVP_ACCEPTED_CONFIRM: {
    success: boolean;
    message?: string;
    payload?: PlatformRSVPPayload;
  };
  RSVP_SUBMITTED_CONFIRM: {
    success: boolean;
    message?: string;
    payload?: PlatformRSVPPayload;
  };
  RSVP_UPDATED_CONFIRM: {
    success: boolean;
    message?: string;
    payload?: PlatformRSVPPayload;
  };
  WISH_ADDED: {
    wish: {
      id: string;
      name: string;
      message: string;
      timestamp: string;
      avatar?: string;
      likes?: number;
      guestId?: string;
      eventId?: string;
    };
  };
  WISH_LIKED_UPDATE: {
    wishId: string;
    newLikeCount: number;
  };
  WISH_DELETED: {
    wishId: string;
  };
}

class IframeMessenger {
  private listeners: Map<string, Function[]> = new Map();
  private guestName: string = '';
  private guestId?: string;
  private eventId?: string;
  
  constructor() {
    this.setupMessageListener();
  }
  
  private setupMessageListener() {
    window.addEventListener('message', (event) => {
      try {
        // Add origin validation for security
        const allowedOrigins = [
          'http://localhost:3000',
          'http://localhost:5173',
          'https://utsavy2.vercel.app',
          // Add your main platform domain here
        ];
        
        // Only validate origin if we're in an iframe
        if (window.parent !== window && !allowedOrigins.includes(event.origin)) {
          console.warn('Message from unauthorized origin:', event.origin);
          return;
        }
        
        if (event.data && typeof event.data === 'object' && event.data.source === 'parent-platform') {
          this.handleParentMessage(event.data);
        }
      } catch (error) {
        console.error('Error handling iframe message:', error);
        this.sendMessage('error', { message: 'Failed to handle parent message', timestamp: new Date().toISOString() });
      }
    });
  }
  
  private handleParentMessage(message: any) {
    const listeners = this.listeners.get(message.type) || [];
    listeners.forEach(listener => {
      try {
        listener(message.data);
      } catch (error) {
        console.error('Error in message listener:', error);
      }
    });
  }
  
  public setGuestInfo(name: string, guestId?: string, eventId?: string) {
    this.guestName = name;
    this.guestId = guestId;
    this.eventId = eventId;
  }
  
  public sendMessage<T extends keyof InvitationEvents>(type: T, data: InvitationEvents[T]) {
    if (window.parent === window) {
      // Not in iframe, just log for development
      console.log('Iframe message:', { type, data });
      return;
    }
    
    // Auto-fill eventId and guestId for specific message types that support them
    let enrichedData = data;
    if (this.isEventMessage(type, data)) {
      enrichedData = {
        ...data,
        eventId: data.eventId || this.eventId || '',
        guestId: data.guestId || this.guestId || ''
      };
    }
    
    const message: IframeMessage = {
      type,
      data: enrichedData,
      source: 'wedding-invitation'
    };
    
    try {
      window.parent.postMessage(message, '*');
      console.log('Message sent to parent:', message);
    } catch (error) {
      console.error('Failed to send iframe message:', error);
    }
  }
  
  private isEventMessage(type: string, data: any): data is InvitationEvents['INVITATION_VIEWED'] | InvitationEvents['RSVP_ACCEPTED'] | InvitationEvents['RSVP_SUBMITTED'] | InvitationEvents['RSVP_UPDATED'] | InvitationEvents['WISH_SUBMITTED'] | InvitationEvents['WISHES_VIEWED'] | InvitationEvents['WISH_LIKED'] {
    return ['INVITATION_VIEWED', 'RSVP_ACCEPTED', 'RSVP_SUBMITTED', 'RSVP_UPDATED', 'WISH_SUBMITTED', 'WISHES_VIEWED', 'WISH_LIKED'].includes(type);
  }
  
  public onMessage(type: string, callback: Function) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type)!.push(callback);
  }
  
  public removeListener(type: string, callback: Function) {
    const listeners = this.listeners.get(type) || [];
    const index = listeners.indexOf(callback);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  }
  
  // Convenience methods for common events
  public trackInvitationViewed() {
    this.sendMessage('INVITATION_VIEWED', {
      guestName: this.guestName,
      guestId: this.guestId,
      eventId: this.eventId,
      timestamp: new Date().toISOString()
    });
  }
  
  public trackRSVPAccepted() {
    if (!this.eventId || !this.guestId) {
      throw new Error('eventId and guestId are required for RSVP_ACCEPTED');
    }
    this.sendMessage('RSVP_ACCEPTED', {
      guestName: this.guestName,
      guestId: this.guestId,
      eventId: this.eventId,
      timestamp: new Date().toISOString()
    });
  }
  
  public trackRSVPSubmitted(rsvpData: Record<string, any>) {
    if (!this.eventId || !this.guestId) {
      throw new Error('eventId and guestId are required for RSVP_SUBMITTED');
    }
    this.sendMessage('RSVP_SUBMITTED', {
      rsvpData,
      guestName: this.guestName,
      guestId: this.guestId,
      eventId: this.eventId,
      timestamp: new Date().toISOString()
    });
  }

  public trackRSVPUpdated(rsvpData: Record<string, any>) {
    if (!this.eventId || !this.guestId) {
      throw new Error('eventId and guestId are required for RSVP_UPDATED');
    }
    this.sendMessage('RSVP_UPDATED', {
      rsvpData,
      guestName: this.guestName,
      guestId: this.guestId,
      eventId: this.eventId,
      timestamp: new Date().toISOString()
    });
  }
  
  public trackEventClicked(eventName: string) {
    this.sendMessage('eventClicked', {
      eventName,
      guestName: this.guestName,
      timestamp: new Date().toISOString()
    });
  }
  
  public trackFamilyViewed(familySide: 'bride' | 'groom') {
    this.sendMessage('familyViewed', {
      familySide,
      guestName: this.guestName,
      timestamp: new Date().toISOString()
    });
  }
  
  public trackPhotoViewed(photoIndex: number) {
    this.sendMessage('photoViewed', {
      photoIndex,
      guestName: this.guestName,
      timestamp: new Date().toISOString()
    });
  }
  
  public trackContactClicked(contactName: string, contactNumber: string) {
    this.sendMessage('contactClicked', {
      contactName,
      contactNumber,
      guestName: this.guestName,
      timestamp: new Date().toISOString()
    });
  }
  
  public trackMapClicked(venue: string) {
    this.sendMessage('mapClicked', {
      venue,
      guestName: this.guestName,
      timestamp: new Date().toISOString()
    });
  }
  
  public trackError(message: string) {
    this.sendMessage('error', {
      message,
      timestamp: new Date().toISOString()
    });
  }
  
  // New convenience methods for wish functionality
  public trackWishSubmitted(wishData: { message: string; photo?: string; guestName: string }) {
    this.sendMessage('WISH_SUBMITTED', {
      eventId: this.eventId || '',
      guestId: this.guestId || '',
      wishData: {
        ...wishData,
        timestamp: new Date().toISOString()
      }
    });
  }
  
  public trackWishesViewed(totalWishes: number) {
    this.sendMessage('WISHES_VIEWED', {
      eventId: this.eventId || '',
      guestId: this.guestId || '',
      totalWishes
    });
  }
  
  public trackWishLiked(wishId: string) {
    this.sendMessage('WISH_LIKED', {
      eventId: this.eventId || '',
      guestId: this.guestId || '',
      wishId
    });
  }
}

// Export singleton instance
export const iframeMessenger = new IframeMessenger();

// Initialize iframe communication
export const initIframeComm = (guestName: string, guestId?: string, eventId?: string) => {
  iframeMessenger.setGuestInfo(guestName, guestId, eventId);
  
  // Track initial page view with proper message type
  iframeMessenger.trackInvitationViewed();
  
  // Track page visibility changes
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      iframeMessenger.trackInvitationViewed();
    }
  });
  
  return iframeMessenger;
};
