import { Page, Document, StyleSheet } from '@react-pdf/renderer';
import { GetAcceptedLoadsData, GetInvoices } from 'src/utils/api/supabase/types';
import InvoiceTitle from './InvoiceHeader/InvoiceTitle';
import { TableBody } from './TableBody/TableBody';
import { Address } from './Address/Address';
import { UserAddress } from './UserAddress/UserAddress';
import { TableHead } from './TableHead/TableHead';
import { TableTotal } from './TableTotal/TableTotal';
import { InvoiceDates } from './InvoiceDates/InvoiceDates';

type InvoiceData = {
  invoice: GetInvoices;
  invoiceOrders: GetAcceptedLoadsData[];
};

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 40,
    lineHeight: 1.5,
    flexDirection: 'column',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export const InvoicePDF = ({ invoiceData }: { invoiceData: InvoiceData }) => {
  const { invoice, invoiceOrders } = invoiceData;

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <InvoiceTitle title={invoice.seller.company_vat_id.name} />
        <Address invoiceData={invoice} />
        <UserAddress recipientData={invoice.recipient} />
        <InvoiceDates invoiceData={invoice} />
        <TableHead />
        <TableBody loadData={invoiceOrders} />
        <TableTotal invoiceData={invoice} />
      </Page>
    </Document>
  );
};
