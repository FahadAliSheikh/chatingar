import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "./types";
import { RootState } from "../store";
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints

export const chatApi = createApi({
  reducerPath: "chatApi",
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
    getSelectedChat: builder.mutation({
      query: (userId: string) => {
        console.log("userid in chatapi", userId);
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
        console.log("inside get chat chat messages query>>>", chatId);
        return {
          url: `/api/message/${chatId}`,
          method: "GET",
        };
      },
    }),
    sendMessage: builder.mutation({
      query: (body: { chatId: string; content: string }) => {
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
