import { FilterDetails } from '../modules/Loads/ActiveFilters/components/FiltersDetails';
import { FiltersMenu } from '../modules/Loads/LoadFilters/components/FiltersMenu';
import { ActiveFilters } from '../modules/Loads/ActiveFilters/components/ActiveFilters';
import { Loads } from '../modules/Loads/LoadsList/components/Loads/Loads';

import { PageLayout } from '../common/PageLayout';
import { ProtectedWrapper } from '../common/ProtectedWrapper';

export const Home = () => {
  return (
    <>
      <ProtectedWrapper>
        <PageLayout>
          <FiltersMenu />
          <FilterDetails />
          <ActiveFilters />
          <Loads />
        </PageLayout>
      </ProtectedWrapper>

      {/* <LoadDetails /> */}
    </>
  );
};
