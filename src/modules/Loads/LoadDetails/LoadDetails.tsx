import { AiOutlineClose } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { getLoadDetails } from '../../../utils/api/supabase/getLoadDetails';
import { useQuery } from '@tanstack/react-query';
import supabase from '../../../config/supabase';

import styles from './LoadDetails.module.scss';
import { LoadMap } from './LoadMap';
import { LoadAddress } from '../LoadsList/components/Loads/LoadAddress';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const LoadDetails = () => {
  const { loadId, filterId } = useParams();
  console.log(loadId);
  if (!loadId) return;

  const { data: loadDetails, isLoading } = useQuery(
    ['loads', loadId],
    async () => await getLoadDetails(loadId),
  );
  console.log(loadDetails);

  const [distance, setDistance] = useState<string | undefined>(undefined);
  const [duration, setDuration] = useState<string | undefined>(undefined);

  if (!loadDetails) return;
  const { loadingAddressData, unloadingAddressData, price, term, currency } = loadDetails[0];

  const closeLink = filterId ? `/loads/filters/${filterId}` : '/loads';
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className={styles.container}>
      <NavLink className={styles['close-button']} to={closeLink}>
        <AiOutlineClose />
      </NavLink>
      <div className={styles['load-details']}>
        <div className={styles['details-container']}>
          <LoadAddress
            country={loadingAddressData!.country}
            postCode={loadingAddressData!.postal_code}
            city={loadingAddressData!.city}
          />
        </div>
        <div className={styles['details-container']}>
          <LoadAddress
            country={unloadingAddressData!.country}
            postCode={unloadingAddressData!.postal_code}
            city={unloadingAddressData!.city}
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
      <LoadMap setDistance={setDistance} setDuration={setDuration} address={loadDetails[0]} />
    </div>
  );
};
