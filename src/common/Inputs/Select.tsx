import { Control, Controller, FieldValues, Path, PathValue } from 'react-hook-form';
import { MenuItem, SxProps } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { FormHelperText, FormControl, Select, InputLabel } from '@mui/material';
import { useState } from 'react';
import styles from './Select.module.scss';
import { DeepPartial } from 'react-hook-form';
type SelectInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  options: string[] | number[];
  defaultValue: PathValue<T, Path<T>> | undefined;
  variant?: 'standard' | 'outlined' | 'filled';
  sx?: SxProps;
};

export const SelectInput = <T extends FieldValues>({
  name,
  label,
  control,
  options,
  defaultValue,
  variant,
  sx,
}: SelectInputProps<T>) => {
  return (
    <Controller
      name={name}
      // defaultValue={defaultValue}
      defaultValue={defaultValue}
      control={control}
      render={({ field: { onBlur, onChange, value } }) => (
        <FormControl style={{ flexDirection: 'row', gap: '5px' }}>
          {label && (
            <label className={styles.label} htmlFor={name}>
              {label}
            </label>
          )}
          <Select
            labelId={`select-${name}`}
            variant={variant}
            size='small'
            className={styles.select}
            // onChange={(e) => setCurrency(e.target.value)}
            onChange={onChange as PathValue<T, Path<T>>}
            value={value}
            onBlur={onBlur}
            autoWidth={true}
            sx={sx}
            MenuProps={{ MenuListProps: { style: { maxHeight: '150px' } } }}
          >
            {options.map((option: string | number) => (
              <MenuItem sx={{ fontSize: '10px' }} key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};
