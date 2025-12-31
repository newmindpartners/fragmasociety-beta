export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      deal_comments: {
        Row: {
          content: string
          created_at: string
          deal_id: string
          id: string
          parent_id: string | null
          updated_at: string
          user_avatar: string | null
          user_id: string
          user_name: string
        }
        Insert: {
          content: string
          created_at?: string
          deal_id: string
          id?: string
          parent_id?: string | null
          updated_at?: string
          user_avatar?: string | null
          user_id: string
          user_name: string
        }
        Update: {
          content?: string
          created_at?: string
          deal_id?: string
          id?: string
          parent_id?: string | null
          updated_at?: string
          user_avatar?: string | null
          user_id?: string
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "deal_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "deal_comments"
            referencedColumns: ["id"]
          },
        ]
      }
      deal_updates: {
        Row: {
          content: string
          created_at: string
          deal_id: string
          id: string
          image_url: string | null
          published_at: string
          title: string
        }
        Insert: {
          content: string
          created_at?: string
          deal_id: string
          id?: string
          image_url?: string | null
          published_at?: string
          title: string
        }
        Update: {
          content?: string
          created_at?: string
          deal_id?: string
          id?: string
          image_url?: string | null
          published_at?: string
          title?: string
        }
        Relationships: []
      }
      deals: {
        Row: {
          asset_images: Json | null
          asset_video_url: string | null
          banner_image: string | null
          case_studies: Json | null
          category: string
          created_at: string
          currency: string
          current_properties: Json | null
          current_raised: string | null
          description: string
          distribution_frequency: string | null
          financials: Json | null
          hero_video_url: string | null
          id: string
          instrument_type: string
          investor_count: number | null
          leader_image: string | null
          leader_name: string
          leader_role: string
          market_data: Json | null
          market_highlights: Json | null
          max_ticket: string | null
          min_ticket: string
          pitch_video_url: string | null
          risk: string
          risks: Json | null
          special_opportunity: Json | null
          strategies: Json | null
          subcategory: string
          tagline: string
          target_return: string
          team: Json | null
          team_video_url: string | null
          term: string
          timeline: Json | null
          title: string
          total_past_profit: string | null
          total_raise: string
          track_record: Json | null
          updated_at: string
        }
        Insert: {
          asset_images?: Json | null
          asset_video_url?: string | null
          banner_image?: string | null
          case_studies?: Json | null
          category: string
          created_at?: string
          currency?: string
          current_properties?: Json | null
          current_raised?: string | null
          description: string
          distribution_frequency?: string | null
          financials?: Json | null
          hero_video_url?: string | null
          id: string
          instrument_type: string
          investor_count?: number | null
          leader_image?: string | null
          leader_name: string
          leader_role: string
          market_data?: Json | null
          market_highlights?: Json | null
          max_ticket?: string | null
          min_ticket: string
          pitch_video_url?: string | null
          risk: string
          risks?: Json | null
          special_opportunity?: Json | null
          strategies?: Json | null
          subcategory: string
          tagline: string
          target_return: string
          team?: Json | null
          team_video_url?: string | null
          term: string
          timeline?: Json | null
          title: string
          total_past_profit?: string | null
          total_raise: string
          track_record?: Json | null
          updated_at?: string
        }
        Update: {
          asset_images?: Json | null
          asset_video_url?: string | null
          banner_image?: string | null
          case_studies?: Json | null
          category?: string
          created_at?: string
          currency?: string
          current_properties?: Json | null
          current_raised?: string | null
          description?: string
          distribution_frequency?: string | null
          financials?: Json | null
          hero_video_url?: string | null
          id?: string
          instrument_type?: string
          investor_count?: number | null
          leader_image?: string | null
          leader_name?: string
          leader_role?: string
          market_data?: Json | null
          market_highlights?: Json | null
          max_ticket?: string | null
          min_ticket?: string
          pitch_video_url?: string | null
          risk?: string
          risks?: Json | null
          special_opportunity?: Json | null
          strategies?: Json | null
          subcategory?: string
          tagline?: string
          target_return?: string
          team?: Json | null
          team_video_url?: string | null
          term?: string
          timeline?: Json | null
          title?: string
          total_past_profit?: string | null
          total_raise?: string
          track_record?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      early_access_submissions: {
        Row: {
          annual_income: string | null
          asset_interests: string[] | null
          city: string | null
          consent_to_contact: boolean | null
          country: string
          created_at: string
          email: string
          entity_name: string | null
          eu_professional_qualifications: string[] | null
          eu_qualifications_count: string | null
          full_name: string
          id: string
          investable_capital: string | null
          investment_amount_3_6_months: string | null
          investment_horizon: string | null
          investment_priorities: string[] | null
          investor_status: string | null
          is_pep: boolean | null
          is_sanctioned: boolean | null
          is_us_person: boolean | null
          marketing_consent: boolean | null
          other_rwa_description: string | null
          phone_whatsapp_number: string | null
          preferred_contact_channel: string | null
          preferred_ticket_size: string | null
          registering_as: string
          tags: string[] | null
          updated_at: string
          us_accredited_qualifications: string[] | null
        }
        Insert: {
          annual_income?: string | null
          asset_interests?: string[] | null
          city?: string | null
          consent_to_contact?: boolean | null
          country: string
          created_at?: string
          email: string
          entity_name?: string | null
          eu_professional_qualifications?: string[] | null
          eu_qualifications_count?: string | null
          full_name: string
          id?: string
          investable_capital?: string | null
          investment_amount_3_6_months?: string | null
          investment_horizon?: string | null
          investment_priorities?: string[] | null
          investor_status?: string | null
          is_pep?: boolean | null
          is_sanctioned?: boolean | null
          is_us_person?: boolean | null
          marketing_consent?: boolean | null
          other_rwa_description?: string | null
          phone_whatsapp_number?: string | null
          preferred_contact_channel?: string | null
          preferred_ticket_size?: string | null
          registering_as: string
          tags?: string[] | null
          updated_at?: string
          us_accredited_qualifications?: string[] | null
        }
        Update: {
          annual_income?: string | null
          asset_interests?: string[] | null
          city?: string | null
          consent_to_contact?: boolean | null
          country?: string
          created_at?: string
          email?: string
          entity_name?: string | null
          eu_professional_qualifications?: string[] | null
          eu_qualifications_count?: string | null
          full_name?: string
          id?: string
          investable_capital?: string | null
          investment_amount_3_6_months?: string | null
          investment_horizon?: string | null
          investment_priorities?: string[] | null
          investor_status?: string | null
          is_pep?: boolean | null
          is_sanctioned?: boolean | null
          is_us_person?: boolean | null
          marketing_consent?: boolean | null
          other_rwa_description?: string | null
          phone_whatsapp_number?: string | null
          preferred_contact_channel?: string | null
          preferred_ticket_size?: string | null
          registering_as?: string
          tags?: string[] | null
          updated_at?: string
          us_accredited_qualifications?: string[] | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          source: string | null
          subscribed_at: string
        }
        Insert: {
          email: string
          id?: string
          source?: string | null
          subscribed_at?: string
        }
        Update: {
          email?: string
          id?: string
          source?: string | null
          subscribed_at?: string
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          created_at: string
          deposit_confirmed: boolean
          id: string
          status_updates: boolean
          transfer_email: boolean
          transfer_push: boolean
          updated_at: string
          user_id: string
          withdrawal_confirmed: boolean
        }
        Insert: {
          created_at?: string
          deposit_confirmed?: boolean
          id?: string
          status_updates?: boolean
          transfer_email?: boolean
          transfer_push?: boolean
          updated_at?: string
          user_id: string
          withdrawal_confirmed?: boolean
        }
        Update: {
          created_at?: string
          deposit_confirmed?: boolean
          id?: string
          status_updates?: boolean
          transfer_email?: boolean
          transfer_push?: boolean
          updated_at?: string
          user_id?: string
          withdrawal_confirmed?: boolean
        }
        Relationships: []
      }
      payment_methods: {
        Row: {
          account_holder_name: string | null
          bank_name: string | null
          card_brand: string | null
          created_at: string
          id: string
          is_default: boolean
          last4: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          account_holder_name?: string | null
          bank_name?: string | null
          card_brand?: string | null
          created_at?: string
          id?: string
          is_default?: boolean
          last4: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          account_holder_name?: string | null
          bank_name?: string | null
          card_brand?: string | null
          created_at?: string
          id?: string
          is_default?: boolean
          last4?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      transfers: {
        Row: {
          account_last4: string | null
          amount: number
          bank_name: string | null
          created_at: string
          currency: string
          id: string
          notes: string | null
          reference: string | null
          status: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          account_last4?: string | null
          amount: number
          bank_name?: string | null
          created_at?: string
          currency?: string
          id?: string
          notes?: string | null
          reference?: string | null
          status?: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          account_last4?: string | null
          amount?: number
          bank_name?: string | null
          created_at?: string
          currency?: string
          id?: string
          notes?: string | null
          reference?: string | null
          status?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_documents: {
        Row: {
          category: string | null
          created_at: string
          file_name: string
          file_size: number | null
          file_type: string | null
          file_url: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          file_name: string
          file_size?: number | null
          file_type?: string | null
          file_url: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string
          file_name?: string
          file_size?: number | null
          file_type?: string | null
          file_url?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_investments: {
        Row: {
          created_at: string
          current_step: Database["public"]["Enums"]["investment_step"]
          deal_id: string
          id: string
          step_deadline: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_step?: Database["public"]["Enums"]["investment_step"]
          deal_id: string
          id?: string
          step_deadline?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_step?: Database["public"]["Enums"]["investment_step"]
          deal_id?: string
          id?: string
          step_deadline?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_investments_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      investment_step:
        | "verify_identity"
        | "select_deal"
        | "review_documents"
        | "payment_processing"
        | "funds_in_escrow"
        | "investment_complete"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      investment_step: [
        "verify_identity",
        "select_deal",
        "review_documents",
        "payment_processing",
        "funds_in_escrow",
        "investment_complete",
      ],
    },
  },
} as const
