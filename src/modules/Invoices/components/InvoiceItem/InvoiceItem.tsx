import { FaRegFilePdf } from 'react-icons/fa';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useQuery } from '@tanstack/react-query';
import { Button } from 'src/common/Buttons/Button/Button';
import { LoadingSpinner } from 'src/common/LoadingSpinner/LoadingSpinner';
import { getInvoiceOrders } from 'src/utils/api/supabase/Invoices/getInvoiceOrders';
import { GetInvoices } from 'src/utils/api/supabase/types';

import { InvoicePDF } from '../InvoicePDF/InvoicePDF';

import styles from './InvoiceItem.module.scss';

export const InvoiceItem = ({ invoice }: { invoice: GetInvoices }) => {
  const { id, cost, date, endDate, paymentTerm, recipient, currency } = invoice;

  const {
    data: invoiceOrders,
    isLoading: isOrdersLoading,
    isError,
  } = useQuery(['invoiceOrders', id], async () => getInvoiceOrders(id));
  if (isOrdersLoading) return <LoadingSpinner />;
  if (isError) return <p>Sorry,something went wrong</p>;

  if (!invoiceOrders) return;

  const invoiceData = {
    invoice,
    invoiceOrders,
  };

  return (
    <li className={styles.invoice}>
      <span className={styles['invoice-id']}>{id}</span>
      <span>
        {cost} {currency}
      </span>
      <span>{date}</span>
      <span>{endDate}</span>
      <span>{paymentTerm} days</span>
      <span>
        {recipient.name} {recipient.surname} {''}
        {recipient.company_vat_id.name}
      </span>
      <span className={styles['invoice-options']}>
        <PDFDownloadLink
          fileName={`invoiceNr${invoiceData.invoice.id}`}
          document={<InvoicePDF invoiceData={invoiceData} />}
        >
          <Button type='button'>
            <span className={styles['button-text']}> Generate PDF </span>
            <FaRegFilePdf />
          </Button>
        </PDFDownloadLink>
      </span>
    </li>
  );
};
