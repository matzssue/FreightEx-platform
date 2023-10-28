import { useState } from 'react';
import { FaUserLarge } from 'react-icons/fa6';
import { Button } from 'src/common/Buttons/Button/Button';
import { LinkButton } from 'src/common/Buttons/LinkButton/LinkButton';
import AlertDialog from 'src/common/Dialog/AlertDialog';
import { useDeleteVehicle } from 'src/modules/Fleet/hooks/useDeleteVehicle';

import { selectVehicleImage } from '../../../utils/selectVehicleImage';
import { VehicleCardWrapper } from '../VehicleCardWrapper/VehicleCardWrapper';

import styles from './VehicleCard.module.scss';
type VehicleData = {
  driverName: string;
  driverPhoneNumber: string;
  vehicleRegistrationNumber: string;
  vehicleType: string;
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
          <img
            className={styles['truck-image']}
            alt='truck-image'
            src={selectVehicleImage(vehicleType)}
          />
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
