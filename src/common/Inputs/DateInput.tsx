import { Controller, useForm } from 'react-hook-form';
import styles from './DateInput.module.scss';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useState } from 'react';

export const DateInput = ({ control, name, label = '' }) => {
  const currentDate = dayjs(new Date());
  // console.log(currentDate);
  const [date, setDate] = useState(currentDate);
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={currentDate}
      render={({ field, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className={styles.container}>
            {/* <label>Date</label> */}
            <DatePicker
              {...field}
              onChange={(date) => setDate(date)}
              className={styles.input}
              value={date}
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
