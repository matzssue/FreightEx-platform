import { useCallback, useState } from 'react';
import { Control, Controller, FieldValues, Path, PathValue } from 'react-hook-form';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete';
import { IoLocationSharp } from 'react-icons/io5';
import styles from './PlacesInput.module.scss';

type PlacesInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
};

export const PlacesInput = <T extends FieldValues>({
  control,
  name,
  label,
}: PlacesInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={'' as PathValue<T, Path<T>> | undefined}
      rules={{ required: `Please select ${name}. Use postal-code!!` }}
      render={({ field, fieldState }) => (
        <PlacesAutocomplete
          googleCallbackName={name}
          debounce={300}
          value={field.value}
          onChange={(value) => field.onChange(value)}
          onSelect={async (value, placeId) => {
            const response = await geocodeByAddress(value);
            const [place] = await geocodeByPlaceId(placeId);
            console.log('response, placeID', place);
            const { long_name: postalCode = '' } =
              place.address_components.find((c) => c.types.includes('postal_code')) || {};
            const { long_name: town = '' } =
              place.address_components.find((c) => c.types.includes('locality')) || {};
            const { long_name: country = '' } =
              place.address_components.find((c) => c.types.includes('country')) || {};
            const adress = { postalCode, town, country };
            console.log(adress);
            return field.onChange(value);
          }}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
            const filtered = suggestions.filter((suggestion) =>
              suggestion.types.includes('postal_code'),
            );

            return (
              <div className={styles.container}>
                <label htmlFor={name}>{label}</label>
                <input
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: styles['location-search-input'],
                  })}
                />
                {fieldState.error && <p className={styles.error}>{fieldState.error.message}</p>}
                <div className={styles['autocomplete-dropdown-container']}>
                  {loading && <div>Loading...</div>}

                  {filtered.map((suggestion, i) => {
                    const className = suggestion.active
                      ? styles['suggestion-item--active']
                      : styles['suggestion-item'];
                    // inline style for demonstration purpose
                    // const style = suggestion.active
                    //   ? { backgroundColor: 'yellow', cursor: 'pointer' }
                    //   : { backgroundColor: 'yellow', cursor: 'pointer' };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          // style,
                        })}
                        key={i}
                      >
                        <span>
                          <IoLocationSharp /> {suggestion.description}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }}
        </PlacesAutocomplete>
      )}
    />
  );
};
