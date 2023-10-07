import TextField, { TextFieldVariants } from '@mui/material/TextField';

import styles from './TextField.module.scss';
import { HTMLInputTypeAttribute } from 'react';
import { FieldValues, Controller, Path, PathValue } from 'react-hook-form';
import { BaseInputProps } from '../types';
import { SxProps, InputProps } from '@mui/material';

type FormInputProps<T extends FieldValues> = {
  defaultValue: PathValue<T, Path<T>> | undefined;
  sx?: SxProps;
  variant?: TextFieldVariants;
  type?: HTMLInputTypeAttribute;
  size?: 'small' | 'medium';
  placeholder?: string;
  column?: boolean;
  disabled?: boolean;

  props?: InputProps;
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
}: FormInputProps<T>) => {
  return (
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
};
