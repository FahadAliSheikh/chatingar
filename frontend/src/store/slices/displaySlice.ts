import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// export type ComponentType = "UserSearchForm" | "Inbox" | "ChatBox";

// interface DisplayState {
//   displayedComponent: ComponentType;
// }

const initialState: any = {
  userDiveClasses: [
    "h-full lg:h-5/6 flex flex-col w-full lg:w-3/5 hidden lg:block",
    "bg-purple-100 sm:block w-full rounded-xl text-black h-full",
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
