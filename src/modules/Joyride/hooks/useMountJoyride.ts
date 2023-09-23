import { useState } from 'react';
import { useJoyrideContext } from 'src/store/contexts/JoyRideContext';
import { useMount } from 'react-use';

export const useMountJoyride = (index: number) => {
  const [showLoader, setLoader] = useState(true);

  const {
    setState,
    state: { tourActive },
  } = useJoyrideContext();

  useMount(() => {
    if (tourActive) {
      setTimeout(() => {
        setLoader(false);
        setState({ run: true, stepIndex: index });
      }, 1200);
    }
  });

  const showJoyrideLoader = tourActive && showLoader;

  return { showJoyrideLoader };
};
