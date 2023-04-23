import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "./types";
import { RootState } from "../store";
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers, { getState }) => {
      console.log("inside header");
      const user = (getState() as RootState).auth.user;
      if (user) {
        console.log("inside user");

        // include token in req header
        headers.set("authorization", `Bearer ${user.token}`);
        return headers;
      }
    },
  }),
  endpoints: (builder) => ({
    getActiveUsers: builder.query<IUser[], void>({
      // providesTags: ["Users"],
      // providesTags:[]
      query: () => {
        return {
          url: "/api/user",
          method: "GET",
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetActiveUsersQuery } = userApi;
