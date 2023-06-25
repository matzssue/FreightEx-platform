import { FormControlLabel, Checkbox, InputLabel, Select } from '@mui/material';
import { Controller } from 'react-hook-form';

const CheckboxInput = ({ name, label, control, defaultValue = false }) => {
  return (
    <FormControlLabel
      label={label}
      labelPlacement='start'
      sx={{ '& .MuiFormControlLabel-label': { fontSize: 13 } }}
      control={
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <Checkbox
              checked={field.value}
              onChange={field.onChange}
              sx={{
                '& .MuiSvgIcon-root': { fontSize: 15 },
              }}
            />
          )}
        />
      }
    />
  );
};
export default CheckboxInput;
