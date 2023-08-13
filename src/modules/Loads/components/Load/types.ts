import { FieldValues, Control } from 'react-hook-form';
import { Addresses, UserDatabaseWithComp } from '../../../../utils/api/supabase/types';

export type ControllerProps<T extends FieldValues> = {
  control: Control<T>;
};
export type Vehicles = {
  [key: string]: boolean;
};
export type LoadDetails = {
  id: string;
  price: string;
  loadingAddress: Addresses;
  unloadingAddress: Addresses;
  currency: string;
  paymentTerm: string;
  loadingDate: string;
  unloadingDate: string;
  cargoLength: number | null;
  cargoWeight: number | null;
  vehicleTypes: Vehicles;
  user: UserDatabaseWithComp;
  createdAt: string;
};
