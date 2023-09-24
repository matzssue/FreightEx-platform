export type AddInvoiceProps = {
  isModalOpen: boolean;
  onClose: () => void;
};

export type OrderToInvoiceData = {
  id: string;
  loadingCountry: string;
  loadingCity: string | null;
  unloadingCountry: string;
  unloadingCity: string | null;
  paymentTerm: string;
  price: number;
  currency: string;
  seller: string;
  recipient: string;
  createdAt: string;
  vehicleId: string | null;
};
