import { PageLayout } from 'src/common/PageLayout/PageLayout';
import { ProtectedWrapper } from 'src/common/ProtectedWrapper/ProtectedWrapper';
import { OrdersMenu } from 'src/modules/Orders/components/OrdersMenu/OrdersMenu';
import { OrdersWrapper } from 'src/modules/Orders/components/OrdersWrapper/OrdersWrapper';
import { AcceptedOrdersList } from 'src/modules/Orders/components/Published/AcceptedOrdersList/AcceptedOrdersList';
export const AcceptedOrders = () => (
  <ProtectedWrapper>
    <PageLayout>
      <OrdersWrapper>
        <OrdersMenu />
        <AcceptedOrdersList />
      </OrdersWrapper>
    </PageLayout>
  </ProtectedWrapper>
);
