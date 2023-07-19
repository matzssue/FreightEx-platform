import styles from './UserStep.module.scss';
import PasswordInput from '../../common/Inputs/PasswordInput';
import { useForm } from 'react-hook-form';
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
  const dispatch = useDispatch();
  const { user, currentStep } = useAppSelector((state) => state.register);
  const { handleSubmit, control } = useForm({
    resolver: yupResolver<RegisterUserFormValues>(registerUserSchema),
  });

  const onSubmit = (data: RegisterUserFormValues) => {
    dispatch(
      setData({
        entityType: 'user',
        data: {
          email: data.email,
          imgUrl: '',
          name: data.name,
          password: data.password,
          surname: data.surname,
        },
      }),
    );
    console.log(data);
    console.log(user);
    console.log(currentStep);
    dispatch(nextStep());
  };

  return (
    <AuthFormWrapper hideLogo={true} onSubmit={handleSubmit(onSubmit)}>
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
      <div className={styles.buttons}>
        <button type='submit' className={styles.submit}>
          Continue
        </button>
        <p className={styles.register}>
          Arleady registered? <Link to={'/'}>Log In</Link>
        </p>
      </div>
    </AuthFormWrapper>
  );
};
