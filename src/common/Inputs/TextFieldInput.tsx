import TextField, { TextFieldProps, TextFieldVariants } from '@mui/material/TextField';

import styles from './TextField.module.scss';
import { HTMLInputTypeAttribute, InputHTMLAttributes, useState } from 'react';
import { FieldValues, Controller, Control, Path, PathValue } from 'react-hook-form';
import { InputBaseComponentProps, InputBaseProps, InputLabel } from '@mui/material';
type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string | null;
  defaultValue: PathValue<T, Path<T>> | undefined;
  sx?: Record<string, any>;
  variant?: TextFieldVariants;
  type?: HTMLInputTypeAttribute;
  size?: 'small' | 'medium';
  placeholder?: string;
  row?: boolean;
};

export const TextFieldInput = <T extends FieldValues>({
  name,
  control,
  label,
  defaultValue,
  sx,
  variant,
  type = 'text',
  size = 'small',
  placeholder,
  row = false,
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
            helperText={error ? error.message : null}
            size={size}
            error={touchedFields && !!error}
            InputLabelProps={{ shrink: false }}
            onChange={onChange}
            placeholder={placeholder}
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
