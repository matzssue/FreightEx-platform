import { AcceptedLoad } from 'src/utils/api/supabase/types';
import styles from './ReceivedOrderItem.module.scss';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { useQuery } from '@tanstack/react-query';
import { getUserVehicles } from 'src/utils/api/supabase/Vehicles/getUserVehicles';
import { useUserContext } from 'src/store/contexts/UserContext';
import { LiaFileInvoiceSolid } from 'react-icons/lia';
import { Autocomplete, TextField } from '@mui/material';
import { LoadingSpinner } from 'src/common/LoadingSpinner/LoadingSpinner';
export const ReceivedOrderItem = ({ order }: { order: AcceptedLoad }) => {
  const { userId } = useUserContext();

  const { data: allVehicles, isLoading } = useQuery(
    ['fleet'],
    async () => await getUserVehicles(userId),
    { enabled: !!userId },
  );
  if (isLoading) return <LoadingSpinner />;
  console.log(order);
  const selectVehicles = allVehicles?.map((vehicle) => {
    return vehicle.vehicleRegistrationNumber;
  });
  const selectVehicleHandler = () => {};

  return (
    <tr className={styles.order}>
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
          onChange={selectVehicleHandler}
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
