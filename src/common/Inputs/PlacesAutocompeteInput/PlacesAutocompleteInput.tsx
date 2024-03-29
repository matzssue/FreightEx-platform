import { ChangeEvent } from 'react';
import Autocomplete from 'react-google-autocomplete';
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from 'react-hook-form';
import { SxProps } from '@mui/material';
import { Properties } from 'csstype';

import { BaseInputProps } from '../types';

import styles from './PlacesAutocompleteInput.module.scss';

type PlacesInputProps<T extends FieldValues> = {
  errorLabel: string;
  filterType?: string;
  placeholder?: string;
  setValue: UseFormSetValue<T>;
  setValueKey: Path<T>;
  sx?: Properties<string | number, string & SxProps>;
} & BaseInputProps<T>;

export const PlacesAutocompleteInput = <T extends FieldValues>({
  control,
  name,
  setValue,
  sx,
  filterType = 'postal_code',
  placeholder = 'Please use postal code',
  label,
  setValueKey,
  errorLabel,
}: PlacesInputProps<T>) => {
  const handleChange = (
    value: React.FormEvent<HTMLInputElement>,
    field: ControllerRenderProps<T, Path<T>>,
  ) => {
    field.onChange(value as PathValue<T, Path<T>> | ChangeEvent);
  };

  const onSelectHandler = (
    value: google.maps.places.PlaceResult,
    field: ControllerRenderProps<T, Path<T>>,
  ) => {
    const lat = value.geometry?.location?.lat();
    const lng = value.geometry?.location?.lng();
    const { long_name: postalCode = '' } =
      value.address_components?.find((c) => c.types.includes('postal_code')) || {};
    const { long_name: town = '' } =
      value.address_components?.find((c) => c.types.includes('locality')) || {};
    const { long_name: country = '' } =
      value.address_components?.find((c) => c.types.includes('country')) || {};
    if (!lat || !lng) return;
    const address = {
      postal_code: postalCode,
      country: country,
      latitude: lat,
      longitude: lng,
      city: town ? town : null,
    };

    setValue(setValueKey, address as PathValue<T, Path<T>>);
    field.onChange(value.formatted_address as PathValue<T, Path<T>> | ChangeEvent);
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: `Please select ${name}` }}
      defaultValue={'' as PathValue<T, Path<T>> | undefined}
      render={({ field, formState: { errors } }) => (
        <>
          {label && <label htmlFor={name}>{label}</label>}
          <div className={styles.container}>
            <Autocomplete
              id={name}
              placeholder={placeholder}
              inputAutocompleteValue={field.value}
              apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
              onChange={(value) => handleChange(value, field)}
              style={{
                outlineColor: '#1976d2',
                borderRadius: '3px',
                border: '1px solid #b1b1b1',
                ...sx,
              }}
              onPlaceSelected={(value) => onSelectHandler(value, field)}
              options={{
                types: [filterType],
              }}
            />
            {errors[name] && <p className={styles.error}>{`${errorLabel} is required field`}</p>}
          </div>
        </>
      )}
    />
  );
};
