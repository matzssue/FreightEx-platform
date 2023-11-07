import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import PasswordInput from 'src/common/Inputs/PasswordInput/PasswordInput';
import { TextFieldInput } from 'src/common/Inputs/TextField/TextFieldInput';
import { useUserContext } from 'src/store/contexts/UserContext';
import { changeAvatar } from 'src/utils/api/supabase/User/changeAvatar';

import {
  changeEmailSchema,
  ChangePasswordFormValues,
  changePasswordSchema,
} from '../../../../../utils/schemas/authSchema';
import { changeCredientials } from '../../../utils/changeCredentials';

import styles from './EditAccount.module.scss';

interface Event<T = EventTarget> {
  target: T;
  // ...
}
type FormData = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

export const EditAccount = () => {
  // const { changeUserAvatar } = useUserContext();
  const { changeUserInformations, userId } = useUserContext();
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
      changeCredientials(currentOption, data.password);
    }
    if (currentOption === 'email') {
      changeCredientials(currentOption, data.email);
    }
    reset();
    handleClose();
  };

  return (
    <>
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
        <button
          disabled={userId === import.meta.env.VITE_TEST_USERID}
          id='password'
          onClick={(e) => handleUserCredentialsChange(e)}
        >
          Change Password{' '}
          {userId === import.meta.env.VITE_TEST_USERID && '(Disabled for test user)'}
        </button>
        <button
          disabled={userId === import.meta.env.VITE_TEST_USERID}
          id='email'
          onClick={(e) => handleUserCredentialsChange(e)}
        >
          Change Email {userId === import.meta.env.VITE_TEST_USERID && '(Disabled for test user)'}
        </button>
      </div>
    </>
  );
};
