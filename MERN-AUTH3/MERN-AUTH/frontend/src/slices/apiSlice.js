import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

//const baseQuery = fetchBaseQuery({ baseUrl: '' });
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL, // Ensure this points to your backend
  credentials: 'include',  // This allows cookies to be sent
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});
