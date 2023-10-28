import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LoadingSpinner } from 'src/common/LoadingSpinner/LoadingSpinner';
import { Paginate } from 'src/common/Pagination/Pagination';
import { SearchForm } from 'src/common/SearchForm/SearchForm';
import { OrdersColumns } from 'src/modules/Orders/components/OrdersColumns/OrdersColumns';
import { usePaginationContext } from 'src/store/contexts/PaginationContext';
import { useUserContext } from 'src/store/contexts/UserContext';
import { getUserInvoices } from 'src/utils/api/supabase/Invoices/getUserInvoices';
import { useSearchById } from 'src/utils/hooks/useSearchById';

import { invoiceColumns } from '../../constants/invoiceColumns';
import { InvoiceItem } from '../InvoiceItem/InvoiceItem';

import styles from './InvoiceList.module.scss';
export const InvoiceList = () => {
  const { userId } = useUserContext();

  const { changeItemsPerPage, changePage, currentPage, itemsPerPage } = usePaginationContext();

  useEffect(() => {
    changeItemsPerPage(6);
    changePage(1);
  }, []);

  const {
    data: invoices,
    isLoading,
    isError,
  } = useQuery(
    ['invoices', currentPage, itemsPerPage],
    async () => getUserInvoices(userId, currentPage, itemsPerPage),
    {
      enabled: !!userId,
    },
  );

  const {
    filteredItems: filteredInvoices,
    searchRef,
    handleSubmit,
  } = useSearchById(invoices?.invoiceData, invoices?.totalPages);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>Sorry, something went wrong</p>;

  const invoiceList = filteredInvoices.items
    ? { items: filteredInvoices.items, totalPages: filteredInvoices.totalPages }
    : { items: invoices?.invoiceData, totalPages: invoices?.totalPages };

  if (!invoiceList.items || !invoiceList.totalPages)
    return (
      <p id='invoice-list-container' className={styles['no-invoices-information']}>
        Sorry, no invoices found
      </p>
    );
  return (
    <div id='invoice-list-container'>
      <SearchForm itemName='invoice' ref={searchRef} handleSubmit={handleSubmit} />
      <OrdersColumns gridColumns='0.2fr 0.4fr 1fr 1fr 0.5fr 1fr 0.8fr' columns={invoiceColumns} />
      <ul className={styles['invoices-list']}>
        {invoiceList.items.map((item) => (
          <InvoiceItem key={item.id} invoice={item} />
        ))}
        {invoiceList.items.length === 0 && <p>No invoices found</p>}
      </ul>
      <div className={styles['invoice-pagination']}>
        <Paginate lastPage={invoiceList?.totalPages} />
      </div>
    </div>
  );
};
