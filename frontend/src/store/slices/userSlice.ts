import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@store/store";
import { IUser } from "../api/types";

// Define a type for the slice state
interface UserState {
  activeUsers: IUser[] | null;
  selectedUser: IUser | null;
  // name: string | null;
  // token: string | null;
}

// Define the initial state using that type
const initialState: UserState = {
  activeUsers: [],
  selectedUser: null,
};

export const userSlice = createSlice({
  name: "users",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUserInitialState: () => initialState,
    removeSelectedUser: (state) => {
      state.selectedUser = null;
    },
    setActiveUsers: (
      state,
      // action: PayloadAction<{ name: string; token: string }>
      action: PayloadAction<IUser[]>
    ) => {
      state.activeUsers = action.payload;
    },
    setSelectedUser: (
      state,
      // action: PayloadAction<{ name: string; token: string }>
      action: PayloadAction<IUser>
    ) => {
      state.selectedUser = action.payload;
    },
  },
});

export const {
  setUserInitialState,
  setActiveUsers,
  setSelectedUser,
  removeSelectedUser,
} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.auth.value;
export const getActiveUsers = (state: RootState) => state.user.activeUsers;
export const getSelectedUser = (state: RootState) => state.user.selectedUser;

export default userSlice.reducer;
