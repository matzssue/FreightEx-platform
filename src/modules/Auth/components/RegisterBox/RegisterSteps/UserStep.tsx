import { useFormContext } from 'react-hook-form';

import PasswordInput from '../../../../../common/Inputs/PasswordInput/PasswordInput';
import { TextFieldInput } from '../../../../../common/Inputs/TextField/TextFieldInput';

export const UserStep = () => {
  const { control } = useFormContext();

  return (
    <>
      <TextFieldInput
        defaultValue={''}
        label={'Email'}
        control={control}
        name='email'
        type='email'
        column={true}
      />
      <TextFieldInput
        defaultValue={''}
        label={'Name'}
        control={control}
        name='name'
        column={true}
      />
      <TextFieldInput
        defaultValue={''}
        label={'Surname'}
        control={control}
        name='surname'
        column={true}
      />
      <PasswordInput label={'Password'} control={control} name='password' />
      <PasswordInput label={'Confirm Password'} control={control} name='passwordConfirmation' />
    </>
  );
};
