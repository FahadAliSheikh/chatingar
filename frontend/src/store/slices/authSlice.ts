import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@store/store";
import { IUser } from "../api/types";

// Define a type for the slice state
interface AuthState {
  user: IUser | null;
  // name: string | null;
  // token: string | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  user: null,
  // name: null,
  // token: null,
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    logout: () => initialState,
    setCredentials: (
      state,
      // action: PayloadAction<{ name: string; token: string }>
      action: PayloadAction<IUser>
    ) => {
      state.user = action.payload;
    },
  },
});

export const { logout, setCredentials } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.auth.value;
export const selectCurrentUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
