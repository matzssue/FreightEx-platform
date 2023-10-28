import { PageLayout } from 'src/common/PageLayout/PageLayout';
import { ProtectedWrapper } from 'src/common/ProtectedWrapper/ProtectedWrapper';
import { JoyrideLoader } from 'src/modules/Joyride/components/JoyrideLoader/JoyrideLoader';
import { useMountJoyride } from 'src/modules/Joyride/hooks/useMountJoyride';
import { OrdersMenu } from 'src/modules/Orders/components/OrdersMenu/OrdersMenu';
import { OrdersWrapper } from 'src/modules/Orders/components/OrdersWrapper/OrdersWrapper';
import { PublishedOrdersList } from 'src/modules/Orders/components/Published/PublishedOrdersList/PublishedOrdersList';

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
