import styles from './OrdersOptions.module.scss';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

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
            <input ref={ref} name='searchOrder' id='search-order' type='search' />
            <button className={styles.search} type='submit'>
              Search
            </button>
          </form>
          <FormControl className={styles.select}>
            <label>Select type of orders</label>
            <Select
              sx={{
                height: '50px',
              }}
              onChange={selectOrdersHandler}
              defaultValue={currentUrl}
            >
              <MenuItem value={'/orders/published'}>Published</MenuItem>
              <MenuItem value={'/orders/published/accepted'}>Accepted</MenuItem>
            </Select>
          </FormControl>
        </div>
      </>
    );
  },
);
