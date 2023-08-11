import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import styles from './EditAccount.module.scss';
import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { useUserContext } from '../../store/contexts/UserContext';

import { yupResolver } from '@hookform/resolvers/yup';
import { ChangePasswordFormValues, changePasswordSchema } from '../../utils/schemas/authSchema';

import PasswordInput from '../../common/Inputs/PasswordInput';
import { changePassword } from '../../utils/api/supabase/User/changePassword';

interface Event<T = EventTarget> {
  target: T;
  // ...
}

export const EditAccount = () => {
  const { changeUserAvatar } = useUserContext();

  const [currentOption, setCurrentOption] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const handleChangeAvatar = (e: Event<HTMLInputElement>) => {
    if (!e.target.files) return;
    changeUserAvatar(e.target.files[0]);
  };
  const handleChangePassword = (e: Event) => {
    const target = e?.target as HTMLButtonElement;
    setCurrentOption(target.id);
    handleOpen();
  };

  const handleDeleteAccount = (e: Event) => {
    const target = e?.target as HTMLButtonElement;
    setCurrentOption(target.id);
    handleOpen();
  };

  const { handleSubmit, control, reset } = useForm({
    defaultValues: { password: '', passwordConfirmation: '' },
    resolver: yupResolver<ChangePasswordFormValues>(changePasswordSchema),
  });

  const onSubmit = (data: ChangePasswordFormValues) => {
    changePassword(data.password);
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
          {currentOption === 'password' && (
            <>
              <DialogTitle>Change password </DialogTitle>
              <form className={styles['password-form']} onSubmit={handleSubmit(onSubmit)}>
                <PasswordInput name={'password'} label={'New Password'} control={control} />
                <PasswordInput
                  name={'passwordConfirmation'}
                  label={'Confirm Password'}
                  control={control}
                />
                <div className={styles.buttons}>
                  <button type='button' onClick={handleClose}>
                    Cancel
                  </button>
                  <button type='submit'>Confirm</button>
                </div>
              </form>
            </>
          )}
          {currentOption === 'delete' && (
            <>
              <DialogTitle>Delete account </DialogTitle>
              <div>
                Are you sure you want to delete your account? There will be no way to recover it
              </div>
              <div className={styles.buttons}>
                <button type='button' onClick={handleClose}>
                  Cancel
                </button>
                <button type='submit'>Confirm</button>
              </div>
            </>
          )}
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
        <button id='password' onClick={(e) => handleChangePassword(e)}>
          Change Password
        </button>
        <button id='delete' onClick={handleDeleteAccount}>
          Delete account
        </button>
      </div>
    </div>
  );
};
