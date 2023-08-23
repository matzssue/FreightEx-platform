import supabase from '../../../../config/supabase';

export const getVehicleData = async (registerNumber: string | undefined) => {
  const { data: vehicleData, error } = await supabase
    .from('vehicles')
    .select(`*`)
    .eq('vehicle_register_number', registerNumber)
    .single();

  if (error) throw new Error();
  console.log('inside', vehicleData);
  const vehicles = {
    vehicleRegistrationNumber: vehicleData.vehicle_register_number,
    vehicleType: vehicleData.vehicle_type,
    driverPhoneNumber: vehicleData.driver_phone_number,
    driverName: vehicleData.driver_name,
  };

  return vehicles;
};
