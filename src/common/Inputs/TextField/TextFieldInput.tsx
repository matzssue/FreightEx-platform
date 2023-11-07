import { HTMLInputTypeAttribute } from 'react';
import { Controller, FieldValues, Path, PathValue } from 'react-hook-form';
import { InputProps, SxProps } from '@mui/material';
import TextField, { TextFieldVariants } from '@mui/material/TextField';

import { BaseInputProps } from '../types';

import styles from './TextField.module.scss';

type FormInputProps<T extends FieldValues> = {
  column?: boolean;
  defaultValue: PathValue<T, Path<T>> | undefined;
  disabled?: boolean;
  placeholder?: string;
  props?: InputProps;
  size?: 'small' | 'medium';
  sx?: SxProps;
  type?: HTMLInputTypeAttribute;

  variant?: TextFieldVariants;
} & BaseInputProps<T>;

export const TextFieldInput = <T extends FieldValues>({
  name,
  control,
  label,
  defaultValue,
  variant,
  type = 'text',
  size = 'small',
  placeholder,
  sx,
  column = false,
  disabled = false,
  props,
}: FormInputProps<T>) => (
  <Controller
    name={name}
    control={control}
    defaultValue={defaultValue}
    render={({
      field: { onChange, value },
      fieldState: { error },
      formState: { touchedFields },
    }) => (
      <div className={`${styles.container} ${column ? styles.column : ''}`}>
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>

        <TextField
          id={name}
          helperText={error ? error.message : null}
          size={size}
          error={touchedFields && !!error}
          InputLabelProps={{ shrink: false }}
          onChange={onChange}
          inputProps={{ 'aria-readonly': true }}
          placeholder={placeholder}
          disabled={disabled}
          value={value && value.trim()}
          FormHelperTextProps={{
            className: styles.helperText,
          }}
          sx={{
            '& legend': { display: 'none' },
            '& fieldset': { top: 0 },
            display: 'flex',
            flexDirection: 'column',
            '.css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input': {
              fontFamily: 'Nunito, sans-serif',
            },
            ...sx,
          }}
          variant={variant}
          type={type}
          InputProps={props}
        />
      </div>
    )}
  />
);
