import { ReactNode } from 'react';
import styles from './OrderToInvoice.module.scss';
import { OrderToInvoiceData } from '../../types';

type OrderToInvoiceProps = {
  order: OrderToInvoiceData;
  children: ReactNode;
};

export const OrderToInvoice = ({ order, children }: OrderToInvoiceProps) => {
  return (
    <li className={styles['order-to-invoice']}>
      {children}
      <span>
        <b>ID:</b> {order.id}
      </span>
      <span>
        <b>Payment:</b> {order.price}
        {order.currency} {order.paymentTerm} days
      </span>
      <span>
        <b>From:</b> {order.loadingCountry}, {order.loadingCity}{' '}
      </span>
      <span>
        <b>To:</b> {order.unloadingCountry}, {order.unloadingCity}
      </span>
    </li>
  );
};
