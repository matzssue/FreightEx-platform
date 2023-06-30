import styles from './Load.module.scss';
import Avatar from '@mui/material/Avatar';
export const Load = ({
  loadingCity,
  loadingPostCode,
  unloadingCity,
  unloadingPostCode,
  price,
  currency,
  paymentTerm,
  loadingDate,
  unloadingDate,
  cargoLength,
  cargoWeight,
}) => {
  return (
    <div className={styles.load}>
      <span>
        <p className={styles.city}>{loadingCity}</p>
        <p className={styles['post-code']}>{loadingPostCode}</p>
      </span>
      <span>
        <p className={styles.city}>{unloadingCity}</p>
        <p className={styles['post-code']}>{unloadingPostCode}</p>
      </span>
      <span>
        <p className={styles.salary}>{`${price} ${currency}`}</p>
        <p className={styles.term}>payment term: {paymentTerm}d</p>
      </span>
      <span className={styles.cargo}>
        <span>Length: {cargoLength}ldm</span>
        <span>Weight: {cargoWeight}t</span>
        <p>Type: pallets</p>
      </span>
      <p className={styles.date}>{loadingDate}</p>
      <p className={styles.date}>{unloadingDate}</p>
      <span className={styles.company}>
        <p className={styles.name}>Firma Lubuska S.A</p>
        <div>
          <p className={styles.publisher}>Mateusz Kluska</p>
          <p className={styles.time}>Published: 13.06.2023 16:52 </p>
        </div>
        <div className={styles.avatar}>
          <Avatar
            alt={`Mateusz photo`}
            src='https://images.unsplash.com/photo-1661869535393-872dea2d9f8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80'
            sx={{ width: 45, height: 45 }}
          />
        </div>
      </span>
      <button className={styles['accept-button']}>Accept Order</button>
    </div>
  );
};
