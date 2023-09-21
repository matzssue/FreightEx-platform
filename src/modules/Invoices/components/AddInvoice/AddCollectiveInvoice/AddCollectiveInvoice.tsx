import styles from './AddCollectiveInvoice.module.scss';

import { Modal } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { SyntheticEvent } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useUserContext } from 'src/store/contexts/UserContext';
import { CollectiveInvoice, addCollectiveInvoiceSchema } from 'src/utils/schemas/addInvoiceSchema';
import { useForm } from 'react-hook-form';
import { DateInput } from 'src/common/Inputs/DateInput/DateInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextFieldInput } from 'src/common/Inputs/TextField/TextFieldInput';
import { useAddInvoince } from '../../../hooks/useAddInvoice';
import { getAllCompanies } from 'src/utils/api/supabase/Company/getAllCompanies';
import { getCompanyOrdersToFacture } from 'src/utils/api/supabase/Invoices/getCompanyOrdersToFacture';
import { OrderToInvoice } from '../../OrderToInvoice/OrderToInvoice';
import { Button } from 'src/common/Buttons/Button/Button';
import { InvoiceFormHeader } from '../../InvoiceFormHeader/InvoiceFormHeader';
import { calculateTotal } from '../../../utils/calculateTotal';
import { AddInvoiceProps } from 'src/modules/Invoices/types';

type SelectedOrders = {
  id: string;
  price: number;
  currency: string;
  sellerId: string;
  recipientId: string;
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
  if (isError) return <div>Sorry something went wrong</div>;

  const {
    data: companyFactures,
    isError: ordersError,
    isLoading: isOrdersListLoading,
  } = useQuery(
    ['companyFactures', selectedCompany],
    async () => getCompanyOrdersToFacture(userId, selectedCompany),
    { enabled: !!userId },
  );

  if (ordersError) return <div>Sorry something went wrong</div>;

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

  const handleOrderCheckbox = (event: ChangeEvent<HTMLInputElement>, order: any) => {
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
                getOptionLabel={(option) => {
                  return `${option.name} ${option.vat_id}`;
                }}
                size='small'
                sx={{
                  '.css-k4qjio-MuiFormHelperText-root': {
                    fontFamily: 'Nunito, sans-serif',
                  },
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
          ></Controller>

          <div>
            <label htmlFor='invoiceDate'>Date of invoice</label>
            <DateInput control={control} name='invoiceDate' />
          </div>
          <TextFieldInput
            column={true}
            label='Additional Informations (optional)'
            defaultValue={''}
            name='additionalInformations'
            control={control}
            props={{ multiline: true, rows: 4 }}
          />
          <ul className={styles['orders-list']}>
            {!isOrdersListLoading ? (
              companyFactures?.map((order) => {
                return (
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
                );
              })
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
