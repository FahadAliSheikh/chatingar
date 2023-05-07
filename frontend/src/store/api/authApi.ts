import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    signinUser: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: "/api/user/login",
          method: "POST",
          body,
        };
      },
    }),
    signupUser: builder.mutation({
      query: (body: {
        name: string;
        email: string;
        password: string;
        age: number;
        gender: string;
        country: string;
      }) => {
        return {
          url: "/api/user/register",
          method: "POST",
          body,
        };
      },
    }),
    signupWOM: builder.mutation({
      query: (body: {
        name: string;
        password: string;
        age: number;
        gender: string;
        country: string;
      }) => {
        return {
          url: "/api/user/registerwom",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useSigninUserMutation,
  useSignupUserMutation,
  useSignupWOMMutation,
} = authApi;
