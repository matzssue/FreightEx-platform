import styles from './CargoDetails.module.scss';

import { TextFieldInput } from '../../../../../common/Inputs/TextField';

import { AddLoadValues } from '../../../../../utils/schemas/addLoadSchema';

export const CargoDetails = ({ control }) => {
  return (
    <div className={styles['cargo-dimensions']}>
      <p>Cargo </p>
      <div className={styles['dimensions-inputs__container']}>
        <TextFieldInput<AddLoadValues>
          label={'length(m)'}
          name='length'
          control={control}
          defaultValue={''}
          sx={{
            width: '40px',
            '& input': {
              padding: '5px',
              margin: '0px',
              fontSize: '15px',
            },
          }}
          type='number'
        />
        <TextFieldInput<AddLoadValues>
          label={'weight(t)'}
          name='weight'
          control={control}
          defaultValue={''}
          sx={{
            width: '40px',
            '& input': {
              padding: '5px',
              margin: '0px',
              fontSize: '15px',
            },
          }}
          type='number'
        />
      </div>
    </div>
  );
};
