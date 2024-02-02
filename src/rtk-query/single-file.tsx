/** Api */

import { DogsResponse } from '@/common/types';
import { ImagesContainer } from '@/components/images-container';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'rtk-query-api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dog.ceo/api/' }),
  endpoints: (builder) => ({
    getRandomDogs: builder.query<DogsResponse, number>({
      query: (amount) => `breeds/image/random/${amount}`,
    }),
  }),
});

export const { useGetRandomDogsQuery } = api;

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

  return <ImagesContainer imageUrls={data.message} />;
};
