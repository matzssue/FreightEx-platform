import styles from './VehicleDetails.module.scss';
import CheckboxInput from '../../../../../common/Inputs/Checkbox';

import { AddLoadValues } from '../../../../../utils/schemas/addLoadSchema';

export const VehicleDetails = ({ errors, control }) => {
  return (
    <div className={styles['vehicle-inputs']}>
      <p>Vehicle type</p>
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
