import styles from './AddVehicleForm.module.scss';
import { SelectInput } from 'src/common/Inputs/Select/Select';
import { vehicleTypes } from '../../../constants/vehicleTypes';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { TextFieldInput } from 'src/common/Inputs/TextField/TextFieldInput';
import { addVehicleSchema, VehicleValuesSchema } from 'src/utils/schemas/addVehicleSchema';
import { toast } from 'react-toastify';

import { useUserContext } from 'src/store/contexts/UserContext';
import { useAddCar } from 'src/modules/Fleet/hooks/useAddCar';

toast;
export const AddVehicleForm = () => {
  const { userId } = useUserContext();

  const { handleSubmit, control } = useForm({
    resolver: yupResolver<VehicleValuesSchema>(addVehicleSchema),
  });
  const addCarMutation = useAddCar();

  const onSubmit = async (data: VehicleValuesSchema) => {
    const upsertData = {
      vehicle_register_number: data.vehicleRegistrationNumber,
      vehicle_type: data.vehicleType,
      driver_phone_number: data.driverPhoneNumber,
      driver_name: data.driverName,
    };

    if (!userId) return;
    addCarMutation.mutateAsync({ vehicleData: upsertData, userId: userId });
  };
  return (
    <div className={styles['add-car-form__container']}>
      <h2>Add new car to fleet</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SelectInput
          control={control}
          defaultValue={''}
          name='vehicleType'
          label='Select vehicle'
          options={vehicleTypes}
        />
        <TextFieldInput
          defaultValue={''}
          label='Registration number'
          control={control}
          name='vehicleRegistrationNumber'
        />
        <TextFieldInput defaultValue={''} label='Driver name' control={control} name='driverName' />
        <TextFieldInput
          defaultValue={''}
          label='Driver phone number'
          control={control}
          name='driverPhoneNumber'
        />
        <div>
          <button>Back</button>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};
