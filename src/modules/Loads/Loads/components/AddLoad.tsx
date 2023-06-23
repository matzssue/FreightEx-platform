import Modal from '@mui/material/Modal';
import Autocomplete, { usePlacesWidget } from 'react-google-autocomplete';
import styles from './AddLoad.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { useRef } from 'react';
import { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { PlacesInput } from '../../../../common/Inputs/PlacesInput';
import { DateInput } from '../../../../common/Inputs/DateInput';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import CheckboxInput from '../../../../common/Inputs/Checkbox';
import { FormControlLabel } from '@mui/material';
import { TextFieldInput } from '../../../../common/Inputs/TextField';
import { SelectInput } from '../../../../common/Inputs/Select';
import { currencies } from '../sortData';
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

export const AddLoad = ({ isOpen, handleClose }: FreightModalProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      loading: '',
      unloading: '',
      loadingDate: '',
      unloadingDate: '',
      price: '',
      term: '',
      currency: '',
    },
  });

  /**
   * @deprecated we dont use it since 2012
   */
  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby='load-modal'
        aria-describedby='addLoad-modal'
      >
        <div className={styles.container}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <header>Add loading</header>
            <button className={styles.close}>
              <AiOutlineCloseSquare />
            </button>
            <div className={styles['inputs-container']}>
              <div className={styles.inputs}>
                <DateInput label={'Loading Date'} control={control} name={'loadingDate'} />
                <PlacesInput label={'Loading address'} control={control} name={'loading'} />
              </div>
              <div>
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
                <TextFieldInput label={'price'} name='price' control={control} />
                <TextFieldInput label={'payment term'} name='term' control={control} />
              </div>
              <div>
                <SelectInput options={currencies} name={'currency'} control={control}></SelectInput>
              </div>
            </div>
            <button>Submit</button>
          </form>
        </div>
      </Modal>
    </div>
  );
};
