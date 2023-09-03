import { Controller, FieldValues, Path, PathValue } from 'react-hook-form';
import { MenuItem, SxProps } from '@mui/material';

import { FormControl, Select } from '@mui/material';

import styles from './Select.module.scss';
import { BaseInputProps } from '../types';

type SelectInputProps<T extends FieldValues> = {
  options: string[] | number[];
  defaultValue: PathValue<T, Path<T>> | undefined;
  variant?: 'standard' | 'outlined' | 'filled';
  sx?: SxProps;
  direction?: 'column' | 'row';
  fontSize?: string;
} & BaseInputProps<T>;

export const SelectInput = <T extends FieldValues>({
  name,
  label,
  control,
  options,
  defaultValue,
  variant,
  sx,
  direction = 'column',
  fontSize = '10px',
}: SelectInputProps<T>) => {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field: { onBlur, onChange, value } }) => (
        <FormControl style={{ flexDirection: direction }}>
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
            onChange={onChange as PathValue<T, Path<T>>}
            value={value}
            onBlur={onBlur}
            autoWidth={true}
            sx={sx}
            MenuProps={{ MenuListProps: { style: { maxHeight: '150px' } } }}
          >
            {options.map((option: string | number) => (
              <MenuItem
                className={styles['select-items']}
                sx={{ fontSize: fontSize }}
                key={option}
                value={option}
              >
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};
