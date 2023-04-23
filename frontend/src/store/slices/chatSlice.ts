import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@store/store";
import { IUser } from "../api/types";

// Define a type for the slice state
interface ChatState {
  chats: IUser[] | null;
  selectedChat: any | null;
}

// Define the initial state using that type
const initialState: ChatState = {
  chats: [],
  selectedChat: null,
};

export const chatSlice = createSlice({
  name: "chat",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSelectedChat: (
      state,
      // action: PayloadAction<{ name: string; token: string }>
      action: PayloadAction<any>
    ) => {
      state.selectedChat = action.payload;
    },
  },
});

export const { setSelectedChat } = chatSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.auth.value;
export const getSelectedChat = (state: RootState) => state.chat.selectedChat;
// export const getSelectedUser = (state: RootState) => state.user.selectedUser;

export default chatSlice.reducer;
