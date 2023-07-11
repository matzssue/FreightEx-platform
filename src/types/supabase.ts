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
      loads: {
        Row: {
          created_at: string
          currency: string
          id: number
          length: number | null
          loading_address_id: number | null
          loading_date: string
          price: string
          term: string
          unloading_address_id: number | null
          unloading_date: string
          vehicle_types: Json
          weight: number | null
        }
        Insert: {
          created_at?: string
          currency: string
          id?: number
          length?: number | null
          loading_address_id?: number | null
          loading_date: string
          price: string
          term: string
          unloading_address_id?: number | null
          unloading_date: string
          vehicle_types: Json
          weight?: number | null
        }
        Update: {
          created_at?: string
          currency?: string
          id?: number
          length?: number | null
          loading_address_id?: number | null
          loading_date?: string
          price?: string
          term?: string
          unloading_address_id?: number | null
          unloading_date?: string
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
          created_at: string
          currency: string
          id: number
          length: number | null
          loading_address_id: number | null
          loading_date: string
          price: string
          term: string
          unloading_address_id: number | null
          unloading_date: string
          vehicle_types: Json
          weight: number | null
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
