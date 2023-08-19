import * as yup from 'yup';

export type VehicleValuesSchema = yup.InferType<typeof addVehicleSchema>;
export const addVehicleSchema = yup.object().shape({
  vehicleType: yup.string().required('Please select vehicle'),
  driverName: yup
    .string()
    .min(3, 'name must be at least 3 characters')
    .required('Driver name is required'),
  vehicleRegistrationNumber: yup
    .string()
    .min(5, 'registration number must be at leact 5 characters')
    .required('registration number is required'),
  driverPhoneNumber: yup
    .string()
    .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'Niepoprawny format numeru telefonu')
    .required('Phone number is required'),
});
