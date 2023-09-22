import styles from './InvoiceMenu.module.scss';

import { useState } from 'react';
import { AddCollectiveInvoice } from '../AddInvoice/AddCollectiveInvoice/AddCollectiveInvoice';
import { AddInvoice } from '../AddInvoice/AddSingleInvoice/AddInvoice';
import { InvoiceList } from '../InvoiceList/InvoiceList';

export const InvoiceMenu = () => {
  const [isSingleFactureModalOpen, setIsSingleFactureModalOpen] = useState<boolean>(false);
  const [isCollectiveFactureModalOpen, setIsCollectiveFactureModalOpen] = useState<boolean>(false);

  return (
    <div className={styles.invoices}>
      <AddInvoice
        isModalOpen={isSingleFactureModalOpen}
        onClose={() => setIsSingleFactureModalOpen(false)}
      />
      <AddCollectiveInvoice
        isModalOpen={isCollectiveFactureModalOpen}
        onClose={() => setIsCollectiveFactureModalOpen(false)}
      />
      <div className={styles['invoices-buttons']}>
        <button onClick={() => setIsSingleFactureModalOpen(true)}>Add invoice</button>
        <button onClick={() => setIsCollectiveFactureModalOpen(true)}>
          Add collective invoice
        </button>
      </div>
      <InvoiceList />
    </div>
  );
};
