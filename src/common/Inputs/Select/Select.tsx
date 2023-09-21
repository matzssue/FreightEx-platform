import { Controller, FieldValues, Path, PathValue } from 'react-hook-form';
import { MenuItem, SxProps } from '@mui/material';

import { FormControl, Select, InputLabel } from '@mui/material';

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
          {/* <InputLabel id={`select-${name}-label`}>{label}</InputLabel> */}
          <Select
            id={`select-${name}`}
            // labelId={`select-${name}-label`}
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
};
