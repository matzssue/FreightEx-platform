import Joyride, { CallBackProps } from 'react-joyride';
import { useNavigate } from 'react-router-dom';
import { useMount } from 'react-use';
import { Container } from '@mui/material';
import { useJoyrideContext } from 'src/store/contexts/JoyRideContext';

import { joyrideSteps } from '../../constants/joyrideSteps';

export default function JoyrideWrapper() {
  const {
    setState,
    state: { run, stepIndex, steps },
  } = useJoyrideContext();
  const navigate = useNavigate();
  useMount(() => {
    setState({
      steps: joyrideSteps,
    });
  });

  const handleCallback = (data: CallBackProps) => {
    const { action, index, type } = data;
    if (action === 'close') {
      const location = window.location.pathname;
      setState({ run: false, stepIndex: 0, tourActive: false });
      navigate(location);
    }

    if (type === 'step:after' && index === 0) {
      if (action === 'next') {
        setState({ run: true, stepIndex: stepIndex + 1 });
      } else {
        navigate('/loads');
      }
    }
    if (type === 'step:after' && [1, 2].includes(index)) {
      if (action === 'next') {
        setState({ run: true, stepIndex: stepIndex + 1 });
      } else if (action === 'prev') {
        setState({ stepIndex: stepIndex - 1 });
      }
    } else if (type === 'step:after' && index === 3) {
      if (action === 'next') {
        setState({ run: false, stepIndex: 4 });
        navigate('/fleet');
      } else if (action === 'prev') {
        setState({ stepIndex: stepIndex - 1 });
      }
    } else if (type === 'step:after' && index === 4) {
      if (action === 'next') {
        setState({ run: false, stepIndex: 5 });
        navigate('/orders');
      } else if (action === 'prev') {
        navigate('/loads');
        setState({ stepIndex: stepIndex - 1 });
      }
    } else if (type === 'step:after' && index === 5) {
      if (action === 'next') {
        setState({ run: false, stepIndex: 6 });
        navigate('/orders/published');
      } else if (action === 'prev') {
        navigate('/fleet');
        setState({ stepIndex: stepIndex - 1 });
      }
    } else if (type === 'step:after' && index === 6) {
      if (action === 'next') {
        setState({ run: false, stepIndex: 7 });
        navigate('/orders/received');
      } else if (action === 'prev') {
        navigate('/orders');
        setState({ stepIndex: stepIndex - 1 });
      }
    } else if (type === 'step:after' && index === 7) {
      if (action === 'next') {
        setState({ run: false, stepIndex: 8 });
        navigate('/invoices');
      } else if (action === 'prev') {
        navigate('/orders/published');
        setState({ stepIndex: stepIndex - 1 });
      }
    } else if (type === 'step:after' && index === 8) {
      if (action === 'next') {
        setState({ stepIndex: 9 });
      } else if (action === 'prev') {
        navigate('/orders/received');
        setState({ run: true, stepIndex: stepIndex - 1 });
      }
    } else if (index === 9 && type === 'step:after') {
      if (action === 'prev') {
        setState({ stepIndex: stepIndex - 1 });
      } else {
        setState({ run: false, stepIndex: 0, tourActive: false });
      }
    }
  };

  return (
    <Container>
      <Joyride
        callback={handleCallback}
        continuous
        showSkipButton
        showProgress
        run={run}
        stepIndex={stepIndex}
        steps={steps}
        styles={{
          options: {
            arrowColor: 'black',
            backgroundColor: 'whitesmoke',
            primaryColor: '#2a4354',
            textColor: 'black',
          },
        }}
      />
    </Container>
  );
}
