import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Control } from 'react-hook-form';
import styles from './TextField.module.scss';
type FormInputProps = {
  name: string;
  control: Control;
  label: string | null;
};

export const TextFieldInput = ({ name, control, label }: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
        <div className={styles.container}>
          <label>{label}</label>
          <TextField
            helperText={error ? error.message : null}
            size='small'
            error={!!error}
            onChange={onChange}
            value={value}
            fullWidth
            label={null}
            variant='outlined'
            sx={{ width: 70 }}
            inputProps={{
              style: {
                height: '10px',
              },
            }}
          />
        </div>
      )}
    />
  );
};
