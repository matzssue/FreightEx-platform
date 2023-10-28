import { FieldErrors } from 'react-hook-form';

import CheckboxInput from '../../../../../../common/Inputs/Checbkox/Checkbox';
import { Title } from '../../../../../../common/Title/Title';
import { AddLoadValues } from '../../../../../../utils/schemas/addLoadSchema';
import { ControllerProps } from '../../types';

import styles from './VehicleDetails.module.scss';

export const VehicleDetails = ({
  errors,
  control,
}: ControllerProps<AddLoadValues> & { errors: FieldErrors<AddLoadValues> }) => (
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
