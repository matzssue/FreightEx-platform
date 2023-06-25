import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Control } from 'react-hook-form';
import styles from './TextField.module.scss';
import { useState } from 'react';
type FormInputProps = {
  name: string;
  control: Control;
  label: string | null;
};

export const TextFieldInput = ({ name, control, label, ...props }: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={''}
      render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
        <div className={styles.container}>
          <label className={styles.label}>{label}</label>
          <TextField
            helperText={error ? error.message : null}
            size='small'
            error={!!error}
            onChange={onChange}
            value={value}
            label={null}
            variant='standard'
            {...props}
          />
        </div>
      )}
    />
  );
};
