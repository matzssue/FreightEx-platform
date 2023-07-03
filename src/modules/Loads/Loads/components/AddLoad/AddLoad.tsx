import Modal from '@mui/material/Modal';
import styles from './AddLoad.module.scss';
import { useForm } from 'react-hook-form';
import { PlacesInput } from '../../../../../common/Inputs/PlacesInput';
import { DateInput } from '../../../../../common/Inputs/DateInput';

import CheckboxInput from '../../../../../common/Inputs/Checkbox';
import { TextFieldInput } from '../../../../../common/Inputs/TextField';
import { SelectInput } from '../../../../../common/Inputs/Select';
import { currencies } from '../../loadData';
import { LoadHeader } from './LoadHeader';

import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import AlertDialog from '../../../../../common/Dialog/AlertDialog';

import { useAppSelector, useAppDispatch } from '../../../../../store/hooks';

import { closeModal, openDialog, closeDialog } from '../../../../../store/reducers/modalSlice';
import { addLoadSchema, AddLoadValues } from '../../../../../utils/schemas/addLoadSchema';
import { AddLoadData, Addresses, addLoad } from '../../../../../utils/api/supabase/load';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const AddLoad = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const isModalOpen = useAppSelector((state) => state.modal.isLoadModalOpen);
  const isDialogOpen = useAppSelector((state) => state.modal.isLoadDialogOpen);

  const [loadingAddress, setLoadingAddress] = useState<Addresses | undefined>(undefined);
  const [unloadingAddress, setUnloadingAddress] = useState<Addresses | undefined>(undefined);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver<AddLoadValues>(addLoadSchema),
  });

  const mutation = useMutation(async (values: AddLoadData) => addLoad(values), {
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
      console.log('load added successfully');
    },
    onError: () => {
      console.log('Cos poszlo nie tak');
    },
  });

  const onSubmit = async (data: AddLoadValues) => {
    console.log(data.loadingDate);
    if (!loadingAddress || !unloadingAddress) return;
    const loadData = {
      ...data,
      loadingAddress,
      unloadingAddress,
    };

    mutation.mutate(loadData);
    closeAllHandler();
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
                <DateInput<AddLoadValues> label={'Date'} control={control} name={'loadingDate'} />
                <PlacesInput<AddLoadValues>
                  setAddress={setLoadingAddress}
                  label={'Address'}
                  control={control}
                  name={'loadingAddress'}
                />
                {/* <PlacesInput2 label={'Loading adress'} control={control} name={'loading'} /> */}
              </div>
              <div className={styles['unloading-inputs']}>
                <p className={styles.title}>Unloading</p>
                <DateInput<AddLoadValues>
                  label={'Unloading Date'}
                  control={control}
                  name={'unloadingDate'}
                />
                <PlacesInput<AddLoadValues>
                  setAddress={setUnloadingAddress}
                  label={'Unloading address'}
                  control={control}
                  name={'unloadingAddress'}
                />
              </div>
              <div className={styles['cargo-dimensions']}>
                <p>Cargo </p>
                <div className={styles['dimensions-inputs__container']}>
                  <TextFieldInput<AddLoadValues>
                    label={'length(m)'}
                    name='length'
                    control={control}
                    defaultValue={''}
                    sx={{
                      width: '40px',
                      '& input': {
                        padding: '5px',
                        margin: '0px',
                        fontSize: '15px',
                      },
                    }}
                    type='number'
                  />
                  <TextFieldInput<AddLoadValues>
                    label={'weight(t)'}
                    name='weight'
                    control={control}
                    defaultValue={''}
                    sx={{
                      width: '40px',
                      '& input': {
                        padding: '5px',
                        margin: '0px',
                        fontSize: '15px',
                      },
                    }}
                    type='number'
                  />
                </div>
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
              <div className={styles['payment-inputs__container']}>
                <p className={styles.title}>Payment</p>
                <div className={styles['payment-inputs']}>
                  <TextFieldInput<AddLoadValues>
                    label={'term'}
                    name='term'
                    control={control}
                    defaultValue=''
                    sx={{ width: '70px', helperText: { width: '300px' } }}
                    variant='standard'
                  />

                  <div className={styles.payment}>
                    <TextFieldInput<AddLoadValues>
                      label={'price'}
                      name='price'
                      control={control}
                      defaultValue=''
                      sx={{ width: '70px' }}
                      variant='standard'
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
