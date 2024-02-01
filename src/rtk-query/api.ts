import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Response = {
  message: string[];
  status: string;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dog.ceo/api/' }),
  endpoints: (builder) => ({
    getRandomWesthighlandTerriers: builder.query<Response, number>({
      query: (amount) => `breed/terrier/westhighland/images/random/${amount}`,
    }),
  }),
});

export const { useGetRandomWesthighlandTerriersQuery } = api;
