import React from "react";
import { setDisplayedClasses } from "@/store/slices/displaySlice";
import { useDispatch } from "react-redux";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { FaSearch, FaInbox, FaArrowLeft } from "react-icons/fa";

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
    <button
      className="bg-purple-500 flex flex-row gap-2 rounded-md hover:text-gray-400 my-4 p-2 text-white md:hidden lg:hidden"
      onClick={handleClick}
    >
      <FaArrowLeft size={20} />
      Users
    </button>
  );
}
