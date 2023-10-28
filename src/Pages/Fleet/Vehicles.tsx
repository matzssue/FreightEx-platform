// import { PageLayout } from 'src/common/PageLayout/PageLayout';
import { PageLayout } from 'src/common/PageLayout/PageLayout';
import { ProtectedWrapper } from 'src/common/ProtectedWrapper/ProtectedWrapper';
import { VehicleList } from 'src/modules/Fleet/components/VehicleList/VehicleList';
import { JoyrideLoader } from 'src/modules/Joyride/components/JoyrideLoader/JoyrideLoader';
import { useMountJoyride } from 'src/modules/Joyride/hooks/useMountJoyride';

const joyrideIndex = 4;

export const Vehicles = () => {
  const { showJoyrideLoader } = useMountJoyride(joyrideIndex);

  return (
    <ProtectedWrapper>
      <PageLayout>
        <VehicleList />
        {showJoyrideLoader && <JoyrideLoader />}
      </PageLayout>
    </ProtectedWrapper>
  );
};
