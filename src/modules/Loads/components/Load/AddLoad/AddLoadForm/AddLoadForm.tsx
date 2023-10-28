import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Modal from '@mui/material/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotificationContext } from 'src/store/contexts/NotficationContext';

import AlertDialog from '../../../../../../common/Dialog/AlertDialog';
import { useUserContext } from '../../../../../../store/contexts/UserContext';
import { useAppDispatch, useAppSelector } from '../../../../../../store/hooks';
import { closeDialog, closeModal, openDialog } from '../../../../../../store/reducers/modalSlice';
import { addLoad } from '../../../../../../utils/api/supabase/Loads/addLoad';
import { AddLoadData } from '../../../../../../utils/api/supabase/types';
import { addLoadSchema, AddLoadValues } from '../../../../../../utils/schemas/addLoadSchema';
import { currencyOptions } from '../../../../constants/currencyOptions';
import { CargoDetails } from '../CargoDetails/CargoDetails';
import { LoadHeader } from '../LoadHeader/LoadHeader';
import { PaymentDetails } from '../PaymentDetails/PaymentDetails';
import { PlaceAndDateSearch } from '../PlaceAndDateSearch/PlaceAndDateSearch';
import { VehicleDetails } from '../VehicleDetails/VehicleDetails';

import styles from './AddLoadForm.module.scss';
export const AddLoadForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { userData } = useUserContext();
  const { notify } = useNotificationContext();
  const isModalOpen = useAppSelector((state) => state.modal.isLoadModalOpen);
  const isDialogOpen = useAppSelector((state) => state.modal.isLoadDialogOpen);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver<AddLoadValues>(addLoadSchema),
  });

  const mutation = useMutation(async (values: AddLoadData) => addLoad(values), {
    onSuccess: () => {
      queryClient.invalidateQueries(['loads']);
      queryClient.invalidateQueries(['published']);
      notify('success', 'Load successfully added');
    },
    onError: () => {
      notify('error', 'Something went wrong, load not added');
    },
  });

  const closeAllHandler = () => {
    reset();
    dispatch(closeModal());
  };
  const onSubmit = async (data: AddLoadValues) => {
    if (!userData) return;
    const load = { ...data, userId: userData.id };

    mutation.mutate(load);
    closeAllHandler();
  };

  return (
    <Modal open={isModalOpen} aria-labelledby='load-modal' aria-describedby='addLoad-modal'>
      <div className={styles.container}>
        <AlertDialog
          title={'add-load-form'}
          label={'Are you sure you want to close the form?'}
          description={'add-load-form-description'}
          agreeHandler={() => closeAllHandler()}
          open={isDialogOpen}
          close={() => dispatch(closeDialog())}
        >
          This will cause the form data to be reset
        </AlertDialog>
        <LoadHeader onClick={() => dispatch(openDialog())} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles['inputs-container']}>
            <PlaceAndDateSearch control={control} setValue={setValue} />
            <CargoDetails control={control} />
            <VehicleDetails control={control} errors={errors} />
            <PaymentDetails selectOptions={currencyOptions} control={control} />
          </div>
          <button className={styles.submit} type='submit'>
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};
