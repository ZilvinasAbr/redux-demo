import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRandomDogs } from './actions';
import { AppDispatch, RootState } from '@/common/store';

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
