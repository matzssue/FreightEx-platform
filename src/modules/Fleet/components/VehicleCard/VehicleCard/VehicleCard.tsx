import styles from './VehicleCard.module.scss';
import { VehicleCardWrapper } from '../VehicleCardWrapper/VehicleCardWrapper';
import { selectVehicleImage } from '../../../utils/selectVehicleImage';

type VehicleData = {
  driverName: string;
  driverPhoneNumber: string;
  vehicleType: string;
  vehicleRegistrationNumber: string;
};

export const VehicleCard = ({
  driverName,
  driverPhoneNumber,
  vehicleType,
  vehicleRegistrationNumber,
}: VehicleData) => {
  return (
    <VehicleCardWrapper>
      <div className={styles['image-container']}>
        <img className={styles['truck-image']} src={selectVehicleImage(vehicleType)} />
      </div>
      <p className={styles['truck-type']}>{vehicleType}</p>
      <div className={styles['truck-informations']}>
        <h1>{vehicleRegistrationNumber}</h1>
        <p>Driver: {driverName}</p>
        <p>Phone Number: {driverPhoneNumber}</p>
      </div>

      <div className={styles.buttons}>
        <button>Edit</button>
        <button>Remove</button>
      </div>
    </VehicleCardWrapper>
  );
};
