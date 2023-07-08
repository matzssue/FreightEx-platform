import styles from './LoadDetails.module.scss';

import { DateInput } from '../../../../../common/Inputs/DateInput';
import { AddLoadValues } from '../../../../../utils/schemas/addLoadSchema';
import { PlacesAutocompleteInput } from '../../../../../common/Inputs/PlacesAutocompleteInput';

export const LoadDetails = ({ control, setValue }) => {
  return (
    <>
      <div className={styles['loading-inputs']}>
        <p className={styles.title}>Loading</p>
        <DateInput<AddLoadValues> label={'Date'} control={control} name={'loadingDate'} />
        {/* <PlacesInput<AddLoadValues>
          setAddress={setLoadingAddress}
          label={'Address'}
          control={control}
          name={'loadingAddress'}
        /> */}
        <PlacesAutocompleteInput<AddLoadValues>
          setValue={setValue}
          setValueKey='loadingAddressData'
          control={control}
          name='loadingAddress'
          label='Address'
          sx={{
            width: '100%',
            padding: '1rem',
            boxSizing: 'border-box',
            margin: '5px 0px',
            fontSize: '17px',
          }}
        />
      </div>
      <div className={styles['unloading-inputs']}>
        <p className={styles.title}>Unloading</p>
        <DateInput<AddLoadValues> label={'Date'} control={control} name={'unloadingDate'} />
        <PlacesAutocompleteInput
          setValue={setValue}
          control={control}
          setValueKey='unloadingAddressData'
          name='unloadingAddress'
          label='Address'
          sx={{
            width: '100%',
            padding: '1rem',
            boxSizing: 'border-box',
            margin: '5px 0px',
            fontSize: '17px',
          }}
        />
      </div>
    </>
  );
};
