import supabase from '../../../../config/supabase';

export const getUserVehicles = async (id: string | undefined) => {
  const { data: vehicleData, error } = await supabase
    .from('vehicles')
    .select(`*`)
    .eq('user_id', id);

  if (error) throw new Error();
  if (error) return;
  const vehicles = vehicleData.map((data) => {
    return {
      vehicleRegistrationNumber: data.vehicle_register_number,
      vehicleType: data.vehicle_type,
      driverPhoneNumber: data.driver_phone_number,
      driverName: data.driver_name,
    };
  });

  return vehicles;
};
