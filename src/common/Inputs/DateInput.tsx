import { Control, Controller, useForm, FieldValues, PathValue, Path } from 'react-hook-form';
import styles from './DateInput.module.scss';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

type DateInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
};

export const DateInput = <T extends FieldValues>({ control, name, label }: DateInputProps<T>) => {
  const currentDate: Dayjs = dayjs(new Date());

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={currentDate as PathValue<T, Path<T>> | undefined}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className={styles.container}>
            {/* <label>Date</label> */}
            <DatePicker
              // {...field}
              onChange={(date) => {
                // setDate(date);
                onChange(date);
              }}
              className={styles.input}
              value={value}
              label={label}
              slotProps={{
                textField: {
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
