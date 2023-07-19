import { Control, Controller, useForm, FieldValues, PathValue, Path } from 'react-hook-form';
import styles from './DateInput.module.scss';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ChangeEvent } from 'react';

type DateInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  size?: 'small' | 'medium';
  fontSize?: string;
};

export const DateInput = <T extends FieldValues>({
  control,
  name,
  label,
  size = 'medium',
  fontSize = '18px',
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
                },
                '.css-1wc848c-MuiFormHelperText-root': {
                  fontFamily: 'Nunito, sans-serif',
                },
                backgroundColor: 'transparent',
              }}
              className={styles.input}
              value={value}
              slotProps={{
                textField: {
                  size: size,
                  variant: 'outlined',
                  error: !!error,
                  helperText: error?.message,
                },
              }}
            />
          </div>
        </LocalizationProvider>
      )}
    />
  );
};
