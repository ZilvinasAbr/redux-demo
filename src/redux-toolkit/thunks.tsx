import { Dispatch } from '@reduxjs/toolkit';
import * as dogsApi from './api';
import { actions } from './slice';

export const fetchRandomDogs =
  (amount: number) => async (dispatch: Dispatch) => {
    dispatch(actions.getDogs());

    try {
      const response = await dogsApi.fetchRandomDogs(amount);

      dispatch(actions.getDogsSuccess(response));
    } catch (error) {
      const message =
        typeof error === 'string' ? error : 'Error while fetching';

      if (typeof error === 'string') {
        dispatch(actions.getDogsFailure(message));
      }
    }
  };
