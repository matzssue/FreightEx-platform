import Modal from '@mui/material/Modal';
import styles from './AddLoad.module.scss';
import { Controller, FieldValues, useForm } from 'react-hook-form';
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
import { addLoadSchema, AddLoadValues } from '../../../../../utils/schemas/addLoadSchema';

export const AddLoad = () => {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector((state) => state.modal.isLoadModalOpen);
  const isDialogOpen = useAppSelector((state) => state.modal.isLoadDialogOpen);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<AddLoadValues>({
    resolver: yupResolver(addLoadSchema),
    // resolver: async (data, context, options) => {
    //   // you can debug your validation schema here
    //   console.log('formData', data);
    //   console.log('validation result', await yupResolver(addLoadSchema)(data, context, options));
    //   return yupResolver(addLoadSchema)(data, context, options);
    // },
  });

  const onSubmit = async (data: AddLoadValues) => {
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
                <DateInput<AddLoadValues>
                  label={'Unloading Date'}
                  control={control}
                  name={'unloadingDate'}
                />
                <PlacesInput label={'Unloading adress'} control={control} name={'unloading'} />
              </div>
              <div className={styles['vehicle-inputs']}>
                <p>Vehicle type</p>
                <CheckboxInput<AddLoadValues>
                  control={control}
                  label={'solo'}
                  name={'multiCheckbox.solo'}
                />
                <CheckboxInput<AddLoadValues>
                  control={control}
                  label={'bus'}
                  name={'multiCheckbox.bus'}
                />
                <CheckboxInput<AddLoadValues>
                  control={control}
                  label={'with semi-trailer'}
                  name={'multiCheckbox.semiTrailer'}
                />
                <CheckboxInput<AddLoadValues>
                  control={control}
                  label={'with double-trailer'}
                  name={'multiCheckbox.doubleTrailer'}
                />
                {errors?.multiCheckbox && (
                  <p
                    style={{ color: 'red', margin: '0px' }}
                  >{`Error: ${errors?.multiCheckbox?.message}`}</p>
                )}
              </div>
              <div className={styles['payment-inputs']}>
                <p>Payment</p>
                <TextFieldInput<AddLoadValues>
                  label={'term'}
                  name='term'
                  control={control}
                  defaultValue=''
                  sx={{ width: '70px', helperText: { width: '300px' } }}
                />

                <div className={styles.payment}>
                  <TextFieldInput<AddLoadValues>
                    label={'price'}
                    name='price'
                    control={control}
                    defaultValue=''
                    sx={{ width: '70px' }}
                  />
                  <SelectInput<AddLoadValues>
                    options={currencies}
                    label={''}
                    name={'currency'}
                    control={control}
                    defaultValue='EUR'
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
