import { Database } from '../../../types/supabase';
import { AddLoadValues } from '../../schemas/addLoadSchema';

type AddressesDatabase = Database['public']['Tables']['addresses']['Row'];
type Loads = Database['public']['Tables']['loads']['Row'];

export type Addresses = Omit<AddressesDatabase, 'id'>;

export type LoadData = Loads & {
  unloading_address_id: AddressesDatabase;
  loading_address_id: AddressesDatabase;
};

export type Load = AddLoadValues & {
  loadingAddressData: Addresses;
  unloadingAddressData: Addresses;
};
