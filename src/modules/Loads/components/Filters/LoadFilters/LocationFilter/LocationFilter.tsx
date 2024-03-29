import { Control, FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form';
import { Fieldset } from 'src/common/Fieldset/Fieldset';
import { searchAreaInKM } from 'src/modules/Loads/constants/searchAreaInKm';

import { PlacesAutocompleteInput } from '../../../../../../common/Inputs/PlacesAutocompeteInput/PlacesAutocompleteInput';
import { SelectInput } from '../../../../../../common/Inputs/Select/Select';
import { FilterCard } from '../FilterCard/FilterCard';
import { FilterInput } from '../FilterInput/FilterInput';

import styles from './LocationFilter.module.scss';
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
      padding: '1rem',
      fontSize: '0.7rem',
      height: '15px',
      outlineColor: '#1976d2',
      width: '100%',
    },
  };

  return (
    <FilterCard filterName={'Location'}>
      <Fieldset>
        <FilterInput labelId='loadingAddress' label={'Loading address'}>
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
          <FilterInput labelId='loadingArea' label={'+KM'}>
            <SelectInput
              name={'loadingArea' as Path<T>}
              control={control}
              defaultValue={5 as PathValue<T, Path<T>>}
              options={searchAreaInKM}
              variant='outlined'
              sx={{
                minWidth: '30px',
                maxWidth: '100px',
                fontSize: '11px',
                backgroundColor: 'white',
                height: '1.8rem',
                boxShadow: '3px 3px 0px 0px rgba(148, 148, 148, 0.267)',
                '.css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
                  color: 'gray',
                },
              }}
            />
          </FilterInput>
        </div>
      </Fieldset>

      {/* {errors.loadingAddress && <p role='alert'>{errors.loadingAddress?.message}</p>} */}

      <Fieldset>
        <FilterInput labelId='unloadingAddress' label={'Unloading country'}>
          <PlacesAutocompleteInput
            {...commonProps}
            name={'unloadingAddress' as Path<T>}
            control={control}
            setValue={setValue}
            setValueKey={'unloadingAddressData' as Path<T>}
            filterType='country'
            placeholder='Search country'
            errorLabel='Unloading address'
          />
        </FilterInput>
      </Fieldset>
    </FilterCard>
  );
};
