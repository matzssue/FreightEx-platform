import TextField, { TextFieldProps } from '@mui/material/TextField';

import styles from './TextField.module.scss';
import { useState } from 'react';
import { FieldValues, Controller, Control, Path, PathValue } from 'react-hook-form';
type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string | null;
  defaultValue: PathValue<T, Path<T>> | undefined;
  sx?: Record<string, any>;
};

export const TextFieldInput = <T extends FieldValues>({
  name,
  control,
  label,
  defaultValue,
  sx,
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
        <div className={styles.container}>
          <label className={styles.label}>{label}</label>
          <TextField
            helperText={error ? error.message : null}
            size='small'
            error={touchedFields && !!error}
            onChange={onChange}
            value={value}
            label={null}
            variant='standard'
            FormHelperTextProps={{
              className: styles.helperText,
            }}
            sx={sx}
          />
        </div>
      )}
    />
  );
};
