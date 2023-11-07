import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import { VehicleCardWrapper } from '../../VehicleCard/VehicleCardWrapper/VehicleCardWrapper';

import styles from './AddVehicleCard.module.scss';

export const AddVehicleCard = () => {
  const navigation = useNavigate();
  const addCarHandler = () => {
    navigation('add');
  };

  return (
    <button onClick={addCarHandler} className={styles['add-car_button']}>
      <VehicleCardWrapper>
        <div className={styles.icon}>
          <AiOutlinePlus />
        </div>
      </VehicleCardWrapper>
    </button>
  );
};
