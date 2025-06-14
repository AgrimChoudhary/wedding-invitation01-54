
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Plus, Trash2, Copy, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const guestSchema = z.object({
  name: z.string().min(1, 'Guest name is required'),
  mobile: z.string().optional()
});

type GuestFormData = z.infer<typeof guestSchema>;

interface Guest {
  id: string;
  name: string;
  mobile?: string;
}

interface Invitation {
  id: string;
  couple_names: string;
  wedding_date: string;
}

const GuestManagement = () => {
  const { invitationId } = useParams<{ invitationId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [guests, setGuests] = useState<Guest[]>([]);
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<GuestFormData>({
    resolver: zodResolver(guestSchema),
    defaultValues: {
      name: '',
      mobile: ''
    }
  });

  useEffect(() => {
    if (invitationId) {
      fetchInvitationAndGuests();
    }
  }, [invitationId]);

  const fetchInvitationAndGuests = async () => {
    try {
      // Fetch invitation details
      const { data: invitationData, error: invitationError } = await supabase
        .from('invitations')
        .select('id, couple_names, wedding_date')
        .eq('id', invitationId)
        .single();

      if (invitationError) throw invitationError;
      setInvitation(invitationData);

      // Fetch guests
      const { data: guestsData, error: guestsError } = await supabase
        .from('guests')
        .select('id, name, mobile')
        .eq('invitation_id', invitationId);

      if (guestsError) throw guestsError;
      setGuests(guestsData || []);

    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load invitation details.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: GuestFormData) => {
    try {
      const { data: newGuest, error } = await supabase
        .from('guests')
        .insert({
          invitation_id: invitationId,
          name: data.name,
          mobile: data.mobile || null
        })
        .select()
        .single();

      if (error) throw error;

      setGuests([...guests, newGuest]);
      form.reset();
      
      toast({
        title: "Guest Added",
        description: `${data.name} has been added to the guest list.`,
        variant: "default"
      });

    } catch (error) {
      console.error('Error adding guest:', error);
      toast({
        title: "Error",
        description: "Failed to add guest. Please try again.",
        variant: "destructive"
      });
    }
  };

  const removeGuest = async (guestId: string) => {
    try {
      const { error } = await supabase
        .from('guests')
        .delete()
        .eq('id', guestId);

      if (error) throw error;

      setGuests(guests.filter(guest => guest.id !== guestId));
      
      toast({
        title: "Guest Removed",
        description: "Guest has been removed from the list.",
        variant: "default"
      });

    } catch (error) {
      console.error('Error removing guest:', error);
      toast({
        title: "Error",
        description: "Failed to remove guest. Please try again.",
        variant: "destructive"
      });
    }
  };

  const generateGuestLink = (guestId: string) => {
    return `${window.location.origin}/${invitationId}-${guestId}`;
  };

  const generateGeneralLink = () => {
    return `${window.location.origin}/${invitationId}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Link copied to clipboard.",
      variant: "default"
    });
  };

  const previewInvitation = (guestId?: string) => {
    const url = guestId ? `/${invitationId}-${guestId}` : `/${invitationId}`;
    window.open(url, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-maroon flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold-light border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="gold-text font-cormorant text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-maroon py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl gold-text font-bold mb-4">
            Guest Management
          </h1>
          {invitation && (
            <p className="text-cream text-lg">
              Managing guests for {invitation.couple_names}
            </p>
          )}
        </div>

        {/* General Invitation Link */}
        <Card className="bg-maroon/50 border-gold-light/30 mb-8">
          <CardHeader>
            <CardTitle className="gold-text">General Invitation Link</CardTitle>
            <CardDescription className="text-cream/80">
              This link can be shared with anyone and will show "Guest Name" as placeholder
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input 
                value={generateGeneralLink()} 
                readOnly 
                className="bg-maroon/30 border-gold-light/50 text-cream flex-1"
              />
              <Button
                onClick={() => copyToClipboard(generateGeneralLink())}
                variant="outline"
                className="border-gold-light/50 text-gold-light hover:bg-gold-light/10"
              >
                <Copy size={16} />
              </Button>
              <Button
                onClick={() => previewInvitation()}
                variant="outline"
                className="border-gold-light/50 text-gold-light hover:bg-gold-light/10"
              >
                <ExternalLink size={16} />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Add Guest Form */}
        <Card className="bg-maroon/50 border-gold-light/30 mb-8">
          <CardHeader>
            <CardTitle className="gold-text flex items-center">
              <Plus className="mr-2" size={20} />
              Add Guest
            </CardTitle>
            <CardDescription className="text-cream/80">
              Add guests and generate personalized invitation links
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gold-light">Guest Name</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-maroon/30 border-gold-light/50 text-cream" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gold-light">Mobile (Optional)</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-maroon/30 border-gold-light/50 text-cream" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-end">
                    <Button
                      type="submit"
                      className="w-full bg-gold-gradient text-maroon font-medium"
                    >
                      Add Guest
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Guest List */}
        <Card className="bg-maroon/50 border-gold-light/30">
          <CardHeader>
            <CardTitle className="gold-text flex items-center">
              <Users className="mr-2" size={20} />
              Guest List ({guests.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {guests.length === 0 ? (
              <p className="text-cream/60 text-center py-8">
                No guests added yet. Add your first guest above.
              </p>
            ) : (
              <div className="space-y-4">
                {guests.map((guest) => (
                  <div key={guest.id} className="border border-gold-light/20 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="gold-text font-medium">{guest.name}</h4>
                        {guest.mobile && (
                          <p className="text-cream/80 text-sm">{guest.mobile}</p>
                        )}
                      </div>
                      <Button
                        onClick={() => removeGuest(guest.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-gold-light text-sm">Personalized Invitation Link:</label>
                      <div className="flex gap-2">
                        <Input 
                          value={generateGuestLink(guest.id)} 
                          readOnly 
                          className="bg-maroon/30 border-gold-light/50 text-cream text-xs flex-1"
                        />
                        <Button
                          onClick={() => copyToClipboard(generateGuestLink(guest.id))}
                          variant="outline"
                          size="sm"
                          className="border-gold-light/50 text-gold-light hover:bg-gold-light/10"
                        >
                          <Copy size={14} />
                        </Button>
                        <Button
                          onClick={() => previewInvitation(guest.id)}
                          variant="outline"
                          size="sm"
                          className="border-gold-light/50 text-gold-light hover:bg-gold-light/10"
                        >
                          <ExternalLink size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="border-gold-light/50 text-gold-light hover:bg-gold-light/10"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GuestManagement;
