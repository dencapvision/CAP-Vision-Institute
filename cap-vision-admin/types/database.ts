// Database types generated from Supabase schema
// Run: npx supabase gen types typescript --project-id nheppvjayzxlblkeanxs > types/database.ts

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      contents: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: Json | null
          content_type: string
          status: string | null
          cover_image_id: string | null
          author_id: string | null
          published_at: string | null
          created_at: string | null
          updated_at: string | null
          search_vector: string | null
        }
        Insert: Omit<Database['public']['Tables']['contents']['Row'], 'id' | 'created_at' | 'updated_at' | 'search_vector'>
        Update: Partial<Database['public']['Tables']['contents']['Insert']>
      }
      speakers: {
        Row: {
          id: string
          content_id: string | null
          name: string
          position: string | null
          bio_short: string | null
          bio_long: string | null
          experience_years: number | null
          total_stages: number | null
          total_organizations: number | null
          expertise: string[] | null
          signature_programs: string[] | null
          profile_image_id: string | null
          slug: string | null
          social_links: Json | null
          profile_pdf_url: string | null
          downloadable_files: Json | null
          is_featured: boolean | null
          sort_order: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['speakers']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['speakers']['Insert']>
      }
      media: {
        Row: {
          id: string
          file_url: string
          file_type: string | null
          alt_text: string
          title: string | null
          description: string | null
          tags: string[] | null
          uploaded_by: string | null
          storage_path: string | null
          related_content_id: string | null
          width: number | null
          height: number | null
          file_size_bytes: number | null
          updated_at: string | null
          created_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['media']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['media']['Insert']>
      }
      events: {
        Row: {
          id: string
          title: string
          slug: string | null
          description: string | null
          event_date: string | null
          location: string | null
          registration_url: string | null
          cover_image_id: string | null
          status: string | null
          is_online: boolean | null
          max_attendees: number | null
          updated_at: string | null
          created_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['events']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['events']['Insert']>
      }
      courses: {
        Row: {
          id: string
          title: string
          slug: string | null
          category: string
          description: string | null
          target_audience: string | null
          pain_point: string | null
          expected_outcome: string | null
          duration: string | null
          objectives: string[] | null
          modules: Json
          activities: Json
          methodology: string | null
          highlights: string[] | null
          instructor_id: string | null
          status: string | null
          metadata: Json | null
          cover_image_id: string | null
          tags: string[] | null
          price_thb: number | null
          is_featured: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['courses']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['courses']['Insert']>
      }
      categories: {
        Row: { id: string; name: string; slug: string; description: string | null }
        Insert: Omit<Database['public']['Tables']['categories']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['categories']['Insert']>
      }
      tags: {
        Row: { id: string; name: string; slug: string }
        Insert: Omit<Database['public']['Tables']['tags']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['tags']['Insert']>
      }
      seo_metadata: {
        Row: {
          id: string
          content_id: string | null
          meta_title: string | null
          meta_description: string | null
          keywords: string[] | null
          og_image_id: string | null
          og_image_url: string | null
          canonical_url: string | null
          schema_json: Json | null
          twitter_card: string | null
          updated_at: string | null
          created_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['seo_metadata']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['seo_metadata']['Insert']>
      }
      leads: {
        Row: {
          id: string
          name: string | null
          company: string | null
          email: string | null
          phone: string | null
          interest_topic: string | null
          notes: string | null
          status: string | null
          source: string | null
          line_id: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['leads']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['leads']['Insert']>
      }
      users: {
        Row: { id: string; email: string | null; role: string | null; created_at: string | null }
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
    }
  }
}
