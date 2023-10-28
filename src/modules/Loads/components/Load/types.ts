import { Control, FieldValues } from 'react-hook-form';

import { Addresses, UserDatabaseWithComp } from '../../../../utils/api/supabase/types';

export type ControllerProps<T extends FieldValues> = {
  control: Control<T>;
};
export type Vehicles = {
  [key: string]: boolean;
};
export type LoadDetails = {
  cargoLength: number | null;
  cargoWeight: number | null;
  createdAt: string;
  currency: string;
  id: string;
  loadingAddress: Addresses;
  loadingDate: string;
  paymentTerm: string;
  price: string;
  unloadingAddress: Addresses;
  unloadingDate: string;
  user: UserDatabaseWithComp;
  vehicleTypes: Vehicles;
};
