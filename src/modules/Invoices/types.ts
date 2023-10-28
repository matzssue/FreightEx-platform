export type AddInvoiceProps = {
  isModalOpen: boolean;
  onClose: () => void;
};

export type OrderToInvoiceData = {
  createdAt: string;
  currency: string;
  id: string;
  loadingCity: string | null;
  loadingCountry: string;
  paymentTerm: string;
  price: number;
  recipient: string;
  seller: string;
  unloadingCity: string | null;
  unloadingCountry: string;
  vehicleId: string | null;
};
