import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ComponentType = "UserSearchForm" | "Inbox" | "ChatBox";

interface DisplayState {
  displayedComponent: ComponentType;
}

const initialState: DisplayState = {
  displayedComponent: "UserSearchForm",
};

export const displaySlice = createSlice({
  name: "display",
  initialState,
  reducers: {
    setDisplayedComponent: (state, action: PayloadAction<ComponentType>) => {
      state.displayedComponent = action.payload;
    },
  },
});

export const { setDisplayedComponent } = displaySlice.actions;

export default displaySlice.reducer;
