import { Control, Controller, FieldValues, Path, PathValue } from 'react-hook-form';
import { MenuItem } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { FormHelperText, FormControl, Select, InputLabel } from '@mui/material';
import { useState } from 'react';
import styles from './Select.module.scss';
import { DeepPartial } from 'react-hook-form';
type SelectInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  options: string[];
  defaultValue: PathValue<T, Path<T>> | undefined;
};

export const SelectInput = <T extends FieldValues>({
  name,
  label,
  control,
  options,
  defaultValue,
}: SelectInputProps<T>) => {
  return (
    <Controller
      name={name}
      // defaultValue={defaultValue}
      defaultValue={defaultValue}
      control={control}
      render={({ field: { onBlur, onChange, value } }) => (
        <FormControl style={{ width: '10%', margin: '0px' }}>
          <InputLabel className={styles.label}>{label}</InputLabel>
          <Select
            variant='standard'
            size='small'
            className={styles.select}
            // onChange={(e) => setCurrency(e.target.value)}
            onChange={onChange}
            value={value}
            onBlur={onBlur}
            autoWidth={true}
            sx={{ width: 70, fontSize: '10px', border: 0, margin: 0 }}

            // MenuProps={{ anchorOrigin: { vertical: 'bottom', horizontal: 'center' } }}
          >
            {options.map((option: string) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};
