import styles from './AddInvoice.module.scss';

import { Modal } from '@mui/material';
import { Controller, SubmitHandler } from 'react-hook-form';
import { SyntheticEvent } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getOrdersToFacture } from 'src/utils/api/supabase/Invoices/getOrdersToFacture';
import { useUserContext } from 'src/store/contexts/UserContext';
import { Invoice, addInvoiceSchema } from 'src/utils/schemas/addInvoiceSchema';
import { useForm } from 'react-hook-form';
import { DateInput } from 'src/common/Inputs/DateInput/DateInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextFieldInput } from 'src/common/Inputs/TextField/TextFieldInput';
import { useAddInvoince } from '../../../hooks/useAddInvoice';
import { InvoiceFormHeader } from '../../InvoiceFormHeader/InvoiceFormHeader';
import { Button } from 'src/common/Buttons/Button/Button';
import { AddInvoiceProps } from 'src/modules/Invoices/types';

export const AddInvoice = ({ isModalOpen, onClose }: AddInvoiceProps) => {
  const { userId } = useUserContext();

  const addInvoiceMutation = useAddInvoince();

  const { data, isError, isLoading } = useQuery(
    ['ordersToFacture'],
    async () => getOrdersToFacture(userId),
    {
      enabled: !!userId,
    },
  );

  if (isError) return <p>Sorry, something went wrong. Please try again later</p>;

  const { control, handleSubmit, reset } = useForm({ resolver: yupResolver(addInvoiceSchema) });
  const onSubmit: SubmitHandler<Invoice> = async (data) => {
    console.log(data);
    const date = new Date(data.invoiceDate);
    const endData = new Date(date.setDate(date.getDate() + 25));
    const loadsId = [data.order.id];
    const invoiceData = {
      seller_id: data.order.seller,
      recipient_id: data.order.recipient,
      cost: data.order.price,
      payment_term: data.order.paymentTerm,
      date: data.invoiceDate,
      end_date: endData.toDateString(),
      additional_informations: data.additionalInformations,
    };
    addInvoiceMutation.mutate({ invoiceData, loadsId });
    reset();
    onClose();
  };
  if (!data) return;
  return (
    <Modal
      open={isModalOpen}
      onClose={onClose}
      aria-labelledby='modal-invoice'
      aria-describedby='modal-add-invoice-form'
    >
      <div className={styles['invoice-modal']}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InvoiceFormHeader title={'Add invoice'} onClose={onClose} />
          <Controller
            name='order'
            control={control}
            render={({ field: { onChange } }) => (
              <Autocomplete
                disablePortal
                id='select-order'
                onChange={(_: SyntheticEvent<Element, Event>, value) => {
                  if (value) {
                    onChange(value);
                  }
                }}
                options={data}
                loading={isLoading}
                getOptionLabel={(option) => option.id.toString()}
                size='small'
                sx={{ width: '100%' }}
                renderInput={(params) => (
                  <TextField {...params} variant='filled' label='Select order id' />
                )}
              />
            )}
          ></Controller>
          <div>
            <label className={styles['invoice-date__label']} htmlFor='invoiceDate'>
              Date of invoice
            </label>
            <DateInput control={control} name='invoiceDate' />
          </div>
          <TextFieldInput
            label='Additional informations'
            defaultValue={''}
            name='additionalInformations'
            control={control}
            column
            props={{ multiline: true, rows: 4 }}
          />

          <Button type='submit'>Accept</Button>
        </form>
      </div>
    </Modal>
  );
};
