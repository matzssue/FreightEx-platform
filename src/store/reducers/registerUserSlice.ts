import { createSlice } from '@reduxjs/toolkit';
import { RegisterCompanyFormValues, RegisterUserFormValues } from '../../utils/schemas/authSchema';

type InitialState = {
  user: RegisterUserFormValues;
  company: RegisterCompanyFormValues;
  currentStep: number;
};

const initialState: InitialState = {
  user: {
    name: '',
    surname: '',
    imgUrl: '',
    email: '',
    password: '',
  },
  company: {
    companyName: '',
    vatId: '',
  },
  currentStep: 0,
};

export const registerSlice = createSlice({
  name: 'register', //nazwa reducera
  initialState,
  reducers: {
    setData: (state, action) => {
      const { entityType, data } = action.payload;
      console.log(action);
      if (entityType === 'user') {
        state.user = data;
      } else if (entityType === 'company') {
        state.company = data;
      }
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      if (state.currentStep <= 0) {
        return state;
      } else {
        state.currentStep -= 1;
      }
    },
  },
});

export const { setData, nextStep, prevStep } = registerSlice.actions;

export default registerSlice.reducer;
