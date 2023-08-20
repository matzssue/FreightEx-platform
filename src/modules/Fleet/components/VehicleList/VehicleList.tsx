import styles from './VehicleList.module.scss';
import { AddVehicleCard } from '../AddVehicle/AddVehicleCard/AddVehicleCard';
import { VehicleCard } from '../VehicleCard/VehicleCard/VehicleCard';
import { getUserVehicles } from 'src/utils/api/supabase/Vehicles/getUserVehicles';
import { useUserContext } from 'src/store/contexts/UserContext';
import { useQuery } from '@tanstack/react-query';
import { LoadingSpinner } from 'src/common/LoadingSpinner/LoadingSpinner';
import { useSearch } from '../../hooks/useSearch';
import { SearchVehicle } from '../SearchVehicle/SearchVehicle';
import { ChangeEvent } from 'react';

export const VehicleList = () => {
  const { userId } = useUserContext();
  if (!userId) return;

  const { data: allVehicles, isLoading } = useQuery(
    ['fleet'],
    async () => await getUserVehicles(userId),
  );

  const { searchValue, filteredData, setSearchValue } = useSearch(allVehicles ? allVehicles : []);

  const searchVehicleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLButtonElement;
    if (target) setSearchValue(target.value);
  };

  const vehicleList = filteredData ? filteredData : allVehicles;
  return (
    <div className={styles['fleet-container']}>
      <SearchVehicle value={searchValue} onChange={(e) => searchVehicleHandler(e)} />
      <div className={styles['cards-container']}>
        <AddVehicleCard />
        {isLoading && <LoadingSpinner />}
        {vehicleList?.map((vehicles) => {
          return <VehicleCard key={vehicles.vehicleRegistrationNumber} {...vehicles} />;
        })}
        {vehicleList && vehicleList?.length <= 0 && (
          <p className={styles['no-results']}>
            No results, please add vehicle or remove search filter
          </p>
        )}
      </div>
    </div>
  );
};
