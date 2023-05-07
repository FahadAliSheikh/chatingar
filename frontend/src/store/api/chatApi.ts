import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "./types";
import { RootState } from "../store";
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const user = (getState() as RootState).auth.user;
      if (user) {
        // include token in req header
        headers.set("authorization", `Bearer ${user.token}`);
        return headers;
      }
    },
  }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getSelectedChat: builder.mutation({
      query: (userId: string) => {
        return {
          url: "/api/chat",
          method: "POST",
          body: {
            userId,
          },
        };
      },
    }),
    getChatMessages: builder.query({
      query: ({ chatId, sessionId }) => {
        console.log("inside query=============");
        console.log(`/api/message/${chatId}`);
        return {
          url: `/api/message/${chatId}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 0, // disable caching
    }),
    sendMessage: builder.mutation({
      query: (body: { chatId: string; content: string }) => {
        console.log("message body", body);
        return {
          url: "/api/message",
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
  useGetSelectedChatMutation,
  useGetChatMessagesQuery,
  useSendMessageMutation,
} = chatApi;

export const { reducer } = chatApi;
