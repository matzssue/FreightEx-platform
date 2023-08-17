import { FilterDetails } from '../modules/Loads/components/Filters/ActiveFilters/FiltersDetails';
import { FiltersMenu } from '../modules/Loads/components/Filters/LoadFilters/FiltersMenu/FiltersMenu';
import { ActiveFilters } from '../modules/Loads/components/Filters/ActiveFilters/ActiveFilters';
import { Loads } from '../modules/Loads/components/Load/LoadsList/LoadsList';

import { PageLayout } from '../common/PageLayout/PageLayout';
import { ProtectedWrapper } from '../common/ProtectedWrapper/ProtectedWrapper';

export const Home = () => {
  return (
    <ProtectedWrapper>
      <PageLayout>
        <FiltersMenu />
        <FilterDetails />
        <ActiveFilters />
        <Loads />
      </PageLayout>
    </ProtectedWrapper>
  );
};
