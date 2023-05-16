import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// export type ComponentType = "UserSearchForm" | "Inbox" | "ChatBox";

// interface DisplayState {
//   displayedComponent: ComponentType;
// }

const initialState: any = {
  userDiveClasses: [
    "h-full flex flex-col w-full lg:w-3/5",
    "bg-purple-100 hidden lg:block w-full h-full rounded-xl text-black",
  ],
};

export const displaySlice: any = createSlice({
  name: "display",
  initialState,
  reducers: {
    setDisplayedClasses: (state, action: PayloadAction<any>) => {
      console.log("inside state change");
      console.log(action.payload);
      state.userDiveClasses = action.payload;
    },
  },
});

export const { setDisplayedClasses } = displaySlice.actions;
export const getDispalyClasses = (state: RootState) =>
  state.display.userDiveClasses;
export default displaySlice.reducer;
