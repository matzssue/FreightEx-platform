import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
  ControllerRenderProps,
  UseFormSetValue,
} from 'react-hook-form';
import Autocomplete from 'react-google-autocomplete';
import styles from './PlacesAutocompleteInput.module.scss';
import { Properties } from 'csstype';
import { ChangeEvent, ReactNode } from 'react';
type PlacesInputProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  control: Control<T>;
  // setAddress: (adress: Addresses) => void;
  sx?: Properties<string | number, string & {}>;
  filterType?: string;
  placeholder?: string;
  setValue: UseFormSetValue<T>;
  setValueKey: Path<T>;
};

export const PlacesAutocompleteInput = <T extends FieldValues>({
  control,
  name,
  setValue,
  sx,
  filterType = 'postal_code',
  placeholder = 'Search location, use postal code',
  label,
  setValueKey,
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
    console.log(postalCode, town, country);
    if (!lat || !lng) return;
    const address = {
      postal_code: postalCode,
      country: country,
      latitude: lat,
      longitude: lng,
      city: town,
    };
    setValue(setValueKey, address as PathValue<T, Path<T>>);
    field.onChange(value.formatted_address as PathValue<T, Path<T>> | ChangeEvent);
    // field.onChange(address);
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
          <Autocomplete
            id={name}
            placeholder={placeholder}
            inputAutocompleteValue={field.value}
            apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
            onChange={(value) => handleChange(value, field)}
            style={sx}
            onPlaceSelected={(value) => onSelectHandler(value, field)}
            options={{
              types: [filterType],
            }}
          />
          {errors[name] && <p className={styles.error}>{errors[name]?.message as ReactNode}</p>}
        </>
      )}
    />
  );
};
