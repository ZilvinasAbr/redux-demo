import { AppDispatch, RootState } from '@/common/store';
import { DogsResponse } from '@/common/types';
import { ImagesContainer } from '@/components/images-container';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Dispatch, createSlice } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

/** Component */

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

/** Slice */

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

const { actions } = reduxToolkitSlice;

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

export const useGetRandomDogsQuery = (
  amount: number,
  { skip }: { skip?: boolean },
) => {
  const dispatch = useDispatch<AppDispatch>();
  const { dogUrls, error, isLoading } = useSelector(
    (state: RootState) => state.reduxToolkit,
  );

  useEffect(() => {
    if (!skip) {
      dispatch(fetchRandomDogs(amount));
    }
  }, [skip, amount, dispatch]);

  return { data: dogUrls, error, isLoading };
};
