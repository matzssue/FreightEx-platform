import { UserStep } from './UserStep';
import { CompanyStep } from './CompanyStep';
import styles from './RegisterForm.module.scss';

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { AuthFormWrapper } from '../../common/AuthFormWrapper';
import { registerSchema } from '../../utils/schemas/authSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stepper, Step, StepLabel } from '@mui/material';
import useCreateUser from '../../hooks/useCreateUser';

export const RegisterForm = () => {
  const steps = ['User', 'Company'];
  const [activeStep, setActiveStep] = useState(0);
  const defaultValues = {
    name: '',
    surname: '',
    imgUrl: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    companyName: '',
    vatId: '',
  };
  const createUserMutation = useCreateUser();
  const currentSchema = registerSchema[activeStep];
  const methods = useForm({
    shouldUnregister: false,
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(currentSchema),
  });
  const { handleSubmit, reset, trigger } = methods;

  function getStepContent(step) {
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

  const handleNext = async (e) => {
    e.preventDefault();
    const isStepValid = await trigger();
    if (isStepValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handlePrev = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const onSubmit = (data) => {
    createUserMutation.mutateAsync(data);
  };
  // return <>{Steps[currentStep as keyof typeof Steps]}</>;
  console.log(activeStep);
  return (
    <AuthFormWrapper hideLogo={true}>
      <Stepper sx={{ width: '60%', alignSelf: 'center', padding: '1rem' }} activeStep={activeStep}>
        {steps.map((label, index) => {
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
        <form>
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
              <button className={styles.submit} type='submit' onClick={handleSubmit(onSubmit)}>
                Submit
              </button>
            )}
            <p className={styles.register}>
              Arleady registered? <Link to={'/'}>Log In</Link>
            </p>
          </div>
        </form>
      </FormProvider>
    </AuthFormWrapper>
  );
};
