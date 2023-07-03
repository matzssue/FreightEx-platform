import { ChangeEvent, useCallback, useState } from 'react';
import { Control, Controller, FieldValues, Path, PathValue } from 'react-hook-form';
import PlacesAutocomplete, { getLatLng } from 'react-places-autocomplete';
import { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete';
import { IoLocationSharp } from 'react-icons/io5';
import styles from './PlacesInput.module.scss';
import { Addresses } from '../../utils/api/supabase/load';

type PlacesInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  setAddress: (adress: Addresses) => void;
};

export const PlacesInput = <T extends FieldValues>({
  control,
  name,
  label,
  setAddress,
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
          debounce={700}
          searchOptions={{ types: ['postal_code'] }}
          value={field.value}
          onChange={(value) => field.onChange(value as PathValue<T, Path<T>> | ChangeEvent)}
          onSelect={async (value, placeId) => {
            // const response = await geocodeByAddress(value);

            const [place] = await geocodeByPlaceId(placeId);
            const cordinates = await getLatLng(place);

            console.log('response, placeID', place);
            const { long_name: postalCode = '' } =
              place.address_components.find((c) => c.types.includes('postal_code')) || {};
            const { long_name: town = '' } =
              place.address_components.find((c) => c.types.includes('locality')) || {};
            const { long_name: country = '' } =
              place.address_components.find((c) => c.types.includes('country')) || {};
            const address = {
              postal_code: postalCode,
              country: country,
              latitude: cordinates.lat,
              longitude: cordinates.lng,
              city: town,
            };

            setAddress(address);

            return field.onChange(value as PathValue<T, Path<T>> | ChangeEvent);
          }}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
            // console.log(suggestions, getSuggestionItemProps, getInputProps);
            // const filtered = suggestions.filter((suggestion) =>
            //   suggestion.types.includes('postal_code'),
            // );

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

                  {suggestions.map((suggestion, i) => {
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
