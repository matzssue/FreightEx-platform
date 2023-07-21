import { FilterCard } from './FilterCard';
import { PlacesAutocompleteInput } from '../../../../common/Inputs/PlacesAutocompleteInput';
import styles from './LocationFilter.module.scss';
import { SelectInput } from '../../../../common/Inputs/Select';
export const LocationFilter = ({ setValue, control, register, errors }) => {
  const selectKilometers = [
    5, 10, 25, 50, 75, 100, 125, 150, 300, 400, 500, 600, 700, 800, 900, 1000, 3000, 5000,
  ];

  return (
    <FilterCard filterName={'Location'}>
      <div className={styles['address-inputs']}>
        <label htmlFor='loadingAddress'>Loading</label>

        <PlacesAutocompleteInput
          setValue={setValue}
          control={control}
          setValueKey='loadingAddressData'
          name='loadingAddress'
          sx={{
            width: '200px',
            padding: '0.5rem',
            fontSize: '0.7rem',
            height: '15px',
          }}
          errorLabel='Loading address'
        />
        {/* {errors.loadingAddress && <p role='alert'>{errors.loadingAddress?.message}</p>} */}

        {/* <input {...register('loadingArea')} defaultValue={5} min={5} max={500000} type='number' /> */}
        <SelectInput
          name='loadingArea'
          label='+KM'
          control={control}
          defaultValue={5}
          options={selectKilometers}
          variant='outlined'
          sx={{
            width: '60px',
            fontSize: '10px',
            backgroundColor: 'white',
            height: 'min-content',
          }}
        />
      </div>
      <div className={styles['address-inputs']}>
        <label htmlFor='unloadingAddress'>Unloading</label>
        <PlacesAutocompleteInput
          setValue={setValue}
          control={control}
          setValueKey='unloadingAddressData'
          name='unloadingAddress'
          sx={{ width: '200px', padding: '0.5rem', fontSize: '0.7rem', height: '15px' }}
          filterType='country'
          placeholder='Search country of unloading'
          errorLabel='Unloading address'
        />
      </div>
    </FilterCard>
  );
};
