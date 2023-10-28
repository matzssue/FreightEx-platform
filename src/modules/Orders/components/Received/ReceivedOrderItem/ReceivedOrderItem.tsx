import { SyntheticEvent, useState } from 'react';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { Autocomplete, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNotificationContext } from 'src/store/contexts/NotficationContext';
import { useUserContext } from 'src/store/contexts/UserContext';
import { AcceptedLoad } from 'src/utils/api/supabase/types';
import { getUserVehicles } from 'src/utils/api/supabase/Vehicles/getUserVehicles';

import { useUpdateAcceptedLoad } from '../../../hooks/useUpdateAcceptedLoad';

import styles from './ReceivedOrderItem.module.scss';

export const ReceivedOrderItem = ({ order }: { order: AcceptedLoad }) => {
  const { userId } = useUserContext();
  const { notify } = useNotificationContext();
  const [lastVehicleChangeTime, setLastVehicleChangeTime] = useState<number | null>(null);
  const updateAcceptedLoadMutation = useUpdateAcceptedLoad();
  const { data: allVehicles, error } = useQuery(
    ['fleet'],
    async () => await getUserVehicles(userId),
    { enabled: !!userId },
  );

  if (error) return <p>Sorry,there was an error. Please try again </p>;

  const selectVehicles = allVehicles?.map((vehicle) => vehicle.vehicleRegistrationNumber);

  const selectVehicleHandler = (
    _: SyntheticEvent,
    registerNumber: string | null,
    orderId: string,
  ) => {
    const currentTime = Date.now();

    if (lastVehicleChangeTime && currentTime - lastVehicleChangeTime < 2 * 60 * 1000) {
      notify('error', 'please wait 2 minutes before next change');
    } else {
      if (!registerNumber) return;
      updateAcceptedLoadMutation.mutate({ registerNumber, orderId });
    }
    setLastVehicleChangeTime(currentTime);
  };

  return (
    <li className={styles.order}>
      <span className={styles['order-id']}>{order.id}</span>

      <span className={styles['loading-address']}>
        {order.loadingAddress.country}, {order.loadingAddress.postal_code}{' '}
        {order.loadingAddress.city}
        <HiOutlineArrowNarrowRight />
      </span>
      <span className={styles['unloading-address']}>
        {order.unloadingAddress.country}, {order.unloadingAddress.postal_code}{' '}
        {order.unloadingAddress.city}
      </span>
      <span className={styles.payment}>
        {order.price} {order.currency}
      </span>
      <span className={styles.cargo}>
        {order.cargoLength}L {order.cargoWeight}T{' '}
        {Object.keys(order.vehicleTypes)
          .filter((key) => order.vehicleTypes[key])
          .join(', ')}
      </span>
      <span className={styles.date}>
        {order.loadingDate} <HiOutlineArrowNarrowRight /> {order.unloadingDate}
      </span>
      <span className={styles.publisher}>
        {order.user.name} {order.user.surname}, {order.company.name}, VAT ID: {order.company.vat_id}
      </span>
      <span className={styles['select-vehicle__button']}>
        <Autocomplete
          disablePortal
          id={`select-vehicle-${order.id}`}
          value={order.vehicleId ? order.vehicleId : null}
          onChange={(_: SyntheticEvent<Element, Event>, value) =>
            selectVehicleHandler(_, value, order.id)
          }
          options={selectVehicles ? selectVehicles : []}
          size='small'
          sx={{
            width: '100%',
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                sx: {
                  '@media only screen and (max-width: 1000px)': {
                    fontSize: '10px',
                    margin: '5px 0', // Dostosuj marginesy (góra i dół)
                    padding: '4px', // Dostosuj padding
                  },
                  '& .MuiAutocomplete-clearIndicator': {
                    '& svg': {
                      fontSize: '13px', // Dostosuj rozmiar ikony "X"
                      cursor: 'pointer', // Dodaj kursor wskaźnika, aby wskazywać na możliwość zamknięcia
                    },
                  },
                },
              }}
              variant='filled'
              label='Select vehicle'
            />
          )}
        />
      </span>
    </li>
  );
};
