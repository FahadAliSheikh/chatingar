import { configureStore } from "@reduxjs/toolkit";
import displayReducer from "./slices/displaySlice";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import chatReducer from "./slices/chatSlice";

import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import { chatApi } from "./api/chatApi";

import { setupListeners } from "@reduxjs/toolkit/dist/query";
export const store = configureStore({
  reducer: {
    display: displayReducer,
    auth: authReducer,
    user: userReducer,
    chat: chatReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(authApi.middleware),
    getDefaultMiddleware({}).concat([
      authApi.middleware,
      userApi.middleware,
      chatApi.middleware,

      // Add the PostApi middleware to the store
      // postApi.middleware,
    ]),
});

// export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
