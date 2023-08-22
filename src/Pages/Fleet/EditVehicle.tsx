import { PageLayout } from 'src/common/PageLayout/PageLayout';
import { ProtectedWrapper } from 'src/common/ProtectedWrapper/ProtectedWrapper';
import { EditVehicleWrapper } from 'src/modules/Fleet/components/EditVehicle/EditVehicleWrapper';

export const EditVehicle = () => {
  return (
    <ProtectedWrapper>
      <PageLayout>
        <EditVehicleWrapper />
      </PageLayout>
    </ProtectedWrapper>
  );
};
