export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          company: string | null
          avatar_url: string | null
          billing_address: Json | null
          payment_method: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          company?: string | null
          avatar_url?: string | null
          billing_address?: Json | null
          payment_method?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          email?: string
          full_name?: string | null
          company?: string | null
          avatar_url?: string | null
          billing_address?: Json | null
          payment_method?: Json | null
          updated_at?: string
        }
      }

      products: {
        Row: {
          id: string
          active: boolean | null
          name: string | null
          description: string | null
          image: string | null
          metadata: Json | null
        }
        Insert: {
          id: string
          active?: boolean | null
          name?: string | null
          description?: string | null
          image?: string | null
          metadata?: Json | null
        }
        Update: {
          active?: boolean | null
          name?: string | null
          description?: string | null
          image?: string | null
          metadata?: Json | null
        }
      }

      prices: {
        Row: {
          id: string
          product_id: string | null
          active: boolean | null
          description: string | null
          unit_amount: number | null
          currency: string | null
          type: 'one_time' | 'recurring' | null
          interval: 'month' | 'year' | null
          interval_count: number | null
          trial_period_days: number | null
          metadata: Json | null
        }
        Insert: {
          id: string
          product_id?: string | null
          active?: boolean | null
          description?: string | null
          unit_amount?: number | null
          currency?: string | null
          type?: 'one_time' | 'recurring' | null
          interval?: 'month' | 'year' | null
          interval_count?: number | null
          trial_period_days?: number | null
          metadata?: Json | null
        }
        Update: {
          product_id?: string | null
          active?: boolean | null
          description?: string | null
          unit_amount?: number | null
          currency?: string | null
          type?: 'one_time' | 'recurring' | null
          interval?: 'month' | 'year' | null
          interval_count?: number | null
          trial_period_days?: number | null
          metadata?: Json | null
        }
      }

      subscriptions: {
        Row: {
          id: string
          user_id: string
          status: string | null
          metadata: Json | null
          price_id: string | null
          quantity: number | null
          cancel_at_period_end: boolean | null
          created: string
          current_period_start: string
          current_period_end: string
          ended_at: string | null
          cancel_at: string | null
          canceled_at: string | null
          trial_start: string | null
          trial_end: string | null
        }
        Insert: {
          id: string
          user_id: string
          status?: string | null
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          cancel_at_period_end?: boolean | null
          created: string
          current_period_start: string
          current_period_end: string
          ended_at?: string | null
          cancel_at?: string | null
          canceled_at?: string | null
          trial_start?: string | null
          trial_end?: string | null
        }
        Update: {
          status?: string | null
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          cancel_at_period_end?: boolean | null
          ended_at?: string | null
          cancel_at?: string | null
          canceled_at?: string | null
          trial_start?: string | null
          trial_end?: string | null
        }
      }

      usage: {
        Row: {
          id: string
          user_id: string
          action: string
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          action: string
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          action?: string
          metadata?: Json | null
        }
      }

      generated_documents: {
        Row: {
          id: string
          user_id: string
          title: string
          content: string | null
          document_type: string | null
          industry: string | null
          format: string | null
          file_url: string | null
          business_info: Json | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content?: string | null
          document_type?: string | null
          industry?: string | null
          format?: string | null
          file_url?: string | null
          business_info?: Json | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          content?: string | null
          document_type?: string | null
          industry?: string | null
          format?: string | null
          file_url?: string | null
          business_info?: Json | null
          metadata?: Json | null
          updated_at?: string
        }
      }

      user_documents: {
        Row: {
          id: string
          user_id: string
          file_name: string
          file_path: string | null
          document_type: string | null
          industry: string | null
          format: 'docx' | 'pdf' | 'xlsx' | null
          download_url: string | null
          download_count: number
          status: 'uploaded' | 'queued' | 'processing' | 'complete' | 'failed' | 'under_review'
          file_size: number | null
          metadata: Json | null
          deleted_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          file_name: string
          file_path?: string | null
          document_type?: string | null
          industry?: string | null
          format?: 'docx' | 'pdf' | 'xlsx' | null
          download_url?: string | null
          download_count?: number
          status?: 'uploaded' | 'queued' | 'processing' | 'complete' | 'failed' | 'under_review'
          file_size?: number | null
          metadata?: Json | null
          deleted_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          file_name?: string
          file_path?: string | null
          document_type?: string | null
          industry?: string | null
          format?: 'docx' | 'pdf' | 'xlsx' | null
          download_url?: string | null
          download_count?: number
          status?: 'uploaded' | 'queued' | 'processing' | 'complete' | 'failed' | 'under_review'
          file_size?: number | null
          metadata?: Json | null
          deleted_at?: string | null
          updated_at?: string
        }
      }

      agent_logs: {
        Row: {
          id: string
          user_id: string
          agent_id: string
          question: string | null
          response: string | null
          context: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          agent_id: string
          question?: string | null
          response?: string | null
          context?: Json | null
          created_at?: string
        }
        Update: {
          agent_id?: string
          question?: string | null
          response?: string | null
          context?: Json | null
        }
      }

      document_logs: {
        Row: {
          id: string
          document_id: string
          user_id: string
          action: string
          status: string
          message: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          document_id: string
          user_id: string
          action: string
          status: string
          message?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          action?: string
          status?: string
          message?: string | null
          metadata?: Json | null
        }
      }

      template_versions: {
        Row: {
          id: string
          industry: string
          document_title: string
          content: string | null
          file_path: string | null
          uploaded_by: string | null
          version: number
          is_active: boolean
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          industry: string
          document_title: string
          content?: string | null
          file_path?: string | null
          uploaded_by?: string | null
          version?: number
          is_active?: boolean
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          industry?: string
          document_title?: string
          content?: string | null
          file_path?: string | null
          uploaded_by?: string | null
          version?: number
          is_active?: boolean
          metadata?: Json | null
          updated_at?: string
        }
      }
    }

    Views: {}
    Functions: {}
    Enums: {}
  }
}
