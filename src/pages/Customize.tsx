import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { CalendarIcon, Heart, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  brideName: z.string().min(1, 'Bride name is required'),
  groomName: z.string().min(1, 'Groom name is required'),
  weddingDate: z.string().min(1, 'Wedding date is required'),
  weddingTime: z.string().min(1, 'Wedding time is required'),
  coupleTagline: z.string().optional(),
  groomFirst: z.boolean().default(true),
  venueAddress: z.string().min(1, 'Venue address is required'),
  venueMapLink: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  events: z.array(z.object({
    name: z.string().min(1, 'Event name is required'),
    date: z.string().min(1, 'Event date is required'),
    time: z.string().min(1, 'Event time is required'),
    venue: z.string().min(1, 'Event venue is required'),
    mapLink: z.string().optional()
  })).min(1, 'At least one event is required'),
  brideFamily: z.object({
    title: z.string().min(1, 'Family title is required'),
    description: z.string().optional(),
    address: z.string().optional()
  }),
  groomFamily: z.object({
    title: z.string().min(1, 'Family title is required'),
    description: z.string().optional(),
    address: z.string().optional()
  }),
  contacts: z.array(z.object({
    name: z.string().min(1, 'Contact name is required'),
    number: z.string().min(1, 'Contact number is required')
  })).min(1, 'At least one contact is required')
});

type FormData = z.infer<typeof formSchema>;

