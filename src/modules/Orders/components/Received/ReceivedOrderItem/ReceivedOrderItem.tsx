import { AcceptedLoad } from 'src/utils/api/supabase/types';
import styles from './ReceivedOrderItem.module.scss';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { useQuery } from '@tanstack/react-query';
import { getUserVehicles } from 'src/utils/api/supabase/Vehicles/getUserVehicles';
import { useUserContext } from 'src/store/contexts/UserContext';
import { LiaFileInvoiceSolid } from 'react-icons/lia';
import { Autocomplete, TextField } from '@mui/material';
import { LoadingSpinner } from 'src/common/LoadingSpinner/LoadingSpinner';
import { useUpdateAcceptedLoad } from '../../../hooks/useUpdateAcceptedLoad';
import { SyntheticEvent, useState } from 'react';
import { useNotificationContext } from 'src/store/contexts/NotficationContext';

export const ReceivedOrderItem = ({ order }: { order: AcceptedLoad }) => {
  const { userId } = useUserContext();
  const { notify } = useNotificationContext();
  const [lastVehicleChangeTime, setLastVehicleChangeTime] = useState<number | null>(null);
  const updateAcceptedLoadMutation = useUpdateAcceptedLoad();
  const { data: allVehicles, isLoading } = useQuery(
    ['fleet'],
    async () => await getUserVehicles(userId),
    { enabled: !!userId },
  );

  if (isLoading) return <LoadingSpinner />;

  const selectVehicles = allVehicles?.map((vehicle) => {
    return vehicle.vehicleRegistrationNumber;
  });

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
    <tr className={styles.order}>
      <td>{order.id}</td>
      <td className={styles['show-invoice__button']}>
        <button>
          <LiaFileInvoiceSolid />
        </button>
      </td>
      <td className={styles.route}>
        <span>
          {order.loadingAddress.country}, {order.loadingAddress.postal_code}{' '}
          {order.loadingAddress.city}
        </span>
        <HiOutlineArrowNarrowRight />
        <span>
          {order.unloadingAddress.country}, {order.unloadingAddress.postal_code}{' '}
          {order.unloadingAddress.city}
        </span>
      </td>
      <td>
        {order.price} {order.currency}
      </td>
      <td>
        {order.cargoLength}L {order.cargoWeight}T{' '}
        {Object.keys(order.vehicleTypes)
          .filter((key) => order.vehicleTypes[key])
          .join(', ')}
      </td>
      <td>
        {order.loadingDate} <HiOutlineArrowNarrowRight /> {order.unloadingDate}
      </td>
      <td className={styles.publisher}>
        {order.user.name} {order.user.surname}, {order.company.name}, VAT ID: {order.company.vat_id}
      </td>
      <td className={styles.buttons}>
        <Autocomplete
          disablePortal
          id='select-vehicle'
          value={order.vehicleId ? order.vehicleId : null}
          onChange={(_: SyntheticEvent<Element, Event>, value) =>
            selectVehicleHandler(_, value, order.id)
          }
          options={selectVehicles ? selectVehicles : []}
          size='small'
          sx={{ width: 200 }}
          renderInput={(params) => (
            <TextField {...params} variant='filled' label='Select vehicle' />
          )}
        />
      </td>
    </tr>
  );
};
