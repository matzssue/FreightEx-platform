import { LoadDetails } from 'src/modules/Loads/components/Load/LoadDetails/LoadDetails';

import { PageLayout } from '../../common/PageLayout/PageLayout';
import { ProtectedWrapper } from '../../common/ProtectedWrapper/ProtectedWrapper';
import { ActiveFilters } from '../../modules/Loads/components/Filters/ActiveFilters/ActiveFilters';
import { FilterDetails } from '../../modules/Loads/components/Filters/ActiveFilters/FiltersDetails';
import { FiltersMenu } from '../../modules/Loads/components/Filters/LoadFilters/FiltersMenu/FiltersMenu';
import { Loads } from '../../modules/Loads/components/Load/LoadsList/LoadsList';

export const LoadDetailsPage = () => (
  <ProtectedWrapper>
    <PageLayout>
      <FiltersMenu />
      <FilterDetails />
      <ActiveFilters />
      <Loads />
      <LoadDetails />
    </PageLayout>
  </ProtectedWrapper>
);
