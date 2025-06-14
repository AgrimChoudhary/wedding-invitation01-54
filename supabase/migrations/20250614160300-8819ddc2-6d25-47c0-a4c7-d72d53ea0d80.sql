
-- Create a table for storing invitation customizations
CREATE TABLE public.invitation_customizations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invitation_id UUID NOT NULL REFERENCES public.invitations(id) ON DELETE CASCADE,
  bride_name TEXT NOT NULL,
  groom_name TEXT NOT NULL,
  wedding_date DATE NOT NULL,
  wedding_time TEXT NOT NULL,
  couple_tagline TEXT,
  guest_name_placeholder TEXT DEFAULT 'Guest Name',
  venue_address TEXT,
  venue_map_link TEXT,
  groom_first BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(invitation_id)
);

-- Create events table for each invitation
CREATE TABLE public.invitation_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invitation_id UUID NOT NULL REFERENCES public.invitations(id) ON DELETE CASCADE,
  event_name TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_time TEXT NOT NULL,
  event_venue TEXT NOT NULL,
  event_venue_map_link TEXT,
  event_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create family details table for each invitation
CREATE TABLE public.invitation_families (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invitation_id UUID NOT NULL REFERENCES public.invitations(id) ON DELETE CASCADE,
  family_side TEXT NOT NULL CHECK (family_side IN ('bride', 'groom')),
  family_title TEXT NOT NULL,
  family_description TEXT,
  family_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create family members table
CREATE TABLE public.invitation_family_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  family_id UUID NOT NULL REFERENCES public.invitation_families(id) ON DELETE CASCADE,
  member_name TEXT NOT NULL,
  member_relation TEXT NOT NULL,
  member_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contacts table for each invitation
CREATE TABLE public.invitation_contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invitation_id UUID NOT NULL REFERENCES public.invitations(id) ON DELETE CASCADE,
  contact_name TEXT NOT NULL,
  contact_number TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create photos table for each invitation
CREATE TABLE public.invitation_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invitation_id UUID NOT NULL REFERENCES public.invitations(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  photo_order INTEGER DEFAULT 0,
  photo_alt TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for invitation_customizations
ALTER TABLE public.invitation_customizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their invitation customizations" 
  ON public.invitation_customizations 
  FOR SELECT 
  USING (invitation_id IN (SELECT id FROM public.invitations WHERE user_id = auth.uid()));

CREATE POLICY "Users can create their invitation customizations" 
  ON public.invitation_customizations 
  FOR INSERT 
  WITH CHECK (invitation_id IN (SELECT id FROM public.invitations WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their invitation customizations" 
  ON public.invitation_customizations 
  FOR UPDATE 
  USING (invitation_id IN (SELECT id FROM public.invitations WHERE user_id = auth.uid()));

CREATE POLICY "Users can delete their invitation customizations" 
  ON public.invitation_customizations 
  FOR DELETE 
  USING (invitation_id IN (SELECT id FROM public.invitations WHERE user_id = auth.uid()));

-- Add RLS policies for other tables (similar pattern)
ALTER TABLE public.invitation_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitation_families ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitation_family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitation_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitation_photos ENABLE ROW LEVEL SECURITY;

-- Events policies
CREATE POLICY "Users can manage their invitation events" 
  ON public.invitation_events FOR ALL
  USING (invitation_id IN (SELECT id FROM public.invitations WHERE user_id = auth.uid()));

-- Families policies
CREATE POLICY "Users can manage their invitation families" 
  ON public.invitation_families FOR ALL
  USING (invitation_id IN (SELECT id FROM public.invitations WHERE user_id = auth.uid()));

-- Family members policies
CREATE POLICY "Users can manage their invitation family members" 
  ON public.invitation_family_members FOR ALL
  USING (family_id IN (
    SELECT f.id FROM public.invitation_families f 
    JOIN public.invitations i ON f.invitation_id = i.id 
    WHERE i.user_id = auth.uid()
  ));

-- Contacts policies
CREATE POLICY "Users can manage their invitation contacts" 
  ON public.invitation_contacts FOR ALL
  USING (invitation_id IN (SELECT id FROM public.invitations WHERE user_id = auth.uid()));

-- Photos policies
CREATE POLICY "Users can manage their invitation photos" 
  ON public.invitation_photos FOR ALL
  USING (invitation_id IN (SELECT id FROM public.invitations WHERE user_id = auth.uid()));

-- Allow public access to view invitations and related data (for guests)
CREATE POLICY "Public can view invitation customizations" 
  ON public.invitation_customizations 
  FOR SELECT 
  USING (true);

CREATE POLICY "Public can view invitation events" 
  ON public.invitation_events 
  FOR SELECT 
  USING (true);

CREATE POLICY "Public can view invitation families" 
  ON public.invitation_families 
  FOR SELECT 
  USING (true);

CREATE POLICY "Public can view invitation family members" 
  ON public.invitation_family_members 
  FOR SELECT 
  USING (true);

CREATE POLICY "Public can view invitation contacts" 
  ON public.invitation_contacts 
  FOR SELECT 
  USING (true);

CREATE POLICY "Public can view invitation photos" 
  ON public.invitation_photos 
  FOR SELECT 
  USING (true);
