import React from "react";
import { setDisplayedClasses } from "@/store/slices/displaySlice";
import { useDispatch } from "react-redux";

export function BackToUserBtn() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      setDisplayedClasses([
        "h-full md:h-5/6 flex flex-col w-full md:w-3/5",
        "bg-purple-100 sm:block w-full rounded-xl text-black h-full hidden",
      ])
    );
  };
  return (
    <button className="bg-purple-500" onClick={handleClick}>
      Back
    </button>
  );
}
