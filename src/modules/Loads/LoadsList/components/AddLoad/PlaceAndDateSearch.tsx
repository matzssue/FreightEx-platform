import styles from './PlaceAndDateSearch.module.scss';

import { DateInput } from '../../../../../common/Inputs/DateInput';
import { AddLoadValues } from '../../../../../utils/schemas/addLoadSchema';
import { PlacesAutocompleteInput } from '../../../../../common/Inputs/PlacesAutocompleteInput';
import { ControllerProps } from '../../types';
import { UseFormSetValue } from 'react-hook-form';
import { Title } from '../../../../../common/Title';
export const PlaceAndDateSearch = ({
  control,
  setValue,
}: ControllerProps<AddLoadValues> & { setValue: UseFormSetValue<AddLoadValues> }) => {
  return (
    <>
      <div className={styles['loading-inputs']}>
        <Title title={'Loading'} />
        <DateInput<AddLoadValues> label={'Date'} control={control} name={'loadingDate'} />
        <PlacesAutocompleteInput<AddLoadValues>
          setValue={setValue}
          setValueKey='loadingAddressData'
          control={control}
          name='loadingAddress'
          label='Address'
          errorLabel='Loading address'
          sx={{
            width: '100%',
            padding: '1rem',
            boxSizing: 'border-box',
            margin: '0px 0px 5px 0px',
            fontSize: '17px',
          }}
        />
      </div>
      <div className={styles['unloading-inputs']}>
        <Title title={'Unloading'} />
        <DateInput<AddLoadValues> label={'Date'} control={control} name={'unloadingDate'} />
        <PlacesAutocompleteInput
          setValue={setValue}
          control={control}
          setValueKey='unloadingAddressData'
          name='unloadingAddress'
          label='Address'
          errorLabel='Unloading address'
          sx={{
            width: '100%',
            padding: '1rem',
            boxSizing: 'border-box',
            margin: '0px 0px 5px 0px',
            fontSize: '17px',
          }}
        />
      </div>
    </>
  );
};
