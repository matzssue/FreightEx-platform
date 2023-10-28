export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    CompositeTypes: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    Functions: {
      get_entries_within_distance: {
        Args: {
          distance: number;
          tlatitude: number;
          tlongitude: number;
        };
        Returns: {
          created_at: string;
          currency: string;
          id: number;
          length: number;
          loading_address_id: unknown;
          loading_date: string;
          price: string;
          term: string;
          unloading_address_id: unknown;
          unloading_date: string;
          user_id: Json;
          vehicle_types: Json;
          weight: number;
        }[];
      };
    };
    Tables: {
      accepted_loads: {
        Insert: {
          accepted_by: string;
          created_at?: string;
          currency: string;
          id?: number;
          invoice_id?: number | null;
          length?: number | null;
          loading_address_id?: number | null;
          loading_date: string;
          price: number;
          term: string;
          unloading_address_id?: number | null;
          unloading_date: string;
          user_id: string;
          vehicle_id?: string | null;
          vehicle_types: Json;
          weight?: number | null;
        };
        Relationships: [
          {
            columns: ['accepted_by'];
            foreignKeyName: 'accepted_loads_accepted_by_fkey';
            referencedColumns: ['id'];
            referencedRelation: 'users';
          },
          {
            columns: ['invoice_id'];
            foreignKeyName: 'accepted_loads_invoice_id_fkey';
            referencedColumns: ['id'];
            referencedRelation: 'invoices';
          },
          {
            columns: ['loading_address_id'];
            foreignKeyName: 'accepted_loads_loading_address_id_fkey';
            referencedColumns: ['id'];
            referencedRelation: 'addresses';
          },
          {
            columns: ['unloading_address_id'];
            foreignKeyName: 'accepted_loads_unloading_address_id_fkey';
            referencedColumns: ['id'];
            referencedRelation: 'addresses';
          },
          {
            columns: ['user_id'];
            foreignKeyName: 'accepted_loads_user_id_fkey';
            referencedColumns: ['id'];
            referencedRelation: 'users';
          },
          {
            columns: ['vehicle_id'];
            foreignKeyName: 'accepted_loads_vehicle_id_fkey';
            referencedColumns: ['vehicle_register_number'];
            referencedRelation: 'vehicles';
          },
        ];
        Row: {
          accepted_by: string;
          created_at: string;
          currency: string;
          id: number;
          invoice_id: number | null;
          length: number | null;
          loading_address_id: number | null;
          loading_date: string;
          price: number;
          term: string;
          unloading_address_id: number | null;
          unloading_date: string;
          user_id: string;
          vehicle_id: string | null;
          vehicle_types: Json;
          weight: number | null;
        };
        Update: {
          accepted_by?: string;
          created_at?: string;
          currency?: string;
          id?: number;
          invoice_id?: number | null;
          length?: number | null;
          loading_address_id?: number | null;
          loading_date?: string;
          price?: number;
          term?: string;
          unloading_address_id?: number | null;
          unloading_date?: string;
          user_id?: string;
          vehicle_id?: string | null;
          vehicle_types?: Json;
          weight?: number | null;
        };
      };
      addresses: {
        Insert: {
          city?: string | null;
          country: string;
          id: number;
          latitude: number;
          longitude: number;
          postal_code: string;
        };
        Relationships: [];
        Row: {
          city: string | null;
          country: string;
          id: number;
          latitude: number;
          longitude: number;
          postal_code: string;
        };
        Update: {
          city?: string | null;
          country?: string;
          id?: number;
          latitude?: number;
          longitude?: number;
          postal_code?: string;
        };
      };
      companies: {
        Insert: {
          id?: string;
          name: string;
          vat_id: string;
        };
        Relationships: [];
        Row: {
          id: string;
          name: string;
          vat_id: string;
        };
        Update: {
          id?: string;
          name?: string;
          vat_id?: string;
        };
      };
      invoices: {
        Insert: {
          additional_informations?: string | null;
          cost: number;
          currency?: string;
          date: string;
          end_date: string;
          id?: number;
          payment_term: string;
          recipient_id: string;
          seller_id: string;
        };
        Relationships: [
          {
            columns: ['recipient_id'];
            foreignKeyName: 'invoices_recipient_id_fkey';
            referencedColumns: ['id'];
            referencedRelation: 'users';
          },
          {
            columns: ['seller_id'];
            foreignKeyName: 'invoices_seller_id_fkey';
            referencedColumns: ['id'];
            referencedRelation: 'users';
          },
        ];
        Row: {
          additional_informations: string | null;
          cost: number;
          currency: string;
          date: string;
          end_date: string;
          id: number;
          payment_term: string;
          recipient_id: string;
          seller_id: string;
        };
        Update: {
          additional_informations?: string | null;
          cost?: number;
          currency?: string;
          date?: string;
          end_date?: string;
          id?: number;
          payment_term?: string;
          recipient_id?: string;
          seller_id?: string;
        };
      };
      loads: {
        Insert: {
          created_at?: string;
          currency: string;
          id?: number;
          length?: number | null;
          loading_address_id?: number | null;
          loading_date: string;
          price: number;
          term: string;
          unloading_address_id?: number | null;
          unloading_date: string;
          user_id: string;
          vehicle_types: Json;
          weight?: number | null;
        };
        Relationships: [
          {
            columns: ['loading_address_id'];
            foreignKeyName: 'loads_loading_address_id_fkey';
            referencedColumns: ['id'];
            referencedRelation: 'addresses';
          },
          {
            columns: ['unloading_address_id'];
            foreignKeyName: 'loads_unloading_address_id_fkey';
            referencedColumns: ['id'];
            referencedRelation: 'addresses';
          },
          {
            columns: ['user_id'];
            foreignKeyName: 'loads_user_id_fkey';
            referencedColumns: ['id'];
            referencedRelation: 'users';
          },
        ];
        Row: {
          created_at: string;
          currency: string;
          id: number;
          length: number | null;
          loading_address_id: number | null;
          loading_date: string;
          price: number;
          term: string;
          unloading_address_id: number | null;
          unloading_date: string;
          user_id: string;
          vehicle_types: Json;
          weight: number | null;
        };
        Update: {
          created_at?: string;
          currency?: string;
          id?: number;
          length?: number | null;
          loading_address_id?: number | null;
          loading_date?: string;
          price?: number;
          term?: string;
          unloading_address_id?: number | null;
          unloading_date?: string;
          user_id?: string;
          vehicle_types?: Json;
          weight?: number | null;
        };
      };
      users: {
        Insert: {
          avatar?: string;
          company_vat_id: string;
          email: string;
          id?: string;
          name: string;
          surname: string;
        };
        Relationships: [
          {
            columns: ['company_vat_id'];
            foreignKeyName: 'users_company_vat_id_fkey';
            referencedColumns: ['vat_id'];
            referencedRelation: 'companies';
          },
        ];
        Row: {
          avatar: string;
          company_vat_id: string;
          email: string;
          id: string;
          name: string;
          surname: string;
        };
        Update: {
          avatar?: string;
          company_vat_id?: string;
          email?: string;
          id?: string;
          name?: string;
          surname?: string;
        };
      };
      vehicles: {
        Insert: {
          driver_name: string;
          driver_phone_number: string;
          user_id?: string | null;
          vehicle_register_number: string;
          vehicle_type: string;
        };
        Relationships: [];
        Row: {
          driver_name: string;
          driver_phone_number: string;
          user_id: string | null;
          vehicle_register_number: string;
          vehicle_type: string;
        };
        Update: {
          driver_name?: string;
          driver_phone_number?: string;
          user_id?: string | null;
          vehicle_register_number?: string;
          vehicle_type?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
  };
}
