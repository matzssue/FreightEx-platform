import { ReactNode } from 'react';

import { OrderToInvoiceData } from '../../types';

import styles from './OrderToInvoice.module.scss';

type OrderToInvoiceProps = {
  children: ReactNode;
  order: OrderToInvoiceData;
};

export const OrderToInvoice = ({ order, children }: OrderToInvoiceProps) => (
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
