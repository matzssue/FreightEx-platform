import { Controller, FieldValues, Path, PathValue } from 'react-hook-form';
import { Checkbox, FormControlLabel, SxProps } from '@mui/material';

import { BaseInputProps } from '../types';

type CheckboxInputProps<T extends FieldValues> = {
  defaultValue?: boolean | undefined;
  sx?: SxProps;
} & BaseInputProps<T>;

const CheckboxInput = <T extends FieldValues>({
  name,
  label,
  control,
  defaultValue = false,
}: CheckboxInputProps<T>) => (
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
export default CheckboxInput;
