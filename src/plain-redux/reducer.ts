import { getType } from 'typesafe-actions';
import { PlainReduxActions, actions } from './actions';
import { Reducer } from '@reduxjs/toolkit';

export interface ReducerState {
  dogUrls: string[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ReducerState = {
  dogUrls: null,
  isLoading: false,
  error: null,
};

const reducer: Reducer<ReducerState, PlainReduxActions, ReducerState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case getType(actions.getDogs):
      return { ...state, isLoading: true, error: null };
    case getType(actions.getDogsSuccess):
      return { ...state, isLoading: false, dogUrls: action.payload.message };
    case getType(actions.getDogsFailure):
      return {
        ...state,
        isLoading: false,
        dogUrls: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

export { reducer };
