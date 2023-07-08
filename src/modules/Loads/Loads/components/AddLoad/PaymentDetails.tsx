import styles from './PaymentDetails.module.scss';

import { TextFieldInput } from '../../../../../common/Inputs/TextField';
import { SelectInput } from '../../../../../common/Inputs/Select';

import { AddLoadValues } from '../../../../../utils/schemas/addLoadSchema';

export const PaymentDetails = ({ control, selectOptions }) => {
  return (
    <div className={styles['payment-inputs__container']}>
      <p className={styles.title}>Payment</p>
      <div className={styles['payment-inputs']}>
        <TextFieldInput<AddLoadValues>
          label={'term'}
          name='term'
          control={control}
          defaultValue=''
          sx={{ width: '70px', helperText: { width: '300px' } }}
          variant='standard'
        />

        <div className={styles.payment}>
          <TextFieldInput<AddLoadValues>
            label={'price'}
            name='price'
            control={control}
            defaultValue=''
            sx={{ width: '70px' }}
            variant='standard'
          />
          <SelectInput<AddLoadValues>
            options={selectOptions}
            label={''}
            name={'currency'}
            control={control}
            defaultValue='EUR'
          />
        </div>
      </div>
    </div>
  );
};
