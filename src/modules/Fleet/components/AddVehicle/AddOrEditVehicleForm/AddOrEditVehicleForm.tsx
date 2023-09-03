import styles from './AddOrEditVehicleForm.module.scss';
import { SelectInput } from 'src/common/Inputs/Select/Select';
import { vehicleTypes } from '../../../constants/vehicleTypes';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextFieldInput } from 'src/common/Inputs/TextField/TextFieldInput';
import { addVehicleSchema, VehicleValuesSchema } from 'src/utils/schemas/addVehicleSchema';
import { useUserContext } from 'src/store/contexts/UserContext';
import { useAddVehicle } from 'src/modules/Fleet/hooks/useAddVehicle';
import { LinkButton } from 'src/common/Buttons/LinkButton/LinkButton';
import { Button } from 'src/common/Buttons/Button/Button';
import { useUpdateVehicleData } from 'src/modules/Fleet/hooks/useUpdateVehicleData';

type AddVehicleFormProps = {
  mode?: 'add' | 'edit';
  driverName?: string;
  driverPhoneNumber?: string;
  vehicleType?: string;
  vehicleRegistrationNumber?: string;
};

export const AddOrEditVehicleForm = ({
  driverName = '',
  driverPhoneNumber = '',
  vehicleRegistrationNumber = '',
  vehicleType = '',
  mode = 'add',
}: AddVehicleFormProps) => {
  const { userId } = useUserContext();

  const defaultValues =
    mode === 'add'
      ? {
          vehicleRegistrationNumber: '',
          vehicleType: 'solo',
          driverName: '',
          driverPhoneNumber: '',
        }
      : {
          vehicleRegistrationNumber: vehicleRegistrationNumber,
          vehicleType: vehicleType,
          driverName: driverName,
          driverPhoneNumber: driverPhoneNumber,
        };

  const { handleSubmit, control } = useForm({
    resolver: yupResolver<VehicleValuesSchema>(addVehicleSchema),
    defaultValues: defaultValues,
  });

  const addVehicleMutation = useAddVehicle();
  const updateVehicleMutation = useUpdateVehicleData();

  const onSubmit = async (data: VehicleValuesSchema) => {
    const upsertData = {
      vehicle_register_number: data.vehicleRegistrationNumber,
      vehicle_type: data.vehicleType,
      driver_phone_number: data.driverPhoneNumber,
      driver_name: data.driverName,
    };

    if (mode === 'add') {
      if (!userId) return;
      addVehicleMutation.mutate({ vehicleData: upsertData, userId: userId });
    }
    if (mode === 'edit') {
      updateVehicleMutation.mutate({
        vehicleData: upsertData,
        vehicleId: data.vehicleRegistrationNumber,
      });
    }
  };

  const formTitle = mode === 'add' ? <h2>Add new vehicle to fleet</h2> : <h2>Edit vehicle data</h2>;

  return (
    <div className={styles['add-car-form__container']}>
      {formTitle}
      <form onSubmit={handleSubmit(onSubmit)}>
        <SelectInput
          control={control}
          defaultValue={defaultValues.vehicleType}
          name='vehicleType'
          label='Select vehicle'
          options={vehicleTypes}
          sx={{ width: 'auto', fontSize: '15px' }}
          fontSize='100%'
          direction='row'
        />
        <TextFieldInput
          defaultValue={defaultValues.vehicleRegistrationNumber}
          label='Registration number'
          control={control}
          name='vehicleRegistrationNumber'
          disabled={mode === 'edit'}
        />
        <TextFieldInput
          defaultValue={defaultValues.driverName}
          label='Driver name'
          control={control}
          name='driverName'
        />
        <TextFieldInput
          defaultValue={defaultValues.driverPhoneNumber}
          label='Driver phone number'
          control={control}
          name='driverPhoneNumber'
        />
        <div className={styles.buttons}>
          <LinkButton mode='back' link='/fleet'>
            Back
          </LinkButton>
          <Button>Submit</Button>
        </div>
      </form>
    </div>
  );
};
