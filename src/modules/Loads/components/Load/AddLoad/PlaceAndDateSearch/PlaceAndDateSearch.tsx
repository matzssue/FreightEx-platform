import { UseFormSetValue } from 'react-hook-form';
import dayjs from 'dayjs';

import { DateInput } from '../../../../../../common/Inputs/DateInput/DateInput';
import { PlacesAutocompleteInput } from '../../../../../../common/Inputs/PlacesAutocompeteInput/PlacesAutocompleteInput';
import { Title } from '../../../../../../common/Title/Title';
import { AddLoadValues } from '../../../../../../utils/schemas/addLoadSchema';
import { ControllerProps } from '../../types';

import styles from './PlaceAndDateSearch.module.scss';
const today = dayjs();
const maxDate = today.add(2, 'year');
export const PlaceAndDateSearch = ({
  control,
  setValue,
}: ControllerProps<AddLoadValues> & { setValue: UseFormSetValue<AddLoadValues> }) => (
  <>
    <div className={styles['loading-inputs']}>
      <Title title={'Loading'} />
      <DateInput<AddLoadValues>
        props={{ minDate: today, maxDate }}
        label={'Date'}
        control={control}
        name={'loadingDate'}
      />
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
      <DateInput<AddLoadValues>
        props={{ minDate: today, maxDate }}
        label={'Date'}
        control={control}
        name={'unloadingDate'}
      />
      <PlacesAutocompleteInput<AddLoadValues>
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
