import { AiOutlineClose } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { getLoadDetails } from '../../../utils/api/supabase/getLoadDetails';
import { useQuery } from '@tanstack/react-query';

import styles from './LoadDetails.module.scss';
import { LoadMap } from './LoadMap';
import { LoadAddress } from '../LoadsList/components/Loads/LoadAddress';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export const LoadDetails = () => {
  const { loadId, filterId } = useParams();

  if (!loadId) return;
  const { data: loadDetails, isLoading } = useQuery(
    ['loads', loadId],
    async () => await getLoadDetails(loadId),
  );

  const [distance, setDistance] = useState<string | undefined>(undefined);
  const [duration, setDuration] = useState<string | undefined>(undefined);

  if (!loadDetails) return;
  if (isLoading) return <div>Loading...</div>;
  const { loadingAddress, unloadingAddress, price, term, currency } = loadDetails;

  const closeLink = filterId ? `/loads/filters/${filterId}` : '/loads';
  return (
    <div className={styles.container}>
      <NavLink className={styles['close-button']} to={closeLink}>
        <AiOutlineClose />
      </NavLink>
      <div className={styles['load-details']}>
        <div className={styles['details-container']}>
          <LoadAddress
            country={loadingAddress.country}
            postCode={loadingAddress.postal_code}
            city={loadingAddress.city}
          />
        </div>
        <div className={styles['details-container']}>
          <LoadAddress
            country={unloadingAddress.country}
            postCode={unloadingAddress.postal_code}
            city={unloadingAddress.city}
          />
        </div>
        <div className={`${styles['details-container']} ${styles.route}`}>
          <span>Distance: {distance}</span>
          <span>Time: {duration}</span>
        </div>
        <div className={`${styles['details-container']} ${styles.payment}`}>
          <span>
            Price: {price} {currency}
          </span>
          <span>Payment term: {term} days</span>
        </div>
        <button className={styles['accept-button']}>Accept Offer</button>
      </div>
      <LoadMap setDistance={setDistance} setDuration={setDuration} address={loadDetails} />
    </div>
  );
};
