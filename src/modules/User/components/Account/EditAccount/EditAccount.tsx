import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import styles from './EditAccount.module.scss';
import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { useUserContext } from '../../../../../store/contexts/UserContext';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  ChangePasswordFormValues,
  changeEmailSchema,
  changePasswordSchema,
} from '../../../../../utils/schemas/authSchema';

import PasswordInput from '../../../../../common/Inputs/PasswordInput/PasswordInput';

import { TextFieldInput } from '../../../../../common/Inputs/TextField/TextFieldInput';
import { useChangeCredientials } from '../../../../../hooks/useChangeCredentials';
import { changeAvatar } from '../../../../../utils/api/supabase/User/changeAvatar';

interface Event<T = EventTarget> {
  target: T;
  // ...
}
type FormData = {
  password: string;
  passwordConfirmation: string;
  email: string;
};

export const EditAccount = () => {
  // const { changeUserAvatar } = useUserContext();
  const { changeUserInformations } = useUserContext();

  const [currentOption, setCurrentOption] = useState('');
  const [open, setOpen] = useState(false);

  const schema = currentOption === 'password' ? changePasswordSchema : changeEmailSchema;

  const defaultValues: FormData = {
    password: '',
    passwordConfirmation: '',
    email: '',
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const handleChangeAvatar = (e: Event<HTMLInputElement>) => {
    if (!e.target.files) return;
    // changeUserAvatar(e.target.files[0]);
    changeUserInformations(changeAvatar, e.target.files[0]);
  };

  const handleUserCredentialsChange = (e: Event) => {
    const target = e?.target as HTMLButtonElement;
    setCurrentOption(target.id);
    handleOpen();
  };

  const { handleSubmit, control, reset } = useForm<typeof defaultValues>({
    defaultValues: defaultValues,
    //@ts-ignore
    resolver: yupResolver<ChangeEmailFormValue | ChangePasswordFormValues>(schema),
  });

  const onSubmit = (data: FormData) => {
    if (currentOption === 'password') {
      useChangeCredientials(currentOption, data.password);
    }
    if (currentOption === 'email') {
      useChangeCredientials(currentOption, data.email);
    }
    reset();
    handleClose();
  };

  return (
    <div>
      <Dialog
        aria-describedby={`change-${currentOption}-dialog`}
        draggable={true}
        open={open}
        onClose={handleClose}
      >
        <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <>
            <DialogTitle>Change {currentOption} </DialogTitle>
            <form className={styles['password-form']} onSubmit={handleSubmit(onSubmit)}>
              {currentOption === 'password' && (
                <>
                  <PasswordInput name={'password'} label={'New Password'} control={control} />
                  <PasswordInput
                    name={'passwordConfirmation'}
                    label={'Confirm Password'}
                    control={control}
                  />
                </>
              )}
              {currentOption === 'email' && (
                <TextFieldInput
                  defaultValue={''}
                  label={'New Email'}
                  name='email'
                  control={control}
                />
              )}
              <div className={styles.buttons}>
                <button type='button' onClick={handleClose}>
                  Cancel
                </button>
                <button type='submit'>Confirm</button>
              </div>
            </form>
          </>
        </DialogContent>
      </Dialog>
      <div className={styles['account-buttons']}>
        <label className={styles['avatar-label']} htmlFor='avatar-upload'>
          Change Avatar
        </label>
        <input
          id='avatar-upload'
          onChange={(e) => handleChangeAvatar(e)}
          type='file'
          accept='image/*'
        />
        <button id='password' onClick={(e) => handleUserCredentialsChange(e)}>
          Change Password
        </button>
        <button id='email' onClick={(e) => handleUserCredentialsChange(e)}>
          Change Email
        </button>
      </div>
    </div>
  );
};
