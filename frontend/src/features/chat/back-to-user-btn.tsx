import React from "react";
import { setDisplayedClasses } from "@/store/slices/displaySlice";
import { setChatInitialState } from "@slices/chatSlice";
import { removeSelectedUser } from "@slices/userSlice";

import { useDispatch } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";

export function BackToUserBtn() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      setDisplayedClasses([
        "h-full lg:h-5/6 flex flex-col w-full lg:w-3/5 ",
        "bg-purple-100 lg:block w-full rounded-xl text-black h-full hidden md:hidden lg:block",
      ])
    );
    dispatch(setChatInitialState());
    dispatch(removeSelectedUser());
  };
  return (
    <button
      className="bg-purple-500 flex flex-row gap-2 rounded-md hover:text-gray-400 my-4 p-2 text-white lg:hidden"
      onClick={handleClick}
    >
      <FaArrowLeft size={20} />
      Users
    </button>
  );
}
