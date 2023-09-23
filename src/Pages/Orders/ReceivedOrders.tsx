import { OrdersMenu } from 'src/modules/Orders/components/OrdersMenu/OrdersMenu';
import { ProtectedWrapper } from 'src/common/ProtectedWrapper/ProtectedWrapper';
import { PageLayout } from 'src/common/PageLayout/PageLayout';
import { OrdersWrapper } from 'src/modules/Orders/components/OrdersWrapper/OrdersWrapper';
import { ReceivedOrdersList } from 'src/modules/Orders/components/Received/ReceivedOrdersList/ReceivedOrdersList';
import { useMountJoyride } from 'src/modules/Joyride/hooks/useMountJoyride';
import { JoyrideLoader } from 'src/modules/Joyride/components/JoyrideLoader/JoyrideLoader';

const joyrideIndex = 7;

export const ReceivedOrders = () => {
  const { showJoyrideLoader } = useMountJoyride(joyrideIndex);

  return (
    <ProtectedWrapper>
      <PageLayout>
        <OrdersWrapper>
          <OrdersMenu />
          {showJoyrideLoader && <JoyrideLoader />}
          <ReceivedOrdersList />
        </OrdersWrapper>
      </PageLayout>
    </ProtectedWrapper>
  );
};
