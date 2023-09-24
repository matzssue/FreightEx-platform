import styles from './PaymentDetails.module.scss';

import { TextFieldInput } from '../../../../../../common/Inputs/TextField/TextFieldInput';
import { SelectInput } from '../../../../../../common/Inputs/Select/Select';

import { AddLoadValues } from '../../../../../../utils/schemas/addLoadSchema';
import { ControllerProps } from '../../types';
import { Title } from '../../../../../../common/Title/Title';

export const PaymentDetails = ({
  control,
  selectOptions,
}: ControllerProps<AddLoadValues> & { selectOptions: string[] }) => {
  return (
    <div className={styles['payment-inputs__container']}>
      <Title title={'Payment'} />
      <div className={styles['payment-inputs']}>
        <TextFieldInput<AddLoadValues>
          label={'term(days)'}
          name='term'
          control={control}
          defaultValue={null}
          sx={{ width: 'auto', maxWidth: '100px', helperText: { width: '300px' } }}
          variant='standard'
        />

        <div className={styles.payment}>
          <TextFieldInput<AddLoadValues>
            label={'price'}
            name='price'
            control={control}
            defaultValue={null}
            sx={{ width: 'auto', maxWidth: '100px' }}
            variant='standard'
          />
          <SelectInput<AddLoadValues>
            options={selectOptions}
            label={''}
            name={'currency'}
            control={control}
            defaultValue='EUR'
            variant='standard'
            sx={{ width: 'auto', maxWidth: '120px', fontSize: '10px', marginLeft: '9px' }}
          />
        </div>
      </div>
    </div>
  );
};
