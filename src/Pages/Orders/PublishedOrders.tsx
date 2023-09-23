import { OrdersMenu } from 'src/modules/Orders/components/OrdersMenu/OrdersMenu';
import { ProtectedWrapper } from 'src/common/ProtectedWrapper/ProtectedWrapper';
import { PageLayout } from 'src/common/PageLayout/PageLayout';
import { PublishedOrdersList } from 'src/modules/Orders/components/Published/PublishedOrdersList/PublishedOrdersList';
import { OrdersWrapper } from 'src/modules/Orders/components/OrdersWrapper/OrdersWrapper';
import { JoyrideLoader } from 'src/modules/Joyride/components/JoyrideLoader/JoyrideLoader';
import { useMountJoyride } from 'src/modules/Joyride/hooks/useMountJoyride';

const joyrideIndex = 6;

export const PublishedOrders = () => {
  const { showJoyrideLoader } = useMountJoyride(joyrideIndex);

  return (
    <ProtectedWrapper>
      <PageLayout>
        <OrdersWrapper>
          <OrdersMenu />
          {showJoyrideLoader && <JoyrideLoader />}
          <PublishedOrdersList />
        </OrdersWrapper>
      </PageLayout>
    </ProtectedWrapper>
  );
};
