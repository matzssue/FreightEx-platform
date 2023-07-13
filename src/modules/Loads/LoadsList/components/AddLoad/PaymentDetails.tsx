import styles from './PaymentDetails.module.scss';

import { TextFieldInput } from '../../../../../common/Inputs/TextField';
import { SelectInput } from '../../../../../common/Inputs/Select';

import { AddLoadValues } from '../../../../../utils/schemas/addLoadSchema';
import { ControllerProps } from '../../types';
import { Title } from '../../../../../common/Title';

export const PaymentDetails = ({
  control,
  selectOptions,
}: ControllerProps<AddLoadValues> & { selectOptions: string[] }) => {
  return (
    <div className={styles['payment-inputs__container']}>
      <Title title={'Payment'} />
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
            variant='standard'
            sx={{ width: '50px', fontSize: '10px', marginLeft: '9px' }}
          />
        </div>
      </div>
    </div>
  );
};
