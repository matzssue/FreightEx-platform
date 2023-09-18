export type AddInvoiceProps = {
  isModalOpen: boolean;
  onClose: () => void;
};

export type OrderToInvoiceData = {
  id: string;
  loadingCountry: string;
  loadingCity: string;
  unloadingCountry: string;
  unloadingCity: string;
  paymentTerm: string;
  price: number;
  currency: string;
  seller: string;
  recipient: string;
  createdAt: string;
  vehicleId: string | null;
};
