import { FilterCard } from './FilterCard';
import { PlacesAutocompleteInput } from '../../../../common/Inputs/PlacesAutocompleteInput';
import styles from './LocationFilter.module.scss';
import { SelectInput } from '../../../../common/Inputs/Select';
import { FieldValues, Control, UseFormSetValue, PathValue, Path } from 'react-hook-form';

type LocationFilterProps<T extends FieldValues> = {
  control: Control<T>;
  setValue: UseFormSetValue<T>;
};

export const LocationFilter = <T extends FieldValues>({
  setValue,
  control,
}: LocationFilterProps<T>) => {
  const selectKilometers = [
    5, 10, 25, 50, 75, 100, 125, 150, 300, 400, 500, 600, 700, 800, 900, 1000, 3000, 5000,
  ];

  return (
    <FilterCard filterName={'Location'}>
      <div className={styles['address-inputs']}>
        <label htmlFor='loadingAddress'>Loading</label>

        <PlacesAutocompleteInput
          name={'loadingAddress' as Path<T>}
          setValue={setValue}
          control={control}
          setValueKey={'loadingAddressData' as Path<T>}
          sx={{
            width: '200px',
            padding: '0.5rem',
            fontSize: '0.7rem',
            height: '15px',
          }}
          errorLabel='Loading address'
        />
        {/* {errors.loadingAddress && <p role='alert'>{errors.loadingAddress?.message}</p>} */}

        <SelectInput
          name={'loadingArea' as Path<T>}
          label='+KM'
          control={control}
          defaultValue={5 as PathValue<T, Path<T>>}
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
          setValueKey={'unloadingAddressData' as Path<T>}
          name={'unloadingAddress' as Path<T>}
          sx={{
            width: '200px',
            padding: '0.5rem',
            fontSize: '0.7rem',
            height: '15px',
            outlineColor: '#1976d2',
          }}
          filterType='country'
          placeholder='Search country of unloading'
          errorLabel='Unloading address'
        />
      </div>
    </FilterCard>
  );
};
