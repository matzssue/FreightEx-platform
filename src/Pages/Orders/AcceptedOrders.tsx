import { OrdersMenu } from 'src/modules/Orders/components/OrdersMenu/OrdersMenu';
import { ProtectedWrapper } from 'src/common/ProtectedWrapper/ProtectedWrapper';
import { PageLayout } from 'src/common/PageLayout/PageLayout';
import { OrdersWrapper } from 'src/modules/Orders/components/OrdersWrapper/OrdersWrapper';
import { AcceptedOrdersList } from 'src/modules/Orders/components/Published/AcceptedOrdersList/AcceptedOrdersList';
export const AcceptedOrders = () => {
  return (
    <ProtectedWrapper>
      <PageLayout>
        <OrdersWrapper>
          <OrdersMenu />
          <AcceptedOrdersList />
        </OrdersWrapper>
      </PageLayout>
    </ProtectedWrapper>
  );
};
