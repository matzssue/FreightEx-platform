import { Database } from '../../../types/supabase';

export type AddressesDatabase = Database['public']['Tables']['addresses']['Row'];
export type LoadsDatabase = Database['public']['Tables']['loads']['Row'];
export type UserDatabase = Database['public']['Tables']['users']['Row'];
export type CompanyDatabase = Database['public']['Tables']['companies']['Row'];
export type AcceptedLoadDatabase = Database['public']['Tables']['accepted_loads']['Row'];
export type InsertAcceptedLoad = Database['public']['Tables']['accepted_loads']['Insert'];
export type InsertVehicle = Database['public']['Tables']['vehicles']['Insert'];
export type InsertInvoice = Database['public']['Tables']['invoices']['Insert'];
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
  price: number;
  currency: string;
  user_id: UserDatabaseWithComp;
  created_at: string;
};
export type GetLoadsDataWithId = {
  id: string;
  loading_address_id: AddressesDatabase;
  unloading_address_id: AddressesDatabase;
  loading_date: string;
  unloading_date: string;
  vehicle_types: Vehicles;
  length: number;
  weight: number;
  term: string;
  price: number;
  currency: string;
  user_id: string;
  created_at: string;
};
export type GetAcceptedLoadsData = {
  id: string;
  loading_address_id: AddressesDatabase;
  unloading_address_id: AddressesDatabase;
  loading_date: string;
  unloading_date: string;
  vehicle_types: Vehicles;
  length: number;
  weight: number;
  term: string;
  price: number;
  currency: string;
  user_id: UserDatabaseWithComp;
  accepted_by: UserDatabaseWithComp;
  created_at: string;
  vehicle_id: string | null;
  invoice_id: string | null;
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
  price: number;
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
  price: number;
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
  price: number;
  currency: string;
  user: UserDatabase;
  company: CompanyDatabase;
  createdAt: string;
};
export type AcceptedLoad = {
  id: string;
  loadingAddress: AddressesDatabase;
  unloadingAddress: AddressesDatabase;
  loadingDate: string;
  unloadingDate: string;
  vehicleTypes: Vehicles;
  cargoLength: number;
  cargoWeight: number;
  paymentTerm: string;
  price: number;
  currency: string;
  user: UserDatabase;
  company: CompanyDatabase;
  createdAt: string;
  vehicleId: string | null;
};
export type GetCompaniesData = {
  id: string;
  loading_address_id: AddressesDatabase;
  unloading_address_id: AddressesDatabase;
  loading_date: string;
  unloading_date: string;
  vehicle_types: Vehicles;
  length: number;
  weight: number;
  term: string;
  price: number;
  currency: string;
  user_id: UserDatabaseWithComp;
  accepted_by: UserDatabaseWithComp;
  created_at: string;
  vehicle_id: string | null;
};
export type getInvoicesDatabase = {
  id: number;
  cost: number;
  date: string;
  end_date: string;
  payment_term: string;
  recipient_id: UserDatabaseWithComp;
  seller_id: UserDatabaseWithComp;
  additional_informations: string;
  currency: string;
};

export type getInvoices = {
  id: number;
  cost: number;
  date: string;
  endDate: string;
  paymentTerm: string;
  recipient: UserDatabaseWithComp;
  seller: UserDatabaseWithComp;
  additionalInformations: string;
  currency: string;
};
