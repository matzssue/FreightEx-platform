import { FilterDetails } from '../modules/Loads/ActiveFilters/components/FiltersDetails';
import { FiltersMenu } from '../modules/Loads/LoadFilters/components/FiltersMenu';
import { ActiveFilters } from '../modules/Loads/ActiveFilters/components/ActiveFilters';
import { Loads } from '../modules/Loads/LoadsList/components/Loads/Loads';
import { AllNews } from '../modules/News/NewsCard/components/AllNews';

import { LoadDetails } from '../modules/Loads/LoadDetails/LoadDetails';
import { LayoutWrapper } from '../common/LayoutWrapper';

export const Home = () => {
  return (
    <>
      <LayoutWrapper>
        <FiltersMenu />
        <FilterDetails />
        <ActiveFilters />
        <Loads />
      </LayoutWrapper>

      {/* <LoadDetails /> */}
    </>
  );
};
