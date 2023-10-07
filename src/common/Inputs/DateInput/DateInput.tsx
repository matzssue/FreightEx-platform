import { Controller, FieldValues, PathValue, Path } from 'react-hook-form';
import styles from './DateInput.module.scss';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { ChangeEvent } from 'react';
import { BaseInputProps } from '../types';
import { SxProps } from '@mui/material';

type DateInputProps<T extends FieldValues> = {
  size?: 'small' | 'medium';
  fontSize?: string;
  sx?: SxProps;
  props?: DatePickerProps<any>;
} & BaseInputProps<T>;

export const DateInput = <T extends FieldValues>({
  control,
  name,
  size = 'medium',
  fontSize = '18px',
  sx,
  props,
}: DateInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null as PathValue<T, Path<T>> | undefined}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className={styles.container}>
            <DatePicker
              onChange={(date) => {
                onChange(date as PathValue<T, Path<T>> | ChangeEvent<Element>);
              }}
              sx={{
                '& .MuiOutlinedInput-input': {
                  fontSize: fontSize,
                  borderWidth: '15px',
                  fontFamily: `'Nunito', sans-serif`,
                },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderWidth: '3px',
                  },
                },
                '.css-1wc848c-MuiFormHelperText-root': {
                  fontFamily: 'Nunito, sans-serif',
                },
                '.css-k4qjio-MuiFormHelperText-root.Mui-error': {
                  fontSize: '0.7rem',
                  fontFamily: `'Nunito', sans-serif`,
                },
                backgroundColor: 'transparent',

                ...sx,
              }}
              className={styles.input}
              value={value}
              slotProps={{
                textField: {
                  size: size,
                  variant: 'outlined',
                  error: !!error,
                  helperText: error?.message,
                  id: `${name}`,
                },
              }}
              {...props}
            />
          </div>
        </LocalizationProvider>
      )}
    />
  );
};
