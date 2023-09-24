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

  const {
    data: allVehicles,
    isLoading,
    isError,
  } = useQuery(['fleet'], async () => await getUserVehicles(userId), { enabled: !!userId });
  const { searchValue, filteredData, setSearchValue } = useSearch(allVehicles ? allVehicles : []);

  const searchVehicleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLButtonElement;
    if (target) setSearchValue(target.value);
  };
  if (isLoading) return <LoadingSpinner />;

  if (isError) return <p id='fleet-container'>Sorry there was an error, please try again later</p>;

  const vehicleList = searchValue.length > 0 ? filteredData : allVehicles;
  const noResultsMessage =
    searchValue.length > 0 && filteredData.length === 0 ? 'No results found' : null;
  const noVehiclesMessage =
    allVehicles?.length === 0 ? 'No vehicles added, please add vehicle' : null;

  if (!userId) return;
  return (
    <div id='fleet-container' className={styles['fleet-container']}>
      <SearchVehicle value={searchValue} onChange={(e) => searchVehicleHandler(e)} />
      <div className={styles['cards-container']}>
        <AddVehicleCard />
        {noResultsMessage && (
          <p className={styles['no-results__information']}>{noResultsMessage}</p>
        )}
        {noVehiclesMessage && <p>{noVehiclesMessage}</p>}
        {vehicleList?.map((vehicles) => {
          return <VehicleCard key={vehicles.vehicleRegistrationNumber} {...vehicles} />;
        })}
      </div>
    </div>
  );
};
