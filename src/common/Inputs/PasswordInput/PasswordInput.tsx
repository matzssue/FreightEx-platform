import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Controller, PathValue, FieldValues, Path, Control } from 'react-hook-form';
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  SxProps,
  FormHelperText,
} from '@mui/material';
import styles from './PasswordInput.module.scss';

type PasswordInputProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  control: Control<T>;
  size?: 'small' | 'medium';
  sx?: SxProps;
};

const PasswordInput = <T extends FieldValues>({
  control,
  name,
  sx,
  size = 'small',
  label,
}: PasswordInputProps<T>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={'' as PathValue<T, Path<T>> | undefined}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <FormControl variant='outlined'>
          <div className={styles.container}>
            <label htmlFor={name} className={styles.label}>
              {label}
            </label>
            <OutlinedInput
              error={Boolean(error) && Boolean(error)}
              id={name}
              value={value}
              size={size}
              sx={sx}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    edge='end'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              type={showPassword ? 'text' : 'password'}
              onBlur={onBlur}
              onChange={onChange}
            />
          </div>
          {error && (
            <FormHelperText
              sx={{
                p: {
                  fontFamily: '"Nunito", sans-serif',
                },
              }}
              className={styles.helperText}
              error
            >
              {error.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};
export default PasswordInput;
