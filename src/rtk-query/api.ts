import { DogsResponse } from '@/common/types';
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
