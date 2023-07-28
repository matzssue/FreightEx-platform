import styles from './VehicleDetails.module.scss';
import CheckboxInput from '../../../../../common/Inputs/Checkbox';
import { FieldErrors } from 'react-hook-form';
import { AddLoadValues } from '../../../../../utils/schemas/addLoadSchema';
import { ControllerProps } from '../../types';
import { Title } from '../../../../../common/Title';

export const VehicleDetails = ({
  errors,
  control,
}: ControllerProps<AddLoadValues> & { errors: FieldErrors<AddLoadValues> }) => {
  return (
    <div className={styles['vehicle-inputs']}>
      <Title title={'Vehicle'} />
      <CheckboxInput<AddLoadValues> control={control} label={'solo'} name={'vehicles.solo'} />
      <CheckboxInput<AddLoadValues> control={control} label={'bus'} name={'vehicles.bus'} />
      <CheckboxInput<AddLoadValues>
        control={control}
        label={'with semi-trailer'}
        name={'vehicles.semi trailer'}
      />
      <CheckboxInput<AddLoadValues>
        control={control}
        label={'with double-trailer'}
        name={'vehicles.double trailer'}
      />
      {errors?.vehicles && <p className={styles.error}>{`${errors?.vehicles?.message}`}</p>}
    </div>
  );
};
