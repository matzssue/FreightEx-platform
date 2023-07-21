export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      addresses: {
        Row: {
          city: string
          country: string
          id: number
          latitude: number
          longitude: number
          postal_code: string
        }
        Insert: {
          city: string
          country: string
          id: number
          latitude: number
          longitude: number
          postal_code: string
        }
        Update: {
          city?: string
          country?: string
          id?: number
          latitude?: number
          longitude?: number
          postal_code?: string
        }
        Relationships: []
      }
      companies: {
        Row: {
          id: string
          name: string
          vat_id: string
        }
        Insert: {
          id?: string
          name: string
          vat_id: string
        }
        Update: {
          id?: string
          name?: string
          vat_id?: string
        }
        Relationships: []
      }
      loads: {
        Row: {
          created_at: string
          currency: string
          id: string
          length: number | null
          loading_address_id: number | null
          loading_date: string
          price: string
          term: string
          unloading_address_id: number | null
          unloading_date: string
          user_id: string
          vehicle_types: Json
          weight: number | null
        }
        Insert: {
          created_at?: string
          currency: string
          id?: string
          length?: number | null
          loading_address_id?: number | null
          loading_date: string
          price: string
          term: string
          unloading_address_id?: number | null
          unloading_date: string
          user_id: string
          vehicle_types: Json
          weight?: number | null
        }
        Update: {
          created_at?: string
          currency?: string
          id?: string
          length?: number | null
          loading_address_id?: number | null
          loading_date?: string
          price?: string
          term?: string
          unloading_address_id?: number | null
          unloading_date?: string
          user_id?: string
          vehicle_types?: Json
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "loads_loading_address_id_fkey"
            columns: ["loading_address_id"]
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loads_unloading_address_id_fkey"
            columns: ["unloading_address_id"]
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loads_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          avatar: string | null
          company_vat_id: string | null
          email: string
          id: string
          name: string
          surname: string
        }
        Insert: {
          avatar?: string | null
          company_vat_id?: string | null
          email: string
          id?: string
          name: string
          surname: string
        }
        Update: {
          avatar?: string | null
          company_vat_id?: string | null
          email?: string
          id?: string
          name?: string
          surname?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_company_vat_id_fkey"
            columns: ["company_vat_id"]
            referencedRelation: "companies"
            referencedColumns: ["vat_id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_entries_within_distance: {
        Args: {
          tlongitude: number
          tlatitude: number
          distance: number
        }
        Returns: {
          load_id: string
          user_data: unknown
          company_data: unknown
          loading_address_id: unknown
          unloading_address_id: unknown
          loading_date: string
          unloading_date: string
          price: string
          term: string
          currency: string
          length: number
          weight: number
          vehicle_types: Json
          created_at: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
