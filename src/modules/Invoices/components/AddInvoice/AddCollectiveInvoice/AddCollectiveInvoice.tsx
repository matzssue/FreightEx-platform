import { ChangeEvent, useEffect, useState } from 'react';
import { SyntheticEvent } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal } from '@mui/material';
import { Autocomplete, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Button } from 'src/common/Buttons/Button/Button';
import { DateInput } from 'src/common/Inputs/DateInput/DateInput';
import { TextFieldInput } from 'src/common/Inputs/TextField/TextFieldInput';
import { AddInvoiceProps } from 'src/modules/Invoices/types';
import { useUserContext } from 'src/store/contexts/UserContext';
import { getAllCompanies } from 'src/utils/api/supabase/Company/getAllCompanies';
import { getCompanyOrdersToFacture } from 'src/utils/api/supabase/Invoices/getCompanyOrdersToFacture';
import { CompanyOrdersData } from 'src/utils/api/supabase/types';
import { addCollectiveInvoiceSchema, CollectiveInvoice } from 'src/utils/schemas/addInvoiceSchema';

import { useAddInvoince } from '../../../hooks/useAddInvoice';
import { calculateTotal } from '../../../utils/calculateTotal';
import { InvoiceFormHeader } from '../../InvoiceFormHeader/InvoiceFormHeader';
import { OrderToInvoice } from '../../OrderToInvoice/OrderToInvoice';

import styles from './AddCollectiveInvoice.module.scss';

type SelectedOrders = {
  currency: string;
  id: string;
  price: number;
  recipientId: string;
  sellerId: string;
};
export const AddCollectiveInvoice = ({ isModalOpen, onClose }: AddInvoiceProps) => {
  const { userId } = useUserContext();
  const [selectedCompany, setSelectedCompany] = useState<string | undefined>(undefined);
  const [selectedOrders, setSelectedOrders] = useState<SelectedOrders[] | []>([]);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);

  const addInvoiceMutation = useAddInvoince();

  const { data, isError, isLoading } = useQuery(['companiesToFacture'], async () =>
    getAllCompanies(),
  );

  const {
    data: companyFactures,
    isError: ordersError,
    isLoading: isOrdersListLoading,
  } = useQuery(
    ['companyFactures', selectedCompany],
    async () => getCompanyOrdersToFacture(userId, selectedCompany),
    { enabled: !!userId },
  );

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<CollectiveInvoice>(addCollectiveInvoiceSchema),
    defaultValues: { orders: [] },
  });

  useEffect(() => {
    const calculateTotalAmount = () => {
      const totalAmount = calculateTotal(selectedOrders);
      setTotalAmount(totalAmount);
    };
    calculateTotalAmount();
  }, [selectedOrders]);

  if (isError) return <div>Sorry something went wrong</div>;
  if (ordersError) return <div>Sorry something went wrong</div>;

  const handleOrderCheckbox = (event: ChangeEvent<HTMLInputElement>, order: CompanyOrdersData) => {
    if (event.target.checked) {
      setSelectedOrders([
        ...selectedOrders,
        {
          id: order.id,
          price: order.price,
          currency: order.currency,
          sellerId: order.seller,
          recipientId: order.recipient,
        },
      ]);
    } else {
      setSelectedOrders(selectedOrders.filter((selectedOrder) => selectedOrder.id !== order.id));
    }
  };

  const resetAll = () => {
    reset();
    setSelectedOrders([]);
    setSelectedCompany(undefined);
    setTotalAmount(null);
    onClose();
  };

  const onSubmit: SubmitHandler<CollectiveInvoice> = async (data: CollectiveInvoice) => {
    const date = new Date(data.invoiceDate);
    const endData = new Date(date.setDate(date.getDate() + Number(data.paymentTerm)));
    const orders = data.orders ? data.orders : [];
    const { sellerId, recipientId, currency } = selectedOrders[0];
    if (!totalAmount) return;
    const addInvoiceData = {
      seller_id: sellerId,
      recipient_id: recipientId,
      cost: totalAmount,
      currency: currency,
      payment_term: data.paymentTerm,
      date: data.invoiceDate,
      end_date: endData.toDateString(),
      additional_informations: data.additionalInformations,
    };

    addInvoiceMutation.mutate({ invoiceData: addInvoiceData, loadsId: orders });
    resetAll();
  };

  if (!data) return;
  return (
    <Modal
      open={isModalOpen}
      onClose={onClose}
      aria-labelledby='modal-collective-invoice'
      aria-describedby='modal-add-collective-invoice-form'
    >
      <div className={styles['invoice-form__container']}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InvoiceFormHeader title={'Add invoice '} onClose={() => resetAll()} />
          <Controller
            name='company'
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <Autocomplete
                defaultValue={null}
                disablePortal
                autoHighlight
                id='select-comapny'
                onChange={(_: SyntheticEvent<Element, Event>, value) => {
                  if (value) {
                    onChange(value?.vat_id);
                    setSelectedCompany(value?.vat_id);
                  }
                }}
                loading={isLoading}
                options={data}
                getOptionLabel={(option) => `${option.name} ${option.vat_id}`}
                size='small'
                sx={{
                  '.css-k4qjio-MuiFormHelperText-root': {
                    fontFamily: 'Nunito, sans-serif',
                  },
                  fontWeight: '100%',
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    helperText={error?.message}
                    error={!!error}
                    variant='filled'
                    label='Select company'
                  />
                )}
              />
            )}
          />

          <div>
            <label htmlFor='invoiceDate'>Date of invoice</label>
            <DateInput fontSize='100%' control={control} name='invoiceDate' />
          </div>
          <TextFieldInput
            column={true}
            label='Additional Informations (optional)'
            defaultValue={''}
            name='additionalInformations'
            control={control}
            props={{ multiline: true, rows: 3 }}
          />
          <ul className={styles['orders-list']}>
            {!isOrdersListLoading ? (
              companyFactures?.map((order) => (
                <OrderToInvoice key={order.id} order={order}>
                  <input
                    id={order.id}
                    type='checkbox'
                    value={order.id}
                    disabled={
                      selectedOrders.length > 0 && selectedOrders[0].currency !== order.currency
                    }
                    {...register('orders')}
                    onChange={(e) => {
                      handleOrderCheckbox(e, order);
                      register(`orders`);
                    }}
                  />
                </OrderToInvoice>
              ))
            ) : (
              <p>Loading please wait...</p>
            )}
            {errors.orders && <p>{errors.orders.message}</p>}

            {companyFactures && companyFactures?.length === 0 && <p>No orders for this company</p>}
          </ul>
          <div className={styles['payment-details']}>
            <p>
              Total amount: {totalAmount} {selectedOrders.length > 0 && selectedOrders[0].currency}
            </p>
            <TextFieldInput
              label='payment term(days)'
              defaultValue={'60'}
              name='paymentTerm'
              control={control}
              sx={{ width: '80px' }}
            />
          </div>
          <Button type='submit'>Accept</Button>
        </form>
      </div>
    </Modal>
  );
};
