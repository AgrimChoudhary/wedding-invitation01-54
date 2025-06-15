export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      client_limits: {
        Row: {
          created_at: string | null
          max_guests_per_invitation: number
          max_invitations: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          max_guests_per_invitation?: number
          max_invitations?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          max_guests_per_invitation?: number
          max_invitations?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      guest_interactions: {
        Row: {
          created_at: string | null
          guest_id: string | null
          id: string
          interaction_type: string
          photo_id: string | null
        }
        Insert: {
          created_at?: string | null
          guest_id?: string | null
          id?: string
          interaction_type: string
          photo_id?: string | null
        }
        Update: {
          created_at?: string | null
          guest_id?: string | null
          id?: string
          interaction_type?: string
          photo_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "guest_interactions_guest_id_fkey"
            columns: ["guest_id"]
            isOneToOne: false
            referencedRelation: "guests"
            referencedColumns: ["id"]
          },
        ]
      }
      guests: {
        Row: {
          created_at: string | null
          id: string
          invitation_id: string | null
          mobile: string | null
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          invitation_id?: string | null
          mobile?: string | null
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          invitation_id?: string | null
          mobile?: string | null
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "guests_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "invitations"
            referencedColumns: ["id"]
          },
        ]
      }
      invitation_contacts: {
        Row: {
          contact_name: string
          contact_number: string
          created_at: string
          id: string
          invitation_id: string
        }
        Insert: {
          contact_name: string
          contact_number: string
          created_at?: string
          id?: string
          invitation_id: string
        }
        Update: {
          contact_name?: string
          contact_number?: string
          created_at?: string
          id?: string
          invitation_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invitation_contacts_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "invitations"
            referencedColumns: ["id"]
          },
        ]
      }
      invitation_customizations: {
        Row: {
          bride_name: string
          couple_tagline: string | null
          created_at: string
          groom_first: boolean | null
          groom_name: string
          guest_name_placeholder: string | null
          id: string
          invitation_id: string
          updated_at: string
          venue_address: string | null
          venue_map_link: string | null
          wedding_date: string
          wedding_time: string
        }
        Insert: {
          bride_name: string
          couple_tagline?: string | null
          created_at?: string
          groom_first?: boolean | null
          groom_name: string
          guest_name_placeholder?: string | null
          id?: string
          invitation_id: string
          updated_at?: string
          venue_address?: string | null
          venue_map_link?: string | null
          wedding_date: string
          wedding_time: string
        }
        Update: {
          bride_name?: string
          couple_tagline?: string | null
          created_at?: string
          groom_first?: boolean | null
          groom_name?: string
          guest_name_placeholder?: string | null
          id?: string
          invitation_id?: string
          updated_at?: string
          venue_address?: string | null
          venue_map_link?: string | null
          wedding_date?: string
          wedding_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "invitation_customizations_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: true
            referencedRelation: "invitations"
            referencedColumns: ["id"]
          },
        ]
      }
      invitation_events: {
        Row: {
          created_at: string
          event_date: string
          event_name: string
          event_order: number | null
          event_time: string
          event_venue: string
          event_venue_map_link: string | null
          id: string
          invitation_id: string
        }
        Insert: {
          created_at?: string
          event_date: string
          event_name: string
          event_order?: number | null
          event_time: string
          event_venue: string
          event_venue_map_link?: string | null
          id?: string
          invitation_id: string
        }
        Update: {
          created_at?: string
          event_date?: string
          event_name?: string
          event_order?: number | null
          event_time?: string
          event_venue?: string
          event_venue_map_link?: string | null
          id?: string
          invitation_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invitation_events_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "invitations"
            referencedColumns: ["id"]
          },
        ]
      }
      invitation_families: {
        Row: {
          created_at: string
          family_address: string | null
          family_description: string | null
          family_side: string
          family_title: string
          id: string
          invitation_id: string
        }
        Insert: {
          created_at?: string
          family_address?: string | null
          family_description?: string | null
          family_side: string
          family_title: string
          id?: string
          invitation_id: string
        }
        Update: {
          created_at?: string
          family_address?: string | null
          family_description?: string | null
          family_side?: string
          family_title?: string
          id?: string
          invitation_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invitation_families_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "invitations"
            referencedColumns: ["id"]
          },
        ]
      }
      invitation_family_members: {
        Row: {
          created_at: string
          family_id: string
          id: string
          member_description: string | null
          member_name: string
          member_relation: string
        }
        Insert: {
          created_at?: string
          family_id: string
          id?: string
          member_description?: string | null
          member_name: string
          member_relation: string
        }
        Update: {
          created_at?: string
          family_id?: string
          id?: string
          member_description?: string | null
          member_name?: string
          member_relation?: string
        }
        Relationships: [
          {
            foreignKeyName: "invitation_family_members_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "invitation_families"
            referencedColumns: ["id"]
          },
        ]
      }
      invitation_photos: {
        Row: {
          created_at: string
          id: string
          invitation_id: string
          photo_alt: string | null
          photo_order: number | null
          photo_url: string
        }
        Insert: {
          created_at?: string
          id?: string
          invitation_id: string
          photo_alt?: string | null
          photo_order?: number | null
          photo_url: string
        }
        Update: {
          created_at?: string
          id?: string
          invitation_id?: string
          photo_alt?: string | null
          photo_order?: number | null
          photo_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "invitation_photos_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "invitations"
            referencedColumns: ["id"]
          },
        ]
      }
      invitations: {
        Row: {
          couple_names: string
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string
          venue: string
          venue_address: string | null
          wedding_date: string
        }
        Insert: {
          couple_names: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
          venue: string
          venue_address?: string | null
          wedding_date: string
        }
        Update: {
          couple_names?: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
          venue?: string
          venue_address?: string | null
          wedding_date?: string
        }
        Relationships: []
      }
      wish_likes: {
        Row: {
          created_at: string
          guest_name: string
          id: string
          wish_id: string
        }
        Insert: {
          created_at?: string
          guest_name: string
          id?: string
          wish_id: string
        }
        Update: {
          created_at?: string
          guest_name?: string
          id?: string
          wish_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wish_likes_wish_id_fkey"
            columns: ["wish_id"]
            isOneToOne: false
            referencedRelation: "wishes"
            referencedColumns: ["id"]
          },
        ]
      }
      wish_replies: {
        Row: {
          created_at: string
          guest_name: string
          id: string
          reply_text: string
          wish_id: string
        }
        Insert: {
          created_at?: string
          guest_name: string
          id?: string
          reply_text: string
          wish_id: string
        }
        Update: {
          created_at?: string
          guest_name?: string
          id?: string
          reply_text?: string
          wish_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wish_replies_wish_id_fkey"
            columns: ["wish_id"]
            isOneToOne: false
            referencedRelation: "wishes"
            referencedColumns: ["id"]
          },
        ]
      }
      wishes: {
        Row: {
          created_at: string
          guest_name: string
          id: string
          likes_count: number
          replies_count: number
          team_preference: string | null
          wish_text: string
          wish_type: string
        }
        Insert: {
          created_at?: string
          guest_name: string
          id?: string
          likes_count?: number
          replies_count?: number
          team_preference?: string | null
          wish_text: string
          wish_type?: string
        }
        Update: {
          created_at?: string
          guest_name?: string
          id?: string
          likes_count?: number
          replies_count?: number
          team_preference?: string | null
          wish_text?: string
          wish_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
