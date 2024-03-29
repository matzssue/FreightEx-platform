import { TextFieldInput } from '../../../../../../common/Inputs/TextField/TextFieldInput';
import { Title } from '../../../../../../common/Title/Title';
import { AddLoadValues } from '../../../../../../utils/schemas/addLoadSchema';
import { ControllerProps } from '../../types';

import styles from './CargoDetails.module.scss';

export const CargoDetails = ({ control }: ControllerProps<AddLoadValues>) => (
  <div className={styles['cargo-dimensions']}>
    <Title title={'Cargo'} />
    <div className={styles['dimensions-inputs__container']}>
      <TextFieldInput<AddLoadValues>
        label={'length(m)'}
        name='length'
        control={control}
        defaultValue={''}
        sx={{
          width: 'auto',
          maxWidth: '130px',
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
          width: 'auto',
          maxWidth: '130px',
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
