import { OrdersMenu } from 'src/modules/Orders/components/OrdersMenu/OrdersMenu';
import { ProtectedWrapper } from 'src/common/ProtectedWrapper/ProtectedWrapper';
import { PageLayout } from 'src/common/PageLayout/PageLayout';
import { OrdersWrapper } from 'src/modules/Orders/components/OrdersWrapper/OrdersWrapper';
export const Orders = () => {
  return (
    <ProtectedWrapper>
      <PageLayout>
        <OrdersWrapper>
          <OrdersMenu />
        </OrdersWrapper>
      </PageLayout>
    </ProtectedWrapper>
  );
};
