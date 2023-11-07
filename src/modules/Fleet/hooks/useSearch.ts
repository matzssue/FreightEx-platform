import { useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { VehicleValuesSchema } from 'src/utils/schemas/addVehicleSchema';

interface SearchResults {
  filteredData: VehicleValuesSchema[];
  searchValue: string; // Zmieniony typ na VehicleValuesSchema[]
  setSearchValue: Dispatch<SetStateAction<string>>;
}

export const useSearch = (initialData: VehicleValuesSchema[] | []): SearchResults => {
  const [searchValue, setSearchValue] = useState<string | ''>('');
  const [filteredData, setFilteredData] = useState<VehicleValuesSchema[] | []>(initialData);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      const filter = initialData.filter((element) =>
        element.vehicleRegistrationNumber
          ?.trim()
          .toLocaleLowerCase()
          .replace(/\s/g, '')
          .includes(searchValue.toLocaleLowerCase().replace(/\s/g, '')),
      );
      setFilteredData(filter);
    }, 1000);
    return () => clearTimeout(delaySearch);
  }, [searchValue, initialData]);

  return { searchValue, filteredData, setSearchValue };
};
