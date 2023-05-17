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
    moveNewMsgOnTop: (
      state,
      // action: PayloadAction<{ name: string; token: string }>
      action: PayloadAction<IUser>
    ) => {
      const indexToMove: number | undefined = state.activeUsers?.findIndex(
        (person) => person._id === action.payload._id
      );
      if (!indexToMove) return;
      const [objectToMove]: IUser[] | undefined = state.activeUsers?.splice(
        indexToMove,
        1
      ); // Remove the object at the given index and store it in a variable
      if (!objectToMove) return;
      state.activeUsers?.unshift(objectToMove);
    },

    removeLoggedOutUser: (state, action: PayloadAction<IUser>) => {
      const removedUser = action.payload;
      const index = state.activeUsers?.findIndex(
        (obj: any) => obj._id === removedUser._id
      );
      if (index !== null && index !== undefined && index !== -1) {
        state.activeUsers?.splice(index, 1);
      }
    },
    addNewUser: (state, action: PayloadAction<IUser>) => {
      const newUser = action.payload;
      const index: number | undefined = state.activeUsers?.findIndex(
        (person) => person._id === action.payload._id
      );

      if ((index === null && index === undefined) || index === -1) {
        state.activeUsers?.push(newUser);
      }
    },
  },
});

export const {
  setUserInitialState,
  setActiveUsers,
  setSelectedUser,
  removeSelectedUser,
  moveNewMsgOnTop,
  removeLoggedOutUser,
  addNewUser,
} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.auth.value;
export const getActiveUsers = (state: RootState) =>
  // state.user.activeUsers
  [...state.user.activeUsers].sort((a: any, b: any) =>
    a.country.localeCompare(b.country)
  );
export const getSelectedUser = (state: RootState) => state.user.selectedUser;

export default userSlice.reducer;
