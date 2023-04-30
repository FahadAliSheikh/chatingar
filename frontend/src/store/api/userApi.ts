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
      const user = (getState() as RootState).auth.user;
      if (user) {
        // include token in req header
        headers.set("authorization", `Bearer ${user.token}`);
        return headers;
      }
    },
  }),
  endpoints: (builder) => ({
    getActiveUsers: builder.query({
      query: ({ name, gender, country }) => {
        console.log(gender);
        console.log("inside get active users query");
        let url = "/api/user/?";
        if (name) {
          url = url + "name=" + name + "&";
        }
        if (gender) {
          console.log("gender is selected");
          url = url + "gender=" + gender + "&";
        }
        if (country) {
          url = url + "country=" + country + "&";
        }
        console.log(url);
        return {
          url: url,
          method: "GET",
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetActiveUsersQuery } = userApi;
