import { Dispatch } from '@reduxjs/toolkit';
import { DogsResponse } from '@/common/types';
import { ActionType, createStandardAction } from 'typesafe-actions';
import { ImagesContainer } from '@/components/images-container';
import { getType } from 'typesafe-actions';
import { Reducer } from '@reduxjs/toolkit';

/** Actions */

const getDogs = createStandardAction('plain-redux/GET_DOGS')();

const getDogsSuccess = createStandardAction(
  'plain-redux/GET_DOGS_SUCCESS',
)<DogsResponse>();

const getDogsFailure = createStandardAction(
  'plain-redux/GET_DOGS_FAILURE',
)<string>();

const actions = { getDogs, getDogsSuccess, getDogsFailure };

export type PlainReduxActions = ActionType<typeof actions>;

export { actions };

/** API */

const baseUrl = 'https://dog.ceo/api/';

export const fetchRandomDogsApi = async (
  amount: number,
): Promise<DogsResponse> => {
  try {
    const response = await fetch(`${baseUrl}breeds/image/random/${amount}`);

    if (!response.ok) {
      throw new Error();
    }

    const dogs: DogsResponse = await response.json();

    return dogs;
  } catch (error) {
    throw new Error('Error while fetching');
  }
};

/** Components */

export const Dogs = ({ amount }: { amount: number }) => {
  const { data, error, isLoading } = useGetRandomDogsQuery(amount, {
    skip: amount <= 0,
  });

  if (error) {
    return <div>Error: Could not fetch dogs</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Error</div>;
  }

  return <ImagesContainer imageUrls={data} />;
};

/** Reducer */

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

export const reducer: Reducer<ReducerState, PlainReduxActions, ReducerState> = (
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

/** Thunk */

export const fetchRandomDogs =
  (amount: number) => async (dispatch: Dispatch) => {
    dispatch(actions.getDogs());

    try {
      const response = await fetchRandomDogsApi(amount);

      dispatch(actions.getDogsSuccess(response));
    } catch (error) {
      const message =
        typeof error === 'string' ? error : 'Error while fetching';

      if (typeof error === 'string') {
        dispatch(actions.getDogsFailure(message));
      }
    }
  };

/** Query Hook */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/common/store';

export const useGetRandomDogsQuery = (
  amount: number,
  { skip }: { skip?: boolean },
) => {
  const dispatch = useDispatch<AppDispatch>();
  const { dogUrls, error, isLoading } = useSelector(
    (state: RootState) => state.plainRedux,
  );

  useEffect(() => {
    if (!skip) {
      dispatch(fetchRandomDogs(amount));
    }
  }, [skip, amount, dispatch]);

  return { data: dogUrls, error, isLoading };
};
