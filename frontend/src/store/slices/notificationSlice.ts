import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@store/store";

// Define a type for the slice state
interface NotificationState {
  counter: number | 0;
  inbox: any[];
}

// Define the initial state using that type
const initialState: NotificationState = {
  counter: 0,
  inbox: [],
};

export const notificationSlice = createSlice({
  name: "notification",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setNotifInitialState: () => initialState,

    addNotification: (state) => {
      state.counter += 1;
    },
    addToInbox: (state, action: PayloadAction<any>) => {
      !state.inbox.some((sender) => sender._id === action.payload.sender._id) &&
        state.inbox.push(action.payload.sender);
    },
    removeFromInbox: (state, action: PayloadAction<any>) => {
      state.inbox = state.inbox.filter(
        (sender) => sender?._id !== action.payload._id
      );
    },
  },
});

export const {
  addNotification,
  addToInbox,
  removeFromInbox,
  setNotifInitialState,
} = notificationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.auth.value;
// export const getNotification = (state: RootState) => state.notification.counter;
export const getInbox = (state: RootState) => state.notification.inbox;

export default notificationSlice.reducer;
