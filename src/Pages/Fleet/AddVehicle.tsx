// import { PageLayout } from 'src/common/PageLayout/PageLayout';
import { PageLayout } from 'src/common/PageLayout/PageLayout';
// import { PageLayout } from '~/common/PageLayout/PageLayout';
// import { PageLayout } from 'src/common/PageLayout/PageLayout';
import { ProtectedWrapper } from 'src/common/ProtectedWrapper/ProtectedWrapper';

import { AddVehicleForm } from 'src/modules/Fleet/components/AddVehicle/AddVehicleForm/AddVehicleForm';

export const AddVehicle = () => {
  return (
    <ProtectedWrapper>
      <PageLayout>
        <AddVehicleForm />
      </PageLayout>
    </ProtectedWrapper>
  );
};
