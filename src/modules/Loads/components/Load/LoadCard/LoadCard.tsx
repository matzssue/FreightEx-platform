import { MouseEventHandler } from 'react';
import { FaMapMarked } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

import { avatarLink } from '../../../../../constants/avatarLink';
import { useUserContext } from '../../../../../store/contexts/UserContext';
import { Load as TLoad } from '../../../../../utils/api/supabase/types';

import { LoadAddress } from './LoadAddress';

import styles from './LoadCard.module.scss';

type LoadProps = {
  data: TLoad;
  onAccept: MouseEventHandler<HTMLButtonElement>;
  onDelete: MouseEventHandler<HTMLButtonElement>;
};

export const LoadCard = ({ data, onAccept, onDelete }: LoadProps) => {
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

  if (!userData) return;
  const navigateTo = filterId ? `/loads/filters/${filterId}/${id}` : `/loads/${id}`;
  const publishDate = new Date(createdAt).toDateString();

  return (
    <NavLink className={styles.navigation} to={navigateTo}>
      <div className={styles.load}>
        <span className={styles['map-icon']}>
          <FaMapMarked />
        </span>
        <span className={styles['loading-location']}>
          <LoadAddress
            country={loadingAddress.country}
            city={loadingAddress.city}
            postCode={loadingAddress.postal_code}
          />
        </span>
        <span className={styles['unloading-location']}>
          <LoadAddress
            country={unloadingAddress.country}
            city={unloadingAddress.city}
            postCode={unloadingAddress.postal_code}
          />
        </span>
        <span className={styles.payment}>
          <p className={styles.salary}>{`${price} ${currency}`}</p>
          <p className={styles.term}>payment term: {paymentTerm}d</p>
        </span>
        <span className={styles.cargo}>
          <span>Length: {cargoLength}ldm</span>
          <span>Weight: {cargoWeight}t</span>
          <p className={styles.vehicles}>
            Vehicle:{' '}
            {Object.keys(vehicleTypes)
              .filter((key) => vehicleTypes[key])
              .join(', ')}
          </p>
        </span>
        <p className={styles.date}>
          {loadingDate} {`->`}
        </p>
        <p className={styles.date}>{unloadingDate}</p>
        <span className={styles.company}>
          <p className={styles.name}>{company.name}</p>
          <div>
            <p className={styles.publisher}>
              {user.name} {user.surname}
            </p>
            <p className={styles.time}>Published: {publishDate}</p>
          </div>
          <div className={styles.avatar}>
            <Avatar
              alt={`Mateusz photo`}
              src={`${avatarLink}${user.avatar}`}
              sx={{ width: 40, height: 40 }}
            />
          </div>
        </span>
        {userData.id !== user.id ? (
          <button type='button' onClick={onAccept} className={styles['accept-button']}>
            Accept Order
          </button>
        ) : (
          <button type='button' onClick={onDelete} className={styles['delete-button']}>
            Delete
          </button>
        )}
      </div>
    </NavLink>
  );
};
