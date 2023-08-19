// import { PageLayout } from 'src/common/PageLayout/PageLayout';
import { PageLayout } from 'src/common/PageLayout/PageLayout';
import { ProtectedWrapper } from 'src/common/ProtectedWrapper/ProtectedWrapper';
import { VehicleList } from 'src/modules/Fleet/components/VehicleList/VehicleList';

export const Vehicles = () => {
  return (
    <ProtectedWrapper>
      <PageLayout>
        <VehicleList />
      </PageLayout>
    </ProtectedWrapper>
  );
};
