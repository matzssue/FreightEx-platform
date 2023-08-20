import { Database } from '../../../types/supabase';

export type AddressesDatabase = Database['public']['Tables']['addresses']['Row'];
export type LoadsDatabase = Database['public']['Tables']['loads']['Row'];
export type UserDatabase = Database['public']['Tables']['users']['Row'];
export type CompanyDatabase = Database['public']['Tables']['companies']['Row'];
export type AcceptedLoad = Database['public']['Tables']['accepted_loads']['Row'];
export type InsertAcceptedLoad = Database['public']['Tables']['accepted_loads']['Insert'];
export type InsertVehicle = Database['public']['Tables']['vehicles']['Insert'];
export type UserDatabaseWithComp = {
  avatar: string;
  company_vat_id: CompanyDatabase;
  email: string;
  id: string;
  name: string;
  surname: string;
};
// export type UserDatabaseWithComp = UserDatabase & {
//   company_vat_id: CompanyDatabase;
// };
export type Addresses = Omit<AddressesDatabase, 'id'>;

type Vehicles = {
  [key: string]: boolean;
};

export type GetLoadsData = {
  id: string;
  loading_address_id: AddressesDatabase;
  unloading_address_id: AddressesDatabase;
  loading_date: string;
  unloading_date: string;
  vehicle_types: Vehicles;
  length: number;
  weight: number;
  term: string;
  price: string;
  currency: string;
  user_id: UserDatabaseWithComp;
  created_at: string;
};

export type AddLoadData = {
  currency: string;
  length?: number;
  loadingAddress: string;
  unloadingAddress: string;
  unloadingAddressData: Addresses;
  loadingAddressData: Addresses;
  loadingDate: string;
  weight?: number;
  price: string;
  term: string;
  unloadingDate: string;
  vehicles: Vehicles;
  userId: string;
};
export type LoadsData = {
  id: string;
  loading_address_id: AddressesDatabase;
  unloading_address_id: AddressesDatabase;
  loading_date: string;
  unloading_date: string;
  vehicle_types: Vehicles;
  length: number;
  weight: number;
  term: string;
  price: string;
  currency: string;
  user_id: UserDatabaseWithComp;
  company: CompanyDatabase;
  created_at: string;
};
export type Load = {
  id: string;
  loadingAddress: AddressesDatabase;
  unloadingAddress: AddressesDatabase;
  loadingDate: string;
  unloadingDate: string;
  vehicleTypes: Vehicles;
  cargoLength: number;
  cargoWeight: number;
  paymentTerm: string;
  price: string;
  currency: string;
  user: UserDatabase;
  company: CompanyDatabase;
  createdAt: string;
};
