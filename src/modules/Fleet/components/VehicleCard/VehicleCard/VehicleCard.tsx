import styles from './VehicleCard.module.scss';
import { VehicleCardWrapper } from '../VehicleCardWrapper/VehicleCardWrapper';
import { selectVehicleImage } from '../../../utils/selectVehicleImage';

import { LinkButton } from 'src/common/Buttons/LinkButton/LinkButton';
import { Button } from 'src/common/Buttons/Button/Button';
import AlertDialog from 'src/common/Dialog/AlertDialog';
import { useState } from 'react';
import { useDeleteVehicle } from 'src/modules/Fleet/hooks/useDeleteVehicle';
import { FaUserLarge } from 'react-icons/fa6';
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
  const [isOpen, setIsOpen] = useState(false);
  const deleteVehicleMutation = useDeleteVehicle();

  const deleteVehicle = () => {
    deleteVehicleMutation.mutate(vehicleRegistrationNumber);
  };

  return (
    <>
      <AlertDialog
        title={'delete-vehicle'}
        label={'Are you sure you want to delete this vehicle?'}
        description={'delete-vehicle-description'}
        agreeHandler={() => deleteVehicle()}
        open={isOpen}
        close={() => setIsOpen(false)}
      >
        Deleting vehicle is pernamently
      </AlertDialog>
      <VehicleCardWrapper>
        <div className={styles['image-container']}>
          <img className={styles['truck-image']} src={selectVehicleImage(vehicleType)} />
        </div>
        <p className={styles['truck-type']}>{vehicleType}</p>
        <div className={styles['truck-informations']}>
          <h1>{vehicleRegistrationNumber}</h1>
          <p>
            <FaUserLarge /> {driverName}
          </p>
          <p>Phone Number: {driverPhoneNumber}</p>
        </div>

        <div className={styles.buttons}>
          <LinkButton link={`/fleet/edit/${vehicleRegistrationNumber}`} mode='next'>
            Edit
          </LinkButton>
          <Button onClick={() => setIsOpen(true)} type='button' mode='delete'>
            Delete
          </Button>
        </div>
      </VehicleCardWrapper>
    </>
  );
};
