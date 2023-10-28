import { ReactNode, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Step, StepLabel, Stepper } from '@mui/material';

import { AuthFormWrapper } from '../../../../common/AuthFormWrapper/AuthFormWrapper';
import {
  RegisterCompanyFormValues,
  registerSchema,
  RegisterUserFormValues,
} from '../../../../utils/schemas/authSchema';
import useCreateUser, { UserData } from '../../hooks/useCreateUser';

import { CompanyStep } from './RegisterSteps/CompanyStep';
import { UserStep } from './RegisterSteps/UserStep';

import styles from './RegisterForm.module.scss';

const steps = ['User', 'Company'];

export const RegisterForm = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
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
    setIsLoading(true);
    await createUserMutation.mutateAsync(data);
    setIsLoading(false);
  };

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
                '.MuiStepLabel-labelContainer span': {},
                '.css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root': {
                  height: '2rem',
                  width: '2rem',
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
          {getStepContent(activeStep)}
          <div className={styles.buttons}>
            {activeStep !== 0 && (
              <button className={styles.submit} onClick={handlePrev}>
                Back
              </button>
            )}
            {activeStep !== 1 ? (
              <button className={styles.submit} type='button' onClick={handleNext}>
                Next
              </button>
            ) : (
              <button className={styles.submit} type='submit'>
                {isLoading ? 'Loading...' : 'Submit'}
              </button>
            )}
          </div>
          <p className={styles.register}>
            Arleady registered? <Link to={'/login'}>Log In</Link>
          </p>
        </form>
      </FormProvider>
    </AuthFormWrapper>
  );
};
