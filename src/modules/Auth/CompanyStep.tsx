import styles from './CompanyStep.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterCompanyFormValues, registerCompanySchema } from '../../utils/schemas/authSchema';
import { AuthFormWrapper } from '../../common/AuthFormWrapper';
import { TextFieldInput } from '../../common/Inputs/TextFieldInput';
import { useDispatch } from 'react-redux';
import { nextStep, prevStep, setData } from '../../store/reducers/registerUserSlice';
export const CompanyStep = () => {
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm({
    resolver: yupResolver<RegisterCompanyFormValues>(registerCompanySchema),
  });

  const onSubmit = (data: RegisterCompanyFormValues) => {
    dispatch(setData({ entityType: 'company', data }));
    dispatch(nextStep());
  };

  return (
    <AuthFormWrapper hideLogo={true} onSubmit={handleSubmit(onSubmit)}>
      <TextFieldInput
        defaultValue={''}
        label={'Company name'}
        control={control}
        name='companyName'
        row={true}
      />
      <TextFieldInput defaultValue={''} label={'VATID'} control={control} name='vatId' row={true} />

      <div className={styles.buttons}>
        <button type='button' onClick={() => dispatch(prevStep())} className={styles.back}>
          Back
        </button>
        <button type='submit' className={styles.submit}>
          Register
        </button>
      </div>
    </AuthFormWrapper>
  );
};