const Customize = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brideName: '',
      groomName: '',
      weddingDate: '',
      weddingTime: '',
      coupleTagline: '',
      groomFirst: true,
      venueAddress: '',
      venueMapLink: '',
      events: [
        { name: 'Haldi Ceremony', date: '', time: '', venue: '', mapLink: '' },
        { name: 'Mehndi Ceremony', date: '', time: '', venue: '', mapLink: '' },
        { name: 'Sangeet Night', date: '', time: '', venue: '', mapLink: '' },
        { name: 'Wedding Ceremony', date: '', time: '', venue: '', mapLink: '' }
      ],
      brideFamily: { title: '', description: '', address: '' },
      groomFamily: { title: '', description: '', address: '' },
      contacts: [{ name: '', number: '' }]
    }
  });

  const { fields: eventFields, append: appendEvent, remove: removeEvent } = useFieldArray({
    control: form.control,
    name: 'events'
  });

  const { fields: contactFields, append: appendContact, remove: removeContact } = useFieldArray({
    control: form.control,
    name: 'contacts'
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Create main invitation record without user_id requirement
      const { data: invitation, error: invitationError } = await supabase
        .from('invitations')
        .insert({
          wedding_date: new Date(data.weddingDate + 'T' + data.weddingTime),
          couple_names: `${data.brideName} & ${data.groomName}`,
          venue: data.venueAddress,
          venue_address: data.venueAddress
        })
        .select()
        .single();

      if (invitationError) throw invitationError;

      // Create invitation customizations
      const { error: customizationError } = await supabase
        .from('invitation_customizations')
        .insert({
          invitation_id: invitation.id,
          bride_name: data.brideName,
          groom_name: data.groomName,
          wedding_date: data.weddingDate,
          wedding_time: data.weddingTime,
          couple_tagline: data.coupleTagline || '',
          venue_address: data.venueAddress,
          venue_map_link: data.venueMapLink || '',
          groom_first: data.groomFirst
        });

      if (customizationError) throw customizationError;

      // Create events
      const eventsToInsert = data.events.map((event, index) => ({
        invitation_id: invitation.id,
        event_name: event.name,
        event_date: event.date,
        event_time: event.time,
        event_venue: event.venue,
        event_venue_map_link: event.mapLink || '',
        event_order: index
      }));

      const { error: eventsError } = await supabase
        .from('invitation_events')
        .insert(eventsToInsert);

      if (eventsError) throw eventsError;

      // Create family details
      const familiesToInsert = [
        {
          invitation_id: invitation.id,
          family_side: 'bride',
          family_title: data.brideFamily.title,
          family_description: data.brideFamily.description || '',
          family_address: data.brideFamily.address || ''
        },
        {
          invitation_id: invitation.id,
          family_side: 'groom',
          family_title: data.groomFamily.title,
          family_description: data.groomFamily.description || '',
          family_address: data.groomFamily.address || ''
        }
      ];

      const { error: familiesError } = await supabase
        .from('invitation_families')
        .insert(familiesToInsert);

      if (familiesError) throw familiesError;

      // Create contacts
      const contactsToInsert = data.contacts.map(contact => ({
        invitation_id: invitation.id,
        contact_name: contact.name,
        contact_number: contact.number
      }));

      const { error: contactsError } = await supabase
        .from('invitation_contacts')
        .insert(contactsToInsert);

      if (contactsError) throw contactsError;

      toast({
        title: "Invitation Created Successfully!",
        description: `Your invitation has been created with ID: ${invitation.id}`,
        variant: "default"
      });

      // Navigate to guest management page
      navigate(`/guest-management/${invitation.id}`);

    } catch (error) {
      console.error('Error creating invitation:', error);
      toast({
        title: "Error Creating Invitation",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-maroon py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-cormorant text-4xl md:text-5xl gold-text font-bold mb-4">
            Create Your Wedding Invitation
          </h1>
          <p className="text-cream text-lg">
            Customize your beautiful wedding invitation
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Couple Details */}
            <Card className="bg-maroon/50 border-gold-light/30">
              <CardHeader>
                <CardTitle className="gold-text flex items-center">
                  <Heart className="mr-2" size={20} />
                  Couple Details
                </CardTitle>
                <CardDescription className="text-cream/80">
                  Enter the bride and groom information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="brideName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gold-light">Bride Name</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-maroon/30 border-gold-light/50 text-cream" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="groomName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gold-light">Groom Name</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-maroon/30 border-gold-light/50 text-cream" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="groomFirst"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gold-light/30 p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-gold-light">Name Order</FormLabel>
                        <div className="text-cream/80 text-sm">
                          Show groom's name first?
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="coupleTagline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gold-light">Couple Tagline (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., Two hearts becoming one" className="bg-maroon/30 border-gold-light/50 text-cream" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Wedding Details */}
            <Card className="bg-maroon/50 border-gold-light/30">
              <CardHeader>
                <CardTitle className="gold-text flex items-center">
                  <CalendarIcon className="mr-2" size={20} />
                  Wedding Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="weddingDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gold-light">Wedding Date</FormLabel>
                        <FormControl>
                          <Input {...field} type="date" className="bg-maroon/30 border-gold-light/50 text-cream" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="weddingTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gold-light">Wedding Time</FormLabel>
                        <FormControl>
                          <Input {...field} type="time" className="bg-maroon/30 border-gold-light/50 text-cream" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="venueAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gold-light">Venue Address</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="bg-maroon/30 border-gold-light/50 text-cream" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="venueMapLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gold-light">Venue Map Link (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://maps.google.com/..." className="bg-maroon/30 border-gold-light/50 text-cream" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Events */}
            <Card className="bg-maroon/50 border-gold-light/30">
              <CardHeader>
                <CardTitle className="gold-text">Events</CardTitle>
                <CardDescription className="text-cream/80">
                  Add all your wedding events
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {eventFields.map((field, index) => (
                  <div key={field.id} className="border border-gold-light/20 rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="gold-text font-medium">Event {index + 1}</h4>
                      {eventFields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEvent(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={16} />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`events.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gold-light">Event Name</FormLabel>
                            <FormControl>
                              <Input {...field} className="bg-maroon/30 border-gold-light/50 text-cream" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`events.${index}.venue`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gold-light">Venue</FormLabel>
                            <FormControl>
                              <Input {...field} className="bg-maroon/30 border-gold-light/50 text-cream" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`events.${index}.date`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gold-light">Date</FormLabel>
                            <FormControl>
                              <Input {...field} type="date" className="bg-maroon/30 border-gold-light/50 text-cream" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`events.${index}.time`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gold-light">Time</FormLabel>
                            <FormControl>
                              <Input {...field} type="time" className="bg-maroon/30 border-gold-light/50 text-cream" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name={`events.${index}.mapLink`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gold-light">Map Link (Optional)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://maps.google.com/..." className="bg-maroon/30 border-gold-light/50 text-cream" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => appendEvent({ name: '', date: '', time: '', venue: '', mapLink: '' })}
                  className="w-full border-gold-light/50 text-gold-light hover:bg-gold-light/10"
                >
                  <Plus className="mr-2" size={16} />
                  Add Event
                </Button>
              </CardContent>
            </Card>

            {/* Family Details */}
            <Card className="bg-maroon/50 border-gold-light/30">
              <CardHeader>
                <CardTitle className="gold-text">Family Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="gold-text font-medium">Bride's Family</h4>
                    <FormField
                      control={form.control}
                      name="brideFamily.title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gold-light">Family Title</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., Mr. & Mrs. Smith" className="bg-maroon/30 border-gold-light/50 text-cream" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="brideFamily.description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gold-light">Description (Optional)</FormLabel>
                          <FormControl>
                            <Textarea {...field} className="bg-maroon/30 border-gold-light/50 text-cream" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="gold-text font-medium">Groom's Family</h4>
                    <FormField
                      control={form.control}
                      name="groomFamily.title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gold-light">Family Title</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., Mr. & Mrs. Johnson" className="bg-maroon/30 border-gold-light/50 text-cream" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="groomFamily.description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gold-light">Description (Optional)</FormLabel>
                          <FormControl>
                            <Textarea {...field} className="bg-maroon/30 border-gold-light/50 text-cream" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contacts */}
            <Card className="bg-maroon/50 border-gold-light/30">
              <CardHeader>
                <CardTitle className="gold-text">Contact Information</CardTitle>
                <CardDescription className="text-cream/80">
                  Add contact details for guests
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactFields.map((field, index) => (
                  <div key={field.id} className="flex gap-4">
                    <FormField
                      control={form.control}
                      name={`contacts.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-gold-light">Contact Name</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-maroon/30 border-gold-light/50 text-cream" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`contacts.${index}.number`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-gold-light">Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-maroon/30 border-gold-light/50 text-cream" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {contactFields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeContact(index)}
                        className="text-red-400 hover:text-red-300 self-end"
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => appendContact({ name: '', number: '' })}
                  className="w-full border-gold-light/50 text-gold-light hover:bg-gold-light/10"
                >
                  <Plus className="mr-2" size={16} />
                  Add Contact
                </Button>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gold-gradient text-maroon font-bold px-8 py-3 text-lg hover:scale-105 transition-transform"
              >
                {isSubmitting ? 'Creating Invitation...' : 'Create Invitation'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Customize;
