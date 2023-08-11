import Modal from '@mui/material/Modal';
import styles from './AddLoad.module.scss';
import { useForm } from 'react-hook-form';
import { currencies } from '../../loadData';
import { LoadHeader } from './LoadHeader';
import { yupResolver } from '@hookform/resolvers/yup';
import AlertDialog from '../../../../../common/Dialog/AlertDialog';
import { useAppSelector, useAppDispatch } from '../../../../../store/hooks';
import { closeModal, openDialog, closeDialog } from '../../../../../store/reducers/modalSlice';
import { addLoadSchema, AddLoadValues } from '../../../../../utils/schemas/addLoadSchema';
import { addLoad } from '../../../../../utils/api/supabase/Loads/addLoad';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PlaceAndDateSearch } from './PlaceAndDateSearch';
import { CargoDetails } from './CargoDetails';
import { VehicleDetails } from './VehicleDetails';
import { PaymentDetails } from './PaymentDetails';
import { useUserContext } from '../../../../../store/contexts/UserContext';
import { AddLoadData } from '../../../../../utils/api/supabase/types';
import { toast } from 'react-toastify';
export const AddLoad = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { userData } = useUserContext();

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
      toast.success('Load successfully added');
    },
    onError: () => {
      toast.error('Something went wrong, load not added');
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
          content={'This will cause the form data to be reset'}
          description={'add-load-form-description'}
          agreeHandler={() => closeAllHandler()}
          open={isDialogOpen}
          close={() => dispatch(closeDialog())}
        />
        <LoadHeader onClick={() => dispatch(openDialog())} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles['inputs-container']}>
            <PlaceAndDateSearch control={control} setValue={setValue} />
            <CargoDetails control={control} />
            <VehicleDetails control={control} errors={errors} />
            <PaymentDetails selectOptions={currencies} control={control} />
          </div>
          <button className={styles.submit} type='submit'>
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};
