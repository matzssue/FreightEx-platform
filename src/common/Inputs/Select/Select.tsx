import { Controller, FieldValues, Path, PathValue } from 'react-hook-form';
import { MenuItem, SxProps } from '@mui/material';
import { FormControl, Select } from '@mui/material';

import { BaseInputProps } from '../types';

import styles from './Select.module.scss';

type SelectInputProps<T extends FieldValues> = {
  defaultValue: PathValue<T, Path<T>> | undefined;
  direction?: 'column' | 'row';
  fontSize?: string;
  options: string[] | number[];
  sx?: SxProps;
  variant?: 'standard' | 'outlined' | 'filled';
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
}: SelectInputProps<T>) => (
  <Controller
    name={name}
    defaultValue={defaultValue}
    control={control}
    render={({ field: { onBlur, onChange, value } }) => (
      <FormControl style={{ flexDirection: direction }}>
        <Select
          id={`select-${name}`}
          variant={variant}
          size='small'
          label={label}
          className={styles.select}
          onChange={onChange as PathValue<T, Path<T>>}
          value={value}
          onBlur={onBlur}
          autoWidth={true}
          sx={sx}
          inputProps={{ id: name }}
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
