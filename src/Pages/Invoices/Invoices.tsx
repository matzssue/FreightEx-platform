import { JoyrideLoader } from 'src/modules/Joyride/components/JoyrideLoader/JoyrideLoader';
import { PageLayout } from 'src/common/PageLayout/PageLayout';
import { ProtectedWrapper } from 'src/common/ProtectedWrapper/ProtectedWrapper';
import { InvoiceMenu } from 'src/modules/Invoices/components/InvoiceMenu/InvoiceMenu';
import { useMountJoyride } from 'src/modules/Joyride/hooks/useMountJoyride';

const joyrideIndex = 8;

export const Invoices = () => {
  const { showJoyrideLoader } = useMountJoyride(joyrideIndex);

  return (
    <ProtectedWrapper>
      <PageLayout>
        {showJoyrideLoader && <JoyrideLoader />}
        <InvoiceMenu />
      </PageLayout>
    </ProtectedWrapper>
  );
};
