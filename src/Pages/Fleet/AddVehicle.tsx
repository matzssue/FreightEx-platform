import { PageLayout } from 'src/common/PageLayout/PageLayout';
import { AddOrEditVehicleForm } from 'src/modules/Fleet/components/AddVehicle/AddOrEditVehicleForm/AddOrEditVehicleForm';
import { ProtectedWrapper } from 'src/common/ProtectedWrapper/ProtectedWrapper';

export const AddVehicle = () => {
  return (
    <ProtectedWrapper>
      <PageLayout>
        <AddOrEditVehicleForm />
      </PageLayout>
    </ProtectedWrapper>
  );
};
