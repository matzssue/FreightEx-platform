import { UserStep } from './UserStep';
import { CompanyStep } from './CompanyStep';
import styles from './RegisterForm.module.scss';

import { Link } from 'react-router-dom';
import { ReactNode, useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { AuthFormWrapper } from '../../common/AuthFormWrapper';
import {
  RegisterCompanyFormValues,
  RegisterUserFormValues,
  registerSchema,
} from '../../utils/schemas/authSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stepper, Step, StepLabel } from '@mui/material';
import useCreateUser, { UserData } from '../../hooks/useCreateUser';

export const RegisterForm = () => {
  const steps = ['User', 'Company'];
  const [activeStep, setActiveStep] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const createUserMutation = useCreateUser();
  const currentSchema = registerSchema[activeStep];

  const defaultValues = {
    name: '',
    surname: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    companyName: '',
    vatId: '',
  };

  const methods = useForm<typeof defaultValues>({
    shouldUnregister: false,
    defaultValues,
    //@ts-ignore
    resolver: yupResolver<RegisterUserFormValues | RegisterCompanyFormValues>(currentSchema),
    mode: 'onChange',
  });
  const { handleSubmit, trigger } = methods;

  function getStepContent(step: ReactNode | string) {
    switch (step) {
      case 0:
        return <UserStep />;
      case 1:
        return <CompanyStep />;
      case 2:
      default:
        return 'Unknown step';
    }
  }

  const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isStepValid = await trigger();
    if (isStepValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handlePrev = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit: SubmitHandler<UserData> = async (data) => {
    try {
      setIsLoading(true);
      setError(null);
      createUserMutation.mutateAsync(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  if (isLoading) return <div>Loading..</div>;
  console.log(activeStep);
  return (
    <AuthFormWrapper hideLogo={true}>
      <Stepper sx={{ width: '60%', alignSelf: 'center', padding: '1rem' }} activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step
              sx={{
                '.css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-active': { color: '#2a4354' },
                '.MuiStepLabel-labelContainer span': {
                  fontSize: '1.5rem',
                },
                '.css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root': {
                  height: '2.5rem',
                  width: '2.5rem',
                },
              }}
              key={label}
              {...stepProps}
            >
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {error && <div>{error}</div>}
          {getStepContent(activeStep)}
          <div className={styles.buttons}>
            <button className={styles.submit} onClick={handlePrev} disabled={activeStep === 0}>
              Back
            </button>
            {activeStep !== 1 ? (
              <button className={styles.submit} type='button' onClick={handleNext}>
                Next
              </button>
            ) : (
              <button className={styles.submit} type='submit'>
                Submit
              </button>
            )}
            <p className={styles.register}>
              Arleady registered? <Link to={'/login'}>Log In</Link>
            </p>
          </div>
        </form>
      </FormProvider>
    </AuthFormWrapper>
  );
};
