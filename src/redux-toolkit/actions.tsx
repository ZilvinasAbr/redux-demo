import { Dispatch } from '@reduxjs/toolkit';
import * as dogsApi from './api';
import { reduxToolkitSlice } from './slice';

export const fetchRandomDogs =
  (amount: number) => async (dispatch: Dispatch) => {
    dispatch(reduxToolkitSlice.actions.getDogs());

    try {
      const response = await dogsApi.fetchRandomDogs(amount);

      dispatch(reduxToolkitSlice.actions.getDogsSuccess(response));
    } catch (error) {
      const message =
        typeof error === 'string' ? error : 'Error while fetching';

      if (typeof error === 'string') {
        dispatch(reduxToolkitSlice.actions.getDogsFailure(message));
      }
    }
  };
