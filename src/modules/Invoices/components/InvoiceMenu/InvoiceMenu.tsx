import { useState } from 'react';
import { AddCollectiveInvoice } from '../AddInvoice/AddCollectiveInvoice/AddCollectiveInvoice';
import { AddInvoice } from '../AddInvoice/AddSingleInvoice/AddInvoice';

export const InvoiceMenu = () => {
  const [isSingleFactureModalOpen, setIsSingleFactureModalOpen] = useState<boolean>(false);
  const [isCollectiveFactureModalOpen, setIsCollectiveFactureModalOpen] = useState<boolean>(false);

  return (
    <div>
      <AddInvoice
        isModalOpen={isSingleFactureModalOpen}
        onClose={() => setIsSingleFactureModalOpen(false)}
      />
      <AddCollectiveInvoice
        isModalOpen={isCollectiveFactureModalOpen}
        onClose={() => setIsCollectiveFactureModalOpen(false)}
      />
      <button onClick={() => setIsSingleFactureModalOpen(true)}>Add invoice</button>
      <button onClick={() => setIsCollectiveFactureModalOpen(true)}>Add collective invoice</button>
    </div>
  );
};
