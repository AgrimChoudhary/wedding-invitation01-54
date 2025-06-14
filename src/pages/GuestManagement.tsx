
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Users, Copy, ExternalLink, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Guest {
  id: string;
  guest_name: string;
  guest_email?: string;
  guest_phone?: string;
  created_at: string;
}

interface Invitation {
  id: string;
  bride_name: string;
  groom_name: string;
  wedding_date: string;
  venue_name: string;
}

const GuestManagement = () => {
  const { invitationId } = useParams<{ invitationId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestEmail, setNewGuestEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    if (invitationId) {
      fetchInvitationAndGuests();
    }
  }, [invitationId]);

  const fetchInvitationAndGuests = async () => {
    setFetchLoading(true);
    try {
      // Fetch invitation details
      const { data: invitationData, error: invitationError } = await supabase
        .from('invitations')
        .select('id, bride_name, groom_name, wedding_date, venue_name')
        .eq('id', invitationId)
        .single();

      if (invitationError) throw invitationError;
      setInvitation(invitationData);

      // Fetch guests
      const { data: guestsData, error: guestsError } = await supabase
        .from('guests')
        .select('*')
        .eq('invitation_id', invitationId)
        .order('created_at', { ascending: false });

      if (guestsError) throw guestsError;
      setGuests(guestsData || []);

    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load invitation data.",
        variant: "destructive",
      });
    } finally {
      setFetchLoading(false);
    }
  };

  const addGuest = async () => {
    if (!newGuestName.trim()) {
      toast({
        title: "Error",
        description: "Guest name is required.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data: guest, error } = await supabase
        .from('guests')
        .insert({
          invitation_id: invitationId,
          guest_name: newGuestName.trim(),
          guest_email: newGuestEmail.trim() || null,
        })
        .select()
        .single();

      if (error) throw error;

      setGuests(prev => [guest, ...prev]);
      setNewGuestName('');
      setNewGuestEmail('');

      toast({
        title: "Guest Added!",
        description: `${guest.guest_name} has been added to the guest list.`,
      });

    } catch (error) {
      console.error('Error adding guest:', error);
      toast({
        title: "Error",
        description: "Failed to add guest. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyInvitationLink = (guestId?: string) => {
    const baseUrl = window.location.origin;
    const link = guestId 
      ? `${baseUrl}/${invitationId}-${guestId}`
      : `${baseUrl}/${invitationId}`;
    
    navigator.clipboard.writeText(link);
    toast({
      title: "Link Copied!",
      description: "Invitation link has been copied to clipboard.",
    });
  };

  const openInvitationLink = (guestId?: string) => {
    const baseUrl = window.location.origin;
    const link = guestId 
      ? `${baseUrl}/${invitationId}-${guestId}`
      : `${baseUrl}/${invitationId}`;
    
    window.open(link, '_blank');
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-maroon flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold-light border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="gold-text font-cormorant text-xl">Loading invitation...</p>
        </div>
      </div>
    );
  }

  if (!invitation) {
    return (
      <div className="min-h-screen bg-maroon flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-cormorant text-3xl gold-text font-bold mb-4">
            Invitation Not Found
          </h1>
          <Button onClick={() => navigate('/')} className="bg-gold-gradient text-maroon">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-maroon px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Button 
          onClick={() => navigate('/')}
          variant="outline"
          className="mb-6 border-gold-light text-gold-light hover:bg-gold-light hover:text-maroon"
        >
          <ArrowLeft className="mr-2" size={16} />
          Back to Home
        </Button>

        <div className="text-center mb-8">
          <h1 className="font-cormorant text-4xl gold-text font-bold mb-2">
            Guest Management
          </h1>
          <p className="text-cream text-lg">
            {invitation.bride_name} & {invitation.groom_name}
          </p>
          <p className="text-cream/70">
            {new Date(invitation.wedding_date).toLocaleDateString()} at {invitation.venue_name}
          </p>
        </div>

        {/* General Invitation Link */}
        <div className="bg-maroon/60 backdrop-blur-sm rounded-xl p-6 gold-border mb-8">
          <h2 className="font-cormorant text-2xl gold-text font-bold mb-4 flex items-center">
            <Users className="mr-2" />
            General Invitation Link
          </h2>
          <div className="flex gap-3">
            <Input 
              value={`${window.location.origin}/${invitationId}`}
              readOnly
              className="bg-maroon/40 border-gold-light/30 text-cream"
            />
            <Button 
              onClick={() => copyInvitationLink()}
              variant="outline"
              className="border-gold-light text-gold-light hover:bg-gold-light hover:text-maroon"
            >
              <Copy size={16} />
            </Button>
            <Button 
              onClick={() => openInvitationLink()}
              className="bg-gold-gradient text-maroon"
            >
              <ExternalLink size={16} />
            </Button>
          </div>
        </div>

        {/* Add New Guest */}
        <div className="bg-maroon/60 backdrop-blur-sm rounded-xl p-6 gold-border mb-8">
          <h2 className="font-cormorant text-2xl gold-text font-bold mb-4 flex items-center">
            <Plus className="mr-2" />
            Add New Guest
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input 
              placeholder="Guest Name (Required)"
              value={newGuestName}
              onChange={(e) => setNewGuestName(e.target.value)}
              className="bg-maroon/40 border-gold-light/30 text-cream placeholder:text-cream/50"
            />
            <Input 
              type="email"
              placeholder="Email (Optional)"
              value={newGuestEmail}
              onChange={(e) => setNewGuestEmail(e.target.value)}
              className="bg-maroon/40 border-gold-light/30 text-cream placeholder:text-cream/50"
            />
            <Button 
              onClick={addGuest}
              disabled={loading}
              className="bg-gold-gradient text-maroon font-bold hover:scale-105 transition-transform"
            >
              {loading ? "Adding..." : "Add Guest"}
            </Button>
          </div>
        </div>

        {/* Guest List */}
        <div className="bg-maroon/60 backdrop-blur-sm rounded-xl p-6 gold-border">
          <h2 className="font-cormorant text-2xl gold-text font-bold mb-6 flex items-center">
            <Users className="mr-2" />
            Guest List ({guests.length})
          </h2>
          
          {guests.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-cream/70 text-lg">No guests added yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {guests.map((guest) => (
                <div key={guest.id} className="bg-maroon/40 rounded-lg p-4 gold-border">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-cormorant text-xl gold-text font-bold">
                        {guest.guest_name}
                      </h3>
                      {guest.guest_email && (
                        <p className="text-cream/70">{guest.guest_email}</p>
                      )}
                      <p className="text-cream/50 text-sm">
                        Added on {new Date(guest.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => copyInvitationLink(guest.id)}
                        variant="outline"
                        size="sm"
                        className="border-gold-light text-gold-light hover:bg-gold-light hover:text-maroon"
                      >
                        <Copy size={14} className="mr-1" />
                        Copy Link
                      </Button>
                      <Button 
                        onClick={() => openInvitationLink(guest.id)}
                        size="sm"
                        className="bg-gold-gradient text-maroon"
                      >
                        <ExternalLink size={14} className="mr-1" />
                        Open
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-3 p-2 bg-maroon/60 rounded text-sm">
                    <span className="text-cream/70">Personal Link: </span>
                    <span className="text-gold-light break-all">
                      {window.location.origin}/{invitationId}-{guest.id}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuestManagement;
