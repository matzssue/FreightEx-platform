import { PageLayout } from 'src/common/PageLayout/PageLayout';
import { ProtectedWrapper } from 'src/common/ProtectedWrapper/ProtectedWrapper';
import { JoyrideLoader } from 'src/modules/Joyride/components/JoyrideLoader/JoyrideLoader';
import { useMountJoyride } from 'src/modules/Joyride/hooks/useMountJoyride';
import { OrdersMenu } from 'src/modules/Orders/components/OrdersMenu/OrdersMenu';
import { OrdersWrapper } from 'src/modules/Orders/components/OrdersWrapper/OrdersWrapper';
import { SelectOrdersInformation } from 'src/modules/Orders/components/SelectOrdersInformation/SelectOrdersInformation';

const joyrideIndex = 5;

export const Orders = () => {
  const { showJoyrideLoader } = useMountJoyride(joyrideIndex);

  return (
    <ProtectedWrapper>
      <PageLayout>
        <OrdersWrapper>
          <OrdersMenu />
          {showJoyrideLoader && <JoyrideLoader />}
          <SelectOrdersInformation />
        </OrdersWrapper>
      </PageLayout>
    </ProtectedWrapper>
  );
};
