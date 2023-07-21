import styles from './Load.module.scss';
import Avatar from '@mui/material/Avatar';
import { useParams } from 'react-router-dom';
import { noFilterTab } from '../../loadData';
import { NavLink } from 'react-router-dom';
import { LoadAddress } from './LoadAddress';

export type Vehicles = {
  [key: string]: boolean;
};

type Load = {
  loadingCity: string;
  loadingPostCode: string;
  loadingCountry: string;
  unloadingCity: string;
  unloadingPostCode: string;
  unloadingCountry: string;
  price: string;
  currency: string;
  paymentTerm: string;
  loadingDate: string;
  unloadingDate: string;
  cargoLength: number | null;
  cargoWeight: number | null;
  vehicles: Vehicles;
  loadId: number;
};

export const Load = ({
  loadingCity,
  loadingPostCode,
  loadingCountry,
  unloadingCity,
  unloadingPostCode,
  unloadingCountry,
  price,
  currency,
  paymentTerm,
  loadingDate,
  unloadingDate,
  cargoLength,
  cargoWeight,
  vehicles,
  loadId,
  companyName,
  publisher,
  publishedAt,
}: Load) => {
  const { filterId } = useParams();

  const navigateTo = filterId ? `/loads/filters/${filterId}/${loadId}` : `/loads/${loadId}`;
  const publishDate = new Date(publishedAt).toDateString();
  return (
    <NavLink className={styles.navigation} to={navigateTo}>
      <div className={styles.load}>
        <LoadAddress country={loadingCountry} city={loadingCity} postCode={loadingPostCode} />
        <LoadAddress country={unloadingCountry} city={unloadingCity} postCode={unloadingPostCode} />
        <span>
          <p className={styles.salary}>{`${price} ${currency}`}</p>
          <p className={styles.term}>payment term: {paymentTerm}d</p>
        </span>
        <span className={styles.cargo}>
          <span>Length: {cargoLength}ldm</span>
          <span>Weight: {cargoWeight}t</span>
          <p className={styles.vehicles}>
            Vehicle:
            {Object.keys(vehicles)
              .filter((key) => vehicles[key])
              .join(', ')}
          </p>
        </span>
        <p className={styles.date}>{loadingDate}</p>
        <p className={styles.date}>{unloadingDate}</p>
        <span className={styles.company}>
          <p className={styles.name}>{companyName}</p>
          <div>
            <p className={styles.publisher}>{publisher}</p>
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
        <button className={styles['accept-button']}>Accept Order</button>
      </div>
    </NavLink>
  );
};
