import TextField, { TextFieldVariants } from '@mui/material/TextField';

import styles from './TextField.module.scss';
import { HTMLInputTypeAttribute } from 'react';
import { FieldValues, Controller, Path, PathValue } from 'react-hook-form';
import { BaseInputProps } from '../types';
import { SxProps } from '@mui/material';

type FormInputProps<T extends FieldValues> = {
  defaultValue: PathValue<T, Path<T>> | undefined;
  sx?: SxProps;
  variant?: TextFieldVariants;
  type?: HTMLInputTypeAttribute;
  size?: 'small' | 'medium';
  placeholder?: string;
  row?: boolean;
  disabled?: boolean;
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
  row = false,
  disabled = false,
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
        <div className={`${styles.container} ${row ? styles.row : ''}`}>
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
            value={value}
            FormHelperTextProps={{
              className: styles.helperText,
            }}
            sx={{
              '& legend': { display: 'none' },
              '& fieldset': { top: 0 },
              display: 'flex',
              flexDirection: 'column',
            }}
            variant={variant}
            type={type}
          />
        </div>
      )}
    />
  );
};
