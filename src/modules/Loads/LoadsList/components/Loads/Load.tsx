import styles from './Load.module.scss';
import Avatar from '@mui/material/Avatar';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { LoadAddress } from './LoadAddress';
import { useUserContext } from '../../../../../store/contexts/UserContext';
import { Load as TLoad } from '../../../../../utils/api/supabase/types';

import { MouseEventHandler } from 'react';

type LoadProps = {
  data: TLoad;
  onAccept: MouseEventHandler<HTMLButtonElement>;
};

export const Load = ({ data, onAccept }: LoadProps) => {
  const { filterId } = useParams();
  const { userData } = useUserContext();
  const {
    cargoLength,
    cargoWeight,
    company,
    createdAt,
    currency,
    id,
    loadingAddress,
    loadingDate,
    unloadingAddress,
    unloadingDate,
    paymentTerm,
    price,
    user,
    vehicleTypes,
  } = data;
  // console.log(data);
  // console.log(userData);
  // console.log(data.createdAt);
  if (!userData) return;
  const navigateTo = filterId ? `/loads/filters/${filterId}/${id}` : `/loads/${id}`;
  const publishDate = new Date(createdAt).toDateString();
  // console.log(publishDate);
  return (
    <NavLink className={styles.navigation} to={navigateTo}>
      <div className={styles.load}>
        <LoadAddress
          country={loadingAddress.country}
          city={loadingAddress.city}
          postCode={loadingAddress.postal_code}
        />
        <LoadAddress
          country={unloadingAddress.country}
          city={unloadingAddress.city}
          postCode={unloadingAddress.postal_code}
        />
        <span>
          <p className={styles.salary}>{`${price} ${currency}`}</p>
          <p className={styles.term}>payment term: {paymentTerm}d</p>
        </span>
        <span className={styles.cargo}>
          <span>Length: {cargoLength}ldm</span>
          <span>Weight: {cargoWeight}t</span>
          <p className={styles.vehicles}>
            Vehicle:
            {Object.keys(vehicleTypes)
              .filter((key) => vehicleTypes[key])
              .join(', ')}
          </p>
        </span>
        <p className={styles.date}>{loadingDate}</p>
        <p className={styles.date}>{unloadingDate}</p>
        <span className={styles.company}>
          <p className={styles.name}>{company.name}</p>
          <div>
            <p className={styles.publisher}>
              {user.name} {user.surname}
            </p>
            <p className={styles.time}>Published: {publishDate} </p>
          </div>
          <div className={styles.avatar}>
            <Avatar
              alt={`Mateusz photo`}
              src='https://images.unsplash.com/photo-1661869535393-872dea2d9f8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80'
              sx={{ width: 40, height: 40 }}
            />
          </div>
        </span>
        {userData.id !== user.id ? (
          <button type='button' onClick={onAccept} className={styles['accept-button']}>
            Accept Order
          </button>
        ) : (
          ''
        )}
      </div>
    </NavLink>
  );
};
