
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Calendar, MapPin, Clock, Heart, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  brideName: z.string().min(2, 'Bride name must be at least 2 characters'),
  groomName: z.string().min(2, 'Groom name must be at least 2 characters'),
  weddingDate: z.string().min(1, 'Wedding date is required'),
  weddingTime: z.string().min(1, 'Wedding time is required'),
  venueName: z.string().min(2, 'Venue name must be at least 2 characters'),
  venueAddress: z.string().min(5, 'Venue address must be at least 5 characters'),
  venueMapLink: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  coupleTagline: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const CustomizationForm = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brideName: '',
      groomName: '',
      weddingDate: '',
      weddingTime: '',
      venueName: '',
      venueAddress: '',
      venueMapLink: '',
      coupleTagline: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to create an invitation.",
          variant: "destructive",
        });
        return;
      }

      // Convert wedding date to timestamp
      const weddingDateTime = new Date(`${data.weddingDate}T${data.weddingTime}`);
      
      const { data: invitation, error } = await supabase
        .from('invitations')
        .insert({
          user_id: user.id,
          bride_name: data.brideName,
          groom_name: data.groomName,
          wedding_date: weddingDateTime.toISOString(),
          wedding_time: data.weddingTime,
          venue_name: data.venueName,
          venue_address: data.venueAddress,
          venue_map_link: data.venueMapLink || null,
          couple_tagline: data.coupleTagline || null,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: "Invitation Created!",
        description: "Your wedding invitation has been successfully created.",
        variant: "default",
      });

      // Navigate to guest management page
      navigate(`/guest-management/${invitation.id}`);
      
    } catch (error) {
      console.error('Error creating invitation:', error);
      toast({
        title: "Error",
        description: "Failed to create invitation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-maroon px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-cormorant text-4xl gold-text font-bold mb-4">
            Create Your Wedding Invitation
          </h1>
          <p className="text-cream/80 text-lg">
            Customize your perfect wedding invitation
          </p>
        </div>

        <div className="bg-maroon/60 backdrop-blur-sm rounded-xl p-8 gold-border">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="brideName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gold-light flex items-center">
                        <Heart className="mr-2" size={16} />
                        Bride's Name
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter bride's name" 
                          className="bg-maroon/40 border-gold-light/30 text-cream placeholder:text-cream/50"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="groomName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gold-light flex items-center">
                        <Heart className="mr-2" size={16} />
                        Groom's Name
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter groom's name" 
                          className="bg-maroon/40 border-gold-light/30 text-cream placeholder:text-cream/50"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="weddingDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gold-light flex items-center">
                        <Calendar className="mr-2" size={16} />
                        Wedding Date
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="date"
                          className="bg-maroon/40 border-gold-light/30 text-cream"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="weddingTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gold-light flex items-center">
                        <Clock className="mr-2" size={16} />
                        Wedding Time
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="time"
                          className="bg-maroon/40 border-gold-light/30 text-cream"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="venueName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold-light flex items-center">
                      <MapPin className="mr-2" size={16} />
                      Venue Name
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter venue name" 
                        className="bg-maroon/40 border-gold-light/30 text-cream placeholder:text-cream/50"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="venueAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold-light flex items-center">
                      <MapPin className="mr-2" size={16} />
                      Venue Address
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter complete venue address" 
                        className="bg-maroon/40 border-gold-light/30 text-cream placeholder:text-cream/50"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="venueMapLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold-light">
                      Google Maps Link (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://maps.google.com/..." 
                        className="bg-maroon/40 border-gold-light/30 text-cream placeholder:text-cream/50"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coupleTagline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold-light">
                      Couple Tagline (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., Two hearts, one love" 
                        className="bg-maroon/40 border-gold-light/30 text-cream placeholder:text-cream/50"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gold-gradient text-maroon font-bold py-3 hover:scale-105 transition-transform"
              >
                {loading ? "Creating Invitation..." : "Create Invitation"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CustomizationForm;
