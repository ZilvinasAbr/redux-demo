import { DogsResponse } from '@/common/types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface DogsState {
  dogUrls: string[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: DogsState = {
  dogUrls: null,
  isLoading: false,
  error: null,
};

export const reduxToolkitSlice = createSlice({
  name: 'redux-toolkit-example',
  initialState,
  reducers: {
    getDogs: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getDogsSuccess: (state, action: PayloadAction<DogsResponse>) => {
      state.isLoading = false;
      state.dogUrls = action.payload.message;
    },
    getDogsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.dogUrls = null;
      state.error = action.payload;
    },
  },
});

export const actions = reduxToolkitSlice.actions;
