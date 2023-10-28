import { createContext, useMemo } from 'react';
import { useContext } from 'react';
import { Step } from 'react-joyride';
import { useSetState } from 'react-use';

type AppState = {
  run: boolean;
  stepIndex: number;
  steps: Step[];
  tourActive: boolean;
};

const appState = {
  run: false,
  stepIndex: 0,
  steps: [],
  tourActive: false,
};

export const JoyRideContext = createContext({
  state: appState,
  setState: () => undefined,
});

JoyRideContext.displayName = 'JoyRideContext';
export const JoyRideContextProvider = (props: any) => {
  const [state, setState] = useSetState(appState);

  const value = useMemo(
    () => ({
      state,
      setState,
    }),
    [setState, state],
  );

  return <JoyRideContext.Provider value={value} {...props} />;
};

export function useJoyrideContext(): {
  setState: (patch: Partial<AppState> | ((previousState: AppState) => Partial<AppState>)) => void;
  state: AppState;
} {
  const context = useContext(JoyRideContext);

  if (!context) {
    throw new Error('useJoyrideContext must be used within a JoyrideContextProvider');
  }

  return context;
}
