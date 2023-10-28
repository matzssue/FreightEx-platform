import { forwardRef } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import styles from './OrdersOptions.module.scss';

type OrdersOptionsProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const OrdersOptions = forwardRef<HTMLInputElement, OrdersOptionsProps>(
  ({ onSubmit }, ref) => {
    const navigate = useNavigate();

    const currentUrl = window.location.pathname;
    const selectOrdersHandler = (e: SelectChangeEvent) => {
      navigate(e.target.value);
    };

    return (
      <>
        <div className={styles.options}>
          <form onSubmit={onSubmit}>
            <label htmlFor='search-order' id='search-order-label'>
              Search order id
            </label>
            <div className={styles['search-input']}>
              <BsSearch />
              <input ref={ref} name='searchOrder' id='search-order' type='search' />
            </div>
            <button className={styles.search} type='submit'>
              Search
            </button>
          </form>
          <FormControl className={styles.select}>
            <label htmlFor='select-orders-type'>Select orders</label>
            <Select
              id='select-orders-input'
              sx={{
                height: 'auto',
                fontSize: '100%',
                '.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
                  padding: '13px 11px',
                },
              }}
              inputProps={{ id: 'select-orders-type' }}
              onChange={selectOrdersHandler}
              value={currentUrl}
            >
              <MenuItem sx={{ fontSize: '100%' }} value={'/orders/published'}>
                Published
              </MenuItem>
              <MenuItem sx={{ fontSize: '100%' }} value={'/orders/published/accepted'}>
                Accepted
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </>
    );
  },
);
