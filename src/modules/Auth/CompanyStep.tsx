import styles from './CompanyStep.module.scss';
import { useForm, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterCompanyFormValues, registerCompanySchema } from '../../utils/schemas/authSchema';
import { AuthFormWrapper } from '../../common/AuthFormWrapper';
import { TextFieldInput } from '../../common/Inputs/TextFieldInput';
import { useDispatch } from 'react-redux';
import { nextStep, prevStep, setData } from '../../store/reducers/registerUserSlice';
export const CompanyStep = () => {
  const { control } = useFormContext();
  return (
    <>
      <TextFieldInput
        defaultValue={''}
        label={'Company name'}
        control={control}
        name='companyName'
        row={true}
      />
      <TextFieldInput defaultValue={''} label={'VATID'} control={control} name='vatId' row={true} />
    </>
  );
};
