import { Controller } from 'react-hook-form';
import { MenuItem } from '@mui/material';

import { FormHelperText, FormControl, Select, InputLabel } from '@mui/material';
import { useState } from 'react';
import styles from './Select.module.scss';
export const SelectInput = ({ name, label, control, options }) => {
  const [currency, setCurrency] = useState('EUR');

  return (
    <Controller
      name={name}
      // defaultValue={defaultValue}
      defaultValue={currency}
      control={control}
      render={({ field: { onBlur } }) => (
        <FormControl style={{ width: '10%', margin: '0px' }}>
          <InputLabel className={styles.label}>{label}</InputLabel>
          <Select
            variant='standard'
            size='small'
            className={styles.select}
            onChange={(e) => setCurrency(e.target.value)}
            value={currency}
            onBlur={onBlur}
            autoWidth={true}
            sx={{ width: 70, fontSize: '10px', border: 0, margin: 0 }}

            // MenuProps={{ anchorOrigin: { vertical: 'bottom', horizontal: 'center' } }}
          >
            {options.map((option: string) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};
