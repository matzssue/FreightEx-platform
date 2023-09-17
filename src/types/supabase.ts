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
      accepted_loads: {
        Row: {
          accepted_by: string
          created_at: string
          currency: string
          id: number
          invoice_id: number | null
          length: number | null
          loading_address_id: number | null
          loading_date: string
          price: string
          term: string
          unloading_address_id: number | null
          unloading_date: string
          user_id: string
          vehicle_id: string | null
          vehicle_types: Json
          weight: number | null
        }
        Insert: {
          accepted_by: string
          created_at?: string
          currency: string
          id?: number
          invoice_id?: number | null
          length?: number | null
          loading_address_id?: number | null
          loading_date: string
          price: string
          term: string
          unloading_address_id?: number | null
          unloading_date: string
          user_id: string
          vehicle_id?: string | null
          vehicle_types: Json
          weight?: number | null
        }
        Update: {
          accepted_by?: string
          created_at?: string
          currency?: string
          id?: number
          invoice_id?: number | null
          length?: number | null
          loading_address_id?: number | null
          loading_date?: string
          price?: string
          term?: string
          unloading_address_id?: number | null
          unloading_date?: string
          user_id?: string
          vehicle_id?: string | null
          vehicle_types?: Json
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "accepted_loads_accepted_by_fkey"
            columns: ["accepted_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accepted_loads_invoice_id_fkey"
            columns: ["invoice_id"]
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accepted_loads_loading_address_id_fkey"
            columns: ["loading_address_id"]
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accepted_loads_unloading_address_id_fkey"
            columns: ["unloading_address_id"]
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accepted_loads_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accepted_loads_vehicle_id_fkey"
            columns: ["vehicle_id"]
            referencedRelation: "vehicles"
            referencedColumns: ["vehicle_register_number"]
          }
        ]
      }
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
      invoices: {
        Row: {
          additional_informations: string | null
          cost: number | null
          date: string | null
          end_date: string | null
          id: number
          payment_term: string | null
          recipient_id: string
          seller_id: string | null
        }
        Insert: {
          additional_informations?: string | null
          cost?: number | null
          date?: string | null
          end_date?: string | null
          id?: number
          payment_term?: string | null
          recipient_id: string
          seller_id?: string | null
        }
        Update: {
          additional_informations?: string | null
          cost?: number | null
          date?: string | null
          end_date?: string | null
          id?: number
          payment_term?: string | null
          recipient_id?: string
          seller_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_recipient_id_fkey"
            columns: ["recipient_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_seller_id_fkey"
            columns: ["seller_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
          user_id: string
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
          user_id: string
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
          avatar: string
          company_vat_id: string
          email: string
          id: string
          name: string
          surname: string
        }
        Insert: {
          avatar?: string
          company_vat_id: string
          email: string
          id?: string
          name: string
          surname: string
        }
        Update: {
          avatar?: string
          company_vat_id?: string
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
      vehicles: {
        Row: {
          driver_name: string
          driver_phone_number: string
          user_id: string | null
          vehicle_register_number: string
          vehicle_type: string
        }
        Insert: {
          driver_name: string
          driver_phone_number: string
          user_id?: string | null
          vehicle_register_number: string
          vehicle_type: string
        }
        Update: {
          driver_name?: string
          driver_phone_number?: string
          user_id?: string | null
          vehicle_register_number?: string
          vehicle_type?: string
        }
        Relationships: []
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
          id: number
          user_id: Json
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
