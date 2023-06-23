import { useCallback, useState } from 'react';
import { Controller } from 'react-hook-form';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete';
import styles from './PlacesInput.module.scss';

export const PlacesInput = ({ control, name, label }) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=''
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
                {fieldState.error && <p>{fieldState.error.message}</p>}
                <div className='autocomplete-dropdown-container'>
                  {loading && <div>Loading...</div>}

                  {filtered.map((suggestion, i) => {
                    const className = suggestion.active
                      ? styles['suggestion-item--active']
                      : styles['suggestion-item'];
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                        key={i}
                      >
                        <span>{suggestion.description}</span>
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
