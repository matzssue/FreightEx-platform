import { FilterCard } from '../FilterCard/FilterCard';
import { PlacesAutocompleteInput } from '../../../../../../common/Inputs/PlacesAutocompeteInput/PlacesAutocompleteInput';
import styles from './LocationFilter.module.scss';
import { SelectInput } from '../../../../../../common/Inputs/Select/Select';
import { FieldValues, Control, UseFormSetValue, PathValue, Path } from 'react-hook-form';
import { searchAreaInKM } from 'src/modules/Loads/constants/searchAreaInKm';
import { Fieldset } from 'src/common/Fieldset/Fieldset';
import { FilterInput } from '../FilterInput/FilterInput';
type LocationFilterProps<T extends FieldValues> = {
  control: Control<T>;
  setValue: UseFormSetValue<T>;
};

export const LocationFilter = <T extends FieldValues>({
  setValue,
  control,
}: LocationFilterProps<T>) => {
  const commonProps = {
    sx: {
      // maxWidth: '250px',

      padding: '0.5rem',
      fontSize: '0.7rem',
      height: '15px',
      outlineColor: '#1976d2',
    },
  };

  return (
    <FilterCard filterName={'Location'}>
      <Fieldset>
        <FilterInput label={'Loading address'}>
          <PlacesAutocompleteInput
            {...commonProps}
            name={'loadingAddress' as Path<T>}
            setValue={setValue}
            control={control}
            setValueKey={'loadingAddressData' as Path<T>}
            errorLabel='Loading address'
          />
        </FilterInput>
        <div className={styles.select}>
          <FilterInput label={'+KM'}>
            <SelectInput
              name={'loadingArea' as Path<T>}
              control={control}
              defaultValue={5 as PathValue<T, Path<T>>}
              options={searchAreaInKM}
              variant='outlined'
              sx={{
                // maxWidth: '70px',
                width: '30%',
                fontSize: '11px',
                backgroundColor: 'white',
                height: 'min-content',
                boxShadow: '3px 3px 0px 0px rgba(148, 148, 148, 0.267)',
                '.css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
                  width: '15px',
                  color: 'gray',
                },
              }}
            />
          </FilterInput>
        </div>
      </Fieldset>

      {/* {errors.loadingAddress && <p role='alert'>{errors.loadingAddress?.message}</p>} */}

      <Fieldset>
        <FilterInput label={'Unloading address'}>
          <PlacesAutocompleteInput
            {...commonProps}
            name={'unloadingAddress' as Path<T>}
            control={control}
            setValue={setValue}
            setValueKey={'unloadingAddressData' as Path<T>}
            filterType='country'
            placeholder='Search country of unloading'
            errorLabel='Unloading address'
          />
        </FilterInput>
      </Fieldset>
    </FilterCard>
  );
};
