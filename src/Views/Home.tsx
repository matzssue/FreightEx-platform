import { FilterDetails } from '../modules/Loads/ActiveFilters/components/FiltersDetails';
import { FiltersMenu } from '../modules/Loads/LoadFilters/components/FiltersMenu';
import { ActiveFilters } from '../modules/Loads/ActiveFilters/components/ActiveFilters';
import { Loads } from '../modules/Loads/Loads/components/Loads/Loads';
import { AllNews } from '../modules/News/NewsCard/components/AllNews';
import { AddLoad } from '../modules/Loads/Loads/components/AddLoad/AddLoad';
import { LoadDetails } from '../modules/Loads/Loads/components/LoadDetails/LoadDetails';

export const Home = () => {
  return (
    <>
      <FiltersMenu />
      <FilterDetails />
      <ActiveFilters />
      <Loads />
      <LoadDetails />
    </>
  );
};
