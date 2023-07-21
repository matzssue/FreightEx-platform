import styles from './UserStep.module.scss';
import PasswordInput from '../../common/Inputs/PasswordInput';
import { useForm, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerUserSchema } from '../../utils/schemas/authSchema';
import { RegisterUserFormValues } from '../../utils/schemas/authSchema';
import { AuthFormWrapper } from '../../common/AuthFormWrapper';
import { TextFieldInput } from '../../common/Inputs/TextFieldInput';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { nextStep, setData } from '../../store/reducers/registerUserSlice';
import { useAppSelector } from '../../store/hooks';
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
        row={true}
      />
      <TextFieldInput defaultValue={''} label={'Name'} control={control} name='name' row={true} />
      <TextFieldInput
        defaultValue={''}
        label={'Surname'}
        control={control}
        name='surname'
        row={true}
      />
      <PasswordInput label={'Password'} control={control} name='password' />
      <PasswordInput label={'Confirm Password'} control={control} name='passwordConfirmation' />
    </>
  );
};
