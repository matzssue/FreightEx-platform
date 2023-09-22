import { PageLayout } from 'src/common/PageLayout/PageLayout';

import { ProtectedWrapper } from 'src/common/ProtectedWrapper/ProtectedWrapper';
import { InvoiceMenu } from 'src/modules/Invoices/components/InvoiceMenu/InvoiceMenu';

export const Invoices = () => {
  return (
    <ProtectedWrapper>
      <PageLayout>
        <InvoiceMenu />
      </PageLayout>
    </ProtectedWrapper>
  );
};
