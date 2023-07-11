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
      <CheckboxInput<AddLoadValues> control={control} label={'solo'} name={'multiCheckbox.solo'} />
      <CheckboxInput<AddLoadValues> control={control} label={'bus'} name={'multiCheckbox.bus'} />
      <CheckboxInput<AddLoadValues>
        control={control}
        label={'with semi-trailer'}
        name={'multiCheckbox.semiTrailer'}
      />
      <CheckboxInput<AddLoadValues>
        control={control}
        label={'with double-trailer'}
        name={'multiCheckbox.doubleTrailer'}
      />
      {errors?.multiCheckbox && (
        <p className={styles.error}>{`Error: ${errors?.multiCheckbox?.message}`}</p>
      )}
    </div>
  );
};
