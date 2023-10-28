import { PageLayout } from 'src/common/PageLayout/PageLayout';
import { ProtectedWrapper } from 'src/common/ProtectedWrapper/ProtectedWrapper';
import { AddOrEditVehicleForm } from 'src/modules/Fleet/components/AddVehicle/AddOrEditVehicleForm/AddOrEditVehicleForm';

export const AddVehicle = () => (
  <ProtectedWrapper>
    <PageLayout>
      <AddOrEditVehicleForm />
    </PageLayout>
  </ProtectedWrapper>
);
