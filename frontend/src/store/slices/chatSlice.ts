import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@store/store";
import { IUser } from "../api/types";

// Define a type for the slice state
interface ChatState {
  selectedChat: any | null;
  messages: any | [];
}

// Define the initial state using that type
const initialState: ChatState = {
  selectedChat: null,
  messages: [],
};

export const chatSlice = createSlice({
  name: "chat",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setChatInitialState: () => initialState,

    setSelectedChat: (
      state,
      // action: PayloadAction<{ name: string; token: string }>
      action: PayloadAction<any>
    ) => {
      state.selectedChat = action.payload;
    },
    removeSelectedChat: () => initialState,
    addMessage: (
      state,
      // action: PayloadAction<{ name: string; token: string }>
      action: PayloadAction<any>
    ) => {
      state.messages.push(action.payload);
    },
    setMessages: (
      state,
      // action: PayloadAction<{ name: string; token: string }>
      action: PayloadAction<any>
    ) => {
      state.messages = action.payload;
    },
  },
});

export const {
  setSelectedChat,
  setMessages,
  addMessage,
  removeSelectedChat,
  setChatInitialState,
} = chatSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getMessages = (state: RootState) => state.chat.messages;
export const getSelectedChat = (state: RootState) => state.chat.selectedChat;
export const getChatMessages = (state: RootState) => state.chat.messages;

export default chatSlice.reducer;
