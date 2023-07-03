import { FormControlLabel, Checkbox, InputLabel, Select } from '@mui/material';
import { Controller, Control, FieldValues, Path, PathValue } from 'react-hook-form';

type CheckboxInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string | null;
  defaultValue?: boolean | undefined;
  sx?: Record<string, any>;
};

const CheckboxInput = <T extends FieldValues>({
  name,
  label,
  control,
  defaultValue = false,
}: CheckboxInputProps<T>) => {
  return (
    <FormControlLabel
      label={label}
      labelPlacement='start'
      sx={{ '& .MuiFormControlLabel-label': { fontSize: 13 } }}
      control={
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue as PathValue<T, Path<T>>}
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
