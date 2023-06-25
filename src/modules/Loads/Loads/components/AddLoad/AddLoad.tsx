import Modal from '@mui/material/Modal';
import styles from './AddLoad.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { PlacesInput } from '../../../../../common/Inputs/PlacesInput';
import { DateInput } from '../../../../../common/Inputs/DateInput';
import { AiOutlineClose } from 'react-icons/ai';
import CheckboxInput from '../../../../../common/Inputs/Checkbox';
import { TextFieldInput } from '../../../../../common/Inputs/TextField';
import { SelectInput } from '../../../../../common/Inputs/Select';
import { currencies } from '../../loadData';
import { LoadHeader } from './LoadHeader';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import AlertDialog from '../../../../../common/Dialog/AlertDialog';
import { useDisclosure } from '../../../../../hooks/useDisclosure';
import { useAppSelector, useAppDispatch } from '../../../../../store/hooks';

import {
  openModal,
  closeModal,
  openDialog,
  closeDialog,
} from '../../../../../store/reducers/modalSlice';

type FreightModalProps = {
  handleAgree?: () => void;
  isOpen: boolean;
  handleClose: () => void;
  title?: string;
};
// interface IFormInput {
//   firstName?: string;
//   lastName?: string;
//   iceCreamType?: { label: string; value: string };
// }

const addLoadSchema = yup.object({
  loading: yup.string().required('Loading address is required').min(3),
  unloading: yup.string().required('Unloading address is required').min(3),
  loadingDate: yup.string().required('Loading date is required').min(5),
  unloadingDate: yup.string().required('Unloading date is required').min(5),
  price: yup.string().required('Price is required').min(3),
  term: yup.string().required('Payment term is required').min(1),
  currency: yup.string().required('Please select currency'),
});

export const AddLoad = () => {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector((state) => state.modal.isLoadModalOpen);
  const isDialogOpen = useAppSelector((state) => state.modal.isLoadDialogOpen);

  // const currentDate = dayjs(new Date());
  // console.log(currentDate);
  // const [date, setDate] = useState(currentDate);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    // defaultValues: {
    //   loading: '',
    //   unloading: '',
    //   loadingDate: date,
    //   unloadingDate: '',
    //   price: '',
    //   term: '',
    //   currency: '',
    // },
    resolver: yupResolver(addLoadSchema),
    // resolver: async (data, context, options) => {
    //   // you can debug your validation schema here
    //   console.log('formData', data);
    //   console.log('validation result', await yupResolver(addLoadSchema)(data, context, options));
    //   return yupResolver(addLoadSchema)(data, context, options);
    // },
  });

  /**
   * @deprecated we dont use it since 2012
   */
  const onSubmit = async (data) => {
    console.log(data);
  };
  const closeAllHandler = () => {
    reset();
    dispatch(closeModal());
  };
  return (
    <div>
      <Modal open={isModalOpen} aria-labelledby='load-modal' aria-describedby='addLoad-modal'>
        <div className={styles.container}>
          <AlertDialog
            title={'add-load-form'}
            label={'Are you sure you want to close the form?'}
            content={'This will cause the form data to be reset'}
            description={'add-load-form-description'}
            agreeHandler={() => closeAllHandler()}
            open={isDialogOpen}
            close={() => dispatch(closeDialog())}
          />
          <LoadHeader onClick={() => dispatch(openDialog())} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles['inputs-container']}>
              <div className={styles['loading-inputs']}>
                <p className={styles.title}>Loading</p>
                <DateInput label={'Date'} control={control} name={'loadingDate'} />
                <PlacesInput label={'Address'} control={control} name={'loading'} />
                {/* <PlacesInput2 label={'Loading adress'} control={control} name={'loading'} /> */}
              </div>
              <div className={styles['unloading-inputs']}>
                <p className={styles.title}>Unloading</p>
                <DateInput label={'Unloading Date'} control={control} name={'unloadingDate'} />
                <PlacesInput label={'Unloading adress'} control={control} name={'unloading'} />
              </div>
              <div className={styles['vehicle-inputs']}>
                <p>Vehicle type</p>
                <CheckboxInput control={control} label={'solo'} name={'solo'} />
                <CheckboxInput control={control} label={'bus'} name={'bus'} />
                <CheckboxInput control={control} label={'with semi-trailer'} name={'semiTrailer'} />
                <CheckboxInput
                  control={control}
                  label={'with double-trailer'}
                  name={'dobuleTrailer'}
                />
              </div>
              <div className={styles['payment-inputs']}>
                <p>Payment</p>
                <TextFieldInput
                  label={'term'}
                  name='term'
                  control={control}
                  sx={{ width: '70px' }}
                />

                <div className={styles.payment}>
                  <TextFieldInput
                    label={'price'}
                    name='price'
                    control={control}
                    sx={{ width: '70px' }}
                  />
                  <SelectInput
                    options={currencies}
                    label={''}
                    name={'currency'}
                    control={control}
                  />
                </div>
              </div>
            </div>
            <button className={styles.submit} type='submit'>
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};
