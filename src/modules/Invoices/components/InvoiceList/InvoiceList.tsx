import { getUserInvoices } from 'src/utils/api/supabase/Invoices/getUserInvoices';
import { useQuery } from '@tanstack/react-query';
import { useUserContext } from 'src/store/contexts/UserContext';
import { InvoiceItem } from '../InvoiceItem/InvoiceItem';
import styles from './InvoiceList.module.scss';
import { OrdersColumns } from 'src/modules/Orders/components/OrdersColumns/OrdersColumns';
import { invoiceColumns } from '../../constants/invoiceColumns';
import { LoadingSpinner } from 'src/common/LoadingSpinner/LoadingSpinner';
import { Paginate } from 'src/common/Pagination/Pagination';
import { useSearchById } from 'src/utils/hooks/useSearchById';
import { useEffect } from 'react';
import { usePaginationContext } from 'src/store/contexts/PaginationContext';
import { SearchForm } from 'src/common/SearchForm/SearchForm';
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
  } = useQuery(['invoices'], async () => getUserInvoices(userId, currentPage, itemsPerPage), {
    enabled: !!userId,
  });
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

  if (!invoiceList.items || !invoiceList.totalPages) return;
  return (
    <>
      <SearchForm ref={searchRef} handleSubmit={handleSubmit} />
      <OrdersColumns gridColumns='0.2fr 0.4fr 1fr 1fr 0.5fr 1fr 0.8fr' columns={invoiceColumns} />
      <ul className={styles['invoices-list']}>
        {invoiceList.items.map((item) => {
          return <InvoiceItem key={item.id} invoice={item} />;
        })}
        {invoiceList.items.length === 0 && <p>No invoices found</p>}
      </ul>
      <div className={styles['invoice-pagination']}>
        <Paginate lastPage={invoiceList?.totalPages} />
      </div>
    </>
  );
};
