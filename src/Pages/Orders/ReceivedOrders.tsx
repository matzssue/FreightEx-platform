import { OrdersMenu } from 'src/modules/Orders/components/OrdersMenu/OrdersMenu';
import { ProtectedWrapper } from 'src/common/ProtectedWrapper/ProtectedWrapper';
import { PageLayout } from 'src/common/PageLayout/PageLayout';
import { OrdersWrapper } from 'src/modules/Orders/components/OrdersWrapper/OrdersWrapper';
import { ReceivedOrdersList } from 'src/modules/Orders/components/Received/ReceivedOrdersList/ReceivedOrdersList';
export const ReceivedOrders = () => {
  return (
    <ProtectedWrapper>
      <PageLayout>
        <OrdersWrapper>
          <OrdersMenu />
          <ReceivedOrdersList />
        </OrdersWrapper>
      </PageLayout>
    </ProtectedWrapper>
  );
};
